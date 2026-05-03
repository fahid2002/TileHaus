'use client';
import { useState } from 'react';
import tiles from '@/data/tiles.json';
import TileCard from '@/components/TileCard';
import { Input } from '@heroui/react';

const categories = ['All', 'Ceramic', 'Marble', 'Mosaic', 'Porcelain', 'Terracotta', 'Zellige'];

export default function AllTilesPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = tiles.filter((tile) => {
    const matchSearch = tile.title.toLowerCase().includes(search.toLowerCase()) ||
      tile.material.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeFilter === 'All' || tile.category === activeFilter.toLowerCase();
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)' }}>
      {/* Header */}
      <div style={{ background: 'var(--color-background-primary)', padding: '24px 24px 0' }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '26px', fontWeight: 600,
          color: 'var(--color-text-primary)', marginBottom: '14px',
        }}>All Tiles</h1>
        
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <span style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'var(--color-text-secondary)', 
            fontSize: '16px',
            zIndex: 10
          }}>
            🔍
          </span>
          <Input
            placeholder="Search tiles by title, material or style..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="lg"
            style={{ paddingLeft: '40px', width: '100%' }} 
          />
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', paddingBottom: '12px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '5px 14px',
                borderRadius: '20px',
                border: '0.5px solid var(--color-border-tertiary)',
                background: activeFilter === cat ? '#b5651d' : 'var(--color-background-primary)',
                color: activeFilter === cat ? '#fff' : 'var(--color-text-secondary)',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '20px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-secondary)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '16px' }}>No tiles found for "{search}"</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '14px',
          }}>
            {filtered.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}