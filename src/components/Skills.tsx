import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Terminal, 
  Wrench, 
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={22} color="var(--accent-taupe-dark)" />;
      case 'Server':
        return <Server size={22} color="var(--accent-taupe-dark)" />;
      case 'Database':
        return <Database size={22} color="var(--accent-taupe-dark)" />;
      case 'Terminal':
        return <Terminal size={22} color="var(--accent-taupe-dark)" />;
      case 'Wrench':
        return <Wrench size={22} color="var(--accent-taupe-dark)" />;
      default:
        return <Layers size={22} color="var(--accent-taupe-dark)" />;
    }
  };

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
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
            <Layers size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills & <span style={{ color: 'var(--accent-taupe)' }}>Core Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            Curated toolkit cultivated through enterprise software roles, engineering coursework with honors, and full-stack projects.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2.25rem'
          }}
        >
          <motion.button
            onClick={() => setActiveCategory('all')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.55rem 1.35rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 600,
              background: activeCategory === 'all' ? '#12111a' : '#ffffff',
              border: activeCategory === 'all' ? '1px solid #12111a' : '1px solid var(--border-light)',
              color: activeCategory === 'all' ? '#ffffff' : 'var(--text-muted)',
              boxShadow: activeCategory === 'all' ? '0 4px 12px rgba(18, 17, 26, 0.15)' : 'var(--shadow-sm)',
              transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease'
            }}
          >
            All Categories
          </motion.button>

          {skillCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.55rem 1.35rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: activeCategory === cat.id ? '#12111a' : '#ffffff',
                border: activeCategory === cat.id ? '1px solid #12111a' : '1px solid var(--border-light)',
                color: activeCategory === cat.id ? '#ffffff' : 'var(--text-muted)',
                boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(18, 17, 26, 0.15)' : 'var(--shadow-sm)',
                transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease'
              }}
            >
              {cat.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, cIdx) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: cIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, boxShadow: '0 14px 32px rgba(28, 25, 23, 0.07)' }}
                className="glass-card"
                style={{
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <div>
                  {/* Category Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: '0.75rem',
                        background: 'var(--bg-banner)',
                        border: '1px solid #ebdcd0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-bright)' }}>{category.title}</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{category.skills.length} core competencies</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.55 }}>
                    {category.description}
                  </p>

                  {/* Skills Badges / Chips with Staggered Entrance Animation */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {category.skills.map((skill, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.05 + sIdx * 0.04 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.45rem 0.9rem',
                          background: skill.highlight ? '#faf0e7' : 'var(--bg-secondary)',
                          border: skill.highlight ? '1px solid #ebdcd0' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.825rem',
                          fontWeight: skill.highlight ? 700 : 500,
                          color: skill.highlight ? 'var(--text-bright)' : 'var(--text-main)',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                          cursor: 'pointer'
                        }}
                        className="interactive"
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: skill.highlight ? 'var(--accent-taupe-dark)' : 'var(--text-dim)'
                          }}
                        />
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Card Footer detail */}
                <div
                  style={{
                    marginTop: '1.75rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>Practical hands-on implementation</span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>● Active</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
