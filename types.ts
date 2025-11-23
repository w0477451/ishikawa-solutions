import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
  color: string;
}

export interface Technology {
  name: string;
  icon: string; // URL or component logic
  color: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  rating: number;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  color: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
      [elemName: string]: any;
    }
  }
}