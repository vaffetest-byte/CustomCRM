import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Plus, Search, DollarSign, Calendar } from 'lucide-react';

const Deals = () => {
    const { deals } = useData();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem' }}>Deals Pipeline</h2>
                <Link to="/deals/new" style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Plus size={18} />
                    New Deal
                </Link>
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
                            placeholder="Search deals..."
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
                </div>

                {[...deals].length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No deals found. Create one to get started.
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Deal Name</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>DBA</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Amount</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Stage</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.875rem' }}>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deals.map((deal) => (
                                <tr key={deal.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <Link to={`/deals/${deal.id}`} style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                                            {deal.dealName}
                                        </Link>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{deal.dba}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>
                                        {deal.amount ? `$${deal.amount.toLocaleString()}` : '-'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '99px',
                                            fontSize: '0.75rem',
                                            backgroundColor: 'rgba(99, 102, 241, 0.15)',
                                            color: 'var(--accent-primary)'
                                        }}>
                                            {deal.stage || 'New'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{deal.owner}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Deals;
