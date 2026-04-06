import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            toast.error("Failed to fetch users");
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.put(`/users/${userId}/role`, { role: newRole });
            toast.success(`Role updated to ${newRole}`);
            fetchUsers();
        } catch (err) {
            toast.error("Failed to update role");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await api.delete(`/users/${userId}`);
                toast.success("User deleted");
                fetchUsers();
            } catch (err) {
                toast.error("Failed to delete user");
            }
        }
    };

    if (loading) return (
        <div className="container animate-slide-up">
            <div className="skeleton" style={{ height: '400px', width: '100%' }}></div>
        </div>
    );

    return (
        <div className="container animate-slide-up">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Management <span className="text-gradient">Console</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Control center for user roles and platform security.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Users</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{users.length}</div>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Admins</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>{users.filter(u => u.role === 'admin').length}</div>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Managers</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b' }}>{users.filter(u => u.role === 'manager').length}</div>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>System Status</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginTop: '1rem' }}>● Operational</div>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '0', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>User Profile</th>
                            <th style={{ padding: '1.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email Address</th>
                            <th style={{ padding: '1.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Access Level</th>
                            <th style={{ padding: '1.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Management</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} className="hover-card">
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ fontWeight: 700 }}>@{user.username}</div>
                                </td>
                                <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{user.email}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{
                                            display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                                            background: user.role === 'admin' ? 'var(--primary)' : user.role === 'manager' ? '#f59e0b' : 'var(--text-muted)',
                                            flexShrink: 0,
                                        }} />
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            style={{
                                                padding: '0.45rem 0.75rem', fontSize: '0.88rem',
                                                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '0.5rem', color: 'white', cursor: 'pointer',
                                                width: '130px',
                                            }}
                                        >
                                            <option value="visitor">👤 Visitor</option>
                                            <option value="manager">🏢 Manager</option>
                                            <option value="admin">⚡ Admin</option>
                                        </select>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="btn-primary"
                                        style={{ background: 'var(--secondary)', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                                    >
                                        Revoke Access
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
