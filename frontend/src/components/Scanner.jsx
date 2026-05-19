import React, { useState } from 'react';
import { Upload, Copy, Search, Loader2 } from 'lucide-react';
import { scanText, uploadFile } from '../services/api';

const Scanner = ({ onResult }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!content && !file) return;

    setLoading(true);
    try {
      let result;
      if (file) {
        result = await uploadFile(file);
      } else {
        result = await scanText(content);
      }
      onResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="button-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => {
            setFile(null);
            const fileInput = document.getElementById('file-upload');
            if (fileInput) fileInput.value = '';
          }}
          className={!file ? 'btn-primary' : 'btn-secondary'}
          style={{ flex: 1, padding: '0.6rem' }}
        >
          <Copy size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Paste Code
        </button>
        <button
          onClick={() => document.getElementById('file-upload').click()}
          className={file ? 'btn-primary' : 'btn-secondary'}
          style={{ flex: 1, padding: '0.6rem' }}
        >
          <Upload size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Upload File
        </button>
        <input
          id="file-upload"
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {!file ? (
        <textarea
          placeholder="Paste content here..."
          rows={16}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div style={{
          padding: '3rem',
          border: '1px solid var(--border)',
          background: '#f9fafb',
          textAlign: 'center',
          marginBottom: '1rem',
          wordBreak: 'break-all'
        }}>
          <p style={{ fontWeight: 600 }}>{file.name}</p>
          <button onClick={() => {
            setFile(null);
            const fileInput = document.getElementById('file-upload');
            if (fileInput) fileInput.value = '';
          }} style={{ color: 'var(--primary)', background: 'transparent', textDecoration: 'underline', fontSize: '0.8rem', marginTop: '0.5rem' }}>Change File</button>
        </div>
      )}

      <div className="button-group" style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={handleScan}
          disabled={loading}
          className="btn-primary"
          style={{ flex: 1, padding: '1rem' }}
        >
          {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'START ANALYSIS'}
        </button>

        <button
          onClick={() => {
            setContent('');
            setFile(null);
            onResult(null);
            const fileInput = document.getElementById('file-upload');
            if (fileInput) fileInput.value = '';
          }}
          className="btn-secondary"
          style={{ padding: '1rem' }}
        >
          CLEAR
        </button>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-history'))}
          className="btn-secondary"
          style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem', color: 'var(--text-dim)' }}
        >
          VIEW SCAN HISTORY
        </button>
      </div>
    </div>
  );
};

export default Scanner;
