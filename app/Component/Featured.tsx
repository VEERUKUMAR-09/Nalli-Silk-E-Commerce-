"use client";
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';

const products = [
  { 
    id: 1, 
    name: "Rose pink Kanchipuram Silk Saree", 
    price: "₹30,257.00", 
    img: "https://www.nalli.com/cdn/shop/files/NF2942435_AI.jpg?v=1774413218&width=1024", 
    slug: "rose-pink-kanchipuram" 
  },
  { 
    id: 2, 
    name: "Pink Mysore Crepe Saree", 
    price: "₹14,173.00", 
    img: "https://www.nalli.com/cdn/shop/files/HB2536925_AI.jpg?v=1773721183&width=1024", 
    slug: "pink-mysore-saree" 
  },
  { 
    id: 3, 
    name: "Yellow Tussar Silk Saree", 
    price: "₹11,829.00", 
    img: "https://www.nalli.com/cdn/shop/files/BS3390905_AI.jpg?v=1773394255&width=1024", 
    slug: "yellow-tussar-saree" 
  },
  { 
    id: 4, 
    name: "Kamala-Pure Silk Pure Gold Zari Mustard with Red Dual Tone Kanchipuram Saree", 
    price: "₹39,900.00", 
    img: "https://www.nalli.com/cdn/shop/files/Copy_of_Nalli_Silk_Sarees_20252924-Recovered.jpg?v=1758621880&width=1024", 
    slug: "kamala-pure-silk-saree" 
  },
  { 
    id: 5, 
    name: "Mint Green Organza Silk Saree", 
    price: "₹24,038.00", 
    img: "https://www.nalli.com/cdn/shop/files/AH5320018_AI.jpg?v=1774413243&width=1024", 
    slug: "milt-green-organza-silk" 
  },

    { 
    id: 6, 
    name: "Blue Grey Soft Silk Saree", 
    price: "₹10,175.00", 
    img: "https://www.nalli.com/cdn/shop/files/NF2974978_M.jpg?v=1774596304&width=1024", 
    slug: "blue-grey-soft-silk-saree" 
  }
];

const FeaturedSlider = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-white relative group">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[26px] font-bold text-[#222] tracking-tight">Featured products</h2>
          <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-[0.12em] font-semibold">
            Fresh weaves, added daily — discover sarees handwoven just for you
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative px-2">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              {/* Product Click Link */}
              <Link href={`/category/new-arrivals/${product.slug}`} className="flex flex-col group/item cursor-pointer">
                <div className="relative aspect-[3/4.2] overflow-hidden bg-[#f9f9f9]">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-105"
                  />
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-[#7d1212] hover:text-white transition-colors">
                      <FiHeart size={18} />
                    </button>
                  </div>
                </div>

                <div className="pt-4 space-y-1">
                  <h3 className="text-[11px] font-bold text-[#333] uppercase tracking-wide leading-relaxed line-clamp-2 min-h-[32px]">
                    {product.name}
                  </h3>
                  <p className="text-[13px] font-extrabold text-[#222]">
                    {product.price}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-[-10px] top-[40%] z-30 bg-white/90 shadow-xl w-12 h-12 rounded-full flex items-center justify-center border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
          <FiChevronLeft size={24} className="text-gray-800" />
        </button>
        <button className="swiper-button-next-custom absolute right-[-10px] top-[40%] z-30 bg-white/90 shadow-xl w-12 h-12 rounded-full flex items-center justify-center border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
          <FiChevronRight size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Main View All Button - Linked to New Arrivals */}
      <div className="flex justify-center mt-14">
        <Link 
          href="/category/new-arrivals" 
          className="px-12 py-3.5 border border-[#7d1212] text-[#7d1212] text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-[#7d1212] hover:text-white transition-all duration-500 ease-in-out"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSlider;