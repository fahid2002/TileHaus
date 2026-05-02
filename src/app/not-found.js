import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      textAlign: 'center', padding: '80px 20px',
      minHeight: '80vh', background: 'var(--color-background-tertiary)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-playfair), serif',
        fontSize: '80px', fontWeight: 700,
        color: 'var(--color-border-tertiary)', lineHeight: 1,
      }}>404</div>
      <div style={{ fontSize: '16px', color: 'var(--color-text-secondary)', margin: '10px 0 20px' }}>
        This page could not be found.
      </div>
      <Link href="/" style={{
        background: '#b5651d', color: '#fff',
        borderRadius: '8px', padding: '10px 24px',
        fontSize: '13px', textDecoration: 'none', fontWeight: 500,
      }}>
        Back to Home
      </Link>
    </div>
  );
}