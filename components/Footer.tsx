
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 py-6 mt-8 border-t border-slate-200 dark:border-slate-700">
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} 高級財務計算機. 僅供說明用途.
      </p>
    </footer>
  );
};
