'use client';
import { signOut } from '@/lib/auth.client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <button onClick={handleLogout} style={{
      marginTop: '8px', width: '100%',
      background: 'var(--color-background-secondary)',
      color: 'var(--color-text-primary)',
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: '8px', padding: '10px',
      fontSize: '13px', cursor: 'pointer',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      Logout
    </button>
  );
}