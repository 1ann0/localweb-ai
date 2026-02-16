import React from 'react';
import { BusinessData } from '@/types/business';

interface AboutProps {
    data: BusinessData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
    const { aboutText, primaryColor } = data;

    if (!aboutText) return null;

    return (
        <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2
                    style={{
                        fontFamily: 'var(--font-syne), system-ui, sans-serif',
                        fontSize: '36px',
                        fontWeight: 700,
                        marginBottom: '24px',
                        color: 'var(--text-primary)',
                    }}
                >
                    About Us
                </h2>
                <div
                    style={{
                        width: '60px',
                        height: '4px',
                        background: primaryColor,
                        margin: '0 auto 32px',
                        borderRadius: '2px',
                    }}
                />
                <p
                    style={{
                        fontSize: '18px',
                        lineHeight: 1.8,
                        color: 'var(--text-secondary)',
                    }}
                >
                    {aboutText}
                </p>
            </div>
        </section>
    );
};
