import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Repeat, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  PlusCircle, 
  FileText, 
  Star, 
  ArrowRight,
  UserCheck,
  Lock
} from 'lucide-react';

export default function Dashboard({ 
  currentUser, 
  activeTrades, 
  allListings, 
  onOpenTradeWizard, 
  onOpenCreateListing,
  onViewSellerProfile 
}) {
  const [dashTab, setDashTab] = useState('active-trades');

  // Filter listings by current user
  const myListings = allListings.filter(l => l.sellerId === currentUser.id);
  const myPurchases = activeTrades.filter(t => t.buyerId === currentUser.id);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Dashboard Top Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0B192C 0%, #1E3E62 100%)',
        color: '#FFFFFF',
        padding: '2rem 2.5rem',
        borderRadius: '16px',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#00ADB5',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '800'
          }}>
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#FFFFFF', fontWeight: '800' }}>{currentUser.name}</h2>
              <span className="badge badge-verified"><ShieldCheck size={12} /> {currentUser.verifiedStatus}</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#94A3B8' }}>
              Trust Score: <strong style={{ color: '#00ADB5' }}>{currentUser.trustScore}%</strong> • Escrow Balance: <strong style={{ color: '#10B981' }}>${currentUser.walletBalance.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-primary" onClick={onOpenCreateListing}>
            <PlusCircle size={18} />
            <span>Create Listing</span>
          </button>
        </div>
      </div>

      {/* Dashboard Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid #E2E8F0',
        marginBottom: '2rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'active-trades', label: `Active Trades (${activeTrades.length})` },
          { id: 'my-listings', label: `My Listings (${myListings.length})` },
          { id: 'my-purchases', label: `My Purchases (${myPurchases.length})` },
          { id: 'trust-score', label: 'Trust & Badges' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setDashTab(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: '700',
              fontSize: '0.9rem',
              background: 'transparent',
              border: 'none',
              borderBottom: dashTab === tab.id ? '3px solid #00ADB5' : '3px solid transparent',
              color: dashTab === tab.id ? '#0B192C' : '#64748B',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {dashTab === 'active-trades' && (
        <div>
          {activeTrades.length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <Clock size={40} style={{ color: '#CBD5E1', marginBottom: '0.75rem' }} />
              <h3>No active trades in progress</h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Browse the marketplace and click "I Want This" to initiate your first escrow agreement.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {activeTrades.map(trade => (
                <div key={trade.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span className="badge badge-escrow">Step {trade.currentStep} of 6</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>ID: {trade.id}</span>
                      <span className="badge badge-verified">{trade.status}</span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{trade.title}</h3>

                    <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.4rem', display: 'flex', gap: '1.5rem' }}>
                      <span>Buyer: <strong>{trade.buyerName}</strong></span>
                      <span>Seller: <strong>{trade.sellerName}</strong></span>
                      <span>Escrow Locked: <strong style={{ color: '#10B981' }}>${trade.totalEscrowAmount || trade.price}</strong></span>
                    </div>
                  </div>

                  <button className="btn-navy" onClick={() => onOpenTradeWizard(trade)}>
                    <span>Open Trade Wizard</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {dashTab === 'my-listings' && (
        <div>
          {myListings.length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <FileText size={40} style={{ color: '#CBD5E1', marginBottom: '0.75rem' }} />
              <h3>No listings created yet</h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Click "Create Listing" above to publish your product or service to the marketplace.
              </p>
            </div>
          ) : (
            <div className="grid-3">
              {myListings.map(item => (
                <div key={item.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ height: '160px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem', background: '#F1F5F9' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span className="badge badge-verified" style={{ marginBottom: '0.4rem' }}>{item.complianceStatus}</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.title}</h4>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0B192C' }}>${item.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {dashTab === 'my-purchases' && (
        <div>
          {myPurchases.length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <ShoppingBag size={40} style={{ color: '#CBD5E1', marginBottom: '0.75rem' }} />
              <h3>No purchases recorded</h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Browse the marketplace and initiate an escrow trade to make your first purchase.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {myPurchases.map(trade => (
                <div key={trade.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    {trade.image && (
                      <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                        <img src={trade.image} alt={trade.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span className="badge badge-escrow">Step {trade.currentStep} of 6</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>ID: {trade.id}</span>
                        <span className="badge badge-verified">{trade.status}</span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{trade.title}</h3>

                      <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.4rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <span>Seller: <strong>{trade.sellerName}</strong></span>
                        <span>Type: <strong style={{ textTransform: 'capitalize' }}>{trade.type}</strong></span>
                        <span>Escrow Locked: <strong style={{ color: '#10B981' }}>${trade.totalEscrowAmount || trade.price}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button className="btn-navy" onClick={() => onOpenTradeWizard(trade)}>
                    <span>Open Trade Wizard</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {dashTab === 'trust-score' && (
        <div className="grid-2">
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>Reputation & Verification</h3>
            <div style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                <span>Trust Score:</span> <strong style={{ color: '#00ADB5' }}>{currentUser.trustScore}/100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                <span>Completed Trades:</span> <strong>{currentUser.completedTrades}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                <span>Identity Verification:</span> <span style={{ color: '#10B981', fontWeight: '700' }}>Passed (ID Hash Verified)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
