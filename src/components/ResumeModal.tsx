import React, { useRef } from 'react';
import { X, Download, Printer, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, educationList, experiences, projects } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/Jershika_C_Resume.pdf';
    link.download = 'Jershika_C_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="liquid-glass-modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-modal-shell"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Control Bar: Apple Liquid Glass Theme */}
            <div className="no-print liquid-glass-modal-header">
              <div className="modal-title-lockup">
                <div className="modal-title-icon-badge">
                  <FileText size={17} color="#9333EA" />
                </div>
                <span className="modal-title-heading">
                  Curriculum Vitae — Jershika C
                </span>
              </div>

              <div className="modal-actions-lockup">
                <motion.button
                  onClick={handleDownloadPDF}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="modal-btn-download-glass"
                  title="Download Original Resume PDF"
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </motion.button>

                <motion.button
                  onClick={handlePrint}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="modal-btn-print-glass"
                  title="Print Resume"
                >
                  <Printer size={15} />
                  <span>Print</span>
                </motion.button>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  className="modal-btn-close-glass"
                  aria-label="Close modal"
                >
                  <X size={17} />
                </motion.button>
              </div>
            </div>

        {/* Printable Resume Sheet */}
        <div
          ref={resumeRef}
          className="printable-resume"
          style={{
            background: 'rgba(255, 255, 255, 0.97)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            borderRadius: '22px',
            boxShadow: '0 16px 40px -8px rgba(147, 51, 234, 0.08), 0 4px 16px rgba(0, 0, 0, 0.03)',
            padding: '2.75rem',
            margin: '1.75rem',
            lineHeight: 1.6,
            color: '#1D1527'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              borderBottom: '2px solid rgba(216, 180, 254, 0.45)',
              paddingBottom: '1.5rem',
              marginBottom: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '82px',
                  height: '82px',
                  borderRadius: '50%',
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(243, 232, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  border: '1.5px solid rgba(216, 180, 254, 0.75)',
                  boxShadow: '0 4px 14px rgba(147, 51, 234, 0.12)',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Jershika C"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>

              <div>
                <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#120D1A', letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>
                  JERSHIKA C
                </h1>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#9333EA', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Full Stack Developer
                </h2>
                <div style={{ fontSize: '0.85rem', color: '#645674' }}>
                  Location: <strong style={{ color: '#1D1527' }}>{personalInfo.location}</strong>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                textAlign: 'left'
              }}
            >
              <div>Email: <strong style={{ color: 'var(--text-bright)' }}>{personalInfo.email}</strong></div>
              <div>Mobile: <strong style={{ color: 'var(--text-bright)' }}>{personalInfo.phone}</strong></div>
              <div>
                LinkedIn:{' '}
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'underline' }}>
                  in/jershika-c-10bbb032b
                </a>
              </div>
              <div>
                GitHub:{' '}
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'underline' }}>
                  github.com/jershika26
                </a>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#120D1A', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1.5px solid rgba(216, 180, 254, 0.45)', paddingBottom: '0.35rem', marginBottom: '0.65rem' }}>
              Profile Summary
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#645674', lineHeight: 1.7 }}>
              {personalInfo.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#120D1A', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1.5px solid rgba(216, 180, 254, 0.45)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Technical Skills
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.6rem', fontSize: '0.875rem' }}>
              <div>
                <strong style={{ color: '#120D1A' }}>Programming Languages: </strong>
                <span style={{ color: '#645674' }}>Java, Python</span>
              </div>
              <div>
                <strong style={{ color: '#120D1A' }}>Frontend Technologies: </strong>
                <span style={{ color: '#645674' }}>HTML, CSS, JavaScript, Bootstrap, React, React Bootstrap, TypeScript</span>
              </div>
              <div>
                <strong style={{ color: '#120D1A' }}>Backend Technologies: </strong>
                <span style={{ color: '#645674' }}>Core Java, OOPs, Spring Boot, REST APIs, JPA/Hibernate, Nest.js</span>
              </div>
              <div>
                <strong style={{ color: '#120D1A' }}>Databases & Cloud: </strong>
                <span style={{ color: '#645674' }}>MySQL, PostgreSQL, Supabase, MongoDB</span>
              </div>
              <div>
                <strong style={{ color: '#120D1A' }}>Tools & Platforms: </strong>
                <span style={{ color: '#645674' }}>VS Code, GitHub, Eclipse IDE, IntelliJ IDEA, Postman, Git, NetBeans IDE</span>
              </div>
              <div>
                <strong style={{ color: '#120D1A' }}>Soft Skills: </strong>
                <span style={{ color: '#645674' }}>Quick Learning, Problem-Solving, Leadership, Team Collaboration, Time Management</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#120D1A', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1.5px solid rgba(216, 180, 254, 0.45)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Professional Experience
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#120D1A' }}>
                      {exp.role} — <span style={{ color: '#9333EA' }}>{exp.company}</span>
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#645674' }}>
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: '#645674' }}>
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} style={{ marginBottom: '0.2rem' }}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#120D1A', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1.5px solid rgba(216, 180, 254, 0.45)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Key Projects
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.925rem', color: '#120D1A' }}>
                      {proj.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#9333EA', fontWeight: 600 }}>
                      [{proj.techStack.join(', ')}]
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#645674', marginBottom: '0.25rem' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#120D1A', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1.5px solid rgba(216, 180, 254, 0.45)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              {educationList.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <strong style={{ color: '#120D1A' }}>{edu.degree}</strong> — <span style={{ color: '#645674' }}>{edu.institution}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#16a34a' }}>
                    {edu.scoreType === 'CGPA' ? `CGPA: ${edu.score}` : `Percentage: ${edu.score}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#120D1A', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1.5px solid rgba(216, 180, 254, 0.45)', paddingBottom: '0.35rem', marginBottom: '0.5rem' }}>
              Certifications & Courses
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#645674' }}>
              <strong>Full Stack Web Development & Java Course</strong> (Feb 14, 2024 – Mar 3, 2024): Hands-on training in HTML, CSS, JavaScript, React.js, React Bootstrap, Java, Spring Boot, REST APIs, and Axios.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <style>{`
        .liquid-glass-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(18, 12, 28, 0.52);
          backdrop-filter: blur(18px) saturate(190%);
          -webkit-backdrop-filter: blur(18px) saturate(190%);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .liquid-glass-modal-shell {
          position: relative;
          max-width: 940px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(246, 240, 254, 0.52) 100%);
          backdrop-filter: blur(36px) saturate(210%) brightness(1.05);
          -webkit-backdrop-filter: blur(36px) saturate(210%) brightness(1.05);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 
            0 36px 90px -15px rgba(147, 51, 234, 0.3),
            0 16px 40px rgba(0, 0, 0, 0.12),
            inset 0 2px 3px 0 rgba(255, 255, 255, 1),
            inset 0 -2px 3px 0 rgba(147, 51, 234, 0.12);
          color: #1D1527;
          overflow-x: hidden;
        }

        .liquid-glass-modal-shell::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, transparent 100%);
          border-radius: 28px 28px 0 0;
          pointer-events: none;
          z-index: 11;
        }

        .liquid-glass-modal-shell::-webkit-scrollbar {
          width: 6px;
        }

        .liquid-glass-modal-shell::-webkit-scrollbar-track {
          background: transparent;
          margin: 16px 0;
        }

        .liquid-glass-modal-shell::-webkit-scrollbar-thumb {
          background: rgba(216, 180, 254, 0.6);
          border-radius: 9999px;
        }

        .liquid-glass-modal-shell::-webkit-scrollbar-thumb:hover {
          background: #9333EA;
        }

        .liquid-glass-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.15rem 2.2rem;
          border-bottom: 1px solid rgba(216, 180, 254, 0.45);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 245, 255, 0.62) 100%);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          position: sticky;
          top: 0;
          z-index: 10;
          box-shadow: inset 0 1.5px 2px 0 rgba(255, 255, 255, 1), 0 4px 20px rgba(147, 51, 234, 0.05);
        }

        .modal-title-lockup {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .modal-title-icon-badge {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(243, 232, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
          border: 1px solid rgba(216, 180, 254, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(147, 51, 234, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 1);
        }

        .modal-title-heading {
          font-weight: 800;
          font-size: 1.02rem;
          color: #120D1A;
          letter-spacing: -0.01em;
        }

        .modal-actions-lockup {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .modal-btn-download-glass {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #9333EA 0%, #7E22CE 100%);
          backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(20px) saturate(190%) brightness(1.05);
          color: #FFFFFF;
          padding: 0.62rem 1.35rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.865rem;
          letter-spacing: -0.01em;
          border: 1px solid rgba(255, 255, 255, 0.48);
          box-shadow: 
            0 8px 24px -2px rgba(147, 51, 234, 0.42),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.72),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.22);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-btn-download-glass:hover {
          background: linear-gradient(135deg, #A855F7 0%, #8B5CF6 100%);
          border-color: rgba(255, 255, 255, 0.68);
          box-shadow: 0 12px 30px -2px rgba(147, 51, 234, 0.58);
        }

        .modal-btn-print-glass {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(243, 232, 255, 0.42) 100%);
          backdrop-filter: blur(20px) saturate(190%);
          -webkit-backdrop-filter: blur(20px) saturate(190%);
          color: #1D1527;
          border: 1px solid rgba(255, 255, 255, 0.92);
          padding: 0.62rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.865rem;
          box-shadow: 
            0 4px 16px -2px rgba(147, 51, 234, 0.1),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 1);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-btn-print-glass:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(243, 232, 255, 0.78) 100%);
          color: #9333EA;
          border-color: rgba(216, 180, 254, 0.85);
          box-shadow: 0 8px 24px -2px rgba(147, 51, 234, 0.22);
        }

        .modal-btn-close-glass {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(243, 232, 255, 0.45) 100%);
          backdrop-filter: blur(20px) saturate(190%);
          -webkit-backdrop-filter: blur(20px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1D1527;
          box-shadow: 
            0 4px 14px -2px rgba(147, 51, 234, 0.1),
            inset 0 1.5px 2px 0 rgba(255, 255, 255, 1);
          cursor: pointer;
          margin-left: 0.4rem;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-btn-close-glass:hover {
          color: #9333EA;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 232, 255, 0.85) 100%);
          border-color: rgba(216, 180, 254, 0.85);
          box-shadow: 0 6px 20px rgba(147, 51, 234, 0.25);
        }

        @media print {
          .no-print {
            display: none !important;
          }
          .liquid-glass-modal-overlay {
            position: static !important;
            padding: 0 !important;
            background: none !important;
            backdrop-filter: none !important;
          }
          .liquid-glass-modal-shell {
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            background: none !important;
            backdrop-filter: none !important;
          }
          .printable-resume {
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
};
