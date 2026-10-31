import React from 'react';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { educationList } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="section" style={{ position: 'relative' }}>
      <div className="content-wrapper">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-badge">
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">
            Education & <span style={{ color: 'var(--accent-taupe)' }}>Academic Excellence</span>
          </h2>
          <p className="section-subtitle">
            Strong foundations in Computer Science principles, data structures, and algorithmic engineering.
          </p>
        </motion.div>

        {/* Education Cards Grid with Staggered Entrance & Hover Elevation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(28, 25, 23, 0.08)' }}
              className="glass-card"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#ffffff',
                border: edu.isHonors ? '1px solid #ebdcd0' : '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div>
                {/* Header Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '0.75rem',
                      background: 'var(--bg-banner)',
                      border: '1px solid #ebdcd0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-taupe-dark)'
                    }}
                  >
                    <GraduationCap size={22} />
                  </div>

                  {edu.isHonors && (
                    <span
                      style={{
                        padding: '0.3rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.785rem',
                        fontWeight: 700,
                        background: '#faf0e7',
                        color: 'var(--accent-taupe-dark)',
                        border: '1px solid #ebdcd0',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Award size={13} />
                      <span>Graduating with Honors</span>
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.35rem' }}>
                  {edu.degree}
                </h3>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-taupe-dark)', marginBottom: '0.75rem' }}>
                  {edu.institution}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <MapPin size={14} />
                  <span>{edu.location}</span>
                  {edu.period && (
                    <>
                      <span>•</span>
                      <span>{edu.period}</span>
                    </>
                  )}
                </div>

                {edu.details && edu.details.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                    {edu.details.map((detail, dIdx) => (
                      <div key={dIdx} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                        • {detail}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Score / Grade Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.15rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Performance ({edu.scoreType}):
                </span>
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    background: 'var(--bg-secondary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {edu.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
