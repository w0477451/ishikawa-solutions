import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. ICONS & ASSETS ---

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

// --- 2. DATA ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Chitu Singh",
    role: "Founder, CEO, Ananant Systems",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80",
    text: "This team did an incredible job redesigning and developing our website. They brought our vision to life in a way that really captures who we are. The whole process was smooth, and I couldn't be happier with the results!",
    stars: 5
  },
  {
    id: 2,
    name: "Tejas Gowda B V",
    role: "Co-Founder, beyondbrands",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150&q=80",
    text: "We couldn't be happier with the website this team built for us! They took our Figma design and brought it to life perfectly, and their attention to detail made all the difference!",
    stars: 5
  },
  {
    id: 3,
    name: "Dev",
    role: "CEO, Alphabet Publications",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=150&h=150&q=80",
    text: "I'm grateful to this team! They turned our books into amazing flipbooks and built a fantastic website. They're also helping with our marketing. It's been a smooth process, and we're thrilled with everything.",
    stars: 5
  }
];

// --- 3. Main Component ---
const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const emojiLeftRef = useRef<HTMLImageElement>(null);
  const emojiRightRef = useRef<HTMLImageElement>(null);

  // --- SPLIT TEXT DATA ---
  const line1 = "See what others are saying.".split(" ");
  const line2 = "Client Success Stories".split(" ");
  const line3 = "If you are not believing just ring us".split(" ");

  // --- GSAP ANIMATION ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. TEXT SCROLL EFFECT (Applied to ALL lines)
      const animateText = (className: string) => {
        const words = textContainerRef.current?.querySelectorAll(className);
        if (words && words.length > 0) {
          gsap.fromTo(words, 
            { color: "#e5e7eb" }, // Start: Very Light Gray (almost invisible)
            { 
              color: "#000000",   // End: ALL lines turn BLACK now
              stagger: 0.05,
              duration: 1,
              ease: "none",
              scrollTrigger: {
                trigger: textContainerRef.current,
                start: "top 85%",
                end: "top 35%",
                scrub: 1.5,
              }
            }
          );
        }
      };

      // Animate all lines to Black
      animateText(".word-line-1"); 
      animateText(".word-line-2"); 
      animateText(".word-line-3"); 

      // 2. Cards Stagger Animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 3. Floating Emojis
      gsap.to(emojiLeftRef.current, {
        y: -15,
        rotation: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(emojiRightRef.current, {
        y: -15,
        rotation: 5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-white relative overflow-hidden font-sans flex flex-col items-center w-full">
      
      {/* Load Urbanist Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
        .font-urbanist { font-family: 'Urbanist', sans-serif; }
      `}</style>

      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
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

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 relative z-10 w-full max-w-7xl">
        
        {/* HEADER SECTION (Zig-Zag Alignment + SAME FONT SIZE) */}
        <div ref={textContainerRef} className="relative w-full max-w-6xl mx-auto mb-16 lg:mb-20 pt-10 flex flex-col gap-3 lg:gap-4">
            
            {/* 1. Main Title - RIGHT ALIGNED */}
            <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-urbanist font-bold tracking-tight flex flex-wrap justify-end gap-x-[0.25em]">
               {line1.map((word, i) => (
                 <span key={i} className="word-line-1 text-[#e5e7eb]">
                   {word}
                 </span>
               ))}
            </h2>

            {/* 2. Middle Title - LEFT ALIGNED + Left Icon */}
            <div className="relative w-full flex justify-start">
                <h3 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-urbanist font-bold tracking-tight flex flex-wrap justify-start gap-x-[0.25em]">
                    {line2.map((word, i) => (
                        <span key={i} className="word-line-2 text-[#e5e7eb]">
                            {word}
                        </span>
                    ))}
                </h3>
                
                {/* Left Icon (Party) */}
                <div className="hidden lg:block absolute -left-32 top-1/2 -translate-y-1/2">
                   <img 
                       ref={emojiLeftRef}
                       src="\images\IMG_1293 1.png" 
                       alt="Party Emoji" 
                       className="w-24 h-24 lg:w-28 lg:h-28 object-contain"
                   />
                </div>
            </div>

            {/* 3. Subtitle - RIGHT ALIGNED + Right Icon */}
            <div className="relative w-full flex justify-end">
                <p className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-urbanist font-bold tracking-tight flex flex-wrap justify-end gap-x-[0.25em]">
                    {line3.map((word, i) => (
                        <span key={i} className="word-line-3 text-[#e5e7eb]">
                            {word}
                        </span>
                    ))}
                </p>

                 {/* Right Icon (Happy) */}
                <div className="hidden lg:block absolute -right-28 top-1/2 -translate-y-1/2">
                   <img 
                       ref={emojiRightRef}
                       src="\images\IMG_1293 2.png" 
                       alt="Happy Emoji" 
                       className="w-24 h-24 lg:w-28 lg:h-28 object-contain"
                   />
                </div>
            </div>

        </div>

        {/* CARDS GRID */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-2 lg:px-10">
            {TESTIMONIALS.map((item) => (
                <div 
                    key={item.id} 
                    className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full justify-between"
                >
                    <div className="mb-8">
                        <p className="font-urbanist text-gray-600 text-[15px] leading-relaxed font-medium">
                            {item.text}
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-urbanist font-bold text-gray-900 text-sm">{item.name}</h4>
                                <span className="font-urbanist text-xs text-gray-400">{item.role}</span>
                            </div>
                        </div>
                        <div className="flex gap-0.5">
                            {[...Array(item.stars)].map((_, i) => (
                                <StarIcon key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;