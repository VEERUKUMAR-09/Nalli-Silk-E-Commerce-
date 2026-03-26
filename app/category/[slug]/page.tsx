"use client";
import React, { use } from 'react'; // 'use' import kiya params ke liye
import Link from 'next/link'; 
import Image from 'next/image';
import { HiOutlineHeart } from "react-icons/hi2";
import { allProducts } from "@/data/products"; 

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = ({ params }: PageProps) => {
  // Client component mein params handle karne ka sahi tarika
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const filteredProducts = allProducts ? allProducts.filter((item) => item.category === slug) : [];
  
  const displayName = slug ? slug.replace("-", " ").toUpperCase() : "Category";

  let bannerImage = "https://www.nalli.com/cdn/shop/collections/New_arrivals.png?v=1770638027";

  if (slug === "kanchipuram") {
    bannerImage = "https://www.nalli.com/cdn/shop/collections/Inside-banner_1.png?v=1767697836";
  } else if (slug === "banarasi") {
    bannerImage = "https://www.nalli.com/cdn/shop/collections/Banrasi.jpg?v=1767698031";
  } else if (slug === "occasions" || slug === "designed-by-nalli") {
    bannerImage = "https://www.nalli.com/cdn/shop/collections/N_E.png?v=1767697714";
  } else if (slug === "shop-all") {
    bannerImage = "https://www.nalli.com/cdn/shop/collections/shop_all.png?v=1767696401";
  } else if (slug === "fabric" || slug === "more") {
    bannerImage = "https://www.nalli.com/cdn/shop/collections/Fabrics.png?v=1767697954";
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative w-full h-[250px] md:h-[350px] mt-[70px] flex items-center justify-center overflow-hidden">
        <Image 
          src={bannerImage} 
          alt={displayName}
          fill
          className="object-cover"
          priority
          unoptimized 
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <h1 className="relative z-10 text-3xl md:text-5xl font-serif tracking-[0.3em] text-white drop-shadow-md uppercase text-center px-4">
          {displayName}
        </h1>
      </div>

      {/* Filter section */}
      <div className="sticky top-[70px] z-30 bg-white border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center text-[10px] md:text-xs tracking-widest uppercase text-gray-500">
        <div className="font-bold cursor-pointer">+ SHOW FILTERS</div>
        <div>{filteredProducts.length} ITEMS</div>
        <div className="cursor-pointer">SORT BY: FEATURED ▾</div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto py-10 px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
          {filteredProducts.map((product) => {
            // FIX: Image logic ko yahan handle kiya hai
            const displayImage = (product as any).images ? (product as any).images[0] : product.img;

            return (
              <Link 
                href={`/products/${product.id}`} 
                key={product.id} 
                className="group cursor-pointer block"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f7f7f7]">
                  <Image 
                    src={displayImage || "/placeholder.png"} 
                    alt={product.name}
                    fill 
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }} 
                    className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow-sm z-10"
                  >
                    <HiOutlineHeart size={18} className="text-gray-500 hover:text-red-700 transition-colors" />
                  </button>
                </div>

                {/* Text Details */}
                <div className="mt-4 text-center px-2">
                  <h3 className="text-[10px] md:text-[11px] font-medium text-gray-700 tracking-tight uppercase leading-relaxed h-8 overflow-hidden">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold text-gray-900 mt-2">
                    {product.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic font-serif text-xl">
              Coming Soon: Nalli&apos;s Exclusive {displayName} Collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;