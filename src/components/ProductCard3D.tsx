import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCard3DProps {
  product: Product;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  isWishlisted?: boolean;
  showActions?: boolean;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  showActions = false
}) => (
  <div
    onClick={() => onOpenProduct(product)}
    className="group relative cursor-pointer select-none rounded-2xl bg-[#F9F9F9] p-3.5"
  >
    <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-[#F9F9F9] shadow-sm">
      <div className="pointer-events-none absolute inset-0 z-20 rounded-xl border border-white/60" />

      <div className="absolute left-3 top-3 z-30 flex flex-col gap-1.5">
        {product.discountPercent ? (
          <span className="inline-block rounded bg-[#8B5E3C] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
            {product.discountPercent}% OFF
          </span>
        ) : product.stockCount <= 6 ? (
          <span className="inline-block rounded bg-[#111111] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
            SOLD OUT
          </span>
        ) : product.isDashainSpecial ? (
          <span className="inline-flex items-center gap-1 rounded bg-stone-900 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm">
            DASHAIN RELOADED
          </span>
        ) : null}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product, e);
        }}
        aria-label="Add to wishlist"
        className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-md"
      >
        <Heart
          className={`h-4 w-4 ${
            isWishlisted ? 'fill-red-600 text-red-600' : 'text-stone-700'
          }`}
        />
      </button>

      <div className="relative flex aspect-[3/4.2] w-full items-center justify-center overflow-hidden bg-[#F3F3F3]">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100" />

        <div className={`absolute bottom-3 left-3 right-3 z-30 flex gap-2 ${showActions ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#8B5E3C] px-3 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-[#744C31]"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenProduct(product);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-stone-900 shadow-md hover:bg-stone-100"
            title="Quick View"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <div className="mt-3.5 px-1 text-center">
      <h3 className="line-clamp-1 text-sm font-semibold text-stone-900 sm:text-base">
        {product.name}
      </h3>

      <div className="mt-1 flex items-center justify-center gap-2">
        <span className="text-sm font-bold text-stone-900">
          Rs. {product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-xs text-stone-400 line-through">
            Rs. {product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  </div>
);
