import { notFound, redirect } from 'next/navigation';
import { auth, db } from '@/lib/auth';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import TileDetailSwiper from '@/components/TileDetailSwiper';

export default async function TileDetailPage({ params }) {

    const { id } = await params;


    const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');


  let rawTile = null;
  try {

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (isObjectId) {
      rawTile = await db.collection("tiles").findOne({ _id: new ObjectId(id) });
    } else {

        rawTile = await db.collection("tiles").findOne({ id: id });
    }
  } catch (e) {
    console.error("Database fetch error:", e);
  }

  if (!rawTile) {
    notFound();
  }

  

const tile = rawTile ? JSON.parse(JSON.stringify(rawTile)) : null;


  const categoryColors = {
    ceramic: { bg: '#f0e6d3', color: '#8b5e2d' },
    marble: { bg: '#e8e8f0', color: '#4a4a6a' },
    mosaic: { bg: '#e3f0e3', color: '#2d6b2d' },
    porcelain: { bg: '#e3ecf0', color: '#2d5a6b' },
    terracotta: { bg: '#f5e6d3', color: '#8b4513' },
    zellige: { bg: '#d3e4f5', color: '#1d4a7a' },
    obsidian: { bg: '#333333', color: '#ffffff' },
  };
  
  const cat = categoryColors[tile.category] || categoryColors['ceramic'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-tertiary)' }}>
      <div style={{ padding: '16px 24px' }}>
        <Link href="/" style={{ fontSize: '13px', color: '#b5651d', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '460px',
        background: 'var(--color-background-primary)',
        margin: '0 24px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '0.5px solid var(--color-border-tertiary)',
      }}>
        
        {/* Left - Swiper Slider */}
        <div style={{
          background: 'var(--color-background-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '28px',
        }}>
          <TileDetailSwiper tile={tile} />
          {/* <div style={{color: 'red'}}>TEMP TEXT: {tile.title}</div> */}
        </div>

        {/* Right - Details */}
        <div style={{ padding: '32px 28px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            <span style={{ 
              display: 'inline-block', padding: '2px 8px', borderRadius: '20px', 
              fontSize: '10px', fontWeight: 500, background: cat.bg, color: cat.color 
            }}>
              {tile.category}
            </span>
            {tile.tags?.map((tag) => (
              <span key={tag} style={{ 
                display: 'inline-block', padding: '2px 8px', borderRadius: '20px', 
                fontSize: '10px', background: '#e8e8f0', color: '#4a4a6a' 
              }}>
                {tag}
              </span>
            ))}
            {tile.inStock && (
              <span style={{ fontSize: '10px', color: '#2d6b2d', marginLeft: 'auto', fontWeight: 600 }}>
                ● In Stock
              </span>
            )}
          </div>

          <h1 style={{ 
            fontFamily: 'var(--font-playfair), serif', fontSize: '28px', 
            fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px', lineHeight: 1.2 
          }}>
            {tile.title}
          </h1>
          
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
            By {tile.creator} · {tile.id || tile._id}
          </div>

          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
            {tile.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
            {[
              { label: 'Dimensions', val: tile.dimensions },
              { label: 'Material', val: tile.material },
              { label: 'Finish', val: tile.finish },
              { label: 'Usage', val: tile.usage },
            ].map((spec) => (
              <div key={spec.label} style={{ background: 'var(--color-background-secondary)', borderRadius: '8px', padding: '8px 10px' }}>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  {spec.val}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '30px', color: '#b5651d', fontWeight: 700, marginBottom: '16px' }}>
            ${tile.price} <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/{tile.currency === 'USD' ? 'sqm' : 'unit'}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ flex: 1, background: '#b5651d', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
              Add to Wishlist
            </button>
            <button style={{ flex: 1, background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '8px', padding: '10px', fontSize: '13px', cursor: 'pointer' }}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}