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
  shape: 'circle' | 'square' | 'triangle' | 'hexagon';
  rotationSpeed: number;
  currentRotation: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavePointsRef = useRef<WavePoint[][]>([]);
  const floatingElementsRef = useRef<FloatingElement[]>([]);
  const mousePosition = useRef({ x: 0, y: 0, active: false });
  const animationFrameId = useRef<number>(0);
  const gradientColorsRef = useRef<string[]>([
    'rgba(16, 24, 52, 0.8)',
    'rgba(23, 42, 69, 0.7)',
    'rgba(32, 64, 96, 0.6)',
  ]);

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
      // Create multiple wave layers
      wavePointsRef.current = [];
      const waveCount = 3;
      
      for (let w = 0; w < waveCount; w++) {
        const wavePoints: WavePoint[] = [];
        const pointCount = Math.floor(canvas.width / 30); // Point every 30px
        
        for (let i = 0; i <= pointCount; i++) {
          wavePoints.push({
            x: (canvas.width * i) / pointCount,
            y: canvas.height * (0.5 + (w * 0.1)),
            originalY: canvas.height * (0.5 + (w * 0.1)),
            speed: 0.02 + (w * 0.005),
            amplitude: 15 + (w * 10),
            phase: Math.random() * Math.PI * 2
          });
        }
        
        wavePointsRef.current.push(wavePoints);
      }
      
      // Create floating elements
      floatingElementsRef.current = [];
      const elementCount = Math.floor((canvas.width * canvas.height) / 40000);
      const shapes: ('circle' | 'square' | 'triangle' | 'hexagon')[] = ['circle', 'square', 'triangle', 'hexagon'];
      
      for (let i = 0; i < elementCount; i++) {
        floatingElementsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 2,
          opacity: Math.random() * 0.3 + 0.1,
          speed: (Math.random() - 0.5) * 0.3,
          angle: Math.random() * Math.PI * 2,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          currentRotation: Math.random() * Math.PI * 2
        });
      }
    };

    // Draw a floating element based on its shape
    const drawElement = (ctx: CanvasRenderingContext2D, element: FloatingElement) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate(element.currentRotation);
      ctx.fillStyle = `rgba(48, 198, 255, ${element.opacity})`;
      
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
          ctx.lineTo(element.size * 0.866, element.size * 0.5); // cos(60°), sin(60°)
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
      }
      
      ctx.restore();
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
      
      // Update and draw wave points
      wavePointsRef.current.forEach((wavePoints, waveIndex) => {
        const now = Date.now() / 1000;
        
        // Update wave points
        wavePoints.forEach((point) => {
          point.phase += point.speed;
          point.y = point.originalY + Math.sin(point.phase + (point.x / 200)) * point.amplitude;
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
        
        // Fill with gradient
        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const alpha = 0.15 - (waveIndex * 0.03);
        waveGradient.addColorStop(0, `rgba(48, 198, 255, 0)`);
        waveGradient.addColorStop(0.7, `rgba(48, 198, 255, ${alpha})`);
        waveGradient.addColorStop(1, `rgba(48, 198, 255, ${alpha * 1.5})`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      });
      
      // Update and draw floating elements
      floatingElementsRef.current.forEach((element) => {
        // Update position
        element.x += Math.cos(element.angle) * element.speed;
        element.y += Math.sin(element.angle) * element.speed;
        element.currentRotation += element.rotationSpeed;
        
        // Wrap around edges
        if (element.x > canvas.width + element.size) element.x = -element.size;
        if (element.x < -element.size) element.x = canvas.width + element.size;
        if (element.y > canvas.height + element.size) element.y = -element.size;
        if (element.y < -element.size) element.y = canvas.height + element.size;
        
        // Mouse interaction
        if (mousePosition.current.active) {
          const dx = mousePosition.current.x - element.x;
          const dy = mousePosition.current.y - element.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            // Gently push elements away from mouse
            const force = (1 - distance / maxDistance) * 0.05;
            const angle = Math.atan2(dy, dx);
            element.x -= Math.cos(angle) * force * element.size;
            element.y -= Math.sin(angle) * force * element.size;
            
            // Increase opacity when near mouse
            element.opacity = Math.min(0.8, element.opacity + 0.01);
          } else {
            // Gradually return to original opacity
            element.opacity = Math.max(0.1, element.opacity - 0.005);
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