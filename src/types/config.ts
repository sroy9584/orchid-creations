export interface GoogleBusinessConfig {
  name: string;
  rating: number;
  reviewCount: number;
  mapsUrl: string;
  reviewUrl: string;
  placeId?: string;
}

export interface ClientReview {
  id: string;
  authorName: string;
  authorInitials: string;
  authorLocation?: string;
  rating: number;
  date: string;
  relativeTime: string;
  projectType: string;
  comment: string;
  verifiedGoogle: boolean;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  founderName: string;
  founderRole: string;
  establishedYear: number;
  yearsOfExperience: string;
  location: string;
  contactEmail: string;
  whatsappNumber: string; // international format without spaces (e.g. 919876543210)
  displayPhone: string;
  formspreeEndpoint: string; // Formspree endpoint or empty if not yet configured
  web3formsKey?: string; // Optional Web3Forms access key for bulletproof delivery
  logoPath: string; // Path to official logo
  founderPhotoPath: string; // Path to founder photo
  aboutText: {
    hero: string;
    story: string[];
    mission: string;
  };
  googleBusiness?: GoogleBusinessConfig;
  skills: {
    software: string[];
    disciplines: string[];
  };
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'whatsapp' | 'email';
  title: string;
  url: string;
  displayHandle: string;
  iconName: string;
}
