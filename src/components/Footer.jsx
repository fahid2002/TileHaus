import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#1c140d', padding: '32px 24px 20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '24px',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '16px',
            color: '#f5ede0',
            marginBottom: '10px',
            fontWeight: 700,
          }}>
            Tile<span style={{ color: '#b5651d' }}>Haus</span>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(245,237,224,0.4)', lineHeight: 1.7 }}>
            Premium tile gallery for architects, designers, and homeowners.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '14px', color: '#f5ede0', marginBottom: '10px' }}>Explore</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Link href="/" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>Home</Link>
            <Link href="/all-tiles" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>All Tiles</Link>
            <Link href="/all-tiles?category=ceramic" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>Ceramic</Link>
            <Link href="/all-tiles?category=marble" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>Marble</Link>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '14px', color: '#f5ede0', marginBottom: '10px' }}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)' }}>hello@tilehaus.com</span>
            <span style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)' }}>+88 01700-000000</span>
            <span style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)' }}>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '0.5px solid rgba(245,237,224,0.1)',
        paddingTop: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(245,237,224,0.35)' }}>© 2025 TileHaus. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['f', 'tw', 'ig'].map((icon) => (
            <div key={icon} style={{
              width: '28px', height: '28px', borderRadius: '6px',
              background: 'rgba(245,237,224,0.08)',
              border: '0.5px solid rgba(245,237,224,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', color: 'rgba(245,237,224,0.5)', cursor: 'pointer',
            }}>{icon}</div>
          ))}
        </div>
      </div>
    </footer>
  );
}