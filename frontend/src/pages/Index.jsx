import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import SkeletonListing from '../components/SkeletonListing';

const Index = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings');
        // Simulate a slight delay for showing off the smooth skeleton transition
        setTimeout(() => {
            console.log("Frontend Data Received:", res.data);
            setListings(res.data);
            setLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error fetching listings", err);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) return (
    <div className="container animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Experience <span className="text-gradient">Premium</span> Living</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {[1,2,3,4,5,6].map(i => <SkeletonListing key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Experience <span className="text-gradient">Premium</span> Living</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {listings.map(listing => (
          <div key={listing._id} className="glass-card glass-card-interactive" style={{ overflow: 'hidden', cursor: 'pointer' }}>
            <Link to={`/listings/${listing._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{listing.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>{listing.location}, {listing.country}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>₹{listing.price.toLocaleString('en-IN')} <small style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ night</small></span>
                  <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
