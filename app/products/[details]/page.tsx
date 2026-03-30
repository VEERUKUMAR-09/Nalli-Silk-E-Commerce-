"use client";
import React, { useState, use } from 'react';
import Image from 'next/image';
import { allProducts } from "@/data/products";
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineHeart, HiOutlineShare, HiOutlineShoppingBag } from "react-icons/hi2";
import { FiMinus, FiPlus } from "react-icons/fi";

const ProductPage = ({ params }: { params: Promise<{ details: string }> }) => {
  const resolvedParams = use(params);
  const productId = resolvedParams.details;

  const product = allProducts.find((p) => String(p.id).toLowerCase() === String(productId).toLowerCase());
  const [openSection, setOpenSection] = useState<string | null>("Product Details");

  if (!product) return <div className="pt-40 text-center font-sans uppercase tracking-widest text-gray-400">Saree Not Found</div>;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const productImageList = (product as any).images || [product.img];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans antialiased text-[#1d1d1f]">
      <div className="max-w-[1550px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start mt-[75px] px-6 md:px-12 lg:px-20">
        
        <div className="md:col-span-8 flex flex-col gap-4 order-1 md:order-none">
          
          <div className="grid grid-cols-2 gap-4">
            {productImageList.slice(0, 2).map((url: string, i: number) => (
              <div key={i} className="relative aspect-[2/3.8] bg-[#f5f5f7] overflow-hidden border border-gray-100">
                <Image src={url} alt="Main" fill className="object-cover object-top" unoptimized priority={i === 0} />
              </div>
            ))}
          </div>

          {productImageList.length > 2 && (
            <div className="grid grid-cols-2 gap-4">
              {productImageList.slice(2).map((url: string, i: number) => (
                <div key={i + 2} className="relative aspect-[2/2.8] bg-[#f5f5f7] overflow-hidden border border-gray-100">
                  <Image src={url} alt="Details" fill className="object-cover object-top" unoptimized />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: PRODUCT INFO */}
        <div className="md:col-span-4 flex flex-col md:sticky md:top-[110px] order-2 md:order-none py-2">
          
          <div className="flex justify-between items-start">
            <h1 className="text-2xl md:text-[26px] font-semibold tracking-tight text-black leading-tight">
              {product.name}
            </h1>
            <div className="flex gap-4 text-gray-400 pt-1">
              <HiOutlineShare className="w-5 h-5 cursor-pointer hover:text-black transition-colors" />
              <HiOutlineHeart className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
            </div>
          </div>
          
          <p className="text-[11px] text-gray-500 mt-2 font-bold uppercase tracking-widest">
            Product SKU: {product.id.toUpperCase()}
          </p>
          
          <div className="mt-6">
             <p className="text-[14px] text-[#4a4a4a] leading-relaxed font-normal">
               {product.description}
             </p>
          </div>
          
          <div className="mt-8 border-b border-gray-100 pb-8">
            <span className="text-2xl font-bold text-black tracking-tight">{product.price}</span>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tight">
              Inclusive of all taxes (For Customers in India)
            </p>
          </div>

          <div className="mt-8">
            <p className="text-[12px] font-semibold text-gray-900 mb-4">Quantity:</p>
            <div className="flex items-center w-fit border border-gray-200 bg-[#f4f4f4]">
              <button className="px-5 py-2 text-gray-400 cursor-not-allowed border-r border-gray-200"><FiMinus className="w-3 h-3" /></button>
              <span className="w-14 text-center text-[14px] font-semibold bg-white py-2">1</span>
              <button className="px-5 py-2 text-gray-400 cursor-not-allowed border-l border-gray-200"><FiPlus className="w-3 h-3" /></button>
            </div>
            <p className="text-[11px] text-red-600 mt-3 font-medium">
              Only 1 pieces available in stock.
            </p>
          </div>

          <button className="mt-10 bg-[#7d1212] text-white py-4.5 w-full flex items-center justify-center gap-3 text-[14px] font-bold tracking-wider hover:bg-black transition-all duration-300 rounded-sm">
            <HiOutlineShoppingBag className="w-5 h-5" />
            Add to Bag
          </button>

          <div className="mt-12 border-t border-gray-200">
            <AccordionItem title="Product Details" isOpen={openSection === "Product Details"} onClick={() => toggleSection("Product Details")}>
              <div className="py-5 text-[14px] text-gray-600 font-normal leading-relaxed">{product.description}</div>
            </AccordionItem>

            <AccordionItem title="Specifications" isOpen={openSection === "Specifications"} onClick={() => toggleSection("Specifications")}>
              <div className="grid grid-cols-4 border-t border-gray-100 mt-2">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <React.Fragment key={key}>
                    <div className="py-4 px-4 border-b border-gray-100 flex items-center">
                      <span className="text-[#666] text-[12px] font-normal leading-tight">{key}</span>
                    </div>
                    <div className="py-4 px-4 border-b border-gray-100 bg-[#f9f9f9] flex items-center">
                      <span className="text-[#1d1d1f] text-[13px] font-medium leading-tight">{val as string}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem title="Wash Care & Mark of Handloom" isOpen={openSection === "Wash Care"} onClick={() => toggleSection("Wash Care")}>
              <div className="py-6 px-2">
                <ul className="list-disc list-outside ml-5 space-y-4 text-[14px] text-gray-600 font-normal leading-relaxed">
                  <li>Always dry clean for the first wash. For subsequent washes, if dry cleaning is not possible, gently hand wash in cold water with soapnut or silk-suitable detergent or baby shampoo.</li>
                  <li>Always air dry the saree in shade. Never wring the sari or use it in the washing machine or dryer. Never rub the sari vigorously.</li>
                  <li>Do not store silk without dry cleaning</li>
                  <li>Expose the silk fabrics periodically to natural atmosphere</li>
                  <li>Use silica gel sachet or moisture absorbents in your cupboard which you use for storing silk fabrics</li>
                  <li>Iron in medium heat only</li>
                </ul>
              </div>
            </AccordionItem>

            <AccordionItem title="Shipping and Returns" isOpen={openSection === "Shipping"} onClick={() => toggleSection("Shipping")}>
              <div className="py-5 text-[14px] text-gray-600 font-normal">Ships in 2-4 business days. 7-day return policy.</div>
            </AccordionItem>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccordionItem = ({ title, isOpen, onClick, children }: any) => (
  <div className="border-b border-gray-200">
    <button onClick={onClick} className="w-full py-5 flex justify-between items-center text-[16px] font-normal text-gray-900 hover:text-[#7d1212] transition-colors">
      <span>{title}</span>
      {isOpen ? <HiOutlineChevronUp className="w-4 h-4 text-gray-400" /> : <HiOutlineChevronDown className="w-4 h-4 text-gray-400" />}
    </button>
    {isOpen && <div className="animate-in fade-in slide-in-from-top-1 duration-200 pb-4">{children}</div>}
  </div>
);

export default ProductPage;