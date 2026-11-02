import { ServiceItem } from '../types/services';

/**
 * =======================================================================
 * ORCHID CREATIONS — SERVICES CONFIGURATION
 * =======================================================================
 * Customize all services offered by Orchid Creations.
 * You can add, edit, or reorder services without editing page code.
 */

export const servicesConfig: ServiceItem[] = [
  {
    id: 'wedding-film-editing',
    title: 'Wedding Film Editing',
    shortDescription:
      'Complete documentary and cinematic edits of full-day wedding ceremonies, rituals, and receptions with multi-cam synchronization.',
    fullDescription:
      'We craft comprehensive wedding films spanning 30 to 90 minutes. Every key ritual, vow, family interaction, and celebration is seamlessly cut with multi-camera timecode syncing, clean pacing, and balanced audio.',
    iconName: 'Film',
    category: 'wedding',
    deliverables: ['Full Ceremony Video (30–90 mins)', 'Multi-cam Audio Sync', 'Clean Story Flow'],
    featuredInHome: true,
  },
  {
    id: 'cinematic-wedding-highlights',
    title: 'Cinematic Wedding Highlights',
    shortDescription:
      'Emotional, high-energy wedding teasers and trailers crafted with poetic transitions, speed ramps, and immersive soundscapes.',
    fullDescription:
      'Our signature wedding highlights compress hours of magic into a gripping 2 to 5 minute visual masterpiece. We handcraft dynamic pacing that elevates every joyful tear and celebratory dance.',
    iconName: 'Sparkles',
    category: 'wedding',
    deliverables: ['2–5 Minute Highlight Reel', 'Cinematic Color Grading', 'Custom Sound Design'],
    featuredInHome: true,
  },
  {
    id: 'pre-wedding-post-wedding',
    title: 'Pre-Wedding & Post-Wedding Films',
    shortDescription:
      'Romantic, concept-driven films shot in stunning outdoor or studio locations, edited to tell your unique love story.',
    fullDescription:
      'Transform picturesque location footage into a story-based romantic film. We apply cinematic aspect ratios, soft film-look color grades, and acoustic pacing that captures raw chemistry.',
    iconName: 'HeartHandshake',
    category: 'wedding',
    deliverables: ['3–7 Minute Concept Film', 'Color Palette Styling', 'Narrative Voiceover Integration'],
    featuredInHome: true,
  },
  {
    id: 'engagement-films',
    title: 'Engagement Films',
    shortDescription:
      'Charming ring ceremony edits capturing the emotional union of two families, candid glances, and festive joy.',
    fullDescription:
      'Preserve the warmth of ring exchanges, stage entries, and family toasts. Paced to celebrate the romantic beginning with crisp editing and musical harmony.',
    iconName: 'Gem',
    category: 'wedding',
    deliverables: ['Full Ceremony Cut', 'Social Media Teaser', 'Speech Audio Enhancement'],
    featuredInHome: false,
  },
  {
    id: 'birthday-rice-ceremony',
    title: 'Birthday & Rice Ceremony Films',
    shortDescription:
      'Delightful keepsake videos celebrating Annaprashan (first rice ceremony) and milestone birthdays with heartwarming storytelling.',
    fullDescription:
      'Joyful, warm edits preserving the innocence of childhood milestones. Sacred mantras, playful toddler expressions, and blessing rituals edited with tenderness.',
    iconName: 'Gift',
    category: 'wedding',
    deliverables: ['10–30 Minute Full Video', 'Teaser Cut for WhatsApp', 'Color Brightness Balance'],
    featuredInHome: false,
  },
  {
    id: 'music-video-editing',
    title: 'Music Video Editing',
    shortDescription:
      'Dynamic rhythm-locked editing for independent artists, bands, and record labels with stylized visuals and creative transitions.',
    fullDescription:
      'Precision frame-accurate cutting to the musical beat, sync-map performance tracks, narrative B-roll integration, and stylized kinetic visual flow.',
    iconName: 'Music',
    category: 'cinematic',
    deliverables: ['Full Master Music Video', 'Shorts/Reel Promotional Cuts', 'Creative Transition Styling'],
    featuredInHome: true,
  },
  {
    id: 'short-film-editing',
    title: 'Short Film Editing',
    shortDescription:
      'Narrative post-production for fiction and festival entries, emphasizing dramatic tension, character arcs, and continuity.',
    fullDescription:
      'Collaborative cutting for filmmakers. We refine dramatic pacing, scene tension, J & L audio cuts, dialogue continuity, and festival deliverable specifications.',
    iconName: 'Clapperboard',
    category: 'cinematic',
    deliverables: ['DCP/Web Festival Deliverable', 'Rough Cut & Fine Cut Reviews', 'Turnkey Assembly'],
    featuredInHome: false,
  },
  {
    id: 'documentary-editing',
    title: 'Documentary Editing',
    shortDescription:
      'Thoughtful narrative assembly for real-world stories, biographical pieces, cultural heritage, and investigative topics.',
    fullDescription:
      'Structuring extensive interview footage, archival materials, and observational b-roll into a clear, persuasive, and deeply engaging non-fiction narrative.',
    iconName: 'Video',
    category: 'cinematic',
    deliverables: ['In-Depth Story Assembly', 'Archival Cleanup', 'Subtitling & Lower Thirds'],
    featuredInHome: false,
  },
  {
    id: 'corporate-video-editing',
    title: 'Corporate Video Editing',
    shortDescription:
      'High-level corporate communications, customer testimonials, brand stories, and summit recap videos.',
    fullDescription:
      'Clean, authoritative editing for businesses. Crisp interview framing, brand-aligned lower thirds, animated infographic overlays, and boardroom-ready audio.',
    iconName: 'Briefcase',
    category: 'commercial',
    deliverables: ['Corporate Profile Cut', 'Executive Snippets', 'Brand Asset Conformity'],
    featuredInHome: false,
  },
  {
    id: 'brand-promotional-videos',
    title: 'Brand Promotional Videos',
    shortDescription:
      'Persuasive commercial spots engineered to stop the scroll, engage target audiences, and drive customer action.',
    fullDescription:
      'High-conversion advertising videos for online campaigns, YouTube pre-rolls, and digital billboard displays with crisp calls to action.',
    iconName: 'TrendingUp',
    category: 'commercial',
    deliverables: ['15s, 30s & 60s Cutdowns', 'Call-to-Action Motion Graphics', 'Conversion Pacing'],
    featuredInHome: true,
  },
  {
    id: 'social-media-reels-editing',
    title: 'Social Media Reels Editing',
    shortDescription:
      'Viral 9:16 vertical video editing with hook optimization, kinetic captions, trending audio matching, and SFX.',
    fullDescription:
      'Turn long-form content into viral vertical gold. Engineered for Instagram Reels, YouTube Shorts, and TikTok with high-retention editing techniques.',
    iconName: 'Smartphone',
    category: 'commercial',
    deliverables: ['High-Retention 9:16 Edits', 'Dynamic Kinetic Captions', 'Sound Effects Integration'],
    featuredInHome: true,
  },
  {
    id: 'photo-editing',
    title: 'Photo Editing & Retouching',
    shortDescription:
      'Professional color toning, skin texture preservation, high-end beauty retouching, and portrait enhancement.',
    fullDescription:
      'High-end Photoshop processing for wedding albums, model portfolios, and promotional assets, maintaining natural tones and artistic polish.',
    iconName: 'Image',
    category: 'design-audio',
    deliverables: ['High-Res JPEG/TIFF Exports', 'Frequency Separation Retouch', 'Color Cast Correction'],
    featuredInHome: false,
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    shortDescription:
      'Compelling YouTube thumbnails, movie posters, title cards, digital covers, and promotional social collateral.',
    fullDescription:
      'Eye-catching graphic assets designed with bold typography, high CTR thumb strategy, and cohesive visual branding.',
    iconName: 'Palette',
    category: 'design-audio',
    deliverables: ['YouTube High-CTR Thumbnails', 'Digital Posters', 'Social Announcement Tiles'],
    featuredInHome: false,
  },
  {
    id: 'color-correction-grading',
    title: 'Color Correction & Color Grading',
    shortDescription:
      'Precision DaVinci Resolve color science: shot-matching, skin tone protection, dynamic range expansion, and artistic look design.',
    fullDescription:
      'We bring raw camera profiles (LOG/RAW) to life. Balanced luminance, cinematic film emulation, clean skin tones, and evocative mood lighting across all cameras.',
    iconName: 'SunMedium',
    category: 'cinematic',
    deliverables: ['LOG/RAW Normalization', 'Shot-to-Shot Color Matching', 'Custom LUT Look Creation'],
    featuredInHome: true,
  },
  {
    id: 'visual-effects',
    title: 'Visual Effects (VFX)',
    shortDescription:
      'Seamless object removal, sky replacement, wire removal, muzzle flashes, screen comps, and atmospheric element addition.',
    fullDescription:
      'Invisible visual effects that elevate production value. Clean compositing in After Effects to remove unwanted background distractions or enhance environments.',
    iconName: 'Layers',
    category: 'cinematic',
    deliverables: ['Object/Crowd Clean-up', 'Sky Replacement', 'Motion Tracking & Screen Insert'],
    featuredInHome: false,
  },
  {
    id: 'motion-graphics-2d-3d',
    title: '2D / 3D Motion Graphics',
    shortDescription:
      'Custom animated titles, logo stings, lower thirds, cinematic bumpers, and explanatory kinetic motion design.',
    fullDescription:
      'Fluid vector and 3D graphics that introduce films and brands with premium elegance, smooth physics, and modern aesthetic styling.',
    iconName: 'Boxes',
    category: 'design-audio',
    deliverables: ['Animated Studio Sting/Logo', 'Cinematic Lower Thirds', 'Kinetic Typography'],
    featuredInHome: false,
  },
  {
    id: 'sound-design',
    title: 'Sound Design & Foley',
    shortDescription:
      'Layered cinematic audio, environmental ambiance, whooshes, impacts, and acoustic textures that bring visuals to life.',
    fullDescription:
      'Video is only half the experience. We construct three-dimensional sound environments with custom foley, risers, sub-bass drops, and realistic spatial depth.',
    iconName: 'Volume2',
    category: 'design-audio',
    deliverables: ['Custom SFX Layering', 'Atmospheric Foley Bed', 'Dynamic Impact Accents'],
    featuredInHome: false,
  },
  {
    id: 'audio-mixing-mastering',
    title: 'Audio Editing, Mixing & Mastering',
    shortDescription:
      'Dialogue denoising, spectral vocal cleanup, music-dialogue ducking, and Broadcast/Web loudness standardization (LUFS).',
    fullDescription:
      'Crystal-clear speech even from noisy live ceremony environments. Background noise reduction, EQ frequency carving, compression, and loudness mastering.',
    iconName: 'Sliders',
    category: 'design-audio',
    deliverables: ['AI & Spectral Denoising', 'Multi-Track Level Balancing', 'Web/Broadcast Loudness Conformity'],
    featuredInHome: false,
  },
];

