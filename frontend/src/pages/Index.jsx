import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link, useSearchParams } from 'react-router-dom';
import SkeletonListing from '../components/SkeletonListing';

const Index = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings');
        setTimeout(() => {
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

  const filteredListings = locationQuery 
    ? listings.filter(l => l.location.toLowerCase().includes(locationQuery.toLowerCase()) || l.country.toLowerCase().includes(locationQuery.toLowerCase()))
    : listings;

  if (loading) return (
    <div className="container animate-slide-up">
        {/* Loading Hero Skeleton */}
        <div className="glass-card" style={{ marginBottom: '4rem', padding: '6rem 4rem', textAlign: 'center', border: 'none' }}>
            <div className="skeleton" style={{ height: '4rem', width: '60%', margin: '0 auto 1.5rem' }}></div>
            <div className="skeleton" style={{ height: '1.5rem', width: '40%', margin: '0 auto 3rem' }}></div>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <div className="skeleton" style={{ height: '3.5rem', width: '180px' }}></div>
                <div className="skeleton" style={{ height: '3.5rem', width: '180px' }}></div>
            </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[1,2,3,4,5,6].map(i => <SkeletonListing key={i} />)}
        </div>
    </div>
  );

  return (
    <div className="container animate-slide-up">
      {/* Premium Hero Section */}
      {!locationQuery && (
        <div className="glass-card" style={{ marginBottom: '5rem', padding: '7rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden', border: 'none' }}>
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(99, 102, 241, 0.2)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(168, 85, 247, 0.2)', filter: 'blur(100px)', borderRadius: '50%' }}></div>
            
            <span className="badge" style={{ marginBottom: '1.5rem' }}>✨ Find Your Perfect Space</span>
            <h1 className="text-gradient" style={{ fontSize: '5rem', lineHeight: '1', fontWeight: 900, marginBottom: '1.5rem' }}>
                Adventure Awaits <br /> Around Every Corner.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3.5rem', lineHeight: '1.6' }}>
                Discover thousands of premium rooms, creative studios, and unique stays curated for the modern traveler. Experience comfort like never before.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <button className="btn-primary" style={{ padding: '1rem 2.8rem', fontSize: '1.1rem' }}>Explore Spaces</button>
                <Link to="/signup" className="btn-primary" style={{ padding: '1rem 2.8rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', boxShadow: 'none' }}>Join Community</Link>
            </div>
        </div>
      )}

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            {locationQuery ? `Spaces in ` : "Top "}
            <span className="text-gradient">{locationQuery || "Destinations"}</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Explore {filteredListings.length} premium spaces tailored for your lifestyle.
        </p>
      </div>

      {filteredListings.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>No spaces found here yet.</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Try searching for a different city or country.</p>
            <Link to="/" className="btn-primary">View All Spaces</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {filteredListings.map(listing => (
            <div key={listing._id} className="glass-card glass-card-interactive" style={{ overflow: 'hidden' }}>
                <Link to={`/listings/${listing._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ height: '240px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                        <span className="badge">Featured</span>
                    </div>
                </div>
                <div style={{ padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.3' }}>{listing.title}</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📍 {listing.location}, {listing.country}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
                        <div>
                            <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>₹{listing.price.toLocaleString('en-IN')}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>/ night</span>
                        </div>
                        <span className="text-gradient" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Details →</span>
                    </div>
                </div>
                </Link>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Index;
