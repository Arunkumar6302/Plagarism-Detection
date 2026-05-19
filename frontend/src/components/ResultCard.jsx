import React, { useState } from 'react';
import ReportModal from './ReportModal';

const ResultCard = ({ result }) => {
  const [showModal, setShowModal] = useState(false);

  if (!result) return null;

  const { plagiarism, aiDetection } = result;

  const getScoreColor = (score, isAI = false) => {
    if (isAI) return 'var(--primary)';
    return score > 40 ? '#ef4444' : '#22c55e';
  };

  const handleDownloadSimpleReport = () => {
    // If they just want to download this card view
    window.print();
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="card">
        <h3 style={{ marginBottom: '2rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.2rem' }}>
          ANALYSIS REPORT
        </h3>
        
        <div className="responsive-grid">
          
          <div className="border-right-desktop">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Plagiarism Similarity</span>
              <span style={{ color: getScoreColor(plagiarism.score), fontWeight: 700, fontSize: '1.2rem' }}>{plagiarism.score}%</span>
            </div>
            <div style={{ background: '#eee', height: '12px', borderRadius: '6px', marginBottom: '1rem' }}>
              <div style={{ 
                background: getScoreColor(plagiarism.score), 
                height: '100%', 
                borderRadius: '6px', 
                width: `${plagiarism.score}%`,
                transition: 'width 0.5s ease-in-out'
              }}></div>
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>Status: <span style={{ color: getScoreColor(plagiarism.score) }}>{plagiarism.status}</span></p>
            {plagiarism.matchedWith && plagiarism.score > 40 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontStyle: 'italic', wordBreak: 'break-all' }}>
                Matched with: {plagiarism.matchedWith}
              </p>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>AI Logic Probability</span>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem' }}>{aiDetection.score}%</span>
            </div>
            <div style={{ background: '#eee', height: '12px', borderRadius: '6px', marginBottom: '1rem' }}>
              <div style={{ 
                background: 'var(--primary)', 
                height: '100%', 
                borderRadius: '6px', 
                width: `${aiDetection.score}%`,
                transition: 'width 0.5s ease-in-out'
              }}></div>
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{aiDetection.label}</p>
          </div>

        </div>

        <div className="button-group" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => setShowModal(true)} className="btn-secondary" style={{ width: '250px' }}>
            VIEW FULL REPORT
          </button>
          <button onClick={handleDownloadSimpleReport} className="btn-primary" style={{ width: '250px' }}>
            DOWNLOAD FULL REPORT
          </button>
        </div>
      </div>

      {showModal && <ReportModal result={result} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ResultCard;
