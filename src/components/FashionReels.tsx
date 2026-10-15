import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  BadgeCheck,
  Eye,
  Heart,
} from 'lucide-react';
import { FashionReel, Product, ReelCategory } from '../types';

/* ─────────────────────────────────────────────── */
/* Types                                           */
/* ─────────────────────────────────────────────── */

interface FashionReelsProps {
  reels: FashionReel[];
  allProducts: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
}

/* ─────────────────────────────────────────────── */
/* Category filter definitions                    */
/* ─────────────────────────────────────────────── */

const REEL_CATEGORIES: { id: ReelCategory; label: string }[] = [
  { id: 'all', label: 'All Videos' },
  { id: 'customer-reviews', label: 'Customer Reviews' },
  { id: 'on-our-models', label: 'On Our Models' },
  { id: 'outfit-inspiration', label: 'Outfit Inspiration' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'dashain-looks', label: 'Dashain Looks' },
];

/* ─────────────────────────────────────────────── */
/* Helpers                                        */
/* ─────────────────────────────────────────────── */

function formatViews(n?: number): string {
  if (!n) return '';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ─────────────────────────────────────────────── */
/* Reel card (gallery item)                        */
/* ─────────────────────────────────────────────── */

interface ReelCardProps {
  reel: FashionReel;
  isPlaying: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onTap: () => void;
  onClick: () => void;
  reducedMotion: boolean;
}

const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  isPlaying,
  onHoverStart,
  onHoverEnd,
  onTap,
  onClick,
  reducedMotion,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* IntersectionObserver — pause when out of view */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  /* Play / pause in sync with parent state */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || hasError || !isVisible) return;
    if (isPlaying && !reducedMotion) {
      vid.play().catch(() => setHasError(true));
    } else {
      vid.pause();
    }
  }, [isPlaying, isVisible, hasError, reducedMotion]);

  /* Pause when tab hidden */
  useEffect(() => {
    const handler = () => {
      if (document.hidden) videoRef.current?.pause();
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const hasVideo = !!reel.videoUrl && !hasError;

  return (
    <div
      ref={cardRef}
      className="reel-card"
      onMouseEnter={hasVideo ? onHoverStart : undefined}
      onMouseLeave={hasVideo ? onHoverEnd : undefined}
      onClick={onClick}
    >
      {/* Poster image */}
      <img
        src={reel.posterUrl}
        alt={reel.caption}
        className={`reel-poster${isLoaded && isPlaying && hasVideo ? ' reel-poster--hidden' : ''}`}
        loading="lazy"
      />

      {/* Video element — lazy loaded, muted, inline */}
      {hasVideo && (
        <video
          ref={videoRef}
          className={`reel-video${isLoaded && isPlaying ? ' reel-video--visible' : ''}`}
          src={reel.videoUrl}
          poster={reel.posterUrl}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Gradient overlay */}
      <div className="reel-gradient" />

      {/* Play icon (idle state) */}
      {!isPlaying && hasVideo && (
        <button
          type="button"
          className="reel-play-icon"
          aria-label={`Play reel by ${reel.creatorName}`}
          onClick={(e) => {
            e.stopPropagation();
            onTap();
          }}
        >
          <Play className="w-5 h-5" fill="white" />
        </button>
      )}

      {/* Bottom info overlay */}
      <div className="reel-info">
        <div className="reel-creator-row">
          <span className="reel-creator">{reel.creatorName}</span>
          {reel.verifiedPurchase && (
            <span className="reel-verified" title="Verified Purchase">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          )}
        </div>
        <p className="reel-caption">{reel.caption}</p>
        <div className="reel-meta-row">
          {reel.duration && <span className="reel-meta">{reel.duration}</span>}
          {reel.views && (
            <span className="reel-meta">
              <Eye className="w-3 h-3 inline mr-0.5" />
              {formatViews(reel.views)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────── */
/* Lightbox modal                                  */
/* ─────────────────────────────────────────────── */

interface LightboxProps {
  reels: FashionReel[];
  currentIndex: number;
  allProducts: Product[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
}

const Lightbox: React.FC<LightboxProps> = ({
  reels,
  currentIndex,
  allProducts,
  onClose,
  onNavigate,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const reel = reels[currentIndex];
  const product = allProducts.find((p) => p.id === reel.relatedProductId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < reels.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, onClose, onNavigate, reels.length]);

  /* Reset on reel change */
  useEffect(() => {
    setHasError(false);
    setIsPlaying(true);
    setProgress(0);
  }, [currentIndex]);

  /* Sync play state to video */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || hasError) return;
    if (isPlaying) {
      vid.play().catch(() => setHasError(true));
    } else {
      vid.pause();
    }
  }, [isPlaying, hasError]);

  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    vid.currentTime = ratio * vid.duration;
  };

  const toggleMute = () => {
    setIsMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  return ReactDOM.createPortal(
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video by ${reel.creatorName}`}
    >
      <div
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left: Video panel ── */}
        <div className="lightbox-video-panel">
          {/* Nav buttons */}
          {currentIndex > 0 && (
            <button
              type="button"
              className="lightbox-nav lightbox-nav--prev"
              onClick={() => onNavigate(currentIndex - 1)}
              aria-label="Previous video"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {currentIndex < reels.length - 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-nav--next"
              onClick={() => onNavigate(currentIndex + 1)}
              aria-label="Next video"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Video */}
          {!hasError ? (
            <video
              ref={videoRef}
              className="lightbox-video"
              src={reel.videoUrl}
              poster={reel.posterUrl}
              muted={isMuted}
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onError={() => setHasError(true)}
              onClick={() => setIsPlaying((p) => !p)}
            />
          ) : (
            <img
              src={reel.posterUrl}
              alt={reel.caption}
              className="lightbox-video lightbox-poster-fallback"
            />
          )}

          {/* Controls bar */}
          <div className="lightbox-controls">
            <button
              type="button"
              className="lightbox-ctrl-btn"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" fill="currentColor" />}
            </button>

            {/* Progress bar */}
            <div
              className="lightbox-progress-track"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              onClick={handleSeek}
              title="Seek video"
            >
              <div className="lightbox-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            {reel.duration && (
              <span className="lightbox-duration">{reel.duration}</span>
            )}

            <button
              type="button"
              className="lightbox-ctrl-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ── Right: Info panel ── */}
        <div className="lightbox-info-panel">
          {/* Close */}
          <button
            type="button"
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Creator */}
          <div className="lightbox-creator-section">
            <div className="lightbox-creator-avatar" aria-hidden="true">
              {reel.creatorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="lightbox-creator-name">{reel.creatorName}</p>
              {reel.creatorHandle && (
                <p className="lightbox-creator-handle">{reel.creatorHandle}</p>
              )}
            </div>
            {reel.verifiedPurchase && (
              <span className="lightbox-verified-badge">
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified Purchase
              </span>
            )}
          </div>

          {/* Caption */}
          <p className="lightbox-caption">{reel.caption}</p>

          {/* Product card */}
          {product && (
            <div className="lightbox-product-card">
              <span className="lightbox-product-eyebrow">FEATURED IN THIS LOOK</span>
              <div className="lightbox-product-body">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="lightbox-product-thumb"
                  loading="lazy"
                />
                <div className="lightbox-product-info">
                  <p className="lightbox-product-name">{product.name}</p>
                  <p className="lightbox-product-price">
                    Rs. {product.price.toLocaleString()}
                    {product.originalPrice && (
                      <span className="lightbox-product-original">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </p>
                  {product.discountPercent && (
                    <span className="lightbox-product-badge">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="lightbox-wishlist-btn"
                  onClick={(e) => onToggleWishlist(product, e)}
                  aria-label={wishlistIds.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlistIds.includes(product.id)
                        ? 'fill-red-600 text-red-600'
                        : 'text-stone-500'
                    }`}
                  />
                </button>
              </div>
              <div className="lightbox-product-actions">
                <button
                  type="button"
                  className="lightbox-shop-btn"
                  onClick={() => {
                    onOpenProduct(product);
                    onClose();
                  }}
                >
                  <Eye className="w-4 h-4" />
                  Shop This Look
                </button>
                {product.inStock && (
                  <button
                    type="button"
                    className="lightbox-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, e);
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Reel index indicator */}
          <div className="lightbox-reel-dots" role="tablist" aria-label="Video navigation">
            {reels.map((r, i) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Video ${i + 1} of ${reels.length}`}
                className={`lightbox-dot${i === currentIndex ? ' lightbox-dot--active' : ''}`}
                onClick={() => onNavigate(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ─────────────────────────────────────────────── */
/* Main FashionReels section                      */
/* ─────────────────────────────────────────────── */

export const FashionReels: React.FC<FashionReelsProps> = ({
  reels,
  allProducts,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<ReelCategory>('all');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  const publishedReels = reels.filter((r) => r.published !== false);
  const filtered =
    activeCategory === 'all'
      ? publishedReels
      : publishedReels.filter((r) => r.category === activeCategory);

  /* Only one card plays at a time */
  const handleHoverStart = useCallback((id: string) => {
    setActiveCardId(id);
  }, []);

  const handleHoverEnd = useCallback((id: string) => {
    setActiveCardId((cur) => (cur === id ? null : cur));
  }, []);

  const handleTap = useCallback((id: string) => {
    setActiveCardId((cur) => (cur === id ? null : id));
  }, []);

  return (
    <section
      id="fashion-reels-section"
      className="reels-section"
      aria-label="Worn By You — Fashion Reels"
    >
      {/* ── Section header ── */}
      <div className="reels-header">
        <div className="reels-eyebrow">
          <span className="reels-eyebrow-line" aria-hidden="true" />
          <span>WORN BY YOU</span>
          <span className="reels-eyebrow-line" aria-hidden="true" />
        </div>
        <h2 className="reels-title">Real people. Real style.</h2>
        <p className="reels-subtitle">Your next favourite outfit.</p>
      </div>

      {/* ── Category filters ── */}
      <div className="reels-filters" role="tablist" aria-label="Filter by category">
        {REEL_CATEGORIES.map((cat) => {
          const count =
            cat.id === 'all'
              ? publishedReels.length
              : publishedReels.filter((r) => r.category === cat.id).length;
          if (count === 0 && cat.id !== 'all') return null;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`reels-filter-btn${activeCategory === cat.id ? ' reels-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              {count > 0 && <span className="reels-filter-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* ── Gallery ── */}
      {filtered.length === 0 ? (
        <p className="reels-empty">No videos in this category yet.</p>
      ) : (
        <div className="reels-gallery" aria-label={`${filtered.length} videos`}>
          {filtered.map((reel, idx) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              isPlaying={activeCardId === reel.id}
              onHoverStart={() => handleHoverStart(reel.id)}
              onHoverEnd={() => handleHoverEnd(reel.id)}
              onTap={() => handleTap(reel.id)}
              onClick={() => setLightboxIndex(idx)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          reels={filtered}
          currentIndex={lightboxIndex}
          allProducts={allProducts}
          onClose={() => {
            setLightboxIndex(null);
            setActiveCardId(null);
          }}
          onNavigate={setLightboxIndex}
          onOpenProduct={onOpenProduct}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlistIds={wishlistIds}
        />
      )}
    </section>
  );
};
