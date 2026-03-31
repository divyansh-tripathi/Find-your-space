import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="glass-card animate-slide-up" style={{ margin: '2rem 1rem 1rem', padding: '4rem 3rem', borderRadius: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', color: 'white' }}>
                        Find<span className="text-gradient">YourSpace</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        Discover unique living spaces, creative hubs, and premium stays around the globe. Your next adventure starts with a single click.
                    </p>
                </div>
                <div>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Links</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Explore Spaces</Link>
                        <Link to="/signup" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Join Community</Link>
                        <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Host Dashboard</Link>
                    </div>
                </div>
                <div>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contact</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>📍 New Delhi, India</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>✉️ hello@findyourspace.com</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <span style={{ cursor: 'pointer', opacity: 0.6 }}>🐦</span>
                        <span style={{ cursor: 'pointer', opacity: 0.6 }}>📸</span>
                        <span style={{ cursor: 'pointer', opacity: 0.6 }}>💼</span>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    © 2026 FindYourSpace. Built with ❤️ for travelers by travelers.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
