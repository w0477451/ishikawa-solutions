import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. BRAND ICONS ---

const FigmaLogo = () => (
  <svg viewBox="0 0 38 57" fill="none" className="w-12 h-12">
    <path d="M9.5 57C14.7467 57 19 52.7467 19 47.5V28.5H9.5C4.25329 28.5 0 32.7467 0 38C0 43.2533 4.25329 57 9.5 57Z" fill="#0ACF83"/>
    <path d="M0 19C0 13.7467 4.25329 9.5 9.5 9.5H19V28.5H9.5C4.25329 28.5 0 24.2533 0 19Z" fill="#A259FF"/>
    <path d="M9.5 0C4.25329 0 0 4.25329 0 9.5H19V0H9.5Z" fill="#F24E1E"/>
    <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262"/>
    <path d="M38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5V19H28.5C33.7467 19 38 23.2533 38 28.5Z" fill="#1ABCFE"/>
  </svg>
);

const WordPressLogo = () => (
  <svg viewBox="0 0 512 512" fill="none" className="w-16 h-16">
    <path d="M256 0C114.6 0 0 114.6 0 256C0 397.4 114.6 512 256 512C397.4 512 512 397.4 512 256C512 114.6 397.4 0 256 0ZM62.6 265.6C62.6 182.6 112.2 110.8 183.3 80.1L69.7 395.5C65.2 353.8 62.6 310.9 62.6 265.6ZM434.2 162.4C455.2 191.8 466.9 229.3 466.9 260.4C466.9 354.5 408.7 436.8 325.6 475.1L434.2 162.4ZM238.5 122.9H300.8C308.3 122.9 314.3 125.6 314.3 132.3C314.3 138.3 314.3 138.3 306.4 142.4L265.9 168.9L321.8 338L396.9 141.3C403.2 125.9 407.7 122.9 415.6 122.9C425.7 122.9 433.2 130.4 433.2 140.5C433.2 148.1 432.5 149.2 428.7 158.8L363.9 341.4L300.8 384.3L267.4 220.3L174.3 479.8L127.7 343.6L218.5 86.2L283.1 276.9L240 142.4C232.1 138.7 226.5 136.5 226.5 132.3C226.5 124.8 228.4 122.9 238.5 122.9Z" fill="#21759B"/>
    <circle cx="256" cy="256" r="248" stroke="#21759B" strokeWidth="20"/>
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-16 h-16 animate-[spin_10s_linear_infinite]">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const ShopifyLogo = () => (
  <svg viewBox="0 0 150 172" fill="none" className="w-14 h-14">
    <path d="M148.667 47.964C143.875 31.516 117.336 4.276 117.336 4.276C117.336 4.276 85.656 -4.156 72.376 2.108C70.764 2.888 69.824 4.84 70.452 6.504C71.36 8.984 74.16 17.036 74.16 17.036C74.16 17.036 48.708 12.948 37.38 17.036C35.664 17.644 34.336 18.908 33.636 20.556L0.743999 100.268L0.0959988 107.864C-1.508 126.98 12.092 144.128 31.172 147.728C47.36 150.776 62.972 140.792 67.256 125.516C71.444 145.088 90.176 157.544 109.796 153.372C118.424 151.536 125.972 146.348 130.508 139.016C133.448 159.104 152.444 172.64 169.464L148.667 47.964Z" fill="#95BF47"/>
    <path d="M108.372 51.284C112.824 52.856 115.124 57.764 113.54 62.24C111.98 66.68 107.096 69.008 102.632 67.436C98.18 65.864 95.88 60.956 97.464 56.48C99.048 52.04 103.92 49.724 108.372 51.284Z" fill="white"/>
  </svg>
);

const NodeLogo = () => (
  <div className="flex items-center gap-2">
     <span className="text-[#333] font-bold text-2xl tracking-tight">node</span>
     <svg viewBox="0 0 128 128" fill="none" className="w-10 h-10">
        <path d="M64 16L26 38V84L64 106L102 84V38L64 16Z" fill="#83CD29"/>
        <path d="M64 16L102 38V84L64 106" stroke="#333" strokeWidth="0" fill="none"/> 
        <text x="30" y="90" fontFamily="sans-serif" fontSize="65" fontWeight="bold" fill="#333">JS</text>
     </svg>
  </div>
);

