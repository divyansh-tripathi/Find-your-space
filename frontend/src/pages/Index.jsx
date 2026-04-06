import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SkeletonListing from '../components/SkeletonListing';
import { HeroSection } from '../components/ui/hero-section-shadcnui';

const COLS = 3;
const INITIAL_ROWS = 3;
const STEP_ROWS = 2;

const Index = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(COLS * INITIAL_ROWS);
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location');
  const navigate = useNavigate();

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
    ? listings.filter(l =>
      l.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
      l.country.toLowerCase().includes(locationQuery.toLowerCase())
    )
    : listings;

  const visibleListings = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListings.length;
  const canCollapse = visibleCount > COLS * INITIAL_ROWS;

  if (loading) return (
    <div className="container animate-slide-up">
      <div className="glass-card" style={{ marginBottom: '4rem', padding: '6rem 4rem', textAlign: 'center', border: 'none' }}>
        <div className="skeleton" style={{ height: '4rem', width: '60%', margin: '0 auto 1.5rem' }}></div>
        <div className="skeleton" style={{ height: '1.5rem', width: '40%', margin: '0 auto 3rem' }}></div>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <div className="skeleton" style={{ height: '3.5rem', width: '180px' }}></div>
          <div className="skeleton" style={{ height: '3.5rem', width: '180px' }}></div>
        </div>
      </div>
      <div className="grid-3" style={{ marginBottom: '4rem' }}>
        {[1, 2, 3, 4, 5, 6].map(i => <SkeletonListing key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="container animate-slide-up">
      {!locationQuery && (
        <div style={{ marginBottom: '5rem' }}>
          <HeroSection />
        </div>
      )}

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          {locationQuery ? 'Spaces in ' : 'Top '}
          <span className="text-gradient">{locationQuery || 'Destinations'}</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Showing {visibleListings.length} of {filteredListings.length} premium spaces.
        </p>
      </div>

      {filteredListings.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>No spaces found here yet.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Try searching for a different city or country.</p>
          <Link to="/" className="btn-primary">View All Spaces</Link>
        </div>
      ) : (
        <>
          <div className="grid-3">
            {visibleListings.map(listing => (
              <div key={listing._id} className="glass-card glass-card-interactive" style={{ overflow: 'hidden' }}>
                <Link to={`/listings/${listing._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ height: '240px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={listing.image}
                      alt={listing.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
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

          {/* Show More / Show Less Controls */}
          {(hasMore || canCollapse) && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {hasMore && (
                <button
                  className="btn-primary"
                  onClick={() => setVisibleCount(v => v + COLS * STEP_ROWS)}
                  style={{ padding: '0.85rem 2.5rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  Show More
                  <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '1rem', padding: '0.1rem 0.5rem', fontSize: '0.8rem' }}>
                    +{Math.min(COLS * STEP_ROWS, filteredListings.length - visibleCount)}
                  </span>
                </button>
              )}
              {canCollapse && (
                <button
                  onClick={() => setVisibleCount(COLS * INITIAL_ROWS)}
                  style={{
                    padding: '0.85rem 2.5rem', fontSize: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '1rem', color: 'var(--text-muted)',
                    cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  Show Less ↑
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
