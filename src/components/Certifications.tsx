import React from 'react';
import { ShieldCheck, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';
import { TechLogo } from './TechLogos';

export const Certifications: React.FC = () => {
  const cert = certifications[0];

  return (
    <section id="certifications" className="certifications-showcase-section">
      <style>{`
        /* =========================================================
           CERTIFICATION: AUTHENTIC LUXURY DIPLOMA CERTIFICATE THEME
           Palette: Obsidian Black, Ash Neutrals, Whisper Lavender, Crisp White
           Fonts: Bodoni Moda / Instrument Serif & Plus Jakarta Sans
           ========================================================= */
        .certifications-showcase-section {
          position: relative;
          width: 100%;
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 55% 45% at 85% 20%, rgba(245, 208, 254, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(230, 215, 245, 0.22) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          padding: 5.5rem 1.5rem 6.5rem 1.5rem;
          box-sizing: border-box;
          color: #121118;
          overflow: hidden;
        }

        .cert-container {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Section Header */
        .cert-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3.5rem auto;
        }

        .cert-eyebrow {
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

        .cert-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5D0FE;
          box-shadow: 0 0 8px rgba(245, 208, 254, 0.9);
        }

        .cert-title {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #121118;
          margin: 0 0 0.75rem 0;
        }

        .cert-subtitle {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: #63606E;
          margin: 0 auto;
          max-width: 520px;
        }

        /* =========================================================
           AUTHENTIC DIPLOMA CERTIFICATE SHELL
           Double hairline security borders, corner flourishes & foil seal
           ========================================================= */
        .certificate-diploma-shell {
          position: relative;
          background: #FFFFFF;
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(245, 208, 254, 0.08) 0%, transparent 65%),
            repeating-linear-gradient(45deg, rgba(38, 36, 46, 0.008) 0, rgba(38, 36, 46, 0.008) 1px, transparent 1px, transparent 10px);
          border: 1px solid rgba(38, 36, 46, 0.16);
          border-radius: 20px;
          padding: 3.5rem 3.5rem 3rem 3.5rem;
          box-shadow: 
            0 24px 60px -16px rgba(20, 19, 26, 0.1),
            0 0 32px rgba(245, 208, 254, 0.2),
            inset 0 1.5px 2px #FFFFFF;
          box-sizing: border-box;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .certificate-diploma-shell:hover {
          box-shadow: 
            0 32px 70px -16px rgba(20, 19, 26, 0.14),
            0 0 40px rgba(245, 208, 254, 0.3),
            inset 0 1.5px 2px #FFFFFF;
        }

        /* Inner Security Hairline Frame */
        .certificate-inner-frame {
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(38, 36, 46, 0.12);
          border-radius: 12px;
          pointer-events: none;
        }

        .certificate-dashed-frame {
          position: absolute;
          inset: 19px;
          border: 1px dashed rgba(245, 208, 254, 0.7);
          border-radius: 9px;
          pointer-events: none;
        }

        /* Corner Flourish Brackets */
        .corner-flourish {
          position: absolute;
          width: 22px;
          height: 22px;
          border-color: #26242E;
          pointer-events: none;
        }

        .corner-tl { top: 24px; left: 24px; border-top: 2px solid #26242E; border-left: 2px solid #26242E; }
        .corner-tr { top: 24px; right: 24px; border-top: 2px solid #26242E; border-right: 2px solid #26242E; }
        .corner-bl { bottom: 24px; left: 24px; border-bottom: 2px solid #26242E; border-left: 2px solid #26242E; }
        .corner-br { bottom: 24px; right: 24px; border-bottom: 2px solid #26242E; border-right: 2px solid #26242E; }

        /* Certificate Top Header */
        .cert-diploma-header {
          text-align: center;
          margin-bottom: 2.25rem;
        }

        .cert-top-crest-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.85rem;
          background: rgba(38, 36, 46, 0.04);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #63606E;
          margin-bottom: 1.15rem;
        }

        /* Classical Certificate Heading Font */
        .cert-callout-script {
          font-family: 'Bodoni Moda', 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-style: italic;
          color: #63606E;
          letter-spacing: 0.02em;
          margin: 0 0 0.5rem 0;
        }

        .cert-presented-text {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8E8B99;
          margin: 0 0 0.85rem 0;
        }

        /* Recipient Name: JERSHIKA C */
        .cert-recipient-name {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.85rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #121118;
          margin: 0 0 0.5rem 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .cert-attribution-text {
          font-size: 0.875rem;
          line-height: 1.5;
          color: #63606E;
          max-width: 580px;
          margin: 0 auto 1.5rem auto;
        }

        /* Course Title */
        .cert-course-title {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
          font-size: clamp(1.35rem, 2.2vw, 1.8rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #121118;
          margin: 0 0 1.75rem 0;
        }

        /* Competency Highlights */
        .cert-highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem 1.75rem;
          margin-bottom: 2.25rem;
          text-align: left;
        }

        .cert-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.84rem;
          line-height: 1.5;
          color: #26242E;
        }

        .cert-check-icon {
          color: #121118;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Verified Tech Skills Row */
        .cert-skills-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          border-bottom: 1px solid rgba(38, 36, 46, 0.08);
          margin-bottom: 2.5rem;
        }

        .cert-skill-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.7rem;
          background: #FAF7FC;
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #26242E;
        }

        /* Certificate Footer: Issuer Info & Official Embossed Foil Seal */
        .cert-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .cert-issuer-block {
          text-align: left;
        }

        .cert-issuer-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8E8B99;
          margin-bottom: 0.25rem;
        }

        .cert-issuer-val {
          font-size: 0.875rem;
          font-weight: 700;
          color: #121118;
          margin-bottom: 0.2rem;
        }

        .cert-issuer-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #63606E;
        }

        /* Embossed Gold Foil Seal Medallion */
        .cert-foil-seal {
          position: relative;
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FAF7FC 35%, #F0EBF5 70%, #E2DAEB 100%);
          border: 2px solid #26242E;
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.08),
            0 0 16px rgba(245, 208, 254, 0.5),
            inset 0 1.5px 2px #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0.25rem;
          box-sizing: border-box;
          cursor: default;
          transition: transform 0.25s ease;
        }

        .cert-foil-seal:hover {
          transform: scale(1.06) rotate(3deg);
        }

        .seal-star-icon {
          color: #4A1D96;
          margin-bottom: 2px;
        }

        .seal-text-top {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.5rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #121118;
          line-height: 1.1;
        }

        .seal-text-bot {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.45rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #63606E;
        }

        /* Digital Signature Block */
        .cert-sign-block {
          text-align: right;
        }

        .cert-sign-script {
          font-family: 'Bodoni Moda', 'Instrument Serif', Georgia, serif;
          font-size: 1.5rem;
          font-style: italic;
          color: #121118;
          border-bottom: 1px solid rgba(38, 36, 46, 0.3);
          padding-bottom: 0.35rem;
          margin-bottom: 0.35rem;
          display: inline-block;
          min-width: 140px;
        }

        .cert-sign-title {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8E8B99;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .certificate-diploma-shell {
            padding: 2.25rem 1.5rem;
          }

          .cert-highlights-grid {
            grid-template-columns: 1fr;
          }

          .cert-footer-row {
            flex-direction: column;
            text-align: center;
            gap: 1.25rem;
          }

          .cert-issuer-block, .cert-sign-block {
            text-align: center;
          }
        }
      `}</style>

      <div className="cert-container">
        
        {/* Section Header */}
        {/* Section Header with smooth in-animation */}
        <motion.div 
          className="cert-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cert-eyebrow">
            <span className="cert-eyebrow-dot" />
            <span>06 // Continuous Learning & Mastery</span>
          </div>

          <h2 className="cert-title">
            Certifications & Verified Competence.
          </h2>

          <p className="cert-subtitle">
            Specialized intensive training programs in modern Java full-stack technologies, 
            Spring Boot microservices, and reactive frontend architectures.
          </p>
        </motion.div>

        {/* Certificate Shell */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="certificate-diploma-shell"
        >
          {/* Inner Decorative Frames */}
          <div className="certificate-inner-frame" aria-hidden="true" />
          <div className="certificate-dashed-frame" aria-hidden="true" />

          {/* Corner Flourishes */}
          <div className="corner-flourish corner-tl" aria-hidden="true" />
          <div className="corner-flourish corner-tr" aria-hidden="true" />
          <div className="corner-flourish corner-bl" aria-hidden="true" />
          <div className="corner-flourish corner-br" aria-hidden="true" />

          {/* Certificate Header */}
          <div className="cert-diploma-header">
            <div className="cert-top-crest-badge">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Official Professional Certification</span>
            </div>

            <p className="cert-callout-script">
              Certificate of Professional Competency
            </p>

            <p className="cert-presented-text">
              This credential is authenticated and awarded to
            </p>

            <h3 className="cert-recipient-name">
              Jershika C
            </h3>

            <p className="cert-attribution-text">
              for successfully completing the rigorous enterprise curriculum and demonstrating 
              verified engineering proficiency in
            </p>

            <h4 className="cert-course-title">
              {cert.title}
            </h4>
          </div>

          {/* Competency Highlights */}
          <div className="cert-highlights-grid">
            {cert.highlights.map((item, idx) => (
              <div key={idx} className="cert-highlight-item">
                <CheckCircle2 size={15} className="cert-check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Verified Skills Bar */}
          <div className="cert-skills-bar">
            {cert.skills.map((skill) => (
              <span key={skill} className="cert-skill-pill">
                <TechLogo name={skill} size={13} className="text-zinc-600" />
                <span>{skill}</span>
              </span>
            ))}
          </div>

          {/* Footer: Issuer, Embossed Foil Seal, and Digital Signature */}
          <div className="cert-footer-row">
            <div className="cert-issuer-block">
              <div className="cert-issuer-label">Accreditation Body</div>
              <div className="cert-issuer-val">{cert.issuer}</div>
              <div className="cert-issuer-date">
                <Calendar size={13} />
                <span>{cert.period}</span>
              </div>
            </div>

            {/* Embossed Medallion Foil Seal */}
            <div className="cert-foil-seal" title="Verified Credential Seal">
              <Sparkles size={14} className="seal-star-icon" />
              <span className="seal-text-top">VERIFIED</span>
              <span className="seal-text-bot">CREDENTIAL</span>
            </div>

            <div className="cert-sign-block">
              <div className="cert-sign-script">Authenticated</div>
              <div className="cert-sign-title">Enterprise Engineering Board</div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;
