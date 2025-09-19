
import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  unit?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, value, onChange, type = 'number', placeholder, unit }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          min="0"
        />
        {unit && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-slate-500 dark:text-slate-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
