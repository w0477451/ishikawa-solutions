import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

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
           <img 
             src="/logo (1).png" 
             alt="Ishikawa Solutions" 
             className="h-12 md:h-14 w-auto object-contain"
           />
        </div>

        {/* --- 2. SOCIAL ICONS (Facebook & Instagram Only) --- */}
        <div className="flex gap-5 mb-12">
          <a 
            href="https://www.facebook.com/people/Ishikawa-Solutions/61589137264859/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-full bg-[#2A2A2A] flex items-center justify-center text-gray-300 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://www.instagram.com/ishikawasolutions/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-[#2A2A2A] flex items-center justify-center text-gray-300 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-md"
          >
            <Instagram size={20} />
          </a>
        </div>

        {/* --- 3. DIVIDER & BOTTOM COPYRIGHT --- */}
        <div className="w-full border-t border-gray-800/60 pt-8 flex justify-center items-center text-gray-400 text-sm font-medium tracking-wide">
          <p>© 2026 Ishikawa Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;