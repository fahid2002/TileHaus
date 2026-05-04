import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function MyProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const user = session.user;
  const initials = user.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-tertiary)' }}>
      {/* Profile Header */}
      <div style={{
        background: 'var(--color-background-primary)',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '28px 24px',
        display: 'flex', alignItems: 'center', gap: '18px',
      }}>
        {user.image ? (
          <img src={user.image} alt={user.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: '#c9956e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-playfair), serif', fontSize: '22px', color: '#fff', flexShrink: 0,
          }}>{initials}</div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{user.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{user.email}</div>
          <div style={{ marginTop: '6px' }}>
            <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 500, background: '#f0e6d3', color: '#8b5e2d' }}>Member since 2025</span>
          </div>
        </div>
        <Link href="/my-profile/update" style={{
          background: 'var(--color-background-secondary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: '8px', padding: '7px 14px',
          fontSize: '12px', color: 'var(--color-text-primary)',
          textDecoration: 'none',
        }}>Edit Profile</Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '16px 20px' }}>
        {[
          { num: '24', label: 'Tiles Viewed' },
          { num: '8', label: 'Wishlist' },
          { num: '3', label: 'Collections' },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'var(--color-background-primary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: '8px', padding: '12px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '22px', fontWeight: 600, color: '#b5651d' }}>{s.num}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Account Details */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontSize: '16px', fontFamily: 'var(--font-playfair), serif', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '14px' }}>Account Details</div>
        <div style={{ display: 'grid', gap: '8px' }}>
          {[
            { label: 'Name', val: user.name },
            { label: 'Email', val: user.email },
            { label: 'Avatar', val: user.image || 'Not set' },
          ].map((item) => (
            <div key={item.label} style={{
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: '8px', padding: '12px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',

              minWidth: 0, 
            }}>
              <div style={{ width: '100%', minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</div>
                <div style={{ 
                  fontSize: '14px', 
                  color: 'var(--color-text-primary)', 
                  marginTop: '2px',

                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {item.val}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/my-profile/update" style={{
          display: 'block', marginTop: '16px', width: '100%',
          background: '#b5651d', color: '#fff', border: 'none',
          borderRadius: '8px', padding: '10px',
          fontSize: '13px', fontWeight: 500, cursor: 'pointer',
          textAlign: 'center', textDecoration: 'none',
        }}>
          Update Information
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}