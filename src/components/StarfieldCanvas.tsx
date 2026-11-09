import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  color: string;
}

export const StarfieldCanvas: React.FC<{ density?: number; speedFactor?: number }> = ({
  density = 80,
  speedFactor = 0.5,
}) => {
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

    const colors = ['#fdf4d4', '#d4af37', '#38bdf8', '#818cf8', '#ffffff'];
    const stars: Star[] = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      alpha: Math.random() * 0.8 + 0.2,
      speed: (Math.random() * 0.4 + 0.1) * speedFactor,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dx = (mouseX - width / 2) * 0.02;
      const dy = (mouseY - height / 2) * 0.02;

      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha * (0.8 + 0.2 * Math.sin(Date.now() * 0.003 + star.x));
        ctx.shadowBlur = star.size * 4;
        ctx.shadowColor = star.color;
        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speedFactor]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
};
