'use client';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth.client';
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav style={{
      background: 'var(--color-background-primary)',
      borderBottom: '0.5px solid var(--color-border-tertiary)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '56px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'var(--font-playfair), serif',
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        textDecoration: 'none',
        letterSpacing: '-0.5px',
      }}>
        Tile<span style={{ color: '#b5651d' }}>Haus</span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Home</Link>
        <Link href="/all-tiles" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>All Tiles</Link>
        {session && (
          <Link href="/my-profile" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>My Profile</Link>
        )}
      </div>

      {/* Auth Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isPending ? null : session ? (
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                src={session.user.image || null}
                name={session.user.name?.charAt(0) || 'U'}
                size="sm"
                style={{ cursor: 'pointer', background: '#c9956e', color: '#fff' }}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="profile" onPress={() => router.push('/my-profile')}>My Profile</DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            onPress={() => router.push('/login')}
            size="sm"
            style={{
              background: '#b5651d',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 16px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}