import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { useConsultationModal } from './ConsultationModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useConsultationModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-urbanist ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3.5' : 'bg-transparent py-5'
      }`}
    >
      {/* Load Urbanist Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
        .font-urbanist { font-family: 'Urbanist', sans-serif; }
      `}</style>

      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* --- LOGO SECTION (PNG) --- */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo1.webp"
            alt="Ishikawa Solutions"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-pink-500 font-bold tracking-wide transition-colors text-sm capitalize"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => openModal()}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] text-white font-bold text-sm shadow-md hover:shadow-lg hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Enquire now
          </button>
        </div>

        {/* Mobile View - Menu is Hidden as requested; only the Enquire now button is shown */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            Enquire now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;