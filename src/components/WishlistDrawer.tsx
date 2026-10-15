import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h2 className="text-lg font-bold text-stone-900">Your Festive Wishlist</h2>
              <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-semibold text-stone-700">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <Heart className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-base font-bold text-stone-800">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Save your favorite Dashain Reloaded festive kurtas, dresses and anarkalis by tapping the heart icon.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 rounded-full bg-[#8B5E3C] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#744C31] transition-colors"
                >
                  Explore Dashain Items
                </button>
              </div>
            ) : (
              wishlistProducts.map((prod) => (
                <div key={prod.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    onClick={() => {
                      onOpenProduct(prod);
                      onClose();
                    }}
                    className="h-24 w-20 rounded-xl object-cover border border-stone-200 flex-shrink-0 cursor-pointer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            onOpenProduct(prod);
                            onClose();
                          }}
                          className="text-sm font-bold text-stone-900 line-clamp-1 hover:text-red-700 cursor-pointer"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(prod.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500">{prod.category}</p>
                      <div className="mt-1 text-sm font-bold text-stone-900">
                        Rs. {prod.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(prod);
                          onRemoveFromWishlist(prod.id);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#8B5E3C] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#744C31] transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
