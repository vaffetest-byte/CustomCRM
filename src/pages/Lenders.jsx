import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Plus, Filter, Building2, User, Phone, Mail, Award } from 'lucide-react';

const Lenders = () => {
    const { lenders, addLender } = useData();
    const [showModal, setShowModal] = useState(false);
    const [newLender, setNewLender] = useState({ name: '', repName: '', email: '', tier: 'Tier 2' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addLender(newLender);
        setShowModal(false);
        setNewLender({ name: '', repName: '', email: '', tier: 'Tier 2' });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem' }}>Lenders</h2>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        backgroundColor: 'var(--accent-primary)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Plus size={18} />
                    Add Lender
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {lenders.map(lender => (
                    <div key={lender.id} style={{
                        backgroundColor: 'var(--bg-panel)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--accent-primary)'
                                }}>
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: '600', fontSize: '1.1rem' }}>{lender.name}</h3>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: lender.tier === 'Tier 1' ? 'var(--success)' : 'var(--text-muted)',
                                        backgroundColor: lender.tier === 'Tier 1' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '99px',
                                        marginTop: '0.25rem',
                                        display: 'inline-block'
                                    }}>
                                        {lender.tier}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0.5rem 0' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={16} />
                                <span>{lender.repName}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} />
                                <span>{lender.email}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div style={{
                        backgroundColor: 'var(--bg-modal)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        width: '100%',
                        maxWidth: '500px',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-lg)',
                        animation: 'slideIn 0.2s ease-out'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Add New Lender</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Lender Name</label>
                                <input
                                    required
                                    className="form-input"
                                    placeholder="e.g. Capital One Biz"
                                    value={newLender.name}
                                    onChange={e => setNewLender({ ...newLender, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Rep Name</label>
                                <input
                                    required
                                    className="form-input"
                                    placeholder="e.g. Sarah Conner"
                                    value={newLender.repName}
                                    onChange={e => setNewLender({ ...newLender, repName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Rep Email</label>
                                <input
                                    required
                                    type="email"
                                    className="form-input"
                                    placeholder="e.g. sarah@example.com"
                                    value={newLender.email}
                                    onChange={e => setNewLender({ ...newLender, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Tier</label>
                                <select
                                    className="form-input"
                                    value={newLender.tier}
                                    onChange={e => setNewLender({ ...newLender, tier: e.target.value })}
                                >
                                    <option>Tier 1</option>
                                    <option>Tier 2</option>
                                    <option>Tier 3</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn-primary">Save Lender</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lenders;
