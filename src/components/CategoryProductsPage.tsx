import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard3D } from './ProductCard3D';

interface Props {
  gender: 'women' | 'men';
  products: Product[];
  wishlistIds: string[];
  onBack: () => void;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
}

export const CategoryProductsPage: React.FC<Props> = ({ gender, products, wishlistIds, onBack, onOpenProduct, onAddToCart, onToggleWishlist }) => {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('latest');
  const highestPrice = Math.max(...products.map((product) => product.price), 1);
  const lowestPrice = Math.min(...products.map((product) => product.price), 0);
  const [priceFloor, setPriceFloor] = useState(lowestPrice);
  const [priceLimit, setPriceLimit] = useState(highestPrice);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onBack(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBack]);
  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];
  const shownProducts = useMemo(() => {
    const filtered = (category === 'All' ? [...products] : products.filter((product) => product.category === category)).filter((product) => product.price >= priceFloor && product.price <= priceLimit);
    if (sort === 'price-low') return filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, products, sort, priceFloor, priceLimit]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6" onClick={onBack}>
      <section role="dialog" aria-modal="true" aria-labelledby="category-modal-title" className="relative max-h-[94vh] w-full max-w-[1600px] overflow-y-auto rounded-2xl bg-[#F9FAFC] px-5 py-7 sm:px-8 sm:py-9 lg:px-12" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onBack} aria-label="Close collection" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-stone-100 sm:right-6 sm:top-6"><X className="h-5 w-5" /></button>
        <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <h1 className="mb-7 text-4xl font-extrabold text-[#1D2C40]">Filters</h1>
            <h2 className="mb-3 text-xl font-bold text-[#1D2C40]">Price</h2>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-600"><span className="rounded border border-slate-300 bg-white px-2 py-2">Rs. {priceFloor.toLocaleString()}</span><div className="h-1 flex-1 rounded-full bg-[#0A2540]" /><span className="rounded border border-slate-300 bg-white px-2 py-2">Rs. {priceLimit.toLocaleString()}</span></div>
            <input aria-label="Minimum price" type="range" min={lowestPrice} max={highestPrice} value={priceFloor} onChange={(event) => setPriceFloor(Math.min(Number(event.target.value), priceLimit))} className="mb-1 w-full accent-[#0A2540]" />
            <input aria-label="Maximum price" type="range" min={lowestPrice} max={highestPrice} value={priceLimit} onChange={(event) => setPriceLimit(Math.max(Number(event.target.value), priceFloor))} className="mb-7 w-full accent-[#0A2540]" />
            <h2 className="mb-3 text-xl font-bold text-[#1D2C40]">Shop Badges</h2>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {categories.map((item) => (
                <button key={item} type="button" onClick={() => setCategory(item)} className={`text-left text-sm transition-colors ${category === item ? 'font-bold text-[#8B5E3C]' : 'text-slate-600 hover:text-[#8B5E3C]'}`}>
                  {item === 'All' ? (gender === 'women' ? 'Women' : 'Men') : item}
                </button>
              ))}
            </div>
          </aside>
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">SD Infininov Collection</p><h2 id="category-modal-title" className="mt-1 text-2xl font-bold text-[#1D2C40]">{gender === 'women' ? 'Festive Collection' : "Men's Collection"}</h2></div>
              <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                <option value="latest">Sort by latest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option>
              </select>
            </div>
            {shownProducts.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {shownProducts.map((product) => <ProductCard3D key={product.id} product={product} onOpenProduct={onOpenProduct} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted={wishlistIds.includes(product.id)} showActions />)}
            </div> : <p className="rounded-xl bg-white p-10 text-center text-stone-500">No products in this collection yet.</p>}
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};
