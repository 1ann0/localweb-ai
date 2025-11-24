import React from 'react';
import styles from './ServiceList.module.css';
import { BusinessData } from '@/types/business';

interface ServiceListProps {
    data: BusinessData;
}

export const ServiceList: React.FC<ServiceListProps> = ({ data }) => {
    const { services, primaryColor } = data;

    if (!services || services.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Our Services</h2>
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.card}>
                            <h3 className={styles.serviceName}>{service.name}</h3>
                            {service.description && (
                                <p className={styles.serviceDescription}>{service.description}</p>
                            )}
                            {service.price && (
                                <div
                                    className={styles.price}
                                    style={{ color: primaryColor }}
                                >
                                    {service.price}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
