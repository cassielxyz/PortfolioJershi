import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, FileDown, Mail, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const bwImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const colorImageRef = useRef<HTMLImageElement | null>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number | null>(null);

  // Preload the original color image
  useEffect(() => {
    const img = new Image();
    img.src = '/profile_cutout.png';
    img.onload = () => {
      colorImageRef.current = img;
      setImageLoaded(true);
    };
  }, []);

  // Organic Ink Splash drawing routine with a small radius (~44px core + fine splatters)
  const drawInkSplash = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    baseRadius: number = 44
  ) => {
    // 16-point organic radial offsets for central ink blot
    const organicRadii = [
      baseRadius * 0.98,
      baseRadius * 1.12,
      baseRadius * 0.88,
      baseRadius * 1.18,
      baseRadius * 1.02,
      baseRadius * 0.82,
      baseRadius * 1.14,
      baseRadius * 0.96,
      baseRadius * 1.22,
      baseRadius * 0.86,
      baseRadius * 1.06,
      baseRadius * 1.16,
      baseRadius * 0.84,
      baseRadius * 1.08,
      baseRadius * 0.94,
      baseRadius * 1.12,
    ];

    const numPoints = organicRadii.length;
    const step = (Math.PI * 2) / numPoints;

    ctx.beginPath();

    // Calculate perimeter points
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = i * step;
      const r = organicRadii[i];
      points.push({
        x: x + Math.cos(angle) * r,
        y: y + Math.sin(angle) * r,
      });
    }

    // Connect points with smooth quadratic curves
    ctx.moveTo((points[0].x + points[numPoints - 1].x) / 2, (points[0].y + points[numPoints - 1].y) / 2);
    for (let i = 0; i < numPoints; i++) {
      const current = points[i];
      const next = points[(i + 1) % numPoints];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      ctx.quadraticCurveTo(current.x, current.y, midX, midY);
    }
    ctx.closePath();

    // Satellite splatter droplets radiating outward (small radius)
    const droplets = [
      { angle: 0.42, dist: baseRadius * 1.34, r: 3.6 },
      { angle: 0.75, dist: baseRadius * 1.55, r: 2.2 },
      { angle: 1.35, dist: baseRadius * 1.28, r: 3.2 },
      { angle: 1.95, dist: baseRadius * 1.48, r: 2.6 },
      { angle: 2.50, dist: baseRadius * 1.32, r: 3.4 },
      { angle: 2.92, dist: baseRadius * 1.58, r: 2.0 },
      { angle: 3.55, dist: baseRadius * 1.36, r: 3.5 },
      { angle: 4.10, dist: baseRadius * 1.52, r: 2.4 },
      { angle: 4.65, dist: baseRadius * 1.26, r: 3.0 },
      { angle: 5.20, dist: baseRadius * 1.44, r: 2.8 },
      { angle: 5.75, dist: baseRadius * 1.35, r: 3.2 },
      { angle: 0.12, dist: baseRadius * 1.62, r: 1.8 },
      { angle: 1.70, dist: baseRadius * 1.68, r: 1.6 },
      { angle: 3.20, dist: baseRadius * 1.64, r: 1.8 },
      { angle: 4.90, dist: baseRadius * 1.70, r: 1.7 },
    ];

    for (const d of droplets) {
      const dx = x + Math.cos(d.angle) * d.dist;
      const dy = y + Math.sin(d.angle) * d.dist;
      ctx.moveTo(dx + d.r, dy);
      ctx.arc(dx, dy, d.r, 0, Math.PI * 2);
    }
  }, []);

  // Render loop to paint the ink-splash revealed color photo
  const renderSplash = useCallback(() => {
    const canvas = canvasRef.current;
    const imgEl = bwImageRef.current;
    const colorImg = colorImageRef.current;

    if (!canvas || !imgEl || !colorImg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = imgEl.clientWidth;
    const displayHeight = imgEl.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    // Sync canvas internal resolution with display size
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    if (isHoveredRef.current && mousePosRef.current.x >= -100) {
      const { x, y } = mousePosRef.current;

      // 1. Create Ink Splash Clip Path
      ctx.save();
      drawInkSplash(ctx, x, y, 44); // Small radius ink splash
      ctx.clip();

      // 2. Draw 100% Crisp Original Color Photo (NO texture modification)
      ctx.drawImage(colorImg, 0, 0, displayWidth, displayHeight);
      ctx.restore();
    }

    ctx.restore();
  }, [drawInkSplash]);

  useEffect(() => {
    renderSplash();
  }, [renderSplash]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bwImageRef.current) return;
    const rect = bwImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y };
    isHoveredRef.current = true;
    if (!isHovered) setIsHovered(true);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(renderSplash);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    mousePosRef.current = { x: -1000, y: -1000 };
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(renderSplash);
  };

  return (
    <section id="hero" className="fullscreen-hero-section">
      {/* Ambient Pastel Background Lighting */}
      <div className="hero-orb hero-orb-lavender" />
      <div className="hero-orb hero-orb-pink" />

      <div className="content-wrapper hero-layout-grid">
        
        {/* =========================================================
            LEFT COLUMN: CLEAN EDITORIAL TYPOGRAPHY (ZERO OVERLAP)
            Following Behance inspiration with disciplined guidelines
            ========================================================= */}
        <div className="hero-typography-column">
          
          {/* Masthead Banner: "My" (handwritten) + "PORTFOLIO" (display outline) */}
          <div className="hero-masthead-bar">
            <motion.span
              initial={{ opacity: 0, rotate: -10, y: 4 }}
              animate={{ opacity: 1, rotate: -6, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="masthead-my"
            >
              My
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="masthead-portfolio"
            >
              PORTFOLIO
            </motion.span>
          </div>

          {/* Lead-in Preamble */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hero-lead-in"
          >
            <span>My Name is</span>
            <span className="lead-in-highlight">Jershika</span>
            <span>and I am a</span>
          </motion.div>

          {/* Signature Headline: Bold Block + Cursive Script (Zero overlap, generous line height) */}
          <div className="hero-headline-lockup">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="headline-bold-text"
            >
              Full Stack
            </motion.span>

            <motion.span
              initial={{ opacity: 0, rotate: -6, scale: 0.94 }}
              animate={{ opacity: 1, rotate: -3, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="headline-script-text"
            >
              developer.
            </motion.span>
          </div>

          {/* Academic Honors Badge & College Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="hero-honors-row"
          >
            <div className="honors-badge-pill">
              <Award size={14} className="badge-icon" />
              <span>8.51 CGPA Honors Graduate</span>
            </div>
            <span className="honors-dot">•</span>
            <span className="honors-college">Ponjesly College of Engineering</span>
          </motion.div>

          {/* Core Tech Stack Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="hero-tech-pills-row"
          >
            <span className="tech-pill tech-pill-lavender">Core Java</span>
            <span className="tech-pill tech-pill-pink">Spring Boot</span>
            <span className="tech-pill tech-pill-lavender">React.js</span>
            <span className="tech-pill tech-pill-pink">TypeScript</span>
            <span className="tech-pill tech-pill-lavender">PostgreSQL</span>
            <span className="tech-pill tech-pill-pink">REST APIs</span>
          </motion.div>

          {/* Editorial Punchline Bio */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85 }}
            className="hero-bio-text"
          >
            Architecting robust enterprise services with <strong>Spring Boot & PostgreSQL</strong>, 
            and crafting intuitive, high-performance web applications with <strong>React.js</strong>. 
            Dedicated to clean architecture, fast API latencies, and modern user experiences.
          </motion.p>

          {/* Action CTAs & Social Connectors */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.95 }}
            className="hero-actions-container"
          >
            {/* Download Resume Modal Trigger */}
            <motion.button
              onClick={onOpenResumeModal}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lavender-primary"
            >
              <FileDown size={17} />
              <span>Download Resume</span>
            </motion.button>

            {/* Explore Profile Link */}
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lavender-secondary"
            >
              <span>Explore Profile</span>
              <ArrowRight size={16} />
            </motion.a>

            {/* Get in Touch */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lavender-ghost"
            >
              <Mail size={15} />
              <span>Get in Touch</span>
            </motion.a>

            {/* Social Icons */}
            <div className="hero-social-connectors">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-btn"
                title="GitHub"
              >
                <GithubIcon size={16} />
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
                <LinkedinIcon size={16} />
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: MINIMIZED PORTRAIT WITH INK SPLASH COLOR REVEAL
            No texture changes on photo • Small radius ink splash reveal
            ========================================================= */}
        <div className="hero-portrait-column">
          
          {/* Subtle Ambient Backlight Glow */}
          <div className="portrait-ambient-glow" />

          {/* Minimized Interactive Portrait Stage */}
          <motion.div
            ref={stageRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="portrait-minimized-stage"
          >
            {/* Image & Canvas Wrapper - Tight bounding box */}
            <div
              id="hero-portrait-interactive"
              ref={imageWrapperRef}
              className="portrait-image-wrapper"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* BASE LAYER: Pure Black and White with Bottom Gradient Fade */}
              <img
                ref={bwImageRef}
                src="/profile_cutout.png"
                alt="Jershika C — Black and White Portrait"
                className="portrait-cutout-img"
                onLoad={() => {
                  setImageLoaded(true);
                  renderSplash();
                }}
              />

              {/* TOP LAYER: Interactive Ink Splash Canvas (reveals pure untextured color) */}
              <canvas
                ref={canvasRef}
                className="portrait-splash-canvas"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              />

              {/* Small Hint Pill below image */}
              <motion.div
                animate={{ opacity: isHovered ? 0 : 0.85, y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="ink-splash-hint-pill"
              >
                <Sparkles size={12} className="sparkle-icon" />
                <span>Hover cursor to splash color ✦</span>
              </motion.div>
            </div>

          </motion.div>

        </div>

      </div>

      {/* Scoped CSS Styles with proper editorial guidelines */}
      <style>{`
        .fullscreen-hero-section {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 6rem;
          padding-bottom: 3.5rem;
          overflow: hidden;
        }

        /* Ambient Pastel Lighting */
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
          width: clamp(320px, 35vw, 500px);
          height: clamp(320px, 35vw, 500px);
          background: radial-gradient(circle, rgba(216, 180, 254, 0.32) 0%, rgba(243, 232, 255, 0) 70%);
        }

        .hero-orb-pink {
          top: 35%;
          left: -5%;
          width: clamp(280px, 30vw, 440px);
          height: clamp(280px, 30vw, 440px);
          background: radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, rgba(253, 242, 248, 0) 70%);
        }

        /* 2-Column Responsive Grid with Proper Guidelines */
        .hero-layout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        @media (min-width: 960px) {
          .hero-layout-grid {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 2.5rem;
          }
        }

        /* =========================================
           LEFT COLUMN: CLEAN TYPOGRAPHIC HIERARCHY
           ========================================= */
        .hero-typography-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        /* Masthead Bar: Proper inline alignment without collisions */
        .hero-masthead-bar {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 1.15rem;
          user-select: none;
        }

        .masthead-my {
          font-family: var(--font-script);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 700;
          color: #1D1527;
          line-height: 1;
          display: inline-block;
        }

        .masthead-portfolio {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4.4vw, 3.8rem);
          line-height: 1;
          letter-spacing: 0.08em;
          color: transparent;
          -webkit-text-stroke: 1.5px #D8B4FE;
          opacity: 0.9;
          display: inline-block;
        }

        /* Lead-in Row */
        .hero-lead-in {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          font-weight: 500;
          color: #645674;
          margin-bottom: 0.45rem;
        }

        .lead-in-highlight {
          color: #9333EA;
          font-weight: 700;
        }

        /* Signature Headline */
        .hero-headline-lockup {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.1rem;
        }

        .headline-bold-text {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 5.2vw, 4.5rem);
          font-weight: 900;
          color: #1D1527;
          letter-spacing: -0.035em;
          line-height: 1;
        }

        .headline-script-text {
          font-family: var(--font-script);
          font-size: clamp(3rem, 6vw, 5.2rem);
          font-weight: 700;
          color: #9333EA;
          background: linear-gradient(135deg, #9333EA 0%, #C084FC 45%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          display: inline-block;
        }

        /* Honors Row */
        .hero-honors-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #645674;
        }

        .honors-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #FCE7F3;
          border: 1px solid #FBCFE8;
          color: #9D174D;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
        }

        .badge-icon {
          color: #EC4899;
        }

        .honors-dot {
          color: #D8B4FE;
        }

        .honors-college {
          font-weight: 600;
          color: #1D1527;
        }

        /* Tech Pills */
        .hero-tech-pills-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .tech-pill {
          font-size: 0.785rem;
          font-weight: 600;
          padding: 0.25rem 0.7rem;
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

        /* Bio Text */
        .hero-bio-text {
          font-size: clamp(0.95rem, 1.15vw, 1.05rem);
          color: #645674;
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 1.85rem;
        }

        /* Actions Container */
        .hero-actions-container {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .btn-lavender-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #1D1527;
          color: #FFFFFF;
          padding: 0.75rem 1.55rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.885rem;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 16px rgba(29, 21, 39, 0.2);
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        .btn-lavender-primary:hover {
          background: #361F4D;
          box-shadow: 0 6px 22px rgba(147, 51, 234, 0.25);
        }

        .btn-lavender-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          color: #1D1527;
          border: 1px solid #DFCDEC;
          padding: 0.75rem 1.45rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.885rem;
          box-shadow: 0 2px 8px rgba(147, 51, 234, 0.04);
          text-decoration: none;
          transition: all 0.2s ease;
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
          padding: 0.75rem 1.15rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-lavender-ghost:hover {
          color: #9333EA;
          background: #F5EFFB;
        }

        .hero-social-connectors {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-left: 0.35rem;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid #DFCDEC;
          color: #1D1527;
          box-shadow: 0 2px 6px rgba(147, 51, 234, 0.04);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          border-color: #9333EA;
          color: #9333EA;
          background: #FAF5FF;
        }

        /* =========================================
           RIGHT COLUMN: MINIMIZED PORTRAIT & INK SPLASH
           ========================================= */
        .hero-portrait-column {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .portrait-ambient-glow {
          position: absolute;
          width: clamp(200px, 24vw, 280px);
          height: clamp(200px, 24vw, 280px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.25) 0%, rgba(192, 132, 252, 0.2) 45%, transparent 70%);
          filter: blur(35px);
          pointer-events: none;
          z-index: 0;
        }

        /* Minimized Portrait Stage */
        .portrait-minimized-stage {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          cursor: crosshair;
          z-index: 1;
        }

        /* Tight wrapper around the portrait cutout */
        .portrait-image-wrapper {
          position: relative;
          display: inline-block;
          height: clamp(270px, 29vw, 340px);
          max-width: 270px;
        }

        /* Base B&W Image with Bottom Gradient Fade */
        .portrait-cutout-img {
          height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          filter: grayscale(100%) contrast(1.08) brightness(0.96) drop-shadow(0 12px 24px rgba(147, 51, 234, 0.12));
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%);
          display: block;
          user-select: none;
          pointer-events: none;
        }

        /* Top Interactive Canvas (reveals pure original color via ink splash clip path) */
        .portrait-splash-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%);
          z-index: 2;
        }

        /* Hint Pill */
        .ink-splash-hint-pill {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid #EAE0F5;
          box-shadow: 0 4px 14px rgba(147, 51, 234, 0.08);
          border-radius: 9999px;
          padding: 0.35rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #9333EA;
          white-space: nowrap;
          pointer-events: none;
          z-index: 4;
        }

        .sparkle-icon {
          color: #EC4899;
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .fullscreen-hero-section {
            padding-top: 5rem;
          }

          .hero-layout-grid {
            gap: 2rem;
          }

          .headline-bold-text {
            font-size: 2.35rem;
          }

          .headline-script-text {
            font-size: 2.85rem;
          }

          .hero-actions-container {
            width: 100%;
          }

          .btn-lavender-primary, .btn-lavender-secondary {
            width: 100%;
            justify-content: center;
          }

          .portrait-minimized-stage {
            max-width: 250px;
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
};
