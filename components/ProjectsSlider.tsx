import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useConsultationModal } from './ConsultationModal';

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

// --- 9 INDUSTRY PORTFOLIO DATA FROM LIVE SITE ---
const PROJECTS = [
  {
    id: '01',
    industry: 'INDUSTRY TYPE',
    name: 'IT INDUSTRIES',
    service: 'Custom Software & Cloud Solutions',
    targetService: 'Custom Software Development Service',
    bgColor: 'bg-[#E8F4FD]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/IT-industries.png',
    imageAlt: 'IT Industries'
  },
  {
    id: '02',
    industry: 'INDUSTRY TYPE',
    name: 'HEALTHCARE',
    service: 'Patient Portals & Telehealth Apps',
    targetService: 'Mobile App Development Service',
    bgColor: 'bg-[#FFE4D6]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Healthcare.png',
    imageAlt: 'Healthcare'
  },
  {
    id: '03',
    industry: 'INDUSTRY TYPE',
    name: 'FINANCE & BANKING',
    service: 'Fintech, Security & Payment Portals',
    targetService: 'Custom Software Development Service',
    bgColor: 'bg-[#CAE3FF]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Finance-and-Banking.png',
    imageAlt: 'Finance & Banking'
  },
  {
    id: '04',
    industry: 'INDUSTRY TYPE',
    name: 'EDUCATION',
    service: 'LMS & Interactive Learning Platforms',
    targetService: 'Website Development Service',
    bgColor: 'bg-[#FFDFE5]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Education.png',
    imageAlt: 'Education'
  },
  {
    id: '05',
    industry: 'INDUSTRY TYPE',
    name: 'TRAVEL & HOSPITALITY',
    service: 'Booking Engines & Experience Apps',
    targetService: 'Website Development Service',
    bgColor: 'bg-[#E3F2FD]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Travel-and-Hospitality.png',
    imageAlt: 'Travel & Hospitality'
  },
  {
    id: '06',
    industry: 'INDUSTRY TYPE',
    name: 'REAL ESTATE',
    service: 'Property Showcases & CRM Solutions',
    targetService: 'Website Development Service',
    bgColor: 'bg-[#E8F5E9]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Real-Estate.png',
    imageAlt: 'Real Estate'
  },
  {
    id: '07',
    industry: 'INDUSTRY TYPE',
    name: 'TRANSPORTATION',
    service: 'Fleet Tracking & Logistics Platforms',
    targetService: 'Custom Software Development Service',
    bgColor: 'bg-[#FFF3E0]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Transportation.png',
    imageAlt: 'Transportation'
  },
  {
    id: '08',
    industry: 'INDUSTRY TYPE',
    name: 'GAMING',
    service: 'Interactive Web & Immersive UI/UX',
    targetService: 'UI/UX Design Service',
    bgColor: 'bg-[#F3E5F5]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Gaming.png',
    imageAlt: 'Gaming'
  },
  {
    id: '09',
    industry: 'INDUSTRY TYPE',
    name: 'RETAIL',
    service: 'Omnichannel E-commerce & POS Systems',
    targetService: 'E-commerce Solutions Service',
    bgColor: 'bg-[#E0F2F1]',
    image: 'https://ishikawasolutions.in/wp-content/uploads/2025/11/Retail.png',
    imageAlt: 'Retail'
  }
];

