'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCartItems, selectCartSubtotal, removeItem, updateQuantity, clearCart } from '@/store/cartSlice';
import { placeOrder } from '@/store/orderSlice';

const TAX_RATE = 0.05;

export default function CartPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const items = useAppSelector(selectCartItems);
    const subtotal = useAppSelector(selectCartSubtotal);
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;

    const handlePlaceOrder = () => {
        dispatch(placeOrder({ items, subtotal, tax, total }));
        dispatch(clearCart());
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--dark-roast)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '5rem' }}>☕</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--cream)' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Looks like you haven&apos;t added anything yet.</p>
                <Link href="/menu" className="btn btn-primary"><ShoppingBag size={18} /> Browse Menu</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--dark-roast)' }}>
            {/* Header */}
            <div style={{ background: 'var(--espresso)', borderBottom: '1px solid rgba(200,134,10,0.2)', padding: '2rem 0' }}>
                <div className="container">
                    <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem', transition: 'color 0.2s' }}>
                        <ArrowLeft size={16} /> Back to Menu
                    </Link>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--cream)' }}>
                        Your <span style={{ color: 'var(--amber)' }}>Cart</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{items.reduce((s, i) => s + i.quantity, 0)} item(s)</p>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

                    {/* Cart Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {items.map(item => (
                            <div key={item.cartId} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
                                <div style={{ width: 70, height: 70, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--espresso)', flexShrink: 0, position: 'relative' }}>
                                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '6px' }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.95rem' }}>{item.name}</div>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                                        {[item.size, item.milk !== 'Whole' ? item.milk : null, item.temp !== 'N/A' ? item.temp : null]
                                            .filter(Boolean)
                                            .map((tag, i) => (
                                                <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '50px', background: 'rgba(200,134,10,0.12)', color: 'var(--amber)', border: '1px solid rgba(200,134,10,0.2)' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <button onClick={() => dispatch(updateQuantity({ cartId: item.cartId, quantity: Math.max(1, item.quantity - 1) }))} style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(200,134,10,0.3)', background: 'rgba(200,134,10,0.1)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Minus size={12} />
                                            </button>
                                            <span style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem', minWidth: '1.2rem', textAlign: 'center' }}>{item.quantity}</span>
                                            <button onClick={() => dispatch(updateQuantity({ cartId: item.cartId, quantity: item.quantity + 1 }))} style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(200,134,10,0.3)', background: 'rgba(200,134,10,0.1)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ fontWeight: 700, color: 'var(--amber)', fontSize: '0.95rem' }}>₹{item.finalPrice * item.quantity}</span>
                                            <button onClick={() => dispatch(removeItem(item.cartId))} style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(200,134,10,0.15)' }}>
                            Order Summary
                        </h3>
                        {[
                            ['Subtotal', `₹${subtotal}`],
                            [`Tax (${TAX_RATE * 100}%)`, `₹${tax}`],
                        ].map(([label, val]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                                <span style={{ color: 'var(--cream)' }}>{val}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderTop: '1px solid rgba(200,134,10,0.2)', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--cream)', fontSize: '1.05rem' }}>Total</span>
                            <span style={{ fontWeight: 700, color: 'var(--amber)', fontSize: '1.2rem' }}>₹{total}</span>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.95rem' }} onClick={handlePlaceOrder}>
                            Place Order
                        </button>

                        <Link href="/menu" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>

                        {/* Info */}
                        <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: 'rgba(200,134,10,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(200,134,10,0.15)' }}>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'center' }}>
                                ✅ Fresh preparation guaranteed<br />⏱ Ready in 15–20 minutes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
