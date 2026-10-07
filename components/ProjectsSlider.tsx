import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

// --- PROJECT DATA ---
const PROJECTS = [
  {
    id: '01',
    industry: 'INDUSTRY TYPE',
    name: 'PRODUCT NAME',
    service: '(SERVICE)',
    bgColor: 'bg-[#64FCDA]', // Green
    imageAlt: 'Foldable Phone'
  },
  {
    id: '02',
    industry: 'INDUSTRY TYPE',
    name: 'PRODUCT NAME',
    service: '(SERVICE)',
    bgColor: 'bg-[#FFE4D6]', // Peach
    imageAlt: 'Abstract Shape'
  }
];

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Parallax
      gsap.to(heroRef.current, {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. Project Title Animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectSectionRef.current,
          start: "top 60%",
        }
      });

      // 3. Cards Animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-urbanist overflow-x-hidden">
      {/* Load Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
        .font-urbanist { font-family: 'Urbanist', sans-serif; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      {/* =========================================
          1. HERO SECTION (Blue Card)
      ========================================= */}
      {/* Increased top padding (pt-20) to make room for the 3D Head popping out */}
      <div className="px-4 pt-20 pb-0 relative z-30">
        <div
          ref={heroRef}
          // overflow-visible is CRITICAL for the head to show outside the box
          className="max-w-[95%] mx-auto bg-[#CFE5FF] rounded-[40px] md:rounded-[50px] min-h-[500px] lg:min-h-[650px] relative flex items-center overflow-visible"
        >
          {/* --- WAVE BACKGROUND GRAPHIC --- */}
          <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none rounded-b-[50px] overflow-hidden flex items-end">
            <svg
              width="100%"
              viewBox="0 0 1316 413"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto opacity-90"
              preserveAspectRatio="none"
            >
              <g clipPath="url(#clip0_2058_395)">
                <path d="M615.872 175.676C403.484 46.6092 99.0912 131.454 -29.0555 191.003C-30.6235 191.732 -31.7475 193.042 -32.2996 194.68L-92.3422 372.871C-93.7211 376.963 -90.6994 381.208 -86.3814 381.244L1360.66 393.456C1363.71 393.481 1366.35 391.329 1366.94 388.332L1410.62 165.961C1410.95 164.288 1410.59 162.554 1409.63 161.148L1322.58 34.1984C1319.2 29.2754 1307.96 30.1342 1304.14 34.7234C1243.07 108.146 862.202 325.368 615.872 175.676Z" fill="url(#paint0_linear_2058_395)" />
                <path d="M700.126 175.676C912.514 46.6092 1216.91 131.454 1345.05 191.003C1346.62 191.732 1347.75 193.042 1348.3 194.68L1408.34 372.871C1409.72 376.963 1406.7 381.208 1402.38 381.244L-44.6632 393.456C-47.7168 393.481 -50.3558 391.329 -50.9445 388.332L-94.6245 165.961C-94.953 164.288 -94.5951 162.554 -93.6311 161.148L-6.57971 34.1984C-3.20386 29.2754 8.03979 30.1342 11.8572 34.7234C72.931 108.146 453.796 325.368 700.126 175.676Z" fill="url(#paint1_linear_2058_395)" />
              </g>
              <defs>
                <linearGradient id="paint0_linear_2058_395" x1="657.999" y1="19.5" x2="657.999" y2="393.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9AC8FC" />
                  <stop offset="1" stopColor="#C5E0FD" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_2058_395" x1="657.999" y1="19.5" x2="657.999" y2="393.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FC00FF" />
                  <stop offset="1" stopColor="#C5E0FD" stopOpacity="0" />
                </linearGradient>
                <clipPath id="clip0_2058_395">
                  <rect width="1316" height="413" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full relative z-10">

            {/* Left Content (Text & Button) */}
            <div className="flex flex-col items-start py-16 relative z-30">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 mb-4 uppercase">Who we are</span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#3D3028] leading-[1.1] mb-8">
                We are a digital agency that builds amazing products.
              </h1>
              <button className="px-8 py-3 rounded-full border border-gray-400 text-gray-600 font-bold hover:bg-[#3D3028] hover:text-white hover:border-[#3D3028] transition-all duration-300 bg-white/30 backdrop-blur-sm">
                Get started
              </button>
            </div>

            {/* Right Image (3D Character) */}
            {/* FIX: 
                1. absolute positioning to bottom-right to keep it away from the button.
                2. h-[135%] allows it to exceed the container height.
                3. bottom-0 anchors the feet to the floor.
            */}
            <div className="absolute bottom-0 right-0 lg:right-10 w-full lg:w-1/2 h-full flex items-end justify-center lg:justify-end pointer-events-none z-0 lg:z-20 opacity-40 lg:opacity-100">
              <img
                src="/3d.webp"
                alt="3D Character"
                width="600"
                height="800"
                // 'h-[135%]' makes it taller than the blue box.
                // 'object-bottom' ensures the feet stay at the bottom, so the head grows UPWARDS.
                className="w-auto h-[60%] md:h-[80%] lg:h-[135%] max-w-none object-contain object-bottom animate-[float_6s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          2. PROJECTS SECTION (Pink Background)
      ========================================= */}
      <section
        ref={projectSectionRef}
        className="relative z-10 w-full -mt-[150px] pt-[220px] pb-32 bg-[#FFC8D3]"
      >
        {/* Decorative Swoosh */}
        <div className="absolute top-[10%] right-0 w-[600px] h-[600px] pointer-events-none z-0 translate-x-1/3">
          <svg viewBox="0 0 500 500" className="w-full h-full opacity-90">
            <path
              d="M50,250 C150,100 350,100 450,300 S 350,500 150,400"
              fill="none"
              stroke="url(#swoosh_gradient)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="swoosh_gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <h2 ref={titleRef} className="text-4xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-sm">
              Get a Glimpse of the <br />
              Amazing Projects We <br />
              Have Worked on
            </h2>
          </div>

          {/* Projects Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {PROJECTS.map((project) => (
              <div key={project.id} className="flex flex-col group cursor-pointer">
                {/* Card */}
                <div className={`relative w-full aspect-[4/3.5] rounded-[40px] overflow-hidden ${project.bgColor} shadow-xl transition-transform duration-500 hover:scale-[1.02]`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center opacity-40 font-bold text-2xl tracking-widest">
                      [ IMAGE PLACEHOLDER ]
                    </div>
                  </div>
                </div>
                {/* Details */}
                <div className="mt-6 flex justify-between items-end text-white px-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-bold tracking-wider opacity-90 uppercase">{project.industry}</span>
                    <span className="text-2xl font-extrabold tracking-wide uppercase">{project.name}</span>
                  </div>
                  <div className="flex items-center gap-8 mb-1">
                    <span className="text-lg font-bold opacity-90 tracking-wider uppercase">{project.service}</span>
                    <span className="text-lg font-bold opacity-90">[{project.id}]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;