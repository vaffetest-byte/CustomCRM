import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Hexagon, Briefcase, Building2, Send, Sun, Moon } from 'lucide-react';

const Sidebar = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Briefcase, label: 'Deals', path: '/deals' },
    { icon: Building2, label: 'Lenders', path: '/lenders' },
    { icon: Send, label: 'Fund Deals', path: '/fund-deals' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
  ];

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      position: 'fixed'
    }}>
      {/* Logo Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <div style={{
          color: 'var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Hexagon size={32} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>NexusCRM</h1>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem', paddingLeft: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Menu</p>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'white' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                fontWeight: isActive ? 500 : 400,
                transition: 'all 0.2s',
              })}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: 'var(--text-secondary)',
            background: 'var(--bg-card)',
            fontSize: '0.9rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            transition: '0.2s'
          }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          color: 'var(--text-muted)',
          background: 'transparent',
          fontSize: '0.9rem',
          borderRadius: 'var(--radius-md)',
          transition: '0.2s'
        }}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};


const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      <Sidebar />
      <main style={{ marginLeft: '280px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <header style={{
          padding: '1.5rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid transparent' // kept for structure
        }}>
          <div>
            {/* Breadcrumb or Title placeholder if needed */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '99px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(to right, #7c3aed, #db2777)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Ryan Crawford</span>
            </div>
            <button style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '99px',
              fontSize: '0.9rem',
              fontWeight: 600,
              boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)'
            }}>
              Deposit
            </button>
          </div>
        </header>

        <div style={{ padding: '0 2.5rem 2.5rem 2.5rem', flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
