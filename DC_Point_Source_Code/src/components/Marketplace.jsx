import React, { useState } from 'react';
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
  UserCheck
} from 'lucide-react';

export default function Marketplace({ 
  activeMarket, 
  setActiveMarket, 
  listings, 
  onSelectListing, 
  onOpenCreateListing,
  onViewSellerProfile
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['All', 'Craft & Goods', 'Tech & Electronics', 'Industrial & Tools', 'Rentals'];

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
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF', fontWeight: '800' }}>
            {activeMarket === 'purchase' ? 'Purchase Marketplace' : 'Rent & Equipment Market'}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '0.2rem' }}>
            {activeMarket === 'purchase' 
              ? 'Buy verified custom products & services backed by binding escrow trade contracts.' 
              : 'Rent high-value equipment & gear safely with locked escrow security deposits.'}
          </p>
        </div>

        <button 
          className="btn-primary" 
          onClick={onOpenCreateListing}
          style={{ whiteSpace: 'nowrap' }}
        >
          {activeMarket === 'purchase' ? 'List Product / Service' : 'List Item for Rent'}
        </button>
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
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px dashed #F1F5F9' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.825rem',
                fontWeight: '600',
                background: selectedCategory === cat ? '#0B192C' : '#F1F5F9',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                transition: 'all 0.2s'
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
          {filteredListings.length} Available
        </span>
      </div>

      {/* Listing Cards Grid */}
      {filteredListings.length === 0 ? (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <ShoppingBag size={48} style={{ color: '#CBD5E1', marginBottom: '1rem' }} />
          <h3 style={{ color: '#475569' }}>No listings found matching your search</h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Try clearing search filters or switch between Purchase and Rent markets.
          </p>
        </div>
      ) : (
        <div className="grid-3">
          {filteredListings.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Image Preview */}
              <div style={{ position: 'relative', height: '200px', background: '#F1F5F9', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Compliance Stamp */}
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-verified" style={{ backdropFilter: 'blur(4px)', background: 'rgba(236, 253, 245, 0.95)' }}>
                    <ShieldCheck size={12} /> Compliance Passed
                  </span>
                </div>

                {item.type === 'rent' && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className="badge badge-warning">
                      <Repeat size={12} /> For Rent
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                {/* Category & Rating */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#00ADB5', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: '700', color: '#D97706' }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span>{item.sellerRating}</span>
                    <span style={{ color: '#94A3B8', fontWeight: '400', fontSize: '0.75rem' }}>({item.sellerCompletedTrades} trades)</span>
                  </div>
                </div>

                {/* Title */}
                <h4 style={{
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
                </h4>

                {/* Description */}
                <p style={{
                  fontSize: '0.85rem',
                  color: '#64748B',
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.65rem',
                    background: '#F8FAFC',
                    borderRadius: '8px',
                    marginBottom: '1.25rem',
                    cursor: 'pointer',
                    border: '1px solid #F1F5F9'
                  }}
                >
                  <UserCheck size={16} color="#00ADB5" />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>
                    {item.sellerName}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#10B981', fontWeight: '600' }}>
                    Verified
                  </span>
                </div>

                {/* Price & Action Button */}
                <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                      {item.type === 'rent' ? 'Rental Rate' : 'Escrow Price'}
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0B192C' }}>
                      ${item.price} <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#64748B' }}>/{item.unit.split(' ')[0]}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-navy btn-sm"
                    onClick={() => onSelectListing(item)}
                  >
                    <span>{item.type === 'rent' ? 'Rent Now' : 'I Want This'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
