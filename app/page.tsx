import Navbar from "./Component/Navbar";
import HeroSlider from "./Component/HeroSlider";
import Featured from "./Component/Featured"; // Dono 'C' aur 'F' Capital rakho

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
  
      <HeroSlider />
      
      <div className="mt-10 mb-20">
        <Featured />
      </div>
    </main>
  );
}