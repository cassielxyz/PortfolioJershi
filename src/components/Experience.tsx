import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2,
  Sparkles,
  Layers,
  ChevronDown,
  Terminal,
  Cpu,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../data/portfolioData';
import { TechLogo } from './TechLogos';

type FilterType = 'all' | 'professional' | 'internship';

export const Experience: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [hoveredExpId, setHoveredExpId] = useState<string | null>(null);
  const [expandedDrawers, setExpandedDrawers] = useState<Record<string, boolean>>({
    'exp-imperial': true // Default open the current role for rich presentation
  });

  const toggleDrawer = (id: string) => {
    setExpandedDrawers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'professional') return exp.isCurrent || exp.type.toLowerCase().includes('professional');
    if (activeFilter === 'internship') return exp.type.toLowerCase().includes('internship');
    return true;
  });

  return (
    <section id="experience" className="experience-creative-section">
      {/* Ambient Atmospheric Drift */}
      <div className="experience-ambient-glow" aria-hidden="true" />

      <div className="experience-content-wrapper">
        
        {/* =========================================================
            EDITORIAL SECTION HEADER
            ========================================================= */}
        <motion.div
          className="experience-header-lockup"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="experience-mono-eyebrow">
            <span className="eyebrow-index">03</span>
            <span className="eyebrow-divider">/</span>
            <span className="eyebrow-title">PROFESSIONAL TRAJECTORY & EXPERIENCE</span>
          </div>

          <h2 className="experience-headline">
            Professional Experience <span className="headline-ampersand">&amp;</span>{' '}
            <span className="headline-editorial-italic">Engineering Milestones</span>
          </h2>

          <p className="experience-subheadline">
            Demonstrated engineering record across enterprise full-stack development, Python backend services,
            microservice API integration, and verifiable performance optimizations.
          </p>

          {/* Apple Liquid Glass Segmented Control Dock */}
          <div className="experience-filter-dock" role="tablist" aria-label="Filter career milestones">
            {[
              { id: 'all', label: 'All Milestones', count: experiences.length, icon: Layers },
              { id: 'professional', label: 'Production & Enterprise', count: experiences.filter(e => e.isCurrent || e.type.toLowerCase().includes('professional')).length, icon: Sparkles },
              { id: 'internship', label: 'Engineering Internships', count: experiences.filter(e => e.type.toLowerCase().includes('internship')).length, icon: Briefcase },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id as FilterType)}
                  className={`experience-filter-pill ${isActive ? 'filter-active' : ''}`}
                >
                  <Icon size={13} className="filter-tab-icon" />
                  <span>{tab.label}</span>
                  <span className="filter-count-badge font-mono">{tab.count}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* =========================================================
            CONTINUOUS TIMELINE TRACK WITH PHOTON BEAM
            ========================================================= */}
        <div className="experience-timeline-container">
          
          {/* Timeline Spine Line */}
          <div className="timeline-spine-track" aria-hidden="true">
            {/* Traveling Light Photon Beam */}
            <div className="timeline-photon-beam" />
          </div>

          {/* Timeline Milestones Stack */}
          <motion.div layout className="timeline-milestones-stack">
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp, idx) => {
                const isHovered = hoveredExpId === exp.id;
                const isExpanded = !!expandedDrawers[exp.id];

                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="timeline-item-row"
                  >
                    {/* ---------------------------------------------------------
                        INTERACTIVE TIMELINE NODE
                        --------------------------------------------------------- */}
                    <div 
                      className={`timeline-orbital-node ${exp.isCurrent ? 'current-role-node' : ''} ${isHovered ? 'node-hovered' : ''}`}
                      aria-hidden="true"
                    >
                      {exp.isCurrent ? (
                        <>
                          <div className="node-radar-wave" />
                          <div className="node-core-emerald" />
                        </>
                      ) : (
                        <div className="node-core-ash" />
                      )}
                    </div>

                    {/* ---------------------------------------------------------
                        APPLE LIQUID GLASS SPECIMEN CARD
                        --------------------------------------------------------- */}
                    <motion.div
                      className={`experience-liquid-card ${isHovered ? 'card-hovered' : ''} ${exp.isCurrent ? 'is-current-card' : ''}`}
                      onMouseEnter={() => setHoveredExpId(exp.id)}
                      onMouseLeave={() => setHoveredExpId(null)}
                      whileHover={{ y: -3 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    >
                      {/* Specular Liquid Top Glare */}
                      <div className="card-liquid-specular-top" />
                      <div className="card-ambient-refraction-edge" />

                      {/* Card Header Lockup */}
                      <div className="card-header-bar">
                        <div className="card-title-group">
                          <div className="card-role-title-row">
                            <h3 className="card-role-title">{exp.role}</h3>
                            {exp.highlightBadge && (
                              <span className={`card-badge-pill ${exp.isCurrent ? 'badge-current' : 'badge-highlight'} font-mono`}>
                                {exp.isCurrent && <span className="current-pulse-dot" />}
                                {exp.highlightBadge}
                              </span>
                            )}
                          </div>

                          {/* Company, Type & Location Meta */}
                          <div className="card-company-meta-row">
                            <span className="card-company-name">
                              <Building2 size={14} className="meta-icon" />
                              {exp.company}
                            </span>
                            <span className="meta-separator">•</span>
                            <span className="card-role-type font-mono">{exp.type}</span>
                            <span className="meta-separator">•</span>
                            <span className="card-location">
                              <MapPin size={13} className="meta-icon" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        {/* Period Capsule */}
                        <div className="card-period-capsule font-mono">
                          <Calendar size={13} className="period-icon" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Responsibilities & Achievements */}
                      <div className="card-responsibilities-list">
                        {exp.responsibilities.map((bullet, bIdx) => (
                          <div key={bIdx} className="responsibility-row">
                            <div className="responsibility-glyph">
                              <CheckCircle2 size={15} />
                            </div>
                            <span className="responsibility-text">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Deployed Chips with Official SVG Brand Logos */}
                      <div className="card-tech-deployed-bar">
                        <div className="tech-deployed-label font-mono">
                          <Cpu size={12} className="tech-label-icon" />
                          <span>TECH DEPLOYED:</span>
                        </div>
                        <div className="tech-pills-wrap">
                          {exp.techStack.map((tech, tIdx) => (
                            <motion.span
                              key={tIdx}
                              className="tech-liquid-pill"
                              whileHover={{ y: -2, scale: 1.03 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                              <TechLogo name={tech} size={15} className="tech-pill-logo" />
                              <span className="tech-pill-name">{tech}</span>
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* =========================================================
                          EXPANDABLE ARCHITECTURE DRAWER (Deep-Dive)
                          ========================================================= */}
                      {exp.architectureDetails && (
                        <div className="card-architecture-drawer-wrap">
                          <button
                            type="button"
                            onClick={() => toggleDrawer(exp.id)}
                            className="architecture-toggle-pill font-mono"
                            aria-expanded={isExpanded}
                            aria-label="Toggle system architecture details"
                          >
                            <Terminal size={13} className="drawer-terminal-icon" />
                            <span>System Architecture &amp; Engineering Impact</span>
                            <ChevronDown 
                              size={14} 
                              className={`drawer-chevron ${isExpanded ? 'chevron-rotated' : ''}`} 
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="architecture-expanded-content"
                              >
                                <div className="architecture-inner-well">
                                  {/* Deep Dive Summary */}
                                  <p className="architecture-summary-text">
                                    {exp.architectureDetails.summary}
                                  </p>

                                  {/* Key Architecture Outcomes */}
                                  <div className="architecture-outcomes-block">
                                    <span className="outcomes-header font-mono">SYSTEM GUARANTEES &amp; OUTCOMES:</span>
                                    <div className="outcomes-list">
                                      {exp.architectureDetails.outcomes.map((outcome, oIdx) => (
                                        <div key={oIdx} className="outcome-item">
                                          <ArrowUpRight size={13} className="outcome-arrow" />
                                          <span className="outcome-text">{outcome}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Key Deliverable Footprint */}
                                  <div className="architecture-footprint font-mono">
                                    <span className="footprint-label">CORE DELIVERABLE:</span>
                                    <span className="footprint-value">{exp.architectureDetails.keyDeliverable}</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* =========================================================
          SCOPED STYLES: Black, Ash, White + Apple Liquid Glass
          ========================================================= */}
      <style>{`
        /* ---------------------------------------------------------
           SECTION SHELL & BACKGROUND
           --------------------------------------------------------- */
        .experience-creative-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          padding: 5.5rem 1.5rem 6.5rem 1.5rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        .experience-ambient-glow {
          position: absolute;
          top: 20%;
          left: -5%;
          width: clamp(280px, 35vw, 550px);
          height: clamp(280px, 35vw, 550px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 208, 254, 0.28) 0%, rgba(250, 247, 252, 0) 70%);
          filter: blur(85px);
          pointer-events: none;
          z-index: 1;
        }

        .experience-content-wrapper {
          position: relative;
          z-index: 5;
          max-width: 980px;
          margin: 0 auto;
        }

        /* ---------------------------------------------------------
           EDITORIAL HEADER LOCKUP
           --------------------------------------------------------- */
        .experience-header-lockup {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 3.25rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .experience-mono-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.22rem 0.75rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(226, 224, 235, 0.9);
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
          margin-bottom: 0.5rem;
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

        .experience-headline {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: clamp(2rem, 3.8vw, 2.85rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #121118;
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
          background: linear-gradient(135deg, #121118 0%, #63606E 60%, #F5D0FE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .experience-subheadline {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #63606E;
          max-width: 620px;
          margin: 0 auto 1.75rem auto;
        }

        /* ---------------------------------------------------------
           APPLE LIQUID GLASS FILTER DOCK
           --------------------------------------------------------- */
        .experience-filter-dock {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.04),
            inset 0 1px 1.5px #FFFFFF;
          flex-wrap: wrap;
          justify-content: center;
        }

        .experience-filter-pill {
          position: relative;
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          background: transparent;
          border: 1px solid transparent;
          color: #63606E;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }

        .experience-filter-pill:hover {
          color: #121118;
          background: rgba(255, 255, 255, 0.55);
        }

        .experience-filter-pill.filter-active {
          background: #14131A;
          color: #FFFFFF;
          font-weight: 600;
          box-shadow: 
            0 4px 16px rgba(20, 19, 26, 0.25),
            inset 0 1px 1px rgba(255, 255, 255, 0.25);
        }

        .filter-tab-icon {
          opacity: 0.8;
        }

        .filter-count-badge {
          font-size: 0.68rem;
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          color: inherit;
        }

        .experience-filter-pill:not(.filter-active) .filter-count-badge {
          background: rgba(0, 0, 0, 0.05);
          color: #8E8B99;
        }

        /* ---------------------------------------------------------
           TIMELINE CONTAINER & SPINE
           --------------------------------------------------------- */
        .experience-timeline-container {
          position: relative;
          width: 100%;
          margin: 0 auto;
        }

        .timeline-spine-track {
          position: absolute;
          top: 28px;
          bottom: 28px;
          left: 20px;
          width: 2px;
          background: linear-gradient(180deg, rgba(226, 224, 235, 0.9) 0%, rgba(245, 208, 254, 0.6) 50%, rgba(226, 224, 235, 0.9) 100%);
          border-radius: 9999px;
          overflow: hidden;
          z-index: 2;
        }

        .timeline-photon-beam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: linear-gradient(180deg, transparent 0%, #FFFFFF 50%, #F5D0FE 80%, transparent 100%);
          border-radius: 9999px;
          animation: spinePhotonBeam 3.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          filter: drop-shadow(0 0 6px #F5D0FE);
        }

        @keyframes spinePhotonBeam {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(1100%); opacity: 0; }
        }

        .timeline-milestones-stack {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          width: 100%;
        }

        .timeline-item-row {
          position: relative;
          padding-left: 58px;
          box-sizing: border-box;
        }

        /* ---------------------------------------------------------
           INTERACTIVE TIMELINE NODE
           --------------------------------------------------------- */
        .timeline-orbital-node {
          position: absolute;
          left: 6px;
          top: 26px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .node-core-ash {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #14131A;
          border: 3px solid #FFFFFF;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
          transition: all 0.25s ease;
        }

        .node-core-emerald {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #16A34A;
          border: 3px solid #FFFFFF;
          box-shadow: 0 0 12px rgba(22, 163, 74, 0.6);
          position: relative;
          z-index: 2;
        }

        .node-radar-wave {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid rgba(22, 163, 74, 0.7);
          animation: nodePulseRing 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        @keyframes nodePulseRing {
          0% { transform: scale(0.85); opacity: 0.9; }
          100% { transform: scale(1.85); opacity: 0; }
        }

        .node-hovered .node-core-ash {
          transform: scale(1.25);
          background: #F5D0FE;
          box-shadow: 0 0 10px rgba(245, 208, 254, 0.8);
        }

        /* ---------------------------------------------------------
           APPLE LIQUID GLASS SPECIMEN CARD
           --------------------------------------------------------- */
        .experience-liquid-card {
          position: relative;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 16px 45px -12px rgba(18, 17, 26, 0.06),
            0 2px 10px rgba(0, 0, 0, 0.02),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          padding: 1.85rem 1.85rem 1.65rem 1.85rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .experience-liquid-card.card-hovered {
          border-color: rgba(245, 208, 254, 0.95);
          box-shadow: 
            0 22px 60px -15px rgba(18, 17, 26, 0.09),
            0 0 25px rgba(245, 208, 254, 0.25),
            inset 0 1.5px 2px #FFFFFF;
        }

        .experience-liquid-card.is-current-card {
          border-left: 3px solid #16A34A;
        }

        .card-liquid-specular-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 30%, rgba(245, 208, 254, 0.6) 70%, transparent 100%);
          pointer-events: none;
        }

        .card-ambient-refraction-edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 1.5px;
          height: 50%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, transparent 100%);
          pointer-events: none;
        }

        /* ---------------------------------------------------------
           CARD HEADER BAR
           --------------------------------------------------------- */
        .card-header-bar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .card-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .card-role-title-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .card-role-title {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: #121118;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .card-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
          letter-spacing: 0.04em;
        }

        .badge-current {
          background: rgba(22, 163, 74, 0.08);
          color: #15803D;
          border: 1px solid rgba(22, 163, 74, 0.25);
        }

        .current-pulse-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #16A34A;
          box-shadow: 0 0 6px rgba(22, 163, 74, 0.8);
        }

        .badge-highlight {
          background: rgba(245, 208, 254, 0.35);
          color: #4C1D95;
          border: 1px solid rgba(245, 208, 254, 0.75);
        }

        .card-company-meta-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: #63606E;
          flex-wrap: wrap;
        }

        .card-company-name {
          font-weight: 600;
          color: #1E1B29;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .meta-icon {
          color: #8E8B99;
          flex-shrink: 0;
        }

        .meta-separator {
          color: #D4D1DC;
          font-size: 0.7rem;
        }

        .card-role-type {
          color: #8E8B99;
          font-size: 0.74rem;
        }

        .card-location {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #63606E;
          font-size: 0.78rem;
        }

        .card-period-capsule {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(226, 224, 235, 0.9);
          color: #373342;
          font-size: 0.74rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .period-icon {
          color: #8E8B99;
        }

        /* ---------------------------------------------------------
           RESPONSIBILITIES LIST
           --------------------------------------------------------- */
        .card-responsibilities-list {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: 1.35rem;
        }

        .responsibility-row {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .responsibility-glyph {
          color: #16A34A;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .responsibility-text {
          font-size: 0.86rem;
          line-height: 1.55;
          color: #3F3C4D;
        }

        /* ---------------------------------------------------------
           TECH DEPLOYED BAR
           --------------------------------------------------------- */
        .card-tech-deployed-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid rgba(226, 224, 235, 0.75);
        }

        .tech-deployed-label {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #8E8B99;
        }

        .tech-label-icon {
          color: #8E8B99;
        }

        .tech-pills-wrap {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .tech-liquid-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(226, 224, 235, 0.9);
          box-shadow: 0 1.5px 4px rgba(0, 0, 0, 0.02);
          cursor: default;
        }

        .tech-pill-logo {
          flex-shrink: 0;
        }

        .tech-pill-name {
          font-size: 0.74rem;
          font-weight: 500;
          color: #2D2938;
        }

        /* ---------------------------------------------------------
           EXPANDABLE ARCHITECTURE DRAWER
           --------------------------------------------------------- */
        .card-architecture-drawer-wrap {
          margin-top: 1rem;
        }

        .architecture-toggle-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(20, 19, 26, 0.04);
          border: 1px solid rgba(226, 224, 235, 0.8);
          color: #4C4859;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .architecture-toggle-pill:hover {
          background: rgba(20, 19, 26, 0.08);
          border-color: rgba(245, 208, 254, 0.85);
          color: #121118;
        }

        .drawer-terminal-icon {
          color: #8E8B99;
        }

        .drawer-chevron {
          color: #8E8B99;
          transition: transform 0.25s ease;
        }

        .drawer-chevron.chevron-rotated {
          transform: rotate(180deg);
        }

        .architecture-expanded-content {
          overflow: hidden;
        }

        .architecture-inner-well {
          margin-top: 0.85rem;
          padding: 1.15rem;
          border-radius: 14px;
          background: rgba(20, 19, 26, 0.03);
          border: 1px solid rgba(226, 224, 235, 0.8);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .architecture-summary-text {
          font-size: 0.82rem;
          line-height: 1.55;
          color: #4C4859;
          margin: 0;
        }

        .architecture-outcomes-block {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .outcomes-header {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #8E8B99;
        }

        .outcomes-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .outcome-item {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
        }

        .outcome-arrow {
          color: #9333EA;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .outcome-text {
          font-size: 0.78rem;
          line-height: 1.45;
          color: #2D2938;
        }

        .architecture-footprint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.68rem;
          padding-top: 0.55rem;
          border-top: 1px dashed rgba(226, 224, 235, 0.9);
          flex-wrap: wrap;
        }

        .footprint-label {
          color: #8E8B99;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .footprint-value {
          color: #121118;
          font-weight: 600;
        }

        /* ---------------------------------------------------------
           RESPONSIVE REFINEMENTS
           --------------------------------------------------------- */
        @media (max-width: 768px) {
          .experience-creative-section {
            padding: 4rem 1rem 5rem 1rem;
          }
          .experience-headline {
            font-size: 1.85rem;
          }
          .timeline-item-row {
            padding-left: 42px;
          }
          .timeline-spine-track {
            left: 12px;
          }
          .timeline-orbital-node {
            left: -2px;
          }
          .experience-liquid-card {
            padding: 1.35rem;
          }
          .card-header-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;