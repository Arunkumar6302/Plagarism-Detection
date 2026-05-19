import React, { useEffect, useState } from 'react';
import { getHistory, deleteScan, clearAllHistory } from '../services/api';
import { Trash2, Clock, FileCode } from 'lucide-react';

const History = ({ onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    
    try {
      const response = await deleteScan(id);
      if (response.success) {
        setItems(prevItems => prevItems.filter(item => Number(item.id) !== Number(id)));
      }
    } catch (err) {
      console.error('Delete failed:', err);
      const msg = err.response?.data?.error || err.message || 'Unknown error';
      alert(`Failed to delete: ${msg}`);
    }
  };

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.2rem' }}>SCAN HISTORY</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {items.length > 0 && (
            <button 
              onClick={async () => {
                if(window.confirm('Clear everything?')) {
                  await clearAllHistory();
                  setItems([]);
                }
              }} 
              className="btn-secondary" 
              style={{ color: 'red', borderColor: 'red', fontSize: '0.7rem' }}
            >
              CLEAR ALL
            </button>
          )}
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>CLOSE</button>
        </div>
      </div>

      {loading ? (
        <p>Loading history...</p>
      ) : items.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>No history found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1rem', 
              border: '1px solid var(--border)',
              borderRadius: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--bg)', padding: '0.5rem', borderRadius: '4px' }}>
                  <FileCode size={20} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {item.content_preview}...
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={12} /> {new Date(item.created_at).toLocaleString()} | 
                    Plagiarism: <span style={{ color: item.plagiarism_score > 40 ? 'red' : 'green' }}>{item.plagiarism_score}%</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                style={{ background: 'transparent', color: 'var(--text-dim)' }}
                onMouseEnter={(e) => e.target.style.color = 'red'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
