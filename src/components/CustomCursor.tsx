import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse / precision trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let animationFrameId: number;

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dotEl.style.opacity = '1';
        ringEl.style.opacity = '1';
      }

      // Hardware-accelerated direct positioning of precision dot
      dotEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (!target) {
        ringEl.classList.remove('hover');
        return;
      }

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive') ||
        target.closest('.btn') ||
        target.closest('.glass-card') ||
        target.closest('.tech-pill')
      ) {
        ringEl.classList.add('hover');
        dotEl.classList.add('hover');
      } else {
        ringEl.classList.remove('hover');
        dotEl.classList.remove('hover');
      }
    };

    const handleMouseDown = () => {
      ringEl.classList.add('clicked');
      dotEl.classList.add('clicked');
    };

    const handleMouseUp = () => {
      ringEl.classList.remove('clicked');
      dotEl.classList.remove('clicked');
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dotEl.style.opacity = '0';
      ringEl.style.opacity = '0';
    };

    const render = () => {
      // Snappy spring lerp for outer ring without sluggish lag
      ringX += (targetX - ringX) * 0.32;
      ringY += (targetY - ringY) * 0.32;

      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="subtle-cursor-dot"
        style={{ opacity: 0 }}
      />

      {/* Subtle Trailing Accent Ring (No blur, no text obstruction) */}
      <div
        ref={ringRef}
        className="subtle-cursor-ring"
        style={{ opacity: 0 }}
      />
    </>
  );
};
