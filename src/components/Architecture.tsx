'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const architectureLayers = [
  {
    id: 'data-layer',
    name: 'Data Abstraction Layer',
    description: 'Ingests structured and unstructured enterprise data, performs normalization, validation, and enriches it with context.',
    features: ['Data format normalization', 'Schema validation', 'Context generation using NER'],
    color: 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10',
  },
  {
    id: 'agent-mesh',
    name: 'Agent Mesh',
    description: 'Core orchestration system where multiple AI agents are configured and interconnected to fulfill domain-specific workflows.',
    features: ['Orchestrator agents', 'Data processors', 'Compliance validators', 'Human interface agents'],
    color: 'bg-gradient-to-r from-coreon-blue/30 to-coreon-blue/10',
  },
  {
    id: 'governance',
    name: 'Governance Kernel',
    description: 'Provides oversight and enforcement of organizational policies, security controls, and auditability.',
    features: ['Real-time decision tracking', 'Business rule enforcement', 'Intervention management'],
    color: 'bg-gradient-to-r from-indigo-500/20 to-indigo-400/10',
  },
  {
    id: 'teleoperation',
    name: 'Teleoperation Interface',
    description: 'Allows designated personnel to monitor, review, approve, or interrupt any part of the AI mesh\'s execution.',
    features: ['Live dashboards', 'Review queues', 'Approval workflows'],
    color: 'bg-gradient-to-r from-violet-500/20 to-violet-400/10',
  },
];

export default function Architecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  return (
    <section id="architecture" className="section relative bg-coreon-navy-dark">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">
            <span className="gradient-text">Platform</span> Architecture
          </h2>
          <p className="text-lg">
            Coreon is composed of four architectural layers, each supporting key capabilities for enterprise AI orchestration.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mt-20 max-w-4xl mx-auto"
        >
          {/* Architecture diagram */}
          <div className="relative">
            {architectureLayers.map((layer, index) => (
              <ArchitectureLayer
                key={layer.id}
                layer={layer}
                index={index}
                totalLayers={architectureLayers.length}
              />
            ))}
            
            {/* Connecting lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-coreon-blue/50 via-coreon-blue/30 to-coreon-blue/10 z-0"></div>
            
            {/* Animated dots */}
            <motion.div 
              className="absolute left-1/2 top-0 w-2 h-2 -translate-x-1 rounded-full bg-coreon-blue z-10"
              animate={{
                y: [0, '100%'],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            
            <motion.div 
              className="absolute left-1/2 top-0 w-2 h-2 -translate-x-1 rounded-full bg-coreon-blue z-10"
              animate={{
                y: [0, '100%'],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                delay: 1,
                repeatDelay: 1,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ArchitectureLayer({ layer, index, totalLayers }: { 
  layer: typeof architectureLayers[0]; 
  index: number; 
  totalLayers: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const variants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -30 : 30,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      className={`relative mb-16 ${index % 2 === 0 ? 'pr-8 md:pr-16 ml-0 md:ml-8' : 'pl-8 md:pl-16 mr-0 md:mr-8 text-right'}`}
    >
      <div
        className={`${layer.color} p-px rounded-xl overflow-hidden`}
      >
        <div className="bg-coreon-navy-dark p-6 rounded-xl border border-coreon-blue/20">
          <h3 className="text-xl font-bold mb-3">{layer.name}</h3>
          <p className="text-coreon-gray-light/80 mb-4">{layer.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {layer.features.map((feature) => (
              <span key={feature} className="px-3 py-1 rounded-full text-xs bg-coreon-blue/10 text-coreon-blue">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Connector to center line */}
      <div 
        className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-8 md:w-16 h-px bg-coreon-blue/30`}
      ></div>
      
      {/* Circle at centerline */}
      <div 
        className={`absolute top-1/2 ${index % 2 === 0 ? 'right-0' : 'left-0'} -translate-y-1.5 ${index % 2 === 0 ? 'translate-x-1/2' : '-translate-x-1/2'}`}
      >
        <div className="w-3 h-3 rounded-full bg-coreon-blue-light animate-pulse-glow"></div>
      </div>
    </motion.div>
  );
} 