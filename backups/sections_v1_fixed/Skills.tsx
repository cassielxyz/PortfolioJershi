import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { SKILLS_DECK, SKILL_CATEGORIES_TABS, type SkillCardItem } from '../data/skillsDeckData';
import { TechLogo } from './TechLogos';

// =========================================================
// MINIMAL TRANSPARENT LIQUID GLASS SPIDER-SENSE
// Radiates physically behind the card in 3D (translateZ: -30px)
// with subtle frosted glass caustics & delicate ethereal arcs
// =========================================================
interface SpiderSenseProps {
  isHovered: boolean;
}

const SpiderSenseBehindCard: React.FC<SpiderSenseProps> = ({ isHovered }) => {
  return (
    <div className={`spider-sense-liquid-aura ${isHovered ? 'aura-visible' : ''}`} aria-hidden="true">
      <svg className="spider-sense-svg-canvas" viewBox="0 0 400 480" fill="none">
        <defs>
          {/* Transparent Liquid Glass Specular Caustic Gradient */}
          <linearGradient id="spideyLiquidGlassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#F5D0FE" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#E0E7FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.75" />
          </linearGradient>

          {/* Transparent Frosted Glass Caustic Halo Backdrop */}
          <radialGradient id="spideyAuraBackdrop" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
            <stop offset="40%" stopColor="#F5D0FE" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#E0E7FF" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#FAF7FC" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Frosted Halo directly behind the card */}
        <ellipse cx="200" cy="240" rx="175" ry="215" fill="url(#spideyAuraBackdrop)" />

        {/* 1. Crown Wave (Radiating softly above card crown) */}
        <g className="spidey-arc-group top-arcs">
          <path 
            d="M 95,58 Q 150,22 200,42 T 250,22 T 305,58" 
            stroke="url(#spideyLiquidGlassReflect)" 
            strokeWidth="1.3" 
            strokeLinecap="round" 
            className="spidey-wave spidey-channel-glass" 
          />
          <path 
            d="M 125,40 Q 165,12 200,28 T 235,12 T 275,40" 
            stroke="rgba(255, 255, 255, 0.6)" 
            strokeWidth="1.1" 
            strokeLinecap="round" 
            className="spidey-wave spidey-channel-glass glass-delay-1" 
          />
        </g>

        {/* 2. Top-Left & Top-Right Corner Caustics */}
        <g className="spidey-arc-group corner-arcs">
          <path 
            d="M 85,82 Q 55,50 32,58" 
            stroke="url(#spideyLiquidGlassReflect)" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            className="spidey-wave spidey-channel-glass glass-delay-2" 
          />
          <path 
            d="M 315,82 Q 345,50 368,58" 
            stroke="url(#spideyLiquidGlassReflect)" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            className="spidey-wave spidey-channel-glass glass-delay-2" 
          />
        </g>

        {/* 3. Left & Right Flank Delicate Caustic Arcs */}
        <g className="spidey-arc-group flank-arcs">
          <path 
            d="M 68,140 Q 34,200 64,260 T 36,350 T 66,400" 
            stroke="url(#spideyLiquidGlassReflect)" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            className="spidey-wave spidey-channel-glass glass-delay-3" 
          />
          <path 
            d="M 332,140 Q 366,200 336,260 T 364,350 T 334,400" 
            stroke="url(#spideyLiquidGlassReflect)" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            className="spidey-wave spidey-channel-glass glass-delay-3" 
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================
// DECK CARD ITEM
// Independent Wobble, Framer Spring Flip Anywhere, Behind Aura
// =========================================================
interface DeckCardItemProps {
  card: SkillCardItem;
  index: number;
  progress: MotionValue<number>;
  isFlipped: boolean;
  onFlipToggle: () => void;
  onSelect: () => void;
  isCentered: boolean;
}

const DeckCardItem: React.FC<DeckCardItemProps> = ({
  card,
  index,
  progress,
  isFlipped,
  onFlipToggle,
  onSelect,
  isCentered
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fractional distance from the centered index (e.g. -2.0, -1.0, 0.0, 1.0)
  const delta = useTransform(progress, (curr: number) => index - curr);

  // Smooth continuous positioning with strictly monotonic depth sorting
  const x = useTransform(delta, (d: number) => d * 235);
  const rotateY = useTransform(delta, (d: number) => Math.max(-28, Math.min(28, d * -18)));
  // Monotonic depth: center is z=120, each card away drops smoothly in 3D depth (NO flat clamp, NO z-fighting)
  const z = useTransform(delta, (d: number) => 120 - Math.abs(d) * 45);
  const scale = useTransform(delta, (d: number) => Math.max(0.72, 1.04 - Math.abs(d) * 0.1));
  const opacity = useTransform(delta, (d: number) => {
    const abs = Math.abs(d);
    if (abs < 0.6) return 1;
    return Math.max(0.08, 1 - (abs - 0.5) * 0.45);
  });
  // Smooth zIndex: active card has highest z-index, drops strictly with distance
  const zIndex = useTransform(delta, (d: number) => Math.round(100 - Math.abs(d) * 6));

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Clicking ANYWHERE on the card flips it!
    onFlipToggle();
    if (!isCentered) {
      onSelect();
    }
  };

  return (
    <motion.div
      className={`card-deck-slot ${isCentered ? 'is-centered' : ''}`}
      style={{
        x,
        rotateY,
        z,
        scale,
        opacity,
        zIndex,
        pointerEvents: 'auto',
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* 1. Spider-Sense Liquid Glass Aura BEHIND THE CARD (In 3D space: translateZ(-35px)) */}
      <SpiderSenseBehindCard isHovered={isHovered} />

      {/* 2. Tactile Wobble Layer (Only wobbles on hover, completely isolated from 3D flip) */}
      <div 
        className={`card-wobble-layer ${isHovered ? 'wobbling' : ''}`}
        onClick={handleCardClick}
      >
        
        {/* 3. 3D Flippable Core (Framer Motion spring flip) */}
        <motion.div 
          className="card-flipper-core"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.8 }}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={handleCardClick}
        >
          {/* ===================================================
              FRONT FACE: Authentic Official Tech Logo & Details
              =================================================== */}
          <div className="card-face card-front" onClick={handleCardClick}>
            {/* Specular Liquid Edge Refraction */}
            <div className="card-liquid-specular-top" />
            <div className="card-ambient-edge-highlight" />

            {/* Top Chrome */}
            <div className="card-top-chrome">
              <span className="card-serial-no font-mono">{card.number}</span>
              <span className="card-category-tag font-mono">{card.categoryLabel}</span>
              <span className="card-badge-pill">{card.badge}</span>
            </div>

            {/* Center Inset Well with OFFICIAL BRAND LOGO */}
            <div className="card-logo-center-stage">
              <div className="card-logo-orb-well">
                <TechLogo name={card.name} size={46} className="card-official-logo" />
              </div>
              <div className="card-logo-reflection-glow" />
            </div>

            {/* Content Lockup */}
            <div className="card-content-lockup">
              <h3 className="card-tech-title">{card.name}</h3>
              <div className="card-version-row font-mono">
                <span className="card-version-tag">{card.version}</span>
                <span className="card-metric-highlight">{card.highlightMetric}</span>
              </div>
              <p className="card-architecture-role">{card.architectureRole}</p>
            </div>

            {/* Bottom Footer with Discrete Barcode */}
            <div className="card-bottom-footer font-mono">
              <div className="card-barcode-pattern" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <span className="card-footer-spec font-mono">{card.number} // PROD</span>
            </div>
          </div>

          {/* ===================================================
              BACK FACE: Architecture Specifications & Guarantees
              =================================================== */}
          <div className="card-face card-back" onClick={handleCardClick}>
            {/* Specular Liquid Edge */}
            <div className="card-liquid-specular-top" />

            {/* Back Card Header */}
            <div className="card-back-header">
              <div className="card-back-title-lockup">
                <div className="card-back-badge font-mono">
                  <span className="back-pulse-dot" />
                  <span>ARCHIVE {card.number}</span>
                </div>
                <h4 className="card-back-title">{card.name}</h4>
                <span className="card-back-version font-mono">{card.version} — {card.highlightMetricLabel}</span>
              </div>
            </div>

            {/* Architecture Summary */}
            <p className="card-back-summary">
              {card.description}
            </p>

            {/* 3 Production Guarantees */}
            <div className="card-back-guarantees">
              <div className="guarantees-header font-mono">
                <Layers size={10} />
                <span>PRODUCTION GUARANTEES</span>
              </div>
              <div className="guarantees-list">
                {card.keyCapabilities.slice(0, 3).map((cap, cIdx) => (
                  <div key={cIdx} className="guarantee-row">
                    <CheckCircle2 size={12} className="guarantee-icon" />
                    <span className="guarantee-text">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ecosystem Stack Pillars */}
            <div className="card-back-ecosystem font-mono">
              <div className="ecosystem-header">
                <Sparkles size={10} />
                <span>STACK PILLARS</span>
              </div>
              <div className="ecosystem-pills">
                {card.relatedPills.slice(0, 4).map((pill, pIdx) => (
                  <span key={pIdx} className="back-pill">{pill}</span>
                ))}
              </div>
            </div>

            {/* Back Card Footer */}
            <div className="card-back-footer font-mono">
              <span className="back-metric-tag">{card.highlightMetric}</span>
              <span className="card-footer-spec font-mono">{card.number} // ARCHIVE</span>
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

// =========================================================
// MAIN SKILLS SECTION COMPONENT
// =========================================================
export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const runwayRef = useRef<HTMLDivElement | null>(null);

  // Filter cards by category
  const filteredCards = useMemo(() => {
    if (activeCategory === 'all') return SKILLS_DECK;
    return SKILLS_DECK.filter((card) => card.category === activeCategory);
  }, [activeCategory]);

  const maxCard = filteredCards.length - 1;

  // =========================================================
  // NATIVE PINNED SCROLL RUNWAY:
  // Strictly tied to scroll position (100% respective to user scroll)
  // - Cards start moving ONLY when the stage is pinned in the center!
  // - Start buffer [0, 0.05]: Card 0 is centered & stationary
  // - Active reveal [0.05, 0.95]: Cards 0 to 15 revealed seamlessly
  // - End buffer [0.95, 1.0]: Card 15 is centered & stationary before Experience
  // - Forward & Backward are 100% physically symmetric in the runway!
  // =========================================================
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  // Direct 1:1 mapping from runway scroll to card index
  const rawCardProgress = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [0, maxCard],
    { clamp: true }
  );

  // Fluid Liquid Glass inertia damping (smooths mouse wheel steps, zero auto-pilot)
  const smoothCardProgress = useSpring(rawCardProgress, {
    stiffness: 240,
    damping: 32,
    mass: 0.22,
  });

  // Sync active dot in pagination row
  useEffect(() => {
    const unsubscribe = smoothCardProgress.on('change', (curr: number) => {
      const rounded = Math.max(0, Math.min(maxCard, Math.round(curr)));
      setActiveCardIndex(rounded);
    });
    return () => unsubscribe();
  }, [smoothCardProgress, maxCard]);

  // Toggle Flip Handler
  const toggleFlip = useCallback((cardId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  }, []);

  // Snapped Card Selection from dots or click
  const handleSelectCard = useCallback((targetIdx: number) => {
    const el = runwayRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(maxCard, targetIdx));

    const rect = el.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const runwayTop = rect.top + currentScrollY;
    const scrollDistance = el.offsetHeight - window.innerHeight;

    const normalized = maxCard > 0 ? clamped / maxCard : 0;
    const targetProgress = 0.05 + normalized * 0.90;
    const targetScrollY = runwayTop + targetProgress * scrollDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }, [maxCard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (activeCardIndex > 0) handleSelectCard(activeCardIndex - 1);
      } else if (e.key === 'ArrowRight') {
        if (activeCardIndex < maxCard) handleSelectCard(activeCardIndex + 1);
      } else if (e.key === ' ' || e.key === 'Enter') {
        const currentCard = filteredCards[activeCardIndex];
        if (currentCard) toggleFlip(currentCard.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex, filteredCards, handleSelectCard, toggleFlip, maxCard]);

  return (
    <div 
      id="skills"
      ref={runwayRef} 
      className="skills-pinned-runway"
    >
      {/* Pinned Sticky Viewport Stage: Centered Vertically in Screen */}
      <div className="skills-sticky-stage">
        
        {/* Soft Ambient Drift */}
        <div className="skills-ambient-drift" aria-hidden="true" />

        <div className="skills-inner-content">
          
          {/* =========================================================
              CLEAN SECTION HEADER (Zero Description, Skills & Expertise)
              ========================================================= */}
          <div className="skills-header-lockup">
            <div className="skills-mono-eyebrow">
              <span className="eyebrow-index">02</span>
              <span className="eyebrow-divider">/</span>
              <span className="eyebrow-title">SKILLS & EXPERTISE</span>
            </div>

            <h2 className="skills-headline">
              Skills <span className="headline-ampersand">&amp;</span>{' '}
              <span className="headline-editorial-italic">Technical Expertise</span>
            </h2>

            {/* Apple Transparent Liquid Glass Filter Tabs */}
            <div className="skills-filter-tabs-nav" role="tablist" aria-label="Filter tech cards">
              {SKILL_CATEGORIES_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`skills-filter-pill ${isActive ? 'filter-active' : ''}`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================
              3D PHYSICAL CARDS STAGE (Snapping Centered)
              ========================================================= */}
          <div className="skills-3d-stage">
            <div className="skills-cards-track">
              {filteredCards.map((card, idx) => {
                const isFlipped = !!flippedCards[card.id];
                const isCentered = idx === activeCardIndex;

                return (
                  <DeckCardItem
                    key={card.id}
                    card={card}
                    index={idx}
                    progress={smoothCardProgress}
                    isFlipped={isFlipped}
                    isCentered={isCentered}
                    onFlipToggle={() => toggleFlip(card.id)}
                    onSelect={() => handleSelectCard(idx)}
                  />
                );
              })}
            </div>
          </div>

          {/* Tactile Pagination Dots Row */}
          <div className="deck-dots-indicator-row" role="navigation" aria-label="Deck card navigation">
            {filteredCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleSelectCard(idx)}
                className={`deck-dot-step ${idx === activeCardIndex ? 'dot-active' : ''}`}
                aria-label={`Jump to card ${idx + 1}: ${card.name}`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* =========================================================
          SCOPED STYLES
          ========================================================= */}
      <style>{`
        /* =========================================================
           PINNED SCROLL RUNWAY & STICKY STAGE
           ========================================================= */
        .skills-pinned-runway {
          position: relative;
          width: 100%;
          height: clamp(3400px, 420vh, 4800px);
          background: linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          margin-bottom: 2.5rem;
        }

        .skills-sticky-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          max-height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 1rem;
          box-sizing: border-box;
          z-index: 10;
        }

        .skills-ambient-drift {
          position: absolute;
          top: 30%;
          right: -10%;
          width: clamp(260px, 32vw, 480px);
          height: clamp(260px, 32vw, 480px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 208, 254, 0.22) 0%, rgba(250, 247, 252, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        .skills-inner-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        /* ---------------------------------------------------------
           COMPACT SECTION HEADER (Zero Top Cropping)
           --------------------------------------------------------- */
        .skills-header-lockup {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 0.85rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .skills-mono-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.2rem 0.7rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(226, 224, 235, 0.9);
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
          margin-bottom: 0.4rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          color: #63606E;
        }

        .eyebrow-index {
          color: #8E8B99;
          font-weight: 700;
        }
        .eyebrow-divider {
          color: #D4D1DC;
        }
        .eyebrow-title {
          font-weight: 600;
        }

        .skills-headline {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: clamp(1.85rem, 3.2vw, 2.6rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #121116;
          margin: 0 0 0.85rem 0;
        }

        .headline-ampersand {
          color: #8E8B99;
          font-weight: 300;
        }

        .headline-editorial-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #121116 0%, #63606E 60%, #F5D0FE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ---------------------------------------------------------
           APPLE TRANSPARENT LIQUID GLASS CATEGORY NAV
           --------------------------------------------------------- */
        .skills-filter-tabs-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          padding: 0.2rem 0;
          margin-bottom: 0.85rem;
        }
        .skills-filter-tabs-nav::-webkit-scrollbar {
          display: none;
        }

        .skills-filter-pill {
          position: relative;
          padding: 0.42rem 1.05rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow: 
            inset 0 1px 1.5px rgba(255, 255, 255, 0.95),
            inset 0 -1px 1px rgba(0, 0, 0, 0.03),
            0 4px 16px rgba(0, 0, 0, 0.03);
          color: #373342;
          font-size: 0.74rem;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skills-filter-pill:hover {
          background: rgba(255, 255, 255, 0.48);
          border-color: rgba(255, 255, 255, 0.9);
          color: #121116;
          transform: translateY(-1px);
          box-shadow: 
            inset 0 1px 2px #FFFFFF,
            0 8px 24px rgba(0, 0, 0, 0.07);
        }

        .skills-filter-pill.filter-active {
          background: rgba(255, 255, 255, 0.78);
          border-color: rgba(245, 208, 254, 0.95);
          color: #121116;
          font-weight: 600;
          box-shadow: 
            inset 0 1.5px 2px #FFFFFF,
            0 6px 22px rgba(245, 208, 254, 0.45),
            0 2px 8px rgba(0, 0, 0, 0.04);
        }

        /* ---------------------------------------------------------
           3D PHYSICAL CARDS STAGE
           --------------------------------------------------------- */
        .skills-3d-stage {
          position: relative;
          width: 100%;
          height: 385px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          perspective-origin: center center;
          margin-bottom: 0.85rem;
        }

        .skills-cards-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        /* The Card Outer Slot */
        .card-deck-slot {
          position: absolute;
          width: 285px;
          height: 380px;
          cursor: pointer;
          transform-origin: center center;
          will-change: transform, opacity;
          user-select: none;
        }

        /* ---------------------------------------------------------
           MINIMAL TRANSPARENT LIQUID GLASS SPIDER-SENSE (BEHIND CARD)
           translateZ(-30px) sits PHYSICALLY BEHIND in 3D perspective
           --------------------------------------------------------- */
        .spider-sense-liquid-aura {
          position: absolute;
          inset: -45px -55px;
          pointer-events: none;
          opacity: 0;
          transform: translateZ(-30px);
          transform-style: preserve-3d;
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0; /* BEHIND THE CARD FACES IN 3D */
        }

        .spider-sense-liquid-aura.aura-visible {
          opacity: 1;
          transform: translateZ(-30px) scale(1.04);
        }

        .spider-sense-svg-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* Minimal Transparent Liquid Glass Arc Styling */
        .spidey-wave.spidey-channel-glass {
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.75)) drop-shadow(0 0 8px rgba(245, 208, 254, 0.3));
          animation: spideyGlassGentleCaustic 2.8s ease-in-out infinite alternate;
        }

        .spidey-channel-glass.glass-delay-1 {
          animation-delay: 0.4s;
        }

        .spidey-channel-glass.glass-delay-2 {
          animation-delay: 0.8s;
        }

        .spidey-channel-glass.glass-delay-3 {
          animation-delay: 1.2s;
        }

        @keyframes spideyGlassGentleCaustic {
          0% {
            opacity: 0.45;
            stroke-width: 1.1px;
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 5px rgba(245, 208, 254, 0.2));
          }
          50% {
            opacity: 0.85;
            stroke-width: 1.4px;
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 10px rgba(245, 208, 254, 0.45));
          }
          100% {
            opacity: 0.45;
            stroke-width: 1.1px;
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 5px rgba(245, 208, 254, 0.2));
          }
        }

        /* ---------------------------------------------------------
           TACTILE HOVER WOBBLE LAYER (Minimal & Reduced Float)
           --------------------------------------------------------- */
        .card-wobble-layer {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 5;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-wobble-layer.wobbling {
          animation: cardHoverGentleFloat 3s ease-in-out infinite alternate;
        }

        @keyframes cardHoverGentleFloat {
          0% { transform: translateY(-2px) rotate(-0.3deg); }
          50% { transform: translateY(-4px) rotate(0.3deg); }
          100% { transform: translateY(-2px) rotate(-0.15deg); }
        }

        /* ---------------------------------------------------------
           3D CARD FLIPPER CORE
           --------------------------------------------------------- */
        .card-flipper-core {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          border-radius: 22px;
        }

        .card-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 22px;
          background: linear-gradient(165deg, rgba(26, 25, 33, 0.97) 0%, rgba(13, 12, 17, 0.99) 100%);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #F8F8FA;
          padding: 1.35rem 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: 
            0 28px 65px -15px rgba(0, 0, 0, 0.5),
            0 8px 22px rgba(0, 0, 0, 0.25),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.35),
            inset 0 -1.5px 2px rgba(245, 208, 254, 0.12);
          overflow: hidden;
          z-index: 5;
        }

        .card-liquid-specular-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.75) 30%, rgba(245, 208, 254, 0.6) 70%, transparent 100%);
          z-index: 5;
        }

        .card-ambient-edge-highlight {
          position: absolute;
          top: 0;
          left: 0;
          width: 1.5px;
          height: 60%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 208, 254, 0.25) 80%, transparent 100%);
          z-index: 5;
        }

        /* ---------------------------------------------------------
           CARD FRONT FACE STYLING
           --------------------------------------------------------- */
        .card-front {
          z-index: 5;
          transform: rotateY(0deg);
        }

        .card-top-chrome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .card-serial-no {
          font-size: 0.72rem;
          font-weight: 700;
          color: #F5D0FE;
          letter-spacing: 0.12em;
        }

        .card-category-tag {
          font-size: 0.62rem;
          color: #8E8B99;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .card-badge-pill {
          font-size: 0.6rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #D4D1DC;
          padding: 0.12rem 0.45rem;
          border-radius: 9999px;
        }

        /* Center Inset Well with Official Colored Logo */
        .card-logo-center-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.85rem 0;
          z-index: 2;
        }

        .card-logo-orb-well {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.14) 0%, rgba(13, 12, 17, 0.85) 100%);
          border: 1px solid rgba(255, 255, 255, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.35);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-deck-slot:hover .card-logo-orb-well {
          border-color: rgba(245, 208, 254, 0.6);
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.5), 
            0 12px 30px rgba(0, 0, 0, 0.45),
            0 0 22px rgba(245, 208, 254, 0.25);
          transform: scale(1.04);
        }

        .card-logo-reflection-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 208, 254, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
        }

        .card-content-lockup {
          position: relative;
          z-index: 2;
        }

        .card-tech-title {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
        }

        .card-version-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          margin-bottom: 0.5rem;
        }

        .card-version-tag {
          color: #8E8B99;
        }

        .card-metric-highlight {
          color: #F5D0FE;
          font-weight: 700;
        }

        .card-architecture-role {
          font-size: 0.76rem;
          line-height: 1.45;
          color: #A3A0AF;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-bottom-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.62rem;
          color: #63606E;
          letter-spacing: 0.08em;
          position: relative;
          z-index: 2;
        }

        .card-barcode-pattern {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 12px;
        }

        .card-barcode-pattern span {
          display: inline-block;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
        }
        .card-barcode-pattern span:nth-child(1) { width: 1.5px; }
        .card-barcode-pattern span:nth-child(2) { width: 3px; }
        .card-barcode-pattern span:nth-child(3) { width: 1px; }
        .card-barcode-pattern span:nth-child(4) { width: 2px; }
        .card-barcode-pattern span:nth-child(5) { width: 1px; }
        .card-barcode-pattern span:nth-child(6) { width: 2.5px; }
        .card-barcode-pattern span:nth-child(7) { width: 1px; }
        .card-barcode-pattern span:nth-child(8) { width: 2px; }

        .card-flip-hint {
          color: #F5D0FE;
          font-size: 0.65rem;
          font-weight: 500;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        /* ---------------------------------------------------------
           CARD BACK FACE STYLING
           --------------------------------------------------------- */
        .card-back {
          transform: rotateY(180deg);
          background: linear-gradient(165deg, rgba(20, 19, 27, 0.98) 0%, rgba(10, 9, 14, 0.99) 100%);
        }

        .card-back-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 0.6rem;
        }

        .card-back-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.62rem;
          color: #F5D0FE;
          letter-spacing: 0.12em;
          margin-bottom: 0.15rem;
        }

        .back-pulse-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #F5D0FE;
          box-shadow: 0 0 5px rgba(245, 208, 254, 0.9);
        }

        .card-back-title {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .card-back-version {
          font-size: 0.65rem;
          color: #8E8B99;
        }

        .card-back-summary {
          font-size: 0.74rem;
          line-height: 1.45;
          color: #C7C4D0;
          margin: 0.55rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Guarantees Checklist */
        .card-back-guarantees {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          padding: 0.55rem 0.7rem;
          margin-bottom: 0.55rem;
        }

        .guarantees-header, .ecosystem-header {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #8E8B99;
          margin-bottom: 0.4rem;
        }

        .guarantees-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .guarantee-row {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
        }

        .guarantee-icon {
          color: #3ECF8E;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .guarantee-text {
          font-size: 0.7rem;
          line-height: 1.35;
          color: #E2E0E8;
        }

        /* Ecosystem Pillars */
        .card-back-ecosystem {
          margin-bottom: 0.55rem;
        }

        .ecosystem-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }

        .back-pill {
          font-size: 0.64rem;
          padding: 0.15rem 0.45rem;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #D4D1DC;
        }

        .card-back-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 0.55rem;
          font-size: 0.62rem;
        }

        .back-metric-tag {
          color: #F5D0FE;
          font-weight: 700;
        }

        .back-flip-return-hint {
          color: #8E8B99;
          font-size: 0.6rem;
        }

        /* ---------------------------------------------------------
           PAGINATION DOTS
           --------------------------------------------------------- */
        .deck-dots-indicator-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-top: 0.5rem;
        }

        .deck-dot-step {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #D4D1DC;
          border: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
        }

        .deck-dot-step.dot-active {
          width: 18px;
          border-radius: 9999px;
          background: #121116;
        }

        /* ---------------------------------------------------------
           RESPONSIVE REFINEMENTS
           --------------------------------------------------------- */
        @media (max-width: 768px) {
          .card-deck-slot {
            width: 260px;
            height: 360px;
          }
          .skills-3d-stage {
            height: 365px;
          }
          .skills-filter-pill {
            padding: 0.3rem 0.75rem;
            font-size: 0.68rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;
