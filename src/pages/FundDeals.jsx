import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Send, Upload, CheckCircle, Search, FileText, X, Paperclip } from 'lucide-react';

const FundDeals = () => {
    const { deals, lenders } = useData();

    // Selection State
    const [selectedDealId, setSelectedDealId] = useState('');
    const [selectedLenderIds, setSelectedLenderIds] = useState([]);
    const [status, setStatus] = useState('draft'); // draft, sending, sent

    // File State
    const [files, setFiles] = useState([]); // Array of file objects { name, size, type, isNew }
    const fileInputRef = useRef(null);

    // When deal changes, load its attachments
    useEffect(() => {
        if (selectedDealId) {
            const deal = deals.find(d => d.id == selectedDealId);
            if (deal && deal.attachments) {
                setFiles(deal.attachments.map(a => ({ ...a, isFromDeal: true })));
            } else {
                setFiles([]);
            }
        } else {
            setFiles([]);
        }
    }, [selectedDealId, deals]);

    const handleLenderToggle = (lenderId) => {
        if (selectedLenderIds.includes(lenderId)) {
            setSelectedLenderIds(selectedLenderIds.filter(id => id !== lenderId));
        } else {
            setSelectedLenderIds([...selectedLenderIds, lenderId]);
        }
    };

    const handleFileSelect = (e) => {
        const newFiles = Array.from(e.target.files).map(f => ({
            id: Date.now() + Math.random(),
            name: f.name,
            size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
            type: f.type,
            isNew: true
        }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (fileId) => {
        setFiles(prev => prev.filter(f => f.id !== fileId));
    };

    const handleSend = () => {
        if (!selectedDealId || selectedLenderIds.length === 0) return;
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('sent');
        }, 2000);
    };

    if (status === 'sent') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <div style={{ color: 'var(--success)', marginBottom: '1rem' }}><CheckCircle size={64} /></div>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Package Sent!</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Your deal and <strong>{files.length}</strong> attachments have been emailed to <strong>{selectedLenderIds.length}</strong> lenders.
                </p>
                <button
                    onClick={() => { setStatus('draft'); setSelectedDealId(''); setSelectedLenderIds([]); setFiles([]); }}
                    style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)' }}
                >
                    Send Another
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Fund Deal Distribution</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Securely distribute deal packages to your lending partners.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.2fr) 1fr', gap: '2rem' }}>

                {/* Left Column: Deal & Files */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 1. Select Deal */}
                    <div style={cardStyle}>
                        <h3 style={sectionHeader}>1. Select Deal</h3>
                        <select
                            style={inputStyle}
                            value={selectedDealId}
                            onChange={(e) => setSelectedDealId(e.target.value)}
                        >
                            <option value="">Select a deal...</option>
                            {deals.map(d => <option key={d.id} value={d.id}>{d.dealName} — {d.dba}</option>)}
                        </select>

                        {/* Deal Quick Info */}
                        {selectedDealId && (() => {
                            const d = deals.find(i => i.id == selectedDealId);
                            return (
                                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount Request</span>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>${d.amount?.toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Industry</span>
                                            <div style={{ fontSize: '1rem' }}>{d.industry || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* 2. Attachments */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ ...sectionHeader, marginBottom: 0 }}>2. Deal Attachments</h3>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{files.length} Files Attached</span>
                        </div>

                        {/* File List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            {files.length === 0 && (
                                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                    No files selected yet.
                                </div>
                            )}
                            {files.map(file => (
                                <div key={file.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'var(--bg-app)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-sm)'
                                }}>
                                    <div style={{
                                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        color: 'var(--accent-primary)'
                                    }}>
                                        <FileText size={20} />
                                    </div>
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {file.size} • {file.isFromDeal ? 'From Deal' : 'Uploaded Now'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        style={{ color: 'var(--text-muted)', padding: '0.25rem', borderRadius: '4px' }}
                                        onMouseOver={e => e.currentTarget.style.color = 'var(--danger)'}
                                        onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Upload Area */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                border: '2px dashed var(--border-subtle)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-sm)',
                                textAlign: 'center',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                backgroundColor: 'rgba(255,255,255,0.02)'
                            }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                            />
                            <Paperclip size={20} style={{ marginBottom: '0.5rem' }} />
                            <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>Click to attach more files</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Lenders & Send */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={sectionHeader}>3. Recipients</h3>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '99px',
                                fontSize: '0.75rem'
                            }}>
                                {selectedLenderIds.length} Selected
                            </div>
                        </div>

                        <div style={{
                            flex: 1,
                            maxHeight: '500px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            paddingRight: '0.5rem'
                        }}>
                            {lenders.map(lender => (
                                <label key={lender.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    backgroundColor: selectedLenderIds.includes(lender.id) ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-app)',
                                    border: selectedLenderIds.includes(lender.id) ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                                    cursor: 'pointer',
                                    transition: 'all 0.1s'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedLenderIds.includes(lender.id)}
                                        onChange={() => handleLenderToggle(lender.id)}
                                        style={{ accentColor: 'var(--accent-primary)' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: '500', fontSize: '0.95rem' }}>{lender.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lender.repName}</p>
                                    </div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '0.1rem 0.5rem',
                                        borderRadius: '99px',
                                        backgroundColor: lender.tier === 'Tier 1' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                                        color: lender.tier === 'Tier 1' ? 'var(--success)' : 'var(--text-muted)',
                                        border: '1px solid transparent',
                                        borderColor: lender.tier === 'Tier 1' ? 'rgba(16, 185, 129, 0.2)' : 'transparent'
                                    }}>{lender.tier}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                            <span style={{ color: 'var(--text-primary)' }}>Ready to Send</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Files</span>
                            <span style={{ color: 'var(--text-primary)' }}>{files.length} attached</span>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0.5rem 0' }}></div>

                        <button
                            disabled={!selectedDealId || selectedLenderIds.length === 0 || status === 'sending'}
                            onClick={handleSend}
                            style={{
                                padding: '1rem',
                                background: (!selectedDealId || selectedLenderIds.length === 0) ? 'var(--bg-app)' : 'var(--accent-gradient)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                cursor: (!selectedDealId || selectedLenderIds.length === 0) ? 'not-allowed' : 'pointer',
                                opacity: (!selectedDealId || selectedLenderIds.length === 0) ? 0.5 : 1,
                                border: '1px solid transparent',
                                borderColor: (!selectedDealId || selectedLenderIds.length === 0) ? 'var(--border-subtle)' : 'transparent',
                                transition: 'all 0.2s',
                                boxShadow: (!selectedDealId || selectedLenderIds.length === 0) ? 'none' : '0 0 20px rgba(124, 58, 237, 0.3)'
                            }}
                        >
                            {status === 'sending' ? (
                                <span>Sending...</span>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send to {selectedLenderIds.length > 0 ? selectedLenderIds.length : ''} Lenders
                                </>
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Styles
const cardStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '1.5rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-sm)'
};

const sectionHeader = {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: 'var(--text-primary)'
};

const inputStyle = {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: 'var(--bg-app)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '0.95rem'
};

export default FundDeals;
