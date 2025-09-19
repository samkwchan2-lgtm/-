
import React, { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { RetirementIcon } from './icons';

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('1000');
  const [preRetirementReturn, setPreRetirementReturn] = useState('7');
  const [withdrawalRate, setWithdrawalRate] = useState('4');

  const { nestEgg, annualIncome } = useMemo(() => {
    const P = parseFloat(currentSavings);
    const PMT = parseFloat(monthlyContribution);
    const preRate = parseFloat(preRetirementReturn);
    const age = parseInt(currentAge, 10);
    const retireAge = parseInt(retirementAge, 10);
    const withdraw = parseFloat(withdrawalRate);

    const yearsToRetirement = retireAge - age;

    if (P >= 0 && PMT >= 0 && preRate > 0 && yearsToRetirement > 0 && withdraw > 0) {
      const r = preRate / 100 / 12;
      const n = yearsToRetirement * 12;
      
      const futureValueOfSavings = P * Math.pow(1 + r, n);
      const futureValueOfContributions = PMT * ((Math.pow(1 + r, n) - 1) / r);
      
      const totalNestEgg = futureValueOfSavings + futureValueOfContributions;
      const income = totalNestEgg * (withdraw / 100);

      return {
        nestEgg: totalNestEgg,
        annualIncome: income,
      };
    }
    return { nestEgg: 0, annualIncome: 0 };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, preRetirementReturn, withdrawalRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  return (
    <CalculatorCard title="退休儲蓄計算機" icon={<RetirementIcon />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <InputField label="當前年齡" id="currentAge" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
             <InputField label="退休年齡" id="retirementAge" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
          </div>
          <InputField label="目前儲蓄" id="currentSavings" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} unit="$" />
          <InputField label="每月供款" id="monthlyContribution" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} unit="$" />
          <InputField label="退休前回報率" id="preRetirementReturn" value={preRetirementReturn} onChange={(e) => setPreRetirementReturn(e.target.value)} unit="%" />
          <InputField label="年提款率" id="withdrawalRate" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} unit="%" />
        </div>
        
        {/* Results Section */}
        <div className="space-y-4 flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
           <h3 className="text-lg font-semibold text-center text-slate-700 dark:text-slate-200 mb-4">預計退休成果</h3>
           <ResultDisplay label="退休時總資產" value={formatCurrency(nestEgg)} isPrimary />
           <ResultDisplay label="預計年收入" value={formatCurrency(annualIncome)} />
           <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
             這是基於您輸入的數據的估算。實際結果可能會有所不同。
           </p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default RetirementCalculator;
