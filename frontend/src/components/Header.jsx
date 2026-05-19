import React from 'react';

const Header = ({ activeTab, setActiveTab, isAuth, onLogout }) => {
  const getStyle = (tabName) => ({
    color: activeTab === tabName ? 'var(--primary)' : 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: activeTab === tabName ? 700 : 500,
    borderBottom: activeTab === tabName ? '2px solid var(--primary)' : 'none',
    paddingBottom: '0.2rem',
    transition: 'all 0.2s ease'
  });

  return (
    <header style={{ 
      background: 'var(--header-bg)',
      color: 'white',
      padding: '1rem 0',
      width: '100%'
    }}>
      <div className="container header-container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/logo.jpg" 
            alt="Shnoor Logo" 
            width="45"
            height="45"
            style={{ 
              height: '45px', 
              width: '45px', 
              objectFit: 'contain',
              background: 'white',
              borderRadius: '50%',
              padding: '3px'
            }} 
            onError={(e) => {
              // Hide broken image icon if logo.jpg doesn't exist yet
              e.target.style.display = 'none';
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '1px' }}>SHNOOR</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>INTERNATIONAL LLC</span>
          </div>
        </div>
        
        <nav className="header-nav" style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', alignItems: 'center' }}>
          {isAuth && <span onClick={() => setActiveTab('home')} style={getStyle('home')}>Home</span>}
          <span onClick={() => setActiveTab('about')} style={getStyle('about')}>About</span>
          <span onClick={() => setActiveTab('features')} style={getStyle('features')}>Features</span>
          <span onClick={() => setActiveTab('help')} style={getStyle('help')}>Help</span>
          {isAuth && (
            <button onClick={onLogout} style={{ padding: '0.4rem 1rem', background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: '4px', fontSize: '0.8rem' }}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
