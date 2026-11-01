import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowUpRight,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import type { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import { TechLogo } from './TechLogos';

type CategoryFilter = 'all' | 'java' | 'frontend' | 'ml';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'java') return p.category === 'java';
    if (activeCategory === 'frontend') return p.category === 'frontend' || p.category === 'fullstack';
    if (activeCategory === 'ml') return p.category === 'ml';
    return true;
  });

  // Current active spotlight project
  const activeProject = projects.find((p) => p.id === selectedProjectId) || filteredProjects[0] || projects[0];
  const activeIndex = projects.findIndex((p) => p.id === activeProject.id);

  const handleOpenLink = (url?: string) => {
    const targetUrl = url || activeProject.githubUrl || 'https://github.com/jershika26';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="projects-creative-section">
      <style>{`
        /* =========================================================
           PROJECTS SHOWCASE: BESPOKE APPLE LIQUID GLASS
           Palette: Obsidian Black, Ash Neutrals, Whisper Lavender, Crisp White
           ========================================================= */
        .projects-creative-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 60% 50% at 85% 20%, rgba(245, 208, 254, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 45% at 10% 80%, rgba(230, 215, 245, 0.3) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          padding: 6.5rem 1.5rem 7.5rem 1.5rem;
          box-sizing: border-box;
          color: #121118;
          overflow: hidden;
        }

        .projects-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Section Header */
        .projects-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 3.5rem auto;
        }

        .projects-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #63606E;
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          margin-bottom: 1rem;
        }

        .projects-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5D0FE;
          box-shadow: 0 0 8px rgba(245, 208, 254, 0.9);
        }

        .projects-title {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2.4rem, 4.2vw, 3.6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #121118;
          margin: 0 0 1rem 0;
        }

        .projects-subtitle {
          font-size: 1rem;
          line-height: 1.6;
          color: #63606E;
          margin: 0 auto;
          max-width: 580px;
        }

        /* Segmented Filter Dock */
        .projects-filter-dock {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .filter-btn {
          position: relative;
          padding: 0.55rem 1.15rem;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(38, 36, 46, 0.08);
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #63606E;
          cursor: pointer;
          backdrop-filter: blur(16px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .filter-btn:hover {
          color: #121118;
          border-color: rgba(38, 36, 46, 0.2);
          background: rgba(255, 255, 255, 0.95);
        }

        .filter-btn.active {
          color: #FFFFFF;
          background: #121118;
          border-color: #121118;
          box-shadow: 0 4px 16px rgba(18, 17, 24, 0.2);
        }

        /* =========================================================
           SPOTLIGHT STAGE (SPLIT SPEC & VIEWPORT PREVIEW)
           ========================================================= */
        .spotlight-stage {
          display: grid;
          grid-template-columns: minmax(360px, 1fr) minmax(420px, 1.25fr);
          gap: 2.5rem;
          align-items: stretch;
          margin-bottom: 3.5rem;
        }

        /* Left Column: Dossier Card */
        .dossier-card {
          position: relative;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(38, 36, 46, 0.12);
          border-radius: 28px;
          padding: 2.5rem 2.25rem;
          box-shadow: 
            0 20px 48px -12px rgba(20, 19, 26, 0.08),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .dossier-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .dossier-index-badge {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #8E8B99;
          letter-spacing: 0.1em;
        }

        .dossier-metric-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.85rem;
          background: rgba(245, 208, 254, 0.3);
          border: 1px solid rgba(245, 208, 254, 0.7);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #4A1D96;
        }

        .dossier-title {
          font-size: clamp(1.6rem, 2.4vw, 2.1rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #121118;
          margin: 0 0 0.5rem 0;
        }

        .dossier-subtitle {
          font-size: 0.9375rem;
          line-height: 1.45;
          color: #63606E;
          margin: 0 0 1.25rem 0;
          font-weight: 500;
        }

        .dossier-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #26242E;
          margin: 0 0 1.5rem 0;
        }

        .dossier-highlights-list {
          list-style: none;
          margin: 0 0 1.75rem 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .dossier-highlight-item {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: #403C3C;
        }

        .dossier-highlight-item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.45rem;
          width: 5px;
          height: 5px;
          border-radius: 1px;
          background: #121118;
          transform: rotate(45deg);
        }

        .dossier-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(38, 36, 46, 0.08);
        }

        .dossier-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          background: #FFFFFF;
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #26242E;
        }

        /* Action Buttons Row */
        .dossier-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn-github-action {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.35rem;
          background: #121118;
          color: #FFFFFF;
          border: 1px solid #121118;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(18, 17, 24, 0.18);
        }

        .btn-github-action:hover {
          background: #26242E;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(18, 17, 24, 0.28);
        }

        .btn-details-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.2rem;
          background: rgba(255, 255, 255, 0.9);
          color: #121118;
          border: 1px solid rgba(38, 36, 46, 0.15);
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-details-action:hover {
          background: #FFFFFF;
          border-color: rgba(38, 36, 46, 0.3);
          transform: translateY(-1px);
        }

        /* =========================================================
           RIGHT COLUMN: INTERACTIVE DEVICE VIEWPORT PREVIEW
           ========================================================= */
        .preview-viewport-window {
          position: relative;
          background: #14131A;
          border: 1px solid rgba(38, 36, 46, 0.2);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 
            0 24px 60px -16px rgba(18, 17, 24, 0.25),
            inset 0 1px 1px rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .preview-viewport-window:hover {
          transform: translateY(-3px);
          border-color: rgba(245, 208, 254, 0.6);
          box-shadow: 
            0 32px 70px -16px rgba(18, 17, 24, 0.32),
            0 0 32px rgba(245, 208, 254, 0.18),
            inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        /* Window Chrome */
        .window-chrome {
          background: #1A1922;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .window-traffic-lights {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .light-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .light-red { background: #FF5F56; }
        .light-yellow { background: #FFBD2E; }
        .light-green { background: #27C93F; }

        .window-address-bar {
          flex: 1;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.3rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          color: #8E8B99;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .window-address-text {
          color: #E2E0E8;
          font-weight: 500;
        }

        /* Viewport Canvas Screen Stage */
        .viewport-screen-stage {
          position: relative;
          flex: 1;
          min-height: 440px;
          background: #0E0D12;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        /* Click to Launch Floating Badge Overlay */
        .viewport-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(14, 13, 18, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 20;
        }

        .preview-viewport-window:hover .viewport-hover-overlay {
          opacity: 1;
        }

        .launch-pill-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.6rem;
          background: rgba(255, 255, 255, 0.95);
          color: #121118;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transform: translateY(8px);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .preview-viewport-window:hover .launch-pill-cta {
          transform: translateY(0);
        }

        /* Mockup Visualizations for Each System */
        .mockup-canvas-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .mockup-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0.85rem 1.25rem;
        }

        .mockup-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .mockup-stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .mockup-stat-val {
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          font-variant-numeric: tabular-nums;
        }

        .mockup-stat-label {
          font-size: 0.6875rem;
          color: #8E8B99;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .mockup-data-board {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mockup-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          font-size: 0.75rem;
          color: #C7C4D0;
        }

        .mockup-pill-green {
          padding: 0.2rem 0.5rem;
          background: rgba(39, 201, 63, 0.15);
          border: 1px solid rgba(39, 201, 63, 0.3);
          border-radius: 4px;
          color: #27C93F;
          font-size: 0.65rem;
          font-weight: 600;
        }

        /* =========================================================
           HORIZONTAL QUICK-SWITCH STRIP
           ========================================================= */
        .projects-deck-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .deck-item-card {
          position: relative;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 18px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 140px;
        }

        .deck-item-card:hover {
          transform: translateY(-3px);
          border-color: rgba(38, 36, 46, 0.25);
          background: rgba(255, 255, 255, 0.95);
        }

        .deck-item-card.is-active-card {
          background: #FFFFFF;
          border-color: #121118;
          box-shadow: 
            0 12px 28px -8px rgba(18, 17, 24, 0.12),
            0 0 0 2px #121118,
            inset 0 1.5px 2px #FFFFFF;
        }

        .deck-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .deck-card-num {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: #8E8B99;
        }

        .deck-card-cat {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          background: rgba(38, 36, 46, 0.05);
          color: #63606E;
        }

        .deck-card-title {
          font-size: 0.9375rem;
          font-weight: 700;
          line-height: 1.25;
          color: #121118;
          margin: 0 0 0.5rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .deck-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          color: #8E8B99;
          margin-top: 0.5rem;
        }

        /* =========================================================
           RESPONSIVE REFINEMENTS
           ========================================================= */
        @media (max-width: 960px) {
          .spotlight-stage {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .viewport-screen-stage {
            min-height: 360px;
            padding: 1.25rem;
          }

          .projects-deck-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .projects-creative-section {
            padding: 4.5rem 1rem 5.5rem 1rem;
          }

          .projects-deck-strip {
            grid-template-columns: 1fr;
          }

          .dossier-card {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>

      <div className="projects-container">
        
        {/* =========================================================
            SECTION HEADER
            ========================================================= */}
        <div className="projects-header">
          <div className="projects-eyebrow">
            <span className="projects-eyebrow-dot" />
            <span>04 // Selected Codebases & Architectures</span>
          </div>

          <h2 className="projects-title">
            Engineered Systems & Production Builds.
          </h2>

          <p className="projects-subtitle">
            Enterprise Spring Boot REST backends, reactive full-stack interfaces, 
            and computer vision models with verified performance records.
          </p>
        </div>

        {/* =========================================================
            SEGMENTED FILTER DOCK
            ========================================================= */}
        <div className="projects-filter-dock" role="tablist">
          <button 
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
            role="tab"
            aria-selected={activeCategory === 'all'}
          >
            All Systems ({projects.length})
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'java' ? 'active' : ''}`}
            onClick={() => setActiveCategory('java')}
            role="tab"
            aria-selected={activeCategory === 'java'}
          >
            Spring Boot & Java (1)
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'frontend' ? 'active' : ''}`}
            onClick={() => setActiveCategory('frontend')}
            role="tab"
            aria-selected={activeCategory === 'frontend'}
          >
            Full Stack & React (2)
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'ml' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ml')}
            role="tab"
            aria-selected={activeCategory === 'ml'}
          >
            AI & Computer Vision (2)
          </button>
        </div>

        {/* =========================================================
            SPOTLIGHT STAGE (SPLIT VIEW)
            ========================================================= */}
        <div className="spotlight-stage">
          
          {/* LEFT: ARCHITECTURAL DOSSIER */}
          <motion.div 
            key={activeProject.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="dossier-card"
          >
            <div>
              <div className="dossier-top-meta">
                <span className="dossier-index-badge">
                  {String(activeIndex + 1).padStart(2, '0')} // 05
                </span>
                <span className="dossier-metric-pill">
                  <Sparkles size={12} />
                  <span>{activeProject.metrics}</span>
                </span>
              </div>

              <h3 className="dossier-title">
                {activeProject.title}
              </h3>

              <p className="dossier-subtitle">
                {activeProject.subtitle}
              </p>

              <p className="dossier-desc">
                {activeProject.description}
              </p>

              {/* Highlights */}
              <ul className="dossier-highlights-list">
                {activeProject.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="dossier-highlight-item">
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Tech Stack Pills */}
              <div className="dossier-tags-row">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="dossier-tag">
                    <TechLogo name={tech} size={13} className="text-zinc-600" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div className="dossier-actions">
                <button 
                  onClick={() => handleOpenLink(activeProject.githubUrl)}
                  className="btn-github-action"
                  title="Open GitHub Repository"
                >
                  <GithubIcon size={16} />
                  <span>View Codebase ↗</span>
                </button>

                <button 
                  onClick={() => setModalProject(activeProject)}
                  className="btn-details-action"
                >
                  <Eye size={15} />
                  <span>System Specs</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: INTERACTIVE DEVICE VIEWPORT PREVIEW */}
          <motion.div 
            key={`preview-${activeProject.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="preview-viewport-window"
            onClick={() => handleOpenLink(activeProject.liveUrl || activeProject.githubUrl)}
            title="Click to Open Live Project / Repository"
          >
            {/* macOS Chrome */}
            <div className="window-chrome">
              <div className="window-traffic-lights">
                <span className="light-dot light-red" />
                <span className="light-dot light-yellow" />
                <span className="light-dot light-green" />
              </div>

              <div className="window-address-bar">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>https://</span>
                <span className="window-address-text">
                  github.com/jershika26/{activeProject.id.replace('proj-', '')}
                </span>
              </div>
            </div>

            {/* Screen Stage with Interactive UI Simulation */}
            <div className="viewport-screen-stage">
              {/* Hover Launch Overlay */}
              <div className="viewport-hover-overlay">
                <div className="launch-pill-cta">
                  <span>Open Live Project / Repository</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Mockup Canvas */}
              <div className="mockup-canvas-wrapper">
                <div className="mockup-header-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27C93F' }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FFFFFF' }}>
                      {activeProject.title}
                    </span>
                  </div>
                  <span className="mockup-pill-green">ONLINE // REST OK</span>
                </div>

                <div className="mockup-stats-grid">
                  <div className="mockup-stat-card">
                    <span className="mockup-stat-val">200 OK</span>
                    <span className="mockup-stat-label">API Status</span>
                  </div>
                  <div className="mockup-stat-card">
                    <span className="mockup-stat-val">&lt; 45ms</span>
                    <span className="mockup-stat-label">Latency</span>
                  </div>
                  <div className="mockup-stat-card">
                    <span className="mockup-stat-val">100%</span>
                    <span className="mockup-stat-label">Type Safe</span>
                  </div>
                </div>

                <div className="mockup-data-board">
                  <div className="mockup-row">
                    <span>Repository Core</span>
                    <span style={{ color: '#F5D0FE', fontFamily: 'monospace' }}>
                      {activeProject.techStack[0]} // {activeProject.categoryLabel}
                    </span>
                  </div>
                  <div className="mockup-row">
                    <span>Performance Benchmark</span>
                    <span style={{ color: '#3ECF8E', fontWeight: 600 }}>
                      {activeProject.metrics}
                    </span>
                  </div>
                  <div className="mockup-row">
                    <span>Architecture Engine</span>
                    <span style={{ color: '#E2E0E8' }}>
                      {activeProject.architecturePoints?.[0] || 'Clean Microservice Architecture'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* =========================================================
            HORIZONTAL QUICK-SWITCH STRIP
            ========================================================= */}
        <div className="projects-deck-strip">
          {projects.map((proj, idx) => {
            const isSelected = proj.id === activeProject.id;

            return (
              <div 
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`deck-item-card ${isSelected ? 'is-active-card' : ''}`}
              >
                <div>
                  <div className="deck-card-top">
                    <span className="deck-card-num">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="deck-card-cat">
                      {proj.categoryLabel}
                    </span>
                  </div>

                  <h4 className="deck-card-title">
                    {proj.title}
                  </h4>
                </div>

                <div className="deck-card-bottom">
                  <span>{proj.techStack[0]}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLink(proj.githubUrl);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      color: isSelected ? '#121118' : '#8E8B99'
                    }}
                    title="Open on GitHub"
                  >
                    <GithubIcon size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal 
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};

export default Projects;
