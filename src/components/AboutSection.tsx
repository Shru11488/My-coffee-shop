import Image from 'next/image';
import { Leaf, Award, Heart } from 'lucide-react';

const highlights = [
    { Icon: Leaf, title: 'Ethically Sourced', desc: 'Beans directly from fair-trade farms across the globe.' },
    { Icon: Award, title: 'Award Winning', desc: 'Recognised for excellence in artisan brewing.' },
    { Icon: Heart, title: 'Made with Love', desc: 'Every cup handcrafted by our passionate baristas.' },
];

export default function AboutSection() {
    return (
        <section id="about" style={{ background: 'linear-gradient(180deg, var(--dark-roast) 0%, #0F0803 100%)', padding: '6rem 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    {/* Image */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            border: '1px solid rgba(200,134,10,0.2)',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                            aspectRatio: '4/5',
                            position: 'relative',
                        }}>
                            <Image src="/images/about-image.jpg" alt="About Brew Haven" fill style={{ objectFit: 'cover' }} />
                        </div>
                        {/* floating badge */}
                        <div style={{
                            position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
                            background: 'linear-gradient(135deg, var(--amber), var(--amber-light))',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.25rem 1.5rem',
                            textAlign: 'center',
                            boxShadow: '0 10px 30px rgba(200,134,10,0.4)',
                        }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--dark-roast)', lineHeight: 1 }}>6+</div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--dark-roast)', marginTop: '0.25rem' }}>Years of<br />Excellence</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <p style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            Our Story
                        </p>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0.75rem' }}>
                            About <span>Us</span>
                        </h2>
                        <div className="divider" style={{ margin: '0 0 1.5rem' }} />

                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
                            At Brew Haven Coffee Co., we believe a great cup of coffee can turn an ordinary moment into something special.
                            What started as a small passion for handcrafted brews has grown into a cosy space where friends meet, ideas spark, and flavours come alive.
                        </p>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '2rem' }}>
                            We source our beans from trusted fair-trade growers, roast them with care, and craft each cup with attention to detail.
                            Whether you&apos;re here for your morning boost, a peaceful work corner, or a sweet treat with friends — our café is designed to make you feel at home.
                        </p>

                        {/* Highlights */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {highlights.map(({ Icon, title, desc }) => (
                                <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                                        background: 'rgba(200,134,10,0.12)',
                                        border: '1px solid rgba(200,134,10,0.25)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--amber)',
                                    }}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{title}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
