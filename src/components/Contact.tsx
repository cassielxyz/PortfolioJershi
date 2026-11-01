import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  X, 
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // -------------------------------------------------------------
  // AUDIO SYNTHESIS: Crisp mechanical switch click
  // -------------------------------------------------------------
  const playSwitchSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(780, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.038);
      
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // AudioContext unavailable
    }
  }, []);

  const triggerActivation = useCallback(() => {
    playSwitchSound();
    try {
      navigator.vibrate?.(16);
    } catch {
      // Haptics unavailable
    }
    setIsOpen(true);
  }, [playSwitchSound]);

  // -------------------------------------------------------------
  // VERLET PHYSICS ELASTIC PULL CORD ENGINE
  // Reverse-engineered directly from Rishi Thakor's pull-cord system
  // -------------------------------------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const hit = hitRef.current;
    if (!wrap || !cv || !hit) return;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const N = 24;                          // Rope segments
    const G = 4400;                        // Gravity, px/s²
    const STEP = 1 / 120;                  // Fixed physics delta
    const ITER = 14;                       // Constraint iterations
    let dpr = 1;
    let W = 320;
    let H = 520;
    let L = 220;
    let EXT_MAX = 62;
    let HIDDEN = 75;
    let seg = 10;
    let ax = 200;
    let thick = 3.4;
    const knobS = 1.25;

    interface Point {
      x: number;
      y: number;
      px: number;
      py: number;
      w: number;
    }

    const pts: Point[] = [];
    let ext = 0;
    let extV = 0;
    let armed = true;
    let grab = -1;
    let grabOff = { x: 0, y: 0 };
    let target: { x: number; y: number } | null = null;
    let ptr: { x: number; y: number } | null = null;
    let ptrPrev: { x: number; y: number } | null = null;
    let downAt = 0;
    let downPos: { x: number; y: number } | null = null;
    let moved = 0;
    let acc = 0;
    let lastT = 0;
    let t = 0;
    let dropped = false;
    let live = false;
    let animId: number;

    const layout = () => {
      const vw = wrap.clientWidth || 320;
      const vh = wrap.clientHeight || 520;
      W = vw;
      H = vh;
      L = Math.min(260, Math.max(180, H * 0.45));
      EXT_MAX = 65;
      HIDDEN = EXT_MAX + 16;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);

      ax = Math.round(W * 0.5);
      const total = L + HIDDEN;
      seg = total / N;

      if (!pts.length) {
        for (let i = 0; i <= N; i++) {
          const x = ax;
          const y = -HIDDEN + i * seg;
          pts.push({ x, y, px: x, py: y, w: i === 0 ? 0 : i === N ? 0.3 : 1 });
        }
      } else {
        const dx = ax - pts[0].x;
        for (const p of pts) {
          p.x += dx;
          p.px += dx;
        }
      }
    };

    const step = (dt: number) => {
      if (!dropped) return;
      t += dt;

      // Switch spring (anchor travel)
      if (grab < 0) {
        const K = 760;
        const C = 22;
        extV += (-K * ext - C * extV) * dt;
        ext += extV * dt;
      }

      // Trigger switch activation when pulled past 78% threshold
      if (ext > EXT_MAX * 0.78 && armed && live) {
        armed = false;
        triggerActivation();
      }
      if (ext < EXT_MAX * 0.22) {
        armed = true;
      }

      const a = pts[0];
      a.x = a.px = ax;
      a.y = a.py = -HIDDEN + ext;

      const wind = Math.sin(t * 0.6) * 12 + Math.sin(t * 1.5) * 5;
      const damp = grab >= 0 ? 0.992 : 0.988;

      for (let i = 1; i <= N; i++) {
        if (i === grab) continue;
        const p = pts[i];
        const vx = (p.x - p.px) * damp;
        const vy = (p.y - p.py) * damp;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + wind * dt * dt * (i / N);
        p.y += vy + G * dt * dt;
      }

      if (grab >= 0 && target) {
        const g = pts[grab];
        g.px = g.x;
        g.py = g.y;
        g.x = target.x;
        g.y = target.y;
      }

      for (let k = 0; k < ITER; k++) {
        for (let i = 0; i < N; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const w1 = i === grab ? 0 : p1.w;
          const w2 = i + 1 === grab ? 0 : p2.w;
          const sw = w1 + w2;
          if (!sw) continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const d = Math.hypot(dx, dy) || 1e-6;
          const diff = (d - seg) / d / sw;

          p1.x += dx * diff * w1;
          p1.y += dy * diff * w1;
          p2.x -= dx * diff * w2;
          p2.y -= dy * diff * w2;
        }
      }

      // Bounds
      for (let i = 1; i <= N; i++) {
        const p = pts[i];
        if (p.x < 12) p.x = 12;
        else if (p.x > W - 12) p.x = W - 12;
        if (p.y > H - 38) p.y = H - 38;
      }
    };

    const updateDrag = () => {
      if (grab < 0 || !ptr) return;
      let tx = ptr.x - grabOff.x;
      let ty = ptr.y - grabOff.y;
      const bx = ax;
      const by = -HIDDEN;
      const reach = grab * seg;
      const dx = tx - bx;
      const dy = ty - by;
      const d = Math.hypot(dx, dy) || 1e-6;
      let need = d - reach;

      if (need > EXT_MAX) {
        const over = need - EXT_MAX;
        const allowed = reach + EXT_MAX + (over * 0.15) / (1 + over / 150);
        tx = bx + (dx / d) * allowed;
        ty = by + (dy / d) * allowed;
        need = EXT_MAX;
      }

      const targetExt = Math.max(0, need);
      const prevExt = ext;
      ext += (targetExt - ext) * 0.55;
      extV = (ext - prevExt) * 60;
      target = { x: Math.max(12, Math.min(W - 12, tx)), y: Math.min(H - 38, ty) };
    };

    const localCoord = (e: PointerEvent | MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    let sleeping = false;
    let still = 0;
    let touchedAt = 0;

    const wake = () => {
      still = 0;
      touchedAt = performance.now();
      if (!sleeping) return;
      sleeping = false;
      lastT = 0;
      acc = 0;
      animId = requestAnimationFrame(loop);
    };

    const tug = () => {
      wake();
      extV = EXT_MAX * 44;
      pts[N].px = pts[N].x + 1.8;
      triggerActivation();
    };

    const onMove = (e: PointerEvent) => {
      if (grab < 0) return;
      e.preventDefault();
      ptrPrev = ptr;
      ptr = localCoord(e);
      if (downPos) {
        moved = Math.max(moved, Math.hypot(ptr.x - downPos.x, ptr.y - downPos.y));
      }
    };

    const endDrag = () => {
      if (grab < 0) return;
      const g = pts[grab];
      if (ptr && ptrPrev) {
        const vx = ptr.x - ptrPrev.x;
        const vy = ptr.y - ptrPrev.y;
        g.px = g.x - vx * 0.5;
        g.py = g.y - vy * 0.5;
      }

      const isTap = moved < 6 && performance.now() - downAt < 300;
      grab = -1;
      target = null;
      ptr = ptrPrev = null;
      wrap.classList.remove('dragging');

      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);

      if (isTap) tug();
    };

    const startDrag = (e: PointerEvent, idx: number) => {
      wake();
      grab = idx;
      const p = localCoord(e);
      const g = pts[idx];
      grabOff = { x: p.x - g.x, y: p.y - g.y };
      ptr = ptrPrev = p;
      target = { x: g.x, y: g.y };
      downAt = performance.now();
      downPos = p;
      moved = 0;
      wrap.classList.add('dragging');

      window.addEventListener('pointermove', onMove, { passive: false });
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
    };

    const handleHitDown = (e: PointerEvent) => {
      if (!dropped) return;
      e.preventDefault();
      try {
        hit.setPointerCapture(e.pointerId);
      } catch {
        // Pointer capture unavailable
      }
      startDrag(e, N);
    };

    hit.addEventListener('pointerdown', handleHitDown);

    // Knot & Bead Paths
    const pathThrough = (c: CanvasRenderingContext2D, ps: Point[]) => {
      c.beginPath();
      c.moveTo(ps[0].x, ps[0].y);
      for (let i = 1; i < ps.length - 1; i++) {
        const mx = (ps[i].x + ps[i + 1].x) / 2;
        const my = (ps[i].y + ps[i + 1].y) / 2;
        c.quadraticCurveTo(ps[i].x, ps[i].y, mx, my);
      }
      const l = ps[ps.length - 1];
      c.lineTo(l.x, l.y);
    };

    const knobPath = (c: CanvasRenderingContext2D) => {
      c.beginPath();
      c.moveTo(-3.1, 6.2);
      c.bezierCurveTo(-3.6, 10.5, -9.6, 13.5, -9.6, 22.5);
      c.bezierCurveTo(-9.6, 30.5, -5.4, 35, 0, 35);
      c.bezierCurveTo(5.4, 35, 9.6, 30.5, 9.6, 22.5);
      c.bezierCurveTo(9.6, 13.5, 3.6, 10.5, 3.1, 6.2);
      c.closePath();
    };

    const drawKnob = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      ang: number,
      shadowOnly: boolean
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(ang - Math.PI / 2);
      c.scale(knobS, knobS);

      if (shadowOnly) {
        knobPath(c);
        c.fill();
        c.fillRect(-3.4, -0.5, 6.8, 7.5);
        c.restore();
        return;
      }

      // Brass ferrule crimp
      const fg = c.createLinearGradient(-3.6, 0, 3.6, 0);
      fg.addColorStop(0, '#423620');
      fg.addColorStop(0.3, '#E6D49D');
      fg.addColorStop(0.55, '#B0924F');
      fg.addColorStop(1, '#3B2D18');
      c.fillStyle = fg;
      c.beginPath();
      if (c.roundRect) {
        c.roundRect(-3.5, -0.6, 7, 7.6, 1.2);
      } else {
        c.rect(-3.5, -0.6, 7, 7.6);
      }
      c.fill();
      c.fillStyle = 'rgba(0,0,0,0.28)';
      c.fillRect(-3.5, 2.6, 7, 0.7);
      c.fillRect(-3.5, 4.4, 7, 0.6);

      // Obsidian luxury teardrop body
      knobPath(c);
      const bg = c.createLinearGradient(-9.6, 0, 9.6, 0);
      bg.addColorStop(0, '#15131C');
      bg.addColorStop(0.25, '#2D2838');
      bg.addColorStop(0.48, '#4E4660');
      bg.addColorStop(0.68, '#262230');
      bg.addColorStop(1, '#0F0E14');
      c.fillStyle = bg;
      c.fill();

      c.save();
      knobPath(c);
      c.clip();

      // Subtle grain lines
      c.strokeStyle = 'rgba(245, 208, 254, 0.15)';
      c.lineWidth = 0.55;
      for (let k = -3; k <= 3; k++) {
        c.beginPath();
        c.moveTo(k * 2.4 - 0.6, 8);
        c.bezierCurveTo(k * 2.9 + 1, 16, k * 2.2 - 1, 26, k * 1.6, 35);
        c.stroke();
      }

      // Specular highlight
      const hl = c.createRadialGradient(-3.6, 17, 0.5, -3.6, 17, 9);
      hl.addColorStop(0, 'rgba(245, 208, 254, 0.45)');
      hl.addColorStop(1, 'rgba(245, 208, 254, 0)');
      c.fillStyle = hl;
      c.fillRect(-10, 6, 20, 30);

      const bo = c.createLinearGradient(0, 24, 0, 35.5);
      bo.addColorStop(0, 'rgba(0,0,0,0)');
      bo.addColorStop(1, 'rgba(0,0,0,0.4)');
      c.fillStyle = bo;
      c.fillRect(-10, 6, 20, 30);
      c.restore();

      // Gleam streak
      c.fillStyle = 'rgba(255, 255, 255, 0.45)';
      c.beginPath();
      c.ellipse(-4.4, 20.5, 1.1, 5.2, -0.08, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const ps = pts;
      const last = ps[N];
      const prev = ps[N - 1];
      const ang = Math.atan2(last.y - prev.y, last.x - prev.x);

      // Wall drop shadow
      ctx.save();
      ctx.translate(6, 10);
      if ('filter' in ctx) ctx.filter = 'blur(4px)';
      ctx.strokeStyle = 'rgba(38, 36, 46, 0.15)';
      ctx.lineWidth = thick + 1.2;
      ctx.lineCap = 'round';
      pathThrough(ctx, ps);
      ctx.stroke();

      ctx.fillStyle = 'rgba(38, 36, 46, 0.22)';
      drawKnob(ctx, last.x, last.y, ang, true);
      ctx.restore();

      // Braided cotton / obsidian cord
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      pathThrough(ctx, ps);
      ctx.strokeStyle = '#26242E';
      ctx.lineWidth = thick + 1.2;
      ctx.stroke();

      ctx.strokeStyle = '#63606E';
      ctx.lineWidth = thick;
      ctx.stroke();

      // Specular light along cord side
      ctx.save();
      ctx.translate(-thick * 0.22, -thick * 0.05);
      pathThrough(ctx, ps);
      ctx.strokeStyle = 'rgba(245, 208, 254, 0.65)';
      ctx.lineWidth = thick * 0.32;
      ctx.stroke();
      ctx.restore();

      // Draw the knob bead
      drawKnob(ctx, last.x, last.y, ang, false);

      // Position hit target right over knob
      const kx = last.x + Math.cos(ang) * 18 * knobS;
      const ky = last.y + Math.sin(ang) * 18 * knobS;
      hit.style.transform = `translate(${kx}px, ${ky}px)`;
    };

    const loop = (now: number) => {
      if (!lastT) lastT = now;
      const dt = Math.min((now - lastT) / 1000, 1 / 20);
      lastT = now;

      updateDrag();
      acc += dt;
      while (acc >= STEP) {
        step(STEP);
        acc -= STEP;
      }

      if (dropped && live && grab < 0 && now - touchedAt > 2400) {
        for (const q of pts) {
          q.px += (q.x - q.px) * 0.06;
          q.py += (q.y - q.py) * 0.06;
        }
      }

      draw();

      let motion = Math.abs(extV) + Math.abs(ext);
      for (const q of pts) {
        motion = Math.max(motion, Math.abs(q.x - q.px) + Math.abs(q.y - q.py));
      }

      if (dropped && live && grab < 0 && motion < 0.06) {
        if (++still > 30) {
          for (const q of pts) {
            q.px = q.x;
            q.py = q.y;
          }
          sleeping = true;
          return;
        }
      } else {
        still = 0;
      }

      animId = requestAnimationFrame(loop);
    };

    layout();
    pts.forEach((p, i) => {
      p.y = p.py = -HIDDEN - i * seg * 0.95;
      p.x = p.px = ax + Math.sin(i * 0.5) * 1.5;
    });

    const drop = () => {
      dropped = true;
      for (const p of pts) {
        p.px = p.x - 0.5;
      }
      setTimeout(() => {
        live = true;
      }, 700);
    };

    drop();
    animId = requestAnimationFrame(loop);

    const onResize = () => {
      wake();
      layout();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      hit.removeEventListener('pointerdown', handleHitDown);
      window.removeEventListener('resize', onResize);
    };
  }, [triggerActivation]);

  // Form handling
  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required';
    }
    if (!formData.message.trim() || formData.message.length < 8) {
      errs.message = 'Please provide at least 8 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setFormSubmitted(true);
    }
  };

  // ESC key listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="creative-contact-stage"
    >
      <style>{`
        /* =========================================================
           CREATIVE CONTACT SECTION: PULL THIS INTERACTIVE STAGE
           Theme: Obsidian Black, Ash Neutrals, Whisper Lavender, Crisp White
           ========================================================= */
        .creative-contact-stage {
          position: relative;
          width: 100%;
          min-height: clamp(620px, 86vh, 880px);
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 65% 50% at 75% 30%, rgba(245, 208, 254, 0.42) 0%, rgba(230, 215, 245, 0.2) 50%, transparent 75%),
            radial-gradient(ellipse 50% 50% at 20% 75%, rgba(245, 208, 254, 0.28) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        .pull-stage-layout {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(280px, 1fr);
          gap: 3.5rem;
          align-items: center;
        }

        /* ---------------------------------------------------------
           LEFT: BIG EDITORIAL "PULL THIS." & ARROW LOCKUP
           No standard headings — pure high-concept design
           --------------------------------------------------------- */
        .pull-editorial-lockup {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .pull-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(245, 208, 254, 0.35);
          border: 1px solid rgba(245, 208, 254, 0.85);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #4A1D96;
        }

        .pull-live-beacon {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: beaconPulse 2s ease-in-out infinite;
        }

        @keyframes beaconPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .pull-hero-text {
          font-family: 'Bodoni Moda', 'Instrument Serif', Georgia, serif;
          font-size: clamp(3.8rem, 8.5vw, 8.2rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #121118;
          margin: 0;
          text-transform: none;
        }

        .pull-hero-text em {
          font-family: 'Instrument Serif', 'Bodoni Moda', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #7E22CE;
          margin-left: 0.1em;
        }

        .pull-instruction-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .pull-arrow-svg {
          width: 140px;
          height: 52px;
          color: #63606E;
          flex-shrink: 0;
          animation: arrowFloat 2.5s ease-in-out infinite alternate;
        }

        @keyframes arrowFloat {
          0% { transform: translateX(0); }
          100% { transform: translateX(10px); }
        }

        .pull-hint-text {
          font-size: 0.92rem;
          font-weight: 500;
          line-height: 1.5;
          color: #63606E;
          max-width: 280px;
        }

        .pull-hint-text strong {
          color: #121118;
        }

        /* ---------------------------------------------------------
           RIGHT: ELASTIC CORD STAGE
           --------------------------------------------------------- */
        .cord-interactive-stage {
          position: relative;
          width: 100%;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cord-ceiling-bracket {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 12px;
          border-radius: 0 0 8px 8px;
          background: #26242E;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        .cord-canvas-wrap {
          position: relative;
          width: 100%;
          max-width: 340px;
          height: 100%;
          overflow: visible;
        }

        .cord-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .cord-hit-target {
          position: absolute;
          left: 0;
          top: 0;
          width: 72px;
          height: 72px;
          margin: -36px 0 0 -36px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: grab;
          touch-action: none;
          pointer-events: auto;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cord-hit-target:active,
        .cord-canvas-wrap.dragging .cord-hit-target {
          cursor: grabbing;
        }

        .cord-hover-hint {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(38, 36, 46, 0.1);
          box-shadow: 0 8px 24px rgba(20, 19, 26, 0.06);
          font-size: 0.72rem;
          font-weight: 600;
          color: #4A1D96;
          white-space: nowrap;
          pointer-events: none;
          animation: hintBounce 2s ease-in-out infinite;
        }

        @keyframes hintBounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -5px); }
        }

        /* =========================================================
           POPUP: CREATIVE FULL-STAGE CONTACT ME LIQUID GLASS MODAL
           ========================================================= */
        .contact-popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(18, 17, 24, 0.65);
          backdrop-filter: blur(28px) saturate(180%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          box-sizing: border-box;
          overflow-y: auto;
        }

        .contact-popup-shell {
          position: relative;
          width: 100%;
          max-width: 980px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(40px) saturate(210%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 28px;
          box-shadow: 
            0 36px 90px -15px rgba(20, 19, 26, 0.28),
            0 12px 30px rgba(147, 51, 234, 0.12),
            inset 0 1.5px 2px rgba(255, 255, 255, 1);
          padding: 2.75rem 2.5rem;
          box-sizing: border-box;
          color: #121118;
          overflow: hidden;
        }

        /* Top Specular Rim & Ambient Glow */
        .contact-popup-shell::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 1) 30%, rgba(245, 208, 254, 0.9) 50%, rgba(255, 255, 255, 1) 70%, transparent);
        }

        .popup-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(20, 19, 26, 0.05);
          border: 1px solid rgba(38, 36, 46, 0.1);
          color: #63606E;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }

        .popup-close-btn:hover {
          background: rgba(20, 19, 26, 0.12);
          color: #121118;
          transform: rotate(90deg) scale(1.05);
        }

        .popup-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(38, 36, 46, 0.08);
        }

        .popup-headline-group h2 {
          font-family: 'Bodoni Moda', 'Instrument Serif', Georgia, serif;
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #121118;
          margin: 0.35rem 0 0 0;
        }

        .popup-grid-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
          gap: 2.5rem;
          align-items: stretch;
        }

        /* ---------------------------------------------------------
           POPUP LEFT: DIRECT CONTACT CHANNELS & CREDENTIALS
           --------------------------------------------------------- */
        .popup-channels-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .channel-info-card {
          padding: 1.25rem;
          border-radius: 18px;
          background: rgba(250, 247, 252, 0.85);
          border: 1px solid rgba(38, 36, 46, 0.08);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .channel-info-card:hover {
          background: #FFFFFF;
          border-color: rgba(245, 208, 254, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(147, 51, 234, 0.08);
        }

        .channel-icon-well {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #FFFFFF;
          border: 1px solid rgba(38, 36, 46, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7E22CE;
          flex-shrink: 0;
        }

        .channel-text-meta {
          flex: 1;
          min-width: 0;
        }

        .channel-meta-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #8E8B99;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .channel-meta-val {
          font-size: 0.88rem;
          font-weight: 700;
          color: #121118;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .channel-copy-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(20, 19, 26, 0.04);
          border: 1px solid rgba(38, 36, 46, 0.08);
          color: #63606E;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .channel-copy-btn:hover {
          background: #121118;
          color: #FFFFFF;
        }

        .popup-socials-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .popup-social-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: #121118;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .popup-social-btn:hover {
          background: #26242E;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        /* ---------------------------------------------------------
           POPUP RIGHT: INTERACTIVE CONTACT MESSAGE FORM
           --------------------------------------------------------- */
        .popup-form-column {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #2D2938;
        }

        .form-control-input,
        .form-control-textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          background: rgba(250, 247, 252, 0.85);
          border: 1px solid rgba(38, 36, 46, 0.12);
          color: #121118;
          font-family: inherit;
          font-size: 0.88rem;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .form-control-input:focus,
        .form-control-textarea:focus {
          background: #FFFFFF;
          border-color: #9333EA;
          box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.12);
        }

        .form-control-textarea {
          resize: vertical;
          min-height: 95px;
        }

        .form-error-msg {
          font-size: 0.7rem;
          color: #DC2626;
          font-weight: 600;
        }

        .form-submit-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.95rem 1.75rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #181424 0%, #2A223D 100%);
          border: 1px solid rgba(245, 208, 254, 0.3);
          color: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 24px -6px rgba(18, 17, 24, 0.35);
          margin-top: 0.35rem;
        }

        .form-submit-pill:hover {
          background: linear-gradient(135deg, #261F38 0%, #3B3054 100%);
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -6px rgba(147, 51, 234, 0.35);
          border-color: rgba(245, 208, 254, 0.6);
        }

        .form-success-banner {
          padding: 1.5rem;
          border-radius: 18px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #065F46;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .pull-stage-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .pull-editorial-lockup {
            align-items: center;
          }
          .pull-instruction-row {
            flex-direction: column;
            gap: 0.75rem;
          }
          .pull-arrow-svg {
            transform: rotate(90deg);
            animation: none;
          }
          .cord-interactive-stage {
            height: 380px;
          }
          .popup-grid-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .contact-popup-shell {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div className="pull-stage-layout">
        
        {/* =========================================================
            LEFT: HIGH-CONCEPT EDITORIAL "PULL THIS."
            Zero standard headings — pure aesthetic intrigue
            ========================================================= */}
        <motion.div 
          className="pull-editorial-lockup"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Big Editorial Statement */}
          <h2 className="pull-hero-text">
            Pull this<em>.</em>
          </h2>

          {/* Instruction & Animated Organic Arrow pointing to cord */}
          <div className="pull-instruction-row">
            <p className="pull-hint-text">
              Yank the cord downwards or tap the switch to <strong>initiate direct communication</strong>.
            </p>

            <svg 
              className="pull-arrow-svg" 
              viewBox="0 0 140 52" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M10 26C45 26 70 12 125 36" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="4 4"
                strokeLinecap="round" 
              />
              <path 
                d="M118 26L127 37L114 43" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        </motion.div>

        {/* =========================================================
            RIGHT: VERLET PHYSICS ELASTIC WIRE PULL-CORD
            ========================================================= */}
        <div className="cord-interactive-stage">
          <div className="cord-ceiling-bracket" aria-hidden="true" />

          <div ref={wrapRef} className="cord-canvas-wrap">
            <canvas ref={canvasRef} className="cord-canvas" aria-hidden="true" />
            
            <button 
              ref={hitRef}
              className="cord-hit-target"
              role="switch"
              aria-checked={isOpen}
              aria-label="Pull cord to open contact popup"
            />

            <div className="cord-hover-hint" aria-hidden="true">
              <span>⇣ Pull or tap to switch</span>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================
          POPUP: FULL-STAGE CREATIVE CONTACT ME MODAL
          ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="contact-popup-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div 
              className="contact-popup-shell"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="popup-close-btn"
                aria-label="Close contact dialog"
              >
                <X size={18} />
              </button>

              {/* Popup Header */}
              <div className="popup-header-row">
                <div className="popup-headline-group">
                  <div className="pull-badge-pill">
                    <span className="pull-live-beacon" />
                    <span>STATUS: READY FOR ENTERPRISE ROLES</span>
                  </div>
                  <h2>Let's build something remarkable.</h2>
                </div>
              </div>

              {/* Popup Grid */}
              <div className="popup-grid-layout">
                
                {/* Left Column: Direct Channels & Socials */}
                <div className="popup-channels-column">
                  
                  {/* Direct Mailto Button (No raw email string visible) */}
                  <a 
                    href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20-%20Jershika%20Portfolio`}
                    className="channel-info-card email-direct-button"
                    title="Launch your mail application directly"
                  >
                    <div className="channel-icon-well">
                      <Mail size={18} />
                    </div>
                    <div className="channel-text-meta">
                      <div className="channel-meta-label">Direct Communication</div>
                      <div className="channel-meta-val" style={{ color: '#7E22CE' }}>
                        Open Mail Application ↗
                      </div>
                    </div>
                  </a>

                  {/* Location Card */}
                  <div className="channel-info-card">
                    <div className="channel-icon-well">
                      <MapPin size={18} />
                    </div>
                    <div className="channel-text-meta">
                      <div className="channel-meta-label">Location / Base</div>
                      <div className="channel-meta-val">{personalInfo.location}</div>
                    </div>
                  </div>

                  {/* Social Direct Links */}
                  <div className="popup-socials-row">
                    <a 
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popup-social-btn"
                    >
                      <GithubIcon size={16} />
                      <span>GitHub</span>
                      <ExternalLink size={12} />
                    </a>

                    <a 
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popup-social-btn"
                    >
                      <LinkedinIcon size={16} />
                      <span>LinkedIn</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Right Column: Direct Message Transmission Form */}
                <div className="popup-form-column">
                  {formSubmitted ? (
                    <motion.div 
                      className="form-success-banner"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <CheckCircle2 size={28} className="text-emerald-600 flex-shrink-0" />
                      <div>
                        <strong className="block text-sm font-bold text-emerald-950 mb-1">
                          Transmission Received!
                        </strong>
                        <p className="text-xs text-emerald-800 m-0 leading-relaxed">
                          Thank you for reaching out. Jershika will review your message and reply directly to your inbox shortly.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="popup-form-column">
                      <div className="form-input-group">
                        <label className="form-label" htmlFor="contact-name">Your Full Name</label>
                        <input 
                          id="contact-name"
                          type="text"
                          className="form-control-input"
                          placeholder="e.g. Elena Rostova"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <span className="form-error-msg">{errors.name}</span>}
                      </div>

                      <div className="form-input-group">
                        <label className="form-label" htmlFor="contact-email">Email Address</label>
                        <input 
                          id="contact-email"
                          type="email"
                          className="form-control-input"
                          placeholder="elena@enterprise.io"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <span className="form-error-msg">{errors.email}</span>}
                      </div>

                      <div className="form-input-group">
                        <label className="form-label" htmlFor="contact-message">Inquiry / Message</label>
                        <textarea 
                          id="contact-message"
                          className="form-control-textarea"
                          placeholder="Tell me about your project, team role, or timeline..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                        {errors.message && <span className="form-error-msg">{errors.message}</span>}
                      </div>

                      <button type="submit" className="form-submit-pill">
                        <span>Send Transmission</span>
                        <Send size={14} />
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
