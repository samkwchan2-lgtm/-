import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CalculatorCard from './CalculatorCard';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { InvestmentIcon } from './icons';

const InvestmentCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [interestRate, setInterestRate] = useState('7');
  const [years, setYears] = useState('20');

  const { futureValue, totalContributions, totalInterest, chartData } = useMemo(() => {
    const P = parseFloat(initialInvestment);
    const PMT = parseFloat(monthlyContribution);
    const annualRate = parseFloat(interestRate);
    const t = parseFloat(years);

    if (P >= 0 && PMT >= 0 && annualRate > 0 && t > 0) {
      const r = annualRate / 100 / 12;
      const n = t * 12;
      
      let currentBalance = P;
      const data = [{ year: 0, value: P }];

      for (let i = 1; i <= t; i++) {
        for(let j = 0; j < 12; j++) {
            currentBalance = currentBalance * (1 + r) + PMT;
        }
        data.push({ year: i, value: parseFloat(currentBalance.toFixed(2)) });
      }

      const fv = currentBalance;
      const totalCont = P + (PMT * n);
      const totalInt = fv - totalCont;
      
      return {
        futureValue: fv,
        totalContributions: totalCont,
        totalInterest: totalInt,
        chartData: data,
      };
    }
    return { futureValue: 0, totalContributions: 0, totalInterest: 0, chartData: [{ year: 0, value: 0 }] };
  }, [initialInvestment, monthlyContribution, interestRate, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-2 border border-slate-300 dark:border-slate-600 rounded shadow-lg">
          <p className="label">{`第 ${label} 年`}</p>
          <p className="intro text-blue-500">{`價值: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <CalculatorCard title="複利投資計算機" icon={<InvestmentIcon />}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input & Results Section */}
        <div className="lg:col-span-2 space-y-4">
          <InputField label="初始投資" id="initialInvestment" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} unit="$" />
          <InputField label="每月供款" id="monthlyContribution" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} unit="$" />
          <InputField label="年回報率" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} unit="%" />
          <InputField label="投資年期" id="years" value={years} onChange={(e) => setYears(e.target.value)} unit="年" />
          
          <div className="pt-4 space-y-3">
            <ResultDisplay label="未來價值" value={formatCurrency(futureValue)} isPrimary />
            <ResultDisplay label="總投入" value={formatCurrency(totalContributions)} />
            <ResultDisplay label="總利息" value={formatCurrency(totalInterest)} />
          </div>
        </div>

        {/* Chart Section */}
        <div className="lg:col-span-3 h-80 md:h-96 -ml-4">
           <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 5 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
              <XAxis dataKey="year" tick={{ fill: 'rgb(100 116 139)' }} tickLine={{ stroke: 'rgb(100 116 139)' }} />
              <YAxis tickFormatter={(tick) => `$${(tick / 1000)}k`} tick={{ fill: 'rgb(100 116 139)' }} tickLine={{ stroke: 'rgb(100 116 139)' }}/>
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default InvestmentCalculator;