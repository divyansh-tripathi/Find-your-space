import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Show = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currUser, setCurrUser] = useState(null);
    const [feedback, setFeedback] = useState({ comment: '', rating: 5 });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const quotes = [
        "The world is a book and those who do not travel read only one page.",
        "Traveling – it leaves you speechless, then turns you into a storyteller.",
        "Life is either a daring adventure or nothing at all.",
        "To travel is to live.",
        "Jobs fill your pocket, but adventures fill your soul."
    ];
    const [randomQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listingRes, userRes] = await Promise.all([
                    api.get(`/listings/${id}`),
                    api.get('/currUser')
                ]);
                setListing(listingRes.data);
                setCurrUser(userRes.data.user);
            } catch (err) {
                toast.error("Failed to load details");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure?")) {
            try {
                await api.delete(`/listings/${id}`);
                toast.success("Listing deleted");
                navigate('/');
            } catch (err) {
                toast.error("Failed to delete");
            }
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/listings/${id}/feedback`, { feedback });
            toast.success("Feedback submitted!");
            const newFeedbacks = [...(listing.feedbacks || []), { ...res.data.feedback, author: currUser }];
            setListing({ ...listing, feedbacks: newFeedbacks });
            setFeedback({ comment: '', rating: 5 });
        } catch (err) {
            toast.error("Please login to post feedback");
        }
    };

    if (loading) return (
        <div className="container animate-slide-up">
            <div className="skeleton" style={{ height: '500px', width: '100%' }}></div>
        </div>
    );

    if (!listing) return null;
    const isAdmin = currUser?.role === 'admin';

    return (
        <div className="container animate-slide-up">
            {/* Hero Section */}
            <div className="glass-card" style={{ marginBottom: '3rem', overflow: 'hidden', border: 'none' }}>
                <div style={{ height: '60vh', position: 'relative', overflow: 'hidden' }}>
                    <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark), transparent)' }}></div>
                    <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', right: '3rem' }}>
                        <span className="badge" style={{ marginBottom: '1rem' }}>Premium Space</span>
                        <h1 className="text-gradient" style={{ fontSize: '4.5rem', lineHeight: '1.1' }}>{listing.title}</h1>
                        <p style={{ fontSize: '1.25rem', marginTop: '1rem', color: 'var(--text-main)', opacity: 0.9 }}>
                            📍 {listing.location}, {listing.country}
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '4rem' }}>
                {/* Left Column: Details & Reviews */}
                <div>
                    <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {listing.owner?.username?.[0]?.toUpperCase()}
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Hosted by @{listing.owner?.username}</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified Host</p>
                            </div>
                        </div>
                        
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>About this space</h3>
                        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-main)', opacity: 0.8 }}>
                            {listing.description}
                        </p>
                    </div>

                    <div style={{ marginTop: '4rem' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Guest <span className="text-gradient">Reviews</span></h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {listing.feedbacks?.length > 0 ? listing.feedbacks.map((f, i) => (
                                <div key={i} className="glass-card" style={{ padding: '2rem', borderLeft: i%2===0 ? '4px solid var(--primary)' : '4px solid var(--accent)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>@{f.author?.username}</div>
                                        <div style={{ color: '#fbbf24', fontSize: '1.2rem' }}>{'★'.repeat(f.rating)}</div>
                                    </div>
                                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>"{f.comment}"</p>
                                </div>
                            )) : (
                                <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to share your experience!</p>
                            )}
                        </div>

                        {currUser && (
                            <form onSubmit={handleFeedbackSubmit} className="glass-card" style={{ padding: '2.5rem', marginTop: '3rem' }}>
                                <h3 style={{ marginBottom: '1.5rem' }}>Share your feedback</h3>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Rating</label>
                                    <select 
                                        value={feedback.rating} 
                                        onChange={(e) => setFeedback({...feedback, rating: parseInt(e.target.value)})}
                                        style={{ width: '120px' }}
                                    >
                                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                                    </select>
                                </div>
                                <textarea 
                                    value={feedback.comment} 
                                    onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
                                    placeholder="Tell the community about your stay..."
                                    style={{ minHeight: '120px' }}
                                    required
                                />
                                <button type="submit" className="btn-primary" style={{ marginTop: '2rem', width: '200px' }}>Post Review</button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Column: Sticky Booking Card */}
                <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
                    <div className="glass-card" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>₹{listing.price.toLocaleString('en-IN')}</span>
                            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>/ night</span>
                        </div>

                        <button onClick={() => setShowModal(true)} className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
                            ⚡ Reserve Now
                        </button>

                        <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2.5rem' }}>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                ⭐ 4.9 · 12 reviews
                            </p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                                🛡️ Rare find · Quality guaranteed
                            </p>
                        </div>

                        {isAdmin && (
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <Link to={`/listings/${id}/edit`} className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', boxShadow: 'none' }}>Edit</Link>
                                <button onClick={handleDelete} className="btn-primary" style={{ flex: 1, background: 'var(--secondary)', boxShadow: 'none' }}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reservation Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(20px)' }}>
                    <div className="glass-card animate-slide-up" style={{ maxWidth: '550px', padding: '4rem', textAlign: 'center', position: 'relative', border: '1px solid var(--primary-glow)' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', opacity: 0.5 }}>&times;</button>
                        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>✨</div>
                        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Your Journey Awaits</h1>
                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>"{randomQuote}"</p>
                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>Ready to secure your stay at <strong>{listing.title}</strong>? Connect with the host directly to finalize your booking:</p>
                        <div className="glass-card" style={{ padding: '2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', marginBottom: '2.5rem' }}>
                             <h2 style={{ margin: 0, color: 'var(--primary)', letterSpacing: '0.05rem' }}>{listing.contact}</h2>
                        </div>
                        <button onClick={() => setShowModal(false)} className="btn-primary" style={{ width: '100%' }}>Got it!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Show;
