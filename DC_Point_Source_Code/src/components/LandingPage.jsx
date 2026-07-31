import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  UserCheck, 
  HelpCircle, 
  ChevronDown, 
  Star, 
  Zap, 
  Sparkles,
  ShoppingBag,
  PlusCircle
} from 'lucide-react';
import { TRUST_METRICS, PLATFORM_FAQS } from '../data/mockData';

export default function LandingPage({ onExploreMarket, onStartSelling, onOpenLegalDoc }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #0B192C 0%, #1E3E62 100%)',
        color: '#FFFFFF',
        padding: '5rem 0 6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow overlay */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,173,181,0.2) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(0, 173, 181, 0.15)',
              border: '1px solid rgba(0, 173, 181, 0.3)',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              color: '#00ADB5',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              <ShieldCheck size={16} />
              Secured Escrow & Legal Agreement Engine
            </div>

            <h1 style={{
              fontSize: 'clamp(1.85rem, 5vw, 3.25rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              color: '#FFFFFF',
              marginBottom: '1.5rem'
            }}>
              Trade with Confidence — <br className="desktop-only-br" />
              <span style={{
                background: 'linear-gradient(90deg, #00ADB5 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Even Without a Registered Business
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#94A3B8',
              lineHeight: '1.7',
              marginBottom: '2.5rem',
              maxWidth: '720px',
              margin: '0 auto 2.5rem auto'
            }}>
              DC Point connects small-scale sellers, individual artisans, and rental owners with buyers by turning informal sales into legally protected trade agreements backed by milestone escrow payments.
            </p>

            {/* CTAs Stacked Vertically on Mobile */}
            <div className="hero-cta-group" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button 
                className="btn-primary hero-btn" 
                style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
                onClick={() => onExploreMarket('purchase')}
              >
                <ShoppingBag size={20} />
                Start Buying Securely
              </button>

              <button 
                className="btn-outline hero-btn" 
                style={{
                  padding: '0.9rem 2rem', 
                  fontSize: '1.05rem',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
                onClick={onStartSelling}
              >
                <PlusCircle size={20} />
                Start Selling / Renting
              </button>
            </div>

            {/* Trust Metrics Pill Row */}
            <div className="grid-4" style={{ marginTop: '4rem', textAlign: 'left' }}>
              {TRUST_METRICS.map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#00ADB5' }}>
                    {item.metric}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ padding: '5rem 0', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-escrow" style={{ marginBottom: '0.75rem' }}>
              PROTECTION WORKFLOW
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700' }}>
              How DC Point Protects Every Transaction
            </h2>
            <p style={{ color: '#64748B', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              A 4-step milestone pipeline that guarantees payment for sellers and quality for buyers.
            </p>
          </div>

          <div className="grid-4">
            <div className="card" style={{ padding: '1.75rem', textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#E0F2FE',
                color: '#0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Zap size={28} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#00ADB5', letterSpacing: '0.05em' }}>
                STEP 1
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0' }}>List & AI Pre-Screen</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                Sellers submit listings. Automated AI compliance screens for legal terms, IP safety, and clear pricing before going live.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <FileText size={28} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#10B981', letterSpacing: '0.05em' }}>
                STEP 2
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0' }}>Build Legal Agreement</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                Buyer & seller collaborate on a binding trade contract (delivery date, inspection rules, packaging notes) and sign digitally.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Lock size={28} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#F59E0B', letterSpacing: '0.05em' }}>
                STEP 3
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0' }}>Escrow Payment Vault</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                Buyer pays upfront. Funds are locked securely by DC Point until delivery and inspection are explicitly approved.
              </p>
            </div>

            <div className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#F3E8FF',
                color: '#9333EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Truck size={28} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#9333EA', letterSpacing: '0.05em' }}>
                STEP 4
              </div>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0' }}>Inspect & Release</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                Seller uploads progress/dispatch video proof. Buyer verifies quality on delivery, releasing escrow funds instantly to the seller.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Highlights */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge badge-verified" style={{ marginBottom: '0.75rem' }}>
                WHY DC POINT WORKS
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '1.25rem' }}>
                The Trust Layer Missing in Small-Scale E-Commerce
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                Unregistered small sellers suffer because customers fear losing money on unfulfilled orders or poor quality. DC Point removes the risk for both parties.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: '#ECFDF5', color: '#10B981', padding: '0.6rem', borderRadius: '10px', height: 'fit-content' }}>
                    <Scale size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Binding Digital Trade Agreements</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                      Clear contract terms stamped with cryptographic contract hashes so expectations are 100% transparent.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: '#E0F2FE', color: '#0284C7', padding: '0.6rem', borderRadius: '10px', height: 'fit-content' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>AI Pre-Screening & Compliance</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                      Every product or rental listing undergoes automated legal checks before appearing in the marketplace.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: '#FEF3C7', color: '#D97706', padding: '0.6rem', borderRadius: '10px', height: 'fit-content' }}>
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Resolution Center & Mediation</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                      Disputes are resolved directly against agreed contract terms with AI-assisted evidence evaluation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Card Stack */}
            <div style={{
              background: '#0B192C',
              color: '#FFFFFF',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(11, 25, 44, 0.25)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span className="badge badge-verified">
                  <CheckCircle2 size={14} /> Contract Verified
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>HASH: #DC-AGREE-8891</span>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#00ADB5', textTransform: 'uppercase', fontWeight: '700' }}>
                  Escrow Vault Status
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.2rem', color: '#10B981' }}>
                  $194.25 LOCKED SECURELY
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                  Funds held safely by DC Point until buyer approves final delivery
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#CBD5E1', lineHeight: '1.6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span>Seller:</span> <strong style={{ color: '#FFFFFF' }}>Maya Lin (Unregistered Artisan)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span>Buyer:</span> <strong style={{ color: '#FFFFFF' }}>Alex Mercer</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Inspection Window:</span> <strong style={{ color: '#F59E0B' }}>48 Hours Post-Delivery</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '5rem 0', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '700' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#64748B', marginTop: '0.5rem' }}>
              Everything you need to know about trading legally and safely on DC Point.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PLATFORM_FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="card" 
                style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#0B192C' }}>
                    {faq.q}
                  </h4>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: openFaqIndex === idx ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s'
                    }} 
                  />
                </div>
                {openFaqIndex === idx && (
                  <p style={{ color: '#64748B', marginTop: '0.85rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0B192C', color: '#94A3B8', padding: '4rem 0 2rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div className="grid-4" style={{ marginBottom: '3rem' }}>
            <div>
              <div className="logo-area" style={{ marginBottom: '1rem' }}>
                <div className="logo-icon">DC</div>
                <span>DC Point</span>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                The legal escrow e-marketplace for small businesses, independent craftspeople, and equipment rental hosts.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1rem' }}>Marketplaces</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <li><a onClick={() => onExploreMarket('purchase')} style={{ cursor: 'pointer' }}>Purchase Market</a></li>
                <li><a onClick={() => onExploreMarket('rent')} style={{ cursor: 'pointer' }}>Rent Market</a></li>
                <li><a onClick={onStartSelling} style={{ cursor: 'pointer' }}>List an Item</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1rem' }}>Platform & Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <li><a onClick={() => onOpenLegalDoc && onOpenLegalDoc('ai-compliance')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>AI Compliance Rules</a></li>
                <li><a onClick={() => onOpenLegalDoc && onOpenLegalDoc('escrow-protection')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Escrow Protection Terms</a></li>
                <li><a onClick={() => onOpenLegalDoc && onOpenLegalDoc('dispute-resolution')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Dispute Resolution Guidelines</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1rem' }}>Security & Support</h4>
              <div style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                <p>24/7 Escrow Vault Operations</p>
                <p style={{ color: '#00ADB5', fontWeight: '600', marginTop: '0.5rem' }}>support@dcpoint.marketplace</p>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>© 2026 DC Point Escrow E-Marketplace. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>Privacy Policy</span>
              <span>Terms of Trade</span>
              <span>Compliance Standards</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
