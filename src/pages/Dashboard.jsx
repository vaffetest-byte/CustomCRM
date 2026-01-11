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
    <motion.div
        variants={item}
        whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
        style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '200px',
            cursor: 'default'
        }}
    >
        {/* Dynamic Background Glow */}
        <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '120px',
            height: '120px',
            background: accentColor || 'var(--accent-primary)',
            filter: 'blur(70px)',
            opacity: 0.1,
            borderRadius: '50%',
            pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{
                background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}10 100%)`, // dynamic alpha
                padding: '0.875rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${accentColor}30`
            }}>
                <Icon size={24} color={accentColor} />
            </div>
            <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: 'var(--bg-card-hover)'
                }}
            >
                <ArrowUpRight size={18} color="var(--text-secondary)" />
            </motion.div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>{title}</p>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '0.5rem', background: 'linear-gradient(to bottom, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                    color: trend >= 0 ? 'var(--success)' : 'var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '99px',
                    background: trend >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                }}>
                    {trend >= 0 ? '+' : ''}{trend}%
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>vs last month</span>
            </div>
        </div>
    </motion.div>
);

const PortfolioCard = () => (
    <motion.div
        variants={item}
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
        style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f0f15 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            color: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2rem',
            gridRow: 'span 2',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
    >
        {/* Abstract shapes */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100%', height: '100%', background: 'conic-gradient(from 0deg at 50% 50%, rgba(124, 58, 237, 0.2) 0deg, transparent 60deg, transparent 300deg, rgba(236, 72, 153, 0.2) 360deg)', filter: 'blur(40px)' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: 50, height: 50, background: 'rgba(255,255,255,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                <PieChart size={24} color="#8b5cf6" />
            </div>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', background: 'var(--gradient-primary)', fontSize: '0.75rem', fontWeight: 700 }}>LIVE</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Fund Portfolio</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6' }}>
                Real-time tracking of deal flow and distribution analytics.
            </p>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <button style={{
                background: 'white',
                color: 'black',
                borderRadius: 'var(--radius-pill)',
                padding: '1rem',
                fontWeight: '700',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                border: 'none',
                transition: 'transform 0.2s'
            }}>
                View Analytics <TrendingUp size={18} />
            </button>
        </div>
    </motion.div>
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
