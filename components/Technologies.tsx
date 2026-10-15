import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. DATA WITH REAL OFFICIAL LOGOS & BRAND STYLING ---
interface TechItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  brandColor: string;
  badge: string;
  desc: string;
}

const TECH_DATA: TechItem[] = [
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend Runtime',
    logo: '/technologies/nodejs.svg',
    brandColor: '#5FA04E',
    badge: 'High-Throughput APIs',
    desc: 'Developing high-performance, asynchronous server architectures and scalable microservices powering enterprise web platforms.'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend & AI / ML',
    logo: '/technologies/python.svg',
    brandColor: '#3776AB',
    badge: 'Automation & Analytics',
    desc: 'Driving innovation and solving complex business challenges with versatile Python programming tailored for data analytics and scalable web solutions.'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'Reactive Frontend',
    logo: '/technologies/vuejs.svg',
    brandColor: '#42B883',
    badge: 'Progressive Interfaces',
    desc: 'Creating intuitive, lightning-fast, and responsive front-end user experiences with Vue’s progressive component ecosystem.'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'NoSQL Database',
    logo: '/technologies/mongodb.svg',
    brandColor: '#13AA52',
    badge: 'Real-Time Scalability',
    desc: 'Architecting resilient, scalable, and ultra-fast document database models designed to power high-concurrency modern applications.'
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend Library',
    logo: '/technologies/react.svg',
    brandColor: '#61DAFB',
    badge: 'Dynamic Web Apps',
    desc: 'Crafting responsive, component-driven web applications and interactive portals with unmatched performance and fluid transitions.'
  },
  {
    id: 'next',
    name: 'Next.js',
    category: 'Fullstack Framework',
    logo: '/technologies/nextjs.svg',
    brandColor: '#000000',
    badge: 'SSR & Edge Computing',
    desc: 'Building blazing-fast, SEO-optimized web platforms with server-side rendering, hybrid static generation, and edge API caching.'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-Commerce Platform',
    logo: '/technologies/shopify.svg',
    brandColor: '#95BF47',
    badge: 'High-Converting Stores',
    desc: 'Transforming e-commerce visions into revenue engines with custom Shopify themes, bespoke apps, and seamless checkout pipelines.'
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Cloud Infrastructure',
    logo: '/technologies/aws.svg',
    brandColor: '#FF9900',
    badge: '99.99% High Availability',
    desc: 'Empowering businesses with resilient, enterprise-grade cloud architecture, serverless deployments, auto-scaling, and bank-level security.'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'UI/UX Design',
    logo: '/technologies/figma.svg',
    brandColor: '#A259FF',
    badge: 'Pixel-Perfect Prototypes',
    desc: 'Bringing creative ideas to life through comprehensive design systems, interactive prototypes, and human-centered user experiences.'
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'Enterprise CMS',
    logo: '/technologies/wordpress.svg',
    brandColor: '#21759B',
    badge: 'Custom Architecture',
    desc: 'Tailored WordPress solutions, custom Gutenberg blocks, and secure headless CMS architectures built for marketing agility.'
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'Enterprise Framework',
    logo: '/technologies/angular.svg',
    brandColor: '#DD0031',
    badge: 'Type-Safe Platforms',
    desc: 'Engineering robust corporate platforms with modular TypeScript architecture, rigorous type safety, and mission-critical reliability.'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Modern Styling',
    logo: '/technologies/tailwind.svg',
    brandColor: '#38BDF8',
    badge: 'Fluid Responsive UI',
    desc: 'Crafting bespoke, lightning-fast design systems and fluid responsive layouts using modern utility-first CSS architecture.'
  }
];

// --- 2. MAIN COMPONENT ---
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
    <section ref={containerRef} className="py-14 lg:py-20 bg-white relative overflow-hidden font-sans flex flex-col justify-center items-center w-full">
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
            stroke="url(#gradient_line_tech)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient_line_tech" x1="50" y1="350" x2="450" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d946ef" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10 w-full overflow-hidden flex flex-col items-center">
        
        {/* Section Pill Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50/80 border border-purple-200/60 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          World-Class Stack & Tooling
        </div>

        {/* --- Header with interactive lighten-up text --- */}
        <div
          ref={textContainerRef}
          className="text-center max-w-5xl mx-auto mb-12 font-urbanist relative z-20 px-2 flex flex-wrap justify-center gap-x-[0.3em] gap-y-3 lg:gap-y-5"
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
              return (
                <div
                  key={index}
                  className="w-[300px] sm:w-[340px] md:w-[380px] h-[390px] bg-white rounded-[28px] p-7 flex flex-col justify-between border border-gray-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2.5 transition-all duration-300 select-none group relative overflow-hidden"
                >
                  {/* Subtle top-right ambient glow using brand color on hover */}
                  <div
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: item.brandColor }}
                  />

                  {/* Top Header Row: Elevated Logo Badge + Category Tag */}
                  <div className="flex items-center justify-between gap-4 w-full relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm flex items-center justify-center p-3.5 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shrink-0">
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        className="w-10 h-10 object-contain filter group-hover:brightness-105 transition-all"
                        loading="lazy"
                      />
                    </div>

                    <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-gray-50/90 border border-gray-100 text-gray-500 group-hover:border-purple-200 group-hover:text-purple-600 transition-colors">
                      {item.category}
                    </span>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="flex flex-col text-left mt-4 mb-2 relative z-10">
                    <h3 className="text-2xl font-urbanist font-extrabold text-gray-900 mb-2.5 group-hover:text-purple-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm font-urbanist leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom: Sleek Status & Feature Badge */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between w-full relative z-10">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full group-hover:scale-125 transition-transform duration-300"
                        style={{ backgroundColor: item.brandColor }}
                      />
                      <span className="text-xs font-semibold text-gray-700 font-urbanist">
                        {item.badge}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-xs">
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
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