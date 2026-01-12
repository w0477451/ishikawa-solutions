import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// --- DATA (Extracted from your image) ---
const FAQS = [
    {
        question: "Why not hire a full-time designer?",
        answer: "Hiring a full-time senior designer can cost over $100,000 annually, plus benefits. Our monthly subscription allows you to pause and resume as needed, ensuring you only pay for a designer when you have work available."
    },
    {
        question: "What is the average turnaround time?",
        answer: "On average, most requests are completed in just two days or less. However, more complex requests can take longer."
    },
    {
        question: "What does \"unlimited\" requests mean?",
        answer: "Once subscribed, you're able to add as many design requests to your queue as you'd like, and they will be delivered one by one."
    },
    {
        question: "How does the pause feature work?",
        answer: "Billing cycles are based on a 31-day period. If you use the service for 21 days and then pause, you'll have 10 days of service remaining to be used anytime."
    },
    {
        question: "In what tools will the designs be created?",
        answer: "Most requests are designed using Figma, Adobe Illustrator, or Adobe Photoshop, depending on the nature of the request."
    },
    {
        question: "Is it possible to request a refund?",
        answer: "Due to the high-quality nature of the work, there will be no refunds issued once work has begun on your requests."
    }
];

// --- SINGLE ITEM COMPONENT ---
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // Individual "Pill" Container
        <div
            className={`mb-4 rounded-2xl border transition-all duration-300 overflow-hidden
            ${isOpen
                    ? 'bg-pink-100 border-pink-200 shadow-sm' // Active State
                    : 'bg-white/30 border-pink-100/50 hover:bg-white/50' // Inactive State
                }`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
            >
                <span className="text-[#4A4A4A] font-urbanist text-lg font-medium">
                    {question}
                </span>
                <div className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                </div>
            </button>

            {/* Accordion Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <p className="px-6 pb-6 text-[#666] font-urbanist leading-relaxed text-[15px]">
                    {answer}
                </p>
            </div>
        </div>
    )
}

// --- MAIN SECTION ---
const FAQ: React.FC = () => {
    return (
        <section className="py-20 lg:py-24 bg-[#FBD3DE] w-full flex justify-center relative overflow-hidden">

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
                    {/* Using a placeholder 3D image. 
                Replace 'src' with your local image path: "/images/your-3d-guy.png" 
            */}
                    <img
                        src="\footer.webp"
                        alt="FAQ Illustration"
                        className="w-[300px] md:w-[450px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                </div>

            </div>
        </section>
    );
};

export default FAQ;