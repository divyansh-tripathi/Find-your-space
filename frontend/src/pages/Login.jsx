import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/login', credentials);
            toast.success("Welcome back!");
            navigate('/');
            window.location.reload(); // Refresh to update user state globally
        } catch (err) {
            toast.error(err.response?.data?.error || "Invalid username or password");
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Login to <span className="text-gradient">Space</span></h1>
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Username</label>
                    <input name="username" onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
                    <input name="password" type="password" onChange={handleChange} required style={{ background: 'var(--glass)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Login</button>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Signup</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
