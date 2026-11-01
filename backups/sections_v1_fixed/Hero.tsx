import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, FileDown, Mail, Award } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onOpenResumeModal: () => void;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  fadeSpeed: number;
  ringWidth: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const bwImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth slight scroll animations for hero section
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    restDelta: 0.001,
  });

  // Parallax & scale for background masthead 'PORTFOLIO' & 'My'
  const mastheadY = useTransform(smoothProgress, [0, 1], [0, 95]);
  const mastheadScale = useTransform(smoothProgress, [0, 1], [1, 0.95]);
  const mastheadOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0.16]);

  // Subtle upward float & gentle fade for details text column
  const textColumnY = useTransform(smoothProgress, [0, 1], [0, -42]);
  const textColumnOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0]);

  // Subtle parallax float & depth scale for portrait column
  const portraitY = useTransform(smoothProgress, [0, 1], [0, 50]);
  const portraitScale = useTransform(smoothProgress, [0, 1], [1, 0.96]);
  const portraitOpacity = useTransform(smoothProgress, [0, 0.82], [1, 0.25]);

  // Ambient orbs subtle drift
  const orbLavenderY = useTransform(smoothProgress, [0, 1], [0, 130]);
  const orbPinkY = useTransform(smoothProgress, [0, 1], [0, -75]);

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [, setImageLoaded] = useState(false);
  const colorImageRef = useRef<HTMLImageElement | null>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<Ripple[]>([]);
  const lastSpawnPosRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth, lingering mouse ripple render loop (GPU composited 60-120fps)
  const renderRipples = useCallback(() => {
    const canvas = canvasRef.current;
    const imgEl = bwImageRef.current;
    const colorImg = colorImageRef.current;

    if (!canvas || !imgEl) return;
    const sourceColorImg = colorImg || (imgEl.complete && imgEl.naturalWidth > 0 ? imgEl : null);
    if (!sourceColorImg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = imgEl.clientWidth;
    const displayHeight = imgEl.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    // Sync resolution with display dimensions
    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
    }

    // Ensure offscreen mask canvas
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offscreen = offscreenCanvasRef.current;
    if (offscreen.width !== displayWidth || offscreen.height !== displayHeight) {
      offscreen.width = displayWidth;
      offscreen.height = displayHeight;
    }

    const maskCtx = offscreen.getContext('2d');
    if (!maskCtx) return;

    // Clear mask canvas
    maskCtx.clearRect(0, 0, displayWidth, displayHeight);

    // 1. Draw smooth soft focal glow directly under cursor
    if (isHoveredRef.current && mousePosRef.current.x >= 0 && mousePosRef.current.y >= 0) {
      const { x, y } = mousePosRef.current;
      const spotGrad = maskCtx.createRadialGradient(x, y, 0, x, y, 68);
      spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      spotGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.8)');
      spotGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.35)');
      spotGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      maskCtx.fillStyle = spotGrad;
      maskCtx.beginPath();
      maskCtx.arc(x, y, 68, 0, Math.PI * 2);
      maskCtx.fill();
    }

    // 2. Draw smooth, expanding ripples with primary and secondary echo waves
    const ripples = ripplesRef.current;
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += r.speed;
      r.alpha -= r.fadeSpeed;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }

      // Primary wave crest (wide, soft, liquid)
      const outerR = r.radius;
      const innerR = Math.max(0, outerR - r.ringWidth);
      const waveGrad = maskCtx.createRadialGradient(r.x, r.y, innerR, r.x, r.y, outerR);
      waveGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      waveGrad.addColorStop(0.25, `rgba(255, 255, 255, ${Math.min(1, Math.max(0, r.alpha * 0.35))})`);
      waveGrad.addColorStop(0.55, `rgba(255, 255, 255, ${Math.min(1, Math.max(0, r.alpha * 0.95))})`);
      waveGrad.addColorStop(0.8, `rgba(255, 255, 255, ${Math.min(1, Math.max(0, r.alpha * 0.45))})`);
      waveGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      maskCtx.fillStyle = waveGrad;
      maskCtx.beginPath();
      maskCtx.arc(r.x, r.y, outerR, 0, Math.PI * 2);
      maskCtx.fill();

      // Concentric secondary echo wave
      if (outerR > 36) {
        const echoOuter = outerR - 26;
        const echoInner = Math.max(0, echoOuter - (r.ringWidth * 0.7));
        const echoGrad = maskCtx.createRadialGradient(r.x, r.y, echoInner, r.x, r.y, echoOuter);
        echoGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        echoGrad.addColorStop(0.5, `rgba(255, 255, 255, ${Math.min(1, Math.max(0, r.alpha * 0.5))})`);
        echoGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        maskCtx.fillStyle = echoGrad;
        maskCtx.beginPath();
        maskCtx.arc(r.x, r.y, echoOuter, 0, Math.PI * 2);
        maskCtx.fill();
      }
    }

    // 3. Render into visible canvas using GPU destination-in masking
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Draw full-color image
    ctx.drawImage(sourceColorImg, 0, 0, displayWidth, displayHeight);

    // Mask with offscreen ripples
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(offscreen, 0, 0, displayWidth, displayHeight);
    ctx.restore();

    // Continue animation loop if ripples remain or cursor is active
    if (ripples.length > 0 || isHoveredRef.current) {
      animFrameRef.current = requestAnimationFrame(renderRipples);
    } else {
      animFrameRef.current = null;
    }
  }, []);

  const startLoopIfNeeded = useCallback(() => {
    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(renderRipples);
    }
  }, [renderRipples]);

  // Preload original color image with instant cached fallback
  useEffect(() => {
    const img = new Image();
    img.src = '/jershika.png';
    const onLoaded = () => {
      colorImageRef.current = img;
      setImageLoaded(true);
      startLoopIfNeeded();
    };
    if (img.complete && img.naturalWidth > 0) {
      onLoaded();
    } else {
      img.onload = onLoaded;
    }
  }, [startLoopIfNeeded]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y };
    isHoveredRef.current = true;
    if (!isHovered) setIsHovered(true);

    const dist = Math.hypot(x - lastSpawnPosRef.current.x, y - lastSpawnPosRef.current.y);

    // Spawn a smooth, slow, wide water ripple wave
    if (dist > 22) {
      const maxR = Math.max(rect.width, rect.height) * 0.88;
      ripplesRef.current.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.max(180, maxR),
        speed: 1.8,       // Slower & smoother
        alpha: 0.92,
        fadeSpeed: 0.007, // Lingers longer and softer
        ringWidth: 62,    // Wider liquid crest
      });

      // Cap max ripples to ensure peak performance
      if (ripplesRef.current.length > 20) {
        ripplesRef.current.shift();
      }

      lastSpawnPosRef.current = { x, y };
    }

    startLoopIfNeeded();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const maxR = Math.max(rect.width, rect.height) * 1.05;

    // Trigger an expanding smooth shockwave ripple effect on click
    ripplesRef.current.push(
      {
        x,
        y,
        radius: 6,
        maxRadius: maxR,
        speed: 2.3,        // Slower expansion
        alpha: 1.0,
        fadeSpeed: 0.006,  // Slower fade
        ringWidth: 72,
      },
      {
        x,
        y,
        radius: 0,
        maxRadius: maxR * 0.82,
        speed: 1.6,
        alpha: 0.85,
        fadeSpeed: 0.007,
        ringWidth: 54,
      }
    );

    startLoopIfNeeded();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isHoveredRef.current = true;
    setIsHovered(true);
    mousePosRef.current = { x, y };
    lastSpawnPosRef.current = { x, y };

    // Initial gentle ripple on enter
    ripplesRef.current.push({
      x,
      y,
      radius: 4,
      maxRadius: Math.max(rect.width, rect.height) * 0.85,
      speed: 1.8,
      alpha: 0.92,
      fadeSpeed: 0.007,
      ringWidth: 58,
    });

    startLoopIfNeeded();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    mousePosRef.current = { x: -1000, y: -1000 };
    startLoopIfNeeded();
  };

  return (
    <section id="hero" ref={heroSectionRef} className="fullscreen-hero-section">
      {/* Ambient Pastel Lighting with smooth scroll parallax */}
      <motion.div className="hero-orb hero-orb-lavender" style={{ y: orbLavenderY }} />
      <motion.div className="hero-orb hero-orb-pink" style={{ y: orbPinkY }} />

      <div className="content-wrapper hero-layout-container">
        
        {/* =========================================================
            HERO MAIN STAGE: EXACT PROPORTIONS TO REFERENCE IMAGE
            - "PORTFOLIO" outline spans 3/4 across the center, thinner stroke
            - "My" in Silver Editorial Italic perched above 'P'
            - Portrait slightly decreased in size, overlapping 'PORTFOLIO'
            - "Full Stack Developer" in ONE single line
            - "Developer" has top white to bottom light lavender pink gradient
            - Smooth white/transparent gradient fade on portrait bottom
            ========================================================= */}
        <div className="hero-composite-stage">

          {/* Large Outlined Display: 3/4 Center "PORTFOLIO" with smooth scroll parallax */}
          <motion.div
            className="hero-masthead-center-wrapper"
            style={{ y: mastheadY, scale: mastheadScale, opacity: mastheadOpacity }}
          >
            <div className="hero-masthead-lockup">
              <motion.span
                initial={{ opacity: 0, y: -20, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="masthead-my-editorial"
              >
                My
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="masthead-portfolio-outline"
              >
                PORTFOLIO
              </motion.h1>
            </div>
          </motion.div>

          {/* Dual-Column Main Content Zone with proper vertical downward flow */}
          <div className="hero-content-split">
            
            {/* LEFT: Text Hierarchy & Calls to Action with slight smooth scroll float & fade */}
            <motion.div
              className="hero-details-column"
              style={{ y: textColumnY, opacity: textColumnOpacity }}
            >
              
              {/* Lead-in Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hero-subtitle-row"
              >
                <span>My Name is</span>
                <span className="subtitle-name-accent">Jershika</span>
                <span>and I am a</span>
              </motion.div>

              {/* Primary Signature Headline: Full Stack Developer in ONE LINE */}
              <div className="hero-signature-headline">
                <motion.span
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="headline-fullstack-sans"
                >
                  Full Stack
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 22, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                  className="headline-developer-editorial"
                >
                  Developer
                </motion.span>
              </div>

              {/* Honors Badge & College Info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.62 }}
                className="hero-honors-row"
              >
                <div className="honors-badge-pill">
                  <Award size={14} className="badge-icon" />
                  <span>8.51 CGPA Honors Graduate</span>
                </div>
                <span className="honors-dot">•</span>
                <span className="honors-college">Ponjesly College of Engineering</span>
              </motion.div>

              {/* Editorial Summary Bio */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.76 }}
                className="hero-bio-text"
              >
                Architecting robust enterprise services with <strong>Spring Boot & PostgreSQL</strong>, 
                and crafting intuitive, high-performance web applications with <strong>React.js</strong>. 
                Dedicated to clean architecture, fast API latencies, and modern user experiences.
              </motion.p>

              {/* Action Buttons & Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.88 }}
                className="hero-actions-container"
              >
                <motion.button
                  onClick={onOpenResumeModal}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-lavender-primary"
                >
                  <FileDown size={17} />
                  <span>Download Resume</span>
                </motion.button>

                <motion.a
                  href="#about"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-lavender-secondary"
                >
                  <span>Explore Profile</span>
                  <ArrowRight size={16} />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-lavender-ghost"
                >
                  <Mail size={15} />
                  <span>Get in Touch</span>
                </motion.a>

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

            </motion.div>

            {/* RIGHT: High-Res Portrait Stage Overlapping 'PORTFOLIO' with smooth scroll parallax */}
            <motion.div
              className="hero-portrait-column"
              style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
            >
              <div className="portrait-ambient-glow" />

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="portrait-canvas-stage"
              >
                <div
                  ref={imageWrapperRef}
                  className="portrait-interactive-container"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
                >
                  {/* BASE LAYER: Grayscale Portrait with Seamless Bottom Fade */}
                  <img
                    ref={bwImageRef}
                    src="/jershika.png"
                    alt="Jershika C — Full Stack Developer"
                    className="portrait-base-image"
                    onLoad={() => {
                      setImageLoaded(true);
                      startLoopIfNeeded();
                    }}
                  />

                  {/* TOP LAYER: Interactive Water Ripple Color Reveal Canvas */}
                  <canvas
                    ref={canvasRef}
                    className="portrait-ripple-canvas"
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Styled Scoped CSS strictly adhering to user refinement and reference proportions */}
      <style>{`
        .fullscreen-hero-section {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 5.6rem;
          padding-bottom: 2rem;
          overflow: hidden;
          background-color: var(--bg-primary);
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
          top: 6%;
          right: 5%;
          width: clamp(340px, 38vw, 540px);
          height: clamp(340px, 38vw, 540px);
          background: radial-gradient(circle, rgba(216, 180, 254, 0.32) 0%, rgba(243, 232, 255, 0) 70%);
        }

        .hero-orb-pink {
          top: 30%;
          left: -4%;
          width: clamp(280px, 32vw, 460px);
          height: clamp(280px, 32vw, 460px);
          background: radial-gradient(circle, rgba(244, 114, 182, 0.22) 0%, rgba(253, 242, 248, 0) 70%);
        }

        .hero-layout-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1380px;
        }

        .hero-composite-stage {
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
        }

        /* =========================================================
           TOP MASTHEAD: "PORTFOLIO" (Full Page Starting from Margin)
           - Clean single hairline stroke (0.75px) & Delicate Opacity (0.22)
           - Uses 'Outfit' 800 uppercase for single unified outline with zero internal lines
           - "My" perched slightly touching the letter P
           ========================================================= */
        .hero-masthead-center-wrapper {
          display: block;
          width: 100%;
          position: relative;
          z-index: 1;
          margin-bottom: 0;
          will-change: transform, opacity;
        }

        .hero-masthead-lockup {
          position: relative;
          display: block;
          width: 100%;
          user-select: none;
        }

        .masthead-my-editorial {
          position: absolute;
          top: -2.35rem;
          left: 0.12rem;
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: clamp(3rem, 6vw, 6.4rem);
          font-weight: 500;
          color: #110D17;
          line-height: 1;
          letter-spacing: -0.01em;
          z-index: 4;
          display: inline-block;
          transform: rotate(-2.5deg);
        }

        .masthead-portfolio-outline {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(5rem, 15vw, 17.5rem);
          line-height: 0.84;
          letter-spacing: 0.03em;
          color: transparent;
          -webkit-text-stroke: 0.75px #94A3B8;
          text-stroke: 0.75px #94A3B8;
          opacity: 0.22;
          margin: 0;
          padding: 0;
          display: block;
          width: 100%;
          text-align: left;
          white-space: nowrap;
        }

        /* =========================================================
           MAIN TWO-COLUMN SPLIT
           Left: Content & CTAs | Right: Overlapping Portrait
           ========================================================= */
        .hero-content-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          width: 100%;
          margin-top: 0.5rem;
        }

        @media (min-width: 980px) {
          .hero-masthead-center-wrapper {
            margin-bottom: 0.2rem;
          }

          .hero-content-split {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 1.5rem;
            align-items: flex-start;
          }

          /* Downward repositioning of lower text */
          .hero-details-column {
            margin-top: 1.6rem;
          }

          /* Image moved down: top of hair only slightly touches the bottom stroke of PORTFOLIO */
          .hero-portrait-column {
            justify-content: flex-end;
            margin-top: 4.8rem;
            z-index: 3;
          }

          .portrait-interactive-container {
            height: clamp(300px, 34vw, 420px);
          }
        }

        .hero-details-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          z-index: 3;
          will-change: transform, opacity;
        }

        /* Subtitle: "My Name is Jershika and I am a" */
        .hero-subtitle-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: clamp(1rem, 1.35vw, 1.25rem);
          font-weight: 500;
          color: #645674;
          margin-bottom: 0.6rem;
          letter-spacing: -0.01em;
        }

        .subtitle-name-accent {
          color: #9333EA;
          font-weight: 700;
        }

        /* Headline: Full Stack Developer in ONE LINE
           Developer gradient: Soft orchid/lavender-pink to vivid fuchsia & rich purple matching reference */
        .hero-signature-headline {
          display: flex;
          align-items: baseline;
          flex-wrap: nowrap;
          gap: 0.65rem 0.95rem;
          margin-bottom: 1.25rem;
          line-height: 1.05;
          white-space: nowrap;
        }

        .headline-fullstack-sans {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 4.8vw, 4.8rem);
          font-weight: 900;
          color: #120D1A;
          letter-spacing: -0.04em;
          line-height: 1;
          white-space: nowrap;
        }

        .headline-developer-editorial {
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: clamp(2.9rem, 5.5vw, 5.4rem);
          font-weight: 500;
          background: linear-gradient(110deg, 
            #F0ABFC 0%, 
            #E879F9 20%, 
            #D946EF 46%, 
            #C026D3 70%, 
            #9333EA 86%, 
            #F0ABFC 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          letter-spacing: -0.015em;
          display: inline-block;
          white-space: nowrap;
          animation: developerGradientLoop 5s linear infinite;
          will-change: background-position;
        }

        @keyframes developerGradientLoop {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        /* Honors Pill & College */
        .hero-honors-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
          font-size: 0.885rem;
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
          font-size: 0.815rem;
          padding: 0.32rem 0.8rem;
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

        /* Bio Text */
        .hero-bio-text {
          font-size: clamp(0.96rem, 1.15vw, 1.06rem);
          color: #645674;
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 1.85rem;
        }

        /* Actions Container: ONE SINGLE LINE with Liquid Glass Theme */
        .hero-actions-container {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 0.65rem;
          width: 100%;
        }

        .btn-lavender-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: linear-gradient(135deg, rgba(29, 21, 39, 0.92) 0%, rgba(45, 25, 65, 0.88) 100%);
          backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          color: #FFFFFF;
          padding: 0.72rem 1.35rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.865rem;
          letter-spacing: -0.01em;
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 
            0 8px 24px -3px rgba(29, 21, 39, 0.28),
            0 4px 12px rgba(147, 51, 234, 0.2),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.65),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.35);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-lavender-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, transparent 55%);
          border-radius: inherit;
          pointer-events: none;
        }

        .btn-lavender-primary:hover {
          transform: translateY(-2px) scale(1.02);
          background: linear-gradient(135deg, rgba(54, 31, 77, 0.96) 0%, rgba(93, 33, 138, 0.92) 100%);
          border-color: rgba(255, 255, 255, 0.55);
          box-shadow: 
            0 12px 34px -4px rgba(147, 51, 234, 0.4),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.85);
        }

        .btn-lavender-secondary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.38) 100%);
          backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          color: #1D1527;
          border: 1px solid rgba(255, 255, 255, 0.88);
          padding: 0.72rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.865rem;
          box-shadow: 
            0 6px 20px -3px rgba(147, 51, 234, 0.08),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.98),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.04),
            inset 0 0 0 1px rgba(255, 255, 255, 0.45);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-lavender-secondary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, transparent 55%);
          border-radius: inherit;
          pointer-events: none;
        }

        .btn-lavender-secondary:hover {
          transform: translateY(-2px) scale(1.02);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.58) 100%);
          border-color: rgba(255, 255, 255, 1);
          color: #9333EA;
          box-shadow: 
            0 12px 28px -4px rgba(147, 51, 234, 0.16),
            inset 0 1.5px 2.5px 0 rgba(255, 255, 255, 1);
        }

        .btn-lavender-ghost {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 100%);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          color: #645674;
          padding: 0.72rem 1rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.85rem;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 
            0 4px 14px -2px rgba(147, 51, 234, 0.05),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.8);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-lavender-ghost:hover {
          color: #9333EA;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(243, 232, 255, 0.5) 100%);
          border-color: rgba(216, 180, 254, 0.7);
        }

        .hero-social-connectors {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-left: 0.2rem;
          flex-shrink: 0;
        }

        .social-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.38) 100%);
          backdrop-filter: blur(20px) saturate(190%);
          -webkit-backdrop-filter: blur(20px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.88);
          color: #1D1527;
          box-shadow: 
            0 4px 14px rgba(147, 51, 234, 0.06),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.95);
          text-decoration: none;
          flex-shrink: 0;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .social-btn:hover {
          border-color: rgba(255, 255, 255, 1);
          color: #9333EA;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(243, 232, 255, 0.7) 100%);
          box-shadow: 
            0 8px 24px -2px rgba(147, 51, 234, 0.18),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 1);
        }

        /* =========================================================
           RIGHT PORTRAIT STAGE: SLIGHTLY DECREASED IN SIZE
           - High-res portrait positioned overlapping right side
           - Smooth bottom gradient fade (zero lower edges visible)
           - Smooth, slower, wide-range mouse ripple animation
           ========================================================= */
        .hero-portrait-column {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
          z-index: 3;
          will-change: transform, opacity;
        }

        @media (min-width: 980px) {
          .hero-portrait-column {
            justify-content: flex-end;
            margin-top: -1.2rem;
            z-index: 3;
          }

          .portrait-interactive-container {
            height: clamp(300px, 34vw, 420px);
          }
        }

        .portrait-ambient-glow {
          position: absolute;
          width: clamp(240px, 28vw, 350px);
          height: clamp(240px, 28vw, 350px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.26) 0%, rgba(192, 132, 252, 0.2) 45%, transparent 70%);
          filter: blur(45px);
          pointer-events: none;
          z-index: 0;
          bottom: 10%;
          right: 5%;
        }

        .portrait-canvas-stage {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          cursor: crosshair;
          z-index: 2;
        }

        .portrait-interactive-container {
          position: relative;
          display: inline-block;
          height: clamp(280px, 34vw, 440px);
          width: auto;
          max-width: 100%;
          mask-image: linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,1) 58%, 
            rgba(0,0,0,0.65) 75%, 
            rgba(0,0,0,0.2) 88%, 
            rgba(0,0,0,0) 98%);
          -webkit-mask-image: linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%, 
            rgba(0,0,0,1) 58%, 
            rgba(0,0,0,0.65) 75%, 
            rgba(0,0,0,0.2) 88%, 
            rgba(0,0,0,0) 98%);
        }

        /* BASE LAYER: Grayscale with High Clarity */
        .portrait-base-image {
          height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          filter: grayscale(100%) contrast(1.06) brightness(0.97);
          display: block;
          user-select: none;
          pointer-events: none;
        }

        /* TOP LAYER: Interactive Canvas Water Ripple Color Reveal */
        .portrait-ripple-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
        }



        /* =========================================================
           RESPONSIVE REFINEMENTS
           ========================================================= */
        @media (max-width: 979px) {
          .hero-masthead-lockup {
            margin-bottom: 0.5rem;
          }

          .masthead-portfolio-outline {
            font-size: clamp(3.2rem, 12vw, 6.2rem);
          }

          .masthead-my-editorial {
            top: -1.75rem;
            font-size: clamp(2rem, 6vw, 3.2rem);
          }

          .hero-portrait-column {
            order: -1;
            margin-bottom: 1rem;
          }

          .portrait-interactive-container {
            height: clamp(250px, 50vw, 340px);
          }
        }

        @media (max-width: 640px) {
          .fullscreen-hero-section {
            padding-top: 5rem;
          }

          .headline-fullstack-sans {
            font-size: 2.15rem;
          }

          .headline-developer-editorial {
            font-size: 2.45rem;
          }

          .hero-actions-container {
            width: 100%;
          }

          .btn-lavender-primary, .btn-lavender-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
