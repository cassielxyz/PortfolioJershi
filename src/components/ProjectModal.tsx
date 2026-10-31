import React from 'react';
import { X, CheckCircle2, Server } from 'lucide-react';
import type { ProjectItem } from '../types';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2.5rem', background: '#faf7f2', border: '1px solid var(--border-light)', color: 'var(--text-main)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            transition: 'all 0.2s ease'
          }}
          className="interactive"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span
              style={{
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.785rem',
                fontWeight: 700,
                background: '#faf0e7',
                color: 'var(--accent-taupe-dark)',
                border: '1px solid #ebdcd0'
              }}
            >
              {project.categoryLabel}
            </span>
            {project.metrics && (
              <span
                style={{
                  padding: '0.3rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.785rem',
                  fontWeight: 600,
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {project.metrics}
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.5rem' }}>
            {project.title}
          </h3>
          <p style={{ color: 'var(--accent-taupe-dark)', fontSize: '1rem', lineHeight: 1.6, fontWeight: 600 }}>
            {project.subtitle}
          </p>
        </div>

        {/* Long Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            System Overview
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Key Capabilities & Implementation
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {project.features.map((feature, fIdx) => (
              <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ marginTop: '0.2rem', color: '#16a34a', flexShrink: 0 }}>
                  <CheckCircle2 size={16} />
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Highlights */}
        {project.architecturePoints && project.architecturePoints.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Architecture & Data Flow
            </h4>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.85rem'
              }}
            >
              {project.architecturePoints.map((point, pIdx) => (
                <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Server size={15} color="var(--accent-taupe-dark)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Technologies & Frameworks
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.techStack.map((tech, tIdx) => (
              <span key={tIdx} className="tech-pill" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.6rem' }}
            >
              <GithubIcon size={17} />
              <span>Explore Code Repository</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.4rem' }}
          >
            <span>Close Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
