'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle, Printer, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentOrder } from '@/store/orderSlice';

function formatDate(iso: string) {
    return new Date(iso).toLocaleString('en-IN', {
        dateStyle: 'long', timeStyle: 'short',
    });
}

export default function CheckoutPage() {
    const order = useAppSelector(selectCurrentOrder);
    const router = useRouter();

    if (!order) {
        return (
            <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--dark-roast)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem' }}>🧾</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--cream)' }}>No order found</h2>
                <p style={{ color: 'var(--text-muted)' }}>Please place an order from the cart first.</p>
                <Link href="/menu" className="btn btn-primary"><ShoppingBag size={16} /> Go to Menu</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--dark-roast)', padding: '7rem 0 4rem' }}>
            <div className="container" style={{ maxWidth: 720 }}>

                {/* Success header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'linear-gradient(135deg,var(--amber),var(--amber-light))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 8px 30px rgba(200,134,10,0.4)',
                    }}>
                        <CheckCircle size={36} color="var(--dark-roast)" strokeWidth={2.5} />
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>
                        Order Confirmed!
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Thank you for choosing Brew Haven. Your order is being prepared! ☕
                    </p>
                </div>

                {/* Receipt Card */}
                <div id="receipt" className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* Receipt Header */}
                    <div style={{
                        background: 'linear-gradient(135deg,var(--espresso),var(--brown-mid))',
                        padding: '2rem',
                        borderBottom: '2px dashed rgba(200,134,10,0.3)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--cream)', fontWeight: 700 }}>
                                    ☕ Brew Haven Coffee Co.
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>123 Campsite Avenue, Wilderness, CA</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Order Number</div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--amber)', fontWeight: 700 }}>{order.orderNumber}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{formatDate(order.placedAt)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div style={{ padding: '1.5rem 2rem' }}>
                        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                            Order Items
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                            {order.items.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'var(--espresso)', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '4px' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.9rem' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                                            {item.size}
                                            {item.milk !== 'Whole' && ` · ${item.milk} Milk`}
                                            {item.temp !== 'N/A' && ` · ${item.temp}`}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>×{item.quantity}</div>
                                        <div style={{ fontWeight: 700, color: 'var(--amber)', fontSize: '0.95rem' }}>₹{item.finalPrice * item.quantity}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div style={{ borderTop: '2px dashed rgba(200,134,10,0.3)', padding: '1.25rem 2rem', background: 'rgba(0,0,0,0.2)' }}>
                        {[['Subtotal', `₹${order.subtotal}`], ['Tax (5%)', `₹${order.tax}`]].map(([l, v]) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>{l}</span>
                                <span style={{ color: 'var(--cream)' }}>{v}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(200,134,10,0.2)' }}>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--cream)', fontWeight: 700 }}>Total Paid</span>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--amber)', fontWeight: 700 }}>₹{order.total}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ borderTop: '1px solid rgba(200,134,10,0.1)', padding: '1rem 2rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            Thank you for your order! ❤️ Ready in approx. 15–20 minutes.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-outline" onClick={() => window.print()}>
                        <Printer size={16} /> Print Receipt
                    </button>
                    <Link href="/menu" className="btn btn-primary">
                        <ShoppingBag size={16} /> Order Again
                    </Link>
                </div>
            </div>

            <style>{`
        @media print {
          header, footer, .btn { display: none !important; }
          #receipt { border: none !important; box-shadow: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
        </div>
    );
}
