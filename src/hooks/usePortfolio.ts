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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(itemsPerPage);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  // Cast JSON data into typed structure safely and ensure base date-descending sort (newest first)
  const portfolioData = useMemo(() => {
    const rawVideos = (portfolioDataJson.videos || []) as PortfolioVideo[];
    const sortedVideos = [...rawVideos].sort((a, b) => {
      const timeA = new Date(a.publishedAt || 0).getTime();
      const timeB = new Date(b.publishedAt || 0).getTime();
      return timeB - timeA;
    });

    return {
      metadata: portfolioDataJson.metadata as SyncMetadata,
      videos: sortedVideos,
    };
  }, []);

  // Filtered videos based on selectedCategory AND searchQuery (title or Video ID)
  // Strictly sorted date-wise: newest uploaded first -> oldest last
  const filteredVideos = useMemo(() => {
    let result = portfolioData.videos;

    // Filter by category if not 'all'
    if (selectedCategory !== 'all') {
      result = result.filter(
        (video) => video.categoryId.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query (checks video title and video ID)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((video) => {
        const titleMatch = video.title.toLowerCase().includes(q);
        const idMatch = video.id.toLowerCase().includes(q);
        return titleMatch || idMatch;
      });
    }

    // Enforce date-wise sorting: newest first, oldest last
    return [...result].sort((a, b) => {
      const timeA = new Date(a.publishedAt || 0).getTime();
      const timeB = new Date(b.publishedAt || 0).getTime();
      return timeB - timeA;
    });
  }, [selectedCategory, searchQuery, portfolioData.videos]);

  // Curated Featured projects (strictly sorted by upload date: newest first -> oldest last)
  const featuredVideos = useMemo(() => {
    const list = portfolioData.videos.filter((video) => video.featured);
    return [...list].sort((a, b) => {
      const timeA = new Date(a.publishedAt || 0).getTime();
      const timeB = new Date(b.publishedAt || 0).getTime();
      return timeB - timeA;
    });
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(itemsPerPage); // Reset pagination on search change
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setVisibleCount(itemsPerPage);
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
    searchQuery,
    setSearchQuery: handleSearchChange,
    clearSearch: handleClearSearch,
    videos: paginatedVideos,
    allFilteredCount: filteredVideos.length,
    totalVaultCount: portfolioData.videos.length,
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

