'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate the movement based on mouse position
      const moveX = (clientX - innerWidth / 2) / 50;
      const moveY = (clientY - innerHeight / 2) / 50;
      
      // Apply the transform
      orbitRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={orbitRef} className="absolute w-full h-full">
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-coreon-blue/5 filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 h-80 w-80 rounded-full bg-coreon-blue/10 filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#30C6FF10_1px,transparent_1px),linear-gradient(to_bottom,#30C6FF10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          {/* Orbiting elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-96 w-96">
              <div className="absolute top-0 left-1/2 h-3 w-3 rounded-full bg-coreon-blue/70 animated-orbit" style={{ animationDuration: '15s' }}></div>
              <div className="absolute top-1/4 left-1/2 h-2 w-2 rounded-full bg-coreon-blue/50 animated-orbit" style={{ animationDuration: '20s', animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 left-1/2 h-4 w-4 rounded-full bg-coreon-blue/60 animated-orbit" style={{ animationDuration: '25s', animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="mb-6">
            <span className="gradient-text">Orchestrating</span> Intelligent<br />
            Agent Systems for Enterprise
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl mb-8 max-w-2xl mx-auto">
            Deploy secure, compliant AI agent networks with human oversight for critical operations in regulated industries.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#platform" className="btn-primary">
              Explore Platform
            </Link>
            <Link href="#docs" className="btn-secondary">
              Read Documentation
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-16 p-6 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20"
          >
            <div className="text-sm text-coreon-gray-light/70 mb-2">Trusted by regulated industries</div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {['Healthcare', 'Finance', 'Insurance', 'Public Sector'].map((industry) => (
                <div key={industry} className="text-coreon-gray-light font-medium">
                  {industry}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 