/**
 * =======================================================================
 * ORCHID CREATIONS — AUTOMATIC YOUTUBE PLAYLIST SYNCHRONIZER
 * =======================================================================
 * This script connects to the YouTube Data API v3, queries all configured
 * playlists (including unlisted videos), paginates through all items,
 * and updates src/data/portfolioVideos.json.
 *
 * Runs automatically via GitHub Actions (.github/workflows/sync-youtube-playlists.yml)
 * or manually via: npm run sync-youtube
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_PATH = path.join(__dirname, '../src/data/portfolioConfig.ts');
const VIDEOS_JSON_PATH = path.join(__dirname, '../src/data/portfolioVideos.json');

// Explicit list of video IDs to exclude from FEATURED PROJECTS per client instruction
const EXCLUDED_FEATURED_IDS = new Set([
  'yBqwuBTR2-I',
  'bpZPh11wnGs',
  '6CtcZup1i1s',
  'pIwmjxltbhE',
  'y9vab4ontEE',
  '7O8NfT_f8dc',
  'd6wVSUNNtj8',
  'sEytK0aEL00',
  'xWQepGBNruE',
  'c2BMlv2QsaI',
]);

// Fetch helper using Node.js native https
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          try {
            const errJson = JSON.parse(data);
            reject(new Error(errJson.error?.message || `HTTP ${res.statusCode}`));
          } catch {
            reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 150)}`));
          }
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Extract playlist categories from portfolioConfig.ts
function parsePortfolioConfig(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const categories = [];

  // Match category object blocks
  const categoryBlockRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?playlistId:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
  let match;
  while ((match = categoryBlockRegex.exec(content)) !== null) {
    const block = match[0];
    const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
    const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
    const playlistIdMatch = block.match(/playlistId:\s*['"]([^'"]+)['"]/);
    const featuredMatch = block.match(/featured:\s*(true|false)/);
    const orderMatch = block.match(/displayOrder:\s*(\d+)/);

    if (idMatch && playlistIdMatch) {
      categories.push({
        id: idMatch[1],
        title: titleMatch ? titleMatch[1] : idMatch[1],
        playlistId: playlistIdMatch[1],
        featured: featuredMatch ? featuredMatch[1] === 'true' : false,
        displayOrder: orderMatch ? parseInt(orderMatch[1], 10) : 99,
      });
    }
  }

  return categories;
}

// Retrieve all videos from a single playlist with pagination
async function fetchPlaylistVideos(playlistId, categoryId, apiKey) {
  const videos = [];
  let nextPageToken = '';

  do {
    const pageParam = nextPageToken ? `&pageToken=${encodeURIComponent(nextPageToken)}` : '';
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${encodeURIComponent(
      playlistId
    )}${pageParam}&key=${encodeURIComponent(apiKey)}`;

    const response = await httpsGet(url);

    if (response.items && Array.isArray(response.items)) {
      for (const item of response.items) {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId || item.contentDetails?.videoId;

        // Skip invalid, private, or deleted entries
        if (!videoId || snippet.title === 'Private video' || snippet.title === 'Deleted video') {
          continue;
        }

        // Determine best available thumbnail
        const thumbs = snippet.thumbnails || {};
        const thumbUrl =
          thumbs.maxres?.url ||
          thumbs.standard?.url ||
          thumbs.high?.url ||
          `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        videos.push({
          id: videoId,
          title: snippet.title || 'Untitled Project',
          description: snippet.description || '',
          thumbnailUrl: thumbUrl,
          playlistId: playlistId,
          categoryId: categoryId,
          publishedAt: snippet.publishedAt || item.contentDetails?.videoPublishedAt || new Date().toISOString(),
          featured: false,
        });
      }
    }

    nextPageToken = response.nextPageToken;
  } while (nextPageToken);

  return videos;
}

async function main() {
  console.log('----------------------------------------------------');
  console.log('ORCHID CREATIONS — AUTOMATIC PLAYLIST SYNCHRONIZER');
  console.log('----------------------------------------------------');

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_YOUTUBE_API_KEY_HERE') {
    console.warn('\n[NOTICE] YOUTUBE_API_KEY environment variable is not configured.');
    console.warn('The website will continue using the existing cached portfolio data in portfolioVideos.json.');
    console.warn('To enable automated synchronization:');
    console.warn('  1. Add YOUTUBE_API_KEY in your GitHub Repository -> Settings -> Secrets and variables -> Actions.');
    console.warn('  2. Configure real playlist IDs in src/data/portfolioConfig.ts.\n');
    process.exit(0);
  }

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`[ERROR] Configuration file not found at: ${CONFIG_PATH}`);
    process.exit(1);
  }

  // Load existing portfolio JSON
  let existingData = { metadata: {}, videos: [] };
  if (fs.existsSync(VIDEOS_JSON_PATH)) {
    try {
      existingData = JSON.parse(fs.readFileSync(VIDEOS_JSON_PATH, 'utf-8'));
    } catch (e) {
      console.warn(`[WARN] Failed to parse existing portfolioVideos.json, creating new structure.`);
    }
  }

  const existingVideoMap = new Map();
  (existingData.videos || []).forEach((v) => {
    existingVideoMap.set(v.id, v);
  });

  const categories = parsePortfolioConfig(CONFIG_PATH);
  console.log(`Found ${categories.length} configured categories in portfolioConfig.ts`);

  const validCategories = categories.filter(
    (c) => c.playlistId && !c.playlistId.includes('REPLACE_ID')
  );

  if (validCategories.length === 0) {
    console.log('[INFO] All playlist IDs currently contain placeholder values (REPLACE_ID).');
    console.log('Preserving existing cached portfolioVideos.json until real playlist IDs are provided.');
    process.exit(0);
  }

  console.log(`Checking ${validCategories.length} active playlists on YouTube...`);

  const fetchedVideos = [];
  const seenVideoIds = new Set();
  let playlistsChecked = 0;
  let newlyDetectedCount = 0;
  const errors = [];

  for (const cat of validCategories) {
    console.log(`Syncing category "${cat.title}" (Playlist ID: ${cat.playlistId})...`);
    try {
      const items = await fetchPlaylistVideos(cat.playlistId, cat.id, apiKey);
      playlistsChecked++;
      console.log(`  -> Retrieved ${items.length} videos`);

      for (const item of items) {
        // Prevent duplicate video records if uploaded/added across multiple playlists
        if (seenVideoIds.has(item.id)) {
          continue;
        }
        seenVideoIds.add(item.id);

        const existing = existingVideoMap.get(item.id);
        if (EXCLUDED_FEATURED_IDS.has(item.id)) {
          item.featured = false;
        } else if (existing && typeof existing.featured === 'boolean') {
          // Strictly preserve existing curated featured decision
          item.featured = existing.featured;
        } else if (!existing) {
          // Newly uploaded video to YouTube playlist: automatically added & featured
          newlyDetectedCount++;
          item.featured = true;
        } else {
          item.featured = cat.featured || false;
        }

        if (existing && existing.manualOverride) {
          item.manualOverride = true;
        }

        fetchedVideos.push(item);
      }
    } catch (err) {
      console.error(`  [ERROR] Failed to fetch playlist ${cat.playlistId}: ${err.message}`);
      errors.push({ playlistId: cat.playlistId, category: cat.title, error: err.message });
    }
  }

  // If ALL playlists errored out, DO NOT overwrite valid existing data!
  if (fetchedVideos.length === 0 && (existingData.videos || []).length > 0) {
    console.error('[CRITICAL] No videos could be fetched from any playlist.');
    console.error('Preserving existing portfolio data to prevent data loss.');
    process.exit(1);
  }

  // Preserve manual override videos from existing data
  (existingData.videos || []).forEach((v) => {
    if (v.manualOverride && !fetchedVideos.some((fv) => fv.id === v.id)) {
      fetchedVideos.push(v);
    }
  });

  // Sort newest first
  fetchedVideos.sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0).getTime();
    const dateB = new Date(b.publishedAt || 0).getTime();
    return dateB - dateA;
  });

  const updatedData = {
    metadata: {
      lastSyncTime: new Date().toISOString(),
      playlistsChecked: playlistsChecked,
      videosSynchronized: fetchedVideos.length,
      newlyDetected: newlyDetectedCount,
      status: errors.length > 0 ? 'warning' : 'success',
      errors: errors.length > 0 ? errors : undefined,
    },
    videos: fetchedVideos,
  };

  fs.writeFileSync(VIDEOS_JSON_PATH, JSON.stringify(updatedData, null, 2), 'utf-8');

  console.log('----------------------------------------------------');
  console.log(`SYNC COMPLETE:`);
  console.log(`  Playlists Checked: ${playlistsChecked}`);
  console.log(`  Total Videos:      ${fetchedVideos.length}`);
  console.log(`  Newly Detected:    ${newlyDetectedCount}`);
  console.log(`  Updated file:      ${VIDEOS_JSON_PATH}`);
  console.log('----------------------------------------------------');
}

main().catch((err) => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});

