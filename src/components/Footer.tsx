'use client';
import Link from 'next/link';
import { Coffee, Facebook, Instagram, Twitter } from 'lucide-react';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Contact', href: '/contact' },
    { label: 'Cart', href: '/cart' },
];

export default function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(180deg, var(--espresso) 0%, var(--dark-roast) 100%)',
            borderTop: '1px solid rgba(200,134,10,0.2)',
            padding: '4rem 0 2rem',
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #C8860A, #E0A020)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Coffee size={18} color="#1A0F0A" strokeWidth={2.5} />
                            </div>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--cream)' }}>
                                Brew<span style={{ color: 'var(--amber)' }}>Haven</span>
                            </span>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 220 }}>
                            Where every bean tells a story and every cup sparks joy. Welcome to Brew Haven.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: 'rgba(200,134,10,0.12)',
                                    border: '1px solid rgba(200,134,10,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--amber)', transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--amber)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(200,134,10,0.12)')}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '1rem' }}>
                            Quick Links
                        </h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {quickLinks.map(l => (
                                <li key={l.href}>
                                    <Link href={l.href} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--amber)')}
                                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text-muted)')}
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '1rem' }}>
                            Contact Info
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {[
                                '123 Campsite Avenue, Wilderness, CA 98765',
                                'info@brewhavencoffee.com',
                                '(123) 456-7899',
                            ].map((t, i) => (
                                <p key={i} style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{t}</p>
                            ))}
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '1rem' }}>
                            Opening Hours
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {[
                                ['Mon – Fri', '9:00 AM – 9:00 PM'],
                                ['Saturday', '10:00 AM – 7:00 PM'],
                                ['Sunday', 'Closed'],
                            ].map(([day, hrs]) => (
                                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--cream-dark)' }}>{day}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>{hrs}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(200,134,10,0.15)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        © {new Date().getFullYear()} Brew Haven Coffee Co. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy Policy', 'Refund Policy'].map(p => (
                            <Link key={p} href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--amber)')}
                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >
                                {p}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
