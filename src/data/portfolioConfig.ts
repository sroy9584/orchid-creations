import { PlaylistCategory } from '../types/portfolio';

/**
 * =======================================================================
 * ORCHID CREATION — OFFICIAL YOUTUBE PLAYLIST CONFIGURATION
 * =======================================================================
 * Configured with official unlisted YouTube playlists from @orchidcreation.
 * Synced automatically every 30 minutes via GitHub Actions.
 */

export const playlistCategories: PlaylistCategory[] = [
  {
    id: 'pre-wedding-ring',
    title: 'Pre-Wedding & Ring Ceremony',
    playlistId: 'PLVBKm1M4_08Qg4RNPatMBEjv4Q4twG1rm',
    description: 'Story-based romantic outdoor visual narratives and engagement ring ceremony films.',
    featured: true,
    displayOrder: 1,
    badge: 'Romantic',
  },
  {
    id: 'wedding-teaser',
    title: 'Wedding Teasers',
    playlistId: 'PLVBKm1M4_08QlbXp3ZxKH3A12Sqetcd66',
    description: 'Cinematic 2–3 minute highlight cuts, speed ramps, and rhythmic musical montages.',
    featured: true,
    displayOrder: 2,
    badge: 'Highlights',
  },
  {
    id: 'wedding-film',
    title: 'Wedding Films',
    playlistId: 'PLVBKm1M4_08QGqOIhPM-LVLf6NIPAVysm',
    description: 'Full ceremony films, multi-cam ritual cuts, and emotional traditional storytelling.',
    featured: true,
    displayOrder: 3,
    badge: '160+ Films',
  },
  {
    id: 'rice-ceremony-baby',
    title: 'Rice Ceremony & Baby Videos',
    playlistId: 'PLVBKm1M4_08Q8-t19aN4P88rDUzbNumdN',
    description: 'Sacred Annaprashan ceremonies, first rice blessings, and heartwarming baby milestones.',
    featured: true,
    displayOrder: 4,
  },
  {
    id: 'event-reels',
    title: 'Event Reels',
    playlistId: 'PLVBKm1M4_08RRf5ILLtIBbOyPbSGexf7T',
    description: 'Fast-paced social media coverage of festive events, celebrations, and gatherings.',
    featured: false,
    displayOrder: 5,
  },
  {
    id: 'brand-portfolio-reel',
    title: 'Brand & Portfolio Reels',
    playlistId: 'PLVBKm1M4_08RhqfFsv9n2cOovqXCjkvmI',
    description: 'High-retention 9:16 vertical edits, typography animations, and commercial viral hooks.',
    featured: true,
    displayOrder: 6,
    badge: 'Trending',
  },
  {
    id: 'promotional-commercial',
    title: 'Promotional & Commercial Videos',
    playlistId: 'PLVBKm1M4_08SOa75z6k0G20tAfpAL5PTt',
    description: 'Corporate profiles, product advertisements, and creative brand promotional films.',
    featured: false,
    displayOrder: 7,
  },
  {
    id: 'invitation-celebration',
    title: 'Invitation & Celebration Videos',
    playlistId: 'PLVBKm1M4_08RcTV1Lk8REqPTCg9i-RMjP',
    description: 'Creative animated video invitations, countdown teasers, and anniversary cuts.',
    featured: false,
    displayOrder: 8,
  },
];
