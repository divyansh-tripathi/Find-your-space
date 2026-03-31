import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const New = () => {
    const [listing, setListing] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
        location: '',
        country: '',
        contact: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setListing({ ...listing, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/listings', { listing });
            toast.success('Listing created successfully!');
            navigate(`/listings/${res.data.listing._id}`);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to create listing');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <h1 style={{ marginBottom: '2rem' }}>List your <span className="text-gradient">Space</span></h1>
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Title</label>
                    <input name="title" onChange={handleChange} required className="btn-primary" style={{ background: 'var(--glass)', color: 'white', width: '100%', textAlign: 'left', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description</label>
                    <textarea name="description" onChange={handleChange} required rows="4" style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}></textarea>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Image URL</label>
                    <input name="image" onChange={handleChange} placeholder="https://..." style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Price (₹)</label>
                        <input name="price" type="number" onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Country</label>
                        <input name="country" onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Location</label>
                    <input name="location" onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Hotel Contact Info (Email or Phone)</label>
                    <input name="contact" onChange={handleChange} required placeholder="+91 12345 67890" />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Create Space</button>
            </form>
        </div>
    );
};

export default New;
