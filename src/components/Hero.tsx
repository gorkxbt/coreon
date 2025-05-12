'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const animationRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!animationRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate the movement based on mouse position - more subtle
      const moveX = (clientX - innerWidth / 2) / 60;
      const moveY = (clientY - innerHeight / 2) / 60;
      
      // Apply the transform
      animationRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Canvas animation for fluid, modern background
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas dimensions
        const updateCanvasSize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();
        
        // Create fluid, organic particles
        const particles: {
          x: number;
          y: number;
          size: number;
          color: string;
          vx: number;
          vy: number;
          opacity: number;
          opacityDelta: number;
          life: number;
          maxLife: number;
        }[] = [];
        
        // Blobs that move around the canvas
        const blobs: {
          x: number;
          y: number;
          radius: number;
          vx: number;
          vy: number;
          color: string;
        }[] = [];
        
        // Color palette - professional blues with brand colors
        const colors = [
          'rgba(48, 198, 255, 0.06)',  // Coreon blue
          'rgba(30, 144, 255, 0.05)',  // Dodger blue
          'rgba(65, 105, 225, 0.04)',  // Royal blue
          'rgba(0, 87, 164, 0.05)',    // Navy blue
          'rgba(25, 25, 112, 0.04)',   // Midnight blue
        ];
        
        // Create initial blobs
        const blobCount = Math.min(7, Math.max(4, Math.floor(window.innerWidth / 300)));
        for (let i = 0; i < blobCount; i++) {
          blobs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 300 + 150,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
        
        // Function to add new particles
        const addParticles = () => {
          const count = Math.random() * 2 + 1;
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 3 + 1,
              color: colors[Math.floor(Math.random() * colors.length)],
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.3,
              opacity: 0,
              opacityDelta: 0.01,
              life: 0,
              maxLife: Math.random() * 300 + 200
            });
          }
        };
        
        // Create connection lines between nearby particles
        const drawConnections = () => {
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                const opacity = 0.05 * (1 - distance / 150);
                ctx.strokeStyle = `rgba(48, 198, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        };
        
        // Create flowing curve effects
        const drawFlowingCurves = (time: number) => {
          const curves = 3;
          for (let c = 0; c < curves; c++) {
            ctx.beginPath();
            
            // Create flowing wave paths that cross the entire screen
            const yOffset = canvas.height * (c / curves);
            const amplitude = canvas.height * 0.05;
            const frequency = 0.002;
            const speed = 0.0002;
            
            ctx.moveTo(0, yOffset);
            
            for (let x = 0; x < canvas.width; x += 5) {
              const y = yOffset + 
                Math.sin((x * frequency) + (time * speed) + c) * amplitude +
                Math.sin((x * frequency * 0.5) + (time * speed * 0.7) + c) * amplitude;
              
              ctx.lineTo(x, y);
            }
            
            ctx.strokeStyle = `rgba(48, 198, 255, 0.04)`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        };
        
        // Animation function
        const animate = () => {
          // Request the next frame first to ensure smooth animation
          animationFrameId.current = requestAnimationFrame(animate);
          
          const time = Date.now();
          
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw big, semi-transparent blobs
          blobs.forEach(blob => {
            // Update blob position
            blob.x += blob.vx;
            blob.y += blob.vy;
            
            // Bounce off edges
            if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
            if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
            if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
            if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;
            
            // Draw blob
            const gradient = ctx.createRadialGradient(
              blob.x, blob.y, 0,
              blob.x, blob.y, blob.radius
            );
            gradient.addColorStop(0, blob.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.beginPath();
            ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          });
          
          // Draw flowing curves
          drawFlowingCurves(time);
          
          // Occasionally add new particles
          if (Math.random() < 0.1) {
            addParticles();
          }
          
          // Update and draw particles
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Update opacity
            if (p.life < 30) {
              p.opacity += p.opacityDelta;
              if (p.opacity > 0.5) p.opacity = 0.5;
            } else if (p.life > p.maxLife - 30) {
              p.opacity -= p.opacityDelta;
              if (p.opacity < 0) p.opacity = 0;
            }
            
            // Increment life
            p.life++;
            
            // Remove dead particles
            if (p.life >= p.maxLife) {
              particles.splice(i, 1);
              continue;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(')', `, ${p.opacity})`);
            ctx.fill();
          }
          
          // Draw connections between particles
          drawConnections();
        };
        
        // Initialize with some particles
        for (let i = 0; i < 30; i++) {
          addParticles();
        }
        
        // Start animation
        animate();
        
        // Cleanup function
        return () => {
          window.removeEventListener('resize', updateCanvasSize);
          cancelAnimationFrame(animationFrameId.current);
        };
      }
    }
    
    // Cleanup for mouse move event
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
      {/* Modern fluid animation background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Subtle 3D elements with animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={animationRef} className="absolute w-full h-full">
          {/* Abstract geometric shapes with subtle styling */}
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-coreon-blue/5 to-transparent rounded-full transform blur-xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-tr from-coreon-blue/3 to-transparent rounded-full transform blur-xl animate-float-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      <div className="container-custom">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold"
            variants={itemVariants}
          >
            <span className="gradient-text">Enterprise AI Orchestration</span>
            <br />
            <span className="text-white">for Regulated Environments</span>
          </motion.h1>

          <motion.p
            className="mb-10 text-xl text-coreon-gray-light"
            variants={itemVariants}
          >
            Deploy intelligent agent systems with human oversight, complete auditability, and regulatory compliance.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Link 
              href="/demo" 
              className="btn-primary px-8 py-4 text-lg"
            >
              See Live Demo
            </Link>
            <Link 
              href="/docs" 
              className="btn-secondary px-8 py-4 text-lg"
            >
              Documentation
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 p-6 bg-coreon-navy/30 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-coreon-blue">
                  <span className="inline-block w-12 h-12 rounded-full bg-coreon-blue/10 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div>100%</div>
                </div>
                <div className="text-sm text-coreon-gray-light">Compliance</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-coreon-blue">
                  <span className="inline-block w-12 h-12 rounded-full bg-coreon-blue/10 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div>80%</div>
                </div>
                <div className="text-sm text-coreon-gray-light">Cost Reduction</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-coreon-blue">
                  <span className="inline-block w-12 h-12 rounded-full bg-coreon-blue/10 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <div>10x</div>
                </div>
                <div className="text-sm text-coreon-gray-light">Faster Deployment</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-coreon-blue">
                  <span className="inline-block w-12 h-12 rounded-full bg-coreon-blue/10 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  <div>24/7</div>
                </div>
                <div className="text-sm text-coreon-gray-light">Human Oversight</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 