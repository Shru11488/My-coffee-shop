'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { MenuItem, SizeType, MilkType, TempType, SIZE_ADJUSTMENTS, MILK_ADJUSTMENTS } from '@/data/menuData';
import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/cartSlice';

interface Props { item: MenuItem; }

const SIZES: SizeType[] = ['Small', 'Medium', 'Large'];
const MILKS: MilkType[] = ['Whole', 'Oat', 'Almond'];
const TEMPS: TempType[] = ['Hot', 'Iced'];

export default function MenuItemCard({ item }: Props) {
    const dispatch = useAppDispatch();
    const [size, setSize] = useState<SizeType>('Medium');
    const [milk, setMilk] = useState<MilkType>('Whole');
    const [temp, setTemp] = useState<TempType>('Hot');
    const [quantity, setQty] = useState(1);
    const [expanded, setExpanded] = useState(false);

    const finalPrice =
        item.basePrice +
        SIZE_ADJUSTMENTS[size] +
        (item.hasMilkOption ? MILK_ADJUSTMENTS[milk] : 0);

    const handleAdd = () => {
        const cartId = `${item.id}-${size}-${item.hasMilkOption ? milk : 'NA'}-${item.hasTempOption ? temp : 'NA'}`;
        dispatch(addItem({
            cartId,
            id: item.id,
            name: item.name,
            image: item.image,
            categoryId: item.categoryId,
            basePrice: item.basePrice,
            size,
            milk: item.hasMilkOption ? milk : 'Whole',
            temp: item.hasTempOption ? temp : 'N/A',
            finalPrice,
            quantity,
        }));
        toast.success(`${item.name} added to cart!`);
        setQty(1);
        setExpanded(false);
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Image */}
            <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: 'var(--espresso)' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '1rem', transition: 'transform 0.4s ease' }} className="menu-card-img" />
                <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: 'linear-gradient(135deg,var(--amber),var(--amber-light))',
                    borderRadius: '50px', padding: '0.25rem 0.65rem',
                    fontSize: '0.78rem', fontWeight: 700, color: 'var(--dark-roast)',
                }}>
                    ₹{finalPrice}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--cream)' }}>{item.name}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.description}</p>

                {/* Toggle options */}
                <button
                    onClick={() => setExpanded(e => !e)}
                    style={{
                        marginTop: '0.5rem', padding: '0.5rem 0.875rem',
                        background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.25)',
                        borderRadius: '50px', color: 'var(--amber)', fontSize: '0.8rem', fontWeight: 500,
                        alignSelf: 'flex-start', transition: 'all 0.2s',
                    }}
                >
                    {expanded ? '− Hide Options' : '+ Customize'}
                </button>

                {/* Options panel */}
                {expanded && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '0.5rem', padding: '1rem', background: 'rgba(0,0,0,0.25)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(200,134,10,0.1)' }}>

                        {/* Size */}
                        <div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.4rem' }}>SIZE</div>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                {SIZES.map(s => (
                                    <button key={s} onClick={() => setSize(s)} style={{
                                        padding: '0.3rem 0.7rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 500,
                                        border: '1px solid',
                                        borderColor: size === s ? 'var(--amber)' : 'rgba(200,134,10,0.2)',
                                        background: size === s ? 'var(--amber)' : 'transparent',
                                        color: size === s ? 'var(--dark-roast)' : 'var(--text-muted)',
                                        transition: 'all 0.15s',
                                    }}>
                                        {s} {SIZE_ADJUSTMENTS[s] !== 0 && <span style={{ opacity: 0.8 }}>({SIZE_ADJUSTMENTS[s] > 0 ? '+' : ''}{SIZE_ADJUSTMENTS[s]})</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Milk */}
                        {item.hasMilkOption && (
                            <div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.4rem' }}>MILK</div>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {MILKS.map(m => (
                                        <button key={m} onClick={() => setMilk(m)} style={{
                                            padding: '0.3rem 0.7rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 500,
                                            border: '1px solid',
                                            borderColor: milk === m ? 'var(--amber)' : 'rgba(200,134,10,0.2)',
                                            background: milk === m ? 'var(--amber)' : 'transparent',
                                            color: milk === m ? 'var(--dark-roast)' : 'var(--text-muted)',
                                            transition: 'all 0.15s',
                                        }}>
                                            {m} {MILK_ADJUSTMENTS[m] !== 0 && <span style={{ opacity: 0.8 }}>(+{MILK_ADJUSTMENTS[m]})</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Temperature */}
                        {item.hasTempOption && (
                            <div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.4rem' }}>TEMPERATURE</div>
                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    {TEMPS.map(t => (
                                        <button key={t} onClick={() => setTemp(t)} style={{
                                            padding: '0.3rem 0.7rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 500,
                                            border: '1px solid',
                                            borderColor: temp === t ? 'var(--amber)' : 'rgba(200,134,10,0.2)',
                                            background: temp === t ? 'var(--amber)' : 'transparent',
                                            color: temp === t ? 'var(--dark-roast)' : 'var(--text-muted)',
                                            transition: 'all 0.15s',
                                        }}>
                                            {t === 'Hot' ? '🔥' : '🧊'} {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.4rem' }}>QUANTITY</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                                    width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(200,134,10,0.15)', border: '1px solid rgba(200,134,10,0.3)', color: 'var(--amber)',
                                }}>
                                    <Minus size={14} />
                                </button>
                                <span style={{ fontWeight: 600, color: 'var(--cream)', minWidth: '1.5rem', textAlign: 'center' }}>{quantity}</span>
                                <button onClick={() => setQty(q => q + 1)} style={{
                                    width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(200,134,10,0.15)', border: '1px solid rgba(200,134,10,0.3)', color: 'var(--amber)',
                                }}>
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add to Cart */}
                <button
                    onClick={expanded ? handleAdd : () => { setExpanded(true); }}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                >
                    <ShoppingCart size={16} />
                    {expanded ? `Add to Cart • ₹${finalPrice * quantity}` : 'Add to Cart'}
                </button>
            </div>

            <style>{`
        .card:hover .menu-card-img { transform: scale(1.08); }
      `}</style>
        </div>
    );
}
