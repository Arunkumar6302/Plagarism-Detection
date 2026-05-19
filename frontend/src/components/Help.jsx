import React from 'react';

const Help = () => {
  return (
    <div className="card" style={{ padding: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Help & Support</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>How to use the Scanner</h4>
        <ol style={{ color: 'var(--text-body)', lineHeight: '1.8', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Navigate to the <strong>Home</strong> tab.</li>
          <li>Choose whether you want to <strong>Paste Code</strong> directly into the text box, or click <strong>Upload File</strong> to select a document from your computer.</li>
          <li>Click the <strong>START ANALYSIS</strong> button.</li>
          <li>Wait a few seconds for our servers to analyze the logic patterns and compare against the database.</li>
          <li>Review the results in the summary card below.</li>
          <li>To review past analyses, simply click the <strong>VIEW SCAN HISTORY</strong> button below the scanner. This will open a dedicated panel displaying all your previous code submissions, scores, and timestamps.</li>
        </ol>
      </div>

      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '1.5rem', borderRadius: '8px' }}>
        <h4 style={{ color: '#92400e', marginBottom: '0.5rem' }}>FAQ: Why is my code flagged as AI?</h4>
        <p style={{ color: '#b45309', fontSize: '0.9rem', lineHeight: '1.6' }}>
          The engine analyzes structural perfection, vocabulary richness, and commenting habits. If you write overly descriptive comments (e.g., "Step 1: Check array"), use perfectly uniform line lengths, and rely heavily on modern functional methods without human abbreviations (like 'res', 'temp'), the system may classify your code as AI.
        </p>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Still need help? Contact us at support@shnoor.com</p>
      </div>
    </div>
  );
};

export default Help;
