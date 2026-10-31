import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle configurations (minimal & subtle)
    const particleCount = Math.min(Math.floor((width * height) / 18000), 45);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseAlpha: number;
    }[] = [];

    const colors = [
      '165, 146, 129', // Warm Taupe
      '214, 205, 196', // Sand
      '180, 168, 155', // Khaki
      '140, 130, 122'  // Muted Taupe
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.2 + 0.08
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles & links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Subtle mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          p.x -= Math.cos(angle) * force * 0.5;
          p.y -= Math.sin(angle) * force * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 100) {
            const alpha = (1 - distBetween / 100) * 0.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(165, 146, 129, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Very subtle animated gradient movement across the background */}
      <div
        className="animated-bg-gradient"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #f8f5f0 0%, #f4ede4 50%, #f8f5f0 100%)',
          backgroundSize: '200% 200%',
          opacity: 0.65
        }}
      />

      {/* Soft, blurred decorative shapes floating gently in the background */}
      <div
        className="ambient-shape-1"
        style={{
          position: 'absolute',
          top: '8%',
          left: '5%',
          width: 'clamp(280px, 35vw, 480px)',
          height: 'clamp(280px, 35vw, 480px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(165, 146, 129, 0.09) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />

      <div
        className="ambient-shape-2"
        style={{
          position: 'absolute',
          top: '45%',
          right: '5%',
          width: 'clamp(300px, 40vw, 550px)',
          height: 'clamp(300px, 40vw, 550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(235, 220, 208, 0.22) 0%, transparent 70%)',
          filter: 'blur(70px)',
          willChange: 'transform'
        }}
      />

      <div
        className="ambient-shape-3"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '12%',
          width: 'clamp(260px, 32vw, 420px)',
          height: 'clamp(260px, 32vw, 420px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(165, 146, 129, 0.07) 0%, transparent 70%)',
          filter: 'blur(65px)',
          willChange: 'transform'
        }}
      />

      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.55
        }}
      />

      <style>{`
        @keyframes gradientDrift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shapeFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -30px) scale(1.05); }
        }

        @keyframes shapeFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 25px) scale(0.96); }
        }

        .animated-bg-gradient {
          animation: gradientDrift 22s ease infinite;
        }

        .ambient-shape-1 {
          animation: shapeFloat1 18s ease-in-out infinite;
        }

        .ambient-shape-2 {
          animation: shapeFloat2 24s ease-in-out infinite;
        }

        .ambient-shape-3 {
          animation: shapeFloat1 20s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
};
