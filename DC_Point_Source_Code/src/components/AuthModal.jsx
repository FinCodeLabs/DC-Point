import React, { useState } from 'react';
import { X, ShieldCheck, User, Lock, Mail, Phone, KeyRound, Sparkles } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess, isMandatory = false }) {
  const [authMethod, setAuthMethod] = useState('role'); // 'role' | 'email' | 'phone'
  const [inputVal, setInputVal] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');

  // Handle Escape keypress
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isMandatory && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isMandatory]);

  const handleQuickRoleLogin = (userId) => {
    onLoginSuccess(userId);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    setOtpSent(true);
  };

  const handleCompleteLogin = (e) => {
    e.preventDefault();
    onLoginSuccess('user_buyer_1');
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={() => { if (!isMandatory && onClose) onClose(); }} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="auth-modal-title"
    >
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#0B192C', color: '#FFFFFF', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00ADB5 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0, 173, 181, 0.4)'
            }}>
              <ShieldCheck size={24} color="#FFFFFF" aria-hidden="true" />
            </div>
            <div>
              <h2 id="auth-modal-title" style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>
                DC Point ESCROW E-MARKETPLACE
              </h2>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                {isMandatory ? 'Authentication Required: Select Your Workspace Role' : 'Select User Login Role'}
              </div>
            </div>
          </div>
          {!isMandatory && onClose && (
            <button 
              onClick={onClose} 
              style={{ background: 'none', border: 'none', color: '#94A3B8', minWidth: '44px', minHeight: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close login dialog"
            >
              <X size={22} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="modal-body" style={{ padding: '1.75rem' }}>
          {/* Direct Role Login Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#00ADB5', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} /> Select Workspace & Role Entry:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Buyer Card */}
              <button
                onClick={() => handleQuickRoleLogin('user_buyer_1')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid #00ADB5',
                  background: 'linear-gradient(135deg, rgba(0, 173, 181, 0.08) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0, 173, 181, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 auto', minWidth: 0, marginRight: '0.75rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#00ADB5', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.25rem', flexShrink: 0 }}>
                    🛒
                  </div>
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0B192C' }}>BUYER PORTAL</div>
                    <div style={{ fontSize: '0.82rem', color: '#00ADB5', fontWeight: '600' }}>Alex Mercer</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.1rem', lineHeight: '1.3' }}>Browse items & hire services with Escrow Vault security</div>
                  </div>
                </div>
                <div style={{ background: '#00ADB5', color: '#FFF', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Enter Buyer ➔
                </div>
              </button>

              {/* Seller Card */}
              <button
                onClick={() => handleQuickRoleLogin('user_seller_1')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid #10B981',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 auto', minWidth: 0, marginRight: '0.75rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.25rem', flexShrink: 0 }}>
                    🎨
                  </div>
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0B192C' }}>SELLER DASHBOARD</div>
                    <div style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: '600' }}>Maya Lin (CraftedStudio)</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.1rem', lineHeight: '1.3' }}>Manage orders, list products & request milestone payouts</div>
                  </div>
                </div>
                <div style={{ background: '#10B981', color: '#FFF', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Enter Seller ➔
                </div>
              </button>

              {/* Super Admin Card */}
              <button
                onClick={() => handleQuickRoleLogin('user_admin_1')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '2px solid #8B5CF6',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 auto', minWidth: 0, marginRight: '0.75rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#8B5CF6', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.25rem', flexShrink: 0 }}>
                    👑
                  </div>
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0B192C' }}>SUPER ADMIN DASHBOARD</div>
                    <div style={{ fontSize: '0.82rem', color: '#8B5CF6', fontWeight: '600' }}>Platform Super Admin</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.1rem', lineHeight: '1.3' }}>Platform administration, vault reserves & 5% fee commission</div>
                  </div>
                </div>
                <div style={{ background: '#8B5CF6', color: '#FFF', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Enter Admin ➔
                </div>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 1rem 0', color: '#94A3B8', fontSize: '0.75rem' }}>
            <div style={{ flex: '1', height: '1px', background: '#E2E8F0' }} />
            <span>OR Standard OTP Credential Auth</span>
            <div style={{ flex: '1', height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Method selector */}
          <div style={{ display: 'flex', background: '#F8FAFC', padding: '0.3rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
            <button 
              type="button"
              onClick={() => setAuthMethod('email')}
              style={{
                flex: '1',
                padding: '0.45rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                background: authMethod === 'email' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'email' ? '#0B192C' : '#64748B',
                boxShadow: authMethod === 'email' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Email + OTP
            </button>
            <button 
              type="button"
              onClick={() => setAuthMethod('phone')}
              style={{
                flex: '1',
                padding: '0.45rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                background: authMethod === 'phone' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'phone' ? '#0B192C' : '#64748B',
                boxShadow: authMethod === 'phone' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Phone SMS OTP
            </button>
          </div>

          {(authMethod === 'email' || authMethod === 'phone') && (
            <form onSubmit={otpSent ? handleCompleteLogin : handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                  {authMethod === 'email' ? 'Email Address' : 'Mobile Phone Number'}
                </label>
                <div style={{ position: 'relative' }}>
                  {authMethod === 'email' ? (
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  ) : (
                    <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  )}
                  <input 
                    type={authMethod === 'email' ? 'email' : 'tel'}
                    placeholder={authMethod === 'email' ? 'alex.mercer@trade-tech.io' : '+1 (555) 234-8901'}
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.2rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                    Verification Code (OTP)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input 
                      type="text"
                      placeholder="Enter OTP (e.g. 558912)"
                      value={otpVal}
                      onChange={e => setOtpVal(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.2rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      required
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ padding: '0.75rem', width: '100%', fontSize: '0.85rem' }}>
                <span>{otpSent ? 'Authenticate & Enter Market' : 'Send One-Time Passcode'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
