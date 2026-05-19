import React from 'react';

const Privacy = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div className="card" style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>&times;</button>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Privacy Policy</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>1. Information We Collect</h4>
            <p>We collect your email address and password when you register for an account. When you use the service, we temporarily process your text and document files to generate the authenticity report.</p>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>2. How We Use Your Information</h4>
            <p>Your authentication details are securely hashed and stored. Your scan history is stored in our database strictly for your personal access and review. We do not sell, rent, or share your submitted source code or personal data with third parties.</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>3. Data Retention</h4>
            <p>Scan histories are retained as long as your account is active. You have full control to clear your history or delete individual scan records at any time using the History dashboard.</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>4. Security</h4>
            <p>We implement industry-standard security measures, including JWT authentication and bcrypt password hashing, to protect your personal information against unauthorized access.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
