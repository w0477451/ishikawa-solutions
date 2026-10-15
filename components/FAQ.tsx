import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// --- FINAL FAQS (From PDF Specifications) ---
const FAQS = [
  {
    question: "Do you provide hosting and domain services?",
    answer: "Yes. We are a full-service website development company for professional businesses. Every plan includes premium hosting, domain setup, SSL security, daily backups, and business email setup. You don't need to buy or manage anything separately - we handle your entire business website infrastructure so you can focus on your business."
  },
  {
    question: "Do you offer maintenance after launch?",
    answer: "Yes. Unlike freelancers who disappear after launch, we provide continuous maintenance and support for your business website. This includes security updates, speed optimization, backups, and uptime monitoring. Your website stays fast, secure, and converting 24/7 with no extra fees."
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Absolutely. Our custom website redesign service is built specifically for established businesses. If your current website looks outdated, loads slowly, or isn't bringing in customers, we transform it into a modern, high-converting, mobile-responsive business website that builds trust and generates more leads and sales."
  },
  {
    question: "Do you use templates?",
    answer: "No, never. We provide 100% custom website development for businesses. We don't use generic templates that make your brand look cheap. Every business website is custom-designed from scratch to match your brand, your industry, and your growth goals - giving you a unique competitive advantage."
  },
  {
    question: "What does \"unlimited\" requests mean?",
    answer: "Once you're subscribed to our professional website development service, you can add as many design and development requests as you want to your queue. We work on one request at a time and deliver them one by one until your business website is perfect. It's like having an unlimited in-house web development team for a flat monthly fee."
  },
  {
    question: "How does the pause feature work?",
    answer: "Our service is built for business owners. Billing is based on a flexible 31-day cycle. For example, if you use our website development service for 21 days and then need to pause, you will still have 10 days of service remaining that you can use anytime in the future. You only pay for the days you use - pause and resume whenever you need."
  }
];

// --- SINGLE ITEM COMPONENT ---
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Individual "Pill" Container
    <div
      className={`mb-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'bg-pink-100/90 border-pink-300 shadow-sm'
          : 'bg-white/40 border-pink-100/60 hover:bg-white/60'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-[#2D2D2D] font-urbanist text-lg font-bold pr-4">
          {question}
        </span>
        <div className={`text-pink-600 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={22} />
        </div>
      </button>

      {/* Accordion Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-6 text-[#555] font-urbanist leading-relaxed text-[15px]">
          {answer}
        </p>
      </div>
    </div>
  );
};

// --- MAIN SECTION ---
const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 lg:py-24 bg-[#FBD3DE] w-full flex justify-center relative overflow-hidden scroll-mt-20">
      {/* Load Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
        .font-urbanist { font-family: 'Urbanist', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* LEFT COL: Questions List */}
        <div className="order-2 lg:order-1">
          {FAQS.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>

        {/* RIGHT COL: 3D Illustration */}
        <div className="order-1 lg:order-2 flex justify-center items-center">
          <img
            src="/footer.webp"
            alt="FAQ Illustration"
            className="w-[300px] md:w-[450px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;