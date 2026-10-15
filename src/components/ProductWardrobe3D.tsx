import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { ProductCard3D } from './ProductCard3D';

type WardrobeFilter = 'all' | 'women' | 'men' | 'dashain';

interface ProductWardrobe3DProps {
  allProducts: Product[];
  onSelectFilter: (filter: WardrobeFilter) => void;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
}

const doors: { id: WardrobeFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'dashain', label: 'Dashain Special' }
];

export const ProductWardrobe3D: React.FC<ProductWardrobe3DProps> = ({
  allProducts,
  onSelectFilter,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [openFilter, setOpenFilter] = useState<WardrobeFilter | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openFilter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [openFilter]);

  useEffect(() => {
    if (!openFilter) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenFilter(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openFilter]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || !openFilter) return;

    const updateGalleryDepth = () => {
      const galleryBounds = gallery.getBoundingClientRect();
      const galleryCenter = galleryBounds.top + galleryBounds.height / 2;
      const maxDistance = galleryBounds.height / 2;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      Array.from(gallery.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        if (reduceMotion) {
          child.style.transform = '';
          return;
        }

        const bounds = child.getBoundingClientRect();
        const itemCenter = bounds.top + bounds.height / 2;
        const relativePosition = Math.max(-1, Math.min(1, (itemCenter - galleryCenter) / maxDistance));
        const rotation = relativePosition * 8;
        const scale = 1 - Math.abs(relativePosition) * 0.035;
        child.style.transform = `perspective(1100px) rotateX(${-rotation}deg) rotateY(${relativePosition * 3}deg) scale(${scale})`;
      });
    };

    gallery.addEventListener('scroll', updateGalleryDepth, { passive: true });
    window.addEventListener('resize', updateGalleryDepth);
    const frame = window.requestAnimationFrame(updateGalleryDepth);

    return () => {
      gallery.removeEventListener('scroll', updateGalleryDepth);
      window.removeEventListener('resize', updateGalleryDepth);
      window.cancelAnimationFrame(frame);
    };
  }, [openFilter]);

  const productsForFilter = (filter: WardrobeFilter) =>
    allProducts.filter((product) => {
      if (filter === 'women') return product.gender === 'women';
      if (filter === 'men') return product.gender === 'men';
      if (filter === 'dashain') return product.isDashainSpecial;
      return true;
    });

  const activeDoor = doors.find((door) => door.id === openFilter);
  const selectedProducts = openFilter ? productsForFilter(openFilter) : [];

  // Build portal modal — rendered at document.body to fully escape the
  // perspective/transform stacking context of .product-wardrobe which would
  // otherwise clip position:fixed children to the wardrobe frame size.
  const modalPortal =
    openFilter && activeDoor
      ? ReactDOM.createPortal(
          <div
            className="wardrobe-modal-overlay"
            onClick={() => setOpenFilter(null)}
          >
            <section
              className="wardrobe-products"
              role="dialog"
              aria-modal="true"
              aria-labelledby="wardrobe-products-title"
              aria-live="polite"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="wardrobe-products-heading">
                <div>
                  <span className="wardrobe-products-eyebrow">WARDROBE COLLECTION</span>
                  <h3 id="wardrobe-products-title">{activeDoor.label} Collection</h3>
                  <p className="wardrobe-products-description">
                    Choose a piece to view details, buy it, or add it to your bag.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="wardrobe-products-count">{selectedProducts.length} pieces</span>
                  <button
                    type="button"
                    className="wardrobe-modal-close"
                    onClick={() => setOpenFilter(null)}
                    aria-label="Back to cabinets"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to cabinets</span>
                  </button>
                </div>
              </div>
              {selectedProducts.length > 0 ? (
                <div
                  ref={galleryRef}
                  className="wardrobe-gallery-scroll"
                  aria-label={`Scroll through ${activeDoor.label} products`}
                >
                  {selectedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="wardrobe-gallery-item"
                    >
                      <ProductCard3D
                        product={product}
                        onOpenProduct={onOpenProduct}
                        onAddToCart={onAddToCart}
                        onToggleWishlist={onToggleWishlist}
                        isWishlisted={wishlistIds.includes(product.id)}
                        showActions
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-sm text-stone-500">
                  This wardrobe is waiting for new arrivals.
                </p>
              )}
            </section>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="product-wardrobe">
        <div className="wardrobe-frame">
          <div className="wardrobe-top">
            <span>SD Infininov</span>
            <span className="wardrobe-top-caption">SD INFININOV • FESTIVE COLLECTION</span>
          </div>

          <div className="wardrobe-cabinet">
            {doors.map((door) => {
              const isOpen = openFilter === door.id;
              const categoryProducts = productsForFilter(door.id);
              const preview = categoryProducts[0];
              const productCount = categoryProducts.length;

              return (
                <div className="wardrobe-compartment" key={door.id}>
                  <div className="wardrobe-interior" aria-hidden="true">
                    {preview && (
                      <img src={preview.thumbnail} alt="" loading="lazy" />
                    )}
                    <span className="wardrobe-shelf" />
                  </div>
                  <button
                    type="button"
                    className={`wardrobe-door${isOpen ? ' is-open' : ''}`}
                    onClick={() => {
                      setOpenFilter(door.id);
                      onSelectFilter(door.id);
                    }}
                    aria-pressed={isOpen}
                    aria-label={`Open ${door.label} wardrobe, ${productCount} products`}
                  >
                    <span className="wardrobe-door-inset" />
                    <span className="wardrobe-door-label">{door.label}</span>
                    <span className="wardrobe-door-count">{productCount} pieces</span>
                    <span className="wardrobe-door-handle" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="wardrobe-base">
            <span>OPEN A DOOR TO EXPLORE</span>
            <span>{allProducts.length} PIECES INSIDE</span>
          </div>
        </div>
      </div>

      {/* Portal — renders at document.body, fully outside the perspective stacking context */}
      {modalPortal}
    </>
  );
};
