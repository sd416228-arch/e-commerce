import React from 'react';
import { Product } from '../types';
import { ProductCard3D } from './ProductCard3D';

interface SaleSectionProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlistIds: string[];
}

export const SaleSection: React.FC<SaleSectionProps> = ({
  products,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  // 4 Specific Sale pieces from Screenshot 2:
  // Enaya ( Halter Top ), Rina ( Halter Neck Kurti ), Kaylie (Long Black), Dripti ( Black Floral )
  const saleProducts = products.filter((p) =>
    ['mori-sale-enaya', 'mori-sale-rina', 'mori-sale-kaylie', 'mori-sale-dripti'].includes(p.id)
  );

  return (
    <section id="sale-section" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 border-t border-stone-200/60">
      {/* Festive offers */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-5xl font-black text-[#0A2540] tracking-wide font-sans">
          Festive Offers
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
          Special Festive Markdowns • Up to 50% OFF
        </p>
      </div>

      {/* 4-Item Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {saleProducts.map((product) => (
          <div key={product.id} className="flex flex-col">
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
    </section>
  );
};
