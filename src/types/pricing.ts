export interface PricingPackage {
  id: string;
  title: string;
  subtitle?: string;
  price: string; // e.g. "₹4,500" or "₹1,500 – ₹2,000"
  numericPrice?: number;
  priceNote?: string;
  popular?: boolean;
  deliverables: string[];
  features: string[];
  whatsappMessage: string;
  category: 'wedding' | 'event' | 'creative' | 'custom';
}

export interface PricingTerms {
  advanceRequirement: string;
  variationDisclaimer: string;
  customQuotePrompt: string;
}

