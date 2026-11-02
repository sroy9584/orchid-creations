import { PlaylistCategory } from '../types/portfolio';

/**
 * =======================================================================
 * ORCHID CREATIONS — YOUTUBE PLAYLIST & CATEGORY CONFIGURATION
 * =======================================================================
 * To connect your YouTube playlists:
 * 1. Replace the 'playlistId' values below with your actual YouTube Playlist IDs
 *    (e.g., 'PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx').
 * 2. The automated GitHub Actions workflow will sync unlisted videos from these playlists.
 * 3. Set 'featured: true' to highlight specific categories on the Home & Portfolio pages.
 */

export const playlistCategories: PlaylistCategory[] = [
  {
    id: 'bengali-weddings',
    title: 'Bengali Weddings',
    playlistId: 'PL_BENGALI_WEDDINGS_REPLACE_ID',
    description: 'Traditional Bengali rituals, grand emotional storytelling, and cultural grandeur.',
    featured: true,
    displayOrder: 1,
    badge: 'Popular',
  },
  {
    id: 'non-bengali-weddings',
    title: 'Non-Bengali Weddings',
    playlistId: 'PL_NON_BENGALI_WEDDINGS_REPLACE_ID',
    description: 'High-energy celebration films, diverse traditions, and cinematic celebration edits.',
    featured: true,
    displayOrder: 2,
    badge: 'Cinematic',
  },
  {
    id: 'wedding-highlights',
    title: 'Wedding Highlights',
    playlistId: 'PL_WEDDING_HIGHLIGHTS_REPLACE_ID',
    description: 'Fast-paced, high-emotion teasers and action highlight cuts set to evocative music.',
    featured: true,
    displayOrder: 3,
  },
  {
    id: 'pre-wedding-films',
    title: 'Pre-Wedding Films',
    playlistId: 'PL_PRE_WEDDING_REPLACE_ID',
    description: 'Romantic conceptual narratives, stunning landscapes, and poetic love stories.',
    featured: true,
    displayOrder: 4,
  },
  {
    id: 'post-wedding-films',
    title: 'Post-Wedding Films',
    playlistId: 'PL_POST_WEDDING_REPLACE_ID',
    description: 'Intimate candid moments, homecoming warmth, and couple portraits.',
    featured: false,
    displayOrder: 5,
  },
  {
    id: 'engagement-films',
    title: 'Engagement Films',
    playlistId: 'PL_ENGAGEMENT_REPLACE_ID',
    description: 'Heartfelt ring ceremony films, family greetings, and teaser moments.',
    featured: false,
    displayOrder: 6,
  },
  {
    id: 'rice-ceremony',
    title: 'Rice Ceremony',
    playlistId: 'PL_RICE_CEREMONY_REPLACE_ID',
    description: 'Annaprashan celebrations, sacred blessings, and tender baby milestones.',
    featured: true,
    displayOrder: 7,
  },
  {
    id: 'birthday-films',
    title: 'Birthday Films',
    playlistId: 'PL_BIRTHDAY_REPLACE_ID',
    description: 'Joyful milestone birthdays, energetic theme parties, and family memories.',
    featured: false,
    displayOrder: 8,
  },
  {
    id: 'music-videos',
    title: 'Music Videos',
    playlistId: 'PL_MUSIC_VIDEOS_REPLACE_ID',
    description: 'Dynamic rhythm-cut music videos, artist showcases, and stylized visuals.',
    featured: true,
    displayOrder: 9,
    badge: 'Creative',
  },
  {
    id: 'short-films',
    title: 'Short Films',
    playlistId: 'PL_SHORT_FILMS_REPLACE_ID',
    description: 'Dramatic narrative editing, tension pacing, dialogue continuity, and art films.',
    featured: false,
    displayOrder: 10,
  },
  {
    id: 'documentary-films',
    title: 'Documentary Films',
    playlistId: 'PL_DOCUMENTARY_REPLACE_ID',
    description: 'In-depth storytelling, interviews, observational edits, and archival restoration.',
    featured: false,
    displayOrder: 11,
  },
  {
    id: 'corporate-videos',
    title: 'Corporate Videos',
    playlistId: 'PL_CORPORATE_REPLACE_ID',
    description: 'Polished company profiles, event coverage, and executive presentations.',
    featured: false,
    displayOrder: 12,
  },
  {
    id: 'brand-reels',
    title: 'Brand Reels',
    playlistId: 'PL_BRAND_REELS_REPLACE_ID',
    description: 'High-impact 9:16 vertical edits, social viral hooks, and product highlights.',
    featured: true,
    displayOrder: 13,
    badge: 'Trending',
  },
  {
    id: 'other-projects',
    title: 'Other Projects',
    playlistId: 'PL_OTHER_PROJECTS_REPLACE_ID',
    description: 'Special creative edits, personal passion cuts, and experimental visual pieces.',
    featured: false,
    displayOrder: 14,
  },
];

