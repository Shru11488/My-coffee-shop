'use client';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    { name: 'Sarah Johnson', image: '/images/user-1.jpg', rating: 5, text: 'Loved the french toast. Perfectly balanced and rich. The ambience is cozy and every cup is crafted with care!' },
    { name: 'James Wilson', image: '/images/user-2.jpg', rating: 5, text: 'Great espresso blend! Smooth and bold flavour. Fast delivery too! This is my go-to coffee shop now.' },
    { name: 'Michael Brown', image: '/images/user-3.jpg', rating: 5, text: 'Fantastic mocha flavour. Fresh, aromatic, and just perfect. Brew Haven never disappoints!' },
    { name: 'Emily Harris', image: '/images/user-4.jpg', rating: 5, text: 'Excellent quality! Fresh beans and an incredible menu. Highly recommend the tiramisu as well.' },
    { name: 'Anthony Thompson', image: '/images/user-5.jpg', rating: 5, text: 'Best café I\'ve visited. Smooth cold brew and the staff are absolutely wonderful. Will return!' },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" style={{ background: 'var(--dark-roast)', padding: '6rem 0' }}>
            <div className="container">
                <h2 className="section-title">What Our <span>Customers</span> Say</h2>
                <div className="divider" />
                <p className="section-subtitle">Real experiences from our coffee-loving community</p>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    style={{ paddingBottom: '3rem' }}
                >
                    {testimonials.map((t) => (
                        <SwiperSlide key={t.name}>
                            <div className="card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Stars */}
                                <div style={{ display: 'flex', gap: '3px' }}>
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} size={16} fill="var(--amber)" color="var(--amber)" />
                                    ))}
                                </div>
                                {/* Quote */}
                                <p style={{ color: 'var(--cream-dark)', fontSize: '0.95rem', lineHeight: 1.8, flex: 1, fontStyle: 'italic' }}>
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                {/* User */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', borderTop: '1px solid rgba(200,134,10,0.15)', paddingTop: '1rem' }}>
                                    <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--amber)', flexShrink: 0, position: 'relative' }}>
                                        <Image src={t.image} alt={t.name} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.95rem' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--amber)' }}>Verified Customer</div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
