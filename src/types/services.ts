export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  iconName: string; // Lucide icon identifier
  category: 'wedding' | 'cinematic' | 'commercial';
  deliverables?: string[];
  featuredInHome?: boolean;
}

