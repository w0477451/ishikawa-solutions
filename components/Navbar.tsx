import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
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
            {/* Replace 'src' with your actual logo file path */}
            <img 
                src="\images\logo (1).png" 
                alt="Ishikawa Solutions" 
                className="h-8 md:h-10 w-auto object-contain"
            />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-600 hover:text-pink-500 font-bold tracking-wide transition-colors text-sm uppercase"
            >
              {item.label}
            </a>
          ))}
          <button className="px-6 py-2.5 rounded-full border-2 border-cyan-400 text-cyan-500 font-bold text-sm hover:bg-cyan-50 transition-all">
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 fade-in duration-200">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-bold text-gray-700 hover:text-pink-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button className="w-full py-3 rounded-full border-2 border-cyan-400 text-cyan-500 font-bold mt-2">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;