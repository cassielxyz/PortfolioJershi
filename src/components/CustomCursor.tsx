import React, { useEffect, useRef } from 'react';

/**
 * Exact recreation of Daniel Ingrassia's custom cursor (https://ingrassiadaniel.it/)
 * Features:
 * - Fluid tapering ribbon trail with quadratic normal vectors & 150ms buffer
 * - Dynamic linear alpha gradient from transparent tail to head
 * - Hardware-accelerated 0.28 spring lerp physics
 * - Hover state expansion to 40px ring on interactive elements
 * - Clean cleanup and fine-pointer / reduced-motion accessibility checks
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with a fine pointer and hover support, respecting reduced-motion
    if (
      !(
        window.matchMedia('(pointer: fine) and (hover: hover)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    ) {
      return;
    }

    const cursorEl = cursorRef.current;
    const canvasEl = canvasRef.current;
    const headEl = headRef.current;
    if (!cursorEl || !canvasEl || !headEl) return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    document.documentElement.classList.add('has-custom-cursor');

    const foregroundColor =
      getComputedStyle(cursorEl).getPropertyValue('--foreground').trim() || '#1D1527';

    let dpr = 1;
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = window.innerWidth * dpr;
      canvasEl.height = window.innerHeight * dpr;
      canvasEl.style.width = `${window.innerWidth}px`;
      canvasEl.style.height = `${window.innerHeight}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    interface Point {
      x: number;
      y: number;
      t: number;
    }

    const points: Point[] = [];
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let hasMoved = false;
    let animId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        current.x = target.x;
        current.y = target.y;
        points.length = 0;
      }

      if (cursorEl.dataset.visible !== 'true') {
        cursorEl.dataset.visible = 'true';
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const targetEl = (e.target as HTMLElement | null)?.closest(
        'a, button, [data-cursor], input, textarea, select, [role="button"], .interactive, .btn'
      );
      cursorEl.dataset.hover = targetEl ? 'true' : 'false';
    };

    const handlePointerLeave = () => {
      cursorEl.dataset.visible = 'false';
    };

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      // Smooth lag spring physics (0.28 factor)
      current.x += (target.x - current.x) * 0.28;
      current.y += (target.y - current.y) * 0.28;

      headEl.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      // Record point if moved >= 1.5px
      const lastPoint = points[points.length - 1];
      if (
        hasMoved &&
        (!lastPoint || Math.hypot(current.x - lastPoint.x, current.y - lastPoint.y) >= 1.5)
      ) {
        points.push({ x: current.x, y: current.y, t: time });
      }

      // Age cutoff: 150ms buffer
      while (points.length && time - points[0].t > 150) {
        points.shift();
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (points.length < 3) return;

      const len = points.length;
      const nPts: { x: number; y: number }[] = [];
      const rPts: { x: number; y: number }[] = [];

      for (let i = 0; i < len; i++) {
        const cur = points[i];
        const prev = points[Math.max(0, i - 1)];
        const next = points[Math.min(len - 1, i + 1)];

        let dx = next.x - prev.x;
        let dy = next.y - prev.y;
        const dist = Math.hypot(dx, dy) || 1;
        dx /= dist;
        dy /= dist;

        // Tapering ribbon thickness from 9px at head down to 1.5px at tail
        const c = (1.5 + 7.5 * Math.min(1, Math.max(0, 1 - (time - cur.t) / 150))) / 2;
        nPts.push({ x: cur.x - dy * c, y: cur.y + dx * c });
        rPts.push({ x: cur.x + dy * c, y: cur.y - dx * c });
      }

      const tail = points[0];
      const head = points[len - 1];

      // Ensure gradient endpoints aren't identical
      const gradEndX = head.x === tail.x ? head.x + 0.1 : head.x;
      const gradEndY = head.y === tail.y ? head.y + 0.1 : head.y;

      const gradient = ctx.createLinearGradient(tail.x, tail.y, gradEndX, gradEndY);
      gradient.addColorStop(0, 'rgba(29, 21, 39, 0)');
      gradient.addColorStop(1, foregroundColor);

      ctx.beginPath();
      ctx.moveTo(nPts[0].x, nPts[0].y);
      for (let i = 1; i < len; i++) ctx.lineTo(nPts[i].x, nPts[i].y);
      for (let i = len - 1; i >= 0; i--) ctx.lineTo(rPts[i].x, rPts[i].y);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.shadowColor = foregroundColor;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <canvas ref={canvasRef} className="custom-cursor-canvas" />
      <div ref={headRef} className="custom-cursor-head" />
    </div>
  );
};

