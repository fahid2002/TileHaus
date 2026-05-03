'use client';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth.client';
import { Button } from '@heroui/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

// A small custom component to handle Hover and Active states
const NavItem = ({ href, children, currentPath }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if this link is the current active page
  const isActive = href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontSize: '13px',
        textDecoration: 'none',
        fontWeight: isActive ? 600 : 500,
        color: isActive ? '#b5651d' : (isHovered ? '#b5651d' : 'var(--color-text-secondary)'),
        transition: 'all 0.2s ease',
        borderBottom: isActive ? '2px solid #b5651d' : '2px solid transparent',
        paddingBottom: '4px'
      }}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Gets the current URL path
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
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

      {/* Nav Links with Hover and Active States */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '4px' }}>
        <NavItem href="/" currentPath={pathname}>Home</NavItem>
        <NavItem href="/all-tiles" currentPath={pathname}>All Tiles</NavItem>
      </div>

      {/* Auth Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isPending ? null : session ? (
          // Custom Bulletproof Dropdown Container
          <div style={{ position: 'relative' }}>
            
            {/* The Avatar / Trigger */}
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              style={{ cursor: 'pointer' }}
            >
              {session.user.image ? (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-border-tertiary)' }} 
                />
              ) : (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: '#c9956e', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600
                }}>
                  {session.user.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>

            {/* The Floating Menu */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '42px',
                right: 0,
                background: 'var(--color-background-primary)',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '6px 0',
                width: '140px',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 101,
              }}>
                <button 
                  onClick={() => { setDropdownOpen(false); router.push('/my-profile'); }}
                  style={{
                    background: 'transparent', border: 'none', padding: '8px 16px',
                    textAlign: 'left', fontSize: '13px', color: 'var(--color-text-primary)', cursor: 'pointer',
                  }}
                  onMouseOver={(e) => e.target.style.background = 'var(--color-background-secondary)'}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                  My Profile
                </button>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'transparent', border: 'none', padding: '8px 16px',
                    textAlign: 'left', fontSize: '13px', color: '#d32f2f', cursor: 'pointer',
                  }}
                  onMouseOver={(e) => e.target.style.background = '#ffebee'}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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