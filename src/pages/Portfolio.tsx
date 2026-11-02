import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Filter, Search, X } from 'lucide-react';
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
    searchQuery,
    setSearchQuery,
    clearSearch,
    videos,
    allFilteredCount,
    totalVaultCount,
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
      {/* Ambient background glows (Orchid & Teal) */}
      <div className="ambient-glow bg-[#BF54A3]/20 w-[600px] h-[600px] top-24 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bg-[#107361]/20 w-[450px] h-[450px] top-1/3 -right-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BF54A3]/15 border border-[#BF54A3]/30 text-[#D977BF] text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Film className="w-3.5 h-3.5 text-[#107361]" />
            570+ FILMS • YOUTUBE PORTFOLIO VAULT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            OUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361]">
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

          {/* Real-time Video Search Bar (by Video Name or Video ID) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 max-w-xl mx-auto w-full px-2"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by video title or ID (e.g. FargqR3UwXo, Teaser)..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-white/[0.05] border border-white/15 focus:border-[#BF54A3] focus:ring-2 focus:ring-[#BF54A3]/30 text-white placeholder-neutral-400 text-xs sm:text-sm backdrop-blur-xl transition-all outline-none shadow-glass-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3.5 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="mt-2.5 flex items-center justify-between px-3 text-xs text-neutral-400">
                <span>
                  Found <strong className="text-white font-mono">{allFilteredCount}</strong> {allFilteredCount === 1 ? 'matching project' : 'matching projects'} for &ldquo;<span className="text-[#D977BF]">{searchQuery}</span>&rdquo;
                </span>
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-[#BF54A3] hover:underline text-[11px] font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Category Filter Navigation */}
        <div className="my-8">
          <PortfolioFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalCount={searchQuery ? allFilteredCount : totalVaultCount}
          />
        </div>

        {/* Active Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 border-b border-white/10 text-xs text-neutral-400 gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white uppercase tracking-wider text-xs sm:text-sm">
              {getCategoryTitle(selectedCategory)}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#BF54A3] font-mono">
              {allFilteredCount} {allFilteredCount === 1 ? 'project' : 'projects'}
            </span>
          </div>

          <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500">
            Tap thumbnail to play
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
          searchQuery={searchQuery}
          onClearSearch={clearSearch}
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

