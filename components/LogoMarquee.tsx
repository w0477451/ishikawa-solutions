import React from 'react';
import { Hexagon, Box, Triangle, Circle, Globe, Activity, Anchor, Zap } from 'lucide-react';

const LOGOS = [
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-11.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-10.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-9.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-8.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-7.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-6.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-5.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-4.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-3.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-2.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo-1.png",
  "https://ishikawasolutions.in/wp-content/uploads/2025/11/Item-Logo.png",
];

const LogoMarquee: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
          Trusted Partners
        </span>
        <h2 className="text-2xl text-gray-400 font-medium">
          Trusted by the world’s leading businesses
        </h2>
      </div>

      <div 
        className="relative flex overflow-x-hidden group"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {/* Wrapper 1 */}
        <div className="animate-marquee whitespace-nowrap flex gap-8 md:gap-16 lg:gap-24 items-center group-hover:pause">
          {[...LOGOS, ...LOGOS].map((url, index) => (
            <LogoItem key={index} url={url} />
          ))}
        </div>

        {/* Wrapper 2 */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 md:gap-16 lg:gap-24 items-center group-hover:pause">
          {[...LOGOS, ...LOGOS].map((url, index) => (
            <LogoItem key={`dup-${index}`} url={url} />
          ))}
        </div>
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
        .group:hover .group-hover\\:pause {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
};

// --- FIX IS BELOW ---
const LogoItem = ({ url }: { url: string }) => {
  return (
    <div className="group/item flex items-center justify-center cursor-pointer opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 h-16 w-32 md:h-20 md:w-40 lg:w-48 mx-4">
      <img src={url} alt="Trusted Partner Logo" className="object-contain max-h-full max-w-full" />
    </div>
  );
};

export default LogoMarquee;