const NextLogo = () => (
  <svg viewBox="0 0 180 180" fill="none" className="w-16 h-16">
    <mask id="mask0_408_134" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="90" fill="black"/>
    </mask>
    <g mask="url(#mask0_408_134)">
      <circle cx="90" cy="90" r="90" fill="black"/>
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/>
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.791" y2="104.867" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 256 255" className="w-16 h-16">
    <path d="M126.916.004c-33.196.453-63.719 14.896-83.453 28.92C26.568 41.007 25.4 43.332 25.4 52.025v27.28h53.03l1.635-25.828c.232-3.67 1.673-6.703 11.996-7.866 7.745-.872 31.887-1.376 33.941 1.714 2.054 3.09 1.768 19.903 1.768 19.903l-74.405.793c-35.797.382-53.476 17.318-53.07 48.563l.572 31.366c.405 31.246 18.468 47.022 51.926 48.606h25.88v-32.48c0-23.51 13.758-39.137 39.36-40.02l57.542-.445V62.722c0-33.89-21.687-60.307-48.66-62.718zm16.206 19.953c5.17 0 9.365 4.21 9.365 9.403 0 5.192-4.194 9.403-9.365 9.403-5.17 0-9.366-4.21-9.366-9.403 0-5.193 4.196-9.403 9.366-9.403z" fill="#306998"/>
    <path d="M130.202 255.004c33.197-.453 63.72-14.897 83.454-28.922 16.896-12.082 18.063-14.407 18.063-23.1v-27.28h-53.03l-1.635 25.827c-.232 3.67-1.673 6.703-11.996 7.866-7.745.873-31.888 1.377-33.942-1.713-2.053-3.09-1.767-19.903-1.767-19.903l74.405-.792c35.798-.382 53.477-17.32 53.07-48.564l-.57-31.365c-.406-31.246-18.47-47.022-51.927-48.607h-25.88v32.48c0 23.51-13.76 39.137-39.36 40.02l-57.542.445v61.19c0 33.892 21.686 60.307 48.658 62.718zm-16.206-19.952c-5.17 0-9.365-4.212-9.365-9.405 0-5.193 4.195-9.404 9.365-9.404 5.17 0 9.367 4.21 9.367 9.404 0 5.193-4.2 9.405-9.367 9.405z" fill="#FFD43B"/>
  </svg>
);

const AngularLogo = () => (
  <svg viewBox="0 0 250 250" className="w-16 h-16">
      <path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/>
      <path fill="#C3002F" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z"/>
      <path fill="#FFF" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2h21.7L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/>
  </svg>
);

const VueLogo = () => (
  <svg viewBox="0 0 261.76 226.69" className="w-16 h-16">
    <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.69L261.76.001z" fill="#41b883"/>
    <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.414.001z" fill="#34495e"/>
  </svg>
);

const MongoLogo = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16" fill="none">
    <path d="M11.813 24c0-11.42 7.453-14.996 7.453-14.996S11.855.75 11.855.75C11.855.75 3.94 3.728 3.94 12.87c0 10.478 7.873 11.13 7.873 11.13z" fill="#00ED64"/>
    <path d="M11.813 23.885V.915c.106.05.208.103.307.159 4.225 2.387 5.934 7.482 5.934 7.482s-4.65 2.18-6.24 15.33z" fill="#00684A"/>
    <path d="M12.289 21.637c0 .005-.002.008-.005.008-.002 0-.005-.003-.005-.008v-7.305c0-.005.003-.008.005-.008.003 0 .005.003.005.008v7.305z" fill="#fff"/>
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 54 33" className="w-16 h-16">
    <path fill="#38bdf8" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"/>
  </svg>
);

