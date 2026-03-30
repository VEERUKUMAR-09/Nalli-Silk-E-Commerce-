"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const CurrencyDropdown = () => { 
  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee", country: "India", flag: "https://flagcdn.com/in.svg" },
    { code: "USD", symbol: "$", name: "US Dollar", country: "United States", flag: "https://flagcdn.com/us.svg" },
    { code: "GBP", symbol: "£", name: "British Pound", country: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
    { code: "EUR", symbol: "€", name: "Euro", country: "European Union", flag: "https://flagcdn.com/eu.svg" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar", country: "Canada", flag: "https://flagcdn.com/ca.svg" },
    { code: "AUD", symbol: "$", name: "Australian Dollar", country: "Australia", flag: "https://flagcdn.com/au.svg" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", country: "UAE", flag: "https://flagcdn.com/ae.svg" },
    { code: "SGD", symbol: "$", name: "Singapore Dollar", country: "Singapore", flag: "https://flagcdn.com/sg.svg" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currencies[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left font-sans">

      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 h-8 px-2.5 bg-white border rounded text-sm font-medium transition-all duration-200 select-none ${isOpen ? 'border-[#7d1212] shadow-[0_0_0_3px_rgba(125,18,18,0.08)] text-[#7d1212]' : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50/80 shadow-sm'}`}
      >
        <img src={selected.flag} alt={selected.country} className="w-5 h-[13px] object-cover rounded-[2px] shadow-sm ring-1 ring-black/10" />
        <span className="tracking-wide text-[12px] font-semibold">{selected.code}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#7d1212]' : 'text-gray-400'}`} />
      </button>

      {/* DROPDOWN PANEL */}
      <div className={`absolute right-0 mt-1.5 w-56 z-[999] bg-white rounded-xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-200 origin-top-right overflow-hidden ${isOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-1'}`}>

        {/* Header */}
        <div className="px-3.5 py-2.5 border-b border-gray-100 bg-gray-50/70">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">Select Currency</p>
        </div>

        {/* List */}
        <div className="py-1 max-h-[280px] overflow-y-auto">
          {currencies.map((item) => {
            const isSelected = item.code === selected.code;
            return (
              <button key={item.code} onClick={() => { setSelected(item); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors duration-100 cursor-pointer ${isSelected ? 'bg-[#7d1212]/5 text-[#7d1212]' : 'text-gray-700 hover:bg-gray-50'}`}>
                <img src={item.flag} alt={item.country} className="w-6 h-4 object-cover rounded-[3px] shadow-sm ring-1 ring-black/10 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-[13px] font-semibold tracking-wide ${isSelected ? 'text-[#7d1212]' : 'text-gray-800'}`}>{item.code}</span>
                    <span className="text-[11px] text-gray-400 font-medium truncate">{item.name}</span>
                  </div>
                </div>
                {isSelected && <Check size={13} className="text-[#7d1212] flex-shrink-0" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;