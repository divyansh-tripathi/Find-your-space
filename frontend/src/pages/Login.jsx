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
            const res = await api.post('/login', credentials);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }
            toast.success("Welcome back!");
            const role = res.data.user.role;
            if (role === 'admin') {
                window.location.href = '/dashboard';
            } else if (role === 'manager') {
                window.location.href = '/manager-dashboard';
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "User not found. Please sign up.");
            navigate('/signup');
        }
    };

    return (
        <div className="container animate-slide-up" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-card auth-container" style={{ width: '100%', padding: '3.5rem' }}>
                <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Welcome <span className="text-gradient">Back</span></h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Enter your credentials to access your space.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Username</label>
                        <input className="w-full px-4 py-2 border rounded-md outline-none" name="username" placeholder="johndoe" onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Password</label>
                        <input className="w-full px-4 py-2 border rounded-md outline-none" name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem' }}>Login to Account</button>

                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        New to FindYourSpace? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
