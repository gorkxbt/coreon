'use client';

import { useEffect, useRef } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  confidence: number;
  model?: string;
}

interface Connection {
  from: string;
  to: string;
}

interface AgentMeshVisualizerProps {
  agents: Agent[];
  connections: Connection[];
}

export default function AgentMeshVisualizer({ agents, connections }: AgentMeshVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; size: number; vx: number; vy: number; color: string; opacity: number }[]>([]);
  const animationFrameId = useRef<number>(0);
  const agentPositions = useRef<Map<string, { x: number; y: number; vx: number; vy: number; size: number; pulsePhase: number }>>(new Map());

  // Enhanced colors for different agent types
  const typeColors: Record<string, string> = {
    'data-processing': '#3498db',
    'compliance': '#e74c3c',
    'interface': '#9b59b6',
    'orchestration': '#2ecc71',
    'storage': '#f39c12',
  };

  // Glowing effect parameters
  const glowIntensity = 0.4;
  const pulseSpeed = 0.03;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Initialize agent positions if not set
      if (agentPositions.current.size === 0) {
        initializeAgentPositions();
      }
      
      // Initialize background particles
      initializeParticles();
    };

    // Initialize random positions for agents
    const initializeAgentPositions = () => {
      agentPositions.current.clear();
      
      // Place agents in a circular arrangement initially
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;
      
      agents.forEach((agent, index) => {
        const angle = (index / agents.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        agentPositions.current.set(agent.id, {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: agent.type === 'orchestration' ? 30 : 25,
          pulsePhase: Math.random() * Math.PI * 2
        });
      });
    };
    
    // Initialize background particles
    const initializeParticles = () => {
      particles.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: '#30C6FF',
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    };

    // Draw the agent mesh
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background particles
      drawBackgroundParticles();
      
      // Update agent positions
      updatePositions();
      
      // Draw connections first (so they appear behind agents)
      drawConnections();
      
      // Draw agents
      drawAgents();
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(draw);
    };
    
    // Draw background particles
    const drawBackgroundParticles = () => {
      if (!ctx || !canvas) return;
      
      particles.current.forEach(particle => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(48, 198, 255, ${particle.opacity})`;
        ctx.fill();
      });
    };

    // Update agent positions with enhanced physics
    const updatePositions = () => {
      if (!canvas) return;
      
      // Apply forces between agents (repulsion)
      const positions = Array.from(agentPositions.current.entries());
      
      for (let i = 0; i < positions.length; i++) {
        const [id1, pos1] = positions[i];
        const agent1 = agents.find(a => a.id === id1);
        
        // Update pulse phase
        pos1.pulsePhase = (pos1.pulsePhase + pulseSpeed) % (Math.PI * 2);
        
        // Boundary forces - stronger near edges
        const margin = 70;
        const boundaryForce = 0.05;
        
        if (pos1.x < margin) pos1.vx += boundaryForce * (1 - pos1.x / margin);
        if (pos1.x > canvas.width - margin) pos1.vx -= boundaryForce * (1 - (canvas.width - pos1.x) / margin);
        if (pos1.y < margin) pos1.vy += boundaryForce * (1 - pos1.y / margin);
        if (pos1.y > canvas.height - margin) pos1.vy -= boundaryForce * (1 - (canvas.height - pos1.y) / margin);
        
        // Agent repulsion - different types repel more strongly
        for (let j = i + 1; j < positions.length; j++) {
          const [id2, pos2] = positions[j];
          const agent2 = agents.find(a => a.id === id2);
          
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Stronger repulsion between agents of same type
          const repulsionMultiplier = agent1 && agent2 && agent1.type === agent2.type ? 1.5 : 1;
          const minDistance = pos1.size + pos2.size + 20;
          
          if (distance < minDistance) {
            const force = 0.05 * repulsionMultiplier / Math.max(0.1, distance / minDistance);
            const fx = dx / distance * force;
            const fy = dy / distance * force;
            
            pos1.vx -= fx;
            pos1.vy -= fy;
            pos2.vx += fx;
            pos2.vy += fy;
          }
        }
      }
      
      // Apply connection forces (attraction)
      connections.forEach(conn => {
        const pos1 = agentPositions.current.get(conn.from);
        const pos2 = agentPositions.current.get(conn.to);
        
        if (pos1 && pos2) {
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Optimal distance between connected agents
          const optimalDistance = 150;
          
          if (distance > optimalDistance) {
            const force = 0.01 * (distance - optimalDistance) / 100;
            const fx = dx / distance * force;
            const fy = dy / distance * force;
            
            pos1.vx += fx;
            pos1.vy += fy;
            pos2.vx -= fx;
            pos2.vy -= fy;
          } else if (distance < optimalDistance * 0.7) {
            // Slight repulsion if too close
            const force = 0.005;
            const fx = dx / distance * force;
            const fy = dy / distance * force;
            
            pos1.vx -= fx;
            pos1.vy -= fy;
            pos2.vx += fx;
            pos2.vy += fy;
          }
        }
      });
      
      // Update positions
      Array.from(agentPositions.current.entries()).forEach(([id, pos]) => {
        // Apply velocity with damping
        pos.vx *= 0.95;
        pos.vy *= 0.95;
        
        pos.x += pos.vx;
        pos.y += pos.vy;
      });
    };

    // Draw connections between agents with enhanced visuals
    const drawConnections = () => {
      if (!ctx) return;
      
      connections.forEach(conn => {
        const pos1 = agentPositions.current.get(conn.from);
        const pos2 = agentPositions.current.get(conn.to);
        
        if (pos1 && pos2) {
          const agent1 = agents.find(a => a.id === conn.from);
          const agent2 = agents.find(a => a.id === conn.to);
          
          if (agent1 && agent2) {
            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Calculate connection endpoints to start/end at agent circle edge
            const angle = Math.atan2(dy, dx);
            const startX = pos1.x + Math.cos(angle) * pos1.size;
            const startY = pos1.y + Math.sin(angle) * pos1.size;
            const endX = pos2.x - Math.cos(angle) * pos2.size;
            const endY = pos2.y - Math.sin(angle) * pos2.size;
            
            // Draw connection line with glow effect
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            
            // Gradient line based on agent types
            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
            const color1 = typeColors[agent1.type] || '#ffffff';
            const color2 = typeColors[agent2.type] || '#ffffff';
            
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            // Glow effect
            ctx.shadowColor = color1;
            ctx.shadowBlur = 5;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.7;
            ctx.stroke();
            
            // Reset shadow for other drawings
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            
            // Draw flow particles along the connection
            // Only draw particles if agents are far enough apart
            if (distance > 60) {
              const now = Date.now() / 1000;
              const particleCount = 3;
              const particleSpeed = 0.5; // Lower is faster
              
              for (let i = 0; i < particleCount; i++) {
                // Calculate position along the line
                const offset = ((now / particleSpeed) + (i / particleCount)) % 1;
                const x = startX + (endX - startX) * offset;
                const y = startY + (endY - startY) * offset;
                
                // Draw glowing particle
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#30C6FF';
                ctx.shadowColor = '#30C6FF';
                ctx.shadowBlur = 8;
                ctx.fill();
                
                // Reset shadow
                ctx.shadowBlur = 0;
              }
            }
          }
        }
      });
    };

    // Draw the agents with enhanced visuals
    const drawAgents = () => {
      if (!ctx) return;
      
      agents.forEach(agent => {
        const pos = agentPositions.current.get(agent.id);
        if (!pos) return;
        
        const radius = pos.size;
        const color = typeColors[agent.type] || '#ffffff';
        const isActive = agent.status === 'active';
        
        // Calculate pulse effect
        const pulseScale = isActive ? 1 + Math.sin(pos.pulsePhase) * 0.1 : 1;
        const pulseRadius = radius * pulseScale;
        
        // Draw outer glow for active agents
        if (isActive) {
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, radius * 0.8,
            pos.x, pos.y, radius * 2
          );
          gradient.addColorStop(0, `rgba(${hexToRgb(color)}, ${glowIntensity})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Draw agent circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseRadius, 0, Math.PI * 2);
        
        // Fill based on status
        if (isActive) {
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, pulseRadius
          );
          gradient.addColorStop(0, color);
          gradient.addColorStop(0.7, color);
          gradient.addColorStop(1, `rgba(${hexToRgb(color)}, 0.3)`);
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();
        
        // Draw confidence indicator
        const confidenceRadius = pulseRadius * 0.85;
        ctx.beginPath();
        ctx.arc(
          pos.x, 
          pos.y, 
          confidenceRadius, 
          -Math.PI / 2, 
          Math.PI * 2 * agent.confidence - Math.PI / 2
        );
        ctx.strokeStyle = '#30C6FF';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw agent type icon in center
        drawAgentTypeIcon(ctx, agent.type, pos.x, pos.y, pulseRadius * 0.4);
        
        // Draw agent name with background
        const nameY = pos.y + pulseRadius + 15;
        const name = agent.name;
        ctx.font = '10px Arial';
        const textWidth = ctx.measureText(name).width;
        
        // Name background
        ctx.fillStyle = 'rgba(5, 10, 32, 0.7)';
        ctx.fillRect(pos.x - textWidth / 2 - 4, nameY - 8, textWidth + 8, 16);
        
        // Name text
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(name, pos.x, nameY);
      });
    };
    
    // Draw an icon representing the agent type
    const drawAgentTypeIcon = (ctx: CanvasRenderingContext2D, type: string, x: number, y: number, size: number) => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      
      switch (type) {
        case 'data-processing':
          // Database icon
          ctx.beginPath();
          ctx.ellipse(x, y - size * 0.7, size * 0.6, size * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.ellipse(x, y + size * 0.7, size * 0.6, size * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x - size * 0.6, y - size * 0.7);
          ctx.lineTo(x - size * 0.6, y + size * 0.7);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x + size * 0.6, y - size * 0.7);
          ctx.lineTo(x + size * 0.6, y + size * 0.7);
          ctx.stroke();
          break;
          
        case 'compliance':
          // Shield icon
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size * 0.8, y - size * 0.5);
          ctx.lineTo(x + size * 0.8, y + size * 0.3);
          ctx.quadraticCurveTo(x + size * 0.8, y + size, x, y + size * 0.7);
          ctx.quadraticCurveTo(x - size * 0.8, y + size, x - size * 0.8, y + size * 0.3);
          ctx.lineTo(x - size * 0.8, y - size * 0.5);
          ctx.closePath();
          ctx.stroke();
          
          // Checkmark inside shield
          ctx.beginPath();
          ctx.moveTo(x - size * 0.3, y);
          ctx.lineTo(x, y + size * 0.3);
          ctx.lineTo(x + size * 0.5, y - size * 0.3);
          ctx.stroke();
          break;
          
        case 'interface':
          // User icon
          ctx.beginPath();
          ctx.arc(x, y - size * 0.2, size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x - size * 0.7, y + size * 0.8);
          ctx.quadraticCurveTo(x, y + size * 1.2, x + size * 0.7, y + size * 0.8);
          ctx.quadraticCurveTo(x + size * 0.5, y + size * 0.4, x + size * 0.3, y + size * 0.3);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x - size * 0.3, y + size * 0.3);
          ctx.quadraticCurveTo(x - size * 0.5, y + size * 0.4, x - size * 0.7, y + size * 0.8);
          ctx.stroke();
          break;
          
        case 'orchestration':
          // Network/orchestration icon
          ctx.beginPath();
          ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
          ctx.stroke();
          
          // Connecting lines
          const angles = [0, Math.PI * 2/3, Math.PI * 4/3];
          angles.forEach(angle => {
            const endX = x + Math.cos(angle) * size;
            const endY = y + Math.sin(angle) * size;
            
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle) * size * 0.3, y + Math.sin(angle) * size * 0.3);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(endX, endY, size * 0.2, 0, Math.PI * 2);
            ctx.stroke();
          });
          break;
          
        case 'storage':
          // Memory/storage icon
          ctx.beginPath();
          ctx.rect(x - size * 0.7, y - size * 0.7, size * 1.4, size * 1.4);
          ctx.stroke();
          
          // Internal grid
          ctx.beginPath();
          ctx.moveTo(x - size * 0.7, y);
          ctx.lineTo(x + size * 0.7, y);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x, y - size * 0.7);
          ctx.lineTo(x, y + size * 0.7);
          ctx.stroke();
          break;
          
        default:
          // Default circular icon
          ctx.beginPath();
          ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
      }
    };
    
    // Helper function to convert hex color to RGB
    const hexToRgb = (hex: string) => {
      // Remove # if present
      hex = hex.replace('#', '');
      
      // Parse r, g, b values
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    };

    // Set up canvas and start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [agents, connections]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full rounded-lg"
    />
  );
} 