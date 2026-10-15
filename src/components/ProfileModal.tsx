import React from 'react';
import { X, User, MapPin, Package, ShieldCheck, CheckCircle2, ChevronRight, LogOut, Phone, Mail } from 'lucide-react';
import { EsewaAccount, Order } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  esewaAccount: EsewaAccount | null;
  onInitiateEsewaBinding: () => void;
  orders: Order[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  esewaAccount,
  onInitiateEsewaBinding,
  orders
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-800">
        
        {/* Header */}
        <div className="bg-stone-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white font-bold text-lg">
              AS
            </div>
            <div>
              <h2 className="text-lg font-bold">Anjali Shrestha</h2>
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +977 9841558291
                </span>
                <span>•</span>
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* eSewa Mobile Wallet Status Card */}
          <div className="rounded-2xl border border-stone-200 p-4 bg-stone-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#22c55e] text-white font-black text-xs">
                  eS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    eSewa Mobile Wallet
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Seamless 1-tap checkout on SD Infininov
                  </p>
                </div>
              </div>
              {esewaAccount?.isLinked ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Linked
                </span>
              ) : (
                <span className="text-[10px] text-stone-400 font-semibold">
                  Not Linked
                </span>
              )}
            </div>

            {esewaAccount?.isLinked ? (
              <div className="mt-2 text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <p>eSewa ID: <strong className="font-mono">{esewaAccount.esewaId}</strong></p>
                  <p className="text-[11px] text-stone-500">Account: {esewaAccount.accountHolder}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700">
                    Rs. {esewaAccount.balance.toLocaleString()}
                  </span>
                  <p className="text-[10px] text-stone-400">Available</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onInitiateEsewaBinding();
                }}
                className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#22c55e] py-2 text-xs font-bold text-white hover:bg-[#16a34a] transition-all cursor-pointer shadow-sm"
              >
                <span>Link eSewa Account Now (OTP Binding)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Saved Nepal Address */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Primary Delivery Address
            </h4>
            <div className="p-3.5 rounded-2xl border border-stone-200 bg-white text-xs text-stone-700">
              <p className="font-bold text-stone-900">Anjali Shrestha (Home)</p>
              <p className="text-stone-600 mt-0.5">House No. 42, Floor 2, Kumari Galli, Near Bhatbhateni</p>
              <p className="text-stone-600">New Baneshwor, Kathmandu, Bagmati Province</p>
              <p className="text-stone-500 mt-1">Mobile: +977 9841558291</p>
            </div>
          </div>

          {/* Past Orders */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-red-600" />
              My Orders ({orders.length})
            </h4>
            {orders.length === 0 ? (
              <p className="text-xs text-stone-500 bg-stone-50 p-4 rounded-xl text-center">
                No orders yet. Add items from the Dashain collection!
              </p>
            ) : (
              <div className="space-y-2.5">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="p-3 rounded-2xl border border-stone-200 bg-white text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-stone-900">{ord.orderId}</span>
                      <span className="rounded bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-stone-500 text-[11px]">{ord.items.length} items • Rs. {ord.finalTotal.toLocaleString()}</p>
                    <p className="text-emerald-700 text-[11px] font-medium mt-0.5">
                      {ord.estimatedDeliveryDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 text-center">
          <p className="text-[11px] text-stone-500">
            SD Infininov • Kathmandu, Nepal • Customer Support: +977-01-4422990
          </p>
        </div>

      </div>
    </div>
  );
};
