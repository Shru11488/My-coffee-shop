import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/components/ReduxProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brew Haven Coffee Co. – Premium Coffee Experience',
  description:
    'Welcome to Brew Haven Coffee Co. – where every bean tells a story. Order fresh handcrafted coffee, desserts, and more.',
  keywords: 'coffee shop, espresso, latte, cappuccino, cold brew, Brew Haven, café',
  openGraph: {
    title: 'Brew Haven Coffee Co.',
    description: 'Premium handcrafted coffee and more – Order Online.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
