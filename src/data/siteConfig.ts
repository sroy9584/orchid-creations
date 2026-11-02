import { SiteConfig } from '../types/config';

/**
 * =======================================================================
 * ORCHID CREATIONS — SITE CONFIGURATION
 * =======================================================================
 * This file contains all primary company and founder details.
 * You can customize phone numbers, email, bio, logo path, and form settings
 * directly in this file without modifying the UI components.
 */

export const siteConfig: SiteConfig = {
  brandName: 'ORCHID CREATIONS',
  tagline: 'WE TURN YOUR MOMENTS INTO CINEMATIC STORIES.',
  subTagline:
    'From cinematic wedding films to compelling brand visuals, we transform raw footage into meaningful stories through creative editing, stunning visuals, and immersive sound.',
  founderName: 'Sourav Roy',
  founderRole: 'Founder & Lead Video Editor',
  establishedYear: 2019,
  yearsOfExperience: '7+ Years',
  location: 'West Bengal, India',

  // Contact details
  // Note: Phone number should be international format without '+' or spaces (e.g., '919876543210')
  whatsappNumber: '919000000000', // REPLACE with your actual WhatsApp phone number
  displayPhone: '+91 (Contact via WhatsApp)',
  contactEmail: 'contact.orchidcreations@gmail.com', // REPLACE with your official email

  // External Form Backend (e.g. Formspree: 'https://formspree.io/f/your_form_id')
  // Leave empty or set your endpoint to enable form submissions
  formspreeEndpoint: '',

  // Official Asset Paths (located in public/ folder)
  logoPath: './assets/logo/orchid-logo.svg',
  founderPhotoPath: './assets/images/founder-placeholder.svg',

  aboutText: {
    hero: 'Orchid Creations is a creative video post-production studio established in 2019. Founded by Sourav Roy, the studio focuses on transforming raw footage into cinematic visual experiences.',
    story: [
      'With deep expertise in video editing, color correction, visual effects, motion graphics, and sound design, Orchid Creations helps clients turn their special moments and creative ideas into memorable stories.',
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

