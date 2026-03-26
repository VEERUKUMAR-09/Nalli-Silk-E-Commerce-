"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CurrencyDropdown = () => {
  const currencies = [
    { code: "INR", name: "India", flag: "https://flagcdn.com/in.svg" },
    { code: "USD", name: "United States", flag: "https://flagcdn.com/us.svg" },
    { code: "GBP", name: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
    { code: "EUR", name: "European Union", flag: "https://flagcdn.com/eu.svg" },
    { code: "CAD", name: "Canada", flag: "https://flagcdn.com/ca.svg" },
    { code: "AUD", name: "Australia", flag: "https://flagcdn.com/au.svg" },
    { code: "AED", name: "UAE", flag: "https://flagcdn.com/ae.svg" },
    { code: "SGD", name: "Singapore", flag: "https://flagcdn.com/sg.svg" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currencies[0]);

  return (
    <div className="relative inline-block text-left">
      
      {/* --- TOGGLE BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-3 rounded shadow-sm hover:bg-gray-50 transition-all active:scale-95"
      >
        <img src={selected.flag} alt="flag" className="w-6 h-5 object-cover shadow-sm" />
        <span className="text-[14px]  text-gray-700 tracking-tight">
          {selected.code}
        </span>
        {isOpen ? <ChevronUp size={13} className="text-gray-400" /> : <ChevronDown size={13} className="text-gray-400" />}
      </button>

      {/* ---  DROPDOWN --- */}
      
     
      <div 
        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-xl z-[999] overflow-hidden transition-all duration-200 origin-top-right
        ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
      >
        <div className="max-h-50 overflow-y-auto scrollbar-thn">
          {currencies.map((item) => (
            <div 
              key={item.code}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none transition"
            >
              <img src={item.flag} alt={item.code} className="w-4 h-3 shadow-sm" />
              <span className="text-[12px] font-medium text-gray-700">
                {item.code} - {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;