import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

// Custom hook to detect when element is in viewport (replaces ScrollTrigger)
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Once triggered, we can disconnect if we only want it to play once
        observer.disconnect();
      }
    }, { threshold: 0.3, ...options }); // Trigger when 30% visible

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isInView] as const;
};

const TransformSection: React.FC = () => {
  const [containerRef, isVisible] = useInView();

  const features = [
    {
      title: "Drive Business Growth",
      desc: "Our web development creates professional, user-friendly sites that drive sales."
    },
    {
      title: "Customization With Scalability",
      desc: "We offer custom solutions that scale with your business and industry needs."
    },
    {
      title: "Integrating Advanced Features",
      desc: "We add AI chatbots and analytics to boost engagement and keep your site ahead."
    },
    {
      title: "Enhancing User Experience",
      desc: "We ensure fast, mobile-friendly, and easy-to-navigate websites for a seamless experience."
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-20 lg:py-0 lg:min-h-screen bg-white overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-stretch">
          
          {/* --- LEFT COLUMN: Visuals --- */}
          <div className="relative flex items-center justify-center lg:justify-end py-8 lg:py-0">
             
             {/* The Pink Background Layer 
                 Animation: Grows from bottom (scale-y-0 to scale-y-100)
             */}
             <div 
               className={`pink-bg-shape absolute top-0 right-0 bottom-0 w-[90%] h-full bg-[#FFEAF3] rounded-[40px] lg:rounded-[50px] -z-10 transform origin-bottom transition-transform duration-1000 ease-out ${isVisible ? 'scale-y-100' : 'scale-y-0'}`}
               style={{ transformOrigin: 'bottom' }}
             ></div>
             
             {/* The Tablet Image 
                 Animation: Slides in from left + Fades in + Continuous Float
             */}
             <div 
                className={`relative z-10 w-full max-w-[800px] lg:-translate-x-10 transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
             >
                <div className="animate-float">
                  <img 
                     src="\images\wewr.png" 
                     alt="Dashboard Interface on Tablet" 
                     className="w-full h-auto object-contain drop-shadow-2xl scale-110"
                     onError={(e) => {
                       e.currentTarget.src = "https://cdn.dribbble.com/users/1615584/screenshots/15967346/media/6d732e0467955e7c044031e3218f7f6c.jpg?resize=1000x750&vertical=center";
                     }}
                  />
                </div>
             </div>
          </div>

          {/* --- RIGHT COLUMN: Content --- */}
          <div className="transform-content pl-0 lg:pl-6 flex flex-col justify-center">
            {/* Title Animation */}
            <div className={`transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* UPDATED: Reduced text size from text-4xl/text-[3.5rem] to text-3xl/text-5xl */}
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.1] font-sans tracking-tight">
                Transform Your Website into a <br className="hidden lg:block"/>
                Sales Machine.
              </h2>
            </div>
            
            {/* Description Animation */}
            <div className={`transition-all duration-1000 ease-out delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-gray-500 text-lg lg:text-xl mb-10 leading-relaxed font-medium">
                With our deep industry expertise, we provide custom web solutions that go beyond meeting your unique digital needs. We drive growth, improve user experience, and ensure scalable, long-term success across all sectors.
              </p>
            </div>

            {/* List Animation */}
            <div className="space-y-8">
              {features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className={`feature-item flex items-start gap-5 group transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: `${900 + (idx * 100)}ms` }} // Stagger effect
                  >
                      <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                              <Check size={18} strokeWidth={4} />
                          </div>
                      </div>
                      <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                          <p className="text-gray-500 text-base leading-relaxed max-w-lg">
                            {feature.desc}
                          </p>
                      </div>
                  </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TransformSection;