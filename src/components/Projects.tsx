import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { TechLogo } from './TechLogos';

export const Projects: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeProject = projects[activeIdx] || projects[0];

  const handleOpenLink = (url?: string) => {
    const target = url || activeProject.liveUrl || activeProject.githubUrl || 'https://github.com/jershika26';
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="projects-showcase-section">
      <style>{`
        /* =========================================================
           PROJECTS SHOWCASE: CONNECTED NODES ROADMAP & SLEEK PREVIEW
           Theme: Black, Ash, Crisp White, Minimal Whisper Lavender
           ========================================================= */
        .projects-showcase-section {
          position: relative;
          width: 100%;
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 55% 45% at 85% 15%, rgba(245, 208, 254, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 15% 85%, rgba(230, 215, 245, 0.25) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          padding: 5rem 1.5rem 5.5rem 1.5rem;
          box-sizing: border-box;
          color: #121118;
          overflow: hidden;
        }

        .projects-wrapper {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Section Header: Matching previous fonts */
        .projects-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 3rem auto;
        }

        .projects-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
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
          margin-bottom: 0.85rem;
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
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #121118;
          margin: 0 0 0.75rem 0;
        }

        .projects-subtitle {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: #63606E;
          margin: 0 auto;
          max-width: 540px;
        }

        /* =========================================================
           SPLIT STAGE: CONNECTED NODES ROADMAP (LEFT) + DOSSIER (RIGHT)
           Fits cleanly inside normal viewport height (max-height: 520px)
           ========================================================= */
        .projects-stage-split {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(380px, 1.25fr);
          gap: 2.5rem;
          align-items: stretch;
          max-height: 540px;
        }

        /* =========================================================
           LEFT COLUMN: CONNECTED NODES CIRCUIT
           A continuous vertical rail with nodes where active dot sits near
           ========================================================= */
        .nodes-circuit-column {
          position: relative;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 24px;
          padding: 2rem 1.75rem;
          box-shadow: 
            0 16px 36px -12px rgba(20, 19, 26, 0.06),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .nodes-circuit-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(38, 36, 46, 0.08);
          padding-bottom: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .nodes-circuit-title {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #63606E;
        }

        .nodes-count-tag {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: #121118;
          padding: 0.2rem 0.5rem;
          background: rgba(38, 36, 46, 0.06);
          border-radius: 6px;
        }

        /* The vertical connected track list */
        .nodes-list-track {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        /* The vertical guide line */
        .nodes-vertical-line {
          position: absolute;
          left: 1.25rem;
          top: 1.5rem;
          bottom: 1.5rem;
          width: 2px;
          background: rgba(38, 36, 46, 0.12);
          pointer-events: none;
          z-index: 1;
        }

        /* Individual Node Button */
        .project-node-item {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(38, 36, 46, 0.06);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .project-node-item:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(38, 36, 46, 0.2);
          transform: translateX(3px);
        }

        .project-node-item.is-active-node {
          background: #FFFFFF;
          border-color: #121118;
          box-shadow: 
            0 8px 24px -6px rgba(18, 17, 24, 0.12),
            inset 0 1.5px 2px #FFFFFF;
        }

        /* The Node Anchor on the Line */
        .node-line-anchor {
          position: relative;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid rgba(38, 36, 46, 0.3);
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* When clicking each node, a dot sits right near that node on the line */
        .project-node-item.is-active-node .node-line-anchor {
          background: #121118;
          border-color: #121118;
          box-shadow: 0 0 0 5px rgba(245, 208, 254, 0.7);
          transform: scale(1.15);
        }

        .node-meta-body {
          flex: 1;
          min-width: 0;
        }

        .node-index-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.2rem;
        }

        .node-index-text {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #8E8B99;
        }

        .project-node-item.is-active-node .node-index-text {
          color: #4A1D96;
        }

        .node-category-tag {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #63606E;
        }

        .node-title-text {
          font-size: 0.9375rem;
          font-weight: 700;
          line-height: 1.25;
          color: #121118;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* =========================================================
           RIGHT COLUMN: SPOTLIGHT PROJECT DOSSIER & PREVIEW
           Fits cleanly inside 540px height with short, simple text
           ========================================================= */
        .spotlight-project-dossier {
          position: relative;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(38, 36, 46, 0.12);
          border-radius: 24px;
          padding: 1.85rem 2rem;
          box-shadow: 
            0 20px 48px -12px rgba(20, 19, 26, 0.08),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .project-dossier-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .project-category-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.75rem;
          background: rgba(245, 208, 254, 0.3);
          border: 1px solid rgba(245, 208, 254, 0.7);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: #4A1D96;
        }

        .project-metric-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #63606E;
        }

        .project-dossier-title {
          font-size: 1.625rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #121118;
          margin: 0 0 0.35rem 0;
        }

        .project-dossier-subtitle {
          font-size: 0.875rem;
          font-weight: 500;
          color: #63606E;
          margin: 0 0 0.75rem 0;
        }

        /* Short, simple description */
        .project-dossier-desc {
          font-size: 0.875rem;
          line-height: 1.5;
          color: #26242E;
          margin: 0 0 1.1rem 0;
        }

        /* Interactive Viewport Screen Preview (Clickable) */
        .project-preview-mockup-frame {
          position: relative;
          width: 100%;
          height: 155px;
          background: #14131A;
          border: 1px solid rgba(38, 36, 46, 0.2);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          margin-bottom: 1.15rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .project-preview-mockup-frame:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25), 0 0 20px rgba(245, 208, 254, 0.2);
        }

        .preview-chrome-bar {
          background: #1A1922;
          padding: 0.4rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .preview-lights {
          display: flex;
          gap: 4px;
        }

        .preview-light {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .preview-light-red { background: #FF5F56; }
        .preview-light-yellow { background: #FFBD2E; }
        .preview-light-green { background: #27C93F; }

        .preview-address-url {
          flex: 1;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.6875rem;
          color: #A19EB0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preview-screen-body {
          flex: 1;
          position: relative;
          background: #0E0D12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        /* Hover Overlay on Mockup */
        .preview-screen-overlay {
          position: absolute;
          inset: 0;
          background: rgba(18, 17, 24, 0.45);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .project-preview-mockup-frame:hover .preview-screen-overlay {
          opacity: 1;
        }

        .preview-launch-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 1rem;
          background: #FFFFFF;
          color: #121118;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
        }

        .mockup-inner-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          text-align: center;
        }

        .mockup-brand-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .mockup-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.6875rem;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          color: #F5D0FE;
        }

        /* Tech Tags */
        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.15rem;
        }

        .project-tech-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.6rem;
          background: #FFFFFF;
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #26242E;
        }

        /* Action Buttons */
        .project-dossier-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-live-launch {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background: #121118;
          color: #FFFFFF;
          border: 1px solid #121118;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(18, 17, 24, 0.15);
        }

        .btn-live-launch:hover {
          background: #26242E;
          transform: translateY(-1px);
        }

        .btn-github-code {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          background: rgba(255, 255, 255, 0.9);
          color: #121118;
          border: 1px solid rgba(38, 36, 46, 0.14);
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-github-code:hover {
          background: #FFFFFF;
          border-color: rgba(38, 36, 46, 0.3);
          transform: translateY(-1px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .projects-stage-split {
            grid-template-columns: 1fr;
            max-height: none;
            gap: 2rem;
          }

          .spotlight-project-dossier {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>

      <div className="projects-wrapper">
        
        {/* =========================================================
            SECTION HEADER: Matching previous fonts
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
            Interactive roadmap featuring full-stack applications, 
            educational portals, and computer vision pipelines.
          </p>
        </div>

        {/* =========================================================
           SPLIT STAGE: CONNECTED NODES ROADMAP (LEFT) + DOSSIER (RIGHT)
           Fits cleanly on screen
           ========================================================= */}
        <div className="projects-stage-split">
          
          {/* LEFT: CONNECTED NODES CIRCUIT (A dot sits near when clicked) */}
          <div className="nodes-circuit-column">
            <div className="nodes-circuit-header">
              <span className="nodes-circuit-title">Project Roadmap</span>
              <span className="nodes-count-tag">0{activeIdx + 1} / 04</span>
            </div>

            <div className="nodes-list-track">
              {/* Continuous vertical guide line connecting all nodes */}
              <div className="nodes-vertical-line" />

              {projects.map((proj, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`project-node-item ${isActive ? 'is-active-node' : ''}`}
                    aria-label={`Select ${proj.title}`}
                  >
                    {/* The Node Anchor Dot on the line */}
                    <div className="node-line-anchor" />

                    <div className="node-meta-body">
                      <div className="node-index-row">
                        <span className="node-index-text">NODE 0{idx + 1}</span>
                        <span>·</span>
                        <span className="node-category-tag">{proj.categoryLabel}</span>
                      </div>
                      <div className="node-title-text">
                        {proj.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: '0.72rem', color: '#8E8B99', marginTop: '0.85rem' }}>
              Click any node to inspect live architecture
            </div>
          </div>

          {/* RIGHT: SPOTLIGHT PROJECT DOSSIER & VIEWPORT PREVIEW */}
          <motion.div 
            key={activeProject.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="spotlight-project-dossier"
          >
            <div>
              <div className="project-dossier-top">
                <span className="project-category-chip">
                  <Sparkles size={12} />
                  <span>{activeProject.categoryLabel}</span>
                </span>
                <span className="project-metric-text">
                  {activeProject.metrics}
                </span>
              </div>

              <h3 className="project-dossier-title">
                {activeProject.title}
              </h3>

              <p className="project-dossier-subtitle">
                {activeProject.subtitle}
              </p>

              {/* Shorter, simpler description */}
              <p className="project-dossier-desc">
                {activeProject.description}
              </p>

              {/* Clickable Image / Viewport Preview Mockup */}
              <div 
                className="project-preview-mockup-frame"
                onClick={() => handleOpenLink(activeProject.liveUrl || activeProject.githubUrl)}
                title="Click to Open Live Project"
              >
                <div className="preview-chrome-bar">
                  <div className="preview-lights">
                    <span className="preview-light preview-light-red" />
                    <span className="preview-light preview-light-yellow" />
                    <span className="preview-light preview-light-green" />
                  </div>
                  <div className="preview-address-url">
                    {activeProject.liveUrl || activeProject.githubUrl}
                  </div>
                </div>

                <div className="preview-screen-body">
                  <div className="preview-screen-overlay">
                    <div className="preview-launch-pill">
                      <span>Launch Project</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <div className="mockup-inner-brand">
                    <span className="mockup-brand-title">
                      {activeProject.title}
                    </span>
                    <span className="mockup-brand-badge">
                      <CheckCircle2 size={12} />
                      <span>{activeProject.metrics}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="project-tech-tags">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="project-tech-tag">
                    <TechLogo name={tech} size={13} className="text-zinc-600" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="project-dossier-actions">
              <button 
                onClick={() => handleOpenLink(activeProject.liveUrl || activeProject.githubUrl)}
                className="btn-live-launch"
              >
                <span>Visit Project ↗</span>
              </button>

              <button 
                onClick={() => handleOpenLink(activeProject.githubUrl)}
                className="btn-github-code"
                title="View GitHub Repository"
              >
                <GithubIcon size={15} />
                <span>Source</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Projects;
