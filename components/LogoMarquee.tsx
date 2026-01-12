import React from 'react';
import { Hexagon, Box, Triangle, Circle, Globe, Activity, Anchor, Zap } from 'lucide-react';

const LOGOS = [
  { name: 'HexLabs', icon: Hexagon, color: 'text-blue-500' },
  { name: 'Boxy', icon: Box, color: 'text-purple-500' },
  { name: 'Triforce', icon: Triangle, color: 'text-teal-500' },
  { name: 'CircleInc', icon: Circle, color: 'text-rose-500' },
  { name: 'GlobalTech', icon: Globe, color: 'text-cyan-500' },
  { name: 'ActiveSys', icon: Activity, color: 'text-indigo-500' },
  { name: 'AnchorPoint', icon: Anchor, color: 'text-amber-500' },
  { name: 'ZapSoftware', icon: Zap, color: 'text-yellow-500' },
];

const LogoMarquee: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
          Trusted Partners
        </span>
        <h2 className="text-2xl text-gray-400 font-medium">
          Powering the world's leading businesses
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
          {[...LOGOS, ...LOGOS].map((logo, index) => (
            <LogoItem key={index} logo={logo} />
          ))}
        </div>

        {/* Wrapper 2 */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 md:gap-16 lg:gap-24 items-center group-hover:pause">
          {[...LOGOS, ...LOGOS].map((logo, index) => (
            <LogoItem key={`dup-${index}`} logo={logo} />
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
const LogoItem = ({ logo }: { logo: typeof LOGOS[0] }) => {
  // 1. Assign the icon to a capitalized variable
  const Icon = logo.icon; 

  return (
    <div className="group/item flex items-center gap-3 cursor-pointer opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105">
      <div className={`p-2 rounded-lg bg-gray-100 group-hover/item:bg-white group-hover/item:shadow-lg transition-all duration-300 ${logo.color}`}>
        {/* 2. Use the capitalized variable here */}
        <Icon size={28} strokeWidth={2} className="fill-current/10" />
      </div>
      <span className="text-xl font-bold text-gray-400 group-hover/item:text-gray-800 transition-colors font-[Outfit]">
        {logo.name}
      </span>
    </div>
  );
};

export default LogoMarquee;