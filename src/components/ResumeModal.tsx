import React, { useRef } from 'react';
import { X, Download, Printer, FileText } from 'lucide-react';
import { personalInfo, educationList, experiences, projects } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumeRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          background: '#faf7f2',
          border: '1px solid var(--border-light)',
          color: 'var(--text-main)'
        }}
      >
        {/* Modal Top Control Bar */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 2rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <FileText size={20} color="var(--accent-taupe-dark)" />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-bright)' }}>
              Curriculum Vitae — Jershika C
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={handleDownloadPDF}
              className="btn btn-primary"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
              title="Download Original Resume PDF"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn btn-secondary"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
              title="Print Resume"
            >
              <Printer size={15} />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
                marginLeft: '0.5rem'
              }}
              aria-label="Close modal"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div
          ref={resumeRef}
          className="printable-resume"
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem',
            margin: '2rem',
            lineHeight: 1.6,
            color: 'var(--text-main)'
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
              borderBottom: '2px solid #ebdcd0',
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
                  padding: '2px',
                  background: 'var(--bg-banner)',
                  border: '1px solid #ebdcd0',
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
                <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-bright)', letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>
                  JERSHIKA C
                </h1>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-taupe-dark)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Full Stack Developer
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Location: <strong style={{ color: 'var(--text-main)' }}>{personalInfo.location}</strong>
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
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #ebdcd0', paddingBottom: '0.35rem', marginBottom: '0.65rem' }}>
              Profile Summary
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {personalInfo.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #ebdcd0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Technical Skills
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.6rem', fontSize: '0.875rem' }}>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Programming Languages: </strong>
                <span style={{ color: 'var(--text-muted)' }}>Java, Python</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Frontend Technologies: </strong>
                <span style={{ color: 'var(--text-muted)' }}>HTML, CSS, JavaScript, Bootstrap, React, React Bootstrap, TypeScript</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Backend Technologies: </strong>
                <span style={{ color: 'var(--text-muted)' }}>Core Java, OOPs, Spring Boot, REST APIs, JPA/Hibernate, Nest.js</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Databases & Cloud: </strong>
                <span style={{ color: 'var(--text-muted)' }}>MySQL, PostgreSQL, Supabase, MongoDB</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Tools & Platforms: </strong>
                <span style={{ color: 'var(--text-muted)' }}>VS Code, GitHub, Eclipse IDE, IntelliJ IDEA, Postman, Git, NetBeans IDE</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Soft Skills: </strong>
                <span style={{ color: 'var(--text-muted)' }}>Quick Learning, Problem-Solving, Leadership, Team Collaboration, Time Management</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #ebdcd0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Professional Experience
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-bright)' }}>
                      {exp.role} — <span style={{ color: 'var(--accent-taupe-dark)' }}>{exp.company}</span>
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #ebdcd0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Key Projects
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-bright)' }}>
                      {proj.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-taupe-dark)', fontWeight: 600 }}>
                      [{proj.techStack.join(', ')}]
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #ebdcd0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              {educationList.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-bright)' }}>{edu.degree}</strong> — <span style={{ color: 'var(--text-muted)' }}>{edu.institution}</span>
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
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #ebdcd0', paddingBottom: '0.35rem', marginBottom: '0.5rem' }}>
              Certifications & Courses
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <strong>Full Stack Web Development & Java Course</strong> (Feb 14, 2024 – Mar 3, 2024): Hands-on training in HTML, CSS, JavaScript, React.js, React Bootstrap, Java, Spring Boot, REST APIs, and Axios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
