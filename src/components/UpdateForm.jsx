'use client';
import { useState, useRef } from 'react';
import { updateUser } from '@/lib/auth.client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Input, Button } from '@heroui/react';

export default function UpdateForm({ user }) {
  const [name, setName] = useState(user.name || '');
  const [image, setImage] = useState(user.image || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Reference for the hidden file input
  const fileInputRef = useRef(null);

  const initials = user.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  // Handle direct file upload and convert to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Ensure it's actually an image
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // This converts the image into a Base64 string that acts as a URL
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
        maxWidth: '400px', // Slightly wider to accommodate the new button
        margin: '0 auto', padding: '28px',
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
            // If they uploaded an image, show a preview here!
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {!image && initials}
          </div>
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
          <Input 
            type="text" 
            placeholder="Rahim Hossain" 
            value={name} 
            size="lg" // Increased size
            onChange={(e) => setName(e.target.value)} 
            style={{ marginBottom: '12px' }} 
          />

          <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px', display: 'block' }}>Photo URL or Upload</label>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <Input 
              type="url" 
              placeholder="https://example.com/photo.jpg" 
              value={image} 
              size="lg" // Increased size
              onChange={(e) => setImage(e.target.value)} 
              style={{ flex: 1 }} 
            />
            <Button 
              type="button" 
              onClick={() => fileInputRef.current.click()} 
              style={{ 
                height: 'auto', 
                background: 'var(--color-background-secondary)', 
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border-tertiary)',
                borderRadius: '8px'
              }}
            >
              Browse
            </Button>
          </div>

          {/* Hidden file input triggered by the Browse button */}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />

          <div style={{
            background: 'var(--color-background-secondary)', borderRadius: '8px',
            padding: '10px 12px', marginBottom: '12px',
            fontSize: '11px', color: 'var(--color-text-secondary)',
          }}>
            Using BetterAuth <code>updateUser</code> — only name and image can be changed here.
          </div>

          <Button type="submit" isLoading={loading} style={{
            width: '100%', background: '#b5651d', color: '#fff',
            border: 'none', borderRadius: '8px', padding: '10px',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginBottom: '8px',
            height: '44px' // Made the save button a bit taller to match the larger inputs
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