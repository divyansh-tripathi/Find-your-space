import React from 'react';

const Footer = () => {
  return (
    <footer className="glass-card" style={{ margin: '2rem 1rem 1rem', padding: '2rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}><i className="fa-brands fa-square-facebook"></i></a>
        <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}><i className="fa-brands fa-square-instagram"></i></a>
        <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}><i className="fa-brands fa-linkedin"></i></a>
      </div>
      <p style={{ color: 'var(--text-muted)', margin: 0 }}>&copy; 2026 FindYourSpace Private Limited</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Privacy</a>
        <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Terms</a>
      </div>
    </footer>
  );
};

export default Footer;
