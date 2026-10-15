import React, { useState } from 'react';
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Calendar,
  CheckCircle2,
  Clock,
  Lock,
  ChevronRight
} from 'lucide-react';
import { CartItem, DeliveryInfo, PaymentMethod, EsewaAccount } from '../types';
import { NEPAL_REGIONS } from '../data/products';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onBackToShop: () => void;
  onPlaceOrderCOD: (deliveryInfo: DeliveryInfo) => void;
  onInitiateEsewaBinding: () => void;
  onInitiateEsewaPayment: (deliveryInfo: DeliveryInfo) => void;
  esewaAccount: EsewaAccount | null;
  discount: number;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onBackToShop,
  onPlaceOrderCOD,
  onInitiateEsewaBinding,
  onInitiateEsewaPayment,
  esewaAccount,
  discount
}) => {
  // Delivery Information Form States
  const [fullName, setFullName] = useState('Anjali Shrestha');
  const [phoneNumber, setPhoneNumber] = useState('9841558291');
  const [buildingHouse, setBuildingHouse] = useState('House No. 42, Floor 2, Kumari Galli');
  const [colonySuburb, setColonySuburb] = useState('Near Bhatbhateni Supermarket');
  const [email, setEmail] = useState('anjali.shrestha@gmail.com');
  const [region, setRegion] = useState('Bagmati Province (बागमती प्रदेश)');
  const [city, setCity] = useState('Kathmandu');
  const [area, setArea] = useState('Baneshwor');
  const [address, setAddress] = useState('New Baneshwor, Ward No. 10, Kathmandu, Nepal');
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Dynamic calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  
  // Free delivery criteria: orders above Rs. 2,000 or Dashain festive special
  const isDeliveryFree = subtotal >= 2000;
  const deliveryFee = isDeliveryFree ? 0 : 150;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Delivery estimation calculations
  const today = new Date();
  const deliveryStandardDays = 2;
  const standardDate = new Date(today);
  standardDate.setDate(today.getDate() + deliveryStandardDays);
  const formattedDeliveryDate = standardDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!phoneNumber.trim() || phoneNumber.length < 10) errors.phoneNumber = 'Valid 10-digit Nepal mobile number is required';
    if (!buildingHouse.trim()) errors.buildingHouse = 'Building/House number is required';
    if (!colonySuburb.trim()) errors.colonySuburb = 'Colony/Landmark is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email address is required';
    if (!address.trim()) errors.address = 'Full street address is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getDeliveryInfoObj = (): DeliveryInfo => ({
    fullName,
    phoneNumber,
    buildingHouse,
    colonySuburb,
    email,
    region,
    city,
    area,
    address,
    deliveryDateOption: deliveryOption === 'standard' ? 'standard' : 'express'
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const deliveryInfo = getDeliveryInfoObj();

    if (paymentMethod === 'esewa') {
      if (!esewaAccount?.isLinked) {
        // Need to link eSewa wallet first via Screenshot 3 flow!
        onInitiateEsewaBinding();
      } else {
        // Already linked, now proceed to final OTP authorization!
        onInitiateEsewaPayment(deliveryInfo);
      }
    } else {
      // Cash on Delivery or Card
      onPlaceOrderCOD(deliveryInfo);
    }
  };

  // Find areas for selected city
  const selectedRegionObj = NEPAL_REGIONS.find((r) => r.province === region);
  const selectedCityObj = selectedRegionObj?.cities.find((c) => c.name === city);
  const availableAreas = selectedCityObj?.areas || ['Central', 'Market Area', 'Residential'];

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Breadcrumb & Brand Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>

          <div className="text-center">
            <span className="text-2xl font-bold text-stone-900">SD Infininov</span>
            <span className="block text-[10px] tracking-widest text-stone-500 uppercase">
              Secure Nepal Checkout
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">256-bit Encrypted</span>
          </div>
        </div>

        {/* 2-Column Layout Requested: Left side Delivery Info, Right side Your Order Box */}
        <form onSubmit={handleCheckoutSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT SIDE: Delivery Information Form */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
                        Delivery Information
                      </h2>
                      <p className="text-xs text-stone-500">
                        Enter your destination details anywhere across Nepal
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
                    Step 1 of 2
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Full name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Anjali Shrestha"
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-stone-500">
                        +977
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="98XXXXXXXX"
                        className="w-full rounded-xl border border-stone-300 pl-14 pr-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                      />
                    </div>
                    {formErrors.phoneNumber && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Building / House No / Floor / Street */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Building / House No / Floor / Street <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buildingHouse}
                      onChange={(e) => setBuildingHouse(e.target.value)}
                      placeholder="e.g. House No. 42, Floor 2, Kumari Galli"
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    />
                    {formErrors.buildingHouse && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.buildingHouse}</p>
                    )}
                  </div>

                  {/* Colony / Suburb / Locality / Landmark */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Colony / Suburb / Locality / Landmark <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={colonySuburb}
                      onChange={(e) => setColonySuburb(e.target.value)}
                      placeholder="e.g. Near Bhatbhateni / Opposite Temple"
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    />
                    {formErrors.colonySuburb && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.colonySuburb}</p>
                    )}
                  </div>

                  {/* Region (Province) */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Region <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={region}
                      onChange={(e) => {
                        setRegion(e.target.value);
                        const match = NEPAL_REGIONS.find((r) => r.province === e.target.value);
                        if (match && match.cities[0]) {
                          setCity(match.cities[0].name);
                          setArea(match.cities[0].areas[0] || 'Center');
                        }
                      }}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    >
                      {NEPAL_REGIONS.map((r) => (
                        <option key={r.province} value={r.province}>
                          {r.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      City <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        const cityObj = selectedRegionObj?.cities.find((c) => c.name === e.target.value);
                        if (cityObj && cityObj.areas[0]) {
                          setArea(cityObj.areas[0]);
                        }
                      }}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    >
                      {selectedRegionObj?.cities.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      )) || <option value="Kathmandu">Kathmandu</option>}
                    </select>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Area <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    >
                      {availableAreas.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Complete Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Address (Detailed Street / Location) <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Detailed delivery address for courier rider"
                      className="w-full rounded-xl border border-stone-300 p-3 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50/50"
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>
                    )}
                  </div>

                </div>

                {/* When does the product will be deliver (Prompt explicit requirement) */}
                <div className="mt-6 pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-red-700" />
                    <h3 className="text-sm font-bold text-stone-900">
                      When will your product be delivered?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Standard option */}
                    <div
                      onClick={() => setDeliveryOption('standard')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        deliveryOption === 'standard'
                          ? 'border-red-600 bg-red-50/50'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900">
                          Estimated Delivery: {formattedDeliveryDate}
                        </span>
                        {deliveryOption === 'standard' && (
                          <CheckCircle2 className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500">
                        1 - 2 Business Days inside Kathmandu Valley. Guaranteed before Dashain Tika!
                      </p>
                    </div>

                    {/* Express option */}
                    <div
                      onClick={() => setDeliveryOption('express')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        deliveryOption === 'express'
                          ? 'border-red-600 bg-red-50/50'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1">
                          Festive Express Dispatch
                        </span>
                        {deliveryOption === 'express' && (
                          <CheckCircle2 className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Dispatched within 6 hours. Same day delivery for Ring Road Kathmandu & Lalitpur.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE: Your Order Box + Payment Methods */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* "Your Order" Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                  <h3 className="text-lg font-extrabold text-stone-900">
                    Your Order
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                  </span>
                </div>

                {/* Line Items List */}
                <div className="max-h-60 overflow-y-auto space-y-3.5 pr-1 divide-y divide-stone-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        className="h-16 w-14 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Size: {item.selectedSize} • Color: {item.selectedColor}
                        </div>
                        <div className="text-[11px] font-semibold text-stone-700">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-stone-900">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="mt-5 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Festive Coupon</span>
                      <span className="font-semibold">-Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Delivery Fee: "if the delivery is free then it shoudl show free then nor show price" */}
                  <div className="flex justify-between items-center">
                    <span>Delivery fee</span>
                    {isDeliveryFree ? (
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold text-stone-900">
                        Rs. {deliveryFee}
                      </span>
                    )}
                  </div>

                  {/* Final Price: "in final price there should be written 'All taxes included' in small words." */}
                  <div className="pt-3 border-t border-stone-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-extrabold text-stone-900">
                        Final Price
                      </span>
                      <span className="text-xl font-black text-red-700">
                        Rs. {finalTotal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 text-right mt-0.5">
                      All taxes included
                    </p>
                  </div>
                </div>

              </div>

              {/* Payment Method Option with icons for COD, eSewa, Credit/Debit card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-200">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider mb-4">
                  Select Payment Method
                </h3>

                <div className="space-y-3">
                  
                  {/* eSewa Mobile Wallet Option */}
                  <div
                    onClick={() => setPaymentMethod('esewa')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'esewa'
                        ? 'border-[#22c55e] bg-emerald-50/40 ring-2 ring-emerald-100'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* eSewa Green Logo Badge */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22c55e] text-white font-black text-sm shadow-sm">
                          eS
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-stone-900">
                              eSewa Mobile Wallet
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              Recommended
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500">
                            Instant OTP binding &amp; direct 1-tap checkout
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentMethod === 'esewa'}
                          onChange={() => setPaymentMethod('esewa')}
                          className="h-4 w-4 text-[#22c55e] focus:ring-[#22c55e]"
                        />
                      </div>
                    </div>

                    {/* eSewa Linked status or Link prompt */}
                    {paymentMethod === 'esewa' && (
                      <div className="mt-3.5 pt-3 border-t border-emerald-200/60">
                        {esewaAccount?.isLinked ? (
                          <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-emerald-300">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                              <div>
                                <span className="font-bold text-stone-900">
                                  eSewa Linked:
                                </span>{' '}
                                <span className="font-mono text-stone-700">
                                  {esewaAccount.esewaId}
                                </span>
                                <div className="text-[10px] text-stone-500">
                                  Available Balance: Rs. {esewaAccount.balance.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-emerald-200">
                            <div className="text-xs text-stone-600">
                              <span>Wallet not connected yet.</span>
                              <div className="text-[11px] text-stone-400">
                                Link now with eSewa ID &amp; OTP
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={onInitiateEsewaBinding}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#22c55e] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#16a34a] transition-all cursor-pointer shadow-sm"
                            >
                              <span>Link eSewa Wallet</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery (COD) */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-200'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-stone-900">
                            Cash on Delivery (COD)
                          </span>
                          <p className="text-[11px] text-stone-500">
                            Pay in cash when rider delivers to your doorstep
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="h-4 w-4 text-stone-900 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-200'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-stone-900">
                            Credit / Debit Card (SCT / Visa / Mastercard)
                          </span>
                          <p className="text-[11px] text-stone-500">
                            Nepal local banks &amp; international cards supported
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="h-4 w-4 text-stone-900 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                </div>

                {/* Final Submit Button */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-2xl text-sm font-bold text-white shadow-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      paymentMethod === 'esewa'
                        ? 'bg-[#22c55e] hover:bg-[#16a34a]'
                        : 'bg-[#8B5E3C] hover:bg-[#744C31]'
                    }`}
                  >
                    {paymentMethod === 'esewa' ? (
                      esewaAccount?.isLinked ? (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay Now (Rs. {finalTotal.toLocaleString()}) via Linked eSewa</span>
                        </>
                      ) : (
                        <>
                          <span>Link eSewa &amp; Pay Rs. {finalTotal.toLocaleString()}</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )
                    ) : (
                      <>
                        <span>Confirm Order (Rs. {finalTotal.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-stone-400 text-center mt-2">
                    By placing this order you agree to SD Infininov's festive terms &amp; conditions.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
