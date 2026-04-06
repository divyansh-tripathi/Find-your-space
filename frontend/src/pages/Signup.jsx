import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '', role: 'visitor' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/signup', user);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }
            toast.success("Welcome to FindYourSpace!");
            const role = res.data.user.role;
            if (role === 'admin') {
                window.location.href = '/dashboard';
            } else if (role === 'manager') {
                window.location.href = '/manager-dashboard';
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="container animate-slide-up" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '3.5rem' }}>
                <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Join the <span className="text-gradient">Community</span></h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>Create an account to start exploring premium spaces.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Username</label>
                        <input className="w-full px-4 py-2 border rounded-md outline-none" name="username" placeholder="johndoe" onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Email Address</label>
                        <input className="w-full px-4 py-2 border rounded-md outline-none" name="email" type="email" placeholder="john@example.com" onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>Password</label>
                        <input className="w-full px-4 py-2 border rounded-md outline-none" name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem' }}>I want to...</label>
                        <select name="role" value={user.role} onChange={handleChange} style={{ width: '100%' }}>
                            <option value="visitor">Explore Spaces (User)</option>
                            <option value="manager">List my Space (Manager)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem' }}>Create Free Account</button>

                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
