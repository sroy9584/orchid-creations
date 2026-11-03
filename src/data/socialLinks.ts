import { SocialLink } from '../types/config';
import { siteConfig } from './siteConfig';

/**
 * =======================================================================
 * ORCHID CREATION — SOCIAL MEDIA LINKS
 * =======================================================================
 * Official studio channels for Sourav Roy / Orchid Creation.
 */

export const defaultWhatsAppMessage = encodeURIComponent(
  'Hello Orchid Creation! I am interested in your video editing services. I would like to discuss a project.'
);

export const socialLinks: SocialLink[] = [
  {
    platform: 'whatsapp',
    title: 'WhatsApp Direct',
    url: `https://wa.me/${siteConfig.whatsappNumber}?text=${defaultWhatsAppMessage}`,
    displayHandle: siteConfig.displayPhone,
    iconName: 'MessageSquare',
  },
  {
    platform: 'instagram',
    title: 'Instagram',
    url: 'https://www.instagram.com/sourav__one/',
    displayHandle: '@sourav__one',
    iconName: 'Instagram',
  },
  {
    platform: 'youtube',
    title: 'YouTube Channel',
    url: 'https://www.youtube.com/@orchidcreation',
    displayHandle: '@orchidcreation',
    iconName: 'Youtube',
  },
  {
    platform: 'facebook',
    title: 'Facebook Page',
    url: 'https://www.facebook.com/ocofficialservice',
    displayHandle: 'ocofficialservice',
    iconName: 'Facebook',
  },
  {
    platform: 'email',
    title: 'Official Email',
    url: `mailto:${siteConfig.contactEmail}?subject=Video%20Editing%20Enquiry%20-%20Orchid%20Creation`,
    displayHandle: siteConfig.contactEmail,
    iconName: 'Mail',
  },
];

export const getWhatsAppLink = (customMessage?: string): string => {
  const message = customMessage ? encodeURIComponent(customMessage) : defaultWhatsAppMessage;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
};
