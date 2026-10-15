import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageSquarePlus,
  Ruler
} from 'lucide-react';
import { Product, Review } from '../types';
import { ProductCard3D } from './ProductCard3D';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onBuyNow: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  allProducts,
  onSelectProduct,
  wishlistIds
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Crimson Red');
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'size' | 'shipping'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.gender === product.gender || p.category === product.category))
    .slice(0, 4);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !newReviewAuthor.trim()) return;
    setIsSubmittingReview(true);
    setTimeout(() => {
      const createdReview: Review = {
        id: `rev-${Date.now()}`,
        userName: newReviewAuthor.trim(),
        rating: newReviewRating,
        date: 'Just now',
        comment: newReviewComment.trim(),
        verified: true,
        location: 'Kathmandu'
      };
      setReviewsList([createdReview, ...reviewsList]);
      setNewReviewComment('');
      setNewReviewAuthor('');
      setIsSubmittingReview(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-stone-900/70 backdrop-blur-sm transition-all duration-300">
      <div className="min-h-screen px-2 sm:px-4 py-6 md:py-12 flex items-start justify-center">
        
        {/* Main Modal Container */}
        <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Product View"
            className="absolute top-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md hover:bg-stone-100 hover:text-stone-900 transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product View Top Section (Gallery + Purchase Info) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-5 sm:p-8 lg:p-10">
            
            {/* Left Column: Gallery Matching Screenshot 5 */}
            <div className="md:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              
              {/* Thumbnail List */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-20 w-16 sm:w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-red-600 ring-2 ring-red-200'
                        : 'border-stone-200 hover:border-stone-400 opacity-80'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image with Zoom Lens Container */}
              <div className="relative flex-1 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-[3/4] group">
                <img
                  src={product.images[selectedImageIndex] || product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {product.isDashainSpecial && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                      DASHAIN RELOADED SPECIAL
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Product Details & Actions */}
            <div className="md:col-span-6 flex flex-col">
              
              {/* Category Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-800">
                <span>{product.gender}</span>
                <span>/</span>
                <span>{product.category}</span>
                {product.isBestSeller && (
                  <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                {product.name}
              </h1>

              {product.nepaliName && (
                <p className="text-base text-stone-600 font-nepali mt-1">
                  {product.nepaliName}
                </p>
              )}

              {/* Rating & Reviews */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-stone-800">{product.rating}</span>
                <span className="text-xs text-stone-500">
                  ({reviewsList.length} verified Nepal reviews)
                </span>
              </div>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-stone-900">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* In Stock Indicator */}
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-700">
                  {product.inStock
                    ? `In Stock (${product.stockCount} left in Kathmandu Warehouse)`
                    : 'Out of Stock'}
                </span>
                <span className="text-stone-400">|</span>
                <span className="text-stone-500 font-normal">Ready to dispatch</span>
              </div>

              {/* Color Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                  <span>Color: <strong className="text-stone-900 font-bold">{selectedColor}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative h-8 w-8 rounded-full border-2 transition-transform active:scale-90 ${
                        selectedColor === c.name
                          ? 'border-stone-900 scale-110 shadow-sm'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className="w-4 h-4 text-white mx-auto drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector + Size Guide */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                  <span>Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 text-xs text-amber-800 hover:text-red-700 underline font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-12 px-3 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-[#8B5E3C] text-white shadow-md'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {showSizeGuide && (
                  <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                    <p className="font-semibold text-stone-900 mb-1">Nepal Standard Festive Sizing:</p>
                    <p>XS (Bust/Chest: 32-34") • S (36") • M (38-40") • L (42") • XL (44") • XXL (46")</p>
                  </div>
                )}
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-3">
                
                {/* Add to Cart */}
                <button
                  onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#8B5E3C] py-3.5 px-6 text-sm font-bold text-white shadow-lg hover:bg-[#744C31] active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>

                {/* Buy Now (Direct Checkout) */}
                <button
                  onClick={() => onBuyNow(product, selectedSize, selectedColor)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#8B5E3C] py-3.5 px-6 text-sm font-bold text-white shadow-lg hover:bg-[#744C31] active:scale-95 transition-all"
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  Buy Now
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`flex h-12 w-12 sm:w-14 items-center justify-center rounded-2xl border transition-all active:scale-95 ${
                    isWishlisted
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:text-red-600'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* Service Badges */}
              <div className="mt-6 grid grid-cols-3 gap-2 py-4 border-y border-stone-200 text-center text-[11px] text-stone-600">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-amber-800 mb-1" />
                  <span className="font-semibold text-stone-800">Free Delivery</span>
                  <span>Inside Kathmandu</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-amber-800 mb-1" />
                  <span className="font-semibold text-stone-800">Easy Exchange</span>
                  <span>7-Day Festive Policy</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-amber-800 mb-1" />
                  <span className="font-semibold text-stone-800">100% Authentic</span>
                  <span>SD Infininov Kathmandu</span>
                </div>
              </div>

              {/* Categories & Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-stone-400">Tags:</span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* Accordion / Tabs for Details, Materials, Size & Fit */}
          <div className="px-5 sm:px-8 lg:px-10 pb-8 border-t border-stone-200 pt-6">
            <div className="flex border-b border-stone-200 overflow-x-auto gap-6 sm:gap-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'materials'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Materials & Care
              </button>
              <button
                onClick={() => setActiveTab('size')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'size'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Size & Fit
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'shipping'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Nepal Delivery & eSewa
              </button>
            </div>

            <div className="py-5 text-sm text-stone-600 leading-relaxed">
              {activeTab === 'details' && (
                <ul className="space-y-2 list-disc pl-5">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'materials' && (
                <div className="space-y-2">
                  <p><strong>Fabric:</strong> {product.materials}</p>
                  <p><strong>Care Instructions:</strong> Dry clean recommended for delicate zari & gota borders. Gentle hand wash in cold water for cotton pieces.</p>
                </div>
              )}
              {activeTab === 'size' && (
                <div className="space-y-2">
                  <p>{product.sizeAndFit}</p>
                  <p className="text-xs text-stone-500">Need custom tailoring before Dashain Tika? Leave a note at checkout or contact our Durbar Marg boutique.</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p><strong>Kathmandu Valley:</strong> Same day or next day delivery (1 - 2 business days).</p>
                  <p><strong>Outside Valley (Pokhara, Chitwan, Dharan, Butwal, etc.):</strong> 2 - 4 business days via express courier.</p>
                  <p><strong>Payment Options:</strong> Cash on Delivery (COD), Direct eSewa Mobile Wallet Binding with instant OTP, or Debit/Credit Card.</p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="px-5 sm:px-8 lg:px-10 pb-10 border-t border-stone-200 pt-8 bg-stone-50/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  Customer Reviews ({reviewsList.length})
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Authentic ratings from customers across Nepal.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-stone-900">{product.rating}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Existing Reviews List */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-stone-900">{rev.userName}</span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
                          <Check className="w-2.5 h-2.5" /> Verified Purchase ({rev.location})
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <form onSubmit={handleAddReview} className="mt-6 p-4 rounded-2xl bg-white border border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                <MessageSquarePlus className="w-4 h-4 text-red-600" />
                Leave a Festive Review
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="Your Full Name (e.g. Shraddha M.)"
                  className="rounded-xl border border-stone-200 px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <div className="flex items-center gap-2 px-1">
                  <span className="text-xs text-stone-500">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= newReviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea
                required
                rows={2}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="How does this cloth look and fit for Dashain?"
                className="w-full rounded-xl border border-stone-200 p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <div className="mt-2 text-right">
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="rounded-xl bg-[#8B5E3C] px-4 py-2 text-xs font-bold text-white hover:bg-[#744C31] active:scale-95 transition-all"
                >
                  {isSubmittingReview ? 'Posting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>

          {/* Related Products Section ("while scrolling the same page i want related productes to be shown") */}
          <div className="px-5 sm:px-8 lg:px-10 py-10 border-t border-stone-200 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  You May Also Like
                </h3>
                <p className="text-xs text-stone-500">
                  Matching Dashain festive looks recommended for you
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard3D
                  key={relProduct.id}
                  product={relProduct}
                  onOpenProduct={(p) => {
                    onSelectProduct(p);
                    setSelectedImageIndex(0);
                    setSelectedSize(p.sizes[0] || 'M');
                    setSelectedColor(p.colors[0]?.name || 'Crimson Red');
                  }}
                  onAddToCart={(p) => onAddToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard')}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(relProduct.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
