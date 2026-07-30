import React from 'react';
import { X, ShieldCheck, Star, UserCheck, FileText, CheckCircle2, Lock } from 'lucide-react';
import { INITIAL_USER_PERSONAS } from '../data/mockData';

export default function PublicProfileModal({ userId, onClose }) {
  const persona = INITIAL_USER_PERSONAS.find(u => u.id === userId) || INITIAL_USER_PERSONAS[1];

  // Handle Escape keypress
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={18} color="#007A80" aria-hidden="true" />
            <h2 id="profile-modal-title" style={{ fontSize: '1.1rem', fontWeight: '700' }}>Public Merchant Reputation Profile</h2>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: '#475569', minWidth: '44px', minHeight: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close profile dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#0B192C', color: '#00ADB5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: '800', margin: '0 auto 0.75rem auto' }}>
              {persona.name.charAt(0)}
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800' }}>{persona.name}</h3>
            <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.2rem' }}>{persona.role}</div>
            <div style={{ marginTop: '0.5rem' }}>
              <span className="badge badge-verified"><ShieldCheck size={12} aria-hidden="true" /> {persona.verifiedStatus}</span>
            </div>
          </div>

          <div className="grid-3" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#D97706' }}>★ {persona.rating}</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '500' }}>Rating Score</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0B192C' }}>{persona.completedTrades}</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '500' }}>Completed Escrow Trades</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#047857' }}>{persona.trustScore}%</div>
              <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '500' }}>Trust Index</div>
            </div>
          </div>

          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#047857' }}>
            <div style={{ fontWeight: '700', marginBottom: '0.2rem' }}>✓ DC Point Escrow Compliance Record</div>
            <div>Zero unfulfilled orders • 100% On-time delivery compliance • Verified Identity</div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-navy" onClick={onClose} style={{ width: '100%', minHeight: '44px' }}>
            Close Profile View
          </button>
        </div>
      </div>
    </div>
  );
}

