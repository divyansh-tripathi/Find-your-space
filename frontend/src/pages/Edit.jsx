import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Edit = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await api.get(`/listings/${id}`);
                setListing(res.data);
            } catch (err) {
                toast.error("Failed to fetch space details");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    const handleChange = (e) => {
        setListing({ ...listing, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/listings/${id}`, { listing });
            toast.success("Space updated successfully!");
            navigate(`/listings/${id}`);
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to update space");
        }
    };

    if (loading) return <div className="container"><h2>Fetching details...</h2></div>;
    if (!listing) return null;

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Edit <span className="text-gradient">Space</span></h1>
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Title</label>
                    <input name="title" value={listing.title} onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description</label>
                    <textarea name="description" value={listing.description} onChange={handleChange} required rows="4" style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}></textarea>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Image URL</label>
                    <input name="image" value={listing.image} onChange={handleChange} style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Price (₹)</label>
                        <input name="price" type="number" value={listing.price} onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Location</label>
                        <input name="location" value={listing.location} onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Country</label>
                        <input name="country" value={listing.country} onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Hotel Contact Info</label>
                    <input name="contact" value={listing.contact} onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Update Space</button>
            </form>
        </div>
    );
};

export default Edit;