const AwsLogo = () => (
  <svg viewBox="0 0 512 512" className="w-16 h-16">
    <path d="M376.9 286.6c-11.3 5.2-49.1 20.5-102.8 21.1-32.5.4-69.7-5.2-99-17.2-4.8-1.9-10.1.6-11.9 5.5-1.9 4.9.7 10.5 5.5 12.4 41 16.8 86.1 21.8 125.2 18.6 2.1-.2 5.9-.6 9.4-1.4l-.5 5.2c-.9 10.5.8 20.3 4.6 28.7 2 4.4 6.2 7.1 10.8 7.1 1.9 0 3.9-.5 5.7-1.4 6.5-3.2 9.2-10.9 6.1-17.4l-4-8.8c25-9 43.5-17.3 50.9-21.1 5.4-2.8 7.5-9.5 4.7-14.9-2.8-5.5-9.6-7.7-14.7-5.1zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0z" fill="#232F3E" fillOpacity="0"/>
    <path d="M345.5 189.6c-4.2 0-8.1 1.7-10.9 4.8-2.8-12.8-13.1-22.6-27.1-22.6-10.2 0-18.9 5.1-23.7 12.8-5.7-8.2-14.7-12.8-24.3-12.8-16.9 0-29.8 12.3-32.1 28.6-9-17.2-26.5-28.6-46.5-28.6-29.6 0-53 24.5-53 54.9 0 29.8 22.6 54.3 51.6 54.3 20.4 0 38.2-11.9 46.9-29.5 2.4 16.6 15.4 29.5 32.8 29.5 9.6 0 18.2-4.3 23.9-11.1 5.3 6.7 13.4 11.1 22.6 11.1 11.6 0 21.4-6.4 26.3-16 1.5 1.2 3.3 2 5.3 2 4.9 0 8.9-4 8.9-8.9 0-3.9-2.5-7.2-6.1-8.3l-2.8-29c.2-1.3.4-2.7.4-4.1-.1-15.4-12.3-27.1-28.2-27.1z" fill="#FF9900"/>
  </svg>
);


// --- 2. DATA (12 Items) ---
const TECH_DATA = [
  { 
    id: 'figma', 
    name: 'Figma', 
    icon: FigmaLogo, 
    desc: "Interactive prototyping and UX/UI excellence." 
  },
  { 
    id: 'wordpress', 
    name: 'WordPress', 
    icon: WordPressLogo, 
    desc: "Seamless, customized unique online presence." 
  },
  { 
    id: 'react', 
    name: 'React Js', 
    icon: ReactLogo, 
    desc: "Modern, fast interactive web solutions." 
  },
  { 
    id: 'next', 
    name: 'Next.js', 
    icon: NextLogo, 
    desc: "High-performance web applications." 
  },
  { 
    id: 'shopify', 
    name: 'Shopify', 
    icon: ShopifyLogo, 
    desc: "Tailored e-commerce scalable online stores." 
  },
  { 
    id: 'node', 
    name: 'Node Js', 
    icon: NodeLogo, 
    desc: "Scalable, robust performance backend systems." 
  },
  { 
    id: 'python', 
    name: 'Python', 
    icon: PythonLogo, 
    desc: "Powerful backend logic and data processing." 
  },
  { 
    id: 'vue', 
    name: 'Vue.js', 
    icon: VueLogo, 
    desc: "Progressive framework for user interfaces." 
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    icon: MongoLogo, 
    desc: "Flexible, scalable document database." 
  },
  { 
    id: 'aws', 
    name: 'AWS', 
    icon: AwsLogo, 
    desc: "Secure, online scalable cloud infrastructure." 
  },
  { 
    id: 'angular', 
    name: 'Angular', 
    icon: AngularLogo, 
    desc: "Enterprise-ready dynamic web applications." 
  },
  { 
    id: 'tailwind', 
    name: 'Tailwind', 
    icon: TailwindLogo, 
    desc: "Rapid UI development with utility-first CSS." 
  },
];

