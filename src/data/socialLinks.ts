import { SocialLink } from '../types/config';
import { siteConfig } from './siteConfig';

/**
 * =======================================================================
 * ORCHID CREATIONS — SOCIAL MEDIA LINKS
 * =======================================================================
 * Update your official social media URLs here.
 * These links are automatically reflected in the Header, Footer, and Contact page.
 */

export const defaultWhatsAppMessage = encodeURIComponent(
  'Hello Orchid Creations! I am interested in your video editing services. I would like to discuss a project.'
);

export const socialLinks: SocialLink[] = [
  {
    platform: 'whatsapp',
    title: 'WhatsApp Direct',
    url: `https://wa.me/${siteConfig.whatsappNumber}?text=${defaultWhatsAppMessage}`,
    displayHandle: '+91 (Direct Chat)',
    iconName: 'MessageSquare',
  },
  {
    platform: 'instagram',
    title: 'Instagram',
    url: 'https://instagram.com/orchidcreations_official', // REPLACE with your Instagram URL
    displayHandle: '@orchidcreations_official',
    iconName: 'Instagram',
  },
  {
    platform: 'youtube',
    title: 'YouTube Channel',
    url: 'https://youtube.com/@orchidcreations', // REPLACE with your YouTube Channel URL
    displayHandle: '@orchidcreations',
    iconName: 'Youtube',
  },
  {
    platform: 'facebook',
    title: 'Facebook Page',
    url: 'https://facebook.com/orchidcreations.official', // REPLACE with your Facebook Page URL
    displayHandle: 'Orchid Creations Official',
    iconName: 'Facebook',
  },
  {
    platform: 'email',
    title: 'Official Email',
    url: `mailto:${siteConfig.contactEmail}?subject=Video%20Editing%20Enquiry%20-%20Orchid%20Creations`,
    displayHandle: siteConfig.contactEmail,
    iconName: 'Mail',
  },
];

/**
 * Helper to generate a pre-filled WhatsApp link with a custom message
 */
export const getWhatsAppLink = (customMessage?: string): string => {
  const message = customMessage ? encodeURIComponent(customMessage) : defaultWhatsAppMessage;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
};

