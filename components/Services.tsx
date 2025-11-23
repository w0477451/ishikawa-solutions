import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Code, 
  Palette, 
  Zap, 
  Cloud, 
  LifeBuoy, 
  ChevronRight 
} from 'lucide-react';

// Custom hook for viewport detection (Animation trigger)
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); 
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, isInView] as const;
};

// Updated Data with New Content and Icons
const SERVICES_DATA = [
  { 
    id: 1, 
    title: "Website Development Service", 
    description: "Crafting responsive, high-performance websites tailored to your brand's unique identity and business goals.", 
    icon: Globe 
  },
  { 
    id: 2, 
    title: "E-commerce Solutions Service", 
    description: "Building scalable online stores with secure payment gateways and intuitive user journeys to maximize sales.", 
    icon: ShoppingCart 
  },
  { 
    id: 3, 
    title: "Mobile App Development Service", 
    description: "Developing robust iOS and Android applications that deliver seamless experiences and keep users engaged.", 
    icon: Smartphone 
  },
  { 
    id: 4, 
    title: "Custom Software Development Service", 
    description: "Architecting bespoke software solutions designed to solve complex operational challenges and drive efficiency.", 
    icon: Code 
  },
  { 
    id: 5, 
    title: "UI/UX Design Service", 
    description: "Creating intuitive and visually stunning interfaces that prioritize user experience and brand consistency.", 
    icon: Palette 
  },
  { 
    id: 6, 
    title: "Integration & Automation Service", 
    description: "Streamlining workflows by connecting disparate systems and automating repetitive tasks for maximum productivity.", 
    icon: Zap 
  },
  { 
    id: 7, 
    title: "Cloud Solutions & Hosting Service", 
    description: "Deploying secure, scalable cloud infrastructures and reliable hosting to ensure your digital assets are always online.", 
    icon: Cloud 
  },
  { 
    id: 8, 
    title: "Maintenance & Support Service", 
    description: "Providing dedicated technical support and regular updates to keep your platforms secure and performing at their peak.", 
    icon: LifeBuoy 
  },
];

const Services: React.FC = () => {
  const [containerRef, isVisible] = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-white flex justify-center items-center min-h-screen font-sans">
      
      {/* --- YOUR CUSTOM CSS (Restored) --- */}
      <style>{`
        #my-custom-services-section {
            --grad-start: #FC00FF; 
            --grad-end: #00DBDE;   
        }
        .svc-card {
            background: #fff;
            border-radius: 25px;
            padding: 40px 30px;
            display: flex;
            flex-direction: column;
            min-height: 380px;
            cursor: pointer;
            transition: all 0.4s ease-in-out;
            position: relative;
            text-align: left;
            border: 1px solid #f0f0f0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
            overflow: hidden;
        }
        .svc-card h3 {
            font-size: 20px; /* Slightly reduced for longer titles */
            font-weight: 700;
            margin: 0 0 20px 0;
            color: #333;
            transition: color 0.4s ease;
            line-height: 1.3;
        }
        .svc-card p {
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 30px 0;
            color: #666;
            flex-grow: 1;
            transition: color 0.4s ease;
        }
        .svc-card .card-link {
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            color: var(--grad-end);
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: color 0.4s ease;
        }
        .svc-card .icon-box {
            width: 60px;
            height: 60px;
            border-radius: 50% 50% 50% 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
            background: linear-gradient(135deg, var(--grad-start), var(--grad-end));
            color: #fff;
            transition: all 0.4s ease-in-out;
        }

        /* --- HOVER EFFECTS --- */
        .svc-card:hover {
            background: linear-gradient(135deg, var(--grad-start), var(--grad-end));
            transform: translateY(-10px);
            box-shadow: 0 15px 35px rgba(252, 0, 255, 0.3);
            border-color: transparent;
        }
        .svc-card:hover h3,
        .svc-card:hover p,
        .svc-card:hover .card-link {
            color: #fff !important;
        }
        .svc-card:hover .icon-box {
            background: #fff;
            color: var(--grad-start);
        }
        
        /* Animation Classes */
        .svc-fade-up {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .svc-fade-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
      `}</style>

      {/* --- MAIN GRAY CONTAINER --- */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[1400px] bg-[#EAEBED] rounded-[40px] lg:rounded-[60px] px-6 py-16 lg:p-20 mx-4 lg:mx-8 overflow-hidden shadow-sm"
        id="my-custom-services-section"
      >
        
        {/* Decorative Dots (Top Left) */}
        <div className="absolute top-8 left-8 opacity-20 pointer-events-none">
           <div className="grid grid-cols-4 gap-2">
             {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>)}
           </div>
        </div>
        {/* Decorative Dots (Bottom Right) */}
        <div className="absolute bottom-8 right-8 opacity-20 pointer-events-none">
           <div className="grid grid-cols-4 gap-2">
             {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>)}
           </div>
        </div>

        {/* Header */}
        <div className={`text-center mb-16 relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-bold tracking-widest uppercase text-xs mb-2 block">
            Ishikawa Solutions
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A]">Our Services</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {SERVICES_DATA.map((service, index) => (
            <div 
              key={service.id} 
              className={`svc-card svc-fade-up ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3>{service.title}</h3>
              
              <div className="icon-box">
                 <service.icon size={28} />
              </div>
              
              <p>{service.description}</p>
              
              <a href="#" className="card-link">
                  View Details <ChevronRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;