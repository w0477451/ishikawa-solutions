import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. AUTHENTIC OFFICIAL BRAND ICONS ---

const FigmaLogo = () => (
  <svg viewBox="0 0 38 57" fill="none" className="w-12 h-12">
    <path d="M9.5 57C14.7467 57 19 52.7467 19 47.5V28.5H9.5C4.25329 28.5 0 32.7467 0 38C0 43.2533 4.25329 57 9.5 57Z" fill="#0ACF83" />
    <path d="M0 19C0 13.7467 4.25329 9.5 9.5 9.5H19V28.5H9.5C4.25329 28.5 0 24.2533 0 19Z" fill="#A259FF" />
    <path d="M9.5 0C4.25329 0 0 4.25329 0 9.5H19V0H9.5Z" fill="#F24E1E" />
    <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" />
    <path d="M38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5V19H28.5C33.7467 19 38 23.2533 38 28.5Z" fill="#1ABCFE" />
  </svg>
);

const WordPressLogo = () => (
  <svg viewBox="0 0 512 512" fill="none" className="w-14 h-14">
    <circle cx="256" cy="256" r="256" fill="#21759B" />
    <path d="M256 26.6C129.5 26.6 26.6 129.5 26.6 256c0 126.5 102.9 229.4 229.4 229.4 126.5 0 229.4-102.9 229.4-229.4 0-126.5-102.9-229.4-229.4-229.4zm-147.2 229.4c0-29.8 8.1-57.8 22.3-81.8l105 287.8c-76.3-24.7-127.3-96.2-127.3-176zm147.2 202.8c-24.7 0-48-5.3-69.1-14.7l69.1-200.7 70.8 194.2c-.6.4-1.2.8-1.8 1.2-20.9 13-44.2 20-69 20zm24.7-270.8l56.8 165.2c27.5-31.4 44-72.3 44-117.2 0-21.7-4.1-42.5-11.6-61.6l-89.2 13.6zm132.8-59.5c6.5 17.5 10.1 36.5 10.1 56.3 0 54.4-25.7 102.7-65.6 133.8L354.4 175c13.7-22.3 26.8-43.5 26.8-43.5s2.7-4.4 2.7-8.8c0-8.8-6.3-15.1-15.1-15.1-1.3 0-2.8.2-4.4.6l-58.8 8.9c-4.4.6-8.9 1.3-13.3 1.9-8.8 1.3-13.9 10.1-11.4 18.9 2.5 8.8 11.4 13.9 20.2 12.6l24.7-3.8-49.3 143.5-34.8-104.3 16.4-2.5c8.8-1.3 13.9-10.1 11.4-18.9-2.5-8.8-11.4-13.9-20.2-12.6l-57.5 8.8c-8.8 1.3-13.9 10.1-11.4 18.9 2.5 8.8 11.4 13.9 20.2 12.6l23.4-3.5 53.7 160.6L164 128.5l25.3-3.8c8.8-1.3 13.9-10.1 11.4-18.9-2.5-8.8-11.4-13.9-20.2-12.6l-67 10.2c40-39.7 94.6-64.2 154.9-64.2 46.2 0 88.8 14.3 123.9 38.6z" fill="#FFFFFF" />
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-14 h-14 animate-[spin_12s_linear_infinite]">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// Authentic Shopify Shopping Bag Logo
const ShopifyLogo = () => (
  <svg viewBox="0 0 109 124" className="w-13 h-13" fill="none">
    <path d="M73.4 12.7c-.1-.7-.6-1.2-1.3-1.3l-14.8-1.5c-.3 0-.6.1-.8.3-.3.2-.4.5-.4.8l-4 76.5 35.8-7.7-14.5-67.1z" fill="#5E8E3E"/>
    <path d="M52.1 11c-.3 0-.6.1-.8.3-.3.2-.4.5-.4.8L47 88.6l35.8-7.7-16.2-70.1c-.1-.7-.6-1.2-1.3-1.3l-13.2-.8v2.3z" fill="#95BF47"/>
    <path d="M47 88.6l-18.7-3.9c-.8-.2-1.3-.9-1.2-1.7l11.4-53.7 8.5 59.3z" fill="#5E8E3E"/>
    <path d="M38.5 29.3L15.3 34.2c-.7.1-1.2.8-1.1 1.5l14.1 66.2c.2.8.9 1.3 1.7 1.2l27-5.8-10-68z" fill="#95BF47"/>
    <path d="M82.8 80.9L106 76c.7-.1 1.2-.8 1.1-1.5L93 8.3c-.2-.8-.9-1.3-1.7-1.2L64.3 12.9l18.5 68z" fill="#95BF47"/>
    <path d="M60.9 2.5C53.6-1.4 44.5-.6 38.3 4.5c-4.4 3.6-6.8 8.9-6.5 14.5l1.1 18.7 19.8-4.2-1.1-18.7c-.2-4.1 1.5-7.9 4.6-10.4 4.3-3.5 10.4-4 15.3-1.3 2.9 1.6 5 4.3 5.9 7.5l16.1-3.4c-1.4-4.8-4.6-8.8-8.9-11.2l-3.7-3.5z" fill="#5E8E3E"/>
    <path d="M66.4 53.6c-4.8-.9-9.1-1.9-9.1-5.1 0-2.8 2.3-4.6 6.1-4.6 4.3 0 7.8 1.8 10 3.1l3.5-7.7c-3-1.9-7.4-3.4-13.5-3.4-10.5 0-16.7 5.8-16.7 13.7 0 9.2 8.3 11.2 14.5 12.4 4.8.9 9.1 1.9 9.1 5.1 0 3-2.6 4.8-6.7 4.8-5.3 0-10.1-2.4-12.8-4.2l-3.7 7.9c3.7 2.5 9.7 4.3 16.5 4.3 11 0 17.3-5.9 17.3-14 0-9.5-8.4-11.4-14.7-12.3z" fill="#fff"/>
  </svg>
);

// Authentic Node.js Hexagon Logo
const NodeLogo = () => (
  <svg viewBox="0 0 256 289" className="w-13 h-13" fill="none">
    <path d="M128 0L256 73.9V215.1L128 289L0 215.1V73.9L128 0Z" fill="#339933"/>
    <path d="M128 27.5L232.2 87.7V201.3L128 261.5L23.8 201.3V87.7L128 27.5Z" fill="#026E00"/>
    <path d="M128 47.7L215.3 98.1V190.9L128 241.3L40.7 190.9V98.1L128 47.7Z" fill="#339933"/>
    <path d="M106 182h18v-44.5c0-8.5 4-13.5 12.5-13.5s11.5 5 11.5 13.5V182h18v-47c0-16-9-25-24-25-11 0-17 5-20 11V95h-18v87z" fill="#FFFFFF"/>
  </svg>
);

// Authentic Next.js Logo
const NextLogo = () => (
  <svg viewBox="0 0 180 180" fill="none" className="w-13 h-13">
    <circle cx="90" cy="90" r="90" fill="black" />
    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next_grad_1)" />
    <rect x="115" y="54" width="12" height="72" fill="url(#next_grad_2)" />
    <defs>
      <linearGradient id="next_grad_1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="next_grad_2" x1="121" y1="54" x2="120.791" y2="104.867" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// Authentic Python Logo
const PythonLogo = () => (
  <svg viewBox="0 0 110 110" className="w-13 h-13">
    <path d="M54.5 2C27.7 2 29.3 13.6 29.3 13.6l.03 12.1h25.4v3.6H19.2S2 27.3 2 54.5c0 27.1 14.8 26.2 14.8 26.2h8.8v-12.4s-.5-14.8 14.6-14.8h25.2s14.1.2 14.1-13.8V15.8S76.8 2 54.5 2zM38.8 9.5c2.6 0 4.8 2.1 4.8 4.8s-2.1 4.8-4.8 4.8-4.8-2.1-4.8-4.8 2.1-4.8 4.8-4.8z" fill="#387EB8"/>
    <path d="M55.5 108c26.8 0 25.2-11.6 25.2-11.6l-.03-12.1H55.27v-3.6h35.53s17.2 2 17.2-25.2c0-27.1-14.8-26.2-14.8-26.2h-8.8v12.4s.5 14.8-14.6 14.8H49.4s-14.1-.2-14.1 13.8v13.9s-2.3 13.8 20.2 13.8zm15.7-7.5c-2.6 0-4.8-2.1-4.8-4.8s2.1-4.8 4.8-4.8 4.8 2.1 4.8 4.8-2.1 4.8-4.8 4.8z" fill="#FFE052"/>
  </svg>
);

const VueLogo = () => (
  <svg viewBox="0 0 261.76 226.69" className="w-13 h-13">
    <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.69L261.76.001z" fill="#41b883" />
    <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.414.001z" fill="#34495e" />
  </svg>
);

// Authentic MongoDB Leaf Logo
const MongoLogo = () => (
  <svg viewBox="0 0 128 128" className="w-13 h-13">
    <path d="M64 5C64 5 36 34 36 74C36 102 52 118 64 123C76 118 92 102 92 74C92 34 64 5 64 5Z" fill="#13AA52"/>
    <path d="M64 5V123C76 118 92 102 92 74C92 34 64 5 64 5Z" fill="#116149"/>
    <path d="M64 105C63.5 105 63 92 63 85C63 70 64 55 64 55C64 55 65 70 65 85C65 92 64.5 105 64 105Z" fill="#FFFFFF"/>
  </svg>
);

// Authentic Amazon Web Services (AWS) Logo with Smile
const AwsLogo = () => (
  <svg viewBox="0 0 128 128" className="w-15 h-15">
    <text x="64" y="60" textAnchor="middle" fill="#232F3E" fontWeight="900" fontSize="38" fontFamily="sans-serif" letterSpacing="1">aws</text>
    <path d="M26 78 C 48 98, 80 98, 102 78" fill="none" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" />
    <polygon points="100,70 108,80 96,82" fill="#FF9900" />
  </svg>
);

const AngularLogo = () => (
  <svg viewBox="0 0 250 250" className="w-13 h-13">
    <path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" />
    <path fill="#C3002F" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" />
    <path fill="#FFF" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2h21.7L125 52.1zm17 83.3h-34l17-40.9 17 40.9z" />
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 54 33" className="w-14 h-14">
    <path fill="#38bdf8" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
  </svg>
);


// --- 2. DATA (12 Items) ---
const TECH_DATA = [
  {
    id: 'figma',
    name: 'Figma',
    icon: FigmaLogo,
    desc: "Bringing creative visions to life through interactive design masterpieces, with a dedicated focus on achieving UXUI excellence"
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: WordPressLogo,
    desc: "Expert dedicated to seamless website development and tailored customization for a unique online presence"
  },
  {
    id: 'react',
    name: 'React Js',
    icon: ReactLogo,
    desc: "Expert React.js developer committed to crafting innovative dynamic, and responsive web applications for unparalleled user experiences."
  },
  {
    id: 'next',
    name: 'Next.js',
    icon: NextLogo,
    desc: "Passionate about building lightning-fast server-rendered React applications with optimal performance and seamless user experiences."
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: ShopifyLogo,
    desc: "Transforming e-commerce dreams into reality with custom Shopify solutions that drive sales and engage customers."
  },
  {
    id: 'node',
    name: 'Node Js',
    icon: NodeLogo,
    desc: "Developing robust and scalable server-side applications that power modern web platforms and seamless API integrations."
  },
  {
    id: 'python',
    name: 'Python',
    icon: PythonLogo,
    desc: "Driving innovation and solving complex problems with versatile Python programming tailored for data analysis, machine learning, and scalable web solutions."
  },
  {
    id: 'vue',
    name: 'Vue.js',
    icon: VueLogo,
    desc: "Creating intuitive, fast, and scalable front-end solutions with Vue.js to deliver seamless and engaging user experiences."
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: MongoLogo,
    desc: "Architecting robust, scalable, and high-performance NoSQL database solutions with MongoDB to power modern, data-driven applications."
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: AwsLogo,
    desc: "Empowering businesses with scalable, secure, and reliable cloud solutions using AWS infrastructure to accelerate digital transformation."
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: AngularLogo,
    desc: "Enterprise-ready dynamic web applications with robust component architectures and scalability."
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    icon: TailwindLogo,
    desc: "Rapid UI development with utility-first CSS for modern, bespoke designs and fluid responsive layouts."
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

      // 3. Hover pause
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
          <path d="M645.51 339.521C672.547 344.053 693.476 367.166 689.727 394.324C666.432 563.059 521.641 693 346.5 693C155.133 693 0 537.867 0 346.5C0 155.133 155.133 0 346.5 0C532.003 0 171.523 260.064 645.51 339.521Z" fill="#E8F1FA" />
        </svg>
      </div>

      {/* Diagonal Ribbon: Hidden on mobile (hidden md:block) to avoid cutting through text */}
      <div className="hidden md:block absolute top-10 right-0 w-[600px] h-[500px] pointer-events-none z-0 translate-x-1/4 -translate-y-1/4">
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
          {words.map((word, index) => (
            <span
              key={index}
              className="word-span text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight select-none"
            >
              {word}
            </span>
          ))}
        </div>

        {/* --- Infinite Marquee Wrapper --- */}
        <div
          ref={wrapperRef}
          className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing py-8"
        >
          <div
            ref={sliderRef}
            className="flex gap-6 w-max"
          >
            {[...TECH_DATA, ...TECH_DATA].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="w-[280px] sm:w-[320px] md:w-[360px] h-[340px] bg-white rounded-[32px] p-8 flex flex-col items-center text-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 select-none group"
                >
                  {/* Top: Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent />
                  </div>

                  {/* Middle: Title */}
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-xl font-urbanist font-bold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-urbanist leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom: Subtle indicator dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-pink-500 group-hover:scale-125 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;