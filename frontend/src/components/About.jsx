import React from 'react';

const About = () => {
  return (
    <div className="card" style={{ padding: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>About Shnoor Scanner</h2>
      
      <p style={{ lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '1.5rem' }}>
        Welcome to the <strong>Shnoor Code Authenticity Checker</strong>. We specialize in providing enterprise-grade analysis tools to ensure academic and professional integrity in software development.
      </p>
      
      <p style={{ lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '1.5rem' }}>
        With the rapid rise of Large Language Models, telling the difference between a human developer's logic and a machine's output has become increasingly difficult. Our tool was built specifically to bridge this gap.
      </p>

      <p style={{ lineHeight: '1.8', color: 'var(--text-body)', marginBottom: '1.5rem' }}>
        Furthermore, our platform prioritizes transparency and long-term traceability. With our robust integrated history system, users can seamlessly review their past analyses, verify previous authenticity scores, and maintain a secure, private log of their submitted work—all within a unified dashboard.
      </p>

      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Our Mission</h4>
        <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          To empower educators, reviewers, and team leads with transparent, mathematically-backed insights into code origins, fostering a culture of original thought and genuine programming skill.
        </p>
      </div>
    </div>
  );
};

export default About;
