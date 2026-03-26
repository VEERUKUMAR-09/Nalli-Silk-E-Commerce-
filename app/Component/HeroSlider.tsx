"use client"; 

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Link from 'next/link'; 
import Image from 'next/image'; 

const HeroSlider = () => {
  // Images 
  const images = [
    { id: 1, img: "https://www.nalli.com/cdn/shop/files/Home_Banner_Web.jpg?v=1772800887", links: "/The June Collection" },
    { id: 2, img: "https://www.nalli.com/cdn/shop/files/Black_Silks_HP_Web.png?v=1773851564", links: "/Organza Sarees" },
    { id: 3, img: "https://www.nalli.com/cdn/shop/files/Mysore_Silk_Home-Banner-Web_7.jpg?v=1773408628", links: "/Mysore Crepe & Soft Silks" },
    { id: 4, img: "https://www.nalli.com/cdn/shop/files/Kanchi_Web.jpg?v=1771584255", links: "/Signature Kanjivarams" },
  ];

  return (
    <div className="relative w-full h-[250px] md:h-[450px] lg:h-[550px] overflow-hidden bg-gray-100">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1} 
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-full w-full"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={item.links} className="relative block w-full h-full cursor-pointer">
              <Image 
                src={item.img} 
                alt="Nalli Banner" 
                fill                
                className="object-cover" 
                priority={item.id === 1}
                unoptimized 
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;