import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, ServerCrash, SearchX, ShieldAlert } from 'lucide-react';

export default function ErrorStateCard({ 
  title = "Unable to fetch data", 
  message = "A network error occurred while connecting to the DC-Point Escrow API. Please verify your connection or try again.", 
  errorDetails = null,
  onRetry = null,
  type = "error" // "error" | "empty" | "network"
}) {
  const [showDetails, setShowDetails] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'network':
        return <ServerCrash size={40} color="#EF4444" />;
      case 'empty':
        return <SearchX size={40} color="#00ADB5" />;
      default:
        return <AlertTriangle size={40} color="#F59E0B" />;
    }
  };

  return (
    <div 
      className="card"
      style={{
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '560px',
        margin: '2rem auto',
        borderRadius: '16px',
        border: type === 'error' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-color)',
        background: type === 'error' ? '#FEF2F2' : '#FFFFFF',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div 
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: type === 'error' ? '#FEE2E2' : type === 'network' ? '#FEE2E2' : '#E0F2FE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem'
        }}
      >
        {getIcon()}
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', maxWidth: '440px', marginBottom: '1.5rem' }}>
        {message}
      </p>

      {errorDetails && (
        <div style={{ width: '100%', marginBottom: '1.25rem' }}>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            style={{ 
              background: 'transparent', 
              color: '#64748B', 
              fontSize: '0.75rem', 
              textDecoration: 'underline',
              cursor: 'pointer',
              marginBottom: '0.5rem'
            }}
          >
            {showDetails ? 'Hide technical logs' : 'Show technical error log'}
          </button>
          
          {showDetails && (
            <div 
              style={{
                background: '#0B192C',
                color: '#EF4444',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                textAlign: 'left',
                overflowX: 'auto',
                maxHeight: '120px'
              }}
            >
              {typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails, null, 2)}
            </div>
          )}
        </div>
      )}

      {onRetry && (
        <button 
          className="btn-primary" 
          onClick={onRetry}
          style={{ minHeight: '44px', minWidth: '140px', padding: '0.65rem 1.5rem' }}
        >
          <RefreshCw size={16} />
          <span>Retry Loading</span>
        </button>
      )}
    </div>
  );
}