const ProjectsSlider: React.FC = () => {
  const { openModal } = useConsultationModal();
  const heroRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // --- CAROUSEL STATE ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Calculate responsive visible slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, PROJECTS.length - visibleSlides);

  // Navigate with seamless wrap-around
  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Autoplay (every 4.5 seconds, paused when hovering or dragging)
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [handleNext, isHovered, isDragging]);

  // Touch handlers for mobile swipe
  const minSwipeDistance = 45;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX - e.clientX;
    if (diff > minSwipeDistance) {
      handleNext();
    } else if (diff < -minSwipeDistance) {
      handlePrev();
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };


  // GSAP Animations
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
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectSectionRef.current,
          start: "top 65%",
        }
      });
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
      <div className="px-4 pt-20 pb-0 relative z-30">
        <div
          ref={heroRef}
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
              <button
                onClick={() => openModal()}
                className="px-8 py-3 rounded-full border border-gray-400 text-gray-600 font-bold hover:bg-[#3D3028] hover:text-white hover:border-[#3D3028] transition-all duration-300 bg-white/30 backdrop-blur-sm cursor-pointer shadow-sm active:scale-95"
              >
                Get started
              </button>
            </div>

            {/* Right Image (3D Character) */}
            <div className="absolute bottom-0 right-0 lg:right-10 w-full lg:w-1/2 h-full flex items-end justify-center lg:justify-end pointer-events-none z-0 lg:z-20 opacity-40 lg:opacity-100">
              <img
                src="/3d.webp"
                alt="3D Character"
                width="600"
                height="800"
                className="w-auto h-[60%] md:h-[80%] lg:h-[135%] max-w-none object-contain object-bottom animate-[float_6s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          2. PROJECTS SECTION (Interactive Carousel Slider)
      ========================================= */}
      <section
        id="portfolio"
        ref={projectSectionRef}
        className="relative z-10 w-full -mt-[150px] pt-[220px] pb-32 bg-[#FFC8D3] scroll-mt-10 overflow-hidden select-none"
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

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
          {/* Section Header & Interactive Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-purple-900 text-xs font-extrabold uppercase tracking-widest mb-4">
                <Sparkles size={14} className="text-[#D03BF3]" />
                Our Portfolio & Case Studies
              </div>
              <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] drop-shadow-sm">
                Get a Glimpse of the <br />
                Amazing Projects We <br />
                Have Worked on.
              </h2>
            </div>

            {/* Navigation Arrows & Live Slide Badge */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Slide Counter Badge */}
              <div className="px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-white font-extrabold text-sm tracking-wider shadow-sm">
                <span className="text-purple-900 font-black">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="opacity-60 mx-1.5">/</span>
                <span className="opacity-80">{String(PROJECTS.length).padStart(2, '0')}</span>
              </div>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg border border-white/80 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md hover:text-[#D03BF3]"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg border border-white/80 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md hover:text-[#D03BF3]"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* ==================== CAROUSEL SLIDER TRACK ==================== */}
          <div
            className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            <div
              className="flex transition-transform duration-700 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`
              }}
            >
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="shrink-0 px-3 md:px-4"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
                  {/* --- High-End Glassmorphic Card --- */}
                  <div
                    onClick={() => openModal(project.targetService)}
                    className="group relative bg-white/50 hover:bg-white/85 backdrop-blur-md rounded-[36px] p-5 md:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_48px_rgba(208,59,243,0.22)] border border-white/80 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between h-full"
                  >
                    {/* Visual Image Container */}
                    <div className={`relative w-full aspect-[4/3.2] rounded-[26px] overflow-hidden ${project.bgColor} shadow-inner`}>
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 select-none"
                      />

                      {/* Top-Left ID & Category Pill */}
                      <div className="absolute top-3.5 left-3.5 bg-black/45 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <Sparkles size={11} className="text-pink-300" />
                        <span>[{project.id}]</span>
                      </div>

                      {/* Top-Right 'Case Study' Pill */}
                      <div className="absolute top-3.5 right-3.5 bg-white/85 backdrop-blur-md text-[#D03BF3] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/60 shadow-sm">
                        Case Study
                      </div>

                      {/* Hover Overlay with Action Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D03BF3] to-[#22D3EE] text-white text-xs font-bold shadow-xl flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          <span>View Details & Consult</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>

                    {/* Card Content & Details */}
                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-extrabold tracking-widest text-[#8B5CF6] uppercase block mb-1">
                          {project.industry}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#1F2937] tracking-tight uppercase leading-tight truncate group-hover:text-[#D03BF3] transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs font-medium text-gray-500 mt-1 truncate">
                          {project.service}
                        </p>
                      </div>

                      {/* Interactive Round Button Icon */}
                      <div className="w-11 h-11 rounded-full bg-white group-hover:bg-gradient-to-tr group-hover:from-[#D03BF3] group-hover:to-[#22D3EE] text-gray-700 group-hover:text-white flex items-center justify-center shrink-0 shadow-md border border-gray-100 group-hover:border-transparent group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== INTERACTIVE PAGINATION DOTS ==================== */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-10 h-3 bg-white shadow-md'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* ==================== CONSULTATION / VIEW PORTFOLIO CTA ==================== */}
          <div className="mt-14 text-center">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#D03BF3] font-bold text-base shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer border border-white/60"
            >
              <span>View Portfolio & Free Consultation</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsSlider;