import { PricingPackage, PricingTerms } from '../types/pricing';

/**
 * =======================================================================
 * ORCHID CREATIONS — PRICING CONFIGURATION
 * =======================================================================
 * Easily update prices, package names, deliverables, and WhatsApp enquiry
 * messages in this file.
 */

export const pricingTerms: PricingTerms = {
  advanceRequirement:
    '50% advance payment is required to start a project. The remaining 50% is payable after preview approval.',
  variationDisclaimer:
    'Prices may vary depending on footage quantity, project complexity, editing requirements, and client budget.',
  customQuotePrompt:
    'Have a unique production requirement, custom documentary, or bulk multi-project volume? Contact us directly for a tailored quotation.',
};

export const pricingPackages: PricingPackage[] = [
  {
    id: 'bengali-wedding-both-sides',
    title: 'Bengali Wedding — Both Sides',
    subtitle: 'Comprehensive multi-event edit covering traditional Bengali rituals and reception.',
    price: '₹4,500',
    numericPrice: 4500,
    priceNote: 'Complete Post-Production Package',
    popular: true,
    category: 'wedding',
    deliverables: [
      'Full Video (30–40 minutes)',
      'Cinematic Teaser (2–3 minutes)',
      'One Vertical Reel (30–60 seconds)',
    ],
    features: [
      'Multi-camera ceremony sync & cutting',
      'Ritual-by-ritual narrative pacing',
      'Cinematic color grading & skin tone correction',
      'Dialogue denoising & audio balance',
      'Up to 2 revision rounds included',
      'Delivery via Google Drive / high-speed cloud link',
    ],
    whatsappMessage:
      'Hello Sourav! I am interested in the "Bengali Wedding — Both Sides" package (₹4,500) for Orchid Creations. I would like to discuss my project details.',
  },
  {
    id: 'non-bengali-wedding-both-sides',
    title: 'Non-Bengali Wedding — Both Sides',
    subtitle: 'Grand multi-day celebration edit featuring Baraat, Sangeet, rituals, and high-energy festivities.',
    price: '₹7,500',
    numericPrice: 7500,
    priceNote: 'Extended Celebration Package',
    popular: false,
    category: 'wedding',
    deliverables: [
      'Full Video (40 minutes – 1.5 hours)',
      'Action Highlight (1–2 minutes)',
      'Three Vertical Reels (Instagram / Shorts)',
    ],
    features: [
      'Extensive multi-day footage handling',
      'Dynamic Sangeet & Baraat action cuts',
      'High-impact cinematic highlight montage',
      'Detailed sound design & custom music sync',
      'DaVinci Resolve color science finish',
      'Up to 3 revision rounds included',
    ],
    whatsappMessage:
      'Hello Sourav! I am interested in the "Non-Bengali Wedding — Both Sides" package (₹7,500) for Orchid Creations. I would like to discuss my footage and timeline.',
  },
  {
    id: 'pre-post-wedding-story',
    title: 'Pre-Wedding / Post-Wedding Films',
    subtitle: 'Atmospheric romantic narratives captured in outdoor or curated scenic locations.',
    price: '₹1,500 – ₹2,000',
    priceNote: 'Standard edit available at ₹1,000',
    popular: false,
    category: 'wedding',
    deliverables: [
      'Story-Based Premium Film (3–6 minutes)',
      'One Cinematic Mini-Teaser (30 seconds)',
      'Full Resolution Master Export',
    ],
    features: [
      'Story-based thematic narrative cut',
      'Creative slow-motion & speed ramping',
      'Warm sunset & landscape color toning',
      'Atmospheric foley & ambient soundscapes',
      'Quick turnaround available on request',
    ],
    whatsappMessage:
      'Hello Sourav! I would like to enquire about the "Pre-Wedding / Post-Wedding" editing package (₹1,500–₹2,000) for Orchid Creations.',
  },
  {
    id: 'engagement-films',
    title: 'Engagement — Bengali / Non-Bengali',
    subtitle: 'Heartfelt ring ceremony and family gathering celebration film.',
    price: '₹2,500',
    numericPrice: 2500,
    priceNote: 'Ring Ceremony Special',
    popular: false,
    category: 'event',
    deliverables: [
      'Full Video (10–30 minutes)',
      'Cinematic Teaser',
      'One Social Media Reel',
    ],
    features: [
      'Ring exchange & stage moment focus',
      'Candid family reaction pacing',
      'Natural color enhancement',
      'Clear vocal speech audio mastering',
      'Quick delivery within 5–7 days',
    ],
    whatsappMessage:
      'Hello Sourav! I am enquiring about the "Engagement Ceremony" editing package (₹2,500) with Orchid Creations.',
  },
  {
    id: 'rice-ceremony-birthday',
    title: 'Rice Ceremony / Birthday Films',
    subtitle: 'Joyful Annaprashan and childhood milestone celebration films.',
    price: '₹2,000',
    numericPrice: 2000,
    priceNote: 'Milestone Celebration Cut',
    popular: false,
    category: 'event',
    deliverables: [
      'Full Video (10–30 minutes)',
      'Heartwarming Teaser (60–90 seconds)',
      'Digital Master Delivery',
    ],
    features: [
      'Cherished baby candid moment emphasis',
      'Traditional ritual sequence continuity',
      'Vibrant celebratory color grading',
      'Gentle acoustic background scoring',
      '1 revision round included',
    ],
    whatsappMessage:
      'Hello Sourav! I want to discuss editing for a "Rice Ceremony / Birthday" project (₹2,000) with Orchid Creations.',
  },
  {
    id: 'brand-reels-vertical',
    title: 'Brand Reels & Short-Form Edits',
    subtitle: 'High-retention 9:16 vertical videos engineered for Instagram, YouTube Shorts, and TikTok.',
    price: '₹800 – ₹1,000',
    priceNote: 'Per single edited reel (Bulk discounts available)',
    popular: true,
    category: 'creative',
    deliverables: [
      'Single High-Retention Reel (15–60 seconds)',
      'Dynamic Animated Kinetic Captions',
      'Sound Effects & Trending Beat Drops',
    ],
    features: [
      'Hook-optimized first 3 seconds',
      'Fast-paced visual retention editing',
      'Seamless sound effect (SFX) layering',
      'Aspect ratio optimization for 9:16',
      '24–48 hour rapid delivery available',
    ],
    whatsappMessage:
      'Hello Sourav! I am interested in "Brand Reels & Short-Form Video Editing" (₹800–₹1,000) for my brand/channel with Orchid Creations.',
  },
];

