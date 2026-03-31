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
            setListing({ ...listing, feedbacks: [...listing.feedbacks, { ...res.data.feedback, author: currUser }] });
            setFeedback({ comment: '', rating: 5 });
        } catch (err) {
            toast.error("Please login to post feedback");
        }
    };

    if (loading) return <div className="container"><h2>Exploring...</h2></div>;
    if (!listing) return null;

    const isAdmin = currUser?.role === 'admin';

    return (
        <div className="container animate-fade-in">
            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>{listing.title}</h1>
                <div style={{ borderRadius: '1.5rem', overflow: 'hidden', marginBottom: '2.5rem', height: '500px' }}>
                    <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '3rem' }}>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Owned by <span className="text-gradient">@{listing.owner?.username}</span></p>
                        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', marginTop: '1rem' }}>{listing.description}</p>
                        
                        <div className="glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
                             <p style={{ margin: 0 }}>📍 <strong>{listing.location}, {listing.country}</strong></p>
                        </div>

                        {/* Feedbacks Display */}
                        <div style={{ marginTop: '3rem' }}>
                            <h3>Guest <span className="text-gradient">Reviews</span></h3>
                            <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
                                {listing.feedbacks?.map((f, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong>@{f.author?.username}</strong>
                                            <span style={{ color: 'gold' }}>{'★'.repeat(f.rating)}</span>
                                        </div>
                                        <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>{f.comment}</p>
                                    </div>
                                ))}
                            </div>

                            {currUser && (
                                <form onSubmit={handleFeedbackSubmit} style={{ marginTop: '2rem' }}>
                                    <h4>Leave a Review</h4>
                                    <textarea 
                                        value={feedback.comment} 
                                        onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
                                        placeholder="Tell us about your stay..."
                                        style={{ marginTop: '1rem', height: '80px' }}
                                        required
                                    />
                                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Post</button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div style={{ alignSelf: 'start', position: 'sticky', top: '100px' }}>
                        <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--primary)' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>₹{listing.price.toLocaleString('en-IN')} <small style={{ color: 'var(--text-muted)' }}>/ night</small></h2>
                            <button onClick={() => setShowModal(true)} className="btn-primary" style={{ width: '100%' }}>Reserve Now</button>
                            
                            {isAdmin && (
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                    <Link to={`/listings/${id}/edit`} className="btn-primary" style={{ flex: 1, background: 'var(--glass)' }}>Edit</Link>
                                    <button onClick={handleDelete} className="btn-primary" style={{ flex: 1, background: 'var(--secondary)' }}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reservation Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(10px)' }}>
                    <div className="glass-card animate-fade-in" style={{ maxWidth: '500px', padding: '3rem', textAlign: 'center', position: 'relative' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        <h2 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Your Journey Awaits</h2>
                        <i style={{ display: 'block', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>"{randomQuote}"</i>
                        <p style={{ marginBottom: '0.5rem' }}>To complete your booking for <strong>{listing.title}</strong>, please contact the hotel directly:</p>
                        <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', marginBottom: '2rem' }}>
                             <h3 style={{ margin: 0, color: 'var(--primary)' }}>{listing.contact}</h3>
                        </div>
                        <button onClick={() => setShowModal(false)} className="btn-primary" style={{ width: '100%' }}>Got it!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Show;
