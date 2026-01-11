import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Users, Mail, Shield, Plus, MoreHorizontal, Trash2, Edit2, Search } from 'lucide-react';

const Settings = () => {
    const { users, addUser, updateUser, deleteUser } = useData();
    const [activeTab, setActiveTab] = useState('users');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Sales' });

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setShowModal(true);
    };

    const handleAddNewClick = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'Sales' });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            updateUser(editingUser.id, { ...editingUser, ...formData });
        } else {
            addUser(formData);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Settings</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your team and application preferences.</p>
            </header>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                {/* Sidebar Tabs */}
                <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {['General', 'Users', 'Integrations', 'Billing'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            style={{
                                textAlign: 'left',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: activeTab === tab.toLowerCase() ? 'var(--bg-card)' : 'transparent',
                                color: activeTab === tab.toLowerCase() ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: activeTab === tab.toLowerCase() ? 600 : 500,
                                border: '1px solid transparent',
                                borderColor: activeTab === tab.toLowerCase() ? 'var(--border-subtle)' : 'transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div style={{ flex: 1 }}>
                    {activeTab === 'users' ? (
                        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>

                            {/* Header */}
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Team Members</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Manage access and roles.</p>
                                </div>
                                <button
                                    onClick={handleAddNewClick}
                                    className="btn-primary"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Plus size={18} /> Add User
                                </button>
                            </div>

                            {/* Table */}
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-app)', borderBottom: '1px solid var(--border-subtle)' }}>
                                        <th style={thStyle}>User</th>
                                        <th style={thStyle}>Role</th>
                                        <th style={thStyle}>Status</th>
                                        <th style={thStyle}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                            <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{user.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                                                    padding: '0.25rem 0.75rem', borderRadius: '99px',
                                                    fontSize: '0.75rem', fontWeight: 600,
                                                    backgroundColor: user.role === 'Admin' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                    color: user.role === 'Admin' ? 'var(--accent-primary)' : 'var(--warning)'
                                                }}>
                                                    {user.role === 'Admin' && <Shield size={12} />} {user.role}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ fontSize: '0.9rem', color: user.status === 'Active' ? 'var(--success)' : 'var(--text-muted)' }}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                    <button onClick={() => handleEditClick(user)} style={actionBtnStyle}>
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(user.id)} style={{ ...actionBtnStyle, color: 'var(--danger)' }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                            🚧 &nbsp; {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings are coming soon.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div style={{
                        backgroundColor: 'var(--bg-modal)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        width: '100%',
                        maxWidth: '450px',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>{editingUser ? 'Edit User' : 'Add New User'}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address</label>
                                <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div>
                                <label style={labelStyle}>Role</label>
                                <select className="form-input" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Viewer">Viewer</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn-primary">{editingUser ? 'Save Changes' : 'Create User'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles
const thStyle = {
    textAlign: 'left',
    padding: '1rem',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: 600,
    textTransform: 'uppercase'
};

const actionBtnStyle = {
    padding: '0.4rem',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
    background: 'transparent',
    cursor: 'pointer'
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)'
};

export default Settings;
