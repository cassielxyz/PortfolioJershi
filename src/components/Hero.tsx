import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, FileDown, Mail, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Proximity and brush tracking
  const [isNear, setIsNear] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [brushPos, setBrushPos] = useState({ x: 50, y: 50 });
  const [colorIntensity, setColorIntensity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const imgEl = imageContainerRef.current;
      if (!imgEl) return;

      const rect = imgEl.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const imgCenterY = rect.top + rect.height / 2;

      // Distance from cursor to image center
      const distX = e.clientX - imgCenterX;
      const distY = e.clientY - imgCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Proximity threshold: 380px
      const threshold = 380;
      if (distance < threshold) {
        setIsNear(true);
        // Intensity smoothly scales from 0 (at 380px) to 1 (when inside)
        const intensity = Math.max(0, Math.min(1, 1 - distance / threshold));
        setColorIntensity(intensity);
      } else {
        setIsNear(false);
        setColorIntensity(0);
      }

      // Check if cursor is directly inside the image bounds
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsHovered(inside);

      if (inside) {
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
        setBrushPos({ x: xPercent, y: yPercent });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="fullscreen-hero-section" ref={containerRef}>
      {/* SVG Brush Texture Filters for Painterly Reveal */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="brushRoughFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Atmospheric Ambient Pastel Orbs */}
      <div className="hero-orb hero-orb-lavender" />
      <div className="hero-orb hero-orb-pink" />

      <div className="content-wrapper hero-layout-grid">
        
        {/* =========================================================
            LEFT COLUMN: THE MONUMENTAL BEHANCE TYPOGRAPHY
            ========================================================= */}
        <div className="hero-typography-column">
          
          {/* Masthead Header: "My", Outlined "PORTFOLIO", and Script "Jershika" */}
          <div className="masthead-typographic-lockup">
            
            {/* Playful Handwritten Script "My" */}
            <motion.div
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="masthead-my-accent"
            >
              My
            </motion.div>

            {/* Architectural Tall Outlined Typography "PORTFOLIO" */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="masthead-portfolio-text"
            >
              PORTFOLIO
            </motion.div>

            {/* Flowing Watermark Signature "Jershika" */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.25 }}
              className="masthead-jershika-watermark"
            >
              Jershika
            </motion.div>
          </div>

          {/* Lead-in Preamble */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="headline-lead-row"
          >
            <span>My Name is</span>
            <span className="lead-name-highlight">Jershika</span>
            <span>and I am a</span>
          </motion.div>

          {/* The Behance Signature Headline: Block + Cursive Script */}
          <div className="headline-signature-lockup">
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="headline-bold-sans"
            >
              Full Stack
            </motion.span>

            <motion.span
              initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
              animate={{ opacity: 1, rotate: -4, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="headline-cursive-script"
            >
              developer.
            </motion.span>
          </div>

          {/* Academic Honors Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="academic-honors-row"
          >
            <div className="honors-badge-pill">
              <Award size={15} className="badge-icon" />
              <span>8.51 CGPA Honors Graduate</span>
            </div>
            <span className="honors-sep">•</span>
            <span className="honors-college">Ponjesly College of Engineering</span>
          </motion.div>

          {/* Core Focus Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="tech-pills-row"
          >
            <span className="tech-pill tech-pill-lavender">Core Java</span>
            <span className="tech-pill tech-pill-pink">Spring Boot</span>
            <span className="tech-pill tech-pill-lavender">React.js</span>
            <span className="tech-pill tech-pill-pink">TypeScript</span>
            <span className="tech-pill tech-pill-lavender">PostgreSQL</span>
            <span className="tech-pill tech-pill-pink">REST APIs</span>
          </motion.div>

          {/* Editorial Tagline / Bio Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="hero-editorial-bio"
          >
            Architecting robust enterprise services with <strong>Spring Boot & PostgreSQL</strong>, 
            and crafting intuitive, high-performance web applications with <strong>React.js</strong>. 
            Dedicated to clean architecture, fast API latencies, and modern user experiences.
          </motion.p>

          {/* Action CTA Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="hero-action-buttons-wrap"
          >
            {/* Primary Download Resume */}
            <motion.button
              onClick={onOpenResumeModal}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lavender-primary"
            >
              <FileDown size={18} />
              <span>Download Resume</span>
            </motion.button>

            {/* Explore Works */}
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lavender-secondary"
            >
              <span>Explore Profile</span>
              <ArrowRight size={17} />
            </motion.a>

            {/* Direct Contact */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lavender-ghost"
            >
              <Mail size={16} />
              <span>Get in Touch</span>
            </motion.a>

            {/* Social Icons */}
            <div className="hero-social-links">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-btn"
                title="GitHub"
              >
                <GithubIcon size={17} />
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-btn"
                title="LinkedIn"
              >
                <LinkedinIcon size={17} />
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: INTERACTIVE BLACK & WHITE BRUSH REVEAL PORTRAIT
            Moved to the right as requested, replacing the old element
            ========================================================= */}
        <div className="hero-portrait-column" ref={imageContainerRef}>
          
          {/* Ambient Lighting Aura behind Cutout */}
          <div className="portrait-halo-aura" />

          {/* Interactive Brush Texture Portrait Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="portrait-interactive-stage"
          >
            {/* BASE LAYER: Black and White with Soft Bottom Gradient Fade */}
            <div className="portrait-layer portrait-layer-bw">
              <img
                src="/profile_cutout.png"
                alt="Jershika C — Black and White Portrait"
                className="portrait-cutout-img"
              />
            </div>

            {/* TOP LAYER: Full Original Color with Brush Texture Reveal */}
            <div
              className="portrait-layer portrait-layer-color"
              style={{
                opacity: isHovered || isNear ? 1 : 0,
                filter: 'saturate(1.15) contrast(1.05)',
                transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img
                src="/profile_cutout.png"
                alt="Jershika C — Full Color Portrait"
                className="portrait-cutout-img"
              />
              {/* Painterly Brush Texture Overlay */}
              <div className="brush-stroke-texture" />
            </div>

            {/* Subtle Brush Texture Interactive Prompt Pill */}
            <motion.div
              animate={{ 
                opacity: isHovered || isNear ? 0 : 1, 
                y: [0, -4, 0] 
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="portrait-brush-prompt-pill"
            >
              <Sparkles size={13} className="sparkle-hint-icon" />
              <span>Hover cursor to colorize ✦</span>
            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* Hero Section Scoped Styles */}
      <style>{`
        .fullscreen-hero-section {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 6.5rem;
          padding-bottom: 4rem;
          overflow: hidden;
        }

        /* Ambient Pastel Orbs */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-orb-lavender {
          top: 10%;
          right: 5%;
          width: clamp(350px, 40vw, 550px);
          height: clamp(350px, 40vw, 550px);
          background: radial-gradient(circle, rgba(216, 180, 254, 0.35) 0%, rgba(243, 232, 255, 0) 70%);
        }

        .hero-orb-pink {
          top: 30%;
          left: -5%;
          width: clamp(300px, 35vw, 480px);
          height: clamp(300px, 35vw, 480px);
          background: radial-gradient(circle, rgba(244, 114, 182, 0.22) 0%, rgba(253, 242, 248, 0) 70%);
        }

        /* Main 2-Column Fullscreen Layout */
        .hero-layout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        @media (min-width: 960px) {
          .hero-layout-grid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 2.5rem;
          }
        }

        /* =========================================
           LEFT COLUMN: TYPOGRAPHY
           ========================================= */
        .hero-typography-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        /* Masthead Typographic Lockup */
        .masthead-typographic-lockup {
          position: relative;
          width: 100%;
          margin-bottom: 0.5rem;
        }

        .masthead-my-accent {
          position: absolute;
          top: -1.75rem;
          left: 0.25rem;
          font-family: var(--font-script);
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 700;
          color: #1D1527;
          line-height: 1;
          user-select: none;
          z-index: 2;
        }

        .masthead-portfolio-text {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 11vw, 8.5rem);
          line-height: 0.85;
          letter-spacing: clamp(0.04em, 0.08em, 0.12em);
          color: transparent;
          -webkit-text-stroke: 1.75px #D8B4FE;
          user-select: none;
          pointer-events: none;
          z-index: 1;
          opacity: 0.82;
        }

        .masthead-jershika-watermark {
          position: absolute;
          top: 1.25rem;
          left: clamp(2rem, 8vw, 7rem);
          font-family: var(--font-script);
          font-size: clamp(4.5rem, 11.5vw, 8.8rem);
          font-weight: 700;
          color: rgba(216, 180, 254, 0.38);
          user-select: none;
          pointer-events: none;
          z-index: 2;
          white-space: nowrap;
        }

        /* Lead-in Row */
        .headline-lead-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-weight: 500;
          color: #645674;
          letter-spacing: -0.01em;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .lead-name-highlight {
          color: #9333EA;
          font-weight: 700;
        }

        /* Behance Signature Headline: Full Stack developer. */
        .headline-signature-lockup {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(0.5rem, 1.5vw, 1.25rem);
          margin-bottom: 1rem;
        }

        .headline-bold-sans {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 900;
          color: #1D1527;
          letter-spacing: -0.035em;
          line-height: 0.95;
          text-transform: capitalize;
        }

        .headline-cursive-script {
          font-family: var(--font-script);
          font-size: clamp(3.5rem, 8vw, 6.75rem);
          font-weight: 700;
          color: #9333EA;
          background: linear-gradient(135deg, #9333EA 0%, #C084FC 45%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 0.95;
          display: inline-block;
          transform-origin: left bottom;
        }

        /* Academic Honors Row */
        .academic-honors-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-bottom: 1.15rem;
          font-size: 0.9rem;
          color: #645674;
        }

        .honors-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #FCE7F3;
          border: 1px solid #FBCFE8;
          color: #9D174D;
          font-weight: 700;
          font-size: 0.825rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
        }

        .badge-icon {
          color: #EC4899;
        }

        .honors-sep {
          color: #D8B4FE;
        }

        .honors-college {
          font-weight: 600;
          color: #1D1527;
        }

        /* Tech Pills */
        .tech-pills-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 1.5rem;
        }

        .tech-pill {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          transition: transform 0.2s ease;
        }

        .tech-pill:hover {
          transform: translateY(-2px);
        }

        .tech-pill-lavender {
          background: #F3E8FF;
          border: 1px solid #E9D5FF;
          color: #6B21A8;
        }

        .tech-pill-pink {
          background: #FCE7F3;
          border: 1px solid #FBCFE8;
          color: #9D174D;
        }

        /* Bio */
        .hero-editorial-bio {
          font-size: clamp(1rem, 1.25vw, 1.12rem);
          color: #645674;
          line-height: 1.7;
          max-width: 620px;
          margin-bottom: 2.25rem;
        }

        /* Actions Wrap */
        .hero-action-buttons-wrap {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .btn-lavender-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #1D1527;
          color: #FFFFFF;
          padding: 0.85rem 1.75rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.925rem;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 18px rgba(29, 21, 39, 0.22);
          cursor: pointer;
          border: none;
        }

        .btn-lavender-primary:hover {
          background: #361F4D;
          box-shadow: 0 6px 24px rgba(147, 51, 234, 0.28);
        }

        .btn-lavender-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #FFFFFF;
          color: #1D1527;
          border: 1px solid #DFCDEC;
          padding: 0.85rem 1.6rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.925rem;
          box-shadow: 0 2px 8px rgba(147, 51, 234, 0.04);
          text-decoration: none;
        }

        .btn-lavender-secondary:hover {
          background: #FAF7FC;
          border-color: #9333EA;
          color: #9333EA;
        }

        .btn-lavender-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: transparent;
          color: #645674;
          padding: 0.85rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
        }

        .btn-lavender-ghost:hover {
          color: #9333EA;
          background: #F5EFFB;
        }

        .hero-social-links {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-left: 0.5rem;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid #DFCDEC;
          color: #1D1527;
          box-shadow: 0 2px 8px rgba(147, 51, 234, 0.04);
          text-decoration: none;
        }

        .social-btn:hover {
          border-color: #9333EA;
          color: #9333EA;
          background: #FAF5FF;
        }

        /* =========================================
           RIGHT COLUMN: INTERACTIVE BRUSH PORTRAIT
           ========================================= */
        .hero-portrait-column {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .portrait-halo-aura {
          position: absolute;
          width: clamp(320px, 35vw, 440px);
          height: clamp(320px, 35vw, 440px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.28) 0%, rgba(192, 132, 252, 0.25) 45%, transparent 70%);
          filter: blur(45px);
          pointer-events: none;
          z-index: 0;
        }

        .portrait-interactive-stage {
          position: relative;
          width: 100%;
          max-width: 460px;
          height: clamp(400px, 52vw, 560px);
          display: flex;
          justify-content: center;
          align-items: flex-end;
          cursor: crosshair;
          z-index: 1;
        }

        .portrait-layer {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          pointer-events: none;
          user-select: none;
        }

        /* Base Black & White Cutout with Smooth Bottom Gradient Fade */
        .portrait-layer-bw {
          z-index: 1;
          filter: grayscale(100%) contrast(1.12) brightness(0.96);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%);
        }

        /* Top Original Color Layer with Brush Reveal Mask */
        .portrait-layer-color {
          z-index: 2;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%);
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease;
        }

        .hero-portrait-column:hover .portrait-layer-color,
        .portrait-interactive-stage:hover .portrait-layer-color {
          opacity: 1 !important;
        }

        .hero-portrait-column:hover .portrait-brush-prompt-pill {
          opacity: 0 !important;
        }

        .hero-portrait-column:hover .portrait-halo-aura {
          transform: scale(1.12);
          background: radial-gradient(circle, rgba(244, 114, 182, 0.42) 0%, rgba(192, 132, 252, 0.38) 45%, transparent 70%);
        }

        .portrait-cutout-img {
          height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 16px 32px rgba(147, 51, 234, 0.12));
          display: block;
        }

        /* Brush Prompt Pill */
        .portrait-brush-prompt-pill {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid #EAE0F5;
          box-shadow: 0 4px 16px rgba(147, 51, 234, 0.08);
          border-radius: 9999px;
          padding: 0.45rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.785rem;
          font-weight: 600;
          color: #9333EA;
          white-space: nowrap;
          pointer-events: none;
          z-index: 4;
        }

        .sparkle-hint-icon {
          color: #EC4899;
        }

        /* Mobile Adjustments */
        @media (max-width: 960px) {
          .fullscreen-hero-section {
            padding-top: 5.5rem;
          }

          .hero-layout-grid {
            gap: 2.5rem;
          }

          .portrait-interactive-stage {
            height: 380px;
          }
        }

        @media (max-width: 640px) {
          .masthead-portfolio-text {
            font-size: 4rem;
          }

          .headline-bold-sans {
            font-size: 2.75rem;
          }

          .headline-cursive-script {
            font-size: 3.25rem;
          }

          .hero-action-buttons-wrap {
            width: 100%;
          }

          .btn-lavender-primary, .btn-lavender-secondary {
            width: 100%;
            justify-content: center;
          }

          .portrait-interactive-stage {
            height: 320px;
          }
        }
      `}</style>
    </section>
  );
};
