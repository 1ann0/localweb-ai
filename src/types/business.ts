export interface Service {
  name: string;
  description?: string;
  price?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}

export interface BusinessData {
  businessName: string;
  tagline?: string;
  heroHeadline: string;
  heroSubheadline?: string;
  primaryColor: string; // Hex code
  secondaryColor?: string;
  services: Service[];
  contact: ContactInfo;
  aboutText?: string;
  logoUrl?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    yelp?: string;
  };
  businessType?: string;
}
