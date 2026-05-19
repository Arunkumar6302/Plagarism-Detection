import React from 'react';

const Terms = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <div className="card" style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>&times;</button>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Terms & Conditions</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h4>
            <p>By registering and using the Shnoor Plagiarism Detection service, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the service.</p>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>2. Use of Service</h4>
            <p>You agree to use this service only for lawful purposes. You are responsible for all data, text, and files you upload. Shnoor International is not responsible for any copyright violations or plagiarism committed by the user outside of this platform.</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>3. Data Privacy and Security</h4>
            <p>We process your code snippets strictly for the purpose of detecting plagiarism and AI-generated content. Your scan history is stored securely and is only accessible by you when logged into your account.</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>4. Disclaimer of Warranties</h4>
            <p>This service is provided "as is". While our hybrid AI detection and plagiarism engines strive for high accuracy, they are probabilistic models and not guaranteed to be 100% accurate at all times.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
