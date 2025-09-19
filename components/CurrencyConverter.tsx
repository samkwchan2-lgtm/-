import React, { useState } from 'react';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import CalculatorCard from './CalculatorCard';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { CurrencyIcon, SwapIcon } from './icons';

const currencyList = [
  { code: 'TWD', name: '新台幣' },
  { code: 'USD', name: '美元' },
  { code: 'EUR', name: '歐元' },
  { code: 'JPY', name: '日元' },
  { code: 'GBP', name: '英鎊' },
  { code: 'AUD', name: '澳元' },
  { code: 'CAD', name: '加拿大元' },
  { code: 'CHF', name: '瑞士法郎' },
  { code: 'CNY', name: '人民幣' },
  { code: 'HKD', name: '港元' },
  { code: 'KRW', name: '韓元' },
];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('TWD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ rate: number; convertedAmount: number } | null>(null);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const handleConvert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('請輸入有效的金額。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide the exchange rate from ${fromCurrency} to ${toCurrency}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rate: {
                type: Type.NUMBER,
                description: `The current exchange rate from 1 ${fromCurrency} to ${toCurrency}.`
              }
            },
            required: ["rate"]
          }
        }
      });

      const jsonStr = response.text.trim();
      const parsedResult = JSON.parse(jsonStr);
      
      if (parsedResult && typeof parsedResult.rate === 'number') {
        const rate = parsedResult.rate;
        const convertedAmount = parseFloat(amount) * rate;
        setResult({ rate, convertedAmount });
      } else {
        throw new Error('無法解析匯率。');
      }
    } catch (e) {
      console.error(e);
      setError('無法獲取匯率，請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatCurrency = (value: number, currency: string) => {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 2 }).format(value);
    } catch(e) {
        return `${value.toFixed(2)} ${currency}`;
    }
  };

  const Select = ({id, value, onChange, label}: {id: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, label: string}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
        <select id={id} value={value} onChange={onChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
            {currencyList.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
        </select>
    </div>
  )

  return (
    <CalculatorCard title="貨幣匯率轉換器" icon={<CurrencyIcon />}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <InputField label="金額" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="flex-1">
            <Select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} label="從"/>
          </div>
          <button onClick={handleSwap} className="p-2 mt-7 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors self-center justify-self-center" aria-label="Swap currencies">
            <SwapIcon />
          </button>
          <div className="flex-1">
            <Select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} label="到"/>
          </div>
        </div>
        
        <div>
          <button onClick={handleConvert} disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-500/80 dark:disabled:bg-blue-800/80 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300 shadow-lg shadow-blue-500/20">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                轉換中...
              </>
            ) : '轉換'}
          </button>
        </div>

        {error && <div className="text-red-500 text-center p-3 bg-red-100 dark:bg-red-900/40 rounded-lg">{error}</div>}

        {result && !isLoading && (
          <div className="space-y-4 pt-4 animate-fade-in-up">
              <ResultDisplay label="轉換結果" value={formatCurrency(result.convertedAmount, toCurrency)} isPrimary />
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                匯率: 1 {fromCurrency} = {result.rate.toPrecision(6)} {toCurrency}
              </p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
};

export default CurrencyConverter;