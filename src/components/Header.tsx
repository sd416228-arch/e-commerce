import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, X, Menu, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
  onNavigateHome: () => void;
  onNavigateShop: (gender?: 'women' | 'men' | 'all') => void;
  onOpenAbout: () => void;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
  activeFilter: 'all' | 'women' | 'men' | 'dashain';
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenProfile,
  onNavigateHome,
  onNavigateShop,
  onOpenAbout,
  allProducts,
  onSelectProduct,
  activeFilter
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSearchResults = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.nepaliName && p.nepaliName.includes(searchQuery)) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#F9F9F9]/95 backdrop-blur-md">
      {/* Top Dashain Festive Announcement Banner */}
      <div className="flex min-h-[34px] items-center justify-center bg-[#8B5E3C] px-2 py-1.5 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs md:text-sm">
        <span className="flex items-center gap-1.5 tracking-wide">
          <span>DASHAIN <strong className="italic">SALE</strong> IS ON -</span>
          <strong className="font-extrabold">UP TO 60% OFF</strong>
        </span>
        <span className="ml-2 hidden text-xs text-white/85 md:inline">
          | नि:शुल्क डेलिभरी (Free Delivery on all festive orders across Nepal)
        </span>
      </div>

      {/* Main Header / Navigation Bar matching Screenshot 4 */}
      <div className="bg-[#0A2540] text-white backdrop-blur-sm">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[52px] items-center justify-between md:h-20">
            
            {/* Left Navigation Links matching Screenshot 4 */}
            <nav className="hidden items-center space-x-6 sm:space-x-8 md:flex">
              <button
                onClick={onNavigateHome}
                className="text-xs md:text-sm font-bold tracking-wider text-white hover:text-[#D5B69B] transition-colors uppercase"
              >
                HOME
              </button>
              <button
                onClick={() => onNavigateShop('all')}
                className="text-xs md:text-sm font-bold tracking-wider text-white hover:text-[#D5B69B] transition-colors uppercase"
              >
                SHOP
              </button>
              <button
                onClick={onOpenAbout}
                className="text-xs md:text-sm font-bold tracking-wider text-white hover:text-[#D5B69B] transition-colors uppercase"
              >
                ABOUT
              </button>
            </nav>

            {/* Center Brand Logo in bold white Devanagari matching Screenshot 4 */}
            <button
              type="button"
              className="flex flex-1 cursor-pointer flex-col items-start justify-center text-left md:items-center md:text-center"
              onClick={onNavigateHome}
              aria-label="SD Infininov home"
            >
              <span className="font-nepali text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                SDI
              </span>
              <span className="-mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D5B69B] md:block">
                SD INFININOV
              </span>
            </button>

            {/* Right Action Icons in white matching Screenshot 4 */}
            <div className="flex items-center space-x-1.5 text-white sm:space-x-3 md:space-x-5">
              {/* Search Button & Popover */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="rounded-full p-2 text-white hover:bg-white/10 hover:text-[#D5B69B]"
                  title="Search Products"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

              {/* Search Dropdown Dialog */}
              {isSearchOpen && (
                <div className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-stone-200 bg-white p-4 shadow-2xl sm:w-96">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Kurta, Anarkali, Dhaka, Dashain..."
                      className="w-full rounded-xl bg-stone-100 pl-9 pr-9 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:bg-white"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 text-stone-400 hover:text-stone-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Instant Live Search Results */}
                  {searchQuery.trim() && (
                    <div className="mt-3 max-h-72 overflow-y-auto divide-y divide-stone-100">
                      {filteredSearchResults.length > 0 ? (
                        filteredSearchResults.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              onSelectProduct(prod);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-xl cursor-pointer transition-colors"
                          >
                            <img
                              src={prod.thumbnail}
                              alt={prod.name}
                              className="w-12 h-14 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-stone-900 truncate">
                                {prod.name}
                              </p>
                              <p className="text-[11px] text-stone-500">{prod.category}</p>
                              <p className="text-xs font-bold text-red-700">
                                Rs. {prod.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-xs text-stone-500">
                          No festive garments found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Popular: Red Anarkali, Dhaka Kurta, Men Kurta</span>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="relative hidden rounded-full p-2 text-white hover:bg-white/10 hover:text-[#D5B69B] md:block"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              onClick={onOpenProfile}
              className="hidden rounded-full p-2 text-white hover:bg-white/10 hover:text-[#D5B69B] md:block"
              title="My Account & eSewa Wallet"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button with counter badge as shown in screenshot 4 */}
            <button
              onClick={onOpenCart}
              className="relative hidden rounded-full p-2 text-white hover:bg-white/10 hover:text-[#D5B69B] md:block"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-[#8B5E3C] shadow-sm">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 text-white hover:bg-white/10 md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="absolute left-0 right-0 top-full z-50 grid gap-1 border-t border-white/20 bg-[#0A2540] p-3 text-sm shadow-lg md:hidden">
              <button
                onClick={() => {
                  onNavigateShop('all');
                  setIsMenuOpen(false);
                }}
                className="rounded px-3 py-2 text-left font-semibold hover:bg-white/10"
              >
                Shop all
              </button>
              <button
                onClick={() => {
                  onOpenAbout();
                  setIsMenuOpen(false);
                }}
                className="rounded px-3 py-2 text-left font-semibold hover:bg-white/10"
              >
                About
              </button>
              <button
                onClick={() => {
                  onOpenWishlist();
                  setIsMenuOpen(false);
                }}
                className="rounded px-3 py-2 text-left font-semibold hover:bg-white/10"
              >
                Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}
              </button>
              <button
                onClick={() => {
                  onOpenProfile();
                  setIsMenuOpen(false);
                }}
                className="rounded px-3 py-2 text-left font-semibold hover:bg-white/10"
              >
                My account
              </button>
              <button
                onClick={() => {
                  onOpenCart();
                  setIsMenuOpen(false);
                }}
                className="rounded px-3 py-2 text-left font-semibold hover:bg-white/10"
              >
                Shopping bag ({cartCount})
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>

    </header>
  );
};
