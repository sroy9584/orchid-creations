import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { FeaturedWorks } from '../components/FeaturedWorks';
import { ServicesGrid } from '../components/ServicesGrid';
import { AboutSection } from '../components/AboutSection';
import { GoogleReviews } from '../components/GoogleReviews';
import { CTASection } from '../components/CTASection';
import { VideoModal } from '../components/VideoModal';
import { usePortfolio } from '../hooks/usePortfolio';

export const Home: React.FC = () => {
  const {
    featuredVideos,
    selectedVideo,
    openVideoModal,
    closeVideoModal,
    getCategoryTitle,
  } = usePortfolio();

  return (
    <div className="relative overflow-hidden">
      {/* 1. Hero Section with Interactive Video Background */}
      <Hero videos={featuredVideos} />

      {/* 2. Featured Works Showcase */}
      <FeaturedWorks
        videos={featuredVideos}
        onPlay={openVideoModal}
        getCategoryTitle={getCategoryTitle}
      />

      {/* 3. Services Preview Section */}
      <section className="relative py-10 sm:py-14 border-t border-white/5 overflow-hidden">
        <div className="ambient-glow bg-[#107361]/15 w-[500px] h-[500px] top-1/3 -right-24" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BF54A3]/10 border border-[#BF54A3]/25 text-[#BF54A3] text-xs font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                POST-PRODUCTION SUITE
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F0F2F2] tracking-tight">
                COMPREHENSIVE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF54A3] to-[#107361]">
                  SERVICES
                </span>
              </h2>
              <p className="mt-2 text-neutral-400 max-w-xl text-xs sm:text-sm">
                Specialized post-production capabilities tailored for wedding cinematographers, independent filmmakers, and digital brands.
              </p>
            </div>

            <Link
              to="/services"
              className="glass-btn-secondary self-start md:self-auto text-xs sm:text-sm font-semibold tracking-wide group"
            >
              <span>VIEW ALL 18 SERVICES</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ServicesGrid previewOnly={true} />
        </div>
      </section>

      {/* 4. About Studio & Founder Preview */}
      <section className="relative py-10 sm:py-14 border-t border-white/5 overflow-hidden">
        <div className="ambient-glow bg-[#BF54A3]/15 w-[500px] h-[500px] top-1/2 left-0 -translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutSection isFullPage={false} />

          <div className="mt-7 sm:mt-8 text-center">
            <Link
              to="/about"
              className="glass-btn-secondary !px-7 !py-3 text-xs sm:text-sm font-semibold tracking-wide group"
            >
              <span>LEARN MORE ABOUT SOURAV &amp; STUDIO</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Client Reviews & Google Business Ratings */}
      <section className="relative py-12 sm:py-16 border-t border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoogleReviews />
        </div>
      </section>

      {/* 6. CTA Section */}
      <CTASection />

      {/* Video Playback Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={closeVideoModal}
        categoryTitle={selectedVideo ? getCategoryTitle(selectedVideo.categoryId) : undefined}
      />
    </div>
  );
};
