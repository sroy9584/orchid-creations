import { SocialLink } from '../types/config';
import { siteConfig } from './siteConfig';

/**
 * =======================================================================
 * ORCHID CREATIONS — SOCIAL MEDIA LINKS
 * =======================================================================
 * Official studio channels for Sourav Roy / Orchid Creations.
 */

export const defaultWhatsAppMessage = encodeURIComponent(
  'Hello Orchid Creations! I am interested in your video editing services. I would like to discuss a project.'
);

export const socialLinks: SocialLink[] = [
  {
    platform: 'whatsapp',
    title: 'WhatsApp Direct',
    url: `https://wa.me/${siteConfig.whatsappNumber}?text=${defaultWhatsAppMessage}`,
    displayHandle: '+91 89279 16525',
    iconName: 'MessageSquare',
  },
  {
    platform: 'instagram',
    title: 'Instagram',
    url: 'https://www.instagram.com/editorsouravroy/',
    displayHandle: '@editorsouravroy',
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
    url: 'https://www.facebook.com/editorsouravroy/',
    displayHandle: 'editorsouravroy',
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

export const getWhatsAppLink = (customMessage?: string): string => {
  const message = customMessage ? encodeURIComponent(customMessage) : defaultWhatsAppMessage;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
};
