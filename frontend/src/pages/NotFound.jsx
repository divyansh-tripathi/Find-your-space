import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
            <h1 style={{ fontSize: '6rem', margin: 0 }} className="text-gradient">404</h1>
            <h2 style={{ marginBottom: '1.5rem' }}>Oops! Space Not Found</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.2rem' }}>
                The listing or page you're looking for doesn't exist or has been moved to another galaxy.
            </p>
            <Link to="/" className="btn-primary" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>
                Back to Explore
            </Link>
        </div>
    );
};

export default NotFound;
