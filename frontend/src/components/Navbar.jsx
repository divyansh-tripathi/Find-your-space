import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await api.get('/currUser');
                console.log("Current User Data:", res.data.user);
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            }
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        try {
            await api.get('/logout');
            toast.success("Logged out successfully");
            setUser(null);
            navigate('/');
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    return (
        <nav className="glass-card animate-fade-in" style={{ margin: '1rem', padding: '1.25rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 1000 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900 }}>FindYourSpace</h2>
            </Link>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem' }}>Explore</Link>
                {user?.role === 'admin' && (
                    <>
                        <Link to="/listings/new" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem' }}>Host Room</Link>
                        <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem' }}>Dashboard</Link>
                    </>
                )}
                
                {!user ? (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <Link to="/signup" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600 }}>Signup</Link>
                        <Link to="/login" className="btn-primary" style={{ padding: '0.6rem 1.75rem' }}>Login</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                            Welcome, <span style={{ color: 'var(--text-main)' }}>@{user.username}</span>
                        </span>
                        <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.6rem 1.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)' }}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
