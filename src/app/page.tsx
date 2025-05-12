'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import UseCases from '../components/UseCases';
import Architecture from '../components/Architecture';
import Agents from '../components/Agents';
import Security from '../components/Security';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      <div 
        className="fixed inset-0 z-[-1] bg-coreon-navy-dark"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(8, 17, 54, 0.8) 0%, rgba(5, 10, 32, 1) 100%)',
          backgroundSize: 'cover',
        }}
      />
      
      <Header />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Features />
        <UseCases />
        <Architecture />
        <Agents />
        <Security />
        <CTA />
        <Footer />
      </motion.div>
    </main>
  );
} 