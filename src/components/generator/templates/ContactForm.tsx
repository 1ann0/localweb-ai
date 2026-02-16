import React from 'react';
import { BusinessData } from '@/types/business';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactFormProps {
    data: BusinessData;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data }) => {
    const { contact, primaryColor } = data;

    const hasContactInfo = contact.phone || contact.email || contact.address;
    if (!hasContactInfo) return null;

    return (
        <section style={{ padding: '80px 24px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2
                    style={{
                        fontFamily: 'var(--font-syne), system-ui, sans-serif',
                        fontSize: '36px',
                        fontWeight: 700,
                        textAlign: 'center',
                        marginBottom: '16px',
                        color: 'var(--text-primary)',
                    }}
                >
                    Get in Touch
                </h2>
                <p
                    style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        marginBottom: '48px',
                        fontSize: '16px',
                    }}
                >
                    We&apos;d love to hear from you
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {/* Contact Info Cards */}
                    {contact.phone && (
                        <div
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: `${primaryColor}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Phone size={20} style={{ color: primaryColor }} />
                            </div>
                            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Phone</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{contact.phone}</p>
                        </div>
                    )}

                    {contact.email && (
                        <div
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: `${primaryColor}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Mail size={20} style={{ color: primaryColor }} />
                            </div>
                            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Email</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{contact.email}</p>
                        </div>
                    )}

                    {contact.address && (
                        <div
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: `${primaryColor}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <MapPin size={20} style={{ color: primaryColor }} />
                            </div>
                            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Address</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{contact.address}</p>
                        </div>
                    )}
                </div>

                {/* Contact Form */}
                <form
                    style={{
                        marginTop: '48px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '32px',
                    }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            style={{
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                outline: 'none',
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            style={{
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        rows={4}
                        style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            color: 'var(--text-primary)',
                            fontSize: '14px',
                            resize: 'vertical',
                            outline: 'none',
                            marginBottom: '16px',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 32px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};
