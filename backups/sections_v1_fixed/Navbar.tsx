import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="liquid-navbar-header">
      <div className="content-wrapper liquid-navbar-row">
        
        {/* Center: Apple-style Liquid Glass Navigation Capsule */}
        <nav className="liquid-glass-dock desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`liquid-glass-item ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Liquid Glass Action Buttons (Resume & Get In Touch) */}
        <div className="liquid-glass-actions desktop-nav">
          <button
            onClick={onOpenResumeModal}
            className="liquid-glass-btn-resume"
            title="Download Resume"
          >
            <FileDown size={15} color="#9333EA" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="liquid-glass-btn-contact"
          >
            <span>Get in touch</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Liquid Glass Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="liquid-glass-mobile-toggle mobile-toggle"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-mobile-menu"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-glass-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              );
            })}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="liquid-glass-btn-resume"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <FileDown size={16} />
                <span>Resume</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="liquid-glass-btn-contact"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>Get in touch</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styled Scoped CSS for Liquid Glass Material */}
      <style>{`
        .liquid-navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .liquid-navbar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4.8rem;
          position: relative;
          pointer-events: none;
        }

        /* =========================================================
           APPLE LIQUID GLASS CAPSULE DOCK
           - Real translucent liquid material with specular highlights
           - Centered floating dock on desktop
           ========================================================= */
        .liquid-glass-dock {
          pointer-events: auto;
          display: none;
          align-items: center;
          gap: 0.25rem;
          padding: 0.36rem 0.65rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.76) 0%, rgba(255, 255, 255, 0.32) 100%);
          backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          border: 1px solid rgba(255, 255, 255, 0.88);
          box-shadow: 
            0 12px 32px -4px rgba(147, 51, 234, 0.08),
            0 4px 12px -2px rgba(0, 0, 0, 0.03),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.98),
            inset 0 -1.5px 2px 0 rgba(147, 51, 234, 0.05),
            inset 0 0 0 1px rgba(255, 255, 255, 0.45);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          overflow: hidden;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .liquid-glass-dock::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 48%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, transparent 100%);
          border-radius: 9999px 9999px 0 0;
          pointer-events: none;
        }

        .liquid-glass-dock:hover {
          border-color: rgba(255, 255, 255, 1);
          box-shadow: 
            0 16px 42px -4px rgba(147, 51, 234, 0.14),
            inset 0 1.5px 2.5px 0 rgba(255, 255, 255, 1);
        }

        .liquid-glass-item {
          position: relative;
          padding: 0.45rem 1.05rem;
          border-radius: 9999px;
          font-size: 0.865rem;
          font-weight: 500;
          color: #645674;
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .liquid-glass-item:hover {
          color: #9333EA;
          background: rgba(255, 255, 255, 0.58);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.9);
        }

        .liquid-glass-item.active {
          color: #9333EA;
          font-weight: 700;
          background: linear-gradient(135deg, rgba(243, 232, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%);
          box-shadow: 
            0 2px 10px rgba(147, 51, 234, 0.14),
            inset 0 1.5px 1.5px rgba(255, 255, 255, 1),
            inset 0 0 0 1px rgba(216, 180, 254, 0.65);
        }

        /* =========================================================
           RIGHT ACTION GROUP: LIQUID GLASS RESUME & GET IN TOUCH
           ========================================================= */
        .liquid-glass-actions {
          pointer-events: auto;
          margin-left: auto;
          display: none;
          align-items: center;
          gap: 0.75rem;
          z-index: 2;
        }

        .liquid-glass-btn-resume {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.58rem 1.25rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.36) 100%);
          backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          border: 1px solid rgba(255, 255, 255, 0.88);
          color: #1D1527;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 
            0 6px 20px -3px rgba(147, 51, 234, 0.08),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.98),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.04),
            inset 0 0 0 1px rgba(255, 255, 255, 0.45);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .liquid-glass-btn-resume::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.48) 0%, transparent 55%);
          border-radius: inherit;
          pointer-events: none;
        }

        .liquid-glass-btn-resume:hover {
          transform: translateY(-2px) scale(1.02);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.58) 100%);
          border-color: rgba(255, 255, 255, 1);
          box-shadow: 
            0 12px 28px -4px rgba(147, 51, 234, 0.16),
            inset 0 1.5px 2.5px 0 rgba(255, 255, 255, 1);
          color: #9333EA;
        }

        .liquid-glass-btn-contact {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.62rem 1.4rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(29, 21, 39, 0.9) 0%, rgba(45, 25, 65, 0.85) 100%);
          backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          border: 1px solid rgba(255, 255, 255, 0.38);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          box-shadow: 
            0 8px 24px -3px rgba(29, 21, 39, 0.28),
            0 4px 12px rgba(147, 51, 234, 0.2),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.68),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.35);
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .liquid-glass-btn-contact::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, transparent 55%);
          border-radius: inherit;
          pointer-events: none;
        }

        .liquid-glass-btn-contact:hover {
          transform: translateY(-2px) scale(1.02);
          background: linear-gradient(135deg, rgba(54, 31, 77, 0.95) 0%, rgba(93, 33, 138, 0.9) 100%);
          border-color: rgba(255, 255, 255, 0.58);
          box-shadow: 
            0 12px 34px -4px rgba(147, 51, 234, 0.38),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.88);
        }

        /* =========================================================
           MOBILE TOGGLE & DROPDOWN MENU
           ========================================================= */
        .liquid-glass-mobile-toggle {
          pointer-events: auto;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 0.85rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.35) 100%);
          backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          border: 1px solid rgba(255, 255, 255, 0.88);
          color: #1D1527;
          box-shadow: 
            0 6px 20px -3px rgba(147, 51, 234, 0.08),
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.98);
          cursor: pointer;
        }

        .liquid-glass-mobile-menu {
          pointer-events: auto;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(250, 247, 252, 0.92) 100%);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 20px;
          margin: 0.5rem 1.5rem 1rem;
          padding: 1.25rem 1.5rem;
          box-shadow: 
            0 16px 40px -8px rgba(147, 51, 234, 0.15),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .mobile-glass-link {
          padding: 0.65rem 1rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1D1527;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .mobile-glass-link.active {
          color: #9333EA;
          background: rgba(243, 232, 255, 0.7);
          border-color: rgba(216, 180, 254, 0.5);
        }

        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
