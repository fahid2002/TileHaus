import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
});

export const metadata = {
  title: 'TileHaus – Discover Your Perfect Aesthetic',
  description: 'Premium tile gallery for architects, designers, and homeowners.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        <Providers>
          <Navbar />
          
          <main style={{ flex: 1 }}>
            {children}
          </main>
          
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}