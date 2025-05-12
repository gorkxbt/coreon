'use client';

import { useEffect, useRef } from 'react';

interface WavePoint {
  x: number;
  y: number;
  originalY: number;
  speed: number;
  amplitude: number;
  phase: number;
}

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  shape: 'circle' | 'square' | 'triangle' | 'hexagon' | 'diamond' | 'dot' | 'logo';
  rotationSpeed: number;
  currentRotation: number;
  color: string;
}

interface ConnectionLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  width: number;
  progress: number;
  speed: number;
  maxLength: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavePointsRef = useRef<WavePoint[][]>([]);
  const floatingElementsRef = useRef<FloatingElement[]>([]);
  const connectionLinesRef = useRef<ConnectionLine[]>([]);
  const mousePosition = useRef({ x: 0, y: 0, active: false });
  const animationFrameId = useRef<number>(0);
  
  // Professional color palette
  const gradientColorsRef = useRef<string[]>([
    'rgba(12, 20, 45, 0.9)',
    'rgba(15, 25, 50, 0.8)',
    'rgba(18, 30, 60, 0.7)',
  ]);
  
  const elementColors = [
    'rgba(64, 145, 220, 0.7)',   // Blue
    'rgba(74, 160, 200, 0.7)',   // Light blue
    'rgba(48, 198, 255, 0.7)',   // Coreon blue (#30C6FF)
    'rgba(100, 120, 190, 0.7)',  // Indigo
    'rgba(80, 170, 180, 0.7)',   // Teal
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
        active: true
      };
      
      // Deactivate mouse after 2 seconds of no movement
      setTimeout(() => {
        mousePosition.current.active = false;
      }, 2000);
    };

    // Initialize wave points and floating elements
    const initElements = () => {
      // Create subtle wave layers
      wavePointsRef.current = [];
      const waveCount = 2;
      
      for (let w = 0; w < waveCount; w++) {
        const wavePoints: WavePoint[] = [];
        const pointCount = Math.floor(canvas.width / 40); // Point every 40px
        
        for (let i = 0; i <= pointCount; i++) {
          wavePoints.push({
            x: (canvas.width * i) / pointCount,
            y: canvas.height * (0.6 + (w * 0.1)),
            originalY: canvas.height * (0.6 + (w * 0.1)),
            speed: 0.01 + (w * 0.003),
            amplitude: 8 + (w * 5),
            phase: Math.random() * Math.PI * 2
          });
        }
        
        wavePointsRef.current.push(wavePoints);
      }
      
      // Create floating elements - fewer and more subtle
      floatingElementsRef.current = [];
      const elementCount = Math.floor((canvas.width * canvas.height) / 50000);
      // Shapes with logo added to the mix
      const shapes: ('circle' | 'square' | 'triangle' | 'hexagon' | 'diamond' | 'dot' | 'logo')[] = 
        ['circle', 'square', 'diamond', 'dot', 'dot', 'dot', 'logo']; 
      
      for (let i = 0; i < elementCount; i++) {
        // Determine if this element will be a logo (approx 1 in 10 elements)
        const shape = i % 10 === 0 ? 'logo' : shapes[Math.floor(Math.random() * shapes.length)];
        
        floatingElementsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: shape === 'logo' ? 15 + Math.random() * 10 : Math.random() * 4 + 1, // Logos are larger
          opacity: shape === 'logo' ? 0.2 + Math.random() * 0.1 : Math.random() * 0.2 + 0.1,
          speed: (Math.random() - 0.5) * 0.2,
          angle: Math.random() * Math.PI * 2,
          shape,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
          currentRotation: Math.random() * Math.PI * 2,
          color: elementColors[Math.floor(Math.random() * elementColors.length)]
        });
      }
      
      // Create connection lines - enterprise data flow visualization
      connectionLinesRef.current = [];
      const lineCount = Math.floor(elementCount * 0.4);
      
      for (let i = 0; i < lineCount; i++) {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const angle = Math.random() * Math.PI * 2;
        const maxLength = 100 + Math.random() * 200;
        const x2 = x1 + Math.cos(angle) * maxLength;
        const y2 = y1 + Math.sin(angle) * maxLength;
        
        connectionLinesRef.current.push({
          x1, y1, x2, y2,
          opacity: Math.random() * 0.15 + 0.05,
          width: Math.random() * 1 + 0.5,
          progress: 0,
          speed: Math.random() * 0.01 + 0.005,
          maxLength
        });
      }
    };

    // Draw a floating element based on its shape
    const drawElement = (ctx: CanvasRenderingContext2D, element: FloatingElement) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate(element.currentRotation);
      ctx.fillStyle = element.color;
      ctx.globalAlpha = element.opacity;
      
      switch (element.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, element.size, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'square':
          ctx.fillRect(-element.size/2, -element.size/2, element.size, element.size);
          break;
          
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -element.size);
          ctx.lineTo(element.size * 0.866, element.size * 0.5);
          ctx.lineTo(-element.size * 0.866, element.size * 0.5);
          ctx.closePath();
          ctx.fill();
          break;
          
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = element.size * Math.cos(angle);
            const y = element.size * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          break;
          
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -element.size);
          ctx.lineTo(element.size, 0);
          ctx.lineTo(0, element.size);
          ctx.lineTo(-element.size, 0);
          ctx.closePath();
          ctx.fill();
          break;
          
        case 'dot':
          ctx.beginPath();
          ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'logo':
          // Draw Coreon logo
          const size = element.size * 2;
          
          // Background circle
          ctx.beginPath();
          ctx.fillStyle = '#081136';
          ctx.arc(0, 0, size/2, 0, Math.PI * 2);
          ctx.fill();
          
          // Outer ring
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = '#30C6FF';
          ctx.lineWidth = size * 0.1;
          ctx.stroke();
          
          // Inner arc (3/4 circle)
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.15, 0, 1.5 * Math.PI);
          ctx.strokeStyle = '#30C6FF';
          ctx.lineWidth = size * 0.1;
          ctx.stroke();
          
          // Small dot
          ctx.beginPath();
          ctx.arc(-size * 0.25, 0, size * 0.05, 0, Math.PI * 2);
          ctx.fillStyle = '#30C6FF';
          ctx.fill();
          break;
      }
      
      ctx.restore();
    };

    // Draw connection line with animated flow
    const drawConnectionLine = (ctx: CanvasRenderingContext2D, line: ConnectionLine) => {
      const dx = line.x2 - line.x1;
      const dy = line.y2 - line.y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate current progress
      const currentLength = length * line.progress;
      const angle = Math.atan2(dy, dx);
      
      // Calculate current end point
      const currentX = line.x1 + Math.cos(angle) * currentLength;
      const currentY = line.y1 + Math.sin(angle) * currentLength;
      
      // Draw line
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(currentX, currentY);
      
      // Create gradient for data flow effect
      const gradient = ctx.createLinearGradient(line.x1, line.y1, currentX, currentY);
      gradient.addColorStop(0, `rgba(64, 145, 220, ${line.opacity * 0.5})`);
      gradient.addColorStop(0.5, `rgba(48, 198, 255, ${line.opacity})`); // Coreon blue
      gradient.addColorStop(1, `rgba(64, 145, 220, ${line.opacity * 0.5})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = line.width;
      ctx.stroke();
      
      // Draw data pulse effect
      if (line.progress > 0.1 && line.progress < 0.9) {
        const pulsePosition = line.progress - 0.05;
        const pulseX = line.x1 + Math.cos(angle) * (length * pulsePosition);
        const pulseY = line.y1 + Math.sin(angle) * (length * pulsePosition);
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, line.width * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(48, 198, 255, ${line.opacity * 1.5})`; // Coreon blue
        ctx.fill();
      }
    };

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradientColorsRef.current.forEach((color, index) => {
        gradient.addColorStop(index / (gradientColorsRef.current.length - 1), color);
      });
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Optional: Add subtle grid pattern for enterprise look
      const gridSize = 40;
      const gridOpacity = 0.05;
      
      ctx.strokeStyle = `rgba(48, 198, 255, ${gridOpacity})`; // Coreon blue for grid
      ctx.lineWidth = 0.5;
      
      // Draw vertical grid lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal grid lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Update and draw wave points - very subtle waves
      wavePointsRef.current.forEach((wavePoints, waveIndex) => {
        // Update wave points
        wavePoints.forEach((point) => {
          point.phase += point.speed;
          point.y = point.originalY + Math.sin(point.phase + (point.x / 300)) * point.amplitude;
        });
        
        // Draw wave
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // Draw smooth curve through points
        for (let i = 0; i < wavePoints.length - 1; i++) {
          const xc = (wavePoints[i].x + wavePoints[i + 1].x) / 2;
          const yc = (wavePoints[i].y + wavePoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(wavePoints[i].x, wavePoints[i].y, xc, yc);
        }
        
        // Complete the wave
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        
        // Fill with gradient - very subtle
        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const alpha = 0.08 - (waveIndex * 0.02);
        waveGradient.addColorStop(0, `rgba(48, 198, 255, 0)`); // Coreon blue
        waveGradient.addColorStop(0.8, `rgba(48, 198, 255, ${alpha})`);
        waveGradient.addColorStop(1, `rgba(48, 198, 255, ${alpha * 1.5})`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      });
      
      // Update and draw connection lines
      connectionLinesRef.current.forEach((line) => {
        // Update progress
        line.progress += line.speed;
        if (line.progress >= 1) {
          // Reset line with new position when complete
          line.x1 = Math.random() * canvas.width;
          line.y1 = Math.random() * canvas.height;
          const angle = Math.random() * Math.PI * 2;
          line.x2 = line.x1 + Math.cos(angle) * line.maxLength;
          line.y2 = line.y1 + Math.sin(angle) * line.maxLength;
          line.progress = 0;
          line.opacity = Math.random() * 0.15 + 0.05;
        }
        
        // Draw line
        drawConnectionLine(ctx, line);
      });
      
      // Update and draw floating elements
      floatingElementsRef.current.forEach((element) => {
        // Update position - slower movement
        element.x += Math.cos(element.angle) * element.speed * 0.5;
        element.y += Math.sin(element.angle) * element.speed * 0.5;
        element.currentRotation += element.rotationSpeed;
        
        // Wrap around edges
        if (element.x > canvas.width + element.size) element.x = -element.size;
        if (element.x < -element.size) element.x = canvas.width + element.size;
        if (element.y > canvas.height + element.size) element.y = -element.size;
        if (element.y < -element.size) element.y = canvas.height + element.size;
        
        // Mouse interaction - more subtle
        if (mousePosition.current.active) {
          const dx = mousePosition.current.x - element.x;
          const dy = mousePosition.current.y - element.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;
          
          if (distance < maxDistance) {
            // Gently push elements away from mouse
            const force = (1 - distance / maxDistance) * 0.03;
            const angle = Math.atan2(dy, dx);
            element.x -= Math.cos(angle) * force * element.size;
            element.y -= Math.sin(angle) * force * element.size;
            
            // Slightly increase opacity when near mouse
            element.opacity = Math.min(0.5, element.opacity + 0.005);
          } else {
            // Gradually return to original opacity
            element.opacity = Math.max(0.1, element.opacity - 0.002);
          }
        }
        
        // Draw element
        drawElement(ctx, element);
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1]"
      style={{ pointerEvents: 'none' }}
    />
  );
} 