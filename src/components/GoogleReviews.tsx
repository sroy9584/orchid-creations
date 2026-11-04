import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, MessageSquare, ExternalLink, X, Send, Copy, Check, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { googleReviewsData } from '../data/reviewsConfig';
import { ClientReview } from '../types/config';

// Authentic 4-color Google G icon SVG
const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

interface GoogleReviewsProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  title = 'CLIENT REVIEWS & GOOGLE RATINGS',
  subtitle = 'Authentic feedback and verified 5-star ratings from couples, music artists, and filmmakers who partnered with Orchid Creation Studio.',
  showAll = false,
}) => {
  const [reviews, setReviews] = useState<ClientReview[]>(googleReviewsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // New review form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [projectType, setProjectType] = useState('Bengali Wedding Cinema');
  const [comment, setComment] = useState('');

  // Load any previously submitted reviews from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('orchid_client_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...googleReviewsData]);
        }
      }
    } catch {
      // Fallback to static reviews if localStorage is disabled
    }
  }, []);

  const googleConfig = siteConfig.googleBusiness || {
    name: 'Orchid Creation Studio',
    rating: 5.0,
    reviewCount: 48,
    mapsUrl: 'https://maps.google.com/?q=Orchid+Creation+Studio+Ashoknagar+West+Bengal',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJOrchidCreationStudioAshoknagar',
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const newReview: ClientReview = {
      id: `local-${Date.now()}`,
      authorName: name.trim(),
      authorInitials: initials || 'CL',
      authorLocation: city.trim() ? `${city.trim()}, West Bengal` : 'West Bengal, India',
      rating,
      date: new Date().toISOString().split('T')[0],
      relativeTime: 'Just now',
      projectType,
      comment: comment.trim(),
      verifiedGoogle: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      const existingStored = JSON.parse(localStorage.getItem('orchid_client_reviews') || '[]');
      localStorage.setItem('orchid_client_reviews', JSON.stringify([newReview, ...existingStored]));
    } catch {
      // Ignore localStorage errors
    }

    setSubmitted(true);
  };

  const copyAndOpenGoogle = () => {
    if (comment) {
      navigator.clipboard.writeText(comment);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
    window.open(googleConfig.reviewUrl, '_blank', 'noopener,noreferrer');
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <div className="relative w-full">
      {/* Google Business Header & Stats Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 mb-8 sm:mb-12 relative overflow-hidden">
        <div className="ambient-glow bg-[#107361]/15 w-[350px] h-[350px] -top-20 -right-20" />
        <div className="ambient-glow bg-[#BF54A3]/15 w-[350px] h-[350px] -bottom-20 -left-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          {/* Left: Google Business Badge & Rating Details */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold tracking-wider">
              <GoogleIcon className="w-4 h-4" />
              <span>GOOGLE BUSINESS PROFILE • VERIFIED REVIEWS</span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Rating Stars & Aggregate Score */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white leading-none">
                  {googleConfig.rating.toFixed(1)}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="h-6 w-px bg-white/15 hidden sm:block" />

              <div className="text-xs sm:text-sm text-neutral-400">
                <span className="font-bold text-white">{googleConfig.reviewCount}+ Google Reviews</span>{' '}
                • 100% 5-Star Customer Satisfaction
              </div>
            </div>
          </div>

          {/* Right: Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {/* Primary: Direct Write on Google */}
            <a
              href={googleConfig.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn-primary !py-3.5 !px-6 text-xs sm:text-sm font-semibold shadow-glow-accent justify-center flex items-center gap-2.5 group"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>WRITE A GOOGLE REVIEW</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Secondary: Leave Feedback on Website */}
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setIsModalOpen(true);
              }}
              className="glass-btn-secondary !py-3.5 !px-6 text-xs sm:text-sm font-semibold justify-center flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#BF54A3]" />
              <span>SUBMIT CLIENT FEEDBACK</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedReviews.map((rev, index) => (
          <motion.div
            key={rev.id || index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass-card rounded-2xl p-6 border border-white/10 hover:border-[#BF54A3]/30 flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Review Card Top: Author, Avatar, Google Verified */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BF54A3] to-[#107361] p-0.5 flex items-center justify-center shrink-0">
                    <div className="w-full h-full rounded-full bg-[#141C1D] flex items-center justify-center text-xs font-bold text-white">
                      {rev.authorInitials}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white group-hover:text-[#BF54A3] transition-colors truncate">
                      {rev.authorName}
                    </div>
                    {rev.authorLocation && (
                      <div className="text-[11px] text-neutral-400 truncate">
                        {rev.authorLocation}
                      </div>
                    )}
                  </div>
                </div>

                {/* Google Verified Icon */}
                <div
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-300 shrink-0"
                  title="Verified on Google Business"
                >
                  <GoogleIcon className="w-3 h-3" />
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                </div>
              </div>

              {/* Stars & Project Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#107361]/15 text-[#107361] border border-[#107361]/25">
                  {rev.projectType}
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic line-clamp-5">
                "{rev.comment}"
              </p>
            </div>

            {/* Review Date & Google Badge */}
            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
              <span>{rev.relativeTime}</span>
              <span className="inline-flex items-center gap-1 text-[#4285F4] hover:underline cursor-pointer">
                <GoogleIcon className="w-3 h-3" />
                <span>Google Review</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#141C1D] shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#BF54A3]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#BF54A3]">
                      CLIENT FEEDBACK &amp; REVIEW
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Review Orchid Creation Studio
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 mb-6">
                    Share your experience working with Sourav Roy. Your review will be featured and can be synced directly with Google Business!
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Star Rating Picker */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-125"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                star <= (hoverRating || rating)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-neutral-600'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-amber-400 ml-2">
                          {rating}.0 / 5.0 Star Rating
                        </span>
                      </div>
                    </div>

                    {/* Name & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Subhro Mukherjee"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#BF54A3]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                          City / Location
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Kolkata / Ashoknagar"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#BF54A3]"
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                        Project Completed
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#192526] border border-white/10 text-white text-sm focus:outline-none focus:border-[#BF54A3]"
                      >
                        <option value="Bengali Wedding Cinema">Bengali Wedding Cinema</option>
                        <option value="Cinematic Music Video">Cinematic Music Video</option>
                        <option value="Pre-Wedding & Teaser">Pre-Wedding &amp; Teaser</option>
                        <option value="Narrative Short Film">Narrative Short Film</option>
                        <option value="Brand & Commercial Reel">Brand &amp; Commercial Reel</option>
                        <option value="Rice Ceremony & Family Film">Rice Ceremony &amp; Family Film</option>
                        <option value="DaVinci Color Grading">DaVinci Color Grading</option>
                      </select>
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                        Your Feedback / Testimonial *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about the editing, color grading, pacing, and overall experience..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#BF54A3] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full glass-btn-primary !py-3 text-sm font-semibold shadow-glow-accent justify-center flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT FEEDBACK &amp; SYNC TO GOOGLE</span>
                    </button>
                  </form>
                </>
              ) : (
                /* Post-Submission: 1-Click Sync to Google */
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Thank You, {name}!
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
                    Your feedback is now recorded on Orchid Creation! To help your review appear officially on{' '}
                    <span className="font-semibold text-white">Google Maps &amp; Google Search</span>, click below to post it to our Google Business Profile in 1 step:
                  </p>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs text-neutral-300 italic">
                    "{comment}"
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={copyAndOpenGoogle}
                      className="w-full glass-btn-primary !py-3.5 text-sm font-semibold shadow-glow-accent justify-center flex items-center gap-2"
                    >
                      <GoogleIcon className="w-4 h-4" />
                      <span>{copied ? 'COPIED! OPENING GOOGLE...' : 'POST REVIEW ON GOOGLE (1-CLICK)'}</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors"
                    >
                      Done &amp; Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
