"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { occasionsData } from "@/data/occasions";
import { designedData } from "@/data/designed";
import { shopAllData } from "@/data/shopAll";
import { fabricsData } from "@/data/fabrics";

import CurrencyDropdown from "./Dropdown";
import {
  HiOutlineUser, HiOutlineHeart, HiOutlineShoppingBag,
  HiMagnifyingGlass, HiBars3
} from "react-icons/hi2";

type SubItem = { t: string; img: string; path: string };

interface MegaMenuProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  data: Record<string, SubItem[]>;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenu = ({ isOpen, activeTab, setActiveTab, data, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) => {
  return (
    <div
      className={`fixed top-[70px] left-0 w-screen bg-white shadow-xl border-t border-gray-100 z-50 flex min-h-[500px] transition-all duration-200 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* LEFT SIDEBAR */}
      <div className="w-[280px] bg-[#f8f8f8] flex flex-col py-10 border-r border-gray-100 shrink-0">
        {Object.keys(data).map((tab) => (
          <div
            key={tab}
            onMouseEnter={() => setActiveTab(tab)}
            className={`relative px-12 py-4 text-[13px] cursor-pointer transition-all uppercase tracking-wider select-none ${
              activeTab === tab ? "text-[#7d1212] font-extrabold bg-white" : "text-gray-500 hover:text-[#7d1212]"
            }`}
          >
            {activeTab === tab && (
              <div className="absolute left-0 top-0 h-full w-1.5 bg-[#7d1212]" />
            )}
            {tab}
          </div>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-12 bg-white overflow-y-auto">
        <div className="grid grid-cols-5 gap-10 max-w-[1300px]">
          {(data[activeTab] ?? []).map((sub, index) => (
            <Link key={index} href={sub.path} className="flex flex-col gap-4 group/item" onClick={onClose}>
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 shadow-sm border border-gray-50">
                <img
                  src={sub.img}
                  alt={sub.t}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                />
              </div>
              <span className="text-[11px] text-gray-600 font-semibold text-center uppercase tracking-widest group-hover/item:text-[#7d1212] transition-colors">
                {sub.t}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMegaMenu = (menuName: string, data: Record<string, SubItem[]>) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(menuName);
    if (!activeTabs[menuName]) {
      setActiveTabs((prev) => ({ ...prev, [menuName]: Object.keys(data)[0] }));
    }
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const categories = [
    { name: "NEW ARRIVALS", link: "/category/new-arrivals" },
    { name: "KANCHIPURAM", link: "/category/kanchipuram" },
    { name: "BANARASI", link: "/category/banarasi" },
    { name: "OCCASIONS", link: "#", type: "mega", data: occasionsData },
    { name: "DESIGNED BY NALLI", link: "#", type: "mega", data: designedData },
    { name: "SHOP ALL", link: "#", type: "mega", data: shopAllData },
    { name: "FABRICS", link: "#", type: "mega", data: fabricsData },
    { name: "MORE", link: "/category/more" },
  ];

  return (
    <>
      {openMenu && (
        <div className="fixed inset-0 top-[70px] bg-black/20 z-40" onMouseEnter={scheduleClose} />
      )}

      <nav className="sticky top-0 z-[100] flex items-center justify-between px-4 md:px-10 bg-white shadow-sm h-[70px] border-b border-gray-100 font-mono">

        {/* Logo */}
        <div className="flex items-center h-full">
          <Link href="/" className="flex items-center mr-8 shrink-0">
            <Image src="https://www.nalli.com/cdn/shop/files/Logo_1.webp?height=448&v=1752222706" alt="logo" width={70} height={40} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 text-[12px] h-full items-center">
            {categories.map((item) => {
              if (item.type === "mega" && item.data) {
                const menuData = item.data as Record<string, SubItem[]>;
                return (
                  <div
                    key={item.name}
                    className="h-full flex items-center"
                    onMouseEnter={() => openMegaMenu(item.name, menuData)}
                    onMouseLeave={scheduleClose}
                  >
                    <span className="hover:text-[#7d1212] transition-colors uppercase tracking-wide whitespace-nowrap cursor-pointer">
                      {item.name}
                    </span>
                    <MegaMenu
                      isOpen={openMenu === item.name}
                      activeTab={activeTabs[item.name] ?? Object.keys(menuData)[0]}
                      setActiveTab={(tab) => setActiveTabs((prev) => ({ ...prev, [item.name]: tab }))}
                      data={menuData}
                      onClose={() => setOpenMenu(null)}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    />
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className="hover:text-[#7d1212] transition-colors h-full flex items-center uppercase text-[12px] tracking-wide whitespace-nowrap"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:block"><CurrencyDropdown /></div>
          <HiMagnifyingGlass size={22} className="cursor-pointer hover:text-[#7d1212]" />
          <HiOutlineUser size={22} className="hidden md:block cursor-pointer hover:text-[#7d1212]" />
          <div className="relative cursor-pointer">
            <HiOutlineHeart size={22} className="hover:text-[#7d1212]" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#7d1212] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </div>
          <div className="relative cursor-pointer">
            <HiOutlineShoppingBag size={22} className="hover:text-[#7d1212]" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#7d1212] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;