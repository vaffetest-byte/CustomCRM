import React from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

const Contacts = () => {
    const contacts = [
        { id: 1, name: 'Alice Freeman', email: 'alice@example.com', company: 'TechNova', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', company: 'BuildCo', status: 'Lead' },
        { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', company: 'DesignIt', status: 'Inactive' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', company: 'WonderCorp', status: 'Active' },
        { id: 5, name: 'Evan Wright', email: 'evan@example.com', company: 'WrightLogistics', status: 'Lead' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem' }}>Contacts</h2>
                <button style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: '500'
                }}>
                    Add Contact
                </button>
            </div>

            <div style={{
                backgroundColor: 'var(--bg-panel)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden'
            }}>
                {/* Toolbar */}
                <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: '1rem'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--bg-app)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.5rem 1rem',
                        border: '1px solid var(--border-subtle)',
                        flex: 1
                    }}>
                        <Search size={18} color="var(--text-muted)" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                marginLeft: '0.75rem',
                                width: '100%',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-panel)'
                    }}>
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>

                {/* Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Name</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Email</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Company</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Status</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background-color 0.1s' }}>
                                <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{contact.name}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{contact.email}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{contact.company}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        backgroundColor: contact.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : contact.status === 'Lead' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                                        color: contact.status === 'Active' ? 'var(--success)' : contact.status === 'Lead' ? 'var(--warning)' : 'var(--text-muted)'
                                    }}>
                                        {contact.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button style={{ color: 'var(--text-muted)', background: 'transparent' }}>
                                        <MoreHorizontal size={18} />
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

export default Contacts;
