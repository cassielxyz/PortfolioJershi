import React, { useRef } from 'react';
import { 
  MapPin, 
  ArrowUpRight, 
  Terminal as TerminalIcon
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { stats } from '../data/portfolioData';

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
      delay: i * 0.1,
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
      delay: 0.22,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const About: React.FC = () => {
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

  // Multi-plane scroll parallax & 3D perspective
  const headerY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [50, 0, 0, -40]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2, 0.82, 1], [0.4, 1, 1, 0.3]);

  // Terminal Parallax Motion
  const terminalY = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [90, 0, 0, -80]);
  const terminalRotateX = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [3, 0, 0, -2]);
  const terminalScale = useTransform(smoothProgress, [0, 0.45, 0.75, 1], [0.96, 1, 1, 0.98]);

  // Metric tiles staggered floating heights
  const metricsYFast = useTransform(smoothProgress, [0, 0.4, 0.75, 1], [60, 0, 0, -45]);
  const metricsYSlow = useTransform(smoothProgress, [0, 0.4, 0.75, 1], [30, 0, 0, -20]);

  // Ambient light orbs drift
  const ambientOrbY = useTransform(smoothProgress, [0, 1], [-130, 150]);
  const ambientOrb2Y = useTransform(smoothProgress, [0, 1], [110, -140]);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="about-editorial-section"
    >
      {/* Dynamic Ambient Depth Glows */}
      <motion.div 
        className="about-ambient-glow glow-lavender" 
        style={{ y: ambientOrbY }}
        aria-hidden="true" 
      />
      <motion.div 
        className="about-ambient-glow glow-ash" 
        style={{ y: ambientOrb2Y }}
        aria-hidden="true" 
      />

      <div className="about-container">
        
        {/* =========================================================
            EDITORIAL HEADER: High-Taste Typographic Lockup
            ========================================================= */}
        <motion.div 
          className="about-header-lockup"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div 
            className="about-mono-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
            React Architecture with{' '}
            <span className="headline-ash-bold">Rigorous Logic</span>
            <span className="headline-ampersand"> &amp; </span>
            <span className="headline-editorial-italic">Fluid Interfaces</span>
          </motion.h2>

          <motion.p 
            className="about-lead-paragraph"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            Motivated React Developer &amp; Computer Science Honors graduate engineering 
            responsive, interactive web applications and scalable full-stack architectures. Focused on 
            reusable component hierarchies, modern design systems, clean code, and sub-50ms performance.
          </motion.p>
        </motion.div>

        {/* =========================================================
            HIGH-DENSITY METRIC MATRIX: Adaptive Multi-Plane Tiles
            Adaptive to screen width (15% API issue reduction removed)
            ========================================================= */}
        <div className="about-metrics-matrix">
          {stats.map((stat, idx) => (
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
            CENTERPIECE: FULL-SCREEN & LEANER APPLE macOS DEVELOPER TERMINAL
            Full width, lean layout, prioritizing React.js
            ========================================================= */}
        <div className="about-terminal-stage">
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

              {/* Window Title */}
              <div className="apple-terminal-title font-mono">
                <TerminalIcon size={12} className="terminal-title-icon" />
                <span>jershika@react-terminal: ~</span>
              </div>

              <div className="apple-terminal-meta font-mono">
                <span className="meta-pulse-dot" />
                <span>production active</span>
              </div>
            </div>

            {/* Apple Terminal Body: Sequential Reveal */}
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
                Modern React.js architectures meet high-performance full-stack engineering.
              </motion.h3>

              {/* Command 2: Profile & Core Stack */}
              <motion.div className="terminal-prompt-row font-typewriter" style={{ marginTop: '1.25rem' }} custom={3} variants={typewriterLineVariants}>
                <span className="prompt-chevron">❯</span>
                <span className="prompt-cmd">cat profile.txt</span>
              </motion.div>

              {/* Lean, Punchy Specification Lines */}
              <div className="terminal-simple-lines">
                <motion.div className="terminal-text-line font-typewriter" custom={4} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span><strong>Primary Focus:</strong> React.js, TypeScript, JavaScript (ES6+), HTML5 &amp; modern CSS3.</span>
                </motion.div>

                <motion.div className="terminal-text-line font-typewriter" custom={5} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span><strong>UI Engineering:</strong> Reusable component design, responsive UI/UX, Bootstrap &amp; React Bootstrap.</span>
                </motion.div>

                <motion.div className="terminal-text-line font-typewriter" custom={6} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span><strong>Backend Services:</strong> RESTful microservices, Core Java, Spring Boot, MySQL &amp; MongoDB persistence.</span>
                </motion.div>

                <motion.div className="terminal-text-line font-typewriter" custom={7} variants={typewriterLineVariants}>
                  <span className="line-bullet">▪</span>
                  <span><strong>Engineering Credentials:</strong> Computer Science Engineering Honors graduate (8.51 CGPA).</span>
                </motion.div>
              </div>

              {/* Active Prompt with Blinking Cursor */}
              <motion.div className="terminal-active-prompt font-typewriter" custom={8} variants={typewriterLineVariants}>
                <span className="prompt-chevron">❯</span>
                <span className="prompt-path">~/react-core</span>
                <span className="terminal-blinking-cursor">▋</span>
              </motion.div>

              {/* Terminal Bottom Status Bar */}
              <motion.div className="apple-terminal-footer" custom={9} variants={typewriterLineVariants}>
                <div className="terminal-status-info font-typewriter">
                  <MapPin size={13} className="terminal-map-pin" />
                  <span>Kanyakumari / Chennai, India · Open for Roles</span>
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
        </div>

      </div>

      <style>{`
        /* =========================================================
           ABOUT SECTION: REFINED APPLE LIQUID GLASS & ASH THEME
           Palette: Obsidian Black, Ash Neutrals, Whisper Lavender, Crisp White
           ========================================================= */
        .about-editorial-section {
          position: relative;
          width: 100%;
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 60% 50% at 90% 18%, rgba(245, 208, 254, 0.4) 0%, rgba(230, 215, 245, 0.2) 45%, transparent 75%),
            radial-gradient(ellipse 55% 45% at 10% 82%, rgba(245, 208, 254, 0.25) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          border-bottom: 1px solid rgba(38, 36, 46, 0.08);
          padding: 5.5rem 1.5rem 6.5rem 1.5rem;
          box-sizing: border-box;
          color: #121118;
          overflow: hidden;
        }

        .about-container {
          max-width: 1140px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Ambient Glow Blobs */
        .about-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.55;
        }

        .glow-lavender {
          top: 15%;
          right: -5%;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(245, 208, 254, 0.7) 0%, transparent 70%);
        }

        .glow-ash {
          bottom: 10%;
          left: -8%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(216, 180, 254, 0.35) 0%, transparent 70%);
        }

        /* Section Header Lockup */
        .about-header-lockup {
          max-width: 820px;
          margin: 0 auto 3.25rem auto;
          text-align: center;
        }

        .about-mono-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #4A1D96;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(245, 208, 254, 0.32);
          border: 1px solid rgba(245, 208, 254, 0.85);
          box-shadow: 0 2px 8px rgba(147, 51, 234, 0.06);
          margin-bottom: 1.25rem;
        }

        .eyebrow-index {
          color: #7E22CE;
          font-weight: 800;
        }

        .eyebrow-divider {
          color: #C084FC;
          opacity: 0.6;
        }

        .eyebrow-title {
          color: #2D2938;
        }

        .about-headline {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.25rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #121118;
          margin: 0 0 1.25rem 0;
        }

        .headline-ash-bold {
          color: #26242E;
        }

        .headline-ampersand {
          font-family: 'Bodoni Moda', 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #7E22CE;
        }

        .headline-editorial-italic {
          font-family: 'Bodoni Moda', 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #63606E;
        }

        .about-lead-paragraph {
          font-size: clamp(1rem, 1.25vw, 1.125rem);
          line-height: 1.65;
          color: #4C4859;
          margin: 0 auto;
          max-width: 720px;
        }

        /* ---------------------------------------------------------
           METRIC MATRIX: Adaptive Grid Across Screen
           --------------------------------------------------------- */
        .about-metrics-matrix {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2.75rem;
        }

        .metric-cockpit-tile {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 20px;
          padding: 1.6rem 1.4rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 10px 28px -10px rgba(0, 0, 0, 0.04),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }

        .metric-cockpit-tile:hover {
          border-color: rgba(245, 208, 254, 0.9);
          box-shadow: 
            0 18px 40px -12px rgba(147, 51, 234, 0.08),
            inset 0 1.5px 2px rgba(255, 255, 255, 1);
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
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1;
          color: #121118;
          letter-spacing: -0.04em;
        }

        .metric-suffix {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 1.15rem;
          font-weight: 600;
          color: #7E22CE;
          margin-left: 2px;
        }

        .metric-label {
          font-size: 0.92rem;
          font-weight: 700;
          color: #121118;
          margin-bottom: 0.25rem;
        }

        .metric-detail {
          font-size: 0.8rem;
          color: #8E8B99;
          line-height: 1.45;
        }

        /* ---------------------------------------------------------
           FULL-SCREEN LEANER DEVELOPER TERMINAL CENTERPIECE
           --------------------------------------------------------- */
        .about-terminal-stage {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          perspective: 1200px;
        }

        .apple-terminal-window {
          width: 100%;
          max-width: 1020px;
          background: linear-gradient(165deg, rgba(24, 23, 31, 0.96) 0%, rgba(13, 12, 17, 0.98) 100%);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 24px;
          color: #F8F8FA;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 32px 85px -15px rgba(0, 0, 0, 0.45),
            0 12px 30px rgba(0, 0, 0, 0.2),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.35),
            inset 0 0 0 1px rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          will-change: transform;
        }

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
        }

        .dot-close {
          background: #FF5F56;
          border: 1px solid rgba(0, 0, 0, 0.18);
        }

        .dot-minimize {
          background: #FFBD2E;
          border: 1px solid rgba(0, 0, 0, 0.18);
        }

        .dot-expand {
          background: #27C93F;
          border: 1px solid rgba(0, 0, 0, 0.18);
        }

        .traffic-icon {
          font-size: 8px;
          color: rgba(0, 0, 0, 0.65);
          font-weight: 900;
          opacity: 0;
          transition: opacity 0.15s ease;
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
          font-weight: 600;
        }

        .terminal-title-icon {
          color: #F5D0FE;
        }

        .apple-terminal-meta {
          font-size: 0.68rem;
          font-weight: 600;
          color: #8E8B99;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .meta-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 6px #10B981;
        }

        .font-typewriter {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
        }

        .apple-terminal-body {
          padding: 1.75rem 2rem 1.6rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
          position: relative;
          z-index: 2;
        }

        .terminal-prompt-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.86rem;
        }

        .prompt-chevron {
          color: #F5D0FE;
          font-weight: 700;
        }

        .prompt-cmd {
          color: #E2E0EB;
          font-weight: 600;
        }

        .terminal-output-statement {
          margin: 0;
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          padding-left: 1.25rem;
          border-left: 2px solid #7E22CE;
        }

        .terminal-simple-lines {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-top: 0.25rem;
          padding-left: 1.25rem;
        }

        .terminal-text-line {
          display: flex;
          align-items: baseline;
          gap: 0.65rem;
          font-size: 0.88rem;
          line-height: 1.55;
          color: #C7C4D0;
        }

        .terminal-text-line strong {
          color: #F5D0FE;
        }

        .line-bullet {
          color: #7E22CE;
          font-size: 0.65rem;
          flex-shrink: 0;
        }

        .terminal-active-prompt {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.84rem;
          color: #8E8B99;
          margin-top: 0.5rem;
        }

        .prompt-path {
          color: #D4D1DC;
        }

        .terminal-blinking-cursor {
          color: #F5D0FE;
          animation: cursorBlink 1s step-end infinite;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .apple-terminal-footer {
          margin-top: 0.75rem;
          padding-top: 1rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .terminal-status-info {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.76rem;
          color: #8E8B99;
        }

        .terminal-map-pin {
          color: #F5D0FE;
        }

        .terminal-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.95rem;
          border-radius: 9999px;
          background: rgba(245, 208, 254, 0.15);
          border: 1px solid rgba(245, 208, 254, 0.4);
          color: #F5D0FE;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .terminal-cta-button:hover {
          background: rgba(245, 208, 254, 0.3);
          border-color: rgba(245, 208, 254, 0.8);
          color: #FFFFFF;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .about-editorial-section {
            padding: 4rem 1rem 5rem 1rem;
          }
          .about-headline {
            font-size: 1.85rem;
          }
          .apple-terminal-body {
            padding: 1.25rem 1.15rem;
          }
          .terminal-output-statement {
            font-size: 1.1rem;
            padding-left: 0.85rem;
          }
          .terminal-simple-lines {
            padding-left: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
