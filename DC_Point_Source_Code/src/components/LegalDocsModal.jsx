import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bot, 
  Scale, 
  ArrowLeft, 
  X, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  Clock, 
  Lock, 
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function LegalDocsModal({ initialTab = 'ai-compliance', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11, 25, 44, 0.85)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.25s ease'
    }}>
      <div style={{
        background: '#0B192C',
        border: '1px solid rgba(0, 173, 181, 0.4)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '1080px',
        height: '85vh',
        maxHeight: '780px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden'
      }}>
        {/* Top Header Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.03)'
        }}>
          <button
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(0, 173, 181, 0.15)',
              border: '1px solid rgba(0, 173, 181, 0.4)',
              color: '#00ADB5',
              padding: '0.45rem 0.85rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Marketplace</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#00ADB5',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.9rem'
            }}>
              DC
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#FFFFFF' }}>Platform & Legal Compliance</div>
              <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '600' }}>DC Point Escrow E-Marketplace</div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#CBD5E1',
              padding: '0.45rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Close Documentation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Content Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Sidebar Tabs */}
          <div style={{
            width: '280px',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.25rem',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              Legal Documentation Index
            </div>

            <button
              onClick={() => setActiveTab('ai-compliance')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '12px',
                background: activeTab === 'ai-compliance' ? 'rgba(0, 173, 181, 0.2)' : 'transparent',
                border: `1px solid ${activeTab === 'ai-compliance' ? '#00ADB5' : 'transparent'}`,
                color: activeTab === 'ai-compliance' ? '#FFFFFF' : '#94A3B8',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'ai-compliance' ? '700' : '500',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Bot size={18} color={activeTab === 'ai-compliance' ? '#00ADB5' : '#64748B'} />
              <span>AI Compliance Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('escrow-protection')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '12px',
                background: activeTab === 'escrow-protection' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                border: `1px solid ${activeTab === 'escrow-protection' ? '#10B981' : 'transparent'}`,
                color: activeTab === 'escrow-protection' ? '#FFFFFF' : '#94A3B8',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'escrow-protection' ? '700' : '500',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ShieldCheck size={18} color={activeTab === 'escrow-protection' ? '#10B981' : '#64748B'} />
              <span>Escrow Protection Terms</span>
            </button>

            <button
              onClick={() => setActiveTab('dispute-resolution')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '12px',
                background: activeTab === 'dispute-resolution' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                border: `1px solid ${activeTab === 'dispute-resolution' ? '#8B5CF6' : 'transparent'}`,
                color: activeTab === 'dispute-resolution' ? '#FFFFFF' : '#94A3B8',
                fontSize: '0.875rem',
                fontWeight: activeTab === 'dispute-resolution' ? '700' : '500',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Scale size={18} color={activeTab === 'dispute-resolution' ? '#A78BFA' : '#64748B'} />
              <span>Dispute Resolution</span>
            </button>

            <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(0, 173, 181, 0.08)', borderRadius: '12px', border: '1px solid rgba(0, 173, 181, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#00ADB5', fontWeight: '700', fontSize: '0.78rem' }}>
                <Lock size={14} /> 256-Bit Encrypted Vault
              </div>
              <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '0.25rem', lineHeight: '1.3' }}>
                All agreements and digital signatures are timestamped & immutably stored.
              </div>
            </div>
          </div>

          {/* Right Scrollable Content View */}
          <div style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto' }}>
            
            {/* TAB 1: AI COMPLIANCE RULES */}
            {activeTab === 'ai-compliance' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', background: 'rgba(0, 173, 181, 0.15)', border: '1px solid rgba(0, 173, 181, 0.4)', color: '#00ADB5', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                  <Sparkles size={13} /> DC Point Smart Legal Engine
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  AI Contract Compliance Rules & Standards
                </h1>
                <p style={{ fontSize: '0.925rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  DC Point utilizes an advanced AI Contract Generator (built on Claude/Gemini model architectures) to automatically draft binding, enforceable escrow purchase and rental agreements between independent parties.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontWeight: '700', color: '#00ADB5', fontSize: '0.9rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={16} /> Automated Legal Checks
                    </div>
                    <p style={{ fontSize: '0.825rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                      Every contract generated undergoes automated checks verifying item condition descriptions, delivery deadlines, milestone amounts, and liability limits.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.1rem' }}>
                    <div style={{ fontWeight: '700', color: '#10B981', fontSize: '0.9rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Lock size={16} /> Binding Digital Signatures
                    </div>
                    <p style={{ fontSize: '0.825rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                      Once both Buyer and Seller click "Confirm Agreement", a cryptographic hash is recorded creating a legally binding contract enforceable in court.
                    </p>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  1. AI Contract Generation Workflow
                </h3>
                <ul style={{ color: '#CBD5E1', fontSize: '0.875rem', lineHeight: '1.7', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                  <li><strong>Data Ingestion:</strong> Listing titles, specified purchase/rental rates, condition tiers, and custom buyer/seller notes are processed in real-time.</li>
                  <li><strong>Standardized Escrow Clauses:</strong> Automatically includes mandatory clauses regarding 24-hour inspection windows, loss protection deposits, and dispute arbitration.</li>
                  <li><strong>Prohibited Terms Filtering:</strong> Prevents inclusion of illegal, off-platform payment requests or non-standard waiver clauses.</li>
                </ul>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  2. User Responsibilities
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Users must carefully review all generated contract terms prior to digital sign-off. Misrepresenting item specifications, providing false condition tags, or attempting to bypass platform escrow triggers constitutes a breach of terms.
                </p>

                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#FCA5A5', fontSize: '0.825rem', lineHeight: '1.5' }}>
                  <strong>Compliance Warning:</strong> Attempting to negotiate off-platform cash transactions or submitting fraudulent contract modifications will result in immediate escrow account suspension and forfeiture of trust verification badges.
                </div>
              </div>
            )}

            {/* TAB 2: ESCROW PROTECTION TERMS */}
            {activeTab === 'escrow-protection' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10B981', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                  <ShieldCheck size={13} /> 100% Vault Guarantee
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Escrow Vault Protection Terms & Policy
                </h1>
                <p style={{ fontSize: '0.925rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  DC Point provides bank-grade 100% Escrow Protection for every transaction. Buyer funds are securely held in a regulated vault account and released to the Seller ONLY after verified delivery and inspection sign-off.
                </p>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.75rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#10B981', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Lock size={16} /> How Your Money Is Protected
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ background: 'rgba(11, 25, 44, 0.6)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.8rem', color: '#CBD5E1' }}>
                      <strong style={{ color: '#FFF', display: 'block', marginBottom: '0.2rem' }}>1. Lock Funds</strong>
                      Buyer authorizes payment; funds are locked in Escrow Vault.
                    </div>
                    <div style={{ background: 'rgba(11, 25, 44, 0.6)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.8rem', color: '#CBD5E1' }}>
                      <strong style={{ color: '#FFF', display: 'block', marginBottom: '0.2rem' }}>2. Inspect Item</strong>
                      Seller fulfills order; Buyer enjoys a 24-hour verification window.
                    </div>
                    <div style={{ background: 'rgba(11, 25, 44, 0.6)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.8rem', color: '#CBD5E1' }}>
                      <strong style={{ color: '#FFF', display: 'block', marginBottom: '0.2rem' }}>3. Payout Release</strong>
                      Buyer approves or system auto-releases after 24 hrs clean inspection.
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  1. Buyer Protection Guarantees
                </h3>
                <ul style={{ color: '#CBD5E1', fontSize: '0.875rem', lineHeight: '1.7', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                  <li><strong>Full Money-Back Guarantee:</strong> If the item is damaged, defective, or materially fails to match listing specifications, funds remain locked until rectified.</li>
                  <li><strong>Mandatory Inspection Window:</strong> Buyers have a guaranteed 24-hour window from delivery to inspect equipment or craft goods.</li>
                  <li><strong>Rental Security Deposits:</strong> Rental deposit holds are automatically refunded within 12 hours of rental return verification.</li>
                </ul>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  2. Seller Payout Guarantees
                </h3>
                <ul style={{ color: '#CBD5E1', fontSize: '0.875rem', lineHeight: '1.7', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                  <li><strong>Guaranteed Available Capital:</strong> Sellers are assured Buyer funds are fully deposited before shipping or dispatching rental gear.</li>
                  <li><strong>Automated Release:</strong> If a Buyer fails to report an issue within the 24-hour window, funds automatically transition to available payout.</li>
                  <li><strong>0% Fee for Pro Tier:</strong> Pro host accounts enjoy zero platform fee deductions on escrow disbursements.</li>
                </ul>
              </div>
            )}

            {/* TAB 3: DISPUTE RESOLUTION GUIDELINES */}
            {activeTab === 'dispute-resolution' && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#A78BFA', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                  <Scale size={13} /> Official Arbitration Policy
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Dispute Resolution Guidelines & Arbitration Workflow
                </h1>
                <p style={{ fontSize: '0.925rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  In the rare event of a disagreement regarding item condition, rental damage, or non-delivery, DC Point provides an impartial Resolution Center managed by unbiased Platform Arbitrators.
                </p>

                <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.75rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#A78BFA', marginBottom: '0.75rem' }}>
                    Step-by-Step Dispute Process
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ background: '#8B5CF6', color: '#FFF', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0 }}>1</div>
                      <div style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
                        <strong style={{ color: '#FFF' }}>File Dispute Claim:</strong> Click "Initiate Dispute" in your Trade Dashboard within the 24-hour window. State reason (e.g. Damage in Transit, Non-Fulfillment).
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ background: '#8B5CF6', color: '#FFF', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0 }}>2</div>
                      <div style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
                        <strong style={{ color: '#FFF' }}>Evidence Submission:</strong> Upload photo/video evidence, unboxing video logs, courier tracking receipts, or chat transcripts within 24 hours.
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ background: '#8B5CF6', color: '#FFF', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.75rem', flexShrink: 0 }}>3</div>
                      <div style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
                        <strong style={{ color: '#FFF' }}>Arbitration Ruling:</strong> Platform Arbitration Board reviews evidence and issues a binding decision within 48-72 hours (Full Refund, Partial Refund, or Release to Seller).
                      </div>
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Required Evidence Criteria
                </h3>
                <ul style={{ color: '#CBD5E1', fontSize: '0.875rem', lineHeight: '1.7', paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
                  <li><strong>For Damage Claims:</strong> High-resolution photos of shipping box exterior, packaging materials, serial number tags, and close-ups of damage.</li>
                  <li><strong>For Rental Return Claims:</strong> Timestamped return condition photos compared against original pre-dispatch logs.</li>
                  <li><strong>For Non-Delivery Claims:</strong> Official carrier tracking status updates and delivery signature records.</li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
