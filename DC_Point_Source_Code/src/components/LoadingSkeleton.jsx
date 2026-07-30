import React from 'react';

export function ListingSkeletonCard() {
  return (
    <div className="card" style={{ padding: '1.25rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FFFFFF' }}>
      <div 
        style={{ 
          width: '100%', 
          height: '200px', 
          borderRadius: '12px', 
          background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite' 
        }} 
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ width: '70px', height: '22px', borderRadius: '99px', background: '#E2E8F0' }} />
        <div style={{ width: '90px', height: '22px', borderRadius: '99px', background: '#E2E8F0' }} />
      </div>
      <div style={{ width: '85%', height: '20px', borderRadius: '6px', background: '#CBD5E1' }} />
      <div style={{ width: '60%', height: '16px', borderRadius: '6px', background: '#E2E8F0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ width: '80px', height: '24px', borderRadius: '6px', background: '#CBD5E1' }} />
        <div style={{ width: '100px', height: '36px', borderRadius: '8px', background: '#00ADB5', opacity: 0.4 }} />
      </div>
    </div>
  );
}

export function GridSkeletonLoader({ count = 6 }) {
  return (
    <div className="grid-3" style={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => (
        <ListingSkeletonCard key={index} />
      ))}
    </div>
  );
}

export default GridSkeletonLoader;
