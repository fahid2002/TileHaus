'use client';
import { useState } from 'react';
import { updateUser } from '@/lib/auth.client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input, Button } from '@heroui/react';

export default function UpdateForm({ user }) {
  const [name, setName] = useState(user.name || '');
  const [image, setImage] = useState(user.image || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initials = user.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await updateUser({ name, image });
    setLoading(false);
    if (error) {
      toast.error(error.message || 'Update failed.');
    } else {
      toast.success('Profile updated!');
      router.push('/my-profile');
    }
  };

  return (
    <div style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh', paddingBottom: '24px', paddingTop: '24px' }}>
      <div style={{
        maxWidth: '360px', margin: '0 auto', padding: '28px',
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: '12px',
      }}>
        {/* Mini profile header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: '#c9956e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-playfair), serif', fontSize: '16px', color: '#fff',
          }}>{initials}</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{user.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Update your profile info</div>
          </div>
        </div>

        <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
          Update Information
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>Changes will reflect on your profile</p>

        <form onSubmit={handleUpdate}>
          <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px', display: 'block' }}>Full name</label>
          <Input type="text" placeholder="Rahim Hossain" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: '12px' }} />

          <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px', display: 'block' }}>Photo URL</label>
          <Input type="url" placeholder="https://example.com/photo.jpg" value={image} onChange={(e) => setImage(e.target.value)} style={{ marginBottom: '12px' }} />

          <div style={{
            background: 'var(--color-background-secondary)', borderRadius: '8px',
            padding: '10px 12px', marginBottom: '12px',
            fontSize: '11px', color: 'var(--color-text-secondary)',
          }}>
            Using BetterAuth <code>updateUser</code> — only name and image URL can be changed here.
          </div>

          <Button type="submit" isLoading={loading} style={{
            width: '100%', background: '#b5651d', color: '#fff',
            border: 'none', borderRadius: '8px', padding: '10px',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginBottom: '8px',
          }}>
            Save Changes
          </Button>
        </form>

        <button onClick={() => router.back()} style={{
          width: '100%', background: 'transparent',
          color: 'var(--color-text-secondary)', border: 'none',
          padding: '8px', fontSize: '12px', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          Cancel
        </button>
      </div>
    </div>
  );
}