
import React from 'react';

interface ResultDisplayProps {
  label: string;
  value: string;
  isPrimary?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ label, value, isPrimary = false }) => {
  return (
    <div className={`flex justify-between items-baseline p-4 rounded-lg ${isPrimary ? 'bg-blue-50 dark:bg-blue-900/50' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
      <span className={`text-sm font-medium ${isPrimary ? 'text-blue-800 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}`}>{label}</span>
      <span className={`font-bold ${isPrimary ? 'text-2xl text-blue-600 dark:text-blue-400' : 'text-lg text-slate-800 dark:text-slate-100'}`}>{value}</span>
    </div>
  );
};

export default ResultDisplay;
