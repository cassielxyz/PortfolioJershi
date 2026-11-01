import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, FileDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface FooterProps {
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="portfolio-liquid-footer">
      <style>{`
        /* =========================================================
           COMPACT APPLE LIQUID GLASS FOOTER (Pinkish Lavender & Ash)
           ========================================================= */
        .portfolio-liquid-footer {
          position: relative;
          z-index: 10;
          width: 100%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          border-top: 1px solid rgba(38, 36, 46, 0.09);
          box-shadow: 
            0 -10px 30px rgba(0, 0, 0, 0.02),
            inset 0 1.5px 2px rgba(255, 255, 255, 1);
          padding: 2.75rem 1.5rem 1.75rem 1.5rem;
          box-sizing: border-box;
          color: #121118;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
        }

        .footer-inner-shell {
          max-width: 1140px;
          margin: 0 auto;
        }

        .footer-compact-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr;
          gap: 2.5rem;
          align-items: start;
          margin-bottom: 2rem;
        }

        .footer-brand-lockup {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .footer-monogram-circle {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          background: #181622;
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bodoni Moda', Georgia, serif;
          font-weight: 700;
          color: #FFFFFF;
          font-size: 0.88rem;
          box-shadow: 0 4px 12px rgba(24, 22, 34, 0.15);
        }

        .footer-brand-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #121118;
          letter-spacing: -0.02em;
        }

        .footer-lead-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: #63606E;
          margin: 0 0 1.15rem 0;
          max-width: 360px;
        }

        .footer-social-icons-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .footer-social-pill-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(20, 19, 26, 0.04);
          border: 1px solid rgba(38, 36, 46, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #26242E;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-social-pill-btn:hover {
          background: #181622;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(24, 22, 34, 0.15);
        }

        .footer-col-heading {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8E8B99;
          margin-bottom: 0.95rem;
        }

        .footer-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          font-size: 0.85rem;
        }

        .footer-nav-link {
          color: #4C4859;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-nav-link:hover {
          color: #7E22CE;
          transform: translateX(2px);
        }

        .footer-resume-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          border-radius: 9999px;
          background: rgba(245, 208, 254, 0.35);
          border: 1px solid rgba(245, 208, 254, 0.85);
          color: #4A1D96;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.75rem;
        }

        .footer-resume-card-btn:hover {
          background: rgba(245, 208, 254, 0.6);
          border-color: #9333EA;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(147, 51, 234, 0.12);
        }

        .footer-location-subtext {
          font-size: 0.8rem;
          color: #8E8B99;
          line-height: 1.5;
        }

        .footer-bottom-baseline {
          padding-top: 1.25rem;
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          font-size: 0.78rem;
          color: #8E8B99;
        }

        .footer-scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(245, 208, 254, 0.9);
          box-shadow: 0 10px 28px rgba(147, 51, 234, 0.15), inset 0 1.5px 2px rgba(255, 255, 255, 1);
          color: #121118;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 90;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .footer-scroll-top-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(147, 51, 234, 0.22);
          color: #7E22CE;
        }

        @media (max-width: 768px) {
          .footer-compact-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }
      `}</style>

      <div className="footer-inner-shell">
        <div className="footer-compact-grid">
          
          {/* Col 1: Monogram & Bio */}
          <div>
            <div className="footer-brand-lockup">
              <div className="footer-monogram-circle">
                J.
              </div>
              <span className="footer-brand-title">
                Jershika C
              </span>
            </div>

            <p className="footer-lead-desc">
              React &amp; Full Stack Developer dedicated to building responsive, modern web applications with React.js, TypeScript, and scalable backend services.
            </p>

            <div className="footer-social-icons-row">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>

              <a
                href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20-%20Jershika%20C`}
                className="footer-social-pill-btn"
                aria-label="Send Direct Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="footer-col-heading">Navigation</div>
            <div className="footer-nav-links">
              <a href="#about" className="footer-nav-link">About &amp; Logic</a>
              <a href="#skills" className="footer-nav-link">Technical Stack</a>
              <a href="#experience" className="footer-nav-link">Experience Chronicle</a>
              <a href="#projects" className="footer-nav-link">Selected Builds</a>
              <a href="#education" className="footer-nav-link">Academic Record</a>
              <a href="#contact" className="footer-nav-link">Interactive Contact</a>
            </div>
          </div>

          {/* Col 3: Direct Resume & Region */}
          <div>
            <div className="footer-col-heading">Documentation</div>
            <button
              onClick={onOpenResumeModal}
              className="footer-resume-card-btn"
            >
              <FileDown size={15} />
              <span>Preview &amp; Download Resume</span>
            </button>

            <p className="footer-location-subtext">
              Based in Kanyakumari / Chennai, Tamil Nadu, India.<br />
              Open for full-time Frontend &amp; Full Stack roles worldwide.
            </p>
          </div>

        </div>

        {/* Bottom Baseline */}
        <div className="footer-bottom-baseline">
          <div>
            © {new Date().getFullYear()} Jershika C · Jershixz. Built with React.js, TypeScript &amp; Apple Liquid Glass.
          </div>

          <div style={{ color: '#7E22CE', fontWeight: 600 }}>
            Available for Roles
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="footer-scroll-top-btn"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
