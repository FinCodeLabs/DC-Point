import React, { useState } from 'react';
import { X, ShieldCheck, User, Lock, Mail, Phone, KeyRound, Sparkles } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [authMethod, setAuthMethod] = useState('email'); // 'email' | 'phone'
  const [inputVal, setInputVal] = useState('');
  const [passVal, setPassVal] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    setOtpSent(true);
  };

  const handleCompleteLogin = (e) => {
    e.preventDefault();
    // Log in as Alex Mercer or current session
    onLoginSuccess();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '460px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#0B192C', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="#00ADB5" />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>Unified DC Point Account</h3>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Dynamic Role Access (Buyer & Seller)</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFFFFF' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Method selector */}
          <div style={{ display: 'flex', background: '#F8FAFC', padding: '0.3rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #E2E8F0' }}>
            <button 
              onClick={() => setAuthMethod('email')}
              style={{
                flex: '1',
                padding: '0.45rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                background: authMethod === 'email' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'email' ? '#0B192C' : '#64748B',
                boxShadow: authMethod === 'email' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Email + OTP
            </button>
            <button 
              onClick={() => setAuthMethod('phone')}
              style={{
                flex: '1',
                padding: '0.45rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                background: authMethod === 'phone' ? '#FFFFFF' : 'transparent',
                color: authMethod === 'phone' ? '#0B192C' : '#64748B',
                boxShadow: authMethod === 'phone' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Phone SMS OTP
            </button>
          </div>

          <form onSubmit={otpSent ? handleCompleteLogin : handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>
                {authMethod === 'email' ? 'Email Address' : 'Mobile Phone Number'}
              </label>
              <div style={{ position: 'relative' }}>
                {authMethod === 'email' ? (
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                ) : (
                  <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                )}
                <input 
                  type={authMethod === 'email' ? 'email' : 'tel'}
                  placeholder={authMethod === 'email' ? 'alex.mercer@trade-tech.io' : '+1 (555) 234-8901'}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.75rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  required
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>
                  Verification Code (OTP)
                </label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input 
                    type="text"
                    placeholder="Enter 6-digit OTP (e.g. 558912)"
                    value={otpVal}
                    onChange={e => setOtpVal(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.75rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    required
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.3rem' }}>
                  ✓ Demo Code Sent! (Enter any code to authenticate)
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ padding: '0.85rem', width: '100%' }}>
              <span>{otpSent ? 'Authenticate & Enter Market' : 'Send One-Time Passcode'}</span>
            </button>
          </form>

          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748B' }}>
            Role is assigned dynamically based on your actions (Buying or Selling).
          </div>
        </div>
      </div>
    </div>
  );
}
