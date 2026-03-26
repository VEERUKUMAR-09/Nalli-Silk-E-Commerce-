import Image from "next/image";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { 
  HiOutlineUser, 
  HiOutlineHeart, 
  HiOutlineShoppingBag 
} from "react-icons/hi2";

const Navbar = () => {
  const categories = [
    { name: "NEW ARRIALS", link: "/category/new-arrivals" },
    { name: "KANCHIPURAM", link: "/category/kanchipuram" },
    { name: "BANARASI", link: "/category/banarasi" },
    { name: "OCCASIONS", link: "/category/occasions" },
    { name: "DESIGNED BY NALLI", link: "/category/designed" },
    { name: "SHOP ALL", link: "/category/shop-all" },
    { name: "FABRIC", link: "/category/fabrics" },
    { name: "MORE", link: "/category/more" }
  ];

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-5 py-5 bg-white shadow-md font-mono font-bold text-2xl">
      
      {/* Image Links */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="https://www.nalli.com/cdn/shop/files/Logo_1.webp?height=448&v=1752222706"
            alt="logo"
            width={65}
            height={45}
          />
        </Link>

        <div className="flex gap-6 text-sm ml-10">
          {categories.map((item) => (
            <Link href={item.link} key={item.name} className="hover:text-red-800 transition whitespace-nowrap">
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/*  Icons */}
      <div className="flex items-center gap-5 ">
        <Dropdown />
        
        <div className="flex items-center gap-4 text-gray-700">
          <HiOutlineUser size={22} className="cursor-pointer hover:text-red-800" />
          
          <div className="relative">
            <HiOutlineHeart size={22} className="cursor-pointer hover:text-red-800" />
            <span className="absolute -top-1 -right-1 bg-red-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </div>

          <HiOutlineShoppingBag size={22} className="cursor-pointer hover:text-red-800" />
        </div>
      </div>

    </div>
  );
};

export default Navbar;