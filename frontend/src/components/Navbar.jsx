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
            localStorage.removeItem('token');
            toast.success("Logged out successfully");
            setUser(null);
            navigate('/');
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?location=${searchTerm}`);
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="glass-card animate-slide-up" style={{ margin: '1rem', padding: '1rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 1000, borderRadius: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02rem', color: 'white' }}>
                        Find<span className="text-gradient">YourSpace</span>
                    </h2>
                </Link>

                <form onSubmit={handleSearch} style={{ position: 'relative', width: '350px' }}>
                    <input 
                        type="text" 
                        placeholder="Search locations, cities..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '0.7rem 1.25rem 0.7rem 2.8rem', fontSize: '0.95rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <span style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.9rem' }}>🔍</span>
                </form>
            </div>
            
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', opacity: 0.8 }}>Explore</Link>
                {user?.role === 'admin' && (
                    <>
                        <Link to="/listings/new" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', opacity: 0.8 }}>Host Room</Link>
                        <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', opacity: 0.8 }}>Dashboard</Link>
                    </>
                )}
                
                {!user ? (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <Link to="/signup" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>Signup</Link>
                        <Link to="/login" className="btn-primary" style={{ padding: '0.65rem 1.8rem' }}>Login</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.1rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' }}>Member</span>
                            <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>@{user.username}</span>
                        </div>
                        <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.6rem 1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
