import React, { useState } from 'react';
import { X, ShieldCheck, User, Lock, Mail, Phone, KeyRound, Sparkles } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [authMethod, setAuthMethod] = useState('role'); // 'role' | 'email' | 'phone'
  const [inputVal, setInputVal] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#0B192C', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="#00ADB5" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>DC Point Portal Login</h3>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Select User Login Role (Buyer or Seller)</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFFFFF' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Direct Role Login Cards */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#00ADB5', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              ⚡ Single-Click Instant Login:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
              <button
                onClick={() => handleQuickRoleLogin('user_buyer_1')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.85rem 0.5rem',
                  borderRadius: '10px',
                  border: '2px solid #00ADB5',
                  background: 'rgba(0, 173, 181, 0.08)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#00ADB5', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '0.4rem', fontSize: '1rem' }}>
                  🛒
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0B192C' }}>BUYER</div>
                <div style={{ fontSize: '0.72rem', color: '#00ADB5', fontWeight: '600' }}>Alex Mercer</div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', marginTop: '0.2rem' }}>Purchases</div>
              </button>

              <button
                onClick={() => handleQuickRoleLogin('user_seller_1')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.85rem 0.5rem',
                  borderRadius: '10px',
                  border: '2px solid #10B981',
                  background: 'rgba(16, 185, 129, 0.08)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '0.4rem', fontSize: '1rem' }}>
                  🎨
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0B192C' }}>SELLER</div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '600' }}>Maya Lin</div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', marginTop: '0.2rem' }}>Fulfill Orders</div>
              </button>

              <button
                onClick={() => handleQuickRoleLogin('user_admin_1')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.85rem 0.5rem',
                  borderRadius: '10px',
                  border: '2px solid #8B5CF6',
                  background: 'rgba(139, 92, 246, 0.08)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#8B5CF6', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginBottom: '0.4rem', fontSize: '1rem' }}>
                  👑
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0B192C' }}>SUPER ADMIN</div>
                <div style={{ fontSize: '0.72rem', color: '#8B5CF6', fontWeight: '600' }}>Platform Owner</div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', marginTop: '0.2rem' }}>5% Commission</div>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.25rem 0', color: '#94A3B8', fontSize: '0.75rem' }}>
            <div style={{ flex: '1', height: '1px', background: '#E2E8F0' }} />
            <span>OR Standard Credential Verification</span>
            <div style={{ flex: '1', height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Method selector */}
          <div style={{ display: 'flex', background: '#F8FAFC', padding: '0.3rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
            <button 
              onClick={() => setAuthMethod('email')}
              style={{
                flex: '1',
                padding: '0.4rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                background: authMethod === 'email' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'email' ? '#0B192C' : '#64748B'
              }}
            >
              Email + OTP
            </button>
            <button 
              onClick={() => setAuthMethod('phone')}
              style={{
                flex: '1',
                padding: '0.4rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: '600',
                background: authMethod === 'phone' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'phone' ? '#0B192C' : '#64748B'
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
