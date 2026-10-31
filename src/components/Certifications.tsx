import React from 'react';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="section" style={{ position: 'relative' }}>
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
            <Award size={14} />
            <span>Continuous Learning</span>
          </div>
          <h2 className="section-title">
            Certifications & <span style={{ color: 'var(--accent-taupe)' }}>Professional Training</span>
          </h2>
          <p className="section-subtitle">
            Specialized intensive training programs in modern Java full-stack technologies and enterprise application architectures.
          </p>
        </motion.div>

        {/* Certifications Cards */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -5, boxShadow: '0 16px 36px rgba(28, 25, 23, 0.08)' }}
              className="glass-card"
              style={{
                padding: '2.5rem',
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.85rem',
                      background: 'var(--bg-banner)',
                      border: '1px solid #ebdcd0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-taupe-dark)'
                    }}
                  >
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-bright)' }}>
                      {cert.title}
                    </h3>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-taupe-dark)' }}>
                      {cert.issuer}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.85rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    color: 'var(--text-main)',
                    fontWeight: 600
                  }}
                >
                  <Calendar size={13} color="var(--accent-taupe-dark)" />
                  <span>{cert.period}</span>
                </div>
              </div>

              {cert.highlights && cert.highlights.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {cert.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      • {highlight}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Verified Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1.15rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '0.25rem' }}>
                  Core Competencies:
                </span>
                {cert.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    className="tech-pill"
                    whileHover={{ y: -2 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: '#faf0e7',
                      border: '1px solid #ebdcd0',
                      color: 'var(--accent-taupe-dark)'
                    }}
                  >
                    <CheckCircle2 size={13} color="#16a34a" />
                    <span>{skill}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
