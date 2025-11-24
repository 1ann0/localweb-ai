import React from 'react';
import styles from './Hero.module.css';
import { BusinessData } from '@/types/business';

interface HeroProps {
    data: BusinessData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
    const { heroHeadline, heroSubheadline, primaryColor, contact } = data;

    return (
        <section className={styles.hero}>
            <div className="container">
                <h1 className={styles.headline}>{heroHeadline}</h1>
                {heroSubheadline && <p className={styles.subheadline}>{heroSubheadline}</p>}

                <div className={styles.ctaContainer}>
                    <button
                        className={styles.primaryButton}
                        style={{ backgroundColor: primaryColor } as React.CSSProperties}
                    >
                        {contact.phone ? `Call ${contact.phone}` : 'Contact Us'}
                    </button>
                    <button className={styles.secondaryButton}>
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};
