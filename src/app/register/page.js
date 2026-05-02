'use client';
import { useState } from 'react';
import { signUp, signIn } from '@/lib/auth.client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Input, Button } from '@heroui/react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', photoUrl: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.photoUrl,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || 'Registration failed.');
    } else {
      toast.success('Account created! Please login.');
      router.push('/login');
    }
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh', paddingBottom: '24px', paddingTop: '24px' }}>
      <div style={{
        maxWidth: '360px', margin: '0 auto',
        padding: '28px',
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: '12px',
      }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Create account
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>Join TileHaus to explore premium tiles</p>

        <form onSubmit={handleRegister}>
          {[
            { label: 'Full name', name: 'name', type: 'text', placeholder: 'Rahim Hossain' },
            { label: 'Email address', name: 'email', type: 'email', placeholder: 'rahim@example.com' },
            { label: 'Photo URL', name: 'photoUrl', type: 'url', placeholder: 'https://example.com/photo.jpg' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.name}>
              <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px', display: 'block' }}>{field.label}</label>
              <Input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required={field.name !== 'photoUrl'}
                style={{ marginBottom: '12px' }}
              />
            </div>
          ))}

          <Button type="submit" isLoading={loading} style={{
            width: '100%', background: '#b5651d', color: '#fff',
            border: 'none', borderRadius: '8px', padding: '10px',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginTop: '4px', marginBottom: '10px',
          }}>
            Register
          </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '12px 0' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--color-border-tertiary)' }} />
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>or continue with</span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--color-border-tertiary)' }} />
        </div>

        <button onClick={handleGoogle} style={{
          width: '100%', background: 'var(--color-background-secondary)',
          color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: '8px', padding: '9px', fontSize: '13px', cursor: 'pointer',
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
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#b5651d', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}