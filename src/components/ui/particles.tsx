import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
  speed?: number;
  vx?: number;
  vy?: number;
  refresh?: boolean;
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

const Particles = ({
  className,
  quantity = 50,
  color = "#ffffff",
  size = 1,
  speed = 0.4,
  vx = 0,
  vy = 0,
  refresh = false,
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 255, g: 255, b: 255 };
  };

  const rgb = hexToRgb(color);

  const createParticle = useCallback((): Particle => {
    return {
      x: Math.random() * canvasSize.current.w,
      y: Math.random() * canvasSize.current.h,
      translateX: 0,
      translateY: 0,
      size: Math.random() * size + 0.5,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * speed,
      dy: (Math.random() - 0.5) * speed,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, [size, speed]);

  const drawParticle = (p: Particle) => {
    if (!context.current) return;
    const { x, y, translateX, translateY, size: s, alpha } = p;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, s, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const initCanvas = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    canvasSize.current.w = container.offsetWidth;
    canvasSize.current.h = container.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current = canvasRef.current.getContext("2d");
    if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [dpr]);

  const initParticles = useCallback(() => {
    particles.current = Array.from({ length: quantity }, () => createParticle());
  }, [quantity, createParticle]);

  const animate = useCallback(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

    particles.current.forEach((p, i) => {
      const edge = [
        p.x + p.translateX - p.size,
        canvasSize.current.w - p.x - p.translateX - p.size,
        p.y + p.translateY - p.size,
        canvasSize.current.h - p.y - p.translateY - p.size,
      ];
      const closestEdge = Math.min(...edge);
      const remapClosest = Math.max(0, Math.min(1, closestEdge / 20));

      p.alpha += (p.targetAlpha * remapClosest - p.alpha) * 0.08;

      p.x += p.dx + vx;
      p.y += p.dy + vy;
      p.translateX += (mouse.current.x / (canvasSize.current.w / 2) - 1) * 2 * p.magnetism;
      p.translateY += (mouse.current.y / (canvasSize.current.h / 2) - 1) * 2 * p.magnetism;

      if (
        p.x < -p.size || p.x > canvasSize.current.w + p.size ||
        p.y < -p.size || p.y > canvasSize.current.h + p.size
      ) {
        particles.current[i] = createParticle();
        const newP = particles.current[i];
        const rand = Math.random();
        if (rand < 0.25) { newP.x = -newP.size; newP.y = Math.random() * canvasSize.current.h; }
        else if (rand < 0.5) { newP.x = canvasSize.current.w + newP.size; newP.y = Math.random() * canvasSize.current.h; }
        else if (rand < 0.75) { newP.y = -newP.size; newP.x = Math.random() * canvasSize.current.w; }
        else { newP.y = canvasSize.current.h + newP.size; newP.x = Math.random() * canvasSize.current.w; }
      }

      drawParticle(p);
    });

    requestAnimationFrame(animate);
  }, [createParticle, vx, vy]);

  useEffect(() => {
    initCanvas();
    initParticles();
    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      initCanvas();
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [initCanvas, initParticles, animate]);

  useEffect(() => {
    initCanvas();
    initParticles();
  }, [refresh]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)} onMouseMove={onMouseMove}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Particles;
