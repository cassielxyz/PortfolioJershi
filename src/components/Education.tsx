import React from 'react';
import { GraduationCap, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { educationList } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="education-creative-section">
      <style>{`
        /* =========================================================
           EDUCATION SECTION: APPLE LIQUID GLASS & ASH THEME
           Palette: Obsidian Black, Ash Neutrals, Whisper Lavender, Crisp White
           ========================================================= */
        .education-creative-section {
          position: relative;
          width: 100%;
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 55% 45% at 15% 20%, rgba(245, 208, 254, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 80%, rgba(230, 215, 245, 0.22) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          padding: 5.5rem 1.5rem 6.5rem 1.5rem;
          box-sizing: border-box;
          color: #121118;
          overflow: hidden;
        }

        .education-wrapper {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Section Header */
        .education-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3.5rem auto;
        }

        .education-eyebrow {
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

        .education-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5D0FE;
          box-shadow: 0 0 8px rgba(245, 208, 254, 0.9);
        }

        .education-title {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #121118;
          margin: 0 0 0.75rem 0;
        }

        .education-subtitle {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: #63606E;
          margin: 0 auto;
          max-width: 520px;
        }

        /* Education Grid */
        .education-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          align-items: stretch;
        }

        /* Individual Liquid Glass Education Card */
        .edu-glass-card {
          position: relative;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px) saturate(190%);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 22px;
          padding: 2.25rem 2rem;
          box-shadow: 
            0 16px 36px -12px rgba(20, 19, 26, 0.06),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .edu-glass-card:hover {
          transform: translateY(-3px);
          border-color: rgba(38, 36, 46, 0.25);
          box-shadow: 
            0 24px 48px -12px rgba(20, 19, 26, 0.1),
            0 0 24px rgba(245, 208, 254, 0.2),
            inset 0 1.5px 2px #FFFFFF;
        }

        .edu-glass-card.is-honors {
          border-color: rgba(245, 208, 254, 0.8);
          background: rgba(255, 255, 255, 0.92);
        }

        /* Card Top Metadata */
        .edu-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .edu-badge-honors {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.75rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #065F46;
        }

        .edu-badge-standard {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.75rem;
          background: rgba(38, 36, 46, 0.05);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #63606E;
        }

        .edu-score-display {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .edu-score-val {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 1.625rem;
          font-weight: 800;
          color: #121118;
          letter-spacing: -0.03em;
        }

        .edu-score-type {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: #8E8B99;
          text-transform: uppercase;
        }

        .edu-degree-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: #121118;
          margin: 0 0 0.4rem 0;
        }

        .edu-institution-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.875rem;
          color: #63606E;
          font-weight: 500;
          margin: 0 0 1.25rem 0;
        }

        .edu-details-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .edu-detail-item {
          position: relative;
          padding-left: 1.15rem;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: #403C3C;
        }

        .edu-detail-item::before {
          content: "–";
          position: absolute;
          left: 0;
          color: #8E8B99;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .education-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .edu-glass-card {
            padding: 1.75rem 1.5rem;
          }
        }
      `}</style>

      <div className="education-wrapper">
        
        {/* Section Header with smooth bidirectional in-animation */}
        <motion.div 
          className="education-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="education-eyebrow">
            <span className="education-eyebrow-dot" />
            <span>05 // Academic Record & Foundations</span>
          </div>

          <h2 className="education-title">
            Academic Trajectory & Honors.
          </h2>

          <p className="education-subtitle">
            Core foundations in Computer Science engineering, object-oriented systems, 
            data structures, and analytical problem solving.
          </p>
        </motion.div>

        {/* Education Grid */}
        <div className="education-grid">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`edu-glass-card ${edu.isHonors ? 'is-honors' : ''}`}
            >
              <div>
                <div className="edu-card-header">
                  {edu.isHonors ? (
                    <span className="edu-badge-honors">
                      <Award size={13} />
                      <span>Honors Degree</span>
                    </span>
                  ) : (
                    <span className="edu-badge-standard">
                      <GraduationCap size={13} />
                      <span>{edu.period || 'Academic'}</span>
                    </span>
                  )}

                  <div className="edu-score-display">
                    <span className="edu-score-val">{edu.score}</span>
                    <span className="edu-score-type">{edu.scoreType}</span>
                  </div>
                </div>

                <h3 className="edu-degree-title">
                  {edu.degree}
                </h3>

                <div className="edu-institution-row">
                  <MapPin size={14} className="text-zinc-400" />
                  <span>{edu.institution}</span>
                </div>
              </div>

              <ul className="edu-details-list">
                {edu.details.map((detail, dIdx) => (
                  <li key={dIdx} className="edu-detail-item">
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
