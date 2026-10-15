import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, DeliveryInfo, EsewaAccount, Order } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategorySplit } from './components/CategorySplit';
import { BestSellersSlider } from './components/BestSellersSlider';
import { ProductCard3D } from './components/ProductCard3D';
import { ProductWardrobe3D } from './components/ProductWardrobe3D';
import { CategoryProductsPage } from './components/CategoryProductsPage';
import { FashionReels } from './components/FashionReels';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { EsewaModal } from './components/EsewaModal';
import { EsewaPaymentOtpModal } from './components/EsewaPaymentOtpModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProfileModal } from './components/ProfileModal';
import { Footer } from './components/Footer';
import { SaleSection } from './components/SaleSection';
import { FASHION_REELS } from './data/reels';
import { Filter, ShoppingBag, CheckCircle, ArrowRight, ShieldCheck, Heart, MousePointerClick, ChevronDown } from 'lucide-react';

export default function App() {
  // Navigation & Page State
  const [currentView, setCurrentView] = useState<'shop' | 'checkout'>('shop');
  const [activeFilter, setActiveFilter] = useState<'all' | 'women' | 'men' | 'dashain'>('all');
  const [categoryPageGender, setCategoryPageGender] = useState<'women' | 'men' | null>(null);

  // Products & Wishlist
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['mori-01', 'mori-02']);

  // Cart State (Initialized with 1 Dashain item matching Screenshot 1 cart count)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedSize: 'S',
      selectedColor: 'Crimson Red',
      quantity: 1
    }
  ]);

  // Drawer / Modal Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEsewaBindingOpen, setIsEsewaBindingOpen] = useState(false);
  const [isEsewaPaymentOtpOpen, setIsEsewaPaymentOtpOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Toast notification for Add to Cart
  const [toastMessage, setToastMessage] = useState<{ text: string; show: boolean }>({
    text: '',
    show: false
  });

  // eSewa Account State
  const [esewaAccount, setEsewaAccount] = useState<EsewaAccount | null>(null);

  // Orders History
  const [orders, setOrders] = useState<Order[]>([]);

  // Promo code & discount
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Temporary pending checkout delivery info
  const [pendingDeliveryInfo, setPendingDeliveryInfo] = useState<DeliveryInfo | null>(null);

  const showToast = (text: string) => {
    setToastMessage({ text, show: true });
    setTimeout(() => {
      setToastMessage((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  // Add to cart handler with optional custom size & color
  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0]?.name || 'Standard';

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedSize === chosenSize && i.selectedColor === chosenColor
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: 1
        }
      ];
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  // Quick add to cart handler for 3D cards
  const handleQuickAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleAddToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard');
  };

  // Buy Now handler (Directly navigates to checkout)
  const handleBuyNow = (product: Product, size?: string, color?: string) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0]?.name || 'Standard';

    // Ensure item is in cart
    setCartItems((prev) => {
      const exists = prev.some(
        (i) => i.product.id === product.id && i.selectedSize === chosenSize
      );
      if (exists) return prev;
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: 1
        }
      ];
    });

    setSelectedProduct(null);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your wishlist!`);
        return [...prev, product.id];
      }
    });
  };

  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
    if (code === 'DASHAIN60' || code === 'DASHAIN') {
      const sub = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
      setDiscount(Math.round(sub * 0.15)); // 15% special festive deduction
    } else {
      setDiscount(500);
    }
  };

  // eSewa Binding success
  const handleEsewaBindingSuccess = (account: EsewaAccount) => {
    setEsewaAccount(account);
    setIsEsewaBindingOpen(false);
    showToast(`eSewa ID ${account.esewaId} linked successfully!`);
  };

  // Checkout Flows
  const handlePlaceOrderCOD = (deliveryInfo: DeliveryInfo) => {
    const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    const isFree = subtotal >= 2000;
    const fee = isFree ? 0 : 150;
    const finalTotal = Math.max(0, subtotal - discount + fee);

    const newOrder: Order = {
      orderId: `SDI-DSH-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cartItems],
      deliveryInfo,
      paymentMethod: 'cod',
      subtotal,
      deliveryFee: fee,
      discount,
      finalTotal,
      createdAt: new Date().toLocaleDateString(),
      estimatedDeliveryDate: 'Friday, 16 October 2026 (Before Dashain Tika)',
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    setCartItems([]);
    setCurrentView('shop');
  };

  // eSewa Payment trigger from checkout
  const handleInitiateEsewaPayment = (deliveryInfo: DeliveryInfo) => {
    setPendingDeliveryInfo(deliveryInfo);
    setIsEsewaPaymentOtpOpen(true);
  };

  // eSewa payment confirmed with final OTP
  const handleConfirmEsewaPaymentWithOtp = (otp: string) => {
    if (!pendingDeliveryInfo) return;

    const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    const isFree = subtotal >= 2000;
    const fee = isFree ? 0 : 150;
    const finalTotal = Math.max(0, subtotal - discount + fee);

    const newOrder: Order = {
      orderId: `SDI-ESEWA-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cartItems],
      deliveryInfo: pendingDeliveryInfo,
      paymentMethod: 'esewa',
      subtotal,
      deliveryFee: fee,
      discount,
      finalTotal,
      createdAt: new Date().toLocaleDateString(),
      estimatedDeliveryDate: 'Friday, 16 October 2026 (Priority Express Courier)',
      status: 'Confirmed',
      esewaTxnId: `ESW-${Date.now()}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    setCartItems([]);
    setIsEsewaPaymentOtpOpen(false);
    setPendingDeliveryInfo(null);
    setCurrentView('shop');
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#111111] flex flex-col font-sans">
      
      {/* Global Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onNavigateHome={() => {
          setCurrentView('shop');
          setActiveFilter('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateShop={(gender) => {
          setCurrentView('shop');
          setActiveFilter(gender === 'women' ? 'women' : gender === 'men' ? 'men' : 'all');
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAbout={() => {
          const el = document.getElementById('boutique-about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        allProducts={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        activeFilter={activeFilter}
      />

      {/* Floating Notification / Add to Cart Prompt */}
      {toastMessage.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-stone-900 px-5 py-3.5 text-white shadow-2xl border border-stone-700 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage.text}</span>
          <button
            onClick={() => {
              setToastMessage((prev) => ({ ...prev, show: false }));
              setIsCartOpen(true);
            }}
            className="ml-2 inline-flex items-center gap-1 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main View Router */}
      {currentView === 'checkout' ? (
        <CheckoutView
          cartItems={cartItems}
          onBackToShop={() => setCurrentView('shop')}
          onPlaceOrderCOD={handlePlaceOrderCOD}
          onInitiateEsewaBinding={() => setIsEsewaBindingOpen(true)}
          onInitiateEsewaPayment={handleInitiateEsewaPayment}
          esewaAccount={esewaAccount}
          discount={discount}
        />
      ) : (
        <main className="flex-1">
          {/* Dashain campaign hero and featured products */}
          <HeroBanner
            products={PRODUCTS}
            onOpenProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleQuickAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onShopNow={() => {
              setActiveFilter('all');
              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 2:- !Sale (Matching Screenshot 2) */}
          <SaleSection
            products={PRODUCTS}
            onOpenProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleQuickAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />

          {/* Customer Favorites */}
          <BestSellersSlider
            products={PRODUCTS}
            onOpenProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleQuickAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />


          {/* Shop by Style */}
          <CategorySplit
            onSelectGender={(gender) => {
              setActiveFilter(gender);
              setCategoryPageGender(gender);
            }}
            selectedGender={activeFilter}
          />

          {/* Full Festive Clothing Grid and Filter Tabs */}
          <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
            {categoryPageGender ? (
              <CategoryProductsPage
                gender={categoryPageGender}
                products={PRODUCTS.filter((product) => product.gender === categoryPageGender || product.gender === 'unisex')}
                wishlistIds={wishlistIds}
                onBack={() => setCategoryPageGender(null)}
                onOpenProduct={(p) => setSelectedProduct(p)}
                onAddToCart={handleQuickAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ) : <>
            <div className="flex justify-center pb-6 mb-8 border-b border-stone-200">
              <div className="w-full text-center">
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold flex items-center justify-center gap-1.5">
                  SHOP BY STYLE CATALOG
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                  {activeFilter === 'women'
                    ? 'Festive Collection'
                    : activeFilter === 'men'
                    ? "Men's Festive Kurtas & Vests"
                    : activeFilter === 'dashain'
                    ? 'Dashain Reloaded Special Edit'
                    : 'All Categories & Contemporary Wear'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Discover handcrafted pieces for the festive season.
                </p>
              </div>

            </div>

            <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[#0A2540]" role="note" aria-label="How to explore the collection">
              <MousePointerClick className="h-5 w-5 shrink-0 text-amber-800" />
              <strong className="text-sm tracking-wide">OPEN A DOOR TO EXPLORE</strong>
              <span className="hidden text-sm text-stone-600 sm:inline">Tap a cabinet below to view its collection.</span>
              <ChevronDown className="ml-auto h-5 w-5 shrink-0 text-amber-800" />
            </div>

            <ProductWardrobe3D
              allProducts={PRODUCTS}
              onSelectFilter={setActiveFilter}
              onOpenProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleQuickAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />
            </>}
          </section>

          {/* ── WORN BY YOU — Fashion Reels ── */}
          <FashionReels
            reels={FASHION_REELS}
            allProducts={PRODUCTS}
            onOpenProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleQuickAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />

          {/* Boutique Brand Story / Heritage Banner */}
          <section id="boutique-about" className="py-16 bg-[#F9F9F9] border-t border-stone-200">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <span className="text-4xl text-stone-900 block font-bold">SD Infininov</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 font-serif-display">
                Crafted for Dashain 2026. Made in Nepal.
              </h3>
              <p className="mt-4 text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Founded in Kathmandu, SD Infininov blends Nepal's rich textile heritage—from Palpali handwoven Dhaka to pure Mulberry silks and georgettes—with modern contemporary tailoring. Designed to make every celebration memorable.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-wider text-stone-700">
                <span>100% Nepali Handcraft</span>
                <span>•</span>
                <span>Durbar Marg &amp; Jhamsikhel</span>
                <span>•</span>
                <span>Direct eSewa Mobile Wallet Binding</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Product Detail Modal matching Screenshot 5 */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod, size, color) => {
            handleAddToCart(prod, size, color);
            setIsCartOpen(true);
          }}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          allProducts={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          wishlistIds={wishlistIds}
        />
      )}

      {/* Cart Drawer ("View Cart") */}
      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onProceedToBuy={() => {
            setIsCartOpen(false);
            setCurrentView('checkout');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          discount={discount}
          applyPromo={handleApplyPromo}
        />
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
          onAddToCart={(p) => handleAddToCart(p)}
          onOpenProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          esewaAccount={esewaAccount}
          onInitiateEsewaBinding={() => setIsEsewaBindingOpen(true)}
          orders={orders}
        />
      )}

      {/* Step 1: eSewa Binding Modal (Exact Screenshot 3 replica) */}
      {isEsewaBindingOpen && (
        <EsewaModal
          isOpen={isEsewaBindingOpen}
          onClose={() => setIsEsewaBindingOpen(false)}
          onBindingSuccess={handleEsewaBindingSuccess}
          merchantName="SD Infininov"
        />
      )}

      {/* Step 2: Final Payment OTP Authorization Modal */}
      {isEsewaPaymentOtpOpen && (
        <EsewaPaymentOtpModal
          isOpen={isEsewaPaymentOtpOpen}
          onClose={() => setIsEsewaPaymentOtpOpen(false)}
          onConfirmPayment={handleConfirmEsewaPaymentWithOtp}
          amount={
            cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0) >= 2000
              ? Math.max(0, cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0) - discount)
              : Math.max(0, cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0) - discount + 150)
          }
          esewaAccount={esewaAccount}
        />
      )}

      {/* Order Confirmation Celebratory Modal */}
      {latestOrder && (
        <OrderSuccessModal
          order={latestOrder}
          onClose={() => setLatestOrder(null)}
          onContinueShopping={() => {
            setLatestOrder(null);
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
