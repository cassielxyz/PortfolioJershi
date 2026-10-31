import React from 'react';
import { ArrowRight, FileDown, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const titleLetters = Array.from("FULL STACK");

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.35,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="hero" style={{ paddingTop: '6rem', paddingBottom: '1.5rem', position: 'relative' }}>
      <div className="content-wrapper">
        
        {/* Main Editorial Hero Showcase Banner — Left Style Photo Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            position: 'relative',
            width: '100%',
            background: 'var(--bg-banner)',
            borderRadius: 'clamp(20px, 3vw, 32px)',
            border: '1px solid #ebdcd0',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
            padding: 'clamp(2rem, 4vw, 3.5rem)'
          }}
          className="hero-banner"
        >
          <div className="hero-editorial-grid">
            
            {/* Left Column: Portrait Photo with gentle glow, floating & hover zoom */}
            <div className="hero-photo-column">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', width: '100%', maxWidth: '340px' }}
              >
                {/* Gentle Ambient Glow behind profile photo */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-15px',
                    borderRadius: 'clamp(30px, 4vw, 40px)',
                    background: 'radial-gradient(circle, rgba(165, 146, 129, 0.32) 0%, rgba(250, 240, 231, 0) 70%)',
                    filter: 'blur(20px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />

                {/* Portrait Card with Gentle Floating Animation & Subtle Hover Zoom */}
                <motion.div
                  className="hero-portrait-card"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.025 }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(360px, 42vw, 440px)',
                    borderRadius: 'clamp(20px, 3vw, 28px)',
                    overflow: 'hidden',
                    border: '4px solid #ffffff',
                    boxShadow: '0 16px 40px rgba(28, 25, 23, 0.09)',
                    background: '#ffffff',
                    zIndex: 1
                  }}
                >
                  <img
                    src="/profile.jpg"
                    alt="Jershika C — Full Stack Developer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 15%',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="hero-portrait-img"
                  />

                  {/* Top Honors Badge on photo */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '0.4rem 0.85rem',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid #ebdcd0',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#18181b',
                      zIndex: 2
                    }}
                  >
                    <Award size={14} color="var(--accent-taupe-dark)" />
                    <span>8.51 CGPA Honors</span>
                  </motion.div>

                  {/* Bottom Live Availability Tag on photo */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      padding: '0.65rem 1rem',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid #ebdcd0',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
                      zIndex: 2
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          background: '#16a34a',
                          boxShadow: '0 0 8px rgba(22, 163, 74, 0.6)'
                        }}
                      />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#18181b' }}>
                        Available for Work
                      </span>
                    </div>
                    <span style={{ fontSize: '0.785rem', color: 'var(--accent-taupe-dark)', fontWeight: 600 }}>
                      Full-Time
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Editorial Typography, Info & Actions */}
            <div className="hero-content-column">
              
              {/* Header Meta: Name & Status with smooth fade-in and scale */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                    fontWeight: 800,
                    color: '#18181b',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Jershika C
                </motion.span>
                <span style={{ color: 'var(--accent-taupe)' }}>•</span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.3rem 0.85rem',
                    background: '#ffffff',
                    border: '1px solid #ebdcd0',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)'
                  }}
                >
                  <MapPin size={13} color="var(--accent-taupe-dark)" />
                  <span>Kanyakumari, Tamil Nadu</span>
                </motion.div>
              </div>

              {/* Big Editorial Headline with Letter-by-Letter Reveal */}
              <motion.h1
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.75rem, 6.2vw, 5.25rem)',
                  fontWeight: 900,
                  color: 'var(--accent-taupe)',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  userSelect: 'none',
                  margin: '0 0 0.35rem 0',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {titleLetters.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{
                      display: 'inline-block',
                      minWidth: char === ' ' ? '0.3em' : 'auto'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Developer Subheading with Slight Upward Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.85rem, 4vw, 3.25rem)',
                  fontWeight: 700,
                  color: '#18181b',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '1.25rem'
                }}
              >
                Developer
              </motion.div>

              {/* Academic Credentials Line with Staggered Entrance */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--accent-taupe-dark)',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap'
                }}
              >
                <span style={{ color: '#18181b', fontWeight: 700 }}>B.E. Honors in Computer Science</span>
                <span>•</span>
                <span>8.51 CGPA</span>
                <span>•</span>
                <span>Ponjesly College of Engineering</span>
              </motion.div>

              {/* Bio summary paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(0.975rem, 1.3vw, 1.08rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
                  maxWidth: '580px'
                }}
              >
                Engineering resilient enterprise backends with <strong>Spring Boot</strong> & <strong>PostgreSQL</strong>, and building intuitive, responsive web interfaces in <strong>React.js</strong>.
              </motion.p>

              {/* Action Buttons & Social Links with Interactive Micro-Animations */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
              >
                {/* View Projects Button with Arrow Hover Translation */}
                <motion.a
                  href="#projects"
                  className="btn btn-primary"
                  whileHover="hover"
                  initial="initial"
                  whileTap={{ scale: 0.96 }}
                  style={{ padding: '0.85rem 1.85rem' }}
                >
                  <span>View Projects</span>
                  <motion.span
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 5 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <ArrowRight size={17} />
                  </motion.span>
                </motion.a>

                {/* Resume Button with Smooth Hover */}
                <motion.button
                  onClick={onOpenResumeModal}
                  className="btn btn-secondary"
                  whileHover={{ y: -2, boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)' }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: '0.85rem 1.75rem',
                    background: '#ffffff',
                    border: '1px solid #ebdcd0',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <FileDown size={17} />
                  <span>Resume</span>
                </motion.button>

                {/* Socials with Smooth Scale on Hover */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: '0.25rem' }}>
                  <motion.a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '1px solid #ebdcd0',
                      color: 'var(--text-main)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                    }}
                    title="GitHub"
                  >
                    <GithubIcon size={18} />
                  </motion.a>

                  <motion.a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '1px solid #ebdcd0',
                      color: 'var(--text-main)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                    }}
                    title="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </motion.a>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </div>

      {/* Responsive layout styling for Left Style Hero */}
      <style>{`
        .hero-editorial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          align-items: center;
          width: 100%;
        }

        .hero-photo-column {
          display: flex;
          justifyContent: center;
          align-items: center;
        }

        .hero-content-column {
          display: flex;
          flex-direction: column;
          justifyContent: center;
          text-align: left;
        }

        .hero-portrait-card:hover .hero-portrait-img {
          transform: scale(1.035);
        }

        @media (min-width: 920px) {
          .hero-editorial-grid {
            grid-template-columns: minmax(300px, 340px) 1fr;
          }
          .hero-photo-column {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
