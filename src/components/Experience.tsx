import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { TechLogo } from './TechLogos';

interface StoryChapter {
  id: string;
  year: string;
  when: string;
  role: string;
  company: string;
  location: string;
  type: string;
  highlightBadge: string;
  isCurrent?: boolean;
  accentColor?: string;
  responsibilities: string[];
  keyDeliverable: string;
  outcomeMetric: string;
  techStack: string[];
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "exp-imperial",
    year: "2026",
    when: "Aug 2026 — Present",
    role: "Full Stack Developer",
    company: "Imperial Info System",
    location: "Chennai, Tamil Nadu",
    type: "Enterprise Role",
    highlightBadge: "Current Role",
    isCurrent: true,
    accentColor: "#10B981", // active emerald
    responsibilities: [
      "Engineered high-performance enterprise interface modules in React.js with modular component design and zero-regression state management.",
      "Integrated microservice REST APIs with robust error boundaries, request throttling, and optimistic client-side cache layers.",
      "Spearheaded UI design-to-code implementations with fluid spring physics, accessible keyboard navigation, and pixel-perfect design fidelity."
    ],
    outcomeMetric: "Lighthouse 98+ Score & Accelerated Release Cycles",
    keyDeliverable: "Enterprise Client Portal Suite & Scalable UI Foundation",
    techStack: ["React.js", "TypeScript", "REST APIs", "Modern Frontend UI", "Full Stack Workflow"]
  },
  {
    id: "exp-agile",
    year: "2025",
    when: "June 2025 — July 2025",
    role: "Python Full Stack Intern",
    company: "Agile Infotech",
    location: "Kerala, India",
    type: "Internship",
    highlightBadge: "3 Full Stack Apps",
    isCurrent: false,
    accentColor: "#F5D0FE", // whisper lavender
    responsibilities: [
      "Built three production-ready Python web applications integrating asynchronous request flows and MongoDB document persistence.",
      "Created resilient backend validation pipelines ensuring data integrity across high-frequency transactional payloads.",
      "Participated in agile sprints, code reviews, and schema indexing optimizations for fast sub-50ms query turnaround."
    ],
    outcomeMetric: "Sub-50ms MongoDB Query Turnaround",
    keyDeliverable: "3 Production-Grade Python & MongoDB Web Applications",
    techStack: ["Python", "MongoDB", "Backend Architecture", "Full Stack Integration", "REST APIs"]
  },
  {
    id: "exp-ak",
    year: "2025",
    when: "Feb 2025 — Feb 20, 2025",
    role: "Full Stack Web Development Intern",
    company: "Ak Info Park",
    location: "Kanyakumari, Tamil Nadu",
    type: "Internship",
    highlightBadge: "15% Latency Boost",
    isCurrent: false,
    accentColor: "#C084FC", // soft violet
    responsibilities: [
      "Engineered five responsive web interfaces using semantic HTML5, modern CSS3 animations, and reactive vanilla JavaScript.",
      "Diagnosed and eliminated redundant network calls, reducing client-server data exchange latency by 15%.",
      "Standardized mobile-first breakpoint logic ensuring flawless cross-device layout consistency."
    ],
    outcomeMetric: "15% Latency Reduction Across Endpoints",
    keyDeliverable: "5 High-Speed Responsive Web Properties & 15% Latency Optimization",
    techStack: ["HTML5", "CSS3", "JavaScript", "REST APIs", "Performance Tuning"]
  },
  {
    id: "exp-srishti",
    year: "2024",
    when: "Feb 2024 — Mar 2024",
    role: "Python & Data Analysis Intern",
    company: "Srishti Innovative Computer Systems",
    location: "Kerala, India",
    type: "Internship",
    highlightBadge: "Visual Analytics",
    isCurrent: false,
    accentColor: "#8E8B99", // refined ash
    responsibilities: [
      "Ingested, sanitized, and transformed three multi-variate datasets using Python and scientific computing libraries.",
      "Generated analytical reporting dashboards and visual trend plots translating complex raw metrics into strategic takeaways.",
      "Documented statistical modeling methodologies and reproducible data processing pipelines."
    ],
    outcomeMetric: "Zero Data Loss Across 3 Multi-Variate Datasets",
    keyDeliverable: "Automated Data Analytics Pipeline & Visual Reports",
    techStack: ["Python", "Data Analysis", "Data Cleaning", "Data Visualization", "Pandas", "Matplotlib"]
  }
];

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const tailRef = useRef<HTMLSpanElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const activeChapter = STORY_CHAPTERS[activeIndex] || STORY_CHAPTERS[0];
  const yearDigits = activeChapter.year.split(""); // e.g. ["2", "0", "2", "6"]

  // -------------------------------------------------------------
  // CANVAS: 3D Rotating Chrono Tunnel (Reverse-engineered from Rishi Thakor)
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

    const RINGS = 14;
    const GAP = 320;
    const FOCAL = 500;
    const R = 580;
    const TICKS = 48;
    const dust = Array.from({ length: 65 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 100 + Math.random() * 700,
      z: Math.random() * RINGS * GAP,
      s: 0.5 + Math.random() * 1.5
    }));

    let startTime = performance.now();

    const render = () => {
      const now = (performance.now() - startTime) * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const k = Math.min(width, height) / 850;
      const p = scrollProgress;

      const camZ = p * (STORY_CHAPTERS.length - 1) * GAP * 1.5 + now * 14;
      const spin = -p * Math.PI * 1.4 - now * 0.018;
      const len = RINGS * GAP;

      ctx.lineCap = 'round';

      // Dial rings
      for (let i = 0; i < RINGS; i++) {
        const z = ((i * GAP - camZ) % len + len) % len + 50;
        const s = (FOCAL / z) * k;
        const fog = Math.min(1, Math.max(0, (z - 240) / 1000)) * Math.max(0, 1 - z / len);
        if (fog <= 0.01) continue;

        const rr = R * s;
        const rot = spin + i * 0.22;

        // Outer Ring
        ctx.strokeStyle = `rgba(38, 36, 46, ${(fog * 0.09).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.6, 1.1 * s);
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();

        // Clock Ticks
        const T = width < 768 ? 24 : TICKS;
        const every = T / 12;
        for (const hour of [false, true]) {
          const l = (hour ? 38 : 16) * s;
          ctx.beginPath();
          for (let j = 0; j < T; j++) {
            if ((j % every === 0) !== hour) continue;
            const a = rot + (j / T) * Math.PI * 2;
            const c = Math.cos(a);
            const d = Math.sin(a);
            ctx.moveTo(cx + c * (rr - l), cy + d * (rr - l));
            ctx.lineTo(cx + c * rr, cy + d * rr);
          }
          ctx.strokeStyle = hour 
            ? `rgba(245, 208, 254, ${(fog * 0.28).toFixed(3)})` 
            : `rgba(38, 36, 46, ${(fog * 0.11).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.5, (hour ? 2.4 : 1.2) * s);
          ctx.stroke();
        }

        // Clock Hand
        const ha = rot * 2.8 + i;
        ctx.strokeStyle = `rgba(38, 36, 46, ${(fog * 0.12).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, 1.8 * s);
        if (rr < Math.min(width, height) * 0.45) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(ha) * rr * 0.5, cy + Math.sin(ha) * rr * 0.5);
          ctx.stroke();
        }
      }

      // Drifting Stardust
      for (const q of dust) {
        const z = ((q.z - camZ * 1.1) % len + len) % len + 35;
        const s = (FOCAL / z) * k;
        const fog = Math.min(1, Math.max(0, (z - 280) / 850)) * Math.max(0, 1 - z / len);
        const a = q.a + spin * 0.25;
        ctx.fillStyle = `rgba(245, 208, 254, ${(fog * 0.32).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(a) * q.r * s,
          cy + Math.sin(a) * q.r * s,
          Math.max(0.4, q.s * s * 2),
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
  // NATURAL SCROLL LISTENER & TRACK POSITIONING (No Event Hijacking)
  // -------------------------------------------------------------
  const updateScroll = useCallback(() => {
    const line = lineRef.current;
    const list = listRef.current;
    const rail = railRef.current;
    const tail = tailRef.current;
    if (!line || !list) return;

    const chapters = list.querySelectorAll<HTMLElement>('.story__chapter-item');
    if (!chapters.length) return;

    const N = chapters.length;
    const lr = line.getBoundingClientRect();
    const mid = window.innerHeight * 0.5;

    // First and last chapter marker coordinates relative to line
    const firstChapter = chapters[0];
    const lastChapter = chapters[N - 1];
    const firstY = firstChapter.offsetTop + 32;
    const endY = lastChapter.offsetTop + lastChapter.offsetHeight - 40;
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

    // Determine active chapter based on midpoint
    let activeIdx = 0;
    chapters.forEach((c, i) => {
      const cRect = c.getBoundingClientRect();
      if (cRect.top < mid + 80) {
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
    
    // Initial measurement
    const timer = setTimeout(updateScroll, 100);

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
      className="story-narrative-section"
      style={{
        // Seamless transition from Skills
        marginTop: 0,
        paddingTop: 0
      }}
    >
      <style>{`
        /* =========================================================
           ZERO GAP SKILLS-TO-EXPERIENCE SEAMLESS FIX
           ========================================================= */
        #skills.skills-pinned-runway {
          margin-bottom: 0 !important;
        }

        /* =========================================================
           STORY CONTAINER & AMBIENCE (CORTEX-TASTE THEME)
           ========================================================= */
        .story-narrative-section {
          position: relative;
          z-index: 2;
          width: 100%;
          background: #FAF7FC;
          background-image: 
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.018) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          box-sizing: border-box;
          color: #121118;
          overflow: visible;
        }

        /* Ambient shifting illumination */
        .story-ambience {
          position: sticky;
          top: 0;
          height: 100vh;
          margin-bottom: -100vh;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .story-ambience-glow {
          position: absolute;
          inset: -10%;
          background: radial-gradient(48% 52% at 20% 35%, rgba(245, 208, 254, 0.16), transparent 70%),
                      radial-gradient(42% 46% at 80% 65%, rgba(192, 132, 252, 0.09), transparent 70%);
          transition: opacity 0.8s ease;
          pointer-events: none;
        }

        /* Stage layout: Split 2 columns */
        .story__stage {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(380px, 1.2fr);
          gap: 3.5rem;
          align-items: start;
        }

        /* =========================================================
           LEFT COLUMN: STICKY TIME CLOCK & ODOMETER
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
          padding: 3rem 1rem 3rem 0;
          box-sizing: border-box;
          z-index: 2;
        }

        /* 3D Canvas Tunnel Behind Clock */
        .story__bg-canvas {
          position: absolute;
          left: -35%;
          right: -35%;
          top: 0;
          width: 170%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          -webkit-mask: radial-gradient(closest-side, #000 50%, transparent 95%);
          mask: radial-gradient(closest-side, #000 50%, transparent 95%);
          opacity: 0.85;
        }

        /* Eyebrow badge */
        .story__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #63606E;
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          margin-bottom: 0.75rem;
        }

        .story__live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulseGreen 2s infinite ease-in-out;
        }

        @keyframes pulseGreen {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        /* Main Editorial Headline */
        .story__headline {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: clamp(2rem, 3.8vw, 3.25rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #121118;
          margin: 0 0 1rem 0;
        }

        .story__subheadline {
          font-size: 0.9375rem;
          line-height: 1.5;
          color: #63606E;
          max-width: 420px;
          margin: 0 0 1.75rem 0;
        }

        /* Mechanical Rolling Year Digits (Odometer) */
        .story__yr {
          display: flex;
          align-items: center;
          font-size: clamp(5.5rem, 9.5vw, 9.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.06em;
          font-variant-numeric: tabular-nums;
          color: #121118;
          margin: 0.5rem 0 0.25rem -0.04em;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .story__digit {
          display: block;
          height: 1em;
          overflow: hidden;
          padding-right: 0.02em;
        }

        .story__digit-col {
          display: flex;
          flex-direction: column;
          transform: translateY(calc(var(--d, 0) * -1em));
          transition: transform 0.85s cubic-bezier(0.65, 0, 0.2, 1);
        }

        .story__digit:nth-child(1) .story__digit-col { transition-delay: 0s; }
        .story__digit:nth-child(2) .story__digit-col { transition-delay: 0.04s; }
        .story__digit:nth-child(3) .story__digit-col { transition-delay: 0.08s; }
        .story__digit:nth-child(4) .story__digit-col { transition-delay: 0.12s; }

        .story__digit-col i {
          display: block;
          height: 1em;
          font-style: normal;
          text-align: center;
        }

        /* Active Tenure Period Tag */
        .story__when-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.45rem 1rem;
          background: rgba(245, 208, 254, 0.22);
          border: 1px solid rgba(245, 208, 254, 0.6);
          border-radius: 8px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #26242E;
        }

        /* Chrono Progress Meter */
        .story__meter {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: #121118;
          font-variant-numeric: tabular-nums;
          width: 100%;
          max-width: 360px;
        }

        .story__rw-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #63606E;
          transform: rotate(calc(var(--p, 0) * -720deg));
          transition: transform 0.1s linear;
        }

        .story__meter-count {
          font-weight: 800;
          color: #121118;
        }

        .story__meter-total {
          color: #8E8B99;
          font-weight: 500;
        }

        .story__meter-track {
          position: relative;
          flex: 1;
          height: 3px;
          border-radius: 9999px;
          background: rgba(38, 36, 46, 0.12);
          overflow: hidden;
          margin-left: 0.5rem;
        }

        .story__meter-fill {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #121118;
          transform-origin: 0 50%;
          transform: scaleX(var(--p, 0));
          transition: transform 0.05s linear;
        }

        /* =========================================================
           RIGHT COLUMN: NATURAL SCROLLING STORYLINE
           ========================================================= */
        .story__line {
          position: relative;
          padding-top: 18vh;
          padding-bottom: 25vh;
        }

        /* Timeline Guide Rail */
        .story__rail {
          position: absolute;
          left: 1.25rem;
          width: 2px;
          background: rgba(38, 36, 46, 0.12);
          border-radius: 2px;
          pointer-events: none;
          z-index: 1;
        }

        /* Active Filled Trail */
        .story__tail {
          position: absolute;
          left: 1.25rem;
          width: 2px;
          background: linear-gradient(180deg, #10B981 0%, #121118 60%, #F5D0FE 100%);
          border-radius: 2px;
          pointer-events: none;
          z-index: 2;
        }

        /* Sticky Travelling Dot */
        .story__sticky-dot-wrapper {
          position: sticky;
          top: calc(50vh - 0.75rem);
          left: 1.25rem;
          margin-left: -0.65rem;
          width: 1.5rem;
          height: 1.5rem;
          pointer-events: none;
          z-index: 10;
        }

        .story__travel-dot {
          width: 1.35rem;
          height: 1.35rem;
          border-radius: 50%;
          background: #121118;
          border: 2px solid #FFFFFF;
          box-shadow: 0 0 0 4px rgba(245, 208, 254, 0.5), 0 4px 14px rgba(0, 0, 0, 0.2);
          transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }

        .story-narrative-section[data-current="true"] .story__travel-dot {
          background: #10B981;
          box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.25), 0 4px 14px rgba(16, 185, 129, 0.4);
        }

        /* Chapter List */
        .story__list {
          list-style: none;
          margin: 0;
          padding: 0 0 0 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 4.5rem;
        }

        /* Individual Chapter Item */
        .story__chapter-item {
          position: relative;
          opacity: 0.38;
          transform: translateY(8px);
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .story__chapter-item.is-active {
          opacity: 1;
          transform: translateY(0);
        }

        /* =========================================================
           LIQUID GLASS CHAPTER CARD
           ========================================================= */
        .story__card {
          position: relative;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border: 1px solid rgba(38, 36, 46, 0.12);
          border-radius: 24px;
          padding: 2.25rem 2.25rem 2rem;
          box-shadow: 
            0 16px 36px -12px rgba(20, 19, 26, 0.06),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease;
        }

        .story__chapter-item.is-active .story__card {
          border-color: rgba(245, 208, 254, 0.9);
          box-shadow: 
            0 24px 50px -16px rgba(20, 19, 26, 0.12),
            0 0 32px rgba(245, 208, 254, 0.25),
            inset 0 1.5px 2px #FFFFFF;
        }

        .story__card:hover {
          transform: translateY(-2px);
          border-color: rgba(38, 36, 46, 0.25);
        }

        /* Card Top Metadata Row */
        .story__card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .story__card-period-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          background: rgba(38, 36, 46, 0.05);
          border: 1px solid rgba(38, 36, 46, 0.08);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #63606E;
        }

        .story__card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .badge--current {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #065F46;
        }

        .badge--standard {
          background: rgba(245, 208, 254, 0.28);
          border: 1px solid rgba(245, 208, 254, 0.75);
          color: #4A1D96;
        }

        /* Role & Company */
        .story__card-role {
          font-size: 1.625rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.025em;
          color: #121118;
          margin: 0 0 0.5rem 0;
        }

        .story__card-company {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #63606E;
          margin: 0 0 1.5rem 0;
        }

        .story__card-location {
          font-size: 0.875rem;
          font-weight: 500;
          color: #8E8B99;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Responsibility Bullet List */
        .story__bullets {
          list-style: none;
          margin: 0 0 1.5rem 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .story__bullet-item {
          position: relative;
          padding-left: 1.5rem;
          font-size: 0.9375rem;
          line-height: 1.62;
          color: #26242E;
        }

        .story__bullet-item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.55rem;
          width: 6px;
          height: 6px;
          border-radius: 1px;
          background: #63606E;
          transform: rotate(45deg);
          transition: background 0.3s ease;
        }

        .story__chapter-item.is-active .story__bullet-item::before {
          background: #121118;
        }

        /* Deliverable Highlight Callout */
        .story__deliverable-callout {
          margin-top: 1.25rem;
          padding: 1rem 1.25rem;
          background: rgba(38, 36, 46, 0.035);
          border: 1px solid rgba(38, 36, 46, 0.08);
          border-radius: 14px;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .story__deliverable-icon {
          flex-shrink: 0;
          width: 1.15rem;
          height: 1.15rem;
          color: #121118;
          margin-top: 0.15rem;
        }

        .story__deliverable-title {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #121118;
          margin: 0 0 0.25rem 0;
        }

        .story__deliverable-desc {
          font-size: 0.875rem;
          line-height: 1.45;
          color: #63606E;
          margin: 0;
        }

        /* Tech Stack Tags */
        .story__tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(38, 36, 46, 0.08);
        }

        .story__tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.7rem;
          background: #FFFFFF;
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #26242E;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .story__tag-pill:hover {
          transform: translateY(-1px);
          border-color: rgba(38, 36, 46, 0.3);
        }

        /* =========================================================
           RESPONSIVE DESIGN (PHONES & TABLETS)
           ========================================================= */
        @media (max-width: 960px) {
          .story__stage {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1.25rem;
          }

          .story__clock {
            position: relative;
            height: auto;
            max-height: none;
            padding: 4rem 0 2rem 0;
          }

          .story__bg-canvas {
            display: none;
          }

          .story__line {
            padding-top: 2rem;
            padding-bottom: 6rem;
          }

          .story__rail, .story__tail {
            left: 0.75rem;
          }

          .story__sticky-dot-wrapper {
            left: 0.75rem;
          }

          .story__list {
            padding-left: 2.5rem;
            gap: 3.5rem;
          }

          .story__card {
            padding: 1.75rem 1.5rem;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Drift */}
      <div className="story-ambience" aria-hidden="true">
        <div className="story-ambience-glow" />
      </div>

      <div className="story__stage">
        
        {/* =========================================================
            LEFT COLUMN: PINNED TIME-TRAVEL CLOCK & ODOMETER
            ========================================================= */}
        <aside className="story__clock" aria-label="Timeline Chrono Clock">
          {/* Canvas-driven 3D concentric rotating time dials */}
          <canvas ref={canvasRef} className="story__bg-canvas" aria-hidden="true" />

          {/* Eyebrow Status */}
          <div className="story__eyebrow">
            <span className="story__live-dot" />
            <span>Career Chronicle // My Story</span>
          </div>

          {/* Editorial Headline */}
          <h2 className="story__headline">
            Tracing the trajectory.
          </h2>

          <p className="story__subheadline">
            A chronological timeline of production engineering, Python architectures, 
            and verifiable full-stack milestones.
          </p>

          {/* Rolling Mechanical Digits (Odometer) */}
          <div className="story__yr" aria-label={`Current active year: ${activeChapter.year}`}>
            {yearDigits.map((digit, i) => (
              <span key={i} className="story__digit">
                <span 
                  className="story__digit-col" 
                  style={{ '--d': digit } as React.CSSProperties}
                >
                  <i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i>
                </span>
              </span>
            ))}
          </div>

          {/* Active Period Label */}
          <div className="story__when-badge">
            <Calendar className="w-3.5 h-3.5 text-zinc-600" />
            <span>{activeChapter.when}</span>
          </div>

          {/* Chrono Progress Meter & Rewind Wheel */}
          <div 
            className="story__meter" 
            style={{ '--p': scrollProgress } as React.CSSProperties}
            aria-hidden="true"
          >
            <svg 
              className="story__rw-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7"/>
              <path d="M3 4v5h5"/>
              <path d="M12 7v5l3 2"/>
            </svg>
            <span className="story__meter-count">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="story__meter-total">
              / 04
            </span>
            <div className="story__meter-track">
              <div className="story__meter-fill" />
            </div>
          </div>
        </aside>

        {/* =========================================================
            RIGHT COLUMN: NATURAL SCROLLING STORYLINE
            ========================================================= */}
        <div ref={lineRef} className="story__line">
          {/* Vertical Rail & Traveling Tail */}
          <span ref={railRef} className="story__rail" aria-hidden="true" />
          <span ref={tailRef} className="story__tail" aria-hidden="true" />

          {/* Sticky Traveling Focus Dot */}
          <div ref={dotRef} className="story__sticky-dot-wrapper" aria-hidden="true">
            <div className="story__travel-dot" />
          </div>

          {/* Chapters List */}
          <ol ref={listRef} className="story__list">
            {STORY_CHAPTERS.map((chap, idx) => {
              const isActive = idx === activeIndex;

              return (
                <li 
                  key={chap.id}
                  className={`story__chapter-item ${isActive ? 'is-active' : ''}`}
                  data-index={idx}
                  data-year={chap.year}
                  data-when={chap.when}
                >
                  <article className="story__card">
                    {/* Header: Period & Highlight Badge */}
                    <div className="story__card-header">
                      <span className="story__card-period-chip">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{chap.when}</span>
                      </span>

                      <span className={`story__card-badge ${chap.isCurrent ? 'badge--current' : 'badge--standard'}`}>
                        {chap.isCurrent && <span className="story__live-dot" />}
                        <span>{chap.highlightBadge}</span>
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="story__card-role">
                      {chap.role}
                    </h3>

                    {/* Company & Location */}
                    <div className="story__card-company">
                      <span>{chap.company}</span>
                      <span>·</span>
                      <span className="story__card-location">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        {chap.location}
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="story__bullets">
                      {chap.responsibilities.map((resp, bIdx) => (
                        <li key={bIdx} className="story__bullet-item">
                          {resp}
                        </li>
                      ))}
                    </ul>

                    {/* Deliverable Callout */}
                    <div className="story__deliverable-callout">
                      <Sparkles className="story__deliverable-icon" />
                      <div>
                        <div className="story__deliverable-title">
                          Key Deliverable & Impact
                        </div>
                        <p className="story__deliverable-desc">
                          {chap.keyDeliverable} — <strong>{chap.outcomeMetric}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="story__tags-container">
                      {chap.techStack.map((tech) => (
                        <span key={tech} className="story__tag-pill">
                          <TechLogo name={tech} size={13} className="text-zinc-600" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </article>
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
