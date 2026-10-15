import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToBuy: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discount: number;
  applyPromo: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToBuy,
  promoCode,
  setPromoCode,
  discount,
  applyPromo
}) => {
  const [inputCode, setInputCode] = useState(promoCode);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const isFreeDelivery = subtotal >= 2500 || cartItems.length === 0;
  const deliveryFee = isFreeDelivery ? 0 : 150;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromo(inputCode.trim().toUpperCase());
    if (inputCode.trim().toUpperCase() === 'DASHAIN60' || inputCode.trim().toUpperCase() === 'DASHAIN') {
      setPromoMessage('Festive 15% Dashain discount applied!');
    } else {
      setPromoMessage('Rs. 500 Welcome discount applied!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-700" />
              <h2 className="text-lg font-bold text-stone-900">Your Shopping Bag</h2>
              <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-semibold text-stone-700">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover our exclusive Dashain Reloaded festive outfits and add your favorite kurtas and anarkalis.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 rounded-full bg-[#8B5E3C] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#744C31] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Item Image */}
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="h-24 w-20 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                        <span className="font-medium text-stone-700">Size: {item.selectedSize}</span>
                        <span>•</span>
                        <span>Color: {item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-stone-200 rounded-l transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 text-stone-600" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-stone-200 rounded-r transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 text-stone-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-stone-900">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-stone-400">
                            Rs. {item.product.price.toLocaleString()} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. DASHAIN60)"
                    className="w-full rounded-xl border border-stone-300 bg-white pl-8 pr-3 py-2 text-xs uppercase font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-[#8B5E3C] px-4 py-2 text-xs font-bold text-white hover:bg-[#744C31] transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className="text-xs text-emerald-700 font-medium -mt-2">
                  {promoMessage}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Dashain Festive Discount</span>
                    <span className="font-semibold">-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Delivery in Nepal</span>
                  <span className="font-semibold text-emerald-700">
                    {isFreeDelivery ? 'FREE (Dashain Special)' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Payable</span>
                  <span className="text-base text-red-700">Rs. {finalTotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-stone-400 text-right">
                  All taxes included
                </p>
              </div>

              {/* Buy / Checkout Button */}
              <button
                onClick={onProceedToBuy}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#8B5E3C] py-3.5 text-sm font-bold text-white shadow-xl hover:bg-[#744C31] active:scale-95 transition-all cursor-pointer"
              >
                <span>Buy / Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>eSewa Mobile Wallet, COD & SCT Card Accepted</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
