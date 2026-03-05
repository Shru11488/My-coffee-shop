'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart, Coffee, Menu, X } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/cartSlice';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Contact', href: '/contact' },
];

function isActive(pathname: string, hash: string, href: string): boolean {
    if (href.includes('#')) {
        const [hrefPath, hrefHash] = href.split('#');
        return pathname === (hrefPath || '/') && hash === `#${hrefHash}`;
    }
    // For plain paths, only match exactly (so '/' doesn't stay active on '/menu')
    return pathname === href;
}

export default function Navbar() {
    const pathname = usePathname();
    const cartCount = useAppSelector(selectCartCount);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hash, setHash] = useState('');

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        // Sync hash on mount and whenever it changes
        setHash(window.location.hash);
        const onHashChange = () => setHash(window.location.hash);
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease',
                background: isScrolled
                    ? 'rgba(26, 15, 10, 0.97)'
                    : 'rgba(26, 15, 10, 0.75)',
                backdropFilter: 'blur(20px)',
                borderBottom: isScrolled
                    ? '1px solid rgba(200, 134, 10, 0.3)'
                    : '1px solid transparent',
                boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #C8860A, #E0A020)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Coffee size={20} color="#1A0F0A" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--cream)' }}>
                        Brew<span style={{ color: 'var(--amber)' }}>Haven</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                color: isActive(pathname, hash, link.href) ? 'var(--amber)' : 'var(--cream)',
                                transition: 'color 0.2s',
                                paddingBottom: '2px',
                                borderBottom: isActive(pathname, hash, link.href) ? '2px solid var(--amber)' : '2px solid transparent',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Cart + Mobile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                        <ShoppingCart size={24} color="var(--cream)" />
                        {cartCount > 0 && (
                            <span className="badge" style={{ position: 'absolute', top: -4, right: -4, fontSize: '0.65rem' }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', color: 'var(--cream)', padding: '0.5rem' }} className="mobile-menu-btn">
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div style={{
                    background: 'rgba(26, 15, 10, 0.98)',
                    borderTop: '1px solid rgba(200,134,10,0.2)',
                    padding: '1rem 0',
                }}>
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: 'block',
                                padding: '0.75rem 1.5rem',
                                color: isActive(pathname, hash, link.href) ? 'var(--amber)' : 'var(--cream)',
                                fontWeight: 500,
                                fontSize: '1rem',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </header>
    );
}
