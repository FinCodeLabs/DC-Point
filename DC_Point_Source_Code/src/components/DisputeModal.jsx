import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Scale, 
  FileText, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  ShieldAlert,
  Bot
} from 'lucide-react';

export default function DisputeModal({ trade, onClose, onSubmitDispute }) {
  if (!trade) return null;

  const [disputeReason, setDisputeReason] = useState('Quality Non-Conformance');
  const [description, setDescription] = useState('');
  const [aiMediation, setAiMediation] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle Escape keypress
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleRunAiMediation = () => {
    if (!description.trim()) {
      alert('Please enter your dispute claim description first.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAiMediation({
        recommendation: 'Partial Escrow Refund or Seller Remediation',
        reasoning: 'Based on Clause #3 of the signed agreement ("48-hour unpacking inspection window"), the buyer raised the claim within the contract timeframe. The seller is recommended to ship a replacement or issue a 50% partial escrow refund.',
        suggestedOutcome: 'Option A: Seller dispatches replacement within 3 days; Option B: 50% Escrow refund ($92.50) returned to buyer.'
      });
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dispute-modal-title">
      <div className="modal-content" style={{ maxWidth: '840px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: '#EF4444', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={20} aria-hidden="true" />
            <div>
              <h2 id="dispute-modal-title" style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFFFFF' }}>Resolution Center — Raise Grievance</h2>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>AI-Assisted Contract Mediation Workspace</div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: '#FFFFFF', minWidth: '44px', minHeight: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close grievance dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          <div className="grid-2" style={{ gap: '1.5rem' }}>
            {/* Locked Agreement Reference Panel */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0B192C', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                <FileText size={16} aria-hidden="true" /> Signed Contract Terms Reference
              </div>

              <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>Trade ID:</strong> {trade.id}</div>
                <div><strong>Contract Hash:</strong> <code>{trade.agreementDetails?.legalContractHash || '#DC-HASH-883F'}</code></div>
                <div><strong>Delivery Window:</strong> {trade.agreementDetails?.deliveryTimeframeDays || 5} Days</div>
                <div><strong>Inspection Terms:</strong> {trade.agreementDetails?.qualityInspectionTerms || '48 Hours'}</div>
                <div><strong>Custom Instructions:</strong> {trade.agreementDetails?.customPackagingNotes || 'None'}</div>
              </div>
            </div>

            {/* Claim Submission & AI Mediator */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem' }}>Dispute Claim Details</h3>
              
              <div style={{ marginBottom: '0.85rem' }}>
                <label htmlFor="dispute-category-select" style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem', color: '#1E293B' }}>Grievance Category:</label>
                <select 
                  id="dispute-category-select"
                  value={disputeReason} 
                  onChange={e => setDisputeReason(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.875rem', minHeight: '44px' }}
                >
                  <option value="Quality Non-Conformance">Quality Non-Conformance / Damaged Item</option>
                  <option value="Delivery Delay">Delivery Delay / No Dispatch</option>
                  <option value="Specification Mismatch">Item Specification Mismatch</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="dispute-description-input" style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem', color: '#1E293B' }}>Detailed Explanation & Evidence Notes:</label>
                <textarea 
                  id="dispute-description-input"
                  rows={3} 
                  placeholder="Describe why the product or service does not match signed contract terms..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.875rem' }}
                />
              </div>

              <button 
                className="btn-outline btn-sm" 
                style={{ width: '100%', marginBottom: '1rem', color: '#007A80', borderColor: '#007A80', minHeight: '44px' }}
                onClick={handleRunAiMediation}
                disabled={isAnalyzing}
                aria-label="Run AI Mediation Recommendation"
              >
                <Bot size={16} aria-hidden="true" />
                <span>{isAnalyzing ? 'Analyzing Contract Clauses...' : 'Run AI Mediation Recommendation'}</span>
              </button>

              {aiMediation && (
                <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#1D4ED8', fontWeight: '700', marginBottom: '0.35rem' }}>
                    <Sparkles size={14} aria-hidden="true" /> AI Recommendation Result:
                  </div>
                  <div style={{ color: '#1E40AF', fontWeight: '600', marginBottom: '0.25rem' }}>{aiMediation.recommendation}</div>
                  <p style={{ color: '#1E3E62', lineHeight: '1.4' }}>{aiMediation.reasoning}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose} style={{ minHeight: '44px' }}>Cancel</button>
          <button className="btn-danger" onClick={() => onSubmitDispute({ tradeId: trade.id, disputeReason, description, aiMediation })} style={{ minHeight: '44px' }}>
            Submit Claim to Resolution Board
          </button>
        </div>
      </div>
    </div>
  );
}

