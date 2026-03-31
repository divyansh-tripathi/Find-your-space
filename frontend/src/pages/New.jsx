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
        <div className="container animate-slide-up" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '700px', padding: '3.5rem' }}>
                <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Host Your <span className="text-gradient">Space</span></h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1rem' }}>Share your unique space with our community of premium travelers.</p>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Listing Title</label>
                        <input name="title" placeholder="Stunning Cliffside Villa" onChange={handleChange} required />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Description</label>
                        <textarea name="description" placeholder="Describe the experience, amenities, and vibe..." onChange={handleChange} required rows="5"></textarea>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Price (₹ / Night)</label>
                            <input name="price" type="number" placeholder="5000" onChange={handleChange} required />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Image URL</label>
                            <input name="image" placeholder="https://..." onChange={handleChange} required />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Location</label>
                            <input name="location" placeholder="Malibu, CA" onChange={handleChange} required />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Country</label>
                            <input name="country" placeholder="USA" onChange={handleChange} required />
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Host Contact Info</label>
                        <input name="contact" placeholder="Email or Phone Number" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>Create Listing ✨</button>
                </form>
            </div>
        </div>
    );
};

export default New;
