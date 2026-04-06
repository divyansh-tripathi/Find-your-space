import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManagerDashboard = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndListings = async () => {
            try {
                // Get current user to ensure they are a manager
                const userRes = await api.get('/currUser');
                const currentUser = userRes.data.user;
                if (!currentUser || currentUser.role !== 'manager') {
                    toast.error("Unauthorized access. Managers only.");
                    navigate('/');
                    return;
                }
                setUser(currentUser);

                // Fetch all listings
                const listingsRes = await api.get('/listings');
                // Filter listings owned by the manager
                // Note: The backend /listings endpoint returns populated owner, we check if owner._id matches current user.
                const myHotels = listingsRes.data.filter(
                    listing => listing.owner && (listing.owner._id === currentUser._id || listing.owner === currentUser._id)
                );

                setListings(myHotels);
                setLoading(false);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch dashboard data");
                setLoading(false);
            }
        };

        fetchUserAndListings();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            try {
                await api.delete(`/listings/${id}`);
                setListings(prev => prev.filter(listing => listing._id !== id));
                toast.success("Listing deleted successfully");
            } catch (err) {
                const message = err.response?.data?.error || "Failed to delete listing";
                toast.error(message);
            }
        }
    };

    if (loading) return <div className="loading" style={{ textAlign: 'center', marginTop: '5rem' }}><h2>Loading Dashboard...</h2></div>;

    return (
        <div className="container animate-slide-up" style={{ padding: '2rem 1rem' }}>
            <div className="flex-between-center mb-2">
                <div>
                    <h1>Welcome, <span className="text-gradient">Manager {user?.username}</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your hotel listings seamlessly.</p>
                </div>
                <Link to="/listings/new" className="btn-primary">+ Add New Hotel</Link>
            </div>

            {listings.length === 0 ? (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h3>No hotels listed yet.</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Ready to host? Add your first hotel space to reach thousands of users.</p>
                    <Link to="/listings/new" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Add Hotel</Link>
                </div>
            ) : (
                <div className="grid-3">
                    {listings.map(listing => (
                        <div key={listing._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.75rem' }} />
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{listing.title}</h3>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{listing.location}, {listing.country}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontWeight: 'bold' }}>&#8377; {listing.price?.toLocaleString("en-IN")}</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/listings/${listing._id}/edit`} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Edit</Link>
                                    <button onClick={() => handleDelete(listing._id)} className="btn-primary" style={{ background: '#dc2626', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagerDashboard;
