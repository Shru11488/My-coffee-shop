'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { menuCategories } from '@/data/menuData';
import MenuItemCard from '@/components/MenuItemCard';
import { useAppSelector } from '@/store/hooks';
import { selectCartCount, selectCartSubtotal } from '@/store/cartSlice';

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
    const cartCount = useAppSelector(selectCartCount);
    const cartSubtotal = useAppSelector(selectCartSubtotal);
    const activeMenuCategory = menuCategories.find(c => c.id === activeCategory)!;

    return (
        <section id="menu" style={{ background: 'var(--dark-roast)', paddingBottom: cartCount > 0 ? '7rem' : '4rem' }}>
            {/* Section Header */}
            <div style={{
                background: 'linear-gradient(135deg, var(--espresso) 0%, var(--dark-roast) 100%)',
                borderBottom: '1px solid rgba(200,134,10,0.2)',
                padding: '5rem 0 2.5rem',
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Brew Haven Coffee Co.
                    </p>
                    <h2 className="section-title">
                        Our <span>Menu</span>
                    </h2>
                    <div className="divider" />
                    <p className="section-subtitle">
                        Explore {menuCategories.reduce((acc, c) => acc + c.items.length, 0)}+ handcrafted items across {menuCategories.length} categories
                    </p>
                </div>
            </div>

            {/* Category Tabs */}
            <div style={{
                background: 'rgba(26,15,10,0.95)',
                borderBottom: '1px solid rgba(200,134,10,0.15)',
                position: 'sticky', top: '72px', zIndex: 10,
                backdropFilter: 'blur(12px)',
            }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', padding: '0.75rem 0', scrollbarWidth: 'none' }}>
                        {menuCategories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.6rem 1.1rem',
                                    borderRadius: '50px',
                                    border: '1px solid',
                                    fontSize: '0.85rem', fontWeight: 500,
                                    whiteSpace: 'nowrap', transition: 'all 0.2s',
                                    borderColor: activeCategory === cat.id ? 'var(--amber)' : 'rgba(200,134,10,0.2)',
                                    background: activeCategory === cat.id ? 'var(--amber)' : 'transparent',
                                    color: activeCategory === cat.id ? 'var(--dark-roast)' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                }}
                            >
                                <Image src={cat.image} alt={cat.name} width={20} height={20} style={{ objectFit: 'contain', borderRadius: '50%' }} />
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '0.25rem' }}>
                        {activeMenuCategory.name}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{activeMenuCategory.description}</p>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.25rem',
                }}>
                    {activeMenuCategory.items.map(item => (
                        <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>

            {/* Sticky Cart Bar */}
            {cartCount > 0 && (
                <div style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(135deg,var(--amber),var(--amber-light))',
                    padding: '1rem 1.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    boxShadow: '0 -4px 30px rgba(200,134,10,0.4)',
                    zIndex: 100,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'rgba(0,0,0,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <ShoppingCart size={18} color="var(--dark-roast)" />
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--dark-roast)', fontSize: '0.95rem' }}>
                            {cartCount} item{cartCount > 1 ? 's' : ''} in cart
                        </span>
                    </div>
                    <Link href="/cart" style={{
                        background: 'var(--dark-roast)', color: 'var(--amber)',
                        padding: '0.6rem 1.25rem', borderRadius: '50px',
                        fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                    }}>
                        View Cart • ₹{cartSubtotal}
                    </Link>
                </div>
            )}
        </section>
    );
}
