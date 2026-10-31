import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCopy = (text: string, itemKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemKey);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate submission
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
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
            <MessageSquare size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Let's Build Something <span style={{ color: 'var(--accent-taupe)' }}>Impactful</span>
          </h2>
          <p className="section-subtitle">
            Open for full-time Full Stack roles, enterprise backend development, or high-performance frontend engineering.
          </p>
        </motion.div>

        {/* Contact Layout: 2 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'stretch',
            maxWidth: '1100px',
            margin: '0 auto'
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.6rem' }}>
                Contact Details
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Feel free to reach out directly via email, mobile, or connect on LinkedIn and GitHub. I respond promptly to inquiries.
              </p>

              {/* Direct Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Email */}
                <motion.div
                  whileHover={{ y: -2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.15rem 1.25rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.65rem',
                        background: 'var(--bg-banner)',
                        color: 'var(--accent-taupe-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                      <a href={`mailto:${personalInfo.email}`} style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-bright)' }}>
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleCopy(personalInfo.email, 'email')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: '#ffffff',
                      border: '1px solid var(--border-light)',
                      color: copiedItem === 'email' ? '#16a34a' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                    title="Copy Email"
                  >
                    {copiedItem === 'email' ? <Check size={16} /> : <Copy size={16} />}
                  </motion.button>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ y: -2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.15rem 1.25rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.65rem',
                        background: 'var(--bg-banner)',
                        color: 'var(--accent-taupe-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Phone size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Phone / WhatsApp</span>
                      <a href={`tel:${personalInfo.phone}`} style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-bright)' }}>
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => handleCopy(personalInfo.phone, 'phone')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: '#ffffff',
                      border: '1px solid var(--border-light)',
                      color: copiedItem === 'phone' ? '#16a34a' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                    title="Copy Phone"
                  >
                    {copiedItem === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                  </motion.button>
                </motion.div>

                {/* Location */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '1.15rem 1.25rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.65rem',
                      background: 'var(--bg-banner)',
                      color: 'var(--accent-taupe-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Location Base</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-bright)' }}>
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials Connection */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.85rem' }}>
                Professional Networks
              </span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1, padding: '0.7rem', fontSize: '0.875rem' }}
                >
                  <LinkedinIcon size={16} color="#0077b5" />
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1, padding: '0.7rem', fontSize: '0.875rem' }}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Functional Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card"
            style={{
              padding: '2.5rem',
              background: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '0.6rem' }}>
              Send a Message
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Have a full-time opportunity, project discussion, or engineering query? Let's get in touch.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--bg-banner)',
                  border: '1px solid #ebdcd0',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    background: '#ffffff',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.5rem' }}>
                  Message Sent Successfully!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you for reaching out, <strong>{formData.name}</strong>. I will get back to you at <strong>{formData.email}</strong> shortly.
                </p>
                <motion.button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="btn btn-secondary"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ padding: '0.65rem 1.45rem', fontSize: '0.875rem' }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                  {errors.name && (
                    <span style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem', display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                  {errors.email && (
                    <span style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    placeholder="Full Stack Opportunity / Technical Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                  {errors.subject && (
                    <span style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem', display: 'block' }}>
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the opportunity or message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                  {errors.message && (
                    <span style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem', display: 'block' }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button with tactile hover and tap */}
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(18, 17, 26, 0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
      `}</style>
    </section>
  );
};