// --- 3. Main Component ---
const Technologies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Split text logic for line-by-line effect
  const headerText = "We choose the best technologies to guarantee reliability, scalability, and security, meeting the unique needs of our clients in different industries.";
  const words = headerText.split(" ");

  // --- GSAP ANIMATION ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Text Lighten Up Animation
      const wordElements = textContainerRef.current?.querySelectorAll(".word-span");
      
      if (wordElements) {
        gsap.fromTo(wordElements, 
          { color: "#d1d5db" }, 
          { 
            color: "#1f2937",   
            stagger: 0.1,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1.5,
            }
          }
        );
      }

      // 2. Marquee Loop
      const totalWidthPercent = 50; 
      const animation = gsap.to(sliderRef.current, {
        xPercent: -totalWidthPercent,
        duration: 40, 
        ease: "none",
        repeat: -1,
      });

      // 3. FIXED HOVER: Use the static WRAPPER, not the moving slider
      // Pausing instantly (duration: 0) prevents the "slide-away" glitch.
      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.addEventListener("mouseenter", () => animation.pause());
        wrapper.addEventListener("mouseleave", () => animation.play());
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 lg:py-16 bg-white relative overflow-hidden font-sans flex flex-col justify-center items-center w-full">
      
      {/* Load Urbanist Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
        .font-urbanist {
          font-family: 'Urbanist', sans-serif;
        }
      `}</style>

      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[693px] h-[693px] pointer-events-none z-0 flex justify-center items-center opacity-70">
         <svg width="100%" height="100%" viewBox="0 0 693 693" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M645.51 339.521C672.547 344.053 693.476 367.166 689.727 394.324C666.432 563.059 521.641 693 346.5 693C155.133 693 0 537.867 0 346.5C0 155.133 155.133 0 346.5 0C532.003 0 171.523 260.064 645.51 339.521Z" fill="#E8F1FA"/>
         </svg>
      </div>

      <div className="absolute top-10 right-0 w-[600px] h-[500px] pointer-events-none z-0 translate-x-1/4 -translate-y-1/4">
         <svg viewBox="0 0 500 400" className="w-full h-full">
             <path 
               d="M50 350 C 200 50 400 50 450 150" 
               fill="none" 
               stroke="url(#gradient_line)" 
               strokeWidth="8" 
               strokeLinecap="round" 
             />
             <defs>
                 <linearGradient id="gradient_line" x1="50" y1="350" x2="450" y2="150" gradientUnits="userSpaceOnUse">
                     <stop stopColor="#d946ef" /> 
                     <stop offset="1" stopColor="#3b82f6" /> 
                 </linearGradient>
             </defs>
         </svg>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10 w-full overflow-hidden flex flex-col items-center">
        
        {/* --- Header --- */}
        <div 
          ref={textContainerRef} 
          className="text-center max-w-5xl mx-auto mb-10 font-urbanist relative z-20 px-2 flex flex-wrap justify-center gap-x-[0.3em] gap-y-3 lg:gap-y-5"
        >
          {words.map((word, i) => (
             <span key={i} className="word-span text-3xl lg:text-5xl font-extrabold leading-[1.4] tracking-tight">
               {word}
             </span>
          ))}
        </div>

        {/* --- GSAP Infinite Carousel --- */}
        {/* Added ref={wrapperRef} here to catch mouse events on the entire strip */}
        <div ref={wrapperRef} className="relative w-full overflow-hidden py-4 font-urbanist">
           
           {/* Gradient Masks */}
           <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
           <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

           {/* Scrolling Track */}
           <div ref={sliderRef} className="flex gap-5 w-max py-8">
             
             {/* Render Data Twice for infinite loop */}
             {[...TECH_DATA, ...TECH_DATA].map((tech, index) => (
               <div 
                 key={`${tech.id}-${index}`} 
                 // GLITCH FIX: Separate the hover trigger (group) from the layout
                 // The 'group' class is on the outer wrapper.
                 // The hover effect targets 'group-hover' on the INNER content.
                 className="group relative w-[200px] min-h-[280px] flex flex-col items-center text-center shrink-0"
               >
                 {/* INNER CARD CONTENT - This moves up, but the outer wrapper stays put */}
                 <div className="w-full h-full p-5 rounded-[20px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center">
                    
                    {/* Icon Container */}
                    <div className="h-24 w-24 flex items-center justify-center mb-6 rounded-full bg-gray-50 group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                        <tech.icon />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-black mb-2 tracking-tight">{tech.name}</h3>

                    {/* Description */}
                    <p className="text-gray-500 text-[13.5px] leading-relaxed font-medium">
                      {tech.desc}
                    </p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;