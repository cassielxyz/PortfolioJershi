import React, { useState, useRef } from 'react';
import { 
  Layers, 
  MapPin, 
  ArrowUpRight, 
  CheckCircle2,
  Code2,
  Terminal as TerminalIcon
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, type Variants } from 'framer-motion';
import { stats } from '../data/portfolioData';

type TabKey = 'backend' | 'frontend' | 'ai';

interface TabContent {
  id: TabKey;
  label: string;
  badge: string;
  title: string;
  summary: string;
  highlightMetric: string;
  highlightLabel: string;
  architecturePoints: string[];
  techPills: string[];
}

const TAB_DATA: Record<TabKey, TabContent> = {
  backend: {
    id: 'backend',
    label: '01. Enterprise Backend',
    badge: 'Core Specialization',
    title: 'Spring Boot & Relational Data Engineering',
    summary: 'Architecting layered Java microservices, RESTful API endpoints, and ACID-compliant PostgreSQL schemas engineered for reliability and high throughput.',
    highlightMetric: '15% Latency Gain',
    highlightLabel: 'Optimized API payload flow',
    architecturePoints: [
      'Layered MVC pattern with strict Service/Repository decoupling and DTO validations',
      'JPA / Hibernate ORM with optimized relationship fetching and connection pooling',
      'Supabase-hosted PostgreSQL cloud databases with automated indexing',
      'Robust error-handling middleware with structured HTTP error contracts'
    ],
    techPills: ['Core Java', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'JPA / Hibernate', 'Supabase', 'OOPs Architecture']
  },
  frontend: {
    id: 'frontend',
    label: '02. Modern Interface',
    badge: 'Visual Engineering',
    title: 'React.js & Fluid Reactive User Experiences',
    summary: 'Crafting responsive, type-safe web interfaces with Apple Liquid Glass material design, 60–120 FPS hardware-accelerated Canvas graphics, and zero layout shift.',
    highlightMetric: '120 FPS Physics',
    highlightLabel: 'GPU-accelerated Canvas rendering',
    architecturePoints: [
      'Type-safe component hierarchies in React 18 and modern TypeScript',
      'State-of-the-art Apple Liquid Glass styling with high-density blur & specular glare',
      'Direct HTML5 Canvas 2D integration with GPU destination-in alpha masking',
      'Spring physics and scroll-driven parallax with Framer Motion and useSpring'
    ],
    techPills: ['React.js', 'TypeScript', 'HTML5 Canvas 2D', 'Framer Motion', 'Apple Liquid Glass', 'Responsive UI/UX']
  },
  ai: {
    id: 'ai',
    label: '03. Applied AI & Vision',
    badge: 'Analytical Computing',
    title: 'Computer Vision & Predictive Machine Learning',
    summary: 'Developing practical computer vision pipelines and predictive ML systems using color-space thresholding, YOLO object tracking, and XGBoost models.',
    highlightMetric: '92% Accuracy',
    highlightLabel: 'Benchmarked on 500+ underwater images',
    architecturePoints: [
      'Underwater object recognition via HSV color-space segmentation and morphological filters',
      'Predictive vehicular traffic congestion forecasting using XGBoost regression models',
      'Real-time object detection and counting algorithms powered by OpenCV and YOLO',
      'Python microservices deployed with Flask for prediction telemetry streaming'
    ],
    techPills: ['Python', 'OpenCV', 'HSV Segmentation', 'XGBoost', 'YOLO', 'Flask', 'NumPy Matrix Acceleration']
  }
};

// Sequential typewriter print-in animation variants with blur-to-focus
const typewriterLineVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    filter: 'blur(4px)'
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.12,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

const statementVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 18,
    filter: 'blur(6px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.26,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('backend');
  const sectionRef = useRef<HTMLElement | null>(null);

  // Smooth scroll parallax inertia matching Hero section's spring physics
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  // Noticeable, high-taste multi-plane scroll parallax & 3D perspective matching Hero
  const headerY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [60, 0, 0, -45]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2, 0.82, 1], [0.4, 1, 1, 0.3]);

  // Differential travel between left and right bento columns (120px differential movement!)
  const terminalY = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [130, 0, 0, -110]);
  const terminalRotateX = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [4, 0, 0, -3]);
  const terminalScale = useTransform(smoothProgress, [0, 0.45, 0.75, 1], [0.94, 1, 1, 0.96]);

  const deckY = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [65, 0, 0, -55]);
  const deckRotateX = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [-3, 0, 0, 2.5]);
  const deckScale = useTransform(smoothProgress, [0, 0.45, 0.75, 1], [0.96, 1, 1, 0.97]);

  // Metric tiles staggered floating heights
  const metricsYFast = useTransform(smoothProgress, [0, 0.4, 0.75, 1], [70, 0, 0, -55]);
  const metricsYSlow = useTransform(smoothProgress, [0, 0.4, 0.75, 1], [35, 0, 0, -25]);

  // Ambient light orbs drift
  const ambientOrbY = useTransform(smoothProgress, [0, 1], [-130, 150]);
  const ambientOrb2Y = useTransform(smoothProgress, [0, 1], [110, -140]);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="about-section-container"
    >
      {/* Ambient background soft light drift */}
      <motion.div 
        className="about-ambient-orb"
        style={{ y: ambientOrbY }}
        aria-hidden="true"
      />
      <motion.div 
        className="about-ambient-orb-secondary"
        style={{ y: ambientOrb2Y }}
        aria-hidden="true"
      />

      <div className="content-wrapper about-content-stage">
        
        {/* =========================================================
            SECTION HEADER: Parallax-Controlled with Opening Reveal
            ========================================================= */}
        <motion.div
          className="about-header-lockup"
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="about-mono-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow-index">01</span>
            <span className="eyebrow-divider">/</span>
            <span className="eyebrow-title">PERSPECTIVE & ARCHITECTURE</span>
          </motion.div>

          <motion.h2 
            className="about-headline"
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineering with{' '}
            <span className="headline-ash-bold">Rigorous Logic</span>
            <span className="headline-ampersand"> &amp; </span>
            <span className="headline-editorial-italic">Disciplined Craft</span>
          </motion.h2>

          <motion.p 
            className="about-lead-paragraph"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            Honors Computer Science Engineer bridging high-throughput Java enterprise backends with 
            intuitive, high-performance web applications. Focused on resilient software design, clean code, 
            and scalable architectures.
          </motion.p>
        </motion.div>

        {/* =========================================================
            HIGH-DENSITY METRIC MATRIX: Staggered Multi-Plane Parallax
            ========================================================= */}
        <div className="about-metrics-matrix">
          {stats.slice(0, 4).map((stat, idx) => (
            <motion.div
              key={idx}
              className="metric-cockpit-tile"
              style={{ y: idx % 2 === 0 ? metricsYFast : metricsYSlow }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                scale: 1.02,
                transition: { type: 'spring', stiffness: 140, damping: 16 } 
              }}
            >
              <div className="metric-number-lockup">
                <span className="metric-value font-mono">{stat.value}</span>
                <span className="metric-suffix font-mono">{stat.suffix}</span>
              </div>
              <div className="metric-label">{stat.label}</div>
              <div className="metric-detail">{stat.detail}</div>
              <div className="metric-tile-specular-top" />
            </motion.div>
          ))}
        </div>

        {/* =========================================================
            ASYMMETRIC BENTO: Multi-Speed Parallax Depth & 3D Pitch
            ========================================================= */}
        <div className="about-bento-grid">
          
          {/* LEFT COLUMN: Apple macOS Developer Terminal Window with Liquid Glass Edge */}
          <motion.div
            className="apple-terminal-window"
            style={{ 
              y: terminalY,
              rotateX: terminalRotateX,
              scale: terminalScale,
              transformPerspective: 1200
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Liquid Glass Edge Reflection Highlights */}
            <div className="terminal-liquid-specular-top" />
            <div className="terminal-liquid-edge-glow" />

            {/* Apple macOS Window Header / Chrome Bar */}
            <div className="apple-terminal-header">
              <div className="apple-traffic-lights" aria-label="Terminal controls">
                <span className="traffic-dot dot-close" title="Close">
                  <span className="traffic-icon">✕</span>
                </span>
                <span className="traffic-dot dot-minimize" title="Minimize">
                  <span className="traffic-icon">−</span>
                </span>
                <span className="traffic-dot dot-expand" title="Zoom">
                  <span className="traffic-icon">＋</span>
                </span>
              </div>

              {/* Window Title (Renamed to 'jershika' per instruction) */}
              <div className="apple-terminal-title font-mono">
                <TerminalIcon size={12} className="terminal-title-icon" />
                <span>jershika</span>
              </div>

              <div className="apple-terminal-meta font-mono">
                <span className="meta-pulse-dot" />
                <span>active</span>
              </div>
            </div>

            {/* Apple Terminal Body: Sequential Typewriter Print-In Reveal */}
            <motion.div 
              className="apple-terminal-body"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              {/* Command 1: Focus Statement */}
              <motion.div className="terminal-prompt-row font-typewriter" custom={1} variants={typewriterLineVariants}>
                <span className="prompt-chevron">❯</span>
                <span className="prompt-cmd">cat focus.txt</span>
              </motion.div>

              <motion.h3 className="terminal-output-statement font-typewriter" variants={statementVariants}>
                Resilient backends meet thoughtful, fluid interfaces.
              </motion.h3>

              {/* Command 2: Short, Simple Bio Profile */}
              <motion.div className="terminal-prompt-row font-typewriter" style={{ marginTop: '1.4rem' }} custom={3} variants={typewriterLineVariants}>
                <span className="prompt-chevron">❯</span>
                <span className="prompt-cmd">cat profile.txt</span>
              </motion.div>

              {/* Simple, Shorter Sentences with Sequential Reveal */}
              <div className="terminal-simple-lines">
                <motion.div className="terminal-text-line font-typewriter" custom={4} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span>CS Engineering Honors graduate (8.51 CGPA).</span>
                </motion.div>

                <motion.div className="terminal-text-line font-typewriter" custom={5} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span>Core stack: Java, Spring Boot, PostgreSQL &amp; React.js.</span>
                </motion.div>

                <motion.div className="terminal-text-line font-typewriter" custom={6} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span>Architecting scalable REST APIs and responsive modern web apps.</span>
                </motion.div>

                <motion.div className="terminal-text-line font-typewriter" custom={7} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span>Focused on clean code, sub-100ms performance, and reliable systems.</span>
                </motion.div>
              </div>

              {/* Active Prompt with Blinking Cursor */}
              <motion.div className="terminal-active-prompt font-typewriter" custom={8} variants={typewriterLineVariants}>
                <span className="prompt-chevron">❯</span>
                <span className="prompt-path">~/core</span>
                <span className="terminal-blinking-cursor">▋</span>
              </motion.div>

              {/* Terminal Bottom Status Bar */}
              <motion.div className="apple-terminal-footer" custom={9} variants={typewriterLineVariants}>
                <div className="terminal-status-info font-typewriter">
                  <MapPin size={13} className="terminal-map-pin" />
                  <span>Kanyakumari / Chennai, India</span>
                </div>

                <a 
                  href="#contact" 
                  className="terminal-cta-button"
                  aria-label="Connect with Jershika"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Architecture & Tech Deck with Smooth Parallax */}
          <motion.div
            className="bento-tech-deck"
            style={{ 
              y: deckY,
              rotateX: deckRotateX,
              scale: deckScale,
              transformPerspective: 1200
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Interactive Tab Switcher */}
            <div className="tech-deck-header">
              <div className="tech-deck-tabs-nav" role="tablist">
                {(['backend', 'frontend', 'ai'] as TabKey[]).map((key) => {
                  const item = TAB_DATA[key];
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(key)}
                      className={`deck-tab-button ${isActive ? 'tab-active' : ''}`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeDeckTabIndicator"
                          className="deck-tab-active-indicator"
                          transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Tab Body with Smooth Spring Transition */}
            <div className="tech-deck-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="deck-tab-content-panel"
                >
                  <div className="deck-panel-top">
                    <div className="deck-badge-row">
                      <span className="deck-category-badge">{TAB_DATA[activeTab].badge}</span>
                      <div className="deck-metric-pill font-mono">
                        <span className="metric-pill-dot" />
                        <span className="metric-pill-val">{TAB_DATA[activeTab].highlightMetric}</span>
                        <span className="metric-pill-lbl">— {TAB_DATA[activeTab].highlightLabel}</span>
                      </div>
                    </div>

                    <h4 className="deck-panel-title">{TAB_DATA[activeTab].title}</h4>
                    <p className="deck-panel-summary">{TAB_DATA[activeTab].summary}</p>
                  </div>

                  {/* Architecture Guarantees Checklist */}
                  <div className="deck-architecture-points">
                    <div className="points-header-label font-mono">
                      <Layers size={13} />
                      <span>ENGINEERING ARCHITECTURE</span>
                    </div>
                    <div className="points-list">
                      {TAB_DATA[activeTab].architecturePoints.map((pt, i) => (
                        <div key={i} className="point-item">
                          <CheckCircle2 size={15} className="point-check-icon" />
                          <span className="point-text">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips with Spring Hover */}
                  <div className="deck-pills-container">
                    <div className="pills-header-label font-mono">
                      <Code2 size={13} />
                      <span>PRIMARY TECHNOLOGIES</span>
                    </div>
                    <div className="pills-flex-wrap">
                      {TAB_DATA[activeTab].techPills.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="tech-ash-pill"
                          whileHover={{ 
                            y: -3, 
                            scale: 1.05,
                            borderColor: 'rgba(245, 208, 254, 0.85)',
                            transition: { type: 'spring', stiffness: 140, damping: 15 } 
                          }}
                          whileTap={{ scale: 0.96 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>

      {/* =========================================================
          SCOPED STYLES: Black, White & Ash with Liquid Glass Edge
          ========================================================= */}
      <style>{`
        /* Overall Section Shell */
        .about-section-container {
          position: relative;
          padding-top: 5.5rem;
          padding-bottom: 7rem;
          background: linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          overflow: hidden;
        }

        .about-ambient-orb {
          position: absolute;
          top: 15%;
          left: -8%;
          width: clamp(280px, 32vw, 480px);
          height: clamp(280px, 32vw, 480px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 208, 254, 0.22) 0%, rgba(250, 247, 252, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          will-change: transform;
        }

        .about-ambient-orb-secondary {
          position: absolute;
          bottom: 10%;
          right: -6%;
          width: clamp(240px, 28vw, 420px);
          height: clamp(240px, 28vw, 420px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 208, 254, 0.16) 0%, rgba(250, 247, 252, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          will-change: transform;
        }

        /* ---------------------------------------------------------
           SECTION HEADER
           --------------------------------------------------------- */
        .about-content-stage {
          position: relative;
          z-index: 5;
        }

        .about-header-lockup {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 3.25rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform;
        }

        .about-mono-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(226, 224, 235, 0.9);
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02), inset 0 1px 1px #FFFFFF;
          margin-bottom: 1.25rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: #63606E;
        }

        .eyebrow-index {
          font-weight: 700;
          color: #121116;
        }

        .eyebrow-divider {
          color: #D4D1DC;
        }

        .eyebrow-title {
          font-weight: 600;
        }

        .about-headline {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: clamp(2.2rem, 4.2vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.16;
          color: #121116;
          margin-bottom: 1.15rem;
        }

        .headline-ash-bold {
          font-weight: 800;
          color: #121116;
          letter-spacing: -0.035em;
        }

        .headline-ampersand {
          color: #8E8B99;
          font-weight: 300;
          margin: 0 0.15rem;
        }

        .headline-editorial-italic {
          font-family: var(--font-editorial, 'The Silver Editorial', serif);
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #121116 0%, #63606E 52%, #F5D0FE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.01em;
          padding-right: 0.2rem;
        }

        .about-lead-paragraph {
          font-size: clamp(0.98rem, 1.25vw, 1.1rem);
          line-height: 1.75;
          color: #63606E;
          max-width: 68ch;
          text-wrap: balance;
        }

        /* ---------------------------------------------------------
           HIGH-DENSITY METRIC MATRIX (4 Cockpit Tiles)
           --------------------------------------------------------- */
        .about-metrics-matrix {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .metric-cockpit-tile {
          background: #FFFFFF;
          border: 1px solid #E5E3EB;
          border-radius: 20px;
          padding: 1.6rem 1.4rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02);
          transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .metric-cockpit-tile:hover {
          border-color: rgba(245, 208, 254, 0.9);
          box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(245, 208, 254, 0.1);
        }

        .metric-tile-specular-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 1) 30%, rgba(245, 208, 254, 0.7) 60%, transparent 100%);
        }

        .metric-number-lockup {
          display: flex;
          align-items: baseline;
          margin-bottom: 0.45rem;
        }

        .metric-value {
          font-family: var(--font-mono, monospace);
          font-size: 2.35rem;
          font-weight: 800;
          line-height: 1;
          color: #121116;
          letter-spacing: -0.04em;
        }

        .metric-suffix {
          font-family: var(--font-mono, monospace);
          font-size: 1.15rem;
          font-weight: 600;
          color: #D8B4FE;
          margin-left: 2px;
        }

        .metric-label {
          font-family: var(--font-heading, sans-serif);
          font-size: 0.92rem;
          font-weight: 700;
          color: #121116;
          margin-bottom: 0.25rem;
        }

        .metric-detail {
          font-size: 0.8rem;
          color: #8E8B99;
          line-height: 1.45;
        }

        /* ---------------------------------------------------------
           ASYMMETRIC BENTO GRID (Hardware Accelerated 3D Perspective)
           --------------------------------------------------------- */
        .about-bento-grid {
          display: grid;
          grid-template-columns: 43% 57%;
          gap: 1.75rem;
          align-items: stretch;
          perspective: 1200px;
        }

        /* ---------------------------------------------------------
           APPLE macOS DEVELOPER TERMINAL WITH LIQUID GLASS EDGE
           --------------------------------------------------------- */
        .apple-terminal-window {
          background: linear-gradient(165deg, rgba(24, 23, 31, 0.94) 0%, rgba(13, 12, 17, 0.97) 100%);
          backdrop-filter: blur(28px) saturate(190%) brightness(1.04);
          -webkit-backdrop-filter: blur(28px) saturate(190%) brightness(1.04);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 24px;
          color: #F8F8FA;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 32px 85px -15px rgba(0, 0, 0, 0.55),
            0 12px 30px rgba(0, 0, 0, 0.25),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.35),
            inset 0 0 0 1px rgba(255, 255, 255, 0.06),
            inset 0 -1.5px 2px 0 rgba(245, 208, 254, 0.12);
          display: flex;
          flex-direction: column;
          will-change: transform;
        }

        /* Liquid Glass Specular Edge Highlights */
        .terminal-liquid-specular-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.65) 25%, rgba(245, 208, 254, 0.45) 75%, transparent 100%);
          z-index: 10;
        }

        .terminal-liquid-edge-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 1.5px;
          height: 70%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(245, 208, 254, 0.2) 60%, transparent 100%);
          z-index: 10;
        }

        /* Apple Window Chrome / Title Bar */
        .apple-terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.35rem;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 2;
        }

        .meta-pulse-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5D0FE;
          box-shadow: 0 0 6px rgba(245, 208, 254, 0.9);
          margin-right: 5px;
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }

        .apple-traffic-lights {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .traffic-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
        }

        .traffic-dot:hover {
          transform: scale(1.1);
        }

        .dot-close {
          background: #FF5F56;
          border: 1px solid rgba(0, 0, 0, 0.18);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.45), 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .dot-minimize {
          background: #FFBD2E;
          border: 1px solid rgba(0, 0, 0, 0.18);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.45), 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .dot-expand {
          background: #27C93F;
          border: 1px solid rgba(0, 0, 0, 0.18);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.45), 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .traffic-icon {
          font-size: 8px;
          color: rgba(0, 0, 0, 0.65);
          font-weight: 900;
          line-height: 1;
          opacity: 0;
          transition: opacity 0.15s ease;
          user-select: none;
        }

        .apple-traffic-lights:hover .traffic-icon {
          opacity: 1;
        }

        .apple-terminal-title {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.74rem;
          color: #C7C4D0;
          letter-spacing: 0.04em;
          user-select: none;
          font-weight: 600;
        }

        .terminal-title-icon {
          color: #D4D1DC;
        }

        .apple-terminal-meta {
          font-size: 0.68rem;
          font-weight: 600;
          color: #8E8B99;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
        }

        /* Typewriter Font Utility */
        .font-typewriter {
          font-family: 'Courier Prime', 'Courier New', 'Fira Code', monospace;
        }

        /* Apple Terminal Content Body */
        .apple-terminal-body {
          padding: 1.85rem 2.1rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .terminal-prompt-row {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
          margin-bottom: 0.65rem;
          font-size: 0.84rem;
        }

        .prompt-chevron {
          color: #F5D0FE;
          font-weight: 700;
        }

        .prompt-cmd {
          color: #FFFFFF;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .terminal-output-statement {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.45;
          color: #FFFFFF;
          margin-bottom: 0.65rem;
          letter-spacing: -0.01em;
        }

        .terminal-simple-lines {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .terminal-text-line {
          display: flex;
          align-items: baseline;
          gap: 0.65rem;
          font-size: 0.875rem;
          line-height: 1.62;
          color: #C7C4D0;
        }

        .line-bullet {
          color: #8E8B99;
          font-size: 0.65rem;
          flex-shrink: 0;
        }

        .terminal-active-prompt {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
          font-size: 0.84rem;
          margin-bottom: 2rem;
        }

        .prompt-path {
          color: #8E8B99;
          font-weight: 500;
        }

        .terminal-blinking-cursor {
          color: #F5D0FE;
          font-size: 0.95rem;
          line-height: 1;
          animation: terminalBlink 1.1s step-start infinite;
        }

        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .apple-terminal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: auto;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .terminal-status-info {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: #8E8B99;
        }

        .terminal-map-pin {
          color: #C7C4D0;
        }

        .terminal-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.15rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          backdrop-filter: blur(10px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .terminal-cta-button:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(245, 208, 254, 0.6);
          transform: translateY(-2px);
          color: #FFFFFF;
        }

        /* ---------------------------------------------------------
           THE TECH & ARCHITECTURE DECK (Right Column)
           --------------------------------------------------------- */
        .bento-tech-deck {
          background: #FFFFFF;
          border: 1px solid #E5E3EB;
          border-radius: 24px;
          box-shadow: 
            0 28px 70px -15px rgba(0, 0, 0, 0.06),
            0 4px 14px rgba(0, 0, 0, 0.02),
            inset 0 1.5px 2px rgba(255, 255, 255, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          will-change: transform;
        }

        .tech-deck-header {
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid #EFECE8;
          background: rgba(250, 247, 252, 0.6);
        }

        .tech-deck-tabs-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tech-deck-tabs-nav::-webkit-scrollbar {
          display: none;
        }

        .deck-tab-button {
          position: relative;
          padding: 0.6rem 1.15rem;
          border-radius: 9999px;
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 600;
          color: #8E8B99;
          background: transparent;
          cursor: pointer;
          border: none;
          outline: none;
          transition: color 0.2s ease;
          white-space: nowrap;
          z-index: 1;
        }

        .deck-tab-button:hover {
          color: #121116;
        }

        .deck-tab-button.tab-active {
          color: #121116;
        }

        .deck-tab-active-indicator {
          position: absolute;
          inset: 0;
          background: #FFFFFF;
          border: 1px solid #E2E0E8;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 1px #FFFFFF;
          z-index: -1;
        }

        .tech-deck-body {
          padding: 2.2rem 2.4rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .deck-tab-content-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .deck-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .deck-category-badge {
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #121116;
          background: #F5F3F8;
          border: 1px solid rgba(245, 208, 254, 0.6);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
        }

        .deck-metric-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: #63606E;
        }

        .metric-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5D0FE;
          border: 1px solid rgba(216, 180, 254, 0.8);
        }

        .metric-pill-val {
          font-weight: 700;
          color: #121116;
        }

        .deck-panel-title {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: #121116;
          margin-bottom: 0.55rem;
          letter-spacing: -0.02em;
        }

        .deck-panel-summary {
          font-size: 0.92rem;
          line-height: 1.68;
          color: #63606E;
          margin-bottom: 1.5rem;
        }

        .deck-architecture-points {
          margin-bottom: 1.6rem;
        }

        .points-header-label, .pills-header-label {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #8E8B99;
          margin-bottom: 0.75rem;
        }

        .points-list {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .point-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        .point-check-icon {
          color: #121116;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .point-text {
          font-size: 0.88rem;
          line-height: 1.55;
          color: #1D1527;
        }

        .deck-pills-container {
          margin-top: auto;
          padding-top: 1.25rem;
        }

        .pills-flex-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-ash-pill {
          display: inline-block;
          font-family: var(--font-mono, monospace);
          font-size: 0.76rem;
          font-weight: 500;
          color: #121116;
          background: #FAF7FC;
          border: 1px solid #E5E3EB;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          cursor: default;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ---------------------------------------------------------
           RESPONSIVE REFINEMENTS
           --------------------------------------------------------- */
        @media (max-width: 1080px) {
          .about-metrics-matrix {
            grid-template-columns: repeat(2, 1fr);
          }
          .about-bento-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .about-section-container {
            padding-top: 4rem;
            padding-bottom: 5rem;
          }
          .about-metrics-matrix {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
          .apple-terminal-header {
            padding: 0.75rem 1rem;
          }
          .apple-terminal-body {
            padding: 1.4rem 1.25rem;
          }
          .tech-deck-body {
            padding: 1.5rem 1.25rem;
          }
          .deck-tab-button {
            padding: 0.5rem 0.85rem;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
