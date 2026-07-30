import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Marketplace from './components/Marketplace';
import ListingDetailModal from './components/ListingDetailModal';
import CreateListingModal from './components/CreateListingModal';
import TradeWizard from './components/TradeWizard';
import DisputeModal from './components/DisputeModal';
import Dashboard from './components/Dashboard';
import PublicProfileModal from './components/PublicProfileModal';
import AuthModal from './components/AuthModal';
import { CheckCircle2 } from 'lucide-react';

import { 
  INITIAL_USER_PERSONAS, 
  INITIAL_PURCHASE_LISTINGS, 
  INITIAL_RENT_LISTINGS, 
  MOCK_ACTIVE_TRADES,
  INITIAL_NOTIFICATIONS
} from './data/mockData';

export default function App() {
  // Navigation & Market States
  const [activeMarket, setActiveMarket] = useState('purchase'); // 'purchase' | 'rent'
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'marketplace' | 'dashboard'

  // User Personas & Active Session
  const [allUsers, setAllUsers] = useState(INITIAL_USER_PERSONAS);
  const [currentUser, setCurrentUser] = useState(INITIAL_USER_PERSONAS[0]); // Alex Mercer by default

  // Notifications State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Marketplace & Trade States
  const [listings, setListings] = useState([...INITIAL_PURCHASE_LISTINGS, ...INITIAL_RENT_LISTINGS]);
  const [activeTrades, setActiveTrades] = useState(MOCK_ACTIVE_TRADES);

  // Modals
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeTradeForWizard, setActiveTradeForWizard] = useState(null);
  const [tradeForDispute, setTradeForDispute] = useState(null);
  const [selectedSellerProfileId, setSelectedSellerProfileId] = useState(null);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toast Notification System
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Real-time Wallet Balance Handler
  const handleUpdateWalletBalance = (userId, amountChange, reason) => {
    setAllUsers(prevUsers => prevUsers.map(u => {
      if (u.id === userId) {
        return { ...u, walletBalance: Math.max(0, u.walletBalance + amountChange) };
      }
      return u;
    }));

    setCurrentUser(prev => {
      if (prev.id === userId) {
        return { ...prev, walletBalance: Math.max(0, prev.walletBalance + amountChange) };
      }
      return prev;
    });

    if (reason) {
      const isDebit = amountChange < 0;
      showToast(`${isDebit ? '💸 Escrow Vault Deduction' : '💰 Escrow Payout Received'}: ${isDebit ? '-' : '+'}₹${Math.abs(amountChange).toFixed(2)} (${reason})`);
    }
  };

  // Add real-time notification
  const handleAddNotification = (newNotif) => {
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`🔔 Buyer Notification: ${newNotif.title}`);
  };

  const handleMarkNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  const handleOpenTradeFromNotification = (tradeId) => {
    const found = activeTrades.find(t => t.id === tradeId);
    if (found) {
      setActiveTradeForWizard(found);
    }
  };

  // Persona / Role Switch Handler
  const handleSwitchUser = (userId) => {
    const found = allUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showToast(`Switched active portal to ${found.name} (${found.role.split(' ')[0]})`);
    }
  };

  // Start new trade flow from listing modal
  const handleStartTrade = (listing) => {
    setSelectedListing(null);

    // Check if trade already exists
    const existing = activeTrades.find(t => t.listingId === listing.id && t.buyerId === currentUser.id);
    if (existing) {
      setActiveTradeForWizard(existing);
      showToast(`Opened active trade for "${listing.title.slice(0, 24)}..."`);
      return;
    }

    const defaultNotes = listing.sampleAgreementTerms?.customNotes || 
      `Please ensure ${listing.title} quality matches contract specifications.`;

    const newTrade = {
      id: `trade-${Date.now().toString().slice(-4)}`,
      listingId: listing.id,
      title: listing.title,
      price: listing.price,
      escrowFee: listing.price * 0.05,
      totalEscrowAmount: listing.price * 1.05,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      currentStep: 1, // Step 1: Chat & Negotiation
      type: listing.type,
      image: listing.image,
      status: 'Chat & Term Negotiation',
      createdAt: new Date().toISOString().split('T')[0],
      agreementDetails: {
        deliveryTimeframeDays: listing.sampleAgreementTerms?.deliveryWindowDays || 5,
        paymentTerms: 'Full Escrow Vault Lock',
        qualityInspectionTerms: `${listing.sampleAgreementTerms?.inspectionWindowHours || 48}-hour unpacking window`,
        agreementDurationDays: 14,
        customPackagingNotes: defaultNotes,
        signedByBuyer: false,
        signedBySeller: false,
        legalContractHash: `DC-HASH-${Math.floor(1000+Math.random()*9000)}-CONTRACT-VERIFIED`
      },
      initialChatMessages: [
        { sender: listing.sellerName, text: `Hello ${currentUser.name}! Thanks for initiating trade interest for "${listing.title}". Let's confirm contract terms.`, time: '10:00 AM' },
        { sender: currentUser.name, text: `Hi! ${defaultNotes}`, time: '10:02 AM' }
      ],
      progressUpdates: [],
      timer: null,
      deliveryChecklist: {
        productionProof: false,
        packagingProof: false,
        trackingNumber: 'TRK-DC-PENDING',
        unpackingCheck: false
      }
    };

    setActiveTrades(prev => [newTrade, ...prev]);
    setActiveTradeForWizard(newTrade);
    showToast('New Escrow Trade Agreement initiated!');
  };

  // Trade update handler
  const handleUpdateTrade = (updatedTrade) => {
    setActiveTrades(prev => prev.map(t => t.id === updatedTrade.id ? updatedTrade : t));
    setActiveTradeForWizard(updatedTrade);
  };

  // Create Listing Handler
  const handleCreateListingSuccess = (newListing) => {
    setListings(prev => [newListing, ...prev]);
    setIsCreateListingOpen(false);
    setActiveMarket(newListing.type);
    setCurrentTab('marketplace');
    showToast(`Published "${newListing.title.slice(0, 24)}..." to marketplace as Seller!`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={18} color="#00ADB5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar Header */}
      <Header
        activeMarket={activeMarket}
        setActiveMarket={(m) => {
          setActiveMarket(m);
          showToast(`Switched to ${m === 'purchase' ? 'Purchase Market' : 'Rent Market'}`);
        }}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        allUsers={allUsers}
        onOpenCreateListing={() => setIsCreateListingOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        activeTradeCount={activeTrades.length}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenTradeFromNotification={handleOpenTradeFromNotification}
        showToast={showToast}
      />

      {/* Main View Controller */}
      <main style={{ flex: '1' }}>
        {currentTab === 'home' && (
          <LandingPage 
            onExploreMarket={(marketType) => {
              setActiveMarket(marketType);
              setCurrentTab('marketplace');
              showToast(`Exploring ${marketType === 'purchase' ? 'Purchase' : 'Rent'} Market`);
            }}
            onStartSelling={() => setIsCreateListingOpen(true)}
          />
        )}

        {currentTab === 'marketplace' && (
          <Marketplace
            activeMarket={activeMarket}
            setActiveMarket={setActiveMarket}
            listings={listings}
            onSelectListing={(item) => setSelectedListing(item)}
            onOpenCreateListing={() => setIsCreateListingOpen(true)}
            onViewSellerProfile={(sellerId) => setSelectedSellerProfileId(sellerId)}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            activeTrades={activeTrades}
            allListings={listings}
            onOpenTradeWizard={(trade) => setActiveTradeForWizard(trade)}
            onOpenCreateListing={() => setIsCreateListingOpen(true)}
            onViewSellerProfile={(sellerId) => setSelectedSellerProfileId(sellerId)}
          />
        )}
      </main>

      {/* MODALS */}

      {/* Listing Detail Modal */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onStartTrade={handleStartTrade}
          onViewSellerProfile={(sellerId) => setSelectedSellerProfileId(sellerId)}
        />
      )}

      {/* Create Listing Modal */}
      {isCreateListingOpen && (
        <CreateListingModal
          onClose={() => setIsCreateListingOpen(false)}
          onCreateSuccess={handleCreateListingSuccess}
          currentUser={currentUser}
        />
      )}

      {/* Trade Wizard (6-Step Milestone Engine) */}
      {activeTradeForWizard && (
        <TradeWizard
          trade={activeTradeForWizard}
          currentUser={currentUser}
          onUpdateTrade={handleUpdateTrade}
          onAddNotification={handleAddNotification}
          onUpdateWalletBalance={handleUpdateWalletBalance}
          onOpenDispute={(trade) => setTradeForDispute(trade)}
          onClose={() => setActiveTradeForWizard(null)}
          showToast={showToast}
        />
      )}

      {/* Resolution Center / Dispute Modal */}
      {tradeForDispute && (
        <DisputeModal
          trade={tradeForDispute}
          onClose={() => setTradeForDispute(null)}
          onSubmitDispute={({ tradeId }) => {
            showToast(`Claim for Trade #${tradeId} submitted to Resolution Board!`);
            setTradeForDispute(null);
          }}
        />
      )}

      {/* Public Profile View */}
      {selectedSellerProfileId && (
        <PublicProfileModal
          userId={selectedSellerProfileId}
          onClose={() => setSelectedSellerProfileId(null)}
        />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(targetUserId) => {
            setIsAuthModalOpen(false);
            const userToLogin = targetUserId ? allUsers.find(u => u.id === targetUserId) : allUsers[0];
            if (userToLogin) {
              setCurrentUser(userToLogin);
              showToast(`Logged in successfully as ${userToLogin.name} (${userToLogin.role.split(' ')[0]})`);
            }
          }}
        />
      )}
    </div>
  );
}
