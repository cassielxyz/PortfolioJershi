import React from 'react';
import { 
  User, 
  Cpu, 
  Target, 
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo, stats } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
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
            <User size={14} />
            <span>Profile & Background</span>
          </div>
          <h2 className="section-title">
            Engineering with <span style={{ color: '#9333EA' }}>Precision & Passion</span>
          </h2>
          <p className="section-subtitle">
            An Honors Computer Science Engineer blending resilient Java enterprise backends with intuitive, high-performance web applications.
          </p>
        </motion.div>

        {/* Stats Counter Grid with Staggered Entrance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(147, 51, 234, 0.08)' }}
              style={{
                padding: '1.75rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid #EAE0F5'
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  color: '#9333EA'
                }}
              >
                <span>{stat.value}</span>
                <span style={{ fontSize: '1.4rem', color: '#EC4899', marginLeft: '2px' }}>{stat.suffix}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main About Layout: 2 Balanced Editorial Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            alignItems: 'stretch'
          }}
          className="about-grid"
        >
          {/* Card 1: Technical Foundations */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            style={{
              padding: '2.5rem',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
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
                  <Cpu size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-bright)' }}>Technical Foundations</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Honors Engineering Mindset & Full Stack Focus</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-main)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.985rem' }}>
                {personalInfo.bio}
              </p>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                {personalInfo.extendedBio}
              </p>
            </div>

            {/* Core Competencies highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: 'auto' }}>
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.15rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: 'var(--accent-taupe-dark)' }}>
                  <ShieldCheck size={17} />
                  <span style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-bright)' }}>Clean Enterprise Code</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  OOPs, Spring Boot, and JPA/Hibernate layered structures with robust DTO validations.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.15rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: 'var(--accent-taupe-dark)' }}>
                  <Zap size={17} />
                  <span style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-bright)' }}>Fast, Reactive UIs</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Modern React.js, TypeScript, and fluid interactions for seamless user experiences.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Interests, Career Goals & Philosophy */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            style={{
              padding: '2.5rem',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
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
                  <Target size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-bright)' }}>Interests & Career Goals</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Continuous Evolution & High-Impact Contribution</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.985rem' }}>
                Passionate about crafting scalable distributed backend architectures and elegant full-stack ecosystems. Looking forward to contributing to mission-critical engineering teams and driving modern web products from concept to production.
              </p>

              {/* Engineering Philosophy Quote */}
              <div
                style={{
                  padding: '1.35rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '2rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-taupe-dark)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Sparkles size={16} />
                  <span>Core Engineering Philosophy</span>
                </div>
                <p style={{ fontStyle: 'italic', fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
                  "Dedicated to engineering reliable, user-friendly solutions through strong problem-solving, rapid learning, and clean architectural design."
                </p>
              </div>
            </div>

            {/* Bottom Status & Connect Action */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-taupe-dark)', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-taupe)' }} />
                <span>Looking for: Full-Time Software Engineering Roles</span>
              </div>

              <a href="#contact" className="btn btn-secondary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
                <span>Let's Connect</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
