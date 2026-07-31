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
  ChevronRight,
  ArrowRight,
  Bell,
  LogOut,
  LogIn,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';

export default function Header({ 
  activeMarket, 
  setActiveMarket, 
  currentTab, 
  setCurrentTab, 
  currentUser, 
  isAuthenticated,
  onOpenAuthModal,
  onOpenCreateListing, 
  onOpenLegalDoc,
  activeTradeCount,
  notifications = [],
  onMarkNotificationRead,
  onOpenTradeFromNotification,
  onLogout,
  showToast
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAdminRole = isAuthenticated && (currentUser.id === 'user_admin_1' || currentUser.role?.toLowerCase().includes('admin'));
  const isSellerRole = isAuthenticated && !isAdminRole && (currentUser.id === 'user_seller_1' || currentUser.role?.toLowerCase().includes('seller'));

  const handleSelectNav = (tab) => {
    setCurrentTab(tab);
    setIsMenuOpen(false);
    setIsAccountMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleUpgrade = () => {
    setIsMenuOpen(false);
    setIsAccountMenuOpen(false);
    if (showToast) showToast('🚀 Upgrade Successful! You are now on DC Point Pro (0% Escrow Fees & Priority Mediation)');
  };

  // Filter notifications for current user
  const userNotifs = notifications.filter(n => n.recipientId === currentUser.id);
  const unreadNotifsCount = userNotifs.filter(n => !n.isRead).length;

  return (
    <header className="app-header">
      {/* Primary Navigation Bar Header */}
      <nav className="container" aria-label="Main Navigation">
        <div className="nav-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0' }}>
          
          {/* COLUMN 1 (LEFT): Brand Logo + Unified Trust Badge */}
          <div 
            className="logo-area" 
            onClick={() => handleSelectNav(isAuthenticated ? 'dashboard' : 'home')} 
            style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
          >
            <div className="logo-icon">DC</div>
            <div>
              <div style={{ lineHeight: '1.1', fontSize: 'clamp(1.05rem, 3.5vw, 1.25rem)', fontWeight: '800', color: '#FFFFFF' }}>DC Point</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'clamp(0.58rem, 2vw, 0.65rem)', color: '#00ADB5', fontWeight: '700', letterSpacing: '0.05em' }}>
                  ESCROW E-MARKETPLACE
                </span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.2rem', 
                  fontSize: 'clamp(0.58rem, 2vw, 0.68rem)', 
                  color: '#10B981', 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '1px solid rgba(16, 185, 129, 0.3)', 
                  padding: '0.1rem 0.4rem', 
                  borderRadius: '9999px', 
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}>
                  <ShieldCheck size={11} aria-hidden="true" /> 100% Escrow Protected
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 (CENTER): Exact Center Alignment for Purchase Market & Rent Market Toggle */}
          <div className="market-switch-tab" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!isAdminRole ? (
              <>
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
              </>
            ) : (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.5)',
                color: '#A78BFA',
                fontSize: '0.8rem',
                fontWeight: '700'
              }}>
                <ShieldAlert size={14} /> PLATFORM ADMINISTRATION CONTROL CENTER
              </div>
            )}
          </div>

          {/* COLUMN 3 (RIGHT): Secondary Action Utilities */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', position: 'relative' }}>
            
            {/* LOGGED OUT STATE: Show ONLY "My Account" Dropdown Popover on Far Right */}
            {!isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  style={{
                    background: isAccountMenuOpen ? 'rgba(0, 173, 181, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${isAccountMenuOpen ? '#00ADB5' : 'rgba(255, 255, 255, 0.2)'}`,
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minHeight: '40px'
                  }}
                  aria-label="My Account dropdown menu"
                >
                  <User size={16} color="#00ADB5" />
                  <span>My Account</span>
                  <ChevronDown size={14} color="#94A3B8" />
                </button>

                {/* Groww-styled Floating Dropdown Popover */}
                {isAccountMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: '0',
                    width: '280px',
                    background: '#0B192C',
                    border: '1px solid rgba(0, 173, 181, 0.4)',
                    borderRadius: '16px',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
                    padding: '1.1rem',
                    zIndex: 1100,
                    animation: 'slideUp 0.2s ease'
                  }}>
                    {/* Top Prominent Login Button */}
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        if (onOpenAuthModal) onOpenAuthModal();
                      }}
                      style={{ width: '100%', padding: '0.65rem', marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '700', minHeight: '42px' }}
                    >
                      <LogIn size={16} />
                      <span>Login / Select Role</span>
                    </button>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.75rem' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#00ADB5', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                        Quick Links & Information
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            handleSelectNav('home');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.5rem 0.65rem',
                            borderRadius: '8px',
                            background: currentTab === 'home' ? 'rgba(255,255,255,0.08)' : 'transparent',
                            color: '#FFFFFF',
                            fontSize: '0.85rem',
                            textAlign: 'left',
                            border: 'none',
                            minHeight: '38px'
                          }}
                        >
                          <span>Overview / Home</span>
                          <ChevronRight size={14} color="#64748B" />
                        </button>

                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            handleSelectNav('marketplace');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.5rem 0.65rem',
                            borderRadius: '8px',
                            background: currentTab === 'marketplace' ? 'rgba(255,255,255,0.08)' : 'transparent',
                            color: '#FFFFFF',
                            fontSize: '0.85rem',
                            textAlign: 'left',
                            border: 'none',
                            minHeight: '38px'
                          }}
                        >
                          <span>Explore Marketplace</span>
                          <ChevronRight size={14} color="#64748B" />
                        </button>

                        <div 
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            if (onOpenLegalDoc) onOpenLegalDoc('escrow-protection');
                          }}
                          style={{ padding: '0.5rem 0.65rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.25)', marginTop: '0.4rem', cursor: 'pointer' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10B981', fontWeight: '700', fontSize: '0.78rem' }}>
                            <ShieldCheck size={14} /> 100% Escrow Vault Protected
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem', lineHeight: '1.3' }}>
                            All trades backed by binding legal agreement contracts & milestone payments.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* LOGGED IN STATE: Show Hamburger Menu (☰) and User Profile Controls on Far Right */
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    setIsNotifOpen(false);
                    setIsProfileOpen(false);
                  }}
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
                    transition: 'all 0.2s',
                    minHeight: '40px'
                  }}
                  title="Navigation & User Menu"
                  aria-label="Open User Navigation Menu"
                >
                  {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

              {/* Hamburger Dropdown Menu Drawer */}
              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: '0',
                  width: '320px',
                  background: '#0B192C',
                  border: '1px solid rgba(0, 173, 181, 0.4)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
                  padding: '1.25rem',
                  zIndex: 1000,
                  animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  {/* User Profile Card inside Mobile Drawer */}
                  {isAuthenticated && (
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 173, 181, 0.3)',
                      borderRadius: '12px',
                      padding: '0.85rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        {currentUser.avatar ? (
                          <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isAdminRole ? '#8B5CF6' : isSellerRole ? '#10B981' : '#00ADB5', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                            {currentUser.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#FFFFFF' }}>{currentUser.name}</div>
                          <div style={{ fontSize: '0.7rem', color: isAdminRole ? '#A78BFA' : isSellerRole ? '#10B981' : '#00ADB5', fontWeight: '700' }}>
                            {isAdminRole ? '👑 Super Admin' : isSellerRole ? '🎨 Seller Account' : '🛒 Buyer Account'}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem', marginBottom: '0.65rem' }}>
                        <span>Escrow Wallet:</span>
                        <strong style={{ color: '#10B981' }}>₹{currentUser.walletBalance.toLocaleString()}</strong>
                      </div>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (onLogout) onLogout();
                        }}
                        style={{
                          width: '100%',
                          padding: '0.45rem',
                          borderRadius: '8px',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#FCA5A5',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          minHeight: '40px'
                        }}
                      >
                        <LogOut size={14} />
                        <span>Logout & Switch Role</span>
                      </button>
                    </div>
                  )}

                  {!isAuthenticated && (
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (onOpenAuthModal) onOpenAuthModal();
                      }}
                      style={{ width: '100%', marginBottom: '1rem', padding: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', minHeight: '44px' }}
                    >
                      <LogIn size={16} />
                      <span>Login / Select Role</span>
                    </button>
                  )}

                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#00ADB5', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Platform Navigation
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {!isAuthenticated && (
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
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          minHeight: '44px'
                        }}
                      >
                        <span>Overview / Home</span>
                        <ChevronRight size={14} color="#64748B" />
                      </button>
                    )}

                    {isAuthenticated && (
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
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          minHeight: '44px'
                        }}
                      >
                        <span>Workspace Dashboard</span>
                        {activeTradeCount > 0 && (
                          <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{activeTradeCount} Active</span>
                        )}
                      </button>
                    )}

                    {!isAdminRole && (
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
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          minHeight: '44px'
                        }}
                      >
                        <span>Explore Marketplace</span>
                        <ChevronRight size={14} color="#64748B" />
                      </button>
                    )}
                  </div>

                  {/* DC Point Pro Upgrade Card */}
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
          )}

          {/* 2. Notification Bell (Desktop Only - Collapses on Mobile) */}
            {isAuthenticated && (
              <div className="desktop-header-action" style={{ position: 'relative' }}>
                <button
                  onClick={() => {
                    setIsNotifOpen(!isNotifOpen);
                    setIsMenuOpen(false);
                    setIsProfileOpen(false);
                  }}
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
                  title="Notifications"
                  aria-label="View notifications"
                >
                  <Bell size={18} />
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

                {/* Notification Drawer */}
                {isNotifOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: '0',
                    width: '340px',
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
                        <Bell size={16} /> Notifications ({userNotifs.length})
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
                          No notifications yet. Updates will appear here!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Dashboard Button (Desktop Only - Collapses on Mobile) */}
            {isAuthenticated && (
              <button 
                className={`btn-outline btn-sm desktop-header-action ${currentTab === 'dashboard' ? 'active' : ''}`}
                style={{ 
                  color: '#FFFFFF', 
                  borderColor: currentTab === 'dashboard' ? '#00ADB5' : 'rgba(255,255,255,0.2)',
                  background: currentTab === 'dashboard' ? 'rgba(0,173,181,0.2)' : 'transparent',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.75rem'
                }}
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
            )}

            {/* List Item Option strictly for Seller role (Desktop Only) */}
            {isSellerRole && (
              <button 
                className="btn-primary btn-sm desktop-header-action"
                onClick={onOpenCreateListing}
                title="List an item or rental service"
                style={{ padding: '0.4rem 0.75rem' }}
              >
                <PlusCircle size={15} />
                <span>List Item</span>
              </button>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
}

