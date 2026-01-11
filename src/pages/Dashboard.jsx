import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, Activity, ArrowUpRight, Zap, PieChart } from 'lucide-react';
import { useData } from '../context/DataContext';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

// Enhanced Card with interactive hover state
const DashCard = ({ title, value, icon: Icon, accentColor, trend }) => (
    <div
        className="glass-card"
        style={{
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '180px',
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '0.75rem',
                borderRadius: '50%', // Circle icons
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)'
            }}>
                <Icon size={22} color="white" />
            </div>
            {/* Toggle Imitation */}
            <div className={`toggle-switch ${trend > 0 ? 'active' : ''}`}>
                <div className="toggle-handle" />
            </div>
        </div>

        <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 600 }}>{title}</p>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.25rem', color: 'white' }}>{value}</h3>
        </div>
    </div>
);

const PortfolioCard = () => (
    <div
        className="glass-card"
        style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2rem',
            gridRow: 'span 2',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.4) 100%)', // Blue/Purple Glass
            border: '1px solid rgba(255,255,255,0.2)'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                width: 50, height: 50,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(10px)'
            }}>
                <PieChart size={24} color="white" />
            </div>

            {/* Toggle Green */}
            <div style={{ width: 32, height: 18, background: 'var(--accent-primary)', borderRadius: 99, position: 'relative' }}>
                <div style={{ width: 14, height: 14, background: 'white', borderRadius: '50%', position: 'absolute', right: 2, top: 2 }} />
            </div>
        </div>

        <div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: 700, color: 'white' }}>Fund Portfolio</h3>
            {/* Progress Bar imitation */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px', marginTop: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '65%', height: '100%', background: 'white', borderRadius: '99px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                <span>$1.2M Distributed</span>
                <span>$2.0M Goal</span>
            </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {/* Player Control Imitation Buttons */}
            <button className="btn-glass" style={{ borderRadius: '50%', width: 48, height: 48, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={20} />
            </button>
            <button className="btn-primary" style={{ flex: 1 }}>
                View Analytics
            </button>
        </div>
    </div>
);

const Dashboard = () => {
    const { deals } = useData();
    const activeDeals = deals.filter(d => d.stage !== 'Lost' && d.stage !== 'New').length;

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
        >
            <header style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '99px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                        <Zap size={14} fill="currentColor" /> Recommended actions for 24 hours
                    </motion.span>
                </div>
                <h2 style={{ fontSize: '3rem', fontWeight: '700', letterSpacing: '-0.02em', background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Active Pipeline Overview
                </h2>
            </header>

            {/* Grid Layout mimicking the image */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr) 380px', // Wider sidebar col
                gridTemplateRows: 'repeat(2, auto)',
                gap: '2rem'
            }}>
                {/* Row 1 Stats */}
                <DashCard
                    title="Total Funded Volume"
                    value="$2.4M"
                    accentColor="#7c3aed"
                    icon={DollarSign}
                    trend={12.4}
                />
                <DashCard
                    title="Active Deals"
                    value={activeDeals}
                    accentColor="#f59e0b"
                    icon={Activity}
                    trend={5.2}
                />
                <DashCard
                    title="Lender Response Rate"
                    value="64%"
                    accentColor="#10b981"
                    icon={Users}
                    trend={-2.1}
                />

                {/* Tall Card on Right */}
                <PortfolioCard />

                {/* Row 2 Big Chart Section */}
                <motion.div
                    variants={item}
                    style={{
                        gridColumn: 'span 3',
                        backgroundColor: 'var(--bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2.5rem',
                        border: '1px solid var(--border-subtle)',
                        minHeight: '350px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Chart Background Grid */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5, pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Last Update - 45 minutes ago</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: 600 }}>Funding Velocity</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-app)', padding: '0.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                            {['Deals', 'Revenue', 'Lenders'].map((tab, i) => (
                                <button key={tab} style={{
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '8px',
                                    background: i === 0 ? 'var(--bg-card)' : 'transparent',
                                    color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    boxShadow: i === 0 ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                    transition: 'all 0.2s'
                                }}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Chart Visual */}
                    <div style={{
                        width: '100%',
                        height: '220px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {[40, 55, 45, 70, 50, 80, 65, 90, 75, 55, 85, 95].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 0.8, type: 'spring' }}
                                whileHover={{ scaleY: 1.05, filter: 'brightness(1.2)' }}
                                style={{
                                    width: '100%',
                                    background: i === 11 ? 'var(--accent-gradient)' : 'var(--border-subtle)',
                                    borderRadius: '8px 8px 0 0',
                                    opacity: i === 11 ? 1 : 0.3,
                                    position: 'relative'
                                }}
                            >
                                {/* Tooltip on hover logic would go here, simplified visual for now */}
                                {i === 11 && (
                                    <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', background: 'var(--text-primary)', color: 'var(--bg-app)', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        $2.4M
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Dashboard;
