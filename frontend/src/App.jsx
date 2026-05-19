import Header from './components/Header';
import Scanner from './components/Scanner';
import ResultCard from './components/ResultCard';
import History from './components/History';
import About from './components/About';
import Features from './components/Features';
import Help from './components/Help';
import Login from './components/Login';
import Register from './components/Register';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import { useState, useEffect } from 'react';

function App() {
  const [result, setResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const handleToggle = () => setShowHistory(prev => !prev);
    window.addEventListener('toggle-history', handleToggle);
    return () => window.removeEventListener('toggle-history', handleToggle);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    } else if (activeTab !== 'register' && activeTab !== 'terms' && activeTab !== 'privacy') {
      setActiveTab('login');
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false);
    setActiveTab('login');
    setResult(null);
    setShowHistory(false);
  };

  const renderContent = () => {
    if (!isAuth && activeTab !== 'login' && activeTab !== 'register' && activeTab !== 'terms' && activeTab !== 'privacy') {
      return <Login setAuth={setIsAuth} setActiveTab={setActiveTab} />;
    }

    if (activeTab === 'login') return <Login setAuth={setIsAuth} setActiveTab={setActiveTab} />;
    if (activeTab === 'register') return <Register setAuth={setIsAuth} setActiveTab={setActiveTab} />;
    if (activeTab === 'terms') return <Terms />;
    if (activeTab === 'privacy') return <Privacy />;
    if (activeTab === 'about') return <About />;
    if (activeTab === 'features') return <Features />;
    if (activeTab === 'help') return <Help />;
    
    if (activeTab === 'home') {
      return (
        <>
          <Scanner onResult={setResult} />
          {showHistory && <History onClose={() => setShowHistory(false)} />}
          <ResultCard result={result} />
        </>
      );
    }

    return null;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} isAuth={isAuth} onLogout={handleLogout} />
      
      <main className="container" style={{ padding: '3rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Code <span style={{ color: 'var(--primary)' }}>Authenticity</span> Checker
          </h1>
          <p style={{ color: 'var(--text-body)', fontSize: '1.1rem' }}>
            Professional analysis for plagiarism and AI-generated logic patterns.
          </p>
        </div>
        
        {renderContent()}
        
      </main>
    </div>
  );
}

export default App;
