import React from 'react';
import { ArrowRight, FileDown, MapPin, Award, Briefcase, GraduationCap, Sparkles, ExternalLink, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="hero" className="behance-hero-section">
      <div className="content-wrapper">
        
        {/* Main Editorial Magazine Poster Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="behance-poster-card"
        >
          {/* Subtle ambient lavender & pink background glows inside card */}
          <div className="poster-ambient-glow poster-glow-lavender" />
          <div className="poster-ambient-glow poster-glow-pink" />

          {/* =========================================================
              PART 1: THE ICONIC MASTHEAD & CUTOUT COMPOSITION
              Reverse-engineered from Behance module 1330613731
              ========================================================= */}
          <div className="masthead-container">
            {/* Top-Left Playful Cursive Script: "My" */}
            <motion.div
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="masthead-my-script"
            >
              My
            </motion.div>

            {/* Giant Architectural Hollow Outlined Typography: "PORTFOLIO" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="masthead-portfolio-outline"
            >
              PORTFOLIO
            </motion.div>

            {/* Cursive Name Watermark Overlay: "Jershika" */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="masthead-signature-watermark"
            >
              Jershika
            </motion.div>

            {/* Subject Cutout Photo with Gentle Float & Ambient Lighting */}
            <div className="masthead-cutout-wrapper">
              {/* Backlight Halo for subject */}
              <div className="cutout-halo-glow" />

              <motion.div
                className="cutout-photo-motion"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="/profile_cutout.png"
                  alt="Jershika C — Full Stack Developer"
                  className="cutout-img"
                  loading="eager"
                />
              </motion.div>

              {/* Floating Editorial Metadata Badge on Right of Cutout */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="cutout-floating-badge"
              >
                <div className="badge-name">Jershika C</div>
                <div className="badge-role">
                  <span className="badge-role-pill">Full Stack</span>
                  <span className="badge-role-sub">Developer</span>
                </div>
              </motion.div>

              {/* Floating Academic Distinction Pill on Left */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="cutout-honors-pill"
              >
                <Award size={14} className="honors-icon" />
                <span>8.51 CGPA Honors</span>
              </motion.div>
            </div>
          </div>

          {/* =========================================================
              PART 2: HEADLINE & ARTISTIC TYPOGRAPHIC STATEMENT
              "My Name is Jershika and I am a Graphic designer" aesthetic
              ========================================================= */}
          <div className="headline-statement-area">
            {/* Small preamble tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="headline-preamble"
            >
              <span>My Name is</span>
              <span className="preamble-name-accent">Jershika</span>
              <span>and I am a</span>
            </motion.div>

            {/* The Signature Big Contrast Typography */}
            <div className="headline-title-lockup">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="headline-block-word"
              >
                Full Stack
              </motion.span>

              <motion.span
                initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
                animate={{ opacity: 1, rotate: -4, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="headline-cursive-word"
              >
                developer.
              </motion.span>
            </div>

            {/* Quick action tags under title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="headline-tag-row"
            >
              <span className="headline-tag">Core Java & Spring Boot</span>
              <span className="tag-dot">•</span>
              <span className="headline-tag">React.js & TypeScript</span>
              <span className="tag-dot">•</span>
              <span className="headline-tag">PostgreSQL & Microservices</span>
            </motion.div>
          </div>

          {/* Section Divider Hairline */}
          <div className="poster-divider-line" />

          {/* =========================================================
              PART 3: 4-COLUMN EDITORIAL DOSSIER GRID
              Directly reverse-engineered from Behance module 1330613731:
              1. About Me
              2. Work Experiences
              3. Education
              4. Skills & Personal Info
              ========================================================= */}
          <div className="poster-dossier-grid">
            
            {/* COLUMN 1: About Me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.8 }}
              className="dossier-column"
            >
              <div className="dossier-header">
                <span className="dossier-dot dot-lavender" />
                <h3 className="dossier-title">About Me</h3>
              </div>
              <p className="dossier-body-text">
                I am a Computer Science Engineering graduate with <strong>Honors (8.51 CGPA)</strong>,
                passionate about architecting resilient enterprise backend services with <strong>Core Java & Spring Boot</strong>,
                and creating reactive, accessible user interfaces in <strong>React.js & TypeScript</strong>.
              </p>
              <div className="dossier-highlight-box">
                <Sparkles size={14} className="sparkle-icon" />
                <span>Specialized in scalable REST APIs, relational databases, and clean decoupled architectures.</span>
              </div>
            </motion.div>

            {/* COLUMN 2: Work Experiences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.9 }}
              className="dossier-column"
            >
              <div className="dossier-header">
                <span className="dossier-dot dot-pink" />
                <h3 className="dossier-title">Work Experiences</h3>
              </div>

              <div className="dossier-exp-item">
                <div className="exp-role-title">Full Stack Developer</div>
                <div className="exp-company-period">
                  <strong>Imperial Info System</strong> <span className="exp-pill">Aug, 2026 – Present</span>
                </div>
                <ul className="exp-bullets">
                  <li>Engineered responsive React.js UI modules with modern interactive workflows.</li>
                  <li>Integrated RESTful endpoints for streamlined data exchange.</li>
                </ul>
              </div>

              <div className="dossier-exp-item">
                <div className="exp-role-title">Python Full Stack Intern</div>
                <div className="exp-company-period">
                  <strong>Agile Infotech</strong> <span className="exp-pill">2025</span>
                </div>
                <ul className="exp-bullets">
                  <li>Built 3 enterprise applications integrated with MongoDB.</li>
                </ul>
              </div>

              <div className="dossier-exp-item">
                <div className="exp-role-title">Full Stack Web Intern</div>
                <div className="exp-company-period">
                  <strong>Ak Info Park</strong> <span className="exp-pill">15% Latency Boost</span>
                </div>
                <ul className="exp-bullets">
                  <li>Optimized data pipelines across 5 responsive web modules.</li>
                </ul>
              </div>
            </motion.div>

            {/* COLUMN 3: Education & Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.0 }}
              className="dossier-column"
            >
              <div className="dossier-header">
                <span className="dossier-dot dot-lavender" />
                <h3 className="dossier-title">Education</h3>
              </div>

              <div className="dossier-edu-item">
                <div className="edu-degree">B.E. Computer Science & Eng.</div>
                <div className="edu-honors-tag">Awarded with Honors • 8.51 CGPA</div>
                <div className="edu-institution">Ponjesly College of Engineering</div>
              </div>

              <div className="dossier-edu-item">
                <div className="edu-degree">Higher Secondary Certificate (HSC)</div>
                <div className="edu-institution">St. Joseph’s Convent • 73.17%</div>
              </div>

              <div className="dossier-edu-item">
                <div className="edu-degree">Secondary School Certificate (SSLC)</div>
                <div className="edu-institution">St. Joseph’s Convent • 74.6%</div>
              </div>

              <div className="dossier-cert-box">
                <div className="cert-title">Full Stack Web & Java Masterclass</div>
                <div className="cert-issuer">Intensive Certification (Core Java, Spring Boot, React)</div>
              </div>
            </motion.div>

            {/* COLUMN 4: Skills & Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.1 }}
              className="dossier-column"
            >
              {/* Personal Info */}
              <div className="dossier-header">
                <span className="dossier-dot dot-pink" />
                <h3 className="dossier-title">Personal Info</h3>
              </div>

              <div className="personal-info-list">
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{personalInfo.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Status:</span>
                  <span className="info-status-pill">
                    <span className="status-indicator-dot" /> Available for Roles
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Location:</span>
                  <span className="info-value">Kanyakumari / Chennai, India</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <a href={`mailto:${personalInfo.email}`} className="info-email-link">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Skills section */}
              <div className="dossier-header" style={{ marginTop: '1.25rem' }}>
                <span className="dossier-dot dot-lavender" />
                <h3 className="dossier-title">Core Skills</h3>
              </div>

              <div className="skills-badge-wrap">
                <span className="skill-pill-lavender">Core Java</span>
                <span className="skill-pill-pink">Spring Boot</span>
                <span className="skill-pill-lavender">React.js</span>
                <span className="skill-pill-pink">TypeScript</span>
                <span className="skill-pill-lavender">PostgreSQL</span>
                <span className="skill-pill-pink">Supabase</span>
                <span className="skill-pill-lavender">REST APIs</span>
                <span className="skill-pill-pink">JPA/Hibernate</span>
                <span className="skill-pill-lavender">Python</span>
                <span className="skill-pill-pink">Git / GitHub</span>
              </div>
            </motion.div>
          </div>

          {/* =========================================================
              PART 4: ACTION CTA BAR & SOCIAL CONNECTORS
              ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="poster-footer-bar"
          >
            <div className="footer-action-buttons">
              {/* Resume Button with Download Trigger */}
              <motion.button
                onClick={onOpenResumeModal}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-lavender-primary"
              >
                <FileDown size={18} />
                <span>Download Resume</span>
              </motion.button>

              {/* Explore Works Anchor Button */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-lavender-secondary"
              >
                <span>Explore Selected Works</span>
                <ArrowRight size={17} />
              </motion.a>

              {/* Get in Touch Quick Link */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-lavender-ghost"
              >
                <Mail size={16} />
                <span>Get in Touch</span>
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="footer-social-connectors">
              <span className="social-connect-label">Connect:</span>
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon-btn"
                title="GitHub"
              >
                <GithubIcon size={17} />
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon-btn"
                title="LinkedIn"
              >
                <LinkedinIcon size={17} />
              </motion.a>
            </div>
          </motion.div>

        </motion.div>

      </div>

      {/* Scoped CSS Styles for the First Section Behance Re-creation */}
      <style>{`
        .behance-hero-section {
          padding-top: 5.5rem;
          padding-bottom: 2rem;
          position: relative;
        }

        .behance-poster-card {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF6FD 45%, #FFFFFF 100%);
          border-radius: clamp(24px, 4vw, 36px);
          border: 1px solid #EAE0F5;
          box-shadow: 0 16px 45px -12px rgba(147, 51, 234, 0.08), 0 4px 18px -4px rgba(236, 72, 153, 0.04);
          padding: clamp(1.75rem, 4vw, 3.5rem);
          overflow: hidden;
        }

        /* Subtle Ambient Glows */
        .poster-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .poster-glow-lavender {
          top: -60px;
          right: 5%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(216, 180, 254, 0.35) 0%, rgba(243, 232, 255, 0) 70%);
        }

        .poster-glow-pink {
          top: 15%;
          left: -40px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.22) 0%, rgba(253, 242, 248, 0) 70%);
        }

        /* =========================================
           PART 1: MASTHEAD & CUTOUT
           ========================================= */
        .masthead-container {
          position: relative;
          width: 100%;
          min-height: clamp(340px, 44vw, 460px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          z-index: 1;
        }

        /* "My" Cursive Script */
        .masthead-my-script {
          position: absolute;
          top: 0;
          left: clamp(0.5rem, 3vw, 2.5rem);
          font-family: var(--font-script);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #1D1527;
          line-height: 1;
          user-select: none;
          z-index: 2;
        }

        /* "PORTFOLIO" Tall Outlined Text - Immune to Framer Motion transform overwrite */
        .masthead-portfolio-outline {
          position: absolute;
          top: clamp(0.25rem, 1.5vw, 1rem);
          left: 0;
          right: 0;
          width: 100%;
          text-align: center;
          font-family: var(--font-display);
          font-size: clamp(3.8rem, 11vw, 8.8rem);
          line-height: 0.9;
          letter-spacing: clamp(0.04em, 0.08em, 0.12em);
          color: transparent;
          -webkit-text-stroke: 1.75px #D8B4FE;
          user-select: none;
          pointer-events: none;
          z-index: 1;
          opacity: 0.8;
          white-space: nowrap;
        }

        /* "Jershika" Script Watermark */
        .masthead-signature-watermark {
          position: absolute;
          top: clamp(2rem, 5vw, 4.25rem);
          left: 0;
          right: 0;
          width: 100%;
          text-align: center;
          font-family: var(--font-script);
          font-size: clamp(4.2rem, 12vw, 9.5rem);
          font-weight: 700;
          color: rgba(216, 180, 254, 0.38);
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          z-index: 2;
        }

        /* Cutout Portrait Container */
        .masthead-cutout-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
          height: 100%;
          padding-top: 1rem;
          z-index: 3;
        }

        .cutout-halo-glow {
          position: absolute;
          bottom: 8%;
          width: clamp(260px, 30vw, 360px);
          height: clamp(260px, 30vw, 360px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, rgba(192, 132, 252, 0.22) 45%, transparent 70%);
          filter: blur(36px);
          pointer-events: none;
          z-index: 0;
        }

        .cutout-photo-motion {
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 14px 28px rgba(147, 51, 234, 0.12));
          display: flex;
          justify-content: center;
        }

        .cutout-img {
          height: clamp(280px, 38vw, 410px);
          max-width: 85vw;
          object-fit: contain;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Floating Badge on Right of Cutout */
        .cutout-floating-badge {
          position: absolute;
          right: clamp(0.5rem, 5vw, 6rem);
          top: clamp(35%, 40%, 48%);
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid #EAE0F5;
          box-shadow: 0 10px 25px rgba(147, 51, 234, 0.08);
          border-radius: 16px;
          padding: 0.65rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          z-index: 4;
        }

        .badge-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: #1D1527;
        }

        .badge-role {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .badge-role-pill {
          background: #F3E8FF;
          color: #9333EA;
          font-weight: 700;
          font-size: 0.72rem;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }

        .badge-role-sub {
          font-weight: 600;
          color: #645674;
        }

        /* Floating Honors Pill on Left of Cutout */
        .cutout-honors-pill {
          position: absolute;
          left: clamp(0.5rem, 5vw, 6rem);
          bottom: 20%;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid #FBCFE8;
          box-shadow: 0 10px 25px rgba(236, 72, 153, 0.08);
          border-radius: 9999px;
          padding: 0.5rem 1.05rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: #831843;
          z-index: 4;
        }

        .honors-icon {
          color: #EC4899;
        }

        /* =========================================
           PART 2: HEADLINE STATEMENT AREA
           ========================================= */
        .headline-statement-area {
          text-align: left;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .headline-preamble {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          font-weight: 500;
          color: #645674;
          letter-spacing: -0.01em;
          margin-bottom: 0.4rem;
        }

        .preamble-name-accent {
          color: #9333EA;
          font-weight: 700;
        }

        /* Main Headline Title Lockup: Graphic designer. dynamic */
        .headline-title-lockup {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: clamp(0.5rem, 1.5vw, 1.25rem);
          margin-bottom: 0.65rem;
        }

        .headline-block-word {
          font-family: var(--font-heading);
          font-size: clamp(2.8rem, 6.8vw, 5.75rem);
          font-weight: 900;
          color: #1D1527;
          letter-spacing: -0.035em;
          line-height: 0.95;
          text-transform: capitalize;
        }

        .headline-cursive-word {
          font-family: var(--font-script);
          font-size: clamp(3.2rem, 7.8vw, 6.5rem);
          font-weight: 700;
          color: #9333EA;
          background: linear-gradient(135deg, #9333EA 0%, #C084FC 40%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 0.95;
          display: inline-block;
          transform-origin: left bottom;
        }

        .headline-tag-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.65rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #645674;
        }

        .headline-tag {
          color: #645674;
        }

        .tag-dot {
          color: #D8B4FE;
        }

        /* Divider */
        .poster-divider-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(234, 224, 245, 0.2) 0%, rgba(216, 180, 254, 0.8) 25%, rgba(244, 114, 182, 0.6) 75%, rgba(234, 224, 245, 0.2) 100%);
          margin: 1.75rem 0 2.25rem 0;
        }

        /* =========================================
           PART 3: 4-COLUMN DOSSIER GRID
           ========================================= */
        .poster-dossier-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 640px) {
          .poster-dossier-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.75rem;
          }
        }

        @media (min-width: 1024px) {
          .poster-dossier-grid {
            grid-template-columns: 1.1fr 1.35fr 1.25fr 1.3fr;
            gap: 1.75rem;
          }
        }

        .dossier-column {
          display: flex;
          flex-direction: column;
        }

        .dossier-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .dossier-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot-lavender {
          background: #9333EA;
          box-shadow: 0 0 8px rgba(147, 51, 234, 0.4);
        }

        .dot-pink {
          background: #EC4899;
          box-shadow: 0 0 8px rgba(236, 72, 153, 0.4);
        }

        .dossier-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #1D1527;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .dossier-body-text {
          font-size: 0.885rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 0.85rem;
        }

        .dossier-highlight-box {
          background: #FAF5FF;
          border: 1px solid #E9D5FF;
          border-radius: 12px;
          padding: 0.65rem 0.85rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #6B21A8;
          line-height: 1.5;
        }

        .sparkle-icon {
          color: #9333EA;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Work Experience in Dossier */
        .dossier-exp-item {
          margin-bottom: 0.95rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px dashed #EAE0F5;
        }

        .dossier-exp-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .exp-role-title {
          font-weight: 700;
          font-size: 0.885rem;
          color: #1D1527;
          line-height: 1.3;
        }

        .exp-company-period {
          font-size: 0.785rem;
          color: var(--text-muted);
          margin: 0.2rem 0 0.35rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .exp-pill {
          background: #FCE7F3;
          color: #BE185D;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
        }

        .exp-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .exp-bullets li {
          position: relative;
          padding-left: 0.9rem;
          margin-bottom: 0.2rem;
        }

        .exp-bullets li::before {
          content: "›";
          position: absolute;
          left: 0;
          color: #9333EA;
          font-weight: bold;
          font-size: 0.95rem;
          line-height: 1;
        }

        /* Education in Dossier */
        .dossier-edu-item {
          margin-bottom: 0.8rem;
          padding-bottom: 0.7rem;
          border-bottom: 1px dashed #EAE0F5;
        }

        .dossier-edu-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .edu-degree {
          font-weight: 700;
          font-size: 0.885rem;
          color: #1D1527;
          line-height: 1.3;
        }

        .edu-honors-tag {
          font-size: 0.785rem;
          font-weight: 700;
          color: #9333EA;
          margin: 0.15rem 0;
        }

        .edu-institution {
          font-size: 0.785rem;
          color: var(--text-muted);
        }

        .dossier-cert-box {
          background: #FDF2F8;
          border: 1px solid #FBCFE8;
          border-radius: 12px;
          padding: 0.65rem 0.85rem;
          margin-top: 0.5rem;
        }

        .cert-title {
          font-weight: 700;
          font-size: 0.825rem;
          color: #9D174D;
        }

        .cert-issuer {
          font-size: 0.75rem;
          color: #831843;
          margin-top: 0.15rem;
        }

        /* Personal Info in Dossier */
        .personal-info-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          font-size: 0.825rem;
          margin-bottom: 0.5rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-label {
          font-weight: 700;
          color: #1D1527;
          width: 60px;
          flex-shrink: 0;
        }

        .info-value {
          color: var(--text-muted);
          font-weight: 500;
        }

        .info-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(22, 163, 74, 0.08);
          color: #15803D;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 0.15rem 0.55rem;
          border-radius: 9999px;
          border: 1px solid rgba(22, 163, 74, 0.2);
        }

        .status-indicator-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16A34A;
          box-shadow: 0 0 6px rgba(22, 163, 74, 0.6);
        }

        .info-email-link {
          color: #9333EA;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
          word-break: break-all;
        }

        /* Skills Badges */
        .skills-badge-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .skill-pill-lavender {
          background: #F3E8FF;
          border: 1px solid #E9D5FF;
          color: #6B21A8;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          transition: all 0.2s ease;
        }

        .skill-pill-pink {
          background: #FCE7F3;
          border: 1px solid #FBCFE8;
          color: #9D174D;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          transition: all 0.2s ease;
        }

        .skill-pill-lavender:hover, .skill-pill-pink:hover {
          transform: translateY(-1px);
        }

        /* =========================================
           PART 4: ACTION CTA BAR
           ========================================= */
        .poster-footer-bar {
          margin-top: 2.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid #EAE0F5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          position: relative;
          z-index: 2;
        }

        .footer-action-buttons {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .btn-lavender-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #1D1527;
          color: #FFFFFF;
          padding: 0.75rem 1.65rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 16px rgba(29, 21, 39, 0.2);
          cursor: pointer;
          border: none;
        }

        .btn-lavender-primary:hover {
          background: #361F4D;
          box-shadow: 0 6px 20px rgba(147, 51, 234, 0.25);
        }

        .btn-lavender-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #FFFFFF;
          color: #1D1527;
          border: 1px solid #DFCDEC;
          padding: 0.75rem 1.45rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 2px 8px rgba(147, 51, 234, 0.04);
          text-decoration: none;
        }

        .btn-lavender-secondary:hover {
          background: #FAF7FC;
          border-color: #9333EA;
          color: #9333EA;
        }

        .btn-lavender-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: transparent;
          color: #645674;
          padding: 0.75rem 1.15rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.885rem;
          text-decoration: none;
        }

        .btn-lavender-ghost:hover {
          color: #9333EA;
          background: #F5EFFB;
        }

        .footer-social-connectors {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .social-connect-label {
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-dim);
          margin-right: 0.2rem;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid #DFCDEC;
          color: #1D1527;
          box-shadow: 0 2px 6px rgba(147, 51, 234, 0.04);
          text-decoration: none;
        }

        .social-icon-btn:hover {
          border-color: #9333EA;
          color: #9333EA;
          background: #FAF5FF;
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .masthead-container {
            min-height: 320px;
          }

          .cutout-img {
            height: 290px;
          }

          .cutout-floating-badge {
            right: 0.5rem;
            top: 25%;
            padding: 0.5rem 0.75rem;
          }

          .cutout-honors-pill {
            left: 0.5rem;
            bottom: 12%;
            padding: 0.35rem 0.75rem;
            font-size: 0.75rem;
          }

          .headline-title-lockup {
            gap: 0.4rem;
          }

          .headline-block-word {
            font-size: 2.85rem;
          }

          .headline-cursive-word {
            font-size: 3.25rem;
          }

          .footer-action-buttons {
            width: 100%;
          }

          .btn-lavender-primary, .btn-lavender-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
