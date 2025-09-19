import React, { useState, useMemo } from 'react';
import { CalculatorType } from './types';
import Navbar from './components/Navbar';
import LoanCalculator from './components/LoanCalculator';
import InvestmentCalculator from './components/InvestmentCalculator';
import RetirementCalculator from './components/RetirementCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(CalculatorType.INVESTMENT);

  const renderCalculator = useMemo(() => {
    switch (activeCalculator) {
      case CalculatorType.LOAN:
        return <LoanCalculator />;
      case CalculatorType.INVESTMENT:
        return <InvestmentCalculator />;
      case CalculatorType.RETIREMENT:
        return <RetirementCalculator />;
      case CalculatorType.CURRENCY:
        return <CurrencyConverter />;
      default:
        return <InvestmentCalculator />;
    }
  }, [activeCalculator]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            高級財務計算機
          </h1>
          <Navbar activeCalculator={activeCalculator} setActiveCalculator={setActiveCalculator} />
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="animate-fade-in-up">
          {renderCalculator}
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;