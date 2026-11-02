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

  // Featured videos for top highlight carousel / hero preview
  const featuredVideos = useMemo(() => {
    return portfolioData.videos.filter((video) => video.featured);
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

