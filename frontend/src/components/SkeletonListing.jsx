import React from 'react';

const SkeletonListing = () => {
    return (
        <div className="glass-card glass-card-interactive" style={{ overflow: 'hidden', height: '380px' }}>
            <div className="skeleton" style={{ height: '220px', width: '100%', borderRadius: 0 }}></div>
            <div style={{ padding: '1.5rem' }}>
                <div className="skeleton" style={{ height: '1.5rem', width: '80%', marginBottom: '0.75rem' }}></div>
                <div className="skeleton" style={{ height: '1rem', width: '60%', marginBottom: '1.5rem' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="skeleton" style={{ height: '1.5rem', width: '40%' }}></div>
                    <div className="skeleton" style={{ height: '1.5rem', width: '20%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonListing;
