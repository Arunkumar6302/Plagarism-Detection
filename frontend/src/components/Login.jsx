import React, { useState } from 'react';
import { login } from '../services/api';
import Terms from './Terms';
import Privacy from './Privacy';

const Login = ({ setAuth, setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms and privacy policy to login.');
      return;
    }
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth(true);
      setActiveTab('home');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <>
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Login</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input 
              type="checkbox" 
              checked={termsAccepted} 
              onChange={e => setTermsAccepted(e.target.checked)} 
              id="login-terms"
            />
            <label htmlFor="login-terms" style={{ fontSize: '0.9rem' }}>
              I agree to the <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setShowTerms(true)}>Terms & Conditions</span> and <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setShowPrivacy(true)}>Privacy Policy</span>
            </label>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Login</button>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Don't have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setActiveTab('register')}>Register here</span>
          </p>
        </form>
      </div>

      {showTerms && <Terms onClose={() => setShowTerms(false)} />}
      {showPrivacy && <Privacy onClose={() => setShowPrivacy(false)} />}
    </>
  );
};

export default Login;
