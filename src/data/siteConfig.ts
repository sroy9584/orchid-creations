import { SiteConfig } from '../types/config';

/**
 * =======================================================================
 * ORCHID CREATION — SITE CONFIGURATION
 * =======================================================================
 * Contains official company and founder details for Sourav Roy.
 */

export const siteConfig: SiteConfig = {
  brandName: 'ORCHID CREATION',
  tagline: 'GIVING WINGS TO YOUR STORIES',
  subTagline:
    'We turn your moments into cinematic visual experiences. From cinematic wedding films to compelling brand visuals, we transform raw footage into meaningful stories through creative editing, stunning visuals, and immersive sound.',
  founderName: 'Sourav Roy',
  founderRole: 'Founder & Lead Video Editor',
  establishedYear: 2021,
  yearsOfExperience: '5+ Years',
  location: 'Ashoknagar, Building More, North 24 Parganas, West Bengal 743222, India',

  // Official contact details
  whatsappNumber: '918927916525',
  displayPhone: '+91 8927916525',
  contactEmail: 'ocofficialservice@gmail.com',

  // Google Business Profile details
  googleBusiness: {
    name: 'Orchid Creation Studio',
    rating: 5.0,
    reviewCount: 48,
    mapsUrl: 'https://maps.google.com/?q=Orchid+Creation+Studio+Ashoknagar+Building+More+North+24+Parganas+West+Bengal+743222',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJOrchidCreationStudioAshoknagar',
    placeId: '',
  },

  // External Form Backend (Formspree or Web3Forms)
  formspreeEndpoint: '',

  // Official Asset Paths (located in public/ folder)
  logoPath: './assets/logo/orchid-logo.png',
  founderPhotoPath: './assets/images/founder-placeholder.svg',

  aboutText: {
    hero: 'Orchid Creation is a creative video post-production studio established in 2021. Founded by Sourav Roy, the studio focuses on giving wings to your stories by transforming raw footage into cinematic visual experiences.',
    story: [
      'With deep expertise in video editing, color correction, visual effects, motion graphics, and sound design, Orchid Creation helps clients turn their special moments and creative ideas into memorable stories.',
      'From grand multi-day Bengali and traditional Indian weddings to contemporary pre-wedding narratives, music videos, and commercial brand reels, our craft balances cinematic grandeur with heartfelt emotion.',
      'Our philosophy is anchored in meticulous detail: tailored pacing, harmonic color science, spatial sound mastering, and an uncompromising dedication to visual rhythm.',
    ],
    mission:
      'Our goal is simple: deliver visually compelling content with creativity, precision, and attention to detail.',
  },

  skills: {
    software: [
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'DaVinci Resolve Studio',
      'Adobe Audition',
      'Adobe Photoshop',
      'Adobe Illustrator',
    ],
    disciplines: [
      'Cinematic Video Editing',
      'High-End Color Grading',
      '2D & 3D Motion Graphics',
      'Visual Effects (VFX)',
      'Immersive Sound Design',
      'Multi-Cam Rhythm Editing',
      'Audio Mixing & Mastering',
      'Social Media Storytelling',
    ],
  },
};
