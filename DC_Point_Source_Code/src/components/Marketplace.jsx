import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Star, 
  Tag, 
  Repeat, 
  ShoppingBag, 
  Sparkles,
  ArrowRight,
  UserCheck,
  WifiOff
} from 'lucide-react';
import { FALLBACK_IMAGES } from '../data/mockData';
import ErrorStateCard from './ErrorStateCard';
import GridSkeletonLoader from './LoadingSkeleton';

export default function Marketplace({ 
  activeMarket, 
  setActiveMarket, 
  listings, 
  onSelectListing, 
  onOpenCreateListing,
  onViewSellerProfile,
  currentUser
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulatedError, setIsSimulatedError] = useState(false);

  const isSeller = currentUser?.id === 'user_seller_1' || currentUser?.role?.toLowerCase().includes('seller');

  // Trigger loading skeleton on category / market switch
  useEffect(() => {
    setIsLoading(true);
    setSelectedCategory('All');
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeMarket]);

  const handleCategorySelect = (cat) => {
    setIsLoading(true);
    setSelectedCategory(cat);
    setTimeout(() => setIsLoading(false), 250);
  };


  const categories = activeMarket === 'purchase' 
    ? ['All', 'Craft & Goods', 'Tech & Electronics', 'Industrial & Tools']
    : ['All', 'Rentals', 'Craft & Goods', 'Tech & Electronics'];

  // Filter listings based on active market, search query, and category
  const filteredListings = listings.filter(item => {
    // Market tab match
    if (activeMarket === 'purchase' && item.type !== 'purchase') return false;
    if (activeMarket === 'rent' && item.type !== 'rent') return false;

    // Category match
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.sellerName.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.sellerRating - a.sellerRating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Mobile Market Switcher (Visible on Mobile Screens < 768px) */}
      <div className="mobile-market-switch" style={{ marginBottom: '1.5rem', display: 'none' }}>
        <div style={{
          display: 'flex',
          width: '100%',
          background: '#0B192C',
          padding: '0.35rem',
          borderRadius: '12px',
          border: '1px solid rgba(0, 173, 181, 0.3)'
        }}>
          <button
            onClick={() => setActiveMarket('purchase')}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: '8px',
              border: 'none',
              background: activeMarket === 'purchase' ? '#00ADB5' : 'transparent',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              minHeight: '44px'
            }}
          >
            <ShoppingBag size={16} /> Purchase Market
          </button>
          <button
            onClick={() => setActiveMarket('rent')}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: '8px',
              border: 'none',
              background: activeMarket === 'rent' ? '#00ADB5' : 'transparent',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              minHeight: '44px'
            }}
          >
            <Repeat size={16} /> Rent Market
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0B192C 0%, #1E3E62 100%)',
        color: '#FFFFFF',
        borderRadius: '16px',
        padding: '2rem 2.5rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#00ADB5', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <ShieldCheck size={16} /> Legal Trade Protection Enabled
          </div>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', fontWeight: '800' }}>
            {activeMarket === 'purchase' ? 'Purchase Marketplace' : 'Rent & Equipment Market'}
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            {activeMarket === 'purchase' 
              ? 'Buy verified custom products & services backed by binding escrow trade contracts.' 
              : 'Rent high-value equipment & gear safely with locked escrow security deposits.'}
          </p>
        </div>

        {isSeller ? (
          <button 
            className="btn-primary" 
            onClick={onOpenCreateListing}
            style={{ whiteSpace: 'nowrap' }}
          >
            {activeMarket === 'purchase' ? 'List Product / Service' : 'List Item for Rent'}
          </button>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 173, 181, 0.15)', border: '1px solid #00ADB5', padding: '0.6rem 1.1rem', borderRadius: '10px', color: '#00ADB5', fontSize: '0.85rem', fontWeight: '700' }}>
            <ShieldCheck size={18} /> Buyer Escrow Guarantee Active
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search verified listings, crafts, tech or rental gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Sort selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                background: '#FFFFFF',
                color: '#0F172A',
                fontWeight: '500'
              }}
            >
              <option value="rating">Highest Seller Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Network Test Simulation Toggle */}
            <button
              onClick={() => setIsSimulatedError(!isSimulatedError)}
              style={{
                background: isSimulatedError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(100, 116, 139, 0.1)',
                border: `1px solid ${isSimulatedError ? '#EF4444' : '#CBD5E1'}`,
                color: isSimulatedError ? '#EF4444' : '#64748B',
                borderRadius: '8px',
                padding: '0.55rem 0.85rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                minHeight: '44px'
              }}
              title="Test API Fallback State"
            >
              <WifiOff size={14} />
              <span>{isSimulatedError ? 'Clear Simulated Error' : 'Simulate API Error'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px dashed #F1F5F9' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.825rem',
                fontWeight: '600',
                background: selectedCategory === cat ? '#0B192C' : '#F1F5F9',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                transition: 'all 0.2s',
                minHeight: '36px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested / Featured Banner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Sparkles size={18} color="#00ADB5" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Verified Marketplace Listings</h3>
        <span className="badge badge-verified" style={{ marginLeft: 'auto' }}>
          {isLoading ? 'Loading...' : `${filteredListings.length} Available`}
        </span>
      </div>

      {/* Conditional Rendering: Network Error -> Loading Skeleton -> Empty State -> Listings Grid */}
      {isSimulatedError ? (
        <ErrorStateCard
          type="network"
          title="Network Connection Interrupted"
          message="Failed to synchronize marketplace items with DC-Point Escrow Nodes. Check network connection and retry."
          errorDetails={{ status: 503, code: "ERR_ESCROW_NODE_TIMEOUT", message: "Escrow node RPC timed out after 5000ms" }}
          onRetry={() => {
            setIsLoading(true);
            setIsSimulatedError(false);
            setTimeout(() => setIsLoading(false), 400);
          }}
        />
      ) : isLoading ? (
        <GridSkeletonLoader count={6} />
      ) : filteredListings.length === 0 ? (
        <ErrorStateCard
          type="empty"
          title="No Verified Listings Found"
          message={`No ${activeMarket} listings matched "${searchQuery || selectedCategory}". Try clearing search filters or switching categories.`}
          onRetry={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid-3">
          {filteredListings.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Image Preview */}
              <div style={{ position: 'relative', height: '200px', background: '#F1F5F9', overflow: 'hidden' }}>
                <img 
                  src={item.image || (item.type === 'rent' ? FALLBACK_IMAGES.cinemaCamera : FALLBACK_IMAGES.leatherBag)} 
                  alt={`${item.title} - ${item.category} listed by ${item.sellerName}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = item.type === 'rent' ? FALLBACK_IMAGES.cinemaCamera : FALLBACK_IMAGES.leatherBag;
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Compliance Stamp */}
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-verified" style={{ backdropFilter: 'blur(4px)', background: 'rgba(236, 253, 245, 0.95)' }}>
                    <ShieldCheck size={12} aria-hidden="true" /> Compliance Passed
                  </span>
                </div>

                {item.type === 'rent' && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className="badge badge-warning">
                      <Repeat size={12} aria-hidden="true" /> For Rent
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                {/* Category & Rating */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#007A80', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: '700', color: '#D97706' }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" aria-hidden="true" />
                    <span>{item.sellerRating}</span>
                    <span style={{ color: '#475569', fontWeight: '500', fontSize: '0.8rem' }}>({item.sellerCompletedTrades} trades)</span>
                  </div>
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  lineHeight: '1.35',
                  marginBottom: '0.5rem',
                  color: '#0B192C',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '0.875rem',
                  color: '#475569',
                  lineHeight: '1.5',
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.description}
                </p>

                {/* Seller Info */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewSellerProfile(item.sellerId);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onViewSellerProfile(item.sellerId);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View seller profile for ${item.sellerName}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.65rem',
                    background: '#F8FAFC',
                    borderRadius: '8px',
                    marginBottom: '1.25rem',
                    cursor: 'pointer',
                    border: '1px solid #E2E8F0',
                    minHeight: '44px'
                  }}
                >
                  <UserCheck size={16} color="#007A80" aria-hidden="true" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1E293B' }}>
                    {item.sellerName}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#047857', fontWeight: '700' }}>
                    Verified
                  </span>
                </div>

                {/* Price & Action Button */}
                <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', fontWeight: '600' }}>
                      {item.type === 'rent' ? 'Rental Rate' : 'Escrow Price'}
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0B192C' }}>
                      ₹{item.price} <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#475569' }}>/{item.unit.split(' ')[0]}</span>
                    </div>
                  </div>

                  {currentUser?.id === 'user_admin_1' ? (
                    <button 
                      className="btn-outline btn-sm"
                      onClick={() => onSelectListing(item)}
                      style={{ fontSize: '0.8rem', color: '#8B5CF6', borderColor: '#8B5CF6', minHeight: '44px' }}
                      title="Inspect listing details as Super Admin"
                      aria-label={`Inspect ${item.title} as Super Admin`}
                    >
                      <span>Inspect Listing</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  ) : (
                    <button 
                      className="btn-navy btn-sm"
                      onClick={() => onSelectListing(item)}
                      style={{ minHeight: '44px' }}
                      aria-label={item.type === 'rent' ? `Rent ${item.title}` : `Purchase ${item.title}`}
                    >
                      <span>{item.type === 'rent' ? 'Rent Now' : 'I Want This'}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
