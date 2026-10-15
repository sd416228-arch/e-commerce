import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Package, Calendar, MapPin, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping
}) => {
  useEffect(() => {
    // Launch festive confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#22c55e', '#f59e0b', '#b45309']
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 animate-in zoom-in-95 duration-200">
        
        {/* Festive Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-800 to-amber-900 p-6 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mb-2 border border-white/20">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-black tracking-tight font-serif-display">
            बधाई छ! Order Placed Successfully!
          </h2>
          <p className="text-xs text-amber-200 mt-1">
            Thank you for shopping Dashain Reloaded with SD Infininov.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Order Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Order ID</span>
              <span className="font-mono font-bold text-stone-900">{order.orderId}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Payment Method</span>
              <span className="font-bold text-stone-900">
                {order.paymentMethod === 'esewa' ? 'eSewa Mobile Wallet' : order.paymentMethod.toUpperCase()}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Total Paid</span>
              <span className="font-extrabold text-red-700 text-sm">
                Rs. {order.finalTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Delivery Window Highlight */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
            <Calendar className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm">
                {order.estimatedDeliveryDate}
              </span>
              <p className="text-emerald-700 mt-0.5 leading-relaxed">
                Courier rider will call {order.deliveryInfo.phoneNumber} before delivery to {order.deliveryInfo.city}, {order.deliveryInfo.area}.
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Items in this Shipment ({order.items.length})
            </h4>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-stone-50">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded-lg border border-stone-200"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-stone-900 truncate">{item.product.name}</p>
                    <p className="text-stone-500 text-[11px]">
                      Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-900">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Summary */}
          <div className="text-xs text-stone-600 border-t border-stone-100 pt-4">
            <span className="font-bold text-stone-800 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Delivery Destination:
            </span>
            <p>{order.deliveryInfo.fullName} • {order.deliveryInfo.phoneNumber}</p>
            <p>{order.deliveryInfo.buildingHouse}, {order.deliveryInfo.colonySuburb}</p>
            <p>{order.deliveryInfo.address}, {order.deliveryInfo.area}, {order.deliveryInfo.city}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                alert(`Invoice for ${order.orderId} generated! Saving to your Nepal downloads.`);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 py-3 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download VAT Bill
            </button>
            <button
              onClick={onContinueShopping}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#8B5E3C] py-3 text-xs font-bold text-white hover:bg-[#744C31] transition-colors shadow-lg active:scale-95"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
