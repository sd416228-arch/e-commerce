import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard3D } from './ProductCard3D';

interface ProductCarousel3DProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
}

export const ProductCarousel3D: React.FC<ProductCarousel3DProps> = ({
  products,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const angle = 360 / products.length;

  if (products.length === 0) return null;

  return (
    <section
      className={`product-carousel-3d${isPaused ? ' is-paused' : ''}`}
      aria-label="3D product carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="product-carousel-3d-stage">
        <div
          className="product-carousel-3d-ring"
          style={{ '--product-carousel-angle': `${angle}deg` } as React.CSSProperties}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-carousel-3d-panel"
              style={{
                transform: `translate(-50%, -50%) rotateY(${index * angle}deg) translateZ(var(--product-carousel-radius))`
              }}
            >
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
      </div>
    </section>
  );
};
