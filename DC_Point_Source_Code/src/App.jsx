import React, { useState, useEffect } from 'react';
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
import LegalDocsModal from './components/LegalDocsModal';
import { CheckCircle2 } from 'lucide-react';

import { 
  INITIAL_USER_PERSONAS, 
  INITIAL_PURCHASE_LISTINGS, 
  INITIAL_RENT_LISTINGS, 
  MOCK_ACTIVE_TRADES,
  INITIAL_NOTIFICATIONS
} from './data/mockData';

export default function App() {
  // User Personas & Active Session
  const [allUsers, setAllUsers] = useState(INITIAL_USER_PERSONAS);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUserId = sessionStorage.getItem('dc_authenticated_user');
    const found = INITIAL_USER_PERSONAS.find(u => u.id === savedUserId);
    return found || INITIAL_USER_PERSONAS[0];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('dc_authenticated_user');
  });

  // Navigation & Market States
  const [activeMarket, setActiveMarket] = useState('purchase'); // 'purchase' | 'rent'
  const [currentTab, setCurrentTab] = useState(() => {
    const savedUserId = sessionStorage.getItem('dc_authenticated_user');
    if (savedUserId === 'user_admin_1') return 'dashboard';
    if (savedUserId === 'user_seller_1') return 'dashboard';
    if (savedUserId) return 'marketplace';
    return 'home'; // Default to home for normal initial load
  });

  // Handle SPA GitHub Pages routing redirect restore
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect_path');
    if (redirectPath) {
      sessionStorage.removeItem('redirect_path');
      if (redirectPath.includes('marketplace')) {
        setCurrentTab('marketplace');
      } else if (redirectPath.includes('dashboard')) {
        setCurrentTab('dashboard');
      }
    }
  }, []);

  // Notifications State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Marketplace & Trade States
  const [listings, setListings] = useState([...INITIAL_PURCHASE_LISTINGS, ...INITIAL_RENT_LISTINGS]);
  const [activeTrades, setActiveTrades] = useState(MOCK_ACTIVE_TRADES);

  // Modals
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeTradeForWizard, setActiveTradeForWizard] = useState(null);
  const [isWizardReadOnly, setIsWizardReadOnly] = useState(false);
  const [tradeForDispute, setTradeForDispute] = useState(null);
  const [selectedSellerProfileId, setSelectedSellerProfileId] = useState(null);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeLegalDocTab, setActiveLegalDocTab] = useState(null); // 'ai-compliance' | 'escrow-protection' | 'dispute-resolution'

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

  // Login Handler & Role Restrictions Enforcement
  const handleLoginSuccess = (targetUserId) => {
    const userToLogin = targetUserId ? allUsers.find(u => u.id === targetUserId) : allUsers[0];
    if (userToLogin) {
      setCurrentUser(userToLogin);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      sessionStorage.setItem('dc_authenticated_user', userToLogin.id);

      // Enforce Role Restrictions
      if (userToLogin.id === 'user_admin_1' || userToLogin.role.toLowerCase().includes('admin')) {
        // Super Admin: Redirects strictly to platform administration dashboard
        setCurrentTab('dashboard');
      } else if (userToLogin.id === 'user_seller_1' || userToLogin.role.toLowerCase().includes('seller')) {
        // Seller: Redirects to seller dashboard/management view
        setCurrentTab('dashboard');
      } else {
        // Buyer: Redirects to buyer marketplace and browsing view
        setCurrentTab('marketplace');
        setActiveMarket('purchase');
      }

      showToast(`Logged in successfully as ${userToLogin.name} (${userToLogin.role.split(' ')[0]})`);
    }
  };

  // Logout Handler (Role switching happens ONLY via logout)
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dc_authenticated_user');
    setCurrentTab('home');
    showToast('Logged out. You are now in public browsing mode.');
  };

  // Switch User Handler (Internal state sync)
  const handleSwitchUser = (userId) => {
    handleLoginSuccess(userId);
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
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenCreateListing={() => {
          if (!isAuthenticated) {
            setIsAuthModalOpen(true);
            showToast('Please select a role to list items or create seller gear.');
          } else {
            setIsCreateListingOpen(true);
          }
        }}
        onOpenLegalDoc={(docTab) => setActiveLegalDocTab(docTab)}
        activeTradeCount={activeTrades.length}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenTradeFromNotification={handleOpenTradeFromNotification}
        onLogout={handleLogout}
        showToast={showToast}
      />

      {/* Main View Controller */}
      <main id="main-content" tabIndex="-1" style={{ flex: '1', outline: 'none' }}>
        {currentTab === 'home' && (
          <LandingPage 
            onExploreMarket={(marketType) => {
              setActiveMarket(marketType);
              setCurrentTab('marketplace');
              showToast(`Exploring ${marketType === 'purchase' ? 'Purchase' : 'Rent'} Market`);
            }}
            onStartSelling={() => {
              if (!isAuthenticated) {
                setIsAuthModalOpen(true);
                showToast('Please select a Seller role to start listing items.');
              } else {
                setIsCreateListingOpen(true);
              }
            }}
            onOpenLegalDoc={(docTab) => setActiveLegalDocTab(docTab)}
          />
        )}

        {currentTab === 'marketplace' && (
          <Marketplace
            activeMarket={activeMarket}
            setActiveMarket={setActiveMarket}
            listings={listings}
            onSelectListing={(item) => setSelectedListing(item)}
            onOpenCreateListing={() => {
              if (!isAuthenticated) {
                setIsAuthModalOpen(true);
              } else {
                setIsCreateListingOpen(true);
              }
            }}
            onViewSellerProfile={(sellerId) => setSelectedSellerProfileId(sellerId)}
            currentUser={currentUser}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            activeTrades={activeTrades}
            allListings={listings}
            onOpenTradeWizard={(trade, readOnly = false) => {
              setActiveTradeForWizard(trade);
              setIsWizardReadOnly(readOnly);
            }}
            onOpenCreateListing={() => setIsCreateListingOpen(true)}
            onViewSellerProfile={(sellerId) => setSelectedSellerProfileId(sellerId)}
            onSwitchUser={handleSwitchUser}
          />
        )}
      </main>

      {/* MODALS */}

      {/* On-Demand Role Selection Authentication Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isMandatory={false}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Listing Detail Modal */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onStartTrade={(listing) => {
            if (!isAuthenticated) {
              setSelectedListing(null);
              setIsAuthModalOpen(true);
              showToast('Please select a Buyer role to initiate escrow trades.');
            } else {
              handleStartTrade(listing);
            }
          }}
          onViewSellerProfile={(sellerId) => setSelectedSellerProfileId(sellerId)}
          currentUser={currentUser}
          onSwitchUser={handleSwitchUser}
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
          isReadOnly={isWizardReadOnly}
          onUpdateTrade={handleUpdateTrade}
          onAddNotification={handleAddNotification}
          onUpdateWalletBalance={handleUpdateWalletBalance}
          onOpenDispute={(trade) => setTradeForDispute(trade)}
          onClose={() => {
            setActiveTradeForWizard(null);
            setIsWizardReadOnly(false);
          }}
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

      {/* Platform & Legal Documentation Viewer */}
      {activeLegalDocTab && (
        <LegalDocsModal
          initialTab={activeLegalDocTab}
          onClose={() => setActiveLegalDocTab(null)}
        />
      )}
    </div>
  );
}
