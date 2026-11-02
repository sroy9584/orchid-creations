import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Film } from 'lucide-react';
import { PortfolioVideo } from '../types/portfolio';

interface VideoModalProps {
  video: PortfolioVideo | null;
  onClose: () => void;
  categoryTitle?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, categoryTitle }) => {
  // ESC key handler and body scroll lock
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl rounded-2xl bg-[#192526]/95 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-2 truncate mr-3">
                <span className="p-1 rounded-lg bg-[#BF54A3]/10 text-[#BF54A3] border border-[#BF54A3]/25 shrink-0">
                  <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/5 text-[#BF54A3] border border-white/10 shrink-0">
                  {categoryTitle || video.categoryId}
                </span>
                <h3 id="video-modal-title" className="text-xs sm:text-sm md:text-base font-semibold text-white/95 truncate">
                  {video.title}
                </h3>
              </div>

              {/* Close Button with generous touch target */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close video player"
                className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#BF54A3] shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 16:9 Responsive Video Player */}
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={video.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-3.5 sm:p-5 bg-gradient-to-t from-[#0D1516] to-[#192526] flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 text-xs md:text-sm text-neutral-300 border-t border-white/5">
              <p className="line-clamp-2 text-neutral-400 max-w-3xl text-[11px] sm:text-xs md:text-sm">
                {video.description || 'Cinematic video post-production project by Orchid Creations.'}
              </p>
              <div className="flex items-center gap-2 self-end shrink-0 text-neutral-500 font-mono text-[10px] sm:text-[11px]">
                <span>ID: {video.id}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

