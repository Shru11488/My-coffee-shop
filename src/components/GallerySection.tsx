import Image from 'next/image';

const galleryImages = [
    { src: '/images/gallery-1.jpg', alt: 'Cozy cafe interior' },
    { src: '/images/gallery-2.jpg', alt: 'Latte art masterpiece' },
    { src: '/images/gallery-3.jpg', alt: 'Coffee beans close-up' },
    { src: '/images/gallery-4.jpg', alt: 'Barista at work' },
    { src: '/images/gallery-5.jpg', alt: 'Our signature drinks' },
    { src: '/images/gallery-6.jpg', alt: 'Dessert selection' },
];

export default function GallerySection() {
    return (
        <section id="gallery" style={{ background: 'linear-gradient(180deg, #0F0803 0%, var(--espresso) 100%)', padding: '6rem 0' }}>
            <div className="container">
                <h2 className="section-title">Our <span>Gallery</span></h2>
                <div className="divider" />
                <p className="section-subtitle">A glimpse into the Brew Haven experience</p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                }}>
                    {galleryImages.map((img, i) => (
                        <div
                            key={i}
                            style={{
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                position: 'relative',
                                aspectRatio: '1/1',
                                cursor: 'pointer',
                                border: '1px solid rgba(200,134,10,0.1)',
                            }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                className="gallery-img"
                            />
                            <div
                                className="gallery-overlay"
                                style={{
                                    position: 'absolute', inset: 0,
                                    background: 'rgba(26,15,10,0.25)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        div:hover > .gallery-img { transform: scale(1.08); }
        div:hover > .gallery-overlay { opacity: 1 !important; }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
        </section>
    );
}
