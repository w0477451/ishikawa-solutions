import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Arch expands
      tl.from(archRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom center',
        duration: 1.2,
        ease: 'circ.out'
      });

      // 2. Ribbon Draws in
      tl.fromTo(ribbonRef.current, 
        { strokeDashoffset: 3000 },
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut' },
        '-=0.8'
      );

      // 3. Image pops in
      tl.from(imageRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        scale: 0.9,
      }, '-=2'); 

      // 4. Text elements stagger
      tl.from('.hero-anim', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
      }, '-=1.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; 

    if (!imageRef.current || !ribbonRef.current) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 30;
    const y = (clientY / window.innerHeight - 0.5) * 30;

    gsap.to(imageRef.current, {
      x: x,
      y: y,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.to(ribbonRef.current, {
      x: x * -0.5,
      y: y * -0.5,
      duration: 1.5,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#F4F6F9] flex items-center overflow-x-hidden overflow-y-hidden font-sans py-12 lg:py-0"
    >
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* --- LEFT COLUMN: Text Content --- */}
        <div className="max-w-xl pt-4 lg:pt-0 z-30 order-1">
          <div className="hero-anim inline-flex items-center justify-center px-4 py-1.5 mb-6 lg:mb-8 rounded-full bg-[#E3F2FD] text-[#2F80ED] font-bold text-[10px] lg:text-[11px] tracking-widest uppercase">
            Web & Design Agency
          </div>
          
          <h1 ref={titleRef} className="hero-anim text-4xl lg:text-[3.8rem] leading-[1.2] lg:leading-[1.15] font-bold text-[#1a1a1a] mb-6">
            We Always Deliver <br />
            More Than Expected
          </h1>
          
          <p className="hero-anim text-base lg:text-lg text-gray-500 mb-8 lg:mb-10 leading-relaxed max-w-md">
            Boosting Your Success in Web Development and Digital Marketing.
          </p>
          
          <div className="hero-anim flex flex-wrap items-center gap-4 lg:gap-5">
            <button className="group relative px-6 lg:px-8 py-3 lg:py-3.5 rounded-full bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] text-white font-bold text-sm tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              Get started
            </button>
            <button className="px-6 lg:px-8 py-3 lg:py-3.5 rounded-full bg-white border border-[#D03BF3] text-[#D03BF3] font-bold text-sm tracking-wide hover:bg-[#D03BF3] hover:text-white transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Visuals --- */}
        <div className="relative h-[400px] lg:h-[800px] flex items-end justify-center lg:justify-end order-2 lg:order-2 mt-10 lg:mt-0">
          
          {/* 1. The Blue Arch Background */}
          <div 
            ref={archRef}
            className="absolute bottom-0 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-10 w-[90%] h-[90%] lg:w-[500px] lg:h-[650px] bg-[#CAE3FF] rounded-t-[200px] lg:rounded-t-[300px] z-0"
          ></div>

          {/* 2. SVG RIBBON */}
          <svg 
            className="absolute -top-24 left-[50%] -translate-x-[50%] w-[160%] lg:w-[120%] lg:left-auto lg:translate-x-0 lg:-top-32 lg:-left-10 h-[140%] pointer-events-none z-10 overflow-visible" 
            viewBox="0 0 1000 800" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="ribbonGradient" x1="0%" y1="50%" x2="100%" y2="50%" gradientTransform="rotate(20)">
                <stop offset="0%" stopColor="#AEEEEE" />
                <stop offset="40%" stopColor="#3B82F6" />
                <stop offset="80%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            
            <path 
              ref={ribbonRef}
              d="M-50,350 C50,300 200,50 450,250 C600,400 550,650 350,550 C200,450 400,0 900,300" 
              fill="none" 
              stroke="url(#ribbonGradient)" 
              // CHANGED HERE: Made line thinner (15 instead of 40)
              strokeWidth="15" 
              strokeLinecap="round"
              strokeDasharray="3000" 
            />
          </svg>

          {/* 3. The Main Image */}
          <img
            ref={imageRef}
            src="https://w0477451.github.io/ishikawa-solutions/images/Web.png" 
            alt="Web Development Illustration"
            className="relative z-20 w-full max-w-[400px] lg:max-w-[750px] lg:scale-110 object-contain mb-4 lg:mb-16 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
