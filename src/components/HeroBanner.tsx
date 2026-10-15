import React from 'react';
import { Product } from '../types';
import { ProductCard3D } from './ProductCard3D';

interface HeroBannerProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  products,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onShopNow
}) => {
  const dashainProducts = products.filter((product) =>
    ['mori-ishani-blue', 'mori-ishani-wine', 'mori-saanvi-pink', 'mori-ved-white'].includes(product.id)
  );

  return (
    <>
      <section
        id="dashain-hero-section"
        className="scroll-mt-24 bg-[#F9F9F9]"
        aria-label="Dashain 2026 collection"
      >
        <div className="grid h-[min(74svh,38rem)] min-h-[31rem] grid-cols-1 overflow-hidden md:h-[min(78svh,48rem)] md:min-h-[36rem] md:grid-cols-3">
          <div className="relative hidden min-w-0 overflow-hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=90"
                alt="Dashain collection fashion"
                className="h-full w-full object-cover object-top"
                fetchPriority="high"
              />
          </div>

          <div className="relative min-w-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=90"
                alt="Woman in festive traditional clothing"
                className="h-full w-full object-cover object-[center_25%]"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center text-white md:justify-end md:pb-[8%]">
                <h1 className="hero-script text-6xl leading-[0.9] text-[#F9F9F9] drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)] sm:text-7xl md:text-6xl lg:text-7xl">
                  <span className="block">Dashain</span>
                  <span className="block">Reloaded</span>
                </h1>
                <p className="mt-5 text-lg font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] sm:text-2xl md:text-xl lg:text-2xl">
                  Festive Fits, Fresh Vibes
                </p>
                <div className="hero-cta-enter mt-7">
                  <button
                    type="button"
                    onClick={onShopNow}
                    className="hero-cta-glow min-w-40 rounded-lg bg-[#8B5E3C] px-8 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#744C31] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base md:-translate-y-6"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
          </div>

          <div className="relative hidden min-w-0 overflow-hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=90"
                alt="Dashain collection fashion"
                className="h-full w-full object-cover object-top"
                fetchPriority="high"
              />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl scroll-mt-24 px-3 py-4 sm:px-6 sm:py-12 lg:px-8" aria-labelledby="dashain-products-title">
        <div className="mb-3 text-center sm:mb-8">
          <h2
            id="dashain-products-title"
            className="text-2xl font-semibold tracking-wide text-[#111111] sm:text-4xl"
          >
            DASHAIN - स्टाइलमा मनाऔं !
          </h2>
          <p className="mt-1.5 hidden text-sm text-stone-500 sm:block">
            Festive 2026 Collection • Handcrafted pieces for the season
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {dashainProducts.map((product) => (
            <ProductCard3D
              key={product.id}
              product={product}
              onOpenProduct={onOpenProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
};
