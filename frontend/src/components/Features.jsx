import React from 'react';

const Features = () => {
  return (
    <div className="card" style={{ padding: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Core Features</h2>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)' }}>✦</span> Advanced Plagiarism Detection
          </h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Cross-references submitted code against our extensive database of previous scans. It uses String Similarity metrics to identify potential copy-pasting, even if variable names have been slightly altered.
          </p>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)' }}>✦</span> Hybrid AI Logic Analysis
          </h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Goes beyond simple keyword matching. Our engine analyzes the statistical variance of line lengths, vocabulary entropy (richness), and structural heuristics to differentiate between human pragmatism and AI perfection.
          </p>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)' }}>✦</span> Secure File Uploads
          </h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Supports raw text pasting and direct file uploads. Files are processed securely on the backend, ensuring your intellectual property remains private.
          </p>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)' }}>✦</span> Persistent Scan History
          </h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Every analysis is safely logged in our backend PostgreSQL database. You can instantly access, review, and manage your past submissions via the interactive History dashboard. You retain full control to delete records permanently whenever needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
