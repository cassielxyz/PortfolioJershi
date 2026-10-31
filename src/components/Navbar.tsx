import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Bookmark, FileDown } from 'lucide-react';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

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

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.25s ease',
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.04)' : 'none'
      }}
    >
      <div className="content-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.75rem' }}>
        
        {/* Left: Avatar & Profile Info (Matches theme screenshot) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <div
              style={{
                position: 'relative',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                flexShrink: 0
              }}
            >
              <img
                src="/profile.jpg"
                alt="Jershika C"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#16a34a',
                  border: '2px solid #ffffff'
                }}
                title="Available for work"
              />
            </div>
            
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#18181b', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                Jershika C
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.785rem' }}>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>Available for work</span>
               
              
              </div>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--bg-secondary)',
            padding: '0.3rem 0.5rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-subtle)'
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
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isActive ? '#18181b' : '#6b655f',
                  background: isActive ? '#ffffff' : 'transparent',
                  boxShadow: isActive ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions CTA (Heart, Bookmark, and "Get in touch" pill button) */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.65rem' }} className="desktop-nav">
          {/* Like / Heart Icon Button */}
          <button
            onClick={handleLike}
            className="interactive"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--border-light)',
              background: liked ? '#fee2e2' : '#ffffff',
              color: liked ? '#ef4444' : '#18181b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            title={`Appreciate profile (${likeCount})`}
            aria-label="Like"
          >
            <Heart size={18} fill={liked ? '#ef4444' : 'none'} />
          </button>

          {/* Bookmark / Resume Download Button */}
          <button
            onClick={onOpenResumeModal}
            className="interactive"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--border-light)',
              background: '#ffffff',
              color: '#18181b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            title="Save / View Resume"
            aria-label="Resume"
          >
            <Bookmark size={18} />
          </button>

          {/* Solid Black "Get in touch" Pill Button */}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.45rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              background: '#12111a',
              color: '#ffffff',
              borderRadius: '9999px',
              boxShadow: '0 4px 14px rgba(18, 17, 26, 0.15)',
              textDecoration: 'none'
            }}
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.6rem',
            height: '2.6rem',
            borderRadius: '0.65rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: '#18181b'
          }}
          className="mobile-toggle"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#ffffff',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: activeSection === link.href.replace('#', '') ? '#18181b' : '#6b655f',
                background: activeSection === link.href.replace('#', '') ? '#faf0e7' : 'transparent',
                display: 'block'
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
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem' }}
            >
              <FileDown size={16} /> Resume
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem' }}
            >
              Get in touch
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
