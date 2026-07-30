import React, { useState, useEffect } from 'react';
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
  Lock,
  Upload,
  Wallet,
  DollarSign,
  Crown,
  ShieldAlert,
  TrendingUp,
  Percent
} from 'lucide-react';

export default function Dashboard({ 
  currentUser, 
  activeTrades, 
  allListings, 
  onOpenTradeWizard, 
  onOpenCreateListing,
  onViewSellerProfile 
}) {
  const isAdminRole = currentUser.id === 'user_admin_1' || currentUser.role?.toLowerCase().includes('admin');
  const isSellerRole = !isAdminRole && (currentUser.id === 'user_seller_1' || currentUser.role?.toLowerCase().includes('seller'));
  
  const [dashTab, setDashTab] = useState(
    isAdminRole ? 'admin-commission' : isSellerRole ? 'seller-orders' : 'my-purchases'
  );

  // Keep tab updated when active user changes
  useEffect(() => {
    if (isAdminRole) setDashTab('admin-commission');
    else if (isSellerRole) setDashTab('seller-orders');
    else setDashTab('my-purchases');
  }, [currentUser.id, isAdminRole, isSellerRole]);

  // Filter listings and trades based on role
  const myListings = allListings.filter(l => l.sellerId === currentUser.id);
  const myPurchases = activeTrades.filter(t => t.buyerId === currentUser.id);
  const mySellerOrders = activeTrades.filter(t => t.sellerId === currentUser.id);

  // Role-specific tabs list
  const availableTabs = isAdminRole ? [
    { id: 'admin-commission', label: `👑 5% Platform Escrow Commission Revenue` },
    { id: 'admin-vault', label: `🔒 Platform Escrow Vault Reserve (${activeTrades.length})` },
    { id: 'admin-disputes', label: `⚖️ Resolution Center & Grievances` },
    { id: 'trust-score', label: `🛡️ Governance & System Security` }
  ] : isSellerRole ? [
    { id: 'seller-orders', label: `📦 Orders To Fulfill as Seller (${mySellerOrders.length})` },
    { id: 'my-listings', label: `🎨 My Published Listings (${myListings.length})` },
    { id: 'seller-earnings', label: `💰 Seller Escrow Payouts & Earnings` },
    { id: 'trust-score', label: `🛡️ Seller Reputation & Trust` }
  ] : [
    { id: 'my-purchases', label: `🛒 My Active Purchases & Rentals (${myPurchases.length})` },
    { id: 'escrow-deposits', label: `🔒 Escrow Vault Deposits (${myPurchases.filter(t => t.currentStep >= 3 && t.currentStep < 6).length})` },
    { id: 'trust-score', label: `🛡️ Buyer Trust & Verification` }
  ];

  // Calculate platform financial metrics for Super Admin
  const totalPlatformGMV = activeTrades.reduce((acc, t) => {
    const isRent = t.type === 'rent';
    const rentDays = t.rentalDurationDays || 3;
    const subtotal = isRent ? (t.price * rentDays) : t.price;
    return acc + subtotal;
  }, 0);

  const activeEscrowVaultReserve = activeTrades
    .filter(t => t.currentStep >= 3 && t.currentStep < 6)
    .reduce((acc, t) => acc + (t.totalEscrowAmount || t.price * 1.05), 0);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Dashboard Top Banner */}
      <div className="card" style={{
        background: isAdminRole 
          ? 'linear-gradient(135deg, #0B192C 0%, #4C1D95 100%)' 
          : isSellerRole 
            ? 'linear-gradient(135deg, #0B192C 0%, #064E3B 100%)' 
            : 'linear-gradient(135deg, #0B192C 0%, #1E3E62 100%)',
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
            background: isAdminRole ? '#8B5CF6' : isSellerRole ? '#10B981' : '#00ADB5',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '800'
          }}>
            {isAdminRole ? '👑' : currentUser.name.charAt(0)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#FFFFFF', fontWeight: '800' }}>{currentUser.name}</h2>
              <span className="badge badge-verified" style={{ 
                background: isAdminRole ? 'rgba(139, 92, 246, 0.25)' : isSellerRole ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 173, 181, 0.2)', 
                border: `1px solid ${isAdminRole ? '#8B5CF6' : isSellerRole ? '#10B981' : '#00ADB5'}` 
              }}>
                {isAdminRole ? '👑 Platform Master Governance' : isSellerRole ? '🎨 Artisan Seller Workspace' : '🛒 Verified Buyer Portal'}
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#94A3B8' }}>
              {isAdminRole ? (
                <>Platform Escrow Commission Revenue Collected: <strong style={{ color: '#10B981', fontSize: '1.05rem' }}>₹{currentUser.walletBalance.toLocaleString()}</strong></>
              ) : (
                <>Trust Score: <strong style={{ color: '#00ADB5' }}>{currentUser.trustScore}%</strong> • Available Wallet Balance: <strong style={{ color: '#10B981' }}>₹{currentUser.walletBalance.toLocaleString()}</strong></>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {isAdminRole ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.1rem', background: 'rgba(139, 92, 246, 0.25)', border: '1px solid #8B5CF6', borderRadius: '10px', fontSize: '0.85rem', color: '#A78BFA', fontWeight: '700' }}>
              <Percent size={18} /> 5% Escrow Commission Rate Active
            </div>
          ) : isSellerRole ? (
            <button className="btn-primary" onClick={onOpenCreateListing}>
              <PlusCircle size={18} />
              <span>List New Item / Rental</span>
            </button>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.85rem', color: '#00ADB5' }}>
              <Lock size={16} /> All Purchases Backed by 100% Escrow Protection
            </div>
          )}
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
        {availableTabs.map(tab => (
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
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUPER ADMIN TAB 1: 5% Escrow Commission Revenue Ledger */}
      {dashTab === 'admin-commission' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Revenue Breakdown Cards */}
          <div className="grid-3">
            <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 100%)', border: '1px solid #A7F3D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#047857', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                <DollarSign size={16} /> Total 5% Escrow Revenue Collected
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#047857', marginTop: '0.4rem' }}>
                ₹{currentUser.walletBalance.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.3rem' }}>
                Retained platform fees from completed trades
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%)', border: '1px solid #99F6E4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0D9488', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                <Lock size={16} /> Active Escrow Vault Reserve
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0F766E', marginTop: '0.4rem' }}>
                ₹{activeEscrowVaultReserve.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.3rem' }}>
                Funds currently locked awaiting buyer delivery approval
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #F3E8FF 0%, #FFFFFF 100%)', border: '1px solid #DDD6FE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7E22CE', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                <TrendingUp size={16} /> Gross Merchandise Value (GMV)
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#6B21A8', marginTop: '0.4rem' }}>
                ₹{totalPlatformGMV.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.3rem' }}>
                Total trade volume processed on DC Point
              </div>
            </div>
          </div>

          {/* Where Escrow Fees Go Banner */}
          <div className="card" style={{ padding: '1.25rem 1.5rem', background: '#F8FAFC', border: '1px border-color' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0B192C', fontWeight: '800', fontSize: '1rem', marginBottom: '0.3rem' }}>
              <Percent size={18} color="#8B5CF6" /> Where Do the Escrow Fees Go?
            </div>
            <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.5' }}>
              When a buyer places an order, a <strong>5% Platform Escrow Fee</strong> is calculated. 
              Upon successful trade completion, the seller receives their full product/rental payout, the buyer receives any deposit refund, and the 
              <strong> 5% Escrow Fee is retained directly by the Super Admin Account</strong> to fund smart contract compliance checks, AI legal contract generation, and legal dispute guarantees.
            </p>
          </div>

          {/* Detailed Line-Item Escrow Commission Fee Table */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="#00ADB5" /> Line-Item 5% Escrow Commission Fee Ledger
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B' }}>
                    <th style={{ padding: '0.6rem' }}>Trade ID</th>
                    <th style={{ padding: '0.6rem' }}>Title & Type</th>
                    <th style={{ padding: '0.6rem' }}>Buyer ➔ Seller</th>
                    <th style={{ padding: '0.6rem' }}>Gross Value</th>
                    <th style={{ padding: '0.6rem', color: '#8B5CF6' }}>5% Escrow Fee Retained</th>
                    <th style={{ padding: '0.6rem' }}>Fee Accounting Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTrades.map(trade => {
                    const isRent = trade.type === 'rent';
                    const rentDays = trade.rentalDurationDays || 3;
                    const grossPrice = isRent ? (trade.price * rentDays) : trade.price;
                    const fee = tFeeAmount(trade, grossPrice);

                    return (
                      <tr key={trade.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.75rem 0.6rem', fontWeight: '700', color: '#0B192C' }}>{trade.id}</td>
                        <td style={{ padding: '0.75rem 0.6rem' }}>
                          <div style={{ fontWeight: '600' }}>{trade.title}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{isRent ? `Rental (${rentDays} days)` : 'Purchase'}</div>
                        </td>
                        <td style={{ padding: '0.75rem 0.6rem', color: '#475569' }}>
                          {trade.buyerName} ➔ {trade.sellerName}
                        </td>
                        <td style={{ padding: '0.75rem 0.6rem', fontWeight: '700' }}>₹{grossPrice.toFixed(2)}</td>
                        <td style={{ padding: '0.75rem 0.6rem', fontWeight: '800', color: '#8B5CF6' }}>
                          +₹{fee.toFixed(2)}
                        </td>
                        <td style={{ padding: '0.75rem 0.6rem' }}>
                          {trade.currentStep === 6 ? (
                            <span className="badge badge-verified" style={{ background: '#ECFDF5', color: '#047857' }}>
                              <CheckCircle2 size={12} /> Fee Retained in Vault
                            </span>
                          ) : (
                            <span className="badge badge-warning" style={{ background: '#FFFBEB', color: '#B45309' }}>
                              <Clock size={12} /> Held in Escrow
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUPER ADMIN TAB 2: Platform Escrow Vault Reserve & Settlement Ledger */}
      {dashTab === 'admin-vault' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Section A: Active Locked Escrow Reserves */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#00ADB5', fontWeight: '800', fontSize: '1.05rem' }}>
              <Lock size={18} /> Active Locked Escrow Reserves ({activeTrades.filter(t => t.currentStep < 6).length})
            </div>

            {activeTrades.filter(t => t.currentStep < 6).length === 0 ? (
              <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                No funds currently held in active pre-delivery holding reserves.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeTrades.filter(t => t.currentStep < 6).map(trade => (
                  <div key={trade.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderLeft: '4px solid #00ADB5' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span className="badge badge-escrow">Step {trade.currentStep} of 6</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Trade #{trade.id}</span>
                        <span className="badge badge-warning">Held in Active Escrow</span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{trade.title}</h3>
                      <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.3rem' }}>
                        Buyer: <strong>{trade.buyerName}</strong> • Seller: <strong>{trade.sellerName}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>Locked Vault Reserve</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#00ADB5' }}>₹{(trade.totalEscrowAmount || trade.price * 1.05).toFixed(2)}</div>
                      <button className="btn-navy btn-sm" onClick={() => onOpenTradeWizard(trade)} style={{ marginTop: '0.4rem' }}>
                        Read-Only Audit Log
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section B: Completed & Settled Trades */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#10B981', fontWeight: '800', fontSize: '1.05rem' }}>
              <CheckCircle2 size={18} /> Completed & Settled Escrow Payouts ({activeTrades.filter(t => t.currentStep === 6).length})
            </div>

            {activeTrades.filter(t => t.currentStep === 6).length === 0 ? (
              <div className="card" style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                No completed settled trades recorded yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeTrades.filter(t => t.currentStep === 6).map(trade => (
                  <div key={trade.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderLeft: '4px solid #10B981', background: '#F8FAFC' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span className="badge badge-verified" style={{ background: '#ECFDF5', color: '#047857' }}>
                          <CheckCircle2 size={12} /> Step 6 of 6 — Completed & Settled
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Trade #{trade.id}</span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{trade.title}</h3>
                      <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.3rem' }}>
                        Seller Payout Transferred: <strong style={{ color: '#10B981' }}>₹{trade.price.toFixed(2)}</strong> • Platform Fee Retained: <strong style={{ color: '#8B5CF6' }}>₹{(trade.price * 0.05).toFixed(2)}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700', textTransform: 'uppercase' }}>✅ Settlement Completed</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0B192C' }}>₹{(trade.totalEscrowAmount || trade.price * 1.05).toFixed(2)}</div>
                      <button className="btn-outline btn-sm" onClick={() => onOpenTradeWizard(trade)} style={{ marginTop: '0.4rem' }}>
                        View Settlement Audit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUPER ADMIN TAB 3: Resolution Center */}
      {dashTab === 'admin-disputes' && (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <ShieldAlert size={44} style={{ color: '#10B981', marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Platform Governance — Zero Open Unresolved Disputes</h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '500px', margin: '0.4rem auto 0 auto' }}>
            All active buyer-seller trades are currently proceeding smoothly through contract checkpoints.
          </p>
        </div>
      )}

      {/* BUYER TAB 1: My Purchases & Rentals */}
      {dashTab === 'my-purchases' && (
        <div>
          {myPurchases.length === 0 ? (
            <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
              <ShoppingBag size={44} style={{ color: '#CBD5E1', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#475569' }}>No active purchases or rentals</h3>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {myPurchases.map(trade => (
                <div key={trade.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span className="badge badge-escrow">Step {trade.currentStep} of 6</span>
                      <span className="badge badge-verified">{trade.status}</span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{trade.title}</h3>

                    <div style={{ background: '#F8FAFC', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '0.5rem', display: 'inline-flex', gap: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                      <span>🎨 Seller: <strong>{trade.sellerName}</strong></span>
                      <span>|</span>
                      <span>Escrow Locked: <strong style={{ color: '#10B981' }}>₹{(trade.totalEscrowAmount || trade.price).toFixed(2)}</strong></span>
                    </div>

                    {trade.progressUpdates && trade.progressUpdates.length > 0 && (
                      <div style={{ marginTop: '0.75rem', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#047857' }}>
                        <strong>📸 Latest Seller Work Update:</strong> "{trade.progressUpdates[trade.progressUpdates.length - 1].text}"
                      </div>
                    )}
                  </div>

                  <button className="btn-navy" onClick={() => onOpenTradeWizard(trade)}>
                    <span>Open Trade Engine</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BUYER TAB 2: Escrow Vault Deposits */}
      {dashTab === 'escrow-deposits' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem', background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#047857', fontWeight: '800', fontSize: '1.1rem' }}>
              <Lock size={20} /> Buyer Escrow Vault Security Overview
            </div>
            <p style={{ color: '#047857', fontSize: '0.85rem', marginTop: '0.3rem' }}>
              Your deposited funds remain safely locked in the smart escrow vault until you inspect and approve final delivery. Neither the seller nor platform can withdraw funds prematurely.
            </p>
          </div>

          {myPurchases.map(trade => (
            <div key={trade.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontWeight: '700', fontSize: '1.05rem' }}>{trade.title}</h4>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
                  Seller: {trade.sellerName} • Status: <strong style={{ color: '#00ADB5' }}>{trade.status}</strong>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>Locked Vault Amount</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10B981' }}>₹{(trade.totalEscrowAmount || trade.price).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SELLER TAB 1: Seller Orders to Fulfill */}
      {dashTab === 'seller-orders' && (
        <div>
          {mySellerOrders.length === 0 ? (
            <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
              <Upload size={44} style={{ color: '#CBD5E1', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#475569' }}>No buyer orders to fulfill yet</h3>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {mySellerOrders.map(trade => (
                <div key={trade.id} className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #10B981' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span className="badge badge-verified" style={{ background: '#ECFDF5', color: '#047857' }}>
                          Fulfilling for Buyer: {trade.buyerName}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Trade #{trade.id}</span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{trade.title}</h3>

                      <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.4rem' }}>
                        Locked Escrow Payout upon Delivery: <strong style={{ color: '#10B981' }}>₹{(trade.price || 185).toFixed(2)}</strong>
                      </div>
                    </div>

                    <button className="btn-primary" onClick={() => onOpenTradeWizard(trade)}>
                      <Upload size={16} />
                      <span>Post Work Progress & Photos</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SELLER TAB 2: My Published Listings */}
      {dashTab === 'my-listings' && (
        <div>
          {myListings.length === 0 ? (
            <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
              <FileText size={44} style={{ color: '#CBD5E1', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#475569' }}>No listings created by {currentUser.name}</h3>
            </div>
          ) : (
            <div className="grid-3">
              {myListings.map(item => (
                <div key={item.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ height: '160px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem', background: '#F1F5F9' }}>
                    <img src={item.image?.startsWith('/') ? '.' + item.image : item.image} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = item.type === 'rent' ? './cinema_camera.jpg' : './leather_bag.jpg'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span className="badge badge-verified" style={{ marginBottom: '0.4rem' }}>{item.complianceStatus}</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.title}</h4>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0B192C' }}>₹{item.price} <span style={{ fontSize: '0.75rem', color: '#64748B' }}>({item.unit})</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SELLER TAB 3: Seller Earnings */}
      {dashTab === 'seller-earnings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="grid-3">
            <div className="card" style={{ padding: '1.25rem', background: '#F8FAFC' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Available Wallet Balance</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#10B981', marginTop: '0.25rem' }}>₹{currentUser.walletBalance.toLocaleString()}</div>
            </div>

            <div className="card" style={{ padding: '1.25rem', background: '#F8FAFC' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Locked Pending Payouts</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#00ADB5', marginTop: '0.25rem' }}>₹{mySellerOrders.reduce((acc, t) => acc + (t.price || 0), 0).toFixed(2)}</div>
            </div>

            <div className="card" style={{ padding: '1.25rem', background: '#F8FAFC' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Completed Trades</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0B192C', marginTop: '0.25rem' }}>{currentUser.completedTrades || 38}</div>
            </div>
          </div>
        </div>
      )}

      {/* TRUST SCORE TAB (Buyer, Seller & Admin) */}
      {dashTab === 'trust-score' && (
        <div className="grid-2">
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>Reputation & System Verification</h3>
            <div style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                <span>Account Role:</span> <strong style={{ color: '#8B5CF6' }}>{currentUser.role}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                <span>Trust Score:</span> <strong style={{ color: '#00ADB5' }}>{currentUser.trustScore}/100</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                <span>System Security:</span> <span style={{ color: '#10B981', fontWeight: '700' }}>Master Key Authenticated</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper calculation for platform escrow fee
function tFeeAmount(trade, grossPrice) {
  if (trade.escrowFee) return trade.escrowFee;
  return grossPrice * 0.05;
}
