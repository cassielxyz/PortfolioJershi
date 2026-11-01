import React, { useRef, useState, useEffect, useCallback } from 'react';

interface StoryChapter {
  id: string;
  year: string;
  when: string;
  role: string;
  company: string;
  responsibilities: string[];
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "exp-imperial",
    year: "2026",
    when: "AUG 2026 — PRESENT",
    role: "Full Stack Developer",
    company: "Imperial Info System · Chennai",
    responsibilities: [
      "Engineered enterprise React interface modules with modular component architecture and zero-regression state management.",
      "Integrated microservice REST APIs with robust error boundaries, request throttling, and client-side caching.",
      "Spearheaded design-to-code implementations with fluid spring motion, accessible navigation, and high design fidelity."
    ]
  },
  {
    id: "exp-agile",
    year: "2025",
    when: "JUN 2025 — JUL 2025",
    role: "Python Full Stack Intern",
    company: "Agile Infotech · Kerala",
    responsibilities: [
      "Built three production-ready Python web applications integrating MongoDB persistence and asynchronous request flows.",
      "Created resilient backend validation pipelines ensuring data integrity across transactional payloads.",
      "Optimized MongoDB schema indexing to guarantee sub-50ms query turnaround under concurrent reads."
    ]
  },
  {
    id: "exp-ak",
    year: "2025",
    when: "FEB 2025",
    role: "Full Stack Web Development Intern",
    company: "Ak Info Park · Kanyakumari",
    responsibilities: [
      "Engineered five responsive web interfaces using semantic HTML5, modern CSS3 animations, and reactive JavaScript.",
      "Diagnosed and eliminated redundant network calls, reducing client-server data exchange latency by 15%.",
      "Standardized mobile-first breakpoint logic ensuring cross-device layout consistency."
    ]
  },
  {
    id: "exp-srishti",
    year: "2024",
    when: "FEB 2024 — MAR 2024",
    role: "Python and Data Analysis Intern",
    company: "Srishti Innovative Computer Systems · Kerala",
    responsibilities: [
      "Ingested, sanitized, and transformed three multi-variate datasets using Python and scientific computing libraries.",
      "Generated analytical reporting dashboards translating complex raw metrics into visual trends and strategic takeaways.",
      "Established automated data ingestion scripts eliminating manual spreadsheet cleanup."
    ]
  }
];

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const tailRef = useRef<HTMLSpanElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const activeChapter = STORY_CHAPTERS[activeIndex] || STORY_CHAPTERS[0];
  const yearDigits = activeChapter.year.split(""); // e.g. ["2", "0", "2", "6"]

  // -------------------------------------------------------------
  // CANVAS: Concentric 3D Rotating Clock / Compass Dials & Dust
  // Reverse-engineered directly from Rishi Thakor's canvas tunnel
  // -------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const RINGS = 16;
    const GAP = 340;
    const FOCAL = 520;
    const R = 620;
    const TICKS = 60;
    const rgb = '26, 24, 24';

    const dust = Array.from({ length: 65 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 100 + Math.random() * 720,
      z: Math.random() * RINGS * GAP,
      s: 0.5 + Math.random() * 1.4
    }));

    let startTime = performance.now();

    const render = () => {
      const t = (performance.now() - startTime) * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Center the dial to align directly behind the year and title
      const cx = width * 0.58;
      const cy = height * 0.52;
      const k = Math.min(width, height) / 880;
      const p = scrollProgress;

      // Scrolling carries you through the dials in 3D space
      const camZ = p * (STORY_CHAPTERS.length - 1) * GAP * 1.5 + t * 14;
      const spin = -p * Math.PI * 1.6 - t * 0.02;
      const len = RINGS * GAP;

      ctx.lineCap = 'round';

      // Concentric rotating dial rings
      for (let i = 0; i < RINGS; i++) {
        const z = ((i * GAP - camZ) % len + len) % len + 50;
        const s = (FOCAL / z) * k;
        const fog = Math.min(1, Math.max(0, (z - 240) / 1050)) * Math.max(0, 1 - z / len);
        if (fog <= 0.01) continue;

        const rr = R * s;
        const rot = spin + i * 0.21;

        // Dial ring circle
        ctx.strokeStyle = `rgba(${rgb}, ${(fog * 0.11).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, 1.15 * s);
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();

        // Clock / compass radial tick marks
        const T = width < 768 ? 36 : TICKS;
        const every = T / 12;

        for (const hour of [false, true]) {
          const l = (hour ? 42 : 16) * s;
          ctx.beginPath();
          for (let j = 0; j < T; j++) {
            if ((j % every === 0) !== hour) continue;
            const a = rot + (j / T) * Math.PI * 2;
            const c = Math.cos(a);
            const d = Math.sin(a);
            ctx.moveTo(cx + c * (rr - l), cy + d * (rr - l));
            ctx.lineTo(cx + c * rr, cy + d * rr);
          }
          ctx.strokeStyle = `rgba(${rgb}, ${(fog * (hour ? 0.28 : 0.12)).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.5, (hour ? 2.2 : 1.1) * s);
          ctx.stroke();
        }

        // Clock hand on dial
        const ha = rot * 3 + i;
        ctx.strokeStyle = `rgba(${rgb}, ${(fog * 0.14).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, 1.8 * s);
        if (rr < Math.min(width, height) * 0.45) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ha) * rr * 0.52, cy + Math.sin(ha) * rr * 0.52);
          ctx.stroke();
        }
      }

      // Drifting stardust particles
      for (const q of dust) {
        const z = ((q.z - camZ * 1.1) % len + len) % len + 35;
        const s = (FOCAL / z) * k;
        const fog = Math.min(1, Math.max(0, (z - 280) / 900)) * Math.max(0, 1 - z / len);
        const a = q.a + spin * 0.28;
        ctx.fillStyle = `rgba(${rgb}, ${(fog * 0.25).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(a) * q.r * s,
          cy + Math.sin(a) * q.r * s,
          Math.max(0.4, q.s * s * 1.8),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgress]);

  // -------------------------------------------------------------
  // NATURAL SCROLL LISTENER & POSITION TRACKING
  // Smooth, slow, steady scroll mapping without hijacking
  // -------------------------------------------------------------
  const updateScroll = useCallback(() => {
    const line = lineRef.current;
    const list = listRef.current;
    const rail = railRef.current;
    const tail = tailRef.current;
    if (!line || !list) return;

    const chapters = list.querySelectorAll<HTMLElement>('.ch');
    if (!chapters.length) return;

    const N = chapters.length;
    const lr = line.getBoundingClientRect();
    const mid = window.innerHeight * 0.5;

    // Track coordinates
    const firstChapter = chapters[0];
    const lastChapter = chapters[N - 1];
    const firstY = firstChapter.offsetTop + 18;
    const endY = lastChapter.offsetTop + lastChapter.offsetHeight - 24;
    const totalDist = Math.max(1, endY - firstY);

    if (rail) {
      rail.style.top = `${firstY}px`;
      rail.style.height = `${totalDist}px`;
    }

    // Scroll progress p [0, 1]
    const currentY = Math.min(endY, Math.max(firstY, mid - lr.top));
    const p = Math.max(0, Math.min(1, (currentY - firstY) / totalDist));
    setScrollProgress(p);

    if (tail) {
      tail.style.top = `${firstY}px`;
      tail.style.height = `${currentY - firstY}px`;
    }

    // Determine active chapter based on screen center
    let activeIdx = 0;
    chapters.forEach((c, i) => {
      const cRect = c.getBoundingClientRect();
      if (cRect.top < mid + 60) {
        activeIdx = i;
      }
    });

    setActiveIndex(activeIdx);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    const timer = setTimeout(updateScroll, 80);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, [updateScroll]);

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="story"
    >
      <style>{`
        /* =========================================================
           ZERO GAP FIX FROM SKILLS
           ========================================================= */
        #skills.skills-pinned-runway {
          margin-bottom: 0 !important;
        }

        /* =========================================================
           MY STORY: CLEAN, REFINED MINIMALIST CONTAINER
           Matching our exact theme: Black, Ash, White, minimal pinkish-lavender
           ========================================================= */
        .story {
          position: relative;
          z-index: 1;
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 55% 50% at 6% 24%, rgba(245, 208, 254, 0.35) 0%, rgba(230, 215, 245, 0.18) 45%, transparent 75%),
            radial-gradient(ellipse 45% 45% at 94% 76%, rgba(245, 208, 254, 0.22) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          box-shadow: inset 0 1.75rem 2.25rem -1.75rem rgba(38, 36, 46, 0.08);
          box-sizing: border-box;
          color: #121118;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", Helvetica, Arial, sans-serif;
          overflow: visible;
        }

        .story__stage {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
          gap: 4rem;
          align-items: start;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 2rem;
          box-sizing: border-box;
        }

        /* =========================================================
           LEFT COLUMN: PINNED TIME-TRAVEL CLOCK & DIALS
           ========================================================= */
        .story__clock {
          position: sticky;
          top: 0;
          height: 100vh;
          max-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 2rem 1rem 2rem 0;
          box-sizing: border-box;
          z-index: 2;
        }

        /* Canvas Clock Dial Tunnel Behind Year */
        .story__bg-canvas {
          position: absolute;
          left: -20%;
          right: -20%;
          top: 0;
          width: 140%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          -webkit-mask: radial-gradient(closest-side, #000 55%, transparent 95%);
          mask: radial-gradient(closest-side, #000 55%, transparent 95%);
          opacity: 0.9;
        }

        /* Eyebrow: • My story */
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #63606E;
          margin: 0 0 0.45rem 0;
          letter-spacing: -0.01em;
        }

        .eyebrow__dot {
          display: inline-block;
          font-size: 0.95rem;
          line-height: 1;
          color: #F5D0FE;
        }

        /* Headline: Let's go back in time. */
        .story__h {
          margin: 0;
          font-size: clamp(2.2rem, 3.2vw, 2.85rem);
          font-weight: 700;
          line-height: 1.04;
          letter-spacing: -0.035em;
          color: #121118;
        }

        /* Mechanical Rolling Year Digits (Odometer) */
        .story__yr {
          display: flex;
          margin: 1.15rem 0 0 -0.04em;
          font-size: clamp(5.2rem, 10.5vw, 9.8rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.055em;
          font-variant-numeric: tabular-nums;
          color: #121118;
        }

        .dg {
          display: block;
          height: 1em;
          overflow: hidden;
          padding-right: 0.02em;
        }

        .dg__c {
          display: flex;
          flex-direction: column;
          transform: translateY(calc(var(--d, 0) * -1em));
          transition: transform 0.85s cubic-bezier(0.65, 0, 0.2, 1);
        }

        .dg:nth-child(2) .dg__c { transition-delay: 0.04s; }
        .dg:nth-child(3) .dg__c { transition-delay: 0.08s; }
        .dg:nth-child(4) .dg__c { transition-delay: 0.12s; }

        .dg__c i {
          display: block;
          height: 1em;
          font-style: normal;
          text-align: center;
        }

        /* Period Sub-label (Uppercase Monospace) */
        .story__when {
          margin-top: 0.85rem;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #63606E;
        }

        /* Rewind Progress Meter */
        .story__meter {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: 1.35rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #121118;
          font-variant-numeric: tabular-nums;
          width: 100%;
          max-width: 290px;
        }

        .story__rw {
          width: 1.15rem;
          height: 1.15rem;
          color: #63606E;
          transition: transform 0.08s linear;
        }

        .story__count {
          font-weight: 700;
          color: #121118;
        }

        .story__of {
          color: #8E8B99;
          font-weight: 500;
        }

        .story__bar {
          position: relative;
          flex: 0 1 9.5rem;
          height: 1.5px;
          margin-left: 0.4rem;
          background: rgba(38, 36, 46, 0.14);
          overflow: hidden;
        }

        .story__bar b {
          position: absolute;
          inset: 0;
          background: #121118;
          transform-origin: 0 50%;
          transition: transform 0.05s linear;
        }

        /* =========================================================
           RIGHT COLUMN: MINIMAL EDITORIAL TIMELINE
           Clean, compact, no bulky cards or containers
           Smooth in-and-out animations on scroll
           ========================================================= */
        .story__line {
          position: relative;
          padding-top: 32vh;
          padding-bottom: 36vh;
        }

        /* Timeline Rail */
        .story__rail {
          position: absolute;
          left: 0.45rem;
          width: 1.5px;
          background: rgba(38, 36, 46, 0.12);
          pointer-events: none;
          z-index: 1;
        }

        /* Active Filled Tail */
        .story__tail {
          position: absolute;
          left: 0.45rem;
          width: 1.5px;
          background: #121118;
          pointer-events: none;
          z-index: 2;
        }

        /* Sticky Travelling Dot */
        .story__sticky-dot-wrapper {
          position: sticky;
          top: calc(50vh - 0.45rem);
          left: 0.45rem;
          margin-left: -0.45rem;
          width: 0.9rem;
          height: 0.9rem;
          pointer-events: none;
          z-index: 10;
        }

        .story__dot {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          background: #121118;
          box-shadow: 0 0 0 0.35rem rgba(245, 208, 254, 0.5);
          transition: background 0.45s ease, box-shadow 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Chapters List: Generous spacing for smooth slow scroll */
        .story__list {
          position: relative;
          list-style: none;
          margin: 0;
          padding: 0 0 0 2.75rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Individual Clean Chapter: Smooth in-and-out fade and elevation */
        .ch {
          position: relative;
          padding: 8.5rem 0;
          opacity: 0.22;
          filter: blur(1.5px);
          transform: translateY(16px);
          transition: 
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }

        .ch.on {
          opacity: 1;
          filter: blur(0px);
          transform: translateY(0);
        }

        /* Date chip: OCT 2026 — NOW with smooth stagger */
        .ch__date {
          margin: 0 0 0.4rem 0;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #63606E;
          opacity: 0.3;
          transform: translateY(10px);
          transition: 
            opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.04s,
            transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.04s;
        }

        .ch.on .ch__date {
          opacity: 1;
          color: #4A1D96;
          transform: translateY(0);
        }

        /* Title: Full Stack Developer with smooth slide */
        .ch__t {
          margin: 0 0 0.3rem 0;
          font-size: 1.625rem;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #121118;
          opacity: 0.3;
          transform: translateY(14px);
          transition: 
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
        }

        .ch.on .ch__t {
          opacity: 1;
          transform: translateY(0);
        }

        /* Subtitle: Imperial Info System with smooth slide */
        .ch__org {
          margin: 0 0 1.15rem 0;
          font-size: 0.92rem;
          line-height: 1.4;
          color: #63606E;
          opacity: 0.3;
          transform: translateY(12px);
          transition: 
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s;
        }

        .ch.on .ch__org {
          opacity: 1;
          transform: translateY(0);
        }

        /* Minimal Hyphen Bullets with waterfall stagger */
        .ch__b {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .ch__b li {
          position: relative;
          padding-left: 1.15rem;
          font-size: 0.86rem;
          line-height: 1.6;
          color: #26242E;
          opacity: 0.25;
          transform: translateY(12px);
          transition: 
            opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ch__b li::before {
          content: "–";
          position: absolute;
          left: 0;
          color: #8E8B99;
          font-weight: 400;
        }

        .ch.on .ch__b li:nth-child(1) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.16s;
        }

        .ch.on .ch__b li:nth-child(2) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.22s;
        }

        .ch.on .ch__b li:nth-child(3) {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.28s;
        }

        /* =========================================================
           RESPONSIVE REFINEMENTS
           ========================================================= */
        @media (max-width: 860px) {
          .story__stage {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 1.25rem;
          }

          .story__clock {
            position: relative;
            height: auto;
            max-height: none;
            padding: 3.5rem 0 1.5rem 0;
          }

          .story__bg-canvas {
            display: none;
          }

          .story__line {
            padding-top: 1rem;
            padding-bottom: 4rem;
          }

          .story__rail, .story__tail {
            left: 0.45rem;
          }

          .story__sticky-dot-wrapper {
            left: 0.45rem;
          }

          .story__list {
            padding-left: 2rem;
          }

          .ch {
            padding: 2.8rem 0;
          }
        }
      `}</style>

      <div className="story__stage">
        
        {/* =========================================================
            LEFT COLUMN: PINNED TIME CLOCK & ROTATING DIALS
            ========================================================= */}
        <div className="story__clock" aria-label="Timeline Chrono Clock">
          {/* Rotating Canvas Dial Tunnel */}
          <canvas ref={canvasRef} className="story__bg-canvas" aria-hidden="true" />

          {/* Eyebrow: • My story */}
          <p className="eyebrow">
            <span className="eyebrow__dot">•</span> My story
          </p>

          {/* Headline: Let's go back in time. */}
          <h2 className="story__h">
            Let's go back in time.
          </h2>

          {/* Mechanical Rolling Year Digits (Odometer) */}
          <div className="story__yr" aria-label={`Active Year: ${activeChapter.year}`}>
            {yearDigits.map((digit, i) => (
              <span key={i} className="dg">
                <span 
                  className="dg__c" 
                  style={{ '--d': digit } as React.CSSProperties}
                >
                  <i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i>
                </span>
              </span>
            ))}
          </div>

          {/* Active Period Sub-label */}
          <p className="story__when">
            {activeChapter.when}
          </p>

          {/* Chrono Progress Meter */}
          <div className="story__meter" aria-hidden="true">
            <svg 
              className="story__rw" 
              style={{ transform: `rotate(${scrollProgress * -720}deg)` }}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7"/>
              <path d="M3 4v5h5"/>
              <path d="M12 7v5l3 2"/>
            </svg>
            <span className="story__count">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="story__of">
              / 04
            </span>
            <i className="story__bar">
              <b style={{ transform: `scaleX(${scrollProgress})` }} />
            </i>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: MINIMAL EDITORIAL TIMELINE
            Clean, elegant, compact, with hyphen bullets
            ========================================================= */}
        <div ref={lineRef} className="story__line">
          {/* Timeline Rail & Active Traveling Tail */}
          <span ref={railRef} className="story__rail" aria-hidden="true" />
          <span ref={tailRef} className="story__tail" aria-hidden="true" />

          {/* Sticky Traveling Focus Dot */}
          <div className="story__sticky-dot-wrapper" aria-hidden="true">
            <span className="story__dot" />
          </div>

          {/* Clean Chapters List */}
          <ol ref={listRef} className="story__list">
            {STORY_CHAPTERS.map((chap, idx) => {
              const isActive = idx === activeIndex;

              return (
                <li 
                  key={chap.id}
                  className={`ch ${isActive ? 'on' : ''}`}
                  data-index={idx}
                  data-y={chap.year}
                  data-when={chap.when}
                >
                  {/* Date chip */}
                  <p className="ch__date">
                    {chap.when}
                  </p>

                  {/* Title / Role */}
                  <h3 className="ch__t">
                    {chap.role}
                  </h3>

                  {/* Organization */}
                  <p className="ch__org">
                    {chap.company}
                  </p>

                  {/* Bullets with hyphen marker */}
                  <ul className="ch__b">
                    {chap.responsibilities.map((resp, bIdx) => (
                      <li key={bIdx}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
};

export default Experience;
