import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2,
  Sparkles,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../data/portfolioData';

type FilterType = 'all' | 'professional' | 'internship';

export const Experience: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [hoveredExpId, setHoveredExpId] = useState<string | null>(null);

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'professional') return exp.isCurrent || exp.type.toLowerCase().includes('professional');
    if (activeFilter === 'internship') return exp.type.toLowerCase().includes('internship');
    return true;
  });

  return (
    <section id="experience" className="section" style={{ position: 'relative' }}>
      <div className="content-wrapper">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Career Milestones</span>
          </div>
          <h2 className="section-title">
            Professional <span style={{ color: 'var(--accent-taupe)' }}>Experience & Internships</span>
          </h2>
          <p className="section-subtitle">
            A track record of shipping production features, architecting APIs, and delivering tangible software improvements.
          </p>
        </motion.div>

        {/* Interactive Animated Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '2.25rem',
            flexWrap: 'wrap'
          }}
        >
          {[
            { id: 'all', label: 'All Roles', count: experiences.length, icon: Layers },
            { id: 'professional', label: 'Current & Enterprise', count: experiences.filter(e => e.isCurrent || e.type.toLowerCase().includes('professional')).length, icon: Sparkles },
            { id: 'internship', label: 'Internships', count: experiences.filter(e => e.type.toLowerCase().includes('internship')).length, icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterType)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="interactive"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  background: isActive ? 'var(--accent-black)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent-black)' : '1px solid var(--border-light)',
                  boxShadow: isActive ? '0 6px 18px rgba(18, 17, 26, 0.12)' : '0 2px 6px rgba(0, 0, 0, 0.02)'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                <span
                  style={{
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-secondary)',
                    color: isActive ? '#ffffff' : 'var(--accent-taupe-dark)'
                  }}
                >
                  {tab.count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Timeline Container */}
        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative' }}>
          {/* Central Vertical Line with Animated Light Beam */}
          <div
            style={{
              position: 'absolute',
              top: '15px',
              bottom: '15px',
              left: '24px',
              width: '2px',
              background: 'var(--border-subtle)',
              overflow: 'hidden'
            }}
            className="timeline-spine"
          >
            {/* Animated Light Beam flowing down */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '50px',
                background: 'var(--accent-taupe)',
                borderRadius: '9999px',
                animation: 'spineBeam 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          </div>

          <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp, idx) => {
                const isHovered = hoveredExpId === exp.id;
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'relative',
                      paddingLeft: '65px'
                    }}
                    className="timeline-item"
                  >
                    {/* Timeline Node Icon with interactive scale & radar pulse */}
                    <div
                      style={{
                        position: 'absolute',
                        left: isHovered ? '9px' : '11px',
                        top: '24px',
                        width: isHovered ? '32px' : '28px',
                        height: isHovered ? '32px' : '28px',
                        borderRadius: '50%',
                        background: exp.isCurrent ? '#16a34a' : (isHovered ? 'var(--accent-taupe-dark)' : '#12111a'),
                        border: '3px solid #ffffff',
                        boxShadow: isHovered ? '0 6px 18px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        animation: exp.isCurrent ? 'pulseRing 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite' : 'none'
                      }}
                    >
                      <span
                        style={{
                          width: isHovered ? '10px' : '8px',
                          height: isHovered ? '10px' : '8px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          transition: 'all 0.2s ease'
                        }}
                      />
                    </div>

                    {/* Interactive Timeline Card */}
                    <motion.div
                      className="glass-card interactive"
                      onMouseEnter={() => setHoveredExpId(exp.id)}
                      onMouseLeave={() => setHoveredExpId(null)}
                      whileHover={{ y: -5, boxShadow: '0 16px 36px rgba(28, 25, 23, 0.08)' }}
                      style={{
                        padding: '2.25rem',
                        position: 'relative',
                        background: '#ffffff',
                        border: exp.isCurrent ? '1px solid #ebdcd0' : '1px solid var(--border-subtle)',
                        borderLeft: isHovered 
                          ? '4px solid var(--accent-taupe)' 
                          : (exp.isCurrent ? '4px solid #16a34a' : '1px solid var(--border-subtle)'),
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'border 0.25s ease, border-left 0.25s ease'
                      }}
                    >
                      {/* Card Top Metadata */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <h3
                              style={{
                                fontSize: '1.35rem',
                                fontWeight: 700,
                                color: isHovered ? '#000000' : 'var(--text-bright)',
                                transition: 'color 0.2s ease'
                              }}
                            >
                              {exp.role}
                            </h3>
                            {exp.highlightBadge && (
                              <span
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: 'var(--radius-full)',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  background: exp.isCurrent ? 'var(--accent-emerald-bg)' : '#faf0e7',
                                  color: exp.isCurrent ? 'var(--accent-emerald)' : 'var(--accent-taupe-dark)',
                                  border: exp.isCurrent ? '1px solid rgba(22, 163, 74, 0.25)' : '1px solid #ebdcd0',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {exp.highlightBadge}
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem', color: 'var(--accent-taupe-dark)', fontWeight: 600, fontSize: '0.95rem' }}>
                            <Building2 size={16} />
                            <span>{exp.company}</span>
                            <span style={{ color: 'var(--text-dim)' }}>•</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{exp.type}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              padding: '0.35rem 0.85rem',
                              background: isHovered ? '#faf0e7' : 'var(--bg-secondary)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.8rem',
                              color: 'var(--text-main)',
                              fontWeight: 600,
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <Calendar size={13} color="var(--accent-taupe-dark)" />
                            <span>{exp.period}</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                            <MapPin size={13} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Responsibilities and achievements with micro-interactions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                        {exp.responsibilities.map((bullet, bIdx) => (
                          <div
                            key={bIdx}
                            className="exp-bullet-row"
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.65rem',
                              padding: '0.2rem 0',
                              transition: 'transform 0.15s ease'
                            }}
                          >
                            <div
                              className="exp-bullet-icon"
                              style={{
                                marginTop: '0.2rem',
                                color: '#16a34a',
                                flexShrink: 0,
                                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                              }}
                            >
                              <CheckCircle2 size={16} />
                            </div>
                            <span
                              style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.55,
                                transition: 'color 0.2s ease'
                              }}
                            >
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack used in this role with interactive spring pills */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '0.25rem' }}>Tech Deployed:</span>
                        {exp.techStack.map((tech, tIdx) => (
                          <motion.span
                            key={tIdx}
                            className="tech-pill interactive"
                            whileHover={{ y: -2 }}
                            style={{
                              background: 'var(--bg-secondary)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--text-main)',
                              transition: 'background 0.2s ease, border-color 0.2s ease'
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        .exp-bullet-row:hover .exp-bullet-icon {
          transform: scale(1.25);
        }
        .exp-bullet-row:hover span {
          color: #18181b !important;
        }
        .tech-pill:hover {
          background: #faf0e7 !important;
          border-color: #ebdcd0 !important;
        }
      `}</style>
    </section>
  );
};
