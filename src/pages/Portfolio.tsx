import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Filter } from 'lucide-react';
import { PortfolioFilters } from '../components/PortfolioFilters';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { VideoModal } from '../components/VideoModal';
import { SyncBadge } from '../components/SyncBadge';
import { usePortfolio } from '../hooks/usePortfolio';

export const Portfolio: React.FC = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    videos,
    allFilteredCount,
    hasMore,
    loadMore,
    selectedVideo,
    openVideoModal,
    closeVideoModal,
    metadata,
    getCategoryTitle,
  } = usePortfolio({ itemsPerPage: 9 });

  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-purple-600/15 w-[600px] h-[600px] top-24 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bg-sky-500/10 w-[450px] h-[450px] top-1/3 -right-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Film className="w-3.5 h-3.5" />
            UNLISTED YOUTUBE PORTFOLIO VAULT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            MY{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-sky-300">
              WORK
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed"
          >
            A collection of visual stories crafted with creativity, precision, and passion.
          </motion.p>

          {/* Sync Status Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5"
          >
            <SyncBadge metadata={metadata} />
          </motion.div>
        </div>

        {/* Category Filter Navigation */}
        <div className="my-8">
          <PortfolioFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalCount={allFilteredCount}
          />
        </div>

        {/* Active Category Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white uppercase tracking-wider text-sm">
              {getCategoryTitle(selectedCategory)}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-purple-300 font-mono">
              {allFilteredCount} {allFilteredCount === 1 ? 'project' : 'projects'}
            </span>
          </div>

          <span className="hidden sm:inline font-mono text-[11px] text-neutral-500">
            Click any thumbnail for embedded playback
          </span>
        </div>

        {/* Responsive Video Grid */}
        <PortfolioGrid
          videos={videos}
          onPlay={openVideoModal}
          getCategoryTitle={getCategoryTitle}
          hasMore={hasMore}
          onLoadMore={loadMore}
          allFilteredCount={allFilteredCount}
        />
      </div>

      {/* Video Modal Player */}
      <VideoModal
        video={selectedVideo}
        onClose={closeVideoModal}
        categoryTitle={selectedVideo ? getCategoryTitle(selectedVideo.categoryId) : undefined}
      />
    </div>
  );
};

