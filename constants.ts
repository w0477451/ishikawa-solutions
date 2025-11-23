import { Code, ShoppingBag, Megaphone, Layout, Smartphone, BarChart, Globe, Zap, Palette, Cloud, ShieldCheck, Terminal, Workflow } from 'lucide-react';
import { Service, Testimonial, FaqItem, Project } from './types';

export const NAV_ITEMS = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Website Development Service',
    description: "Crafting responsive, high-performance websites tailored to your brand's unique identity and business goals.",
    icon: Globe,
    iconClass: 'fa-solid fa-laptop-code',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'E-commerce Solutions Service',
    description: 'Building scalable online stores with secure payment gateways and intuitive user journeys to maximize sales.',
    icon: ShoppingBag,
    iconClass: 'fa-solid fa-cart-shopping',
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Mobile App Development Service',
    description: 'Developing robust iOS and Android applications that deliver seamless experiences and keep users engaged.',
    icon: Smartphone,
    iconClass: 'fa-solid fa-mobile-screen-button',
    color: 'bg-pink-500',
  },
  {
    id: 4,
    title: 'Custom Software Development Service',
    description: 'Architecting bespoke software solutions designed to solve complex operational challenges and drive efficiency.',
    icon: Terminal,
    iconClass: 'fa-solid fa-gears',
    color: 'bg-indigo-500',
  },
  {
    id: 5,
    title: 'UI/UX Design Service',
    description: 'Creating intuitive and visually stunning interfaces that prioritize user experience and brand consistency.',
    icon: Palette,
    iconClass: 'fa-solid fa-pen-ruler',
    color: 'bg-orange-400',
  },
  {
    id: 6,
    title: 'Integration & Automation Service',
    description: 'Streamlining workflows by connecting disparate systems and automating repetitive tasks for maximum productivity.',
    icon: Zap,
    iconClass: 'fa-solid fa-network-wired',
    color: 'bg-teal-500',
  },
  {
    id: 7,
    title: 'Cloud Solutions & Hosting Service',
    description: 'Deploying secure, scalable cloud infrastructures and reliable hosting to ensure your digital assets are always online.',
    icon: Cloud,
    iconClass: 'fa-solid fa-cloud-arrow-up',
    color: 'bg-cyan-500',
  },
  {
    id: 8,
    title: 'Maintenance & Support Service',
    description: 'Providing dedicated technical support and regular updates to keep your platforms secure and performing at their peak.',
    icon: ShieldCheck,
    iconClass: 'fa-solid fa-headset',
    color: 'bg-green-500',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "This team did an incredible job redesigning and developing our website. They brought our vision to life in a way that really captures who we are.",
    author: "Chitu Singh",
    role: "Founder, CEO",
    rating: 5,
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    text: "We couldn't be happier with the website this team built for us! They took our Figma design and brought it to life perfectly, and their attention to detail made all the difference!",
    author: "Tejas Gowda B V",
    role: "Co-Founder",
    rating: 5,
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    text: "I'm grateful to this team! They turned our books into amazing flipbooks and built a fantastic website. It's been a smooth process, and we're thrilled with everything.",
    author: "Dev",
    role: "CEO, Alphabet Publications",
    rating: 5,
    image: "https://picsum.photos/100/100?random=3"
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "Why not hire a full-time designer?",
    answer: "Hiring a senior full-time designer can cost over $100k annually, plus benefits. With us, you get a whole team of experts for a fraction of the price, with the flexibility to pause or cancel anytime."
  },
  {
    question: "What is the average turnaround time?",
    answer: "For most requests, we deliver initial designs within 2-3 business days. Complex projects like full website builds may take longer, but we keep you updated every step of the way."
  },
  {
    question: "What does 'unlimited' requests mean?",
    answer: "Once subscribed, you can add as many design requests to your queue as you'd like, and they will be delivered one by one."
  },
  {
    question: "How does the pause feature work?",
    answer: "We understand you might not have enough work to fill up an entire month. You can pause your subscription and return when you have more needs."
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Web App",
    image: "https://picsum.photos/800/600?random=10",
    color: "bg-indigo-500"
  },
  {
    id: 2,
    title: "E-Commerce Store",
    category: "Shopify",
    image: "https://picsum.photos/800/600?random=11",
    color: "bg-pink-500"
  },
  {
    id: 3,
    title: "Travel Booking",
    category: "UI/UX Design",
    image: "https://picsum.photos/800/600?random=12",
    color: "bg-teal-500"
  }
];

export const TECHNOLOGIES = [
  { name: "Figma", color: "#F24E1E" },
  { name: "WordPress", color: "#21759B" },
  { name: "React Js", color: "#61DAFB" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Node Js", color: "#339933" },
];