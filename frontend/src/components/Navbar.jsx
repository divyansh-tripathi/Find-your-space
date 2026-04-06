import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await api.get('/currUser');
                if (res.data.user) {
                    setUser(res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch {
                setUser(null);
                localStorage.removeItem('user');
            }
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        try {
            await api.get('/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success("Logged out successfully");
            setUser(null);
            setMenuOpen(false);
            navigate('/');
        } catch {
            toast.error("Logout failed");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setMenuOpen(false);
        navigate(searchTerm.trim() ? `/?location=${searchTerm}` : '/');
    };

    const closeMenu = () => setMenuOpen(false);

    const linkStyle = {
        color: 'var(--text-main)', textDecoration: 'none',
        fontWeight: 600, fontSize: '1rem', opacity: 0.85,
    };

    return (
        <nav style={{
            margin: '1rem', position: 'sticky', top: '1rem', zIndex: 1000,
            backdropFilter: 'blur(16px) saturate(180%)',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.25rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
            {/* Main row */}
            <div style={{ padding: '0.9rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
                    <h2 className="logo-text" style={{ margin: 0, fontSize: '1.7rem', fontWeight: 900, letterSpacing: '-0.02rem', color: 'white' }}>
                        Find<span className="text-gradient">YourSpace</span>
                    </h2>
                </Link>

                {/* Desktop Search */}
                <form onSubmit={handleSearch} style={{ position: 'relative', width: '320px', display: 'var(--nav-search-display, flex)' }} className="nav-search-desktop">
                    <input
                        type="text"
                        placeholder="Search locations, cities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', borderRadius: '2rem', width: '100%' }}
                    />
                </form>

                {/* Desktop Links */}
                <div className="nav-links-desktop" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={linkStyle}>Explore</Link>
                    {user?.role === 'admin' && <>
                        <Link to="/listings/new" style={linkStyle}>Host Room</Link>
                        <Link to="/dashboard" style={linkStyle}>Admin</Link>
                    </>}
                    {user?.role === 'manager' && <>
                        <Link to="/listings/new" style={linkStyle}>Host Room</Link>
                        <Link to="/manager-dashboard" style={linkStyle}>Dashboard</Link>
                    </>}
                    {!user ? (
                        <>
                            <Link to="/signup" style={linkStyle}>Signup</Link>
                            <Link to="/login" className="btn-primary" style={{ padding: '0.6rem 1.6rem' }}>Login</Link>
                        </>
                    ) : (
                        <>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>@{user.username}</span>
                            <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.55rem 1.4rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>Logout</button>
                        </>
                    )}
                </div>

                {/* Hamburger Button (mobile only) */}
                <button
                    onClick={() => setMenuOpen(o => !o)}
                    className="nav-hamburger"
                    style={{
                        display: 'none', flexDirection: 'column', gap: '5px',
                        background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                    }}
                    aria-label="Toggle menu"
                >
                    <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                    <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                    <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    padding: '1.25rem 2rem 1.5rem',
                    display: 'flex', flexDirection: 'column', gap: '1.25rem',
                }}>
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search locations, cities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', borderRadius: '2rem', width: '100%' }}
                        />
                    </form>

                    <Link to="/" style={linkStyle} onClick={closeMenu}>Explore</Link>
                    {user?.role === 'admin' && <>
                        <Link to="/listings/new" style={linkStyle} onClick={closeMenu}>Host Room</Link>
                        <Link to="/dashboard" style={linkStyle} onClick={closeMenu}>Admin Dashboard</Link>
                    </>}
                    {user?.role === 'manager' && <>
                        <Link to="/listings/new" style={linkStyle} onClick={closeMenu}>Host Room</Link>
                        <Link to="/manager-dashboard" style={linkStyle} onClick={closeMenu}>Dashboard</Link>
                    </>}

                    {!user ? (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/signup" className="btn-primary" style={{ flex: 1, textAlign: 'center', padding: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', boxShadow: 'none' }} onClick={closeMenu}>Signup</Link>
                            <Link to="/login" className="btn-primary" style={{ flex: 1, textAlign: 'center', padding: '0.7rem' }} onClick={closeMenu}>Login</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>@{user.username}</span>
                            <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.55rem 1.4rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>Logout</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
