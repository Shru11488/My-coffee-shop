'use client';
import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const contactInfo = [
    { Icon: MapPin, label: 'Address', value: '123 Campsite Avenue, Wilderness, CA 98765' },
    { Icon: Mail, label: 'Email', value: 'info@brewhavencoffee.com' },
    { Icon: Phone, label: 'Phone', value: '(123) 456-7899' },
    { Icon: Clock, label: 'Mon–Fri', value: '9:00 AM – 9:00 PM' },
    { Icon: Clock, label: 'Saturday', value: '10:00 AM – 7:00 PM' },
    { Icon: Clock, label: 'Sunday', value: 'Closed' },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        await new Promise(r => setTimeout(r, 1500));
        setSending(false);
        setSent(true);
        toast.success('Message sent! We\'ll get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--dark-roast)' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,var(--espresso) 0%,var(--dark-roast) 100%)', borderBottom: '1px solid rgba(200,134,10,0.2)', padding: '3rem 0 2.5rem' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        We&apos;d love to hear from you
                    </p>
                    <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
                        Contact <span>Us</span>
                    </h1>
                    <div className="divider" />
                    <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto', fontSize: '1rem' }}>
                        Have a question or feedback? Drop us a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>

                    {/* Contact Info */}
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '1.5rem' }}>
                            Get in Touch
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {contactInfo.map(({ Icon, label, value }, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: 42, height: 42, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                                        background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--amber)',
                                    }}>
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem' }}>{label}</div>
                                        <div style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map placeholder */}
                        <div style={{ marginTop: '2rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(200,134,10,0.2)', background: 'var(--espresso)', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                            <MapPin size={32} color="var(--amber)" />
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>123 Campsite Avenue, CA</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card" style={{ padding: '2rem' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '1.5rem' }}>
                            Send a Message
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Your Name</label>
                                    <input type="text" className="form-input" placeholder="John Doe" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-input" placeholder="john@example.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label className="form-label">Subject</label>
                                <input type="text" className="form-input" placeholder="How can we help?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea className="form-input" placeholder="Write your message here..." required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '1rem' }} disabled={sending}>
                                {sent ? <><CheckCircle size={18} /> Sent!</> : sending ? 'Sending...' : <><Send size={16} /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
