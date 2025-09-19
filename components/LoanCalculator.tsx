
import React, { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import InputField from './InputField';
import ResultDisplay from './ResultDisplay';
import { LoanIcon } from './icons';

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('30');

  const { monthlyPayment, totalPayment, totalInterest } = useMemo(() => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (P > 0 && annualRate > 0 && years > 0) {
      const i = annualRate / 100 / 12;
      const n = years * 12;
      const M = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);

      if (isFinite(M)) {
        const totalPaymentCalc = M * n;
        const totalInterestCalc = totalPaymentCalc - P;
        return {
          monthlyPayment: M,
          totalPayment: totalPaymentCalc,
          totalInterest: totalInterestCalc,
        };
      }
    }
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <CalculatorCard title="貸款攤銷計算機" icon={<LoanIcon />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <InputField
            label="貸款金額"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            unit="$"
          />
          <InputField
            label="年利率"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            unit="%"
          />
          <InputField
            label="貸款期限 (年)"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            unit="年"
          />
        </div>

        {/* Results Section */}
        <div className="space-y-4 flex flex-col justify-center">
            <ResultDisplay label="每月還款" value={formatCurrency(monthlyPayment)} isPrimary />
            <ResultDisplay label="總還款額" value={formatCurrency(totalPayment)} />
            <ResultDisplay label="總支付利息" value={formatCurrency(totalInterest)} />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default LoanCalculator;
