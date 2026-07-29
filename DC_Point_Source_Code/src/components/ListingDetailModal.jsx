import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  CheckCircle, 
  FileText, 
  Lock, 
  Truck, 
  Clock, 
  User, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ListingDetailModal({ listing, onClose, onStartTrade, onViewSellerProfile }) {
  if (!listing) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '840px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-verified">
              <ShieldCheck size={14} /> AI Compliance Passed
            </span>
            <span className="badge badge-escrow">
              Escrow Protected Trade
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="grid-2" style={{ gap: '2rem' }}>
            {/* Image Preview & Seller info */}
            <div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '260px', background: '#F1F5F9', marginBottom: '1.25rem' }}>
                <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Seller credentials card */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Verified Merchant Profile
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0B192C', color: '#00ADB5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                    {listing.sellerName.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{listing.sellerName}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Unregistered Artisan • Compliance Passed</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                  <span>Rating: <strong style={{ color: '#D97706' }}>★ {listing.sellerRating}</strong></span>
                  <span>Completed Trades: <strong style={{ color: '#0B192C' }}>{listing.sellerCompletedTrades}</strong></span>
                </div>

                <button 
                  className="btn-outline btn-sm"
                  onClick={() => onViewSellerProfile(listing.sellerId)}
                  style={{ width: '100%', marginTop: '0.85rem' }}
                >
                  View Full Public Reputation Profile
                </button>
              </div>
            </div>

            {/* Listing Details & Terms */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '0.75rem' }}>
                {listing.title}
              </h2>

              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0B192C', marginBottom: '1.25rem' }}>
                ${listing.price} <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '500' }}>({listing.unit})</span>
              </div>

              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {listing.description}
              </p>

              {/* Specs */}
              {listing.specifications && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', color: '#0B192C', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Item Specifications
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {listing.specifications.map((spec, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.35rem 0.5rem', background: '#F8FAFC', borderRadius: '6px' }}>
                        <span style={{ color: '#64748B' }}>{spec.label}:</span>
                        <strong style={{ color: '#0F172A' }}>{spec.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Legal Contract Terms */}
              <div style={{
                background: '#ECFDF5',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <FileText size={16} /> Pre-Screened Legal Contract Template
                </div>
                <div style={{ fontSize: '0.8rem', color: '#047857', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div>• Delivery Window: <strong>{listing.sampleAgreementTerms?.deliveryWindowDays || 7} Days</strong></div>
                  <div>• Buyer Inspection Window: <strong>{listing.sampleAgreementTerms?.inspectionWindowHours || 48} Hours</strong></div>
                  <div>• Quality Clause: <strong>{listing.sampleAgreementTerms?.qualityStandard}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={() => onStartTrade(listing)}>
            <Lock size={18} />
            <span>Initiate Escrow Trade & Contract</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
