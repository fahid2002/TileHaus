'use client';
import { useState } from 'react';
import { signIn } from '@/lib/auth.client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Input, Button } from '@heroui/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || 'Login failed. Check your credentials.');
    } else {
      toast.success('Welcome back!');
      router.push('/');
    }
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh', paddingBottom: '24px', paddingTop: '24px' }}>
      <div style={{
        width: '100%', 
        maxWidth: '340px', 
        margin: '0 auto',
        padding: '28px',
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: '12px',
      }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>Sign in to your TileHaus account</p>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px', display: 'block' }}>Email address</label>
          <Input 
            type="email" 
            placeholder="tilehaus@gmail.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ 
              marginBottom: '12px', 
              width: '100%', 
              fontSize: '14px', 
              padding: '10px 12px' 
            }} 
          />

          <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px', display: 'block' }}>Password</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ 
              marginBottom: '4px', 
              width: '100%', 
              fontSize: '14px',
              padding: '10px 12px' 
            }} 
          />

          <Button type="submit" isLoading={loading} style={{
            width: '100%', background: '#b5651d', color: '#fff',
            border: 'none', borderRadius: '8px', padding: '12px', 
            fontSize: '14px', fontWeight: 500, cursor: 'pointer', marginTop: '12px', marginBottom: '10px',
          }}>
            Login
          </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--color-border-tertiary)' }} />
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>or continue with</span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--color-border-tertiary)' }} />
        </div>

        <button onClick={handleGoogle} style={{
          width: '100%', background: 'var(--color-background-secondary)',
          color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: '8px', padding: '10px', fontSize: '13px', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '14px' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: '#b5651d', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}