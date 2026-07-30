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
  ArrowRight,
  Bell,
  Check,
  UserCheck,
  LogIn
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
  notifications = [],
  onMarkNotificationRead,
  onOpenTradeFromNotification,
  showToast
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleSelectNav = (tab) => {
    setCurrentTab(tab);
    setIsMenuOpen(false);
  };

  const handleUpgrade = () => {
    setIsMenuOpen(false);
    if (showToast) showToast('🚀 Upgrade Successful! You are now on DC Point Pro (0% Escrow Fees & Priority Mediation)');
  };

  // Filter notifications for current user
  const userNotifs = notifications.filter(n => n.recipientId === currentUser.id);
  const unreadNotifsCount = userNotifs.filter(n => !n.isRead).length;

  return (
    <header className="app-header">
      {/* Top Escrow & Login Role Bar */}
      <div className="persona-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: '600', fontSize: '0.8rem' }}>
              <ShieldCheck size={14} /> 100% Escrow Vault Protected
            </div>

            {/* Active Persona Banner */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.15rem 0.6rem',
              borderRadius: '9999px',
              background: currentUser.id === 'user_admin_1' 
                ? 'rgba(139, 92, 246, 0.25)' 
                : currentUser.id === 'user_seller_1' 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'rgba(0, 173, 181, 0.2)',
              border: `1px solid ${
                currentUser.id === 'user_admin_1' 
                  ? '#8B5CF6' 
                  : currentUser.id === 'user_seller_1' 
                    ? '#10B981' 
                    : '#00ADB5'
              }`,
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: '700'
            }}>
              <span>
                {currentUser.id === 'user_admin_1' 
                  ? '👑 Logged in as SUPER ADMIN:' 
                  : currentUser.id === 'user_seller_1' 
                    ? '🎨 Logged in as SELLER:' 
                    : '🛒 Logged in as BUYER:'}
              </span>
              <strong style={{ 
                color: currentUser.id === 'user_admin_1' 
                  ? '#A78BFA' 
                  : currentUser.id === 'user_seller_1' 
                    ? '#10B981' 
                    : '#00ADB5' 
              }}>
                {currentUser.name}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94A3B8', fontSize: '0.8rem' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.3rem', 
              color: currentUser.id === 'user_admin_1' ? '#A78BFA' : '#00ADB5',
              fontWeight: '600'
            }}>
              <Wallet size={14} /> 
              {currentUser.id === 'user_admin_1' ? 'Platform Fee Revenue:' : 'Escrow Wallet:'} 
              <strong style={{ color: currentUser.id === 'user_admin_1' ? '#10B981' : '#FFFFFF' }}>
                ₹{currentUser.walletBalance.toLocaleString()}
              </strong>
            </span>

            {/* Switch Login Role Shortcut */}
            <button
              onClick={onOpenAuthModal}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                borderRadius: '6px',
                padding: '0.2rem 0.5rem',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <LogIn size={12} />
              <span>Switch Login</span>
            </button>
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

          {/* Direct CTA Actions, Notifications Bell & Hamburger Menu Button */}
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

            {/* REAL-TIME NOTIFICATION BELL */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{
                  background: isNotifOpen ? '#00ADB5' : 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
                title="Buyer Notifications for Seller Work Updates"
              >
                <Bell size={20} />
                {unreadNotifsCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#EF4444',
                    color: '#FFF',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #0B192C'
                  }}>
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATION DROPDOWN DRAWER */}
              {isNotifOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: '0',
                  width: '350px',
                  background: '#0B192C',
                  border: '1px solid rgba(0, 173, 181, 0.5)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
                  padding: '1rem',
                  zIndex: 1050,
                  animation: 'slideUp 0.2s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00ADB5', fontWeight: '800', fontSize: '0.85rem' }}>
                      <Bell size={16} /> Buyer Notifications ({userNotifs.length})
                    </div>
                    {unreadNotifsCount > 0 && (
                      <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>{unreadNotifsCount} Unread</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '280px', overflowY: 'auto' }}>
                    {userNotifs.length > 0 ? (
                      userNotifs.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            if (onMarkNotificationRead) onMarkNotificationRead(n.id);
                            if (onOpenTradeFromNotification) onOpenTradeFromNotification(n.tradeId);
                            setIsNotifOpen(false);
                          }}
                          style={{
                            padding: '0.65rem 0.75rem',
                            borderRadius: '8px',
                            background: n.isRead ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 173, 181, 0.15)',
                            border: '1px solid',
                            borderColor: n.isRead ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 173, 181, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FFFFFF' }}>{n.title}</span>
                            <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>{n.timestamp}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#CBD5E1', margin: 0, lineHeight: '1.3' }}>
                            {n.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8', textAlign: 'center', padding: '1.5rem 0' }}>
                        No notifications yet. Updates on seller work will appear here!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

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
