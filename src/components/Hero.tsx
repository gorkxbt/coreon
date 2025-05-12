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
      const moveX = (clientX - innerWidth / 2) / 80;
      const moveY = (clientY - innerHeight / 2) / 80;
      
      // Apply the transform
      animationRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Canvas animation for data visualization
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
        
        // Data visualization nodes
        const nodes: {
          x: number;
          y: number;
          radius: number;
          color: string;
          connections: number[];
          speed: number;
          angle: number;
        }[] = [];
        
        // Create nodes
        const nodeCount = Math.min(12, Math.max(8, Math.floor(window.innerWidth / 150)));
        const colors = [
          'rgba(64, 145, 220, 0.7)',   // Blue
          'rgba(100, 180, 220, 0.6)',   // Light blue
          'rgba(100, 120, 190, 0.7)',   // Indigo
          'rgba(80, 170, 180, 0.7)',    // Teal
        ];
        
        for (let i = 0; i < nodeCount; i++) {
          const centerX = canvas.width * 0.5;
          const centerY = canvas.height * 0.5;
          const angle = (i / nodeCount) * Math.PI * 2;
          const radius = Math.random() * 150 + 100;
          
          nodes.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            radius: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            connections: [],
            speed: (Math.random() - 0.5) * 0.2,
            angle: Math.random() * Math.PI * 2
          });
        }
        
        // Establish connections between nodes
        for (let i = 0; i < nodes.length; i++) {
          const connectionsCount = Math.floor(Math.random() * 3) + 1;
          for (let j = 0; j < connectionsCount; j++) {
            const target = (i + j + 1) % nodes.length;
            if (!nodes[i].connections.includes(target)) {
              nodes[i].connections.push(target);
            }
          }
        }
        
        // Animation function
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Update node positions - subtle movement
          nodes.forEach(node => {
            node.x += Math.cos(node.angle) * node.speed;
            node.y += Math.sin(node.angle) * node.speed;
            
            // Boundary check with gentle bounce
            const margin = 50;
            if (node.x < margin) {
              node.x = margin;
              node.angle = Math.PI - node.angle;
            } else if (node.x > canvas.width - margin) {
              node.x = canvas.width - margin;
              node.angle = Math.PI - node.angle;
            }
            
            if (node.y < margin) {
              node.y = margin;
              node.angle = -node.angle;
            } else if (node.y > canvas.height - margin) {
              node.y = canvas.height - margin;
              node.angle = -node.angle;
            }
          });
          
          // Draw connections first (so they appear behind nodes)
          nodes.forEach((node, i) => {
            node.connections.forEach(targetIndex => {
              const target = nodes[targetIndex];
              
              // Calculate distance for opacity
              const dx = target.x - node.x;
              const dy = target.y - node.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const maxDistance = 300;
              
              if (distance < maxDistance) {
                // Create gradient for connection
                const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
                const baseColor = node.color.replace(/[\d.]+\)$/, '');
                
                gradient.addColorStop(0, `${baseColor}0.7)`);
                gradient.addColorStop(0.5, `${baseColor}0.3)`);
                gradient.addColorStop(1, `${baseColor}0.7)`);
                
                // Draw connection line
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(target.x, target.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                
                // Draw data packets moving along the connection
                const now = Date.now() / 1000;
                const speed = 2; // seconds to travel the line
                const t = (now % speed) / speed;
                
                const packetX = node.x + dx * t;
                const packetY = node.y + dy * t;
                
                ctx.beginPath();
                ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fill();
              }
            });
          });
          
          // Draw nodes
          nodes.forEach(node => {
            // Glow effect
            const gradient = ctx.createRadialGradient(
              node.x, node.y, 0,
              node.x, node.y, node.radius * 3
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Node core
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
          });
          
          animationFrameId.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        // Cleanup function for this specific context
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
      {/* Professional data visualization background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* 3D elements with subtle animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={animationRef} className="absolute w-full h-full">
          {/* Abstract 3D planes with more professional styling */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-coreon-blue/5 to-transparent rounded-lg transform rotate-12 animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-coreon-blue/3 to-transparent rounded-lg transform -rotate-12 animate-float-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Enterprise architecture visualization */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 opacity-20">
            {/* Horizontal layers representing enterprise architecture */}
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-coreon-blue/40 to-transparent top-0"></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-coreon-blue/30 to-transparent top-1/4"></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-coreon-blue/30 to-transparent top-2/4"></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-coreon-blue/30 to-transparent top-3/4"></div>
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-coreon-blue/40 to-transparent bottom-0"></div>
            
            {/* Vertical connectors */}
            <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-coreon-blue/30 to-transparent left-1/4"></div>
            <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-coreon-blue/30 to-transparent left-2/4"></div>
            <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-coreon-blue/30 to-transparent left-3/4"></div>
            
            {/* Layer labels */}
            <div className="absolute -right-20 top-0 text-xs text-coreon-blue/40">Interface Layer</div>
            <div className="absolute -right-20 top-1/4 text-xs text-coreon-blue/40">Business Logic</div>
            <div className="absolute -right-20 top-2/4 text-xs text-coreon-blue/40">Data Processing</div>
            <div className="absolute -right-20 top-3/4 text-xs text-coreon-blue/40">Infrastructure</div>
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
            <Link href="/demo" className="btn-primary">
              Live Demo
            </Link>
            <Link href="/docs" className="btn-secondary">
              Documentation
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