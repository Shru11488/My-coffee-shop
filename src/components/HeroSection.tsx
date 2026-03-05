'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

const words = ['Premium Coffee', 'Artisan Brews', 'Perfect Moments'];

export default function HeroSection() {
    const [wordIdx, setWordIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 3000);
        return () => clearInterval(t);
    }, []);

    return (
        <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image src="/images/about-image.jpg" alt="Coffee Background" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
                <div className="hero-overlay" />
                {/* Gradient bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, var(--dark-roast), transparent)' }} />
            </div>

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem' }}>
                <div style={{ maxWidth: 680 }}>
                    {/* Tagline badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(200,134,10,0.15)',
                        border: '1px solid rgba(200,134,10,0.4)',
                        borderRadius: '50px',
                        padding: '0.4rem 1rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.85rem', fontWeight: 500,
                        color: 'var(--amber)',
                        backdropFilter: 'blur(8px)',
                    }}>
                        ☕ Handcrafted with passion since 2018
                    </div>

                    <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)', marginBottom: '0.5rem', fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.1 }}>
                        Best
                    </h1>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        minHeight: '1.2em',
                        transition: 'opacity 0.5s ease',
                    }}>
                        <span className="gradient-text">{words[wordIdx]}</span>
                    </h1>

                    <p style={{ fontSize: '1.1rem', color: 'rgba(253,246,236,0.8)', maxWidth: 480, lineHeight: 1.8, marginBottom: '2.5rem' }}>
                        Welcome to our coffee paradise — where every bean tells a story, every cup sparks joy, and every moment becomes special.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/#menu" className="btn btn-primary" style={{ fontSize: '1rem' }}>
                            <ShoppingBag size={18} />
                            Order Now
                        </Link>
                        <Link href="/#contact" className="btn btn-outline" style={{ fontSize: '1rem' }}>
                            <Phone size={18} />
                            Contact Us
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
                        {[['500+', 'Daily Orders'], ['50+', 'Menu Items'], ['4.9★', 'Rating']].map(([num, label]) => (
                            <div key={label}>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--amber)' }}>{num}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating coffee image */}
            <div style={{
                position: 'absolute', right: '5%', bottom: '10%', zIndex: 1,
                width: 'clamp(220px, 35vw, 450px)',
                animation: 'float 4s ease-in-out infinite',
            }}>
                <Image src="/images/coffee-hero-section.png" alt="Coffee Cup" width={450} height={450} style={{ objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }} priority />
            </div>

            <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          div[style*="right: 5%"] { display: none; }
        }
      `}</style>
        </section>
    );
}
