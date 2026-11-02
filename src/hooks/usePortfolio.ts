import { useState, useMemo } from 'react';
import portfolioDataJson from '../data/portfolioVideos.json';
import { playlistCategories } from '../data/portfolioConfig';
import { PortfolioVideo, SyncMetadata } from '../types/portfolio';

export interface UsePortfolioOptions {
  initialCategory?: string;
  itemsPerPage?: number;
}

export function usePortfolio(options: UsePortfolioOptions = {}) {
  const { initialCategory = 'all', itemsPerPage = 9 } = options;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [visibleCount, setVisibleCount] = useState<number>(itemsPerPage);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  // Cast JSON data into typed structure safely
  const portfolioData = useMemo(() => {
    return {
      metadata: portfolioDataJson.metadata as SyncMetadata,
      videos: portfolioDataJson.videos as PortfolioVideo[],
    };
  }, []);

  // Filtered videos based on selectedCategory
  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'all') {
      return portfolioData.videos;
    }
    return portfolioData.videos.filter(
      (video) => video.categoryId.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, portfolioData.videos]);

  // Curated Featured projects (explicit hand-picked IDs + 2 featured playlists), randomly shuffled
  const featuredVideos = useMemo(() => {
    const list = portfolioData.videos.filter((video) => video.featured);
    // Fisher-Yates shuffle algorithm for dynamic random order
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [portfolioData.videos]);

  // Paginated/Sliced slice for current display
  const paginatedVideos = useMemo(() => {
    return filteredVideos.slice(0, visibleCount);
  }, [filteredVideos, visibleCount]);

  const hasMore = visibleCount < filteredVideos.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleCount(itemsPerPage); // Reset pagination on category change
  };

  // Helper to get category title from category id
  const getCategoryTitle = (catId: string) => {
    if (catId === 'all') return 'All Projects';
    const found = playlistCategories.find((c) => c.id.toLowerCase() === catId.toLowerCase());
    return found ? found.title : catId;
  };

  return {
    categories: playlistCategories,
    selectedCategory,
    setSelectedCategory: handleCategorySelect,
    videos: paginatedVideos,
    allFilteredCount: filteredVideos.length,
    featuredVideos,
    hasMore,
    loadMore,
    selectedVideo,
    openVideoModal: (video: PortfolioVideo) => setSelectedVideo(video),
    closeVideoModal: () => setSelectedVideo(null),
    metadata: portfolioData.metadata,
    getCategoryTitle,
  };
}

