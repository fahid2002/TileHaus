import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { id: 'f', label: 'fb', url: 'https://www.facebook.com/fh.ifty.1/' },
    { id: 'tw', label: 'X', url: 'https://x.com/fh_ifty' },
    { id: 'ig', label: 'ig', url: 'https://www.instagram.com/fahidhasankhanifty/' },
  ];

  return (
    <footer style={{ background: '#1c140d', padding: '32px 24px 20px' }}>
      <div style={{
        display: 'grid',
       
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '24px',
      }}>
        {/* Column 1: Brand */}
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

        {/* Column 2: Explore */}
        <div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '14px', color: '#f5ede0', marginBottom: '10px' }}>Explore</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Link href="/" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>Home</Link>
            <Link href="/all-tiles" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>All Tiles</Link>
            <Link href="/all-tiles?category=ceramic" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>Ceramic</Link>
            <Link href="/all-tiles?category=marble" style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)', textDecoration: 'none' }}>Marble</Link>
          </div>
        </div>

       
        {/* Column 3: Contact & Direct Message */}
        <div>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '14px', color: '#f5ede0', marginBottom: '10px' }}>Contact Us</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)' }}>fahidhasanifty20@gmail.com</span>
            <span style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)' }}>+88 01749573951</span>
            <span style={{ fontSize: '12px', color: 'rgba(245,237,224,0.5)' }}>Dhaka, Bangladesh</span>
            
            {/* Direct message button using WhatsApp API */}
            <a 
              href="https://wa.me/8801749573951?text=Hello%20TileHaus,%20I%20have%20an%20inquiry!" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '8px',
                display: 'inline-block',
                background: '#25D366', 
                color: '#000',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 600,
                width: 'fit-content',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{
        borderTop: '0.5px solid rgba(245,237,224,0.1)',
        paddingTop: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(245,237,224,0.35)' }}>© 2026 TileHaus. All rights reserved.</span>
        
        {/* Social Links Output */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {socialLinks.map((social) => (
            <a 
              key={social.id} 
              href={social.url}
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '28px', height: '28px', borderRadius: '6px',
                background: 'rgba(245,237,224,0.08)',
                border: '0.5px solid rgba(245,237,224,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: 'rgba(245,237,224,0.5)', 
                cursor: 'pointer', textDecoration: 'none'
              }}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}