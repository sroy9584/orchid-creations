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
  logoPath: string; // Path to official logo
  founderPhotoPath: string; // Path to founder photo
  aboutText: {
    hero: string;
    story: string[];
    mission: string;
  };
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

