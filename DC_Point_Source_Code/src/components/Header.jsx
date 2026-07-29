import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  User, 
  Wallet, 
  ShoppingBag, 
  Repeat, 
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  Zap,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function Header({ 
  activeMarket, 
  setActiveMarket, 
  currentTab, 
  setCurrentTab, 
  currentUser, 
  onSwitchUser, 
  allUsers, 
  onOpenCreateListing, 
  onOpenAuthModal, 
  activeTradeCount,
  showToast
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectNav = (tab) => {
    setCurrentTab(tab);
    setIsMenuOpen(false);
  };

  const handleUpgrade = () => {
    setIsMenuOpen(false);
    if (showToast) showToast('🚀 Upgrade Successful! You are now on DC Point Pro (0% Escrow Fees & Priority Mediation)');
  };

  return (
    <header className="app-header">
      {/* Top Escrow Bar */}
      <div className="persona-bar">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: '600' }}>
            <ShieldCheck size={14} /> 100% Escrow Vault Protected
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: '#94A3B8' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#00ADB5' }}>
              <Wallet size={14} /> Escrow Vault Balance: <strong>₹{currentUser.walletBalance.toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div className="nav-main">
          {/* Brand Logo */}
          <div 
            className="logo-area" 
            onClick={() => handleSelectNav('home')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="logo-icon">DC</div>
            <div>
              <div style={{ lineHeight: '1' }}>DC Point</div>
              <div style={{ fontSize: '0.65rem', color: '#00ADB5', fontWeight: '600', letterSpacing: '0.05em' }}>
                ESCROW E-MARKETPLACE
              </div>
            </div>
          </div>

          {/* Market Switcher (Purchase vs Rent) */}
          <div className="market-switch-tab">
            <button 
              className={`market-tab-btn ${activeMarket === 'purchase' ? 'active' : ''}`}
              onClick={() => {
                setActiveMarket('purchase');
                if (currentTab !== 'marketplace') setCurrentTab('marketplace');
              }}
            >
              <ShoppingBag size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Purchase Market
            </button>
            <button 
              className={`market-tab-btn ${activeMarket === 'rent' ? 'active' : ''}`}
              onClick={() => {
                setActiveMarket('rent');
                if (currentTab !== 'marketplace') setCurrentTab('marketplace');
              }}
            >
              <Repeat size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Rent Market
            </button>
          </div>

          {/* Direct CTA Actions & Hamburger Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            <button 
              className="btn-primary btn-sm"
              onClick={onOpenCreateListing}
              title="List an item or rental service"
            >
              <PlusCircle size={16} />
              <span>List Item / Rental</span>
            </button>

            {/* Dashboard Shortcut */}
            <button 
              className={`btn-outline btn-sm ${currentTab === 'dashboard' ? 'active' : ''}`}
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={() => handleSelectNav('dashboard')}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
              {activeTradeCount > 0 && (
                <span className="badge badge-warning" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                  {activeTradeCount}
                </span>
              )}
            </button>

            {/* Hamburger Button (Top Right) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: isMenuOpen ? '#00ADB5' : 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '0.5rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Open Navigation & Persona Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Hamburger Dropdown Menu Drawer */}
            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: '0',
                width: '340px',
                background: '#0B192C',
                border: '1px solid rgba(0, 173, 181, 0.4)',
                borderRadius: '16px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
                padding: '1.25rem',
                zIndex: 1000,
                animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                {/* 1. Demo Persona Quick Switcher */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#00ADB5', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Demo Persona Switcher
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {allUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          onSwitchUser(user.id);
                          setIsMenuOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: currentUser.id === user.id ? '#00ADB5' : 'rgba(255, 255, 255, 0.1)',
                          background: currentUser.id === user.id ? 'rgba(0, 173, 181, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          color: '#FFFFFF',
                          fontSize: '0.85rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <User size={14} color={currentUser.id === user.id ? '#00ADB5' : '#94A3B8'} />
                          <span>{user.name}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: currentUser.id === user.id ? '#10B981' : '#94A3B8' }}>
                          {user.role.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Navigation Links */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#00ADB5', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Navigation
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <button 
                      onClick={() => handleSelectNav('home')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        background: currentTab === 'home' ? 'rgba(255,255,255,0.1)' : 'transparent',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        textAlign: 'left'
                      }}
                    >
                      <span>Overview</span>
                      <ChevronRight size={14} color="#64748B" />
                    </button>

                    <button 
                      onClick={() => handleSelectNav('marketplace')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        background: currentTab === 'marketplace' ? 'rgba(255,255,255,0.1)' : 'transparent',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        textAlign: 'left'
                      }}
                    >
                      <span>Explore Markets</span>
                      <ChevronRight size={14} color="#64748B" />
                    </button>

                    <button 
                      onClick={() => handleSelectNav('dashboard')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        background: currentTab === 'dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        textAlign: 'left'
                      }}
                    >
                      <span>Dashboard</span>
                      <ChevronRight size={14} color="#64748B" />
                    </button>
                  </div>
                </div>

                {/* 3. DC Point Pro Upgrade Card */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 173, 181, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                  border: '1px solid rgba(0, 173, 181, 0.5)',
                  borderRadius: '12px',
                  padding: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00ADB5', fontWeight: '800', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    <Sparkles size={14} /> UPGRADE TO PRO TIER
                  </div>
                  <p style={{ fontSize: '0.775rem', color: '#CBD5E1', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                    Enjoy <strong>0% Escrow Fees</strong>, Express AI Contract Builder & 1-Hour Dispute Arbitration.
                  </p>
                  <button 
                    className="btn-primary btn-sm"
                    onClick={handleUpgrade}
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}
                  >
                    <span>Upgrade to Pro (₹2,499/mo)</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
