import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import TransformSection from './components/TransformSection';
import Services from './components/Services';
import Technologies from './components/Technologies';
import ProjectsSlider from './components/ProjectsSlider';
import Testimonials from './components/Testimonials';
import Cards from './components/cards';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <SmoothScroll>
      <main className="bg-white min-h-screen">
        <Navbar />
        <Hero />
        <LogoMarquee />
        <TransformSection />
        <Services />
        <Technologies />
        <ProjectsSlider />
        <Testimonials />
        <Cards />
        <CTA />
        <FAQ />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default App;
