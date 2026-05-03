import Link from 'next/link';
import { Button } from '@heroui/react';

const categoryColors = {
  ceramic: { bg: '#f0e6d3', color: '#8b5e2d' },
  marble: { bg: '#e8e8f0', color: '#4a4a6a' },
  mosaic: { bg: '#e3f0e3', color: '#2d6b2d' },
  porcelain: { bg: '#e3ecf0', color: '#2d5a6b' },
  terracotta: { bg: '#f5e6d3', color: '#8b4513' },
  zellige: { bg: '#d3e4f5', color: '#1d4a7a' },
};

export default function TileCard({ tile }) {
  const cat = categoryColors[tile.category] || { bg: '#f0e6d3', color: '#8b5e2d' };

  return (
    <div style={{
      background: 'var(--color-background-primary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(181,101,29,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* TILE IMAGE SECTION - UPDATED */}
      <div style={{ height: '240px', background: 'var(--color-background-secondary)', position: 'relative', overflow: 'hidden' }}>
        {tile.image ? (
          <img 
            src={tile.image} 
            alt={tile.title || tile.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' // Change to 'contain' if you don't want the edges cropped at all!
            }} 
          />
        ) : (
          <TilePatternSVG id={tile.id} category={tile.category} />
        )}
      </div>

      <div style={{ padding: '10px 12px 14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '3px' }}>{tile.title || tile.name}</div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: '20px',
            fontSize: '10px', fontWeight: 500, background: cat.bg, color: cat.color,
          }}>{tile.category}</span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{tile.dimensions}</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#b5651d', marginBottom: '8px' }}>${tile.price}</div>
        <Link href={`/tile/${tile.id}`} style={{ display: 'block' }}>
          <Button size="sm" style={{
            width: '100%',
            background: 'var(--color-background-secondary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
          }}>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

function TilePatternSVG({ id, category }) {
  const patterns = {
    ceramic: (
      <svg width="100%" height="100%" viewBox="0 0 120 110" preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#c9956e" />
            <rect x="1" y="1" width="18" height="18" fill="#d4a57e" />
            <path d="M10 1L19 10L10 19L1 10Z" fill="#b5651d" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
    ),
    marble: (
      <svg width="100%" height="100%" viewBox="0 0 120 110" preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${id}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="#e8e4dc" />
            <line x1="0" y1="12" x2="24" y2="12" stroke="#c5bfb5" strokeWidth="0.5" />
            <line x1="12" y1="0" x2="12" y2="24" stroke="#c5bfb5" strokeWidth="0.5" />
            <circle cx="12" cy="12" r="3" fill="#9e9890" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
    ),
    mosaic: (
      <svg width="100%" height="100%" viewBox="0 0 120 110" preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${id}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#2d4a3e" />
            <rect x="0" y="0" width="8" height="8" fill="#3a6355" />
            <rect x="8" y="8" width="8" height="8" fill="#3a6355" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
    ),
    porcelain: (
      <svg width="100%" height="100%" viewBox="0 0 120 110" preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="#f5f0e8" />
            <path d="M15 0L30 15L15 30L0 15Z" fill="none" stroke="#d4c4a8" strokeWidth="1" />
            <circle cx="15" cy="15" r="4" fill="#c9b08a" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
    ),
    terracotta: (
      <svg width="100%" height="100%" viewBox="0 0 120 110" preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${id}`} x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
            <rect width="24" height="12" fill="#d4c09a" />
            <rect x="0.5" y="0.5" width="23" height="11" fill="none" stroke="#b8a07a" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
    ),
    zellige: (
      <svg width="100%" height="100%" viewBox="0 0 120 110" preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#4a3a6e" />
            <circle cx="10" cy="10" r="6" fill="none" stroke="#7a6aae" strokeWidth="1" />
            <circle cx="10" cy="10" r="2" fill="#9e8ece" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
    ),
  };
  return patterns[category] || patterns['ceramic'];
}