import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const BeliefsAndStrength: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Cards Slide Up Animation
      gsap.fromTo(
        [leftCardRef.current, rightCardRef.current],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      // 2. Gentle Floating Animation for Images
      gsap.to(leftImageRef.current, {
        y: -15,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(rightImageRef.current, {
        y: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-white font-sans w-full flex justify-center">
      
      {/* Load Urbanist Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
        .font-urbanist { font-family: 'Urbanist', sans-serif; }
      `}</style>

      <div className="container px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* --- LEFT CARD (PINK) --- */}
          <div 
            ref={leftCardRef}
            className="group relative bg-[#FFD6E8] rounded-[40px] p-10 md:p-14 overflow-hidden min-h-[550px] flex flex-col justify-start transition-transform duration-500 hover:scale-[1.01]"
          >
            <div className="relative z-10 max-w-lg">
              {/* Tagline */}
              <h4 className="text-[#D61F69] text-sm font-urbanist font-bold tracking-[0.2em] uppercase mb-6">
                OUR BELIEFS
              </h4>
              
              {/* Heading */}
              <h2 className="text-5xl md:text-6xl font-urbanist font-bold leading-[1.1] mb-8 text-[#1A1A1A] tracking-tight">
                <span className="text-white">Honesty</span> and <br />
                hard work are <br />
                our beliefs.
              </h2>
              
              {/* Description */}
              <p className="text-[#7D4A5E] text-lg font-urbanist font-medium leading-relaxed mb-10 max-w-md">
                We provide continual support and maintenance post-launch to ensure your web presence remains strong and secure.
              </p>
              
              {/* Button */}
              <button className="bg-[#FF3366] hover:bg-[#E02250] text-white px-10 py-4 rounded-full font-urbanist font-bold text-base shadow-lg transition-all duration-300 hover:-translate-y-1">
                Know More
              </button>
            </div>

            {/* Decorative Image (Bottom Right) */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[70%] pointer-events-none z-0">
               {/* REPLACE SRC WITH: "/images/swirls 1.png" 
                  I am using a remote placeholder so you can see the effect immediately.
               */}
               <img 
                 ref={leftImageRef}
                 src="\images\swirls 1.png" 
                 alt="Abstract Swirl" 
                 className="w-full h-full object-cover object-bottom opacity-100 mix-blend-multiply mask-image-gradient"
                 style={{ 
                    maskImage: 'linear-gradient(to top, black 50%, transparent 100%)', 
                    WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)'
                 }}
               />
            </div>
          </div>

          {/* --- RIGHT CARD (BLUE) --- */}
          <div 
            ref={rightCardRef}
            className="group relative bg-[#C9E2FF] rounded-[40px] p-10 md:p-14 overflow-hidden min-h-[550px] flex flex-col justify-start transition-transform duration-500 hover:scale-[1.01]"
          >
            <div className="relative z-10 max-w-lg">
              {/* Tagline */}
              <h4 className="text-[#2563EB] text-sm font-urbanist font-bold tracking-[0.2em] uppercase mb-6">
                OUR STRENGTH
              </h4>
              
              {/* Heading */}
              <h2 className="text-5xl md:text-6xl font-urbanist font-bold leading-[1.1] mb-8 text-[#1A1A1A] tracking-tight">
                <span className="text-white">Build</span> that idea <br />
                that you have <br />
                in your head
              </h2>
              
              {/* Description */}
              <p className="text-[#4B6584] text-lg font-urbanist font-medium leading-relaxed mb-10 max-w-md">
                Partner with Ishikawa solutions, where industry knowledge meets web development expertise.
              </p>
              
              {/* Button */}
              <button className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-4 rounded-full font-urbanist font-bold text-base shadow-lg transition-all duration-300 hover:-translate-y-1">
                Know More
              </button>
            </div>

            {/* Decorative Image (Bottom Right) */}
            <div className="absolute -bottom-5 -right-5 w-[55%] h-[60%] pointer-events-none z-0">
                {/* REPLACE SRC WITH: "/images/Group 48095747.png" 
                   I am using a remote placeholder for 3D UI elements.
                */}
                <img 
                   ref={rightImageRef}
                   src="\images\Groupddd.png"
                   alt="3D UI Elements"
                   className="w-full h-full object-contain drop-shadow-2xl"
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeliefsAndStrength;