import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 font-urbanist">
      {/* Load Urbanist Font if not already loaded globally */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
        .font-urbanist { font-family: 'Urbanist', sans-serif; }
      `}</style>

      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        
        {/* --- 1. LOGO SECTION (PNG) --- */}
        <div className="mb-8">
           {/* Replace 'src' with the actual path to your logo file */}
           <img 
             src="\logo (1).png" 
             alt="Ishikawa Solutions" 
             className="h-12 md:h-14 w-auto object-contain"
           />
        </div>

        {/* --- 2. SOCIAL ICONS --- */}
        <div className="flex gap-5 mb-12">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-11 h-11 rounded-full bg-[#2A2A2A] flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white transition-all duration-300"
                >
                    <Icon size={20} />
                </a>
            ))}
        </div>

        {/* --- 3. DIVIDER & BOTTOM TEXT --- */}
        <div className="w-full border-t border-gray-800/60 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm font-medium tracking-wide">
            
            <p>©2025. Ishikawa Solutions. All rights reserved</p>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="hover:text-white transition-colors">Terms & conditions</a>
            </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;