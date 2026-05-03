import { MongoClient } from 'mongodb';
import FeaturedSwiper from '@/components/FeaturedSwiper';
import Link from 'next/link';

// 1. Secure Server-Side Database Fetch
async function getFeaturedTiles() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in environment variables');
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("TileHaus"); 

  // Fetch the top 4 tiles from the database
  const rawTiles = await db.collection("tiles")
    .find({})
    .limit(4) 
    .toArray();

  await client.close();

  // Convert MongoDB ObjectIds to safe strings for the Swiper Client Component
  return rawTiles.map((tile) => ({
    ...tile,
    _id: tile._id.toString(),
    id: tile._id.toString(), 
  }));
}

// 2. Make the Home function `async`
export default async function Home() {
  // 3. Await the database fetch instead of using the local JSON
  const featured = await getFeaturedTiles();

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1c140d 0%, #2d1e0f 50%, #1a110a 100%)',
        padding: '70px 28px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(181,101,29,0.04) 0px, rgba(181,101,29,0.04) 1px, transparent 1px, transparent 40px)',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c9956e', marginBottom: '16px' }}>
            Premium Collection 2026
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            color: '#f5ede0',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            Discover Your<br /><em style={{ color: '#c9956e', fontStyle: 'italic' }}>Perfect Aesthetic</em>
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(245,237,224,0.6)', marginBottom: '32px' }}>
            Curated ceramic, marble &amp; mosaic tiles for inspired spaces
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/all-tiles" style={{
              background: '#b5651d', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '10px 24px', fontSize: '13px',
              fontWeight: 500, textDecoration: 'none', display: 'inline-block',
            }}>
              Browse Now
            </Link>
            <Link href="/all-tiles" style={{
              background: 'transparent', color: '#f5ede0',
              border: '0.5px solid rgba(245,237,224,0.35)',
              borderRadius: '8px', padding: '10px 24px', fontSize: '13px',
              textDecoration: 'none', display: 'inline-block',
            }}>
              View Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: '#b5651d', overflow: 'hidden', padding: '8px 0' }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '12px', color: '#fff', letterSpacing: '1px' }}>✦ New Arrivals: Venetian Cream Series</span>
              <span style={{ fontSize: '12px', color: '#fff', letterSpacing: '1px' }}>✦ Weekly Feature: Modern Geometric Patterns</span>
              <span style={{ fontSize: '12px', color: '#fff', letterSpacing: '1px' }}>✦ Join the Community</span>
              <span style={{ fontSize: '12px', color: '#fff', letterSpacing: '1px' }}>✦ New Arrivals: Sahara Brick Collection</span>
              <span style={{ fontSize: '12px', color: '#fff', letterSpacing: '1px' }}>✦ Limited Stock: Cobalt Zellige</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Tiles with Swiper */}
      <section style={{ padding: '36px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '22px', fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}>Featured Tiles</h2>
          <Link href="/all-tiles" style={{ fontSize: '12px', color: '#b5651d', textDecoration: 'none' }}>View all →</Link>
        </div>
        
        {/* 4. Swiper fed by real DB data! */}
        <FeaturedSwiper tiles={featured} />
      </section>

      {/* Stats Strip */}
      <section style={{
        background: 'var(--color-background-primary)',
        borderTop: '0.5px solid var(--color-border-tertiary)',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '28px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        textAlign: 'center',
        gap: '12px',
      }}>
        {[
          { num: '500+', label: 'Tile Designs' },
          { num: '12', label: 'Categories' },
          { num: '10K+', label: 'Happy Customers' },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '28px', fontWeight: 700, color: '#b5651d' }}>{stat.num}</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
}