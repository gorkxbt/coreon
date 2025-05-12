'use client';

import { useEffect, useRef } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  confidence: number;
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
  const animationFrameId = useRef<number>(0);
  const agentPositions = useRef<Map<string, { x: number; y: number; vx: number; vy: number }>>(new Map());

  // Colors for different agent types
  const typeColors: Record<string, string> = {
    'data-processing': '#3498db',
    'compliance': '#e74c3c',
    'interface': '#9b59b6',
    'orchestration': '#2ecc71',
  };

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

    // Initialize random positions for agents
    const initializeAgentPositions = () => {
      agentPositions.current.clear();
      
      agents.forEach(agent => {
        agentPositions.current.set(agent.id, {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      });
    };

    // Draw the agent mesh
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update agent positions
      updatePositions();
      
      // Draw connections first (so they appear behind agents)
      drawConnections();
      
      // Draw agents
      drawAgents();
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Update agent positions with simple physics
    const updatePositions = () => {
      if (!canvas) return;
      
      // Apply forces between agents (repulsion)
      const positions = Array.from(agentPositions.current.entries());
      
      for (let i = 0; i < positions.length; i++) {
        const [id1, pos1] = positions[i];
        
        // Boundary forces
        const margin = 50;
        if (pos1.x < margin) pos1.vx += 0.02;
        if (pos1.x > canvas.width - margin) pos1.vx -= 0.02;
        if (pos1.y < margin) pos1.vy += 0.02;
        if (pos1.y > canvas.height - margin) pos1.vy -= 0.02;
        
        // Agent repulsion
        for (let j = i + 1; j < positions.length; j++) {
          const [id2, pos2] = positions[j];
          
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = 0.05 / Math.max(0.1, distance);
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
          
          if (distance > 150) {
            const force = 0.01;
            const fx = dx / distance * force;
            const fy = dy / distance * force;
            
            pos1.vx += fx;
            pos1.vy += fy;
            pos2.vx -= fx;
            pos2.vy -= fy;
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
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
            
            // Gradient line based on agent types
            const gradient = ctx.createLinearGradient(pos1.x, pos1.y, pos2.x, pos2.y);
            gradient.addColorStop(0, typeColors[agent1.type] || '#ffffff');
            gradient.addColorStop(1, typeColors[agent2.type] || '#ffffff');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            // Draw flow particles along the connection
            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only draw particles if agents are far enough apart
            if (distance > 50) {
              const now = Date.now();
              const particleCount = 3;
              
              for (let i = 0; i < particleCount; i++) {
                const offset = (now / 2000 + i / particleCount) % 1;
                const x = pos1.x + dx * offset;
                const y = pos1.y + dy * offset;
                
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#30C6FF';
                ctx.fill();
              }
            }
          }
        }
      });
    };

    // Draw the agents
    const drawAgents = () => {
      if (!ctx) return;
      
      agents.forEach(agent => {
        const pos = agentPositions.current.get(agent.id);
        if (!pos) return;
        
        const radius = 25;
        const color = typeColors[agent.type] || '#ffffff';
        
        // Draw agent circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        
        // Fill based on status
        if (agent.status === 'active') {
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, radius
          );
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Draw border
        ctx.strokeStyle = color;
        ctx.lineWidth = agent.status === 'active' ? 2 : 1;
        ctx.stroke();
        
        // Draw confidence indicator
        const confidenceRadius = radius * 0.8;
        ctx.beginPath();
        ctx.arc(
          pos.x, 
          pos.y, 
          confidenceRadius, 
          0, 
          Math.PI * 2 * agent.confidence
        );
        ctx.strokeStyle = '#30C6FF';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw agent name
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(agent.name, pos.x, pos.y + radius + 15);
      });
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