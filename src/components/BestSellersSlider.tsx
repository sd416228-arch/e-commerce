import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types';
import { ProductCard3D } from './ProductCard3D';

interface BestSellersSliderProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
}

export const BestSellersSlider: React.FC<BestSellersSliderProps> = ({
  products,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [isTouchPaused, setIsTouchPaused] = useState(false);
  const resumeTimeout = useRef<number | null>(null);

  useEffect(() => () => {
    if (resumeTimeout.current !== null) window.clearTimeout(resumeTimeout.current);
  }, []);

  const pauseForTouch = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return;
    if (resumeTimeout.current !== null) window.clearTimeout(resumeTimeout.current);
    setIsTouchPaused(true);
  };

  const resumeAfterTouch = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return;
    resumeTimeout.current = window.setTimeout(() => setIsTouchPaused(false), 1800);
  };

  // Items matching Screenshot 3
  const bestSellers = products.filter((p) =>
    ['mori-best-mandala-mustard', 'mori-best-mandala-black', 'mori-best-maichang', 'mori-best-aana', 'mori-ishani-wine', 'mori-ved-white'].includes(p.id)
  );

  const renderProductSet = (copy: 'primary' | 'duplicate') => (
    <div
      key={copy}
      className="customer-favorites-marquee-set"
      aria-hidden={copy === 'duplicate'}
      inert={copy === 'duplicate'}
    >
      {bestSellers.map((product) => (
        <div key={`${copy}-${product.id}`} className="w-[250px] flex-shrink-0 sm:w-[285px]">
          <ProductCard3D
            product={product}
            onOpenProduct={onOpenProduct}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.includes(product.id)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id="best-seller-section" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 border-t border-stone-200/60">
      <div className="mb-8 flex flex-col items-center gap-4 sm:mb-10">
        <div className="w-full text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-[#0A2540] tracking-wide font-sans">
            Customer Favorites
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
            Most loved and high-demand festive picks
          </p>
        </div>

      </div>

      <div
        className={`customer-favorites-marquee -mx-4 overflow-hidden px-4 sm:mx-0 sm:px-0${isTouchPaused ? ' is-touch-paused' : ''}`}
        onPointerDown={pauseForTouch}
        onPointerUp={resumeAfterTouch}
        onPointerCancel={resumeAfterTouch}
      >
        <div className="customer-favorites-marquee-track">
          {renderProductSet('primary')}
          {renderProductSet('duplicate')}
        </div>
      </div>
    </section>
  );
};
