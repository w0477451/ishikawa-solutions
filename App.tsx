import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';

// Lazy Load Below-the-fold Components
const TransformSection = React.lazy(() => import('./components/TransformSection'));
const Services = React.lazy(() => import('./components/Services'));
const Technologies = React.lazy(() => import('./components/Technologies'));
const ProjectsSlider = React.lazy(() => import('./components/ProjectsSlider'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Cards = React.lazy(() => import('./components/Cards'));
const CTA = React.lazy(() => import('./components/CTA'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const AIChatbot = React.lazy(() => import('./components/AIChatbot'));
const Footer = React.lazy(() => import('./components/Footer'));

// Admin (Lazy)
const AdminLogin = React.lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));

const LoadingFallback = () => <div className="py-20 text-center text-gray-400">Loading...</div>;

const LandingPage = () => (
  <SmoothScroll>
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <LogoMarquee />

      <Suspense fallback={<LoadingFallback />}>
        <TransformSection />
        <Services />
        <Technologies />
        <ProjectsSlider />
        <Testimonials />
        <Cards />
        <CTA />
        <FAQ />
        <AIChatbot />
        <Footer />
      </Suspense>
    </main>
  </SmoothScroll>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Navigate to="/admin/login" replace />
          </Suspense>
        }
      />
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
