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
  type: string;
  strength: number;
}

interface AgentMeshVisualizerProps {
  agents: Agent[];
  connections: Connection[];
}

export default function AgentMeshVisualizer({ agents, connections }: AgentMeshVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const agentPositions = useRef<Map<string, { x: number; y: number; vx: number; vy: number; size: number; pulsePhase: number }>>(new Map());

  // Professional color palette for different agent types
  const typeColors: Record<string, string> = {
    'data-processing': '#3498db',
    'compliance': '#e74c3c',
    'interface': '#9b59b6',
    'orchestration': '#2ecc71',
    'storage': '#f39c12',
  };

  // Subtle effects parameters
  const glowIntensity = 0.2;
  const pulseSpeed = 0.02;

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
    };

    // Initialize positions for agents
    const initializeAgentPositions = () => {
      agentPositions.current.clear();
      
      // Place agents in a structured arrangement initially
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Place orchestration agents in the center
      const orchestrators = agents.filter(agent => agent.type === 'orchestration');
      const otherAgents = agents.filter(agent => agent.type !== 'orchestration');
      
      // Position orchestrators in the center
      orchestrators.forEach((agent, index) => {
        const angle = (index / Math.max(1, orchestrators.length)) * Math.PI * 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.15;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        agentPositions.current.set(agent.id, {
          x,
          y,
          vx: 0,
          vy: 0,
          size: 22,
          pulsePhase: Math.random() * Math.PI * 2
        });
      });
      
      // Position other agents in an outer circle
      otherAgents.forEach((agent, index) => {
        const angle = (index / otherAgents.length) * Math.PI * 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.35;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        agentPositions.current.set(agent.id, {
          x,
          y,
          vx: 0,
          vy: 0,
          size: 18,
          pulsePhase: Math.random() * Math.PI * 2
        });
      });
    };

    // Draw the agent mesh
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(10, 20, 40, 0.05)');
      gradient.addColorStop(1, 'rgba(10, 20, 40, 0.2)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update agent positions with gentle movement
      updatePositions();
      
      // Draw connections first (so they appear behind agents)
      drawConnections();
      
      // Draw agents
      drawAgents();
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Update agent positions with subtle physics
    const updatePositions = () => {
      if (!canvas) return;
      
      // Apply very gentle forces between agents
      const positions = Array.from(agentPositions.current.entries());
      
      for (let i = 0; i < positions.length; i++) {
        const [id1, pos1] = positions[i];
        
        // Update pulse phase
        pos1.pulsePhase = (pos1.pulsePhase + pulseSpeed) % (Math.PI * 2);
        
        // Very subtle boundary forces
        const margin = 50;
        const boundaryForce = 0.02;
        
        if (pos1.x < margin) pos1.vx += boundaryForce * (1 - pos1.x / margin);
        if (pos1.x > canvas.width - margin) pos1.vx -= boundaryForce * (1 - (canvas.width - pos1.x) / margin);
        if (pos1.y < margin) pos1.vy += boundaryForce * (1 - pos1.y / margin);
        if (pos1.y > canvas.height - margin) pos1.vy -= boundaryForce * (1 - (canvas.height - pos1.y) / margin);
        
        // Very subtle agent repulsion
        for (let j = i + 1; j < positions.length; j++) {
          const [id2, pos2] = positions[j];
          
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const minDistance = pos1.size + pos2.size + 30;
          
          if (distance < minDistance) {
            const force = 0.01 / Math.max(0.1, distance / minDistance);
            const fx = dx / distance * force;
            const fy = dy / distance * force;
            
            pos1.vx -= fx;
            pos1.vy -= fy;
            pos2.vx += fx;
            pos2.vy += fy;
          }
        }
      }
      
      // Apply connection forces (very subtle attraction)
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
            const force = 0.002 * (distance - optimalDistance) / 100;
            const fx = dx / distance * force;
            const fy = dy / distance * force;
            
            pos1.vx += fx;
            pos1.vy += fy;
            pos2.vx -= fx;
            pos2.vy -= fy;
          }
        }
      });
      
      // Update positions with strong damping for stability
      Array.from(agentPositions.current.entries()).forEach(([id, pos]) => {
        // Apply velocity with strong damping for subtle movement
        pos.vx *= 0.9;
        pos.vy *= 0.9;
        
        pos.x += pos.vx;
        pos.y += pos.vy;
      });
    };

    // Draw connections between agents
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
            
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            
            // Gradient line based on agent types
            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
            const color1 = typeColors[agent1.type] || '#ffffff';
            const color2 = typeColors[agent2.type] || '#ffffff';
            
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            // Subtle line style
            ctx.strokeStyle = gradient;
            ctx.lineWidth = conn.strength * 2;
            ctx.globalAlpha = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            // Draw data flow indicators (subtle dots)
            if (distance > 60 && (agent1.status === 'active' || agent2.status === 'active')) {
              const now = Date.now() / 1000;
              const particleCount = 2;
              const particleSpeed = 1.5; // Lower is faster
              
              for (let i = 0; i < particleCount; i++) {
                // Calculate position along the line
                const offset = ((now / particleSpeed) + (i / particleCount)) % 1;
                const x = startX + (endX - startX) * offset;
                const y = startY + (endY - startY) * offset;
                
                // Draw subtle dot
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
              }
            }
            
            // Show connection type
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '8px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(conn.type, midX, midY - 5);
          }
        }
      });
    };

    // Draw the agents with professional appearance
    const drawAgents = () => {
      if (!ctx) return;
      
      agents.forEach(agent => {
        const pos = agentPositions.current.get(agent.id);
        if (!pos) return;
        
        const radius = pos.size;
        const color = typeColors[agent.type] || '#ffffff';
        const isActive = agent.status === 'active';
        
        // Subtle pulse effect for active agents
        const pulseScale = isActive ? 1 + Math.sin(pos.pulsePhase) * 0.05 : 1;
        const pulseRadius = radius * pulseScale;
        
        // Draw subtle outer glow for active agents
        if (isActive) {
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, radius * 0.8,
            pos.x, pos.y, radius * 1.5
          );
          gradient.addColorStop(0, `rgba(${hexToRgb(color)}, ${glowIntensity})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Draw agent circle with clean design
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseRadius, 0, Math.PI * 2);
        
        // Fill with subtle gradient
        const gradient = ctx.createRadialGradient(
          pos.x, pos.y, 0,
          pos.x, pos.y, pulseRadius
        );
        gradient.addColorStop(0, isActive ? color : `rgba(${hexToRgb(color)}, 0.7)`);
        gradient.addColorStop(1, `rgba(${hexToRgb(color)}, ${isActive ? 0.8 : 0.5})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = isActive ? 1.5 : 0.5;
        ctx.stroke();
        
        // Draw confidence indicator - clean arc
        const confidenceRadius = pulseRadius * 0.85;
        ctx.beginPath();
        ctx.arc(
          pos.x, 
          pos.y, 
          confidenceRadius, 
          -Math.PI / 2, 
          Math.PI * 2 * agent.confidence - Math.PI / 2
        );
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw agent type icon - simple and professional
        drawAgentTypeIcon(ctx, agent.type, pos.x, pos.y, pulseRadius * 0.4);
        
        // Draw agent name with clean label
        const nameY = pos.y + pulseRadius + 15;
        const name = agent.name;
        ctx.font = '10px Arial, sans-serif';
        const textWidth = ctx.measureText(name).width;
        
        // Name background - subtle
        ctx.fillStyle = 'rgba(10, 20, 40, 0.7)';
        ctx.fillRect(pos.x - textWidth / 2 - 4, nameY - 8, textWidth + 8, 16);
        
        // Name text
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(name, pos.x, nameY);
      });
    };
    
    // Draw a simple icon representing the agent type
    const drawAgentTypeIcon = (ctx: CanvasRenderingContext2D, type: string, x: number, y: number, size: number) => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      
      switch (type) {
        case 'data-processing':
          // Database icon - simplified
          ctx.beginPath();
          ctx.ellipse(x, y - size * 0.5, size * 0.6, size * 0.2, 0, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.ellipse(x, y + size * 0.5, size * 0.6, size * 0.2, 0, 0, Math.PI * 2);
          ctx.stroke();
          
          // Vertical lines
          ctx.beginPath();
          ctx.moveTo(x - size * 0.6, y - size * 0.5);
          ctx.lineTo(x - size * 0.6, y + size * 0.5);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x + size * 0.6, y - size * 0.5);
          ctx.lineTo(x + size * 0.6, y + size * 0.5);
          ctx.stroke();
          break;
          
        case 'compliance':
          // Shield icon - simplified
          ctx.beginPath();
          ctx.moveTo(x, y - size * 0.7);
          ctx.lineTo(x + size * 0.6, y - size * 0.3);
          ctx.lineTo(x + size * 0.6, y + size * 0.3);
          ctx.quadraticCurveTo(x + size * 0.6, y + size * 0.7, x, y + size * 0.5);
          ctx.quadraticCurveTo(x - size * 0.6, y + size * 0.7, x - size * 0.6, y + size * 0.3);
          ctx.lineTo(x - size * 0.6, y - size * 0.3);
          ctx.closePath();
          ctx.stroke();
          break;
          
        case 'interface':
          // User interface icon - simplified
          ctx.beginPath();
          ctx.arc(x, y - size * 0.2, size * 0.4, 0, Math.PI * 2);
          ctx.stroke();
          
          // Body
          ctx.beginPath();
          ctx.moveTo(x - size * 0.4, y + size * 0.7);
          ctx.quadraticCurveTo(x, y + size * 0.4, x + size * 0.4, y + size * 0.7);
          ctx.stroke();
          break;
          
        case 'orchestration':
          // Network icon - simplified
          ctx.beginPath();
          ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
          ctx.stroke();
          
          // Connection lines
          const angles = [0, Math.PI * 2/3, Math.PI * 4/3];
          angles.forEach(angle => {
            const endX = x + Math.cos(angle) * size * 0.7;
            const endY = y + Math.sin(angle) * size * 0.7;
            
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle) * size * 0.3, y + Math.sin(angle) * size * 0.3);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(endX, endY, size * 0.15, 0, Math.PI * 2);
            ctx.stroke();
          });
          break;
          
        case 'storage':
          // Storage icon - simplified
          ctx.beginPath();
          ctx.rect(x - size * 0.6, y - size * 0.6, size * 1.2, size * 1.2);
          ctx.stroke();
          
          // Internal lines
          ctx.beginPath();
          ctx.moveTo(x - size * 0.6, y);
          ctx.lineTo(x + size * 0.6, y);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(x, y - size * 0.6);
          ctx.lineTo(x, y + size * 0.6);
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