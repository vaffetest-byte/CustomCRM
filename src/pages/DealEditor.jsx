import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Save, ArrowLeft, Trash2, Plus } from 'lucide-react';

const DealEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { deals, addDeal, updateDeal, lenders } = useData();

    const isNew = !id || id === 'new';

    // Initial State based on "Master Prompt"
    const initialState = {
        dealName: '',
        rep: '',
        dba: '',
        industry: '',
        position: '',
        balances: '',
        businessAddress: '',
        businessCity: '',
        businessState: '',
        businessZip: '',
        dealOwner: '',
        coOwner: '',
        federalTaxId: '',
        businessStartDate: '',
        businessEmail: '',
        businessPhone: '',
        inquireSource: '',
        stage: 'New',

        // Merchant Info
        firstName: '',
        lastName: '',
        merchantAddress: '',
        merchantCity: '',
        merchantState: '',
        merchantZip: '',
        dob: '',
        ssn: '',
        creditScore: '',
        ownershipShares: '',

        // Accepted Offer
        acceptedAmount: '',
        acceptedLenderId: '',
        acceptedRate: '',
        acceptedTerm: '',
        dateFunded: '',
        dealNotes: '',

        // Subforms
        lendersReviewing: [], // { lenderId, declineReason }
        offers: [] // { lenderId, amount, rate, term }
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!isNew) {
            const found = deals.find(d => d.id.toString() === id);
            if (found) setFormData(found);
        }
    }, [id, deals, isNew]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- Subform Logic: Offers ---
    const addOffer = () => {
        setFormData(prev => ({
            ...prev,
            offers: [...prev.offers, { id: Date.now(), lenderId: '', amount: 0, rate: 0, term: 0 }]
        }));
    };

    const updateOffer = (offerId, field, value) => {
        setFormData(prev => ({
            ...prev,
            offers: prev.offers.map(o => o.id === offerId ? { ...o, [field]: value } : o)
        }));
    };

    const removeOffer = (offerId) => {
        setFormData(prev => ({
            ...prev,
            offers: prev.offers.filter(o => o.id !== offerId)
        }));
    };

    // --- Formulas ---
    // Returns formatted currency or string
    const calculateRTR = (amount, rate) => (amount * rate) || 0;
    const calculateDaily = (amount, rate, term) => term > 0 ? ((amount * rate) / term) : 0;
    const calculateWeekly = (daily) => daily * 5;
    const calculateMonthly = (daily) => daily * 30;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNew) {
            addDeal(formData);
        } else {
            updateDeal(parseInt(id), formData);
        }
        navigate('/deals');
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button type="button" onClick={() => navigate('/deals')} style={{ background: 'transparent', color: 'var(--text-secondary)' }}>
                    <ArrowLeft />
                </button>
                <h1 style={{ fontSize: '2rem' }}>{isNew ? 'Create New Deal' : `Edit Deal: ${formData.dealName}`}</h1>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => navigate('/deals')} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}>
                        Cancel
                    </button>
                    <button type="submit" style={{ padding: '0.75rem 1.5rem', background: 'var(--accent-primary)', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Save size={18} />
                        Save Deal
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>

                {/* Main Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Section 1: Business Info */}
                    <Section title="1️⃣ Business Information">
                        <Grid>
                            <Input label="Deal Name" value={formData.dealName} onChange={e => handleChange('dealName', e.target.value)} required placeholder="e.g. Expansion Funding" />
                            <Input label="Business DBA" value={formData.dba} onChange={e => handleChange('dba', e.target.value)} />
                            <Input label="Industry" value={formData.industry} onChange={e => handleChange('industry', e.target.value)} />
                            <Input label="Deal Owner" value={formData.dealOwner} onChange={e => handleChange('dealOwner', e.target.value)} />
                            <Input label="Federal Tax ID" value={formData.federalTaxId} onChange={e => handleChange('federalTaxId', e.target.value)} />
                            <Input label="Business Phone" value={formData.businessPhone} onChange={e => handleChange('businessPhone', e.target.value)} />
                            <Input label="Business Email" value={formData.businessEmail} onChange={e => handleChange('businessEmail', e.target.value)} />
                            <Input label="Address" value={formData.businessAddress} onChange={e => handleChange('businessAddress', e.target.value)} fullWidth />
                            <Input label="City" value={formData.businessCity} onChange={e => handleChange('businessCity', e.target.value)} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Input label="State" value={formData.businessState} onChange={e => handleChange('businessState', e.target.value)} />
                                <Input label="Zip" value={formData.businessZip} onChange={e => handleChange('businessZip', e.target.value)} />
                            </div>
                        </Grid>
                    </Section>

                    {/* Section 2: Merchant Information */}
                    <Section title="2️⃣ Merchant Information">
                        <Grid>
                            <Input label="First Name" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                            <Input label="Last Name" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                            <Input label="SSN" value={formData.ssn} onChange={e => handleChange('ssn', e.target.value)} />
                            <Input label="Date of Birth" type="date" value={formData.dob} onChange={e => handleChange('dob', e.target.value)} />
                            <Input label="Merge Address Info?" type="checkbox" style={{ width: 'auto' }} />
                            <Input label="Credit Score" value={formData.creditScore} onChange={e => handleChange('creditScore', e.target.value)} />
                            <Input label="Ownership %" value={formData.ownershipShares} onChange={e => handleChange('ownershipShares', e.target.value)} type="number" />

                            <div style={{ gridColumn: '1 / -1', marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={formData.hasSecondOwner} onChange={e => handleChange('hasSecondOwner', e.target.checked)} />
                                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Add Second Owner?</span>
                                </label>
                            </div>
                        </Grid>
                    </Section>

                    {/* Section 3: Second Owner (Conditional) */}
                    {formData.hasSecondOwner && (
                        <Section title="3️⃣ Second Owner Information">
                            <Grid>
                                <Input label="First Name" value={formData.secFirstName} onChange={e => handleChange('secFirstName', e.target.value)} />
                                <Input label="Last Name" value={formData.secLastName} onChange={e => handleChange('secLastName', e.target.value)} />
                                <Input label="SSN" value={formData.secSsn} onChange={e => handleChange('secSsn', e.target.value)} />
                                <Input label="Date of Birth" type="date" value={formData.secDob} onChange={e => handleChange('secDob', e.target.value)} />
                                <Input label="Ownership %" value={formData.secOwnershipShares} onChange={e => handleChange('secOwnershipShares', e.target.value)} type="number" />
                                <Input label="Address" value={formData.secAddress} onChange={e => handleChange('secAddress', e.target.value)} fullWidth />
                            </Grid>
                        </Section>
                    )}

                    {/* Section 5: Lenders Reviewing (Subform) */}
                    <Section title="5️⃣ Lenders Reviewing">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {lenders.map(lender => {
                                const isReviewing = formData.lendersReviewing?.includes(lender.id);
                                return (
                                    <label key={lender.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: isReviewing ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                                        backgroundColor: isReviewing ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                        cursor: 'pointer'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={isReviewing}
                                            onChange={(e) => {
                                                const current = formData.lendersReviewing || [];
                                                if (e.target.checked) {
                                                    handleChange('lendersReviewing', [...current, lender.id]);
                                                } else {
                                                    handleChange('lendersReviewing', current.filter(id => id !== lender.id));
                                                }
                                            }}
                                        />
                                        <span style={{ fontSize: '0.9rem', fontWeight: isReviewing ? '500' : '400' }}>{lender.name}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </Section>

                    {/* Section 6: Offers (Subform) - The Complex Part */}
                    <Section title="6️⃣ Offers & Calculations">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {formData.offers.map((offer, index) => {
                                const rtr = calculateRTR(offer.amount, offer.rate);
                                const daily = calculateDaily(offer.amount, offer.rate, offer.term);

                                return (
                                    <div key={offer.id} style={{
                                        backgroundColor: 'var(--bg-app)',
                                        padding: '1.5rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--border-subtle)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <h4 style={{ color: 'var(--accent-primary)' }}>Offer #{index + 1}</h4>
                                            <button type="button" onClick={() => removeOffer(offer.id)} style={{ color: 'var(--danger)', background: 'transparent' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div className="field">
                                                <label style={labelStyle}>Lender</label>
                                                <select
                                                    style={inputStyle}
                                                    value={offer.lenderId}
                                                    onChange={e => updateOffer(offer.id, 'lenderId', e.target.value)}
                                                >
                                                    <option value="">Select Lender...</option>
                                                    {lenders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                                </select>
                                            </div>
                                            <Input label="Amount ($)" type="number" value={offer.amount} onChange={e => updateOffer(offer.id, 'amount', parseFloat(e.target.value))} />
                                            <Input label="Rate (Factor)" type="number" step="0.01" value={offer.rate} onChange={e => updateOffer(offer.id, 'rate', parseFloat(e.target.value))} />
                                            <Input label="Term (Days)" type="number" value={offer.term} onChange={e => updateOffer(offer.id, 'term', parseFloat(e.target.value))} />
                                        </div>

                                        {/* Live Calculations Zone */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(4, 1fr)',
                                            gap: '1rem',
                                            backgroundColor: '#1e3a8a20', // slight blue tint
                                            padding: '1rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px dashed var(--accent-primary)'
                                        }}>
                                            <CalcDisplay label="RTR (Total Payback)" value={rtr} isCurrency />
                                            <CalcDisplay label="Daily Pmt" value={daily} isCurrency />
                                            <CalcDisplay label="Weekly Pmt (x5)" value={calculateWeekly(daily)} isCurrency />
                                            <CalcDisplay label="Monthly Pmt (x30)" value={calculateMonthly(daily)} isCurrency />
                                        </div>
                                    </div>
                                );
                            })}

                            <button type="button" onClick={addOffer} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '1rem',
                                border: '1px dashed var(--border-subtle)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--text-secondary)',
                                background: 'transparent',
                                cursor: 'pointer'
                            }}>
                                <Plus size={18} /> Add Offer
                            </button>
                        </div>
                    </Section>

                </div>

                {/* Sidebar Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Section title="Stage & Status">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="field">
                                <label style={labelStyle}>Stage</label>
                                <select style={inputStyle} value={formData.stage} onChange={e => handleChange('stage', e.target.value)}>
                                    <option>New</option>
                                    <option>Underwriting</option>
                                    <option>Offers Received</option>
                                    <option>Contracts Sent</option>
                                    <option>Funded</option>
                                    <option>Lost</option>
                                </select>
                            </div>
                            <Input label="Inquire Source" value={formData.inquireSource} onChange={e => handleChange('inquireSource', e.target.value)} />
                        </div>
                    </Section>

                    <Section title="Accepted Offer Details">
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            Fill this once the merchant accepts a specific lender's offer.
                        </p>
                        <Grid singleColumn>
                            <Input label="Date Funded" type="date" value={formData.dateFunded} onChange={e => handleChange('dateFunded', e.target.value)} />
                            <Input label="Accepted Amount" type="number" value={formData.acceptedAmount} onChange={e => handleChange('acceptedAmount', e.target.value)} />
                            <div className="field">
                                <label style={labelStyle}>Winning Lender</label>
                                <select style={inputStyle} value={formData.acceptedLenderId} onChange={e => handleChange('acceptedLenderId', e.target.value)}>
                                    <option value="">Select...</option>
                                    {lenders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                </select>
                            </div>
                        </Grid>
                    </Section>
                </div>

            </div>
        </form>
    );
};

// UI Components for this page
const Section = ({ title, children }) => (
    <div style={{
        backgroundColor: 'var(--bg-panel)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>{title}</h3>
        {children}
    </div>
);

const Grid = ({ children, singleColumn }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: singleColumn ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
    }}>
        {children}
    </div>
);

const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' };
const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'var(--bg-app)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '0.9rem'
};

const Input = ({ label, fullWidth, ...props }) => (
    <div style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
        <label style={labelStyle}>{label}</label>
        <input style={inputStyle} {...props} />
    </div>
);

const CalcDisplay = ({ label, value, isCurrency }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
            {isCurrency ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0) : value}
        </span>
    </div>
);

export default DealEditor;
