import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Check,
  ChevronLeft,
  X,
  Truck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage = () => {
  const {
    cartItems,
    updateCartQty,
    removeItemFromCart,
    clearCart,
    cartSubtotal,
    totalCartCount,
    discountAmount,
    taxAmount,
    pickupFee,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
  } = useApp();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  // Group items by service
  const groupedItems = cartItems.reduce((acc, item) => {
    const serviceName = item.service || 'Wash & Fold';
    if (!acc[serviceName]) {
      acc[serviceName] = [];
    }
    acc[serviceName].push(item);
    return acc;
  }, {});

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      const ok = applyCoupon(couponCodeInput);
      if (ok) setCouponCodeInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-3xl bg-orange-100/80 text-orange-500 mx-auto flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 font-heading mb-2">
          Your Laundry Bag is Empty
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8">
          You haven't added any clothes yet. Browse our services and select items to schedule your clean pickup!
        </p>
        <button
          onClick={() => navigateTo('services')}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <span>Select Clothes to Wash</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Top back action */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateTo('services')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Add More Clothes</span>
        </button>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:underline"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Grouped Clothes List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h1 className="text-2xl font-black text-slate-900 font-heading">
              Your Laundry Bag ({totalCartCount} items)
            </h1>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
              Doorstep Pickup Ready
            </span>
          </div>

          {/* Render each Service Group */}
          {Object.entries(groupedItems).map(([serviceName, items]) => (
            <div
              key={serviceName}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs"
            >
              {/* Group Title Badge */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{serviceName}</h3>
                    <p className="text-[11px] text-slate-400">
                      {items.reduce((a, c) => a + c.quantity, 0)} garments
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black text-slate-700">
                  ₹{items.reduce((a, c) => a + c.price * c.quantity, 0)}
                </span>
              </div>

              {/* Items within service */}
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${serviceName}`}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                        <span className="text-xs text-slate-400">
                          ₹{item.price} each • {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Controller */}
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5">
                        <button
                          onClick={() => updateCartQty(item.id, serviceName, -1)}
                          className="w-7 h-7 rounded-lg bg-white text-slate-700 hover:text-orange-600 flex items-center justify-center shadow-2xs font-bold"
                          title="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, serviceName, 1)}
                          className="w-7 h-7 rounded-lg bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center shadow-2xs font-bold"
                          title="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="w-14 text-right font-black text-slate-900 text-sm">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => removeItemFromCart(item.id, serviceName)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Reassurance badge */}
          <div className="bg-teal-50/60 rounded-2xl p-4 border border-teal-100 flex items-center gap-3 text-xs text-teal-800">
            <Truck className="w-5 h-5 text-teal-600 shrink-0" />
            <span>
              {cartSubtotal >= 300
                ? '🎉 Congratulations! You have unlocked FREE Doorstep Pickup & Delivery.'
                : `Add ₹${300 - cartSubtotal} more clothes to unlock FREE Doorstep Pickup (currently ₹40).`}
            </span>
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon Input */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-orange-100 shadow-md">
            <h3 className="text-lg font-black text-slate-900 font-heading mb-4">
              Order Summary
            </h3>

            {/* Coupon Box */}
            <div className="mb-6 pb-6 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Apply Coupon Code
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-800 block">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-[11px] text-emerald-600">
                        {appliedCoupon.discountPercent}% OFF applied (-₹{discountAmount})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="Enter coupon (e.g. WELCOME10)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Quick Coupon Suggestions */}
              {!appliedCoupon && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Popular:</span>
                  <button
                    onClick={() => applyCoupon('WELCOME10')}
                    className="text-[11px] font-mono font-bold text-orange-600 hover:underline bg-orange-50 px-2 py-0.5 rounded-md"
                  >
                    WELCOME10
                  </button>
                  <button
                    onClick={() => applyCoupon('FRESH20')}
                    className="text-[11px] font-mono font-bold text-teal-600 hover:underline bg-teal-50 px-2 py-0.5 rounded-md"
                  >
                    FRESH20
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations breakdown */}
            <div className="space-y-3 text-xs sm:text-sm pb-6 border-b border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalCartCount} items)</span>
                <span className="font-bold text-slate-900">₹{cartSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Coupon Discount
                  </span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated GST Tax (5%)</span>
                <span className="font-bold text-slate-900">₹{taxAmount}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  Pickup & Doorstep Fee
                </span>
                <span className="font-bold text-slate-900">
                  {pickupFee === 0 ? (
                    <span className="text-emerald-600 uppercase font-black">FREE</span>
                  ) : (
                    `₹${pickupFee}`
                  )}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-4 flex items-center justify-between mb-6">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Total Payable</span>
                <span className="text-2xl font-black text-slate-900 font-heading">
                  ₹{grandTotal}
                </span>
              </div>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                Tax & Pickup Included
              </span>
            </div>

            {/* Schedule Pickup CTA */}
            <button
              onClick={() => navigateTo('schedule')}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Schedule Pickup</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe sanitization guarantee • Zero garment mixing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
