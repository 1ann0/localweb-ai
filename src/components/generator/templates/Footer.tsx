import React from 'react';
import styles from './Footer.module.css';
import { BusinessData } from '@/types/business';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
    data: BusinessData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
    const { businessName, contact } = data;

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Business Info */}
                <div className={styles.column}>
                    <h3 className={styles.title}>{businessName}</h3>
                    <p className={styles.text}>
                        Providing quality services to our local community.
                    </p>
                </div>

                {/* Contact Info */}
                <div className={styles.column}>
                    <h3 className={styles.title}>Contact Us</h3>

                    {contact.phone && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                            <Phone size={16} />
                            <span className={styles.text}>{contact.phone}</span>
                        </div>
                    )}

                    {contact.email && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                            <Mail size={16} />
                            <span className={styles.text}>{contact.email}</span>
                        </div>
                    )}

                    {contact.address && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                            <MapPin size={16} />
                            <span className={styles.text}>{contact.address}</span>
                        </div>
                    )}
                </div>

                {/* Hours */}
                {contact.hours && (
                    <div className={styles.column}>
                        <h3 className={styles.title}>Opening Hours</h3>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start', color: 'var(--text-secondary)' }}>
                            <Clock size={16} style={{ marginTop: '3px' }} />
                            <span className={styles.text}>{contact.hours}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.copyright}>
                © {new Date().getFullYear()} {businessName}. All rights reserved.
            </div>
        </footer>
    );
};
