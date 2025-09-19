
import React from 'react';
import { CalculatorType } from '../types';

interface NavbarProps {
  activeCalculator: CalculatorType;
  setActiveCalculator: (calculator: CalculatorType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeCalculator, setActiveCalculator }) => {
  const navItems = Object.values(CalculatorType);

  return (
    <nav className="bg-slate-200 dark:bg-slate-700 p-1 rounded-full">
      <ul className="flex items-center space-x-1">
        {navItems.map((item) => (
          <li key={item}>
            <button
              onClick={() => setActiveCalculator(item)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
                activeCalculator === item
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
