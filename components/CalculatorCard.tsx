
import React from 'react';

interface CalculatorCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center space-x-3">
          <div className="text-blue-500 dark:text-blue-400">
            {icon}
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default CalculatorCard;
