import React, { useState } from 'react';
import { FolderGit2, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import type { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'aiml', label: 'ML & AI Vision' },
    { id: 'backend', label: 'Backend APIs' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div className="content-wrapper">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>Featured Engineering</span>
          </div>
          <h2 className="section-title">
            Engineered <span style={{ color: 'var(--accent-taupe)' }}>Projects & Systems</span>
          </h2>
          <p className="section-subtitle">
            Enterprise full-stack platforms, production REST APIs, and machine learning computer-vision solutions built with Java, React, and Python.
          </p>
        </motion.div>

        {/* Filter Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap',
            marginBottom: '2.25rem'
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: selectedCategory === cat.id ? '#12111a' : '#ffffff',
                border: selectedCategory === cat.id ? '1px solid #12111a' : '1px solid var(--border-light)',
                color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-muted)',
                boxShadow: selectedCategory === cat.id ? '0 4px 14px rgba(18, 17, 26, 0.15)' : 'var(--shadow-sm)',
                transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease'
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Cards Grid with Staggered Entrance & Hover Elevation */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2rem'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(28, 25, 23, 0.08)' }}
                className="glass-card project-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.25rem',
                  position: 'relative',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <div>
                  {/* Top Card Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1.25rem' }}>
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
                          border: '1px solid var(--border-subtle)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Sparkles size={12} color="var(--accent-taupe-dark)" />
                        <span>{project.metrics}</span>
                      </span>
                    )}
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--accent-taupe-dark)', marginBottom: '1rem', fontWeight: 600 }}>
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {project.description}
                  </p>

                  {/* Key feature highlights snippet */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
                    {project.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                        <span style={{ color: '#16a34a', marginTop: '0.15rem', fontSize: '0.85rem', fontWeight: 800 }}>✓</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: Tech Stack & Actions */}
                <div>
                  {/* Tech Pills with subtle hover */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                    {project.techStack.map((tech, tIdx) => (
                      <motion.span
                        key={tIdx}
                        className="tech-pill"
                        whileHover={{ y: -2 }}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-main)',
                          transition: 'background 0.2s ease, border-color 0.2s ease'
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons with Smooth Interactions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border-subtle)'
                    }}
                  >
                    <motion.button
                      onClick={() => setActiveProject(project)}
                      className="btn btn-primary"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ flex: 1, padding: '0.7rem 1rem', fontSize: '0.85rem' }}
                    >
                      <Eye size={15} />
                      <span>View Architecture</span>
                    </motion.button>

                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.94 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '0.5rem',
                          background: '#ffffff',
                          border: '1px solid var(--border-light)',
                          color: 'var(--text-main)',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                        }}
                        title="GitHub Repository"
                      >
                        <GithubIcon size={17} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
