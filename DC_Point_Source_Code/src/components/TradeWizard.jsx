import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  Lock, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertTriangle, 
  Send, 
  PenTool, 
  Check, 
  Upload, 
  Star, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TradeWizard({ trade, currentUser, onUpdateTrade, onOpenDispute, onClose, onAddNotification, onUpdateWalletBalance, showToast }) {
  if (!trade) return null;

  const [activeStep, setActiveStep] = useState(trade.currentStep || 1);

  // Check if current logged-in user is Super Admin
  const isSuperAdmin = currentUser.id === 'user_admin_1' || currentUser.role?.toLowerCase().includes('admin');

  // Calculate exact financials based on item type
  const isRental = trade.type === 'rent';
  const rentalDays = trade.rentalDurationDays || 3;
  const basePrice = trade.price || 0;
  const rentalSubtotal = isRental ? basePrice * rentalDays : basePrice;
  const securityDeposit = isRental ? (trade.rentalDeposit || 300) : 0;
  const escrowFee = rentalSubtotal * 0.05;
  const totalEscrowRequired = rentalSubtotal + securityDeposit + escrowFee;

  // Dynamically initialize chat messages based on product details
  const [chatMessages, setChatMessages] = useState(() => {
    if (trade.initialChatMessages && trade.initialChatMessages.length > 0) {
      return trade.initialChatMessages;
    }
    const defaultMsg = trade.agreementDetails?.customPackagingNotes || 
      `Can you send a progress photo and confirm quality standards for "${trade.title}" before shipping?`;
    return [
      { sender: trade.sellerName, text: `Hello ${trade.buyerName}! Thanks for initiating trade interest for "${trade.title}". Let's confirm contract terms.`, time: '10:00 AM' },
      { sender: trade.buyerName, text: `Hi! ${defaultMsg}`, time: '10:02 AM' }
    ];
  });

  const [inputMsg, setInputMsg] = useState('');

  // Seller update input
  const [newUpdateText, setNewUpdateText] = useState('');

  // Agreement Form State
  const [agreementForm, setAgreementForm] = useState({
    deliveryTimeframeDays: trade.agreementDetails?.deliveryTimeframeDays || 5,
    paymentTerms: trade.agreementDetails?.paymentTerms || (isRental ? `Daily Rate (${rentalDays} Days) + Refundable Deposit` : '100% Escrow Vault Lock'),
    qualityInspectionTerms: trade.agreementDetails?.qualityInspectionTerms || '48-hour unpacking inspection window',
    agreementDurationDays: trade.agreementDetails?.agreementDurationDays || 14,
    customPackagingNotes: trade.agreementDetails?.customPackagingNotes || 'Reinforced protective packaging required.',
    signedByBuyer: trade.agreementDetails?.signedByBuyer || false,
    signedBySeller: trade.agreementDetails?.signedBySeller || false
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(trade.timer?.expiresInSeconds || 14200);

  useEffect(() => {
    if (activeStep === 4 && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [activeStep, timeLeft]);

  // Delivery Checklist State
  const [checklist, setChecklist] = useState({
    productionProof: trade.deliveryChecklist?.productionProof || false,
    packagingProof: trade.deliveryChecklist?.packagingProof || false,
    trackingNumber: trade.deliveryChecklist?.trackingNumber || 'TRK-DC-9928174',
    unpackingCheck: trade.deliveryChecklist?.unpackingCheck || false
  });

  const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs}h ${mins}m ${s}s`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { sender: currentUser.name, text: inputMsg, time: 'Just now' }]);
    setInputMsg('');
    if (showToast) showToast('Message sent to counterparty!');
  };

  const handleAddProgressUpdate = (e) => {
    e.preventDefault();
    if (!newUpdateText.trim()) return;
    const newUpdate = {
      id: `up-${Date.now()}`,
      sender: `${currentUser.name} (${currentUser.id === trade.sellerId ? 'Seller' : 'Buyer'})`,
      timestamp: 'Just now',
      text: newUpdateText,
      image: trade.image || (trade.type === 'rent' ? '/cinema_camera.jpg' : '/pcb_board.jpg')
    };

    const updatedUpdates = [...(trade.progressUpdates || []), newUpdate];
    onUpdateTrade({
      ...trade,
      progressUpdates: updatedUpdates
    });

    // DISPATCH BUYER NOTIFICATION IF SELLER POSTS UPDATE
    if (onAddNotification && currentUser.id === trade.sellerId) {
      onAddNotification({
        id: `notif-${Date.now()}`,
        recipientId: trade.buyerId,
        tradeId: trade.id,
        title: '🎨 Seller Work Update Posted',
        message: `${currentUser.name} posted progress proof on "${trade.title}": "${newUpdateText}"`,
        timestamp: 'Just now',
        isRead: false,
        type: 'progress_update',
        senderName: currentUser.name
      });
    }

    setNewUpdateText('');
    if (showToast) showToast('Progress update & photo proof posted! Notification sent to Buyer.');
  };

  const handleSignAgreement = (role) => {
    const updatedForm = { ...agreementForm };
    if (role === 'buyer') updatedForm.signedByBuyer = true;
    if (role === 'seller') updatedForm.signedBySeller = true;

    setAgreementForm(updatedForm);
    if (showToast) showToast(`Digital agreement accepted & signed as ${role === 'buyer' ? 'Buyer' : 'Seller'}!`);

    if (updatedForm.signedByBuyer && updatedForm.signedBySeller) {
      setTimeout(() => {
        setActiveStep(3);
        onUpdateTrade({
          ...trade,
          currentStep: 3,
          status: 'Escrow Payment Required',
          agreementDetails: { ...trade.agreementDetails, ...updatedForm }
        });
        if (showToast) showToast('Both parties signed! Moving to Escrow Payment Vault.');
      }, 800);
    }
  };

  const handleDepositEscrow = () => {
    const requiredAmount = totalEscrowRequired || trade.totalEscrowAmount || (trade.price * 1.05);

    // Deduct total escrow deposit from Buyer's wallet
    if (onUpdateWalletBalance && !trade.isEscrowPaid) {
      onUpdateWalletBalance(trade.buyerId, -requiredAmount, `Escrow Deposit Lock for ${trade.title}`);
    }

    setActiveStep(4);
    onUpdateTrade({
      ...trade,
      currentStep: 4,
      isEscrowPaid: true,
      status: 'Escrow Locked — In Production & Progress Tracking',
      timer: { expiresInSeconds: 86400, warningText: 'Buyer must respond to progress update within 24h' }
    });
    if (showToast) showToast(`🎉 ₹${requiredAmount.toFixed(2)} deducted & locked in DC Point Escrow Vault!`);
  };

  const handleApproveProgress = () => {
    setActiveStep(5);
    onUpdateTrade({
      ...trade,
      currentStep: 5,
      status: 'Checkpoint Approved — Ready for Delivery Packaging'
    });
    if (showToast) showToast('Sample & progress approved by Buyer! Ready for packaging.');
  };

  const handleCompleteDeliveryChecklist = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

    // Transfer payout to Seller, refund deposit to Buyer if rental, and credit 5% Escrow Fee to Super Admin
    if (onUpdateWalletBalance && !trade.isPaymentReleased) {
      if (isRental) {
        onUpdateWalletBalance(trade.sellerId, rentalSubtotal, `Rental Earnings Payout for ${trade.title}`);
        if (securityDeposit > 0) {
          onUpdateWalletBalance(trade.buyerId, securityDeposit, `Refundable Security Deposit Returned for ${trade.title}`);
        }
      } else {
        onUpdateWalletBalance(trade.sellerId, basePrice, `Escrow Payout Received for ${trade.title}`);
      }

      // Platform Retains 5% Escrow Commission Fee
      onUpdateWalletBalance('user_admin_1', escrowFee, `5% Platform Escrow Commission Retained from ${trade.title}`);
    }

    setActiveStep(6);
    onUpdateTrade({
      ...trade,
      currentStep: 6,
      isPaymentReleased: true,
      status: 'Trade Completed & Escrow Released'
    });
    if (showToast) showToast(`🎉 Escrow Released! ₹${(isRental ? rentalSubtotal : basePrice).toFixed(2)} credited to ${trade.sellerName}'s wallet.`);
  };

  const stepsList = [
    { num: 1, label: 'Chat & Terms' },
    { num: 2, label: 'Agreement Builder' },
    { num: 3, label: 'Escrow Deposit' },
    { num: 4, label: 'Progress & Timer' },
    { num: 5, label: 'Pre-Delivery Check' },
    { num: 6, label: 'Delivery & Release' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '960px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#0B192C', color: '#FFFFFF' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="badge badge-verified"><ShieldCheck size={12} /> Binding Legal Escrow Trade</span>
              <span style={{ fontSize: '0.75rem', color: '#00ADB5' }}>ID: {trade.id}</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: '800' }}>{trade.title}</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              className="btn-danger btn-sm"
              style={{ padding: '0.45rem 0.95rem', gap: '0.55rem', display: 'inline-flex', alignItems: 'center' }}
              onClick={() => onOpenDispute(trade)}
            >
              <AlertTriangle size={15} />
              <span>Raise Grievance / Dispute</span>
            </button>
            <button 
              onClick={onClose} 
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
              title="Close"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div style={{ background: '#F8FAFC', padding: '0.85rem 1.5rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'auto', gap: '0.5rem' }}>
            {stepsList.map(step => (
              <button
                key={step.num}
                onClick={() => {
                  setActiveStep(step.num);
                  if (showToast) showToast(`Switched to Step ${step.num}`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  border: 'none',
                  background: activeStep === step.num ? '#0B192C' : activeStep > step.num ? '#ECFDF5' : '#E2E8F0',
                  color: activeStep === step.num ? '#FFFFFF' : activeStep > step.num ? '#10B981' : '#64748B',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {activeStep > step.num ? (
                  <CheckCircle2 size={15} color="#10B981" />
                ) : (
                  <span style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: activeStep === step.num ? '#00ADB5' : '#CBD5E1',
                    color: activeStep === step.num ? '#FFFFFF' : '#475569',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: '800'
                  }}>
                    {step.num}
                  </span>
                )}
                <span>{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body View based on active step */}
        <div className="modal-body">
          {/* STEP 1: Chat & Negotiation */}
          {activeStep === 1 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Step 1 — Buyer & Seller Terms Discussion</h4>
                <button className="btn-primary btn-sm" onClick={() => setActiveStep(2)}>
                  <span>Proceed to Agreement Builder</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', height: '360px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#64748B' }}>
                  Chatting with <strong>{trade.sellerName}</strong> • Escrow Protected Workspace
                </div>

                <div style={{ flex: '1', padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        alignSelf: msg.sender === currentUser.name ? 'flex-end' : 'flex-start',
                        maxWidth: '75%'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.2rem' }}>
                        {msg.sender} • {msg.time}
                      </div>
                      <div style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        background: msg.sender === currentUser.name ? '#0B192C' : '#F1F5F9',
                        color: msg.sender === currentUser.name ? '#FFFFFF' : '#0F172A'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} style={{ padding: '0.75rem', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Ask questions or agree on custom terms..."
                    value={inputMsg}
                    onChange={e => setInputMsg(e.target.value)}
                    style={{ flex: '1', padding: '0.6rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                  />
                  <button type="submit" className="btn-navy btn-sm">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* STEP 2: Legal Agreement Builder */}
          {activeStep === 2 && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Step 2 — Legal Trade Agreement Builder</h4>
                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                  Both buyer and seller review contract parameters and execute binding digital signatures.
                </p>
              </div>

              <div className="grid-2" style={{ gap: '1.5rem' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', color: '#0B192C' }}>
                    Contract Clauses & Standards
                  </h5>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
                    <div>
                      <label style={{ fontWeight: '600', color: '#475569' }}>Fulfillment & Delivery Timeframe:</label>
                      <input 
                        type="number" 
                        value={agreementForm.deliveryTimeframeDays}
                        onChange={e => setAgreementForm({ ...agreementForm, deliveryTimeframeDays: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem 0.6rem', marginTop: '0.2rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontWeight: '600', color: '#475569' }}>Quality & Inspection Terms:</label>
                      <input 
                        type="text" 
                        value={agreementForm.qualityInspectionTerms}
                        onChange={e => setAgreementForm({ ...agreementForm, qualityInspectionTerms: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem 0.6rem', marginTop: '0.2rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontWeight: '600', color: '#475569' }}>Custom Instructions / Packaging Notes:</label>
                      <textarea 
                        rows={2}
                        value={agreementForm.customPackagingNotes}
                        onChange={e => setAgreementForm({ ...agreementForm, customPackagingNotes: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem 0.6rem', marginTop: '0.2rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Signature Panel */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0B192C' }}>
                      Digital Signature Verification
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1.25rem' }}>
                      Executing signature locks contract parameters into DC Point Escrow Registry.
                    </p>

                    {/* Buyer Signature Status */}
                    <div style={{ padding: '0.75rem', borderRadius: '8px', background: agreementForm.signedByBuyer ? '#ECFDF5' : '#FFFBEB', marginBottom: '0.75rem', border: '1px solid #CBD5E1' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: agreementForm.signedByBuyer ? '#10B981' : '#D97706' }}>
                        Buyer Signature: {trade.buyerName}
                      </div>
                      {agreementForm.signedByBuyer ? (
                        <div style={{ fontSize: '0.75rem', color: '#047857' }}>✓ Digitally Signed & Timestamped</div>
                      ) : (
                        <button className="btn-navy btn-sm" style={{ marginTop: '0.5rem', width: '100%' }} onClick={() => handleSignAgreement('buyer')}>
                          <PenTool size={14} /> Accept & Sign as Buyer
                        </button>
                      )}
                    </div>

                    {/* Seller Signature Status */}
                    <div style={{ padding: '0.75rem', borderRadius: '8px', background: agreementForm.signedBySeller ? '#ECFDF5' : '#FFFBEB', border: '1px solid #CBD5E1' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: agreementForm.signedBySeller ? '#10B981' : '#D97706' }}>
                        Seller Signature: {trade.sellerName}
                      </div>
                      {agreementForm.signedBySeller ? (
                        <div style={{ fontSize: '0.75rem', color: '#047857' }}>✓ Digitally Signed & Timestamped</div>
                      ) : (
                        <button className="btn-navy btn-sm" style={{ marginTop: '0.5rem', width: '100%' }} onClick={() => handleSignAgreement('seller')}>
                          <PenTool size={14} /> Accept & Sign as Seller
                        </button>
                      )}
                    </div>
                  </div>

                  {agreementForm.signedByBuyer && agreementForm.signedBySeller && (
                    <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setActiveStep(3)}>
                      <span>Proceed to Escrow Deposit</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Escrow Payment Vault */}
          {activeStep === 3 && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <Lock size={32} />
              </div>

              <h4 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Escrow Payment Vault Initiation</h4>
              <p style={{ color: '#64748B', maxWidth: '520px', margin: '0.4rem auto 1.5rem auto', fontSize: '0.9rem' }}>
                Funds are held securely by DC Point until you inspect and approve final delivery. Neither party can tamper with funds.
              </p>

              <div style={{ maxWidth: '480px', margin: '0 auto 1.5rem auto', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px', textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#00ADB5', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Escrow Vault Breakdown ({isRental ? 'Rental Vault' : 'Purchase Vault'})
                </div>

                {isRental ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                      <span>Daily Rental Rate (₹{basePrice} × {rentalDays} days):</span> <strong>₹{rentalSubtotal.toFixed(2)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                      <span>Refundable Security Deposit Hold:</span> <strong>₹{securityDeposit.toFixed(2)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#64748B' }}>
                      <span>Platform Escrow Fee (5% of rental):</span> <strong>₹{escrowFee.toFixed(2)}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                      <span>Listing Purchase Price:</span> <strong>₹{basePrice.toFixed(2)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#64748B' }}>
                      <span>Platform Escrow Fee (5%):</span> <strong>₹{escrowFee.toFixed(2)}</strong>
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', marginTop: '0.5rem', borderTop: '2px dashed #CBD5E1', fontSize: '1.1rem', fontWeight: '800', color: '#0B192C' }}>
                  <span>Total Escrow Deposit Vault:</span> <span style={{ color: '#10B981' }}>₹{totalEscrowRequired.toFixed(2)}</span>
                </div>
              </div>

              {isSuperAdmin ? (
                <div style={{ background: '#F3E8FF', border: '1px solid #C084FC', padding: '0.85rem 1.5rem', borderRadius: '10px', color: '#6B21A8', fontSize: '0.85rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="#8B5CF6" />
                  <span>Super Admin Read-Only Mode: Escrow deposit is strictly authorized by Buyer ({trade.buyerName}).</span>
                </div>
              ) : (
                <button className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem' }} onClick={handleDepositEscrow}>
                  <Lock size={18} />
                  <span>Confirm & Lock ₹{totalEscrowRequired.toFixed(2)} in Escrow</span>
                </button>
              )}
            </div>
          )}

          {/* STEP 4: Progress Updates & Live Timer */}
          {activeStep === 4 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Step 4 — Seller Progress Updates & Inspection Window</h4>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Seller uploads proof of work; buyer inspects before packaging.</div>
                </div>

                {/* Visible Countdown Timer */}
                <div className="pulse-alert" style={{
                  background: '#FFFBEB',
                  border: '1px solid #F59E0B',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#D97706',
                  fontWeight: '700'
                }}>
                  <Clock size={18} />
                  <span>Buyer Response Timer: {formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="grid-2">
                {/* Progress updates feed */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', color: '#0B192C' }}>
                    Fulfillment Progress Log
                  </h5>

                  {trade.progressUpdates && trade.progressUpdates.length > 0 ? (
                    trade.progressUpdates.map((up, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '0.85rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#00ADB5', fontWeight: '700' }}>{up.sender} • {up.timestamp}</div>
                        <p style={{ fontSize: '0.875rem', marginTop: '0.35rem', color: '#334155' }}>{up.text}</p>
                        {up.image && (
                          <div style={{ marginTop: '0.75rem', borderRadius: '6px', overflow: 'hidden', height: '140px' }}>
                            <img src={up.image} alt="Progress proof" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1rem' }}>Seller is currently processing your item...</div>
                  )}

                  {/* Add progress update form for seller */}
                  {!isSuperAdmin && (
                    <form onSubmit={handleAddProgressUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #CBD5E1' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0B192C' }}>
                        {currentUser.id === trade.sellerId ? '🎨 Post Work-In-Progress Update (Seller):' : '💬 Post Work Feedback / Question:'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={currentUser.id === trade.sellerId ? `e.g. Completed initial testing and quality check for ${trade.title}...` : 'e.g. Please confirm initials embossing looks good...'}
                        value={newUpdateText}
                        onChange={e => setNewUpdateText(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                      <button type="submit" className="btn-navy btn-sm" style={{ alignSelf: 'flex-end' }}>
                        <Upload size={14} /> Upload Progress Proof
                      </button>
                    </form>
                  )}
                </div>

                {/* Checkpoint approval action */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                      Step 5 Checkpoint Approval
                    </h5>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                      As the buyer, confirm that the progress sample matches your custom agreement notes before moving to shipping.
                    </p>
                  </div>

                  {isSuperAdmin ? (
                    <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '0.75rem', borderRadius: '8px', fontSize: '0.78rem', color: '#8B5CF6', fontWeight: '700', textAlign: 'center' }}>
                      👑 Read-Only Mode: Checkpoint approval is strictly managed by Buyer ({trade.buyerName}).
                    </div>
                  ) : (
                    <button className="btn-primary" style={{ width: '100%', padding: '0.85rem' }} onClick={handleApproveProgress}>
                      <CheckCircle2 size={18} />
                      <span>Approve Sample & Proceed to Delivery</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Checkpoint & Pre-Delivery */}
          {activeStep === 5 && (
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>Step 5 — Pre-Delivery Checkpoint Approved</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Seller is preparing final sealed packaging and tracking documentation.
              </p>

              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 0.5rem auto' }} />
                <h5 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#047857' }}>Sample Approved by Buyer</h5>
                <p style={{ fontSize: '0.85rem', color: '#065F46', marginTop: '0.2rem' }}>
                  Item is now moving to the Delivery Verification Layer.
                </p>
              </div>

              <button className="btn-primary" style={{ width: '100%', padding: '0.85rem' }} onClick={() => setActiveStep(6)}>
                <span>Go to Delivery & Escrow Release Layer</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 6: Delivery Layer & Escrow Release */}
          {activeStep === 6 && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Step 6 — Delivery Verification & Escrow Release</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Verify packaging, tracking, and unboxing proof to trigger instant payment release to the seller.
                </p>
              </div>

              <div className="grid-2">
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>Delivery Checklist</h5>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={checklist.productionProof} onChange={e => setChecklist({ ...checklist, productionProof: e.target.checked })} />
                      <span>Production Photo Proof Verified</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={checklist.packagingProof} onChange={e => setChecklist({ ...checklist, packagingProof: e.target.checked })} />
                      <span>Packaging & Sealing Proof Verified</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={checklist.unpackingCheck} onChange={e => setChecklist({ ...checklist, unpackingCheck: e.target.checked })} />
                      <span>Buyer Unpacking & Quality Check Passed</span>
                    </label>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0B192C' }}>Release Escrow Payment</h5>
                    <div style={{ background: '#ECFDF5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #A7F3D0', margin: '0.75rem 0', fontSize: '0.8rem', textAlign: 'left' }}>
                      <div style={{ color: '#047857', fontWeight: '700' }}>💸 Payout Allocation:</div>
                      <div>• Transfer to Seller ({trade.sellerName}): <strong>₹{rentalSubtotal.toFixed(2)}</strong></div>
                      {isRental && <div>• Refund Security Deposit to Buyer: <strong>₹{securityDeposit.toFixed(2)}</strong></div>}
                      <div style={{ color: '#64748B' }}>• Platform Escrow Fee Retained: <strong>₹{escrowFee.toFixed(2)}</strong></div>
                    </div>
                  </div>

                  {isSuperAdmin ? (
                    <div style={{ background: '#F3E8FF', border: '1px solid #C084FC', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#6B21A8', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                        <ShieldCheck size={16} color="#8B5CF6" />
                        <span>Super Admin Read-Only Governance Mode</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#581C87', margin: 0, lineHeight: '1.4' }}>
                        Admins cannot access customer funds or trigger payment release. Payment release is strictly controlled by Buyer ({trade.buyerName}) upon inspection.
                      </p>
                    </div>
                  ) : (
                    <button className="btn-primary" style={{ padding: '0.85rem', width: '100%' }} onClick={handleCompleteDeliveryChecklist}>
                      <Sparkles size={18} />
                      <span>Approve & Release Payment to Seller</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
