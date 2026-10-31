import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
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
      setIsScrolled(window.scrollY > 20);

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
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isScrolled
          ? 'rgba(250, 247, 252, 0.92)'
          : 'rgba(250, 247, 252, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(234, 224, 245, 0.75)',
        boxShadow: isScrolled ? '0 4px 20px rgba(147, 51, 234, 0.04)' : 'none'
      }}
    >
      <div
        className="content-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.5rem'
        }}
      >
        {/* Left: Brand / Monogram & Status */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}
        >
          {/* Chic Monogram Circle */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '-0.02em',
              boxShadow: '0 4px 12px rgba(147, 51, 234, 0.25)'
            }}
          >
            JC
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: '#1D1527',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              Jershika C<span style={{ color: '#9333EA' }}>.</span>
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                color: '#15803D',
                fontWeight: 600
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#16A34A',
                  boxShadow: '0 0 6px rgba(22, 163, 74, 0.6)'
                }}
              />
              <span>Available for Roles</span>
            </div>
          </div>
        </a>

        {/* Center: Minimalist Lavender Nav Pills */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '0.35rem 0.65rem',
            borderRadius: '9999px',
            border: '1px solid #EAE0F5',
            boxShadow: '0 2px 8px rgba(147, 51, 234, 0.03)'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  padding: '0.45rem 1.05rem',
                  borderRadius: '9999px',
                  fontSize: '0.865rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#9333EA' : '#645674',
                  background: isActive ? '#F3E8FF' : 'transparent',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Clean Action Buttons (Resume & Get In Touch) */}
        <div
          style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}
          className="desktop-nav"
        >
          {/* Minimal Resume Download Button */}
          <button
            onClick={onOpenResumeModal}
            className="interactive"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '9999px',
              border: '1px solid #DFCDEC',
              background: '#FFFFFF',
              color: '#1D1527',
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: '0 2px 6px rgba(147, 51, 234, 0.03)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <FileDown size={15} color="#9333EA" />
            <span>Resume</span>
          </button>

          {/* Solid Dark Violet "Get in touch" Pill */}
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.6rem 1.35rem',
              borderRadius: '9999px',
              background: '#1D1527',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 14px rgba(29, 21, 39, 0.18)',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Get in touch</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.65rem',
            background: '#FFFFFF',
            border: '1px solid #EAE0F5',
            color: '#1D1527'
          }}
          className="mobile-toggle"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: '#FAF7FC',
              borderBottom: '1px solid #EAE0F5',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: activeSection === link.href.replace('#', '') ? '#9333EA' : '#1D1527',
                  background: activeSection === link.href.replace('#', '') ? '#F3E8FF' : '#FFFFFF',
                  textDecoration: 'none',
                  border: '1px solid #EAE0F5'
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid #DFCDEC',
                  background: '#FFFFFF',
                  color: '#1D1527',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <FileDown size={16} />
                <span>Resume</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  background: '#1D1527',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                <span>Get in touch</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
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
