export interface PortfolioVideo {
  id: string; // YouTube Video ID (e.g. dQw4w9WgXcQ)
  title: string;
  description: string;
  thumbnailUrl: string;
  playlistId: string;
  categoryId: string;
  publishedAt?: string;
  duration?: string;
  featured?: boolean;
  manualOverride?: boolean; // Set true if manually added and not managed by YouTube sync
}

export interface PlaylistCategory {
  id: string; // Unique category slug (e.g. 'bengali-weddings')
  title: string;
  playlistId: string; // YouTube Playlist ID (e.g. 'PLxxxxxxxx')
  description: string;
  featured: boolean; // Show in featured section
  displayOrder: number;
  badge?: string;
}

export interface SyncMetadata {
  lastSyncTime: string;
  playlistsChecked: number;
  videosSynchronized: number;
  newlyDetected: number;
  status: 'success' | 'warning' | 'error' | 'manual';
  errorMessage?: string;
}

export interface PortfolioData {
  metadata: SyncMetadata;
  videos: PortfolioVideo[];
}

