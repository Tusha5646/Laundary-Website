import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  Lock,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const PaymentPage = () => {
  const {
    cartItems,
    cartSubtotal,
    discountAmount,
    taxAmount,
    pickupFee,
    grandTotal,
    bookingDetails,
    placeOrder,
    navigateTo,
    showToast,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'COD'
  const [upiId, setUpiId] = useState('rahul@oksbi');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8821',
    name: 'Rahul Verma',
    expiry: '08/29',
    cvv: '821',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment verification
    setTimeout(() => {
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B00', '#00C9B7', '#FBBF24'],
        });
      } catch (err) {
        console.log('Confetti trigger', err);
      }

      setIsProcessing(false);
      showToast('Payment verified successfully!');
      placeOrder({ method: paymentMethod });
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigateTo('schedule')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Schedule</span>
        </button>
      </div>

      {/* Step Indicator Header (Step 3: Payment) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs mb-8">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ✓
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-1.5">Location</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ✓
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-1.5">Schedule</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-orange-100 shadow-xs">
              3
            </div>
            <span className="text-xs font-bold text-orange-600 mt-1.5">Payment</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <span className="text-xs font-semibold text-slate-400 mt-1.5">Confirm</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Payment Methods Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900 font-heading">
                Choose Payment Method
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit Encrypted</span>
              </div>
            </div>

            {/* Payment Options Selection */}
            <div className="space-y-3 mb-6">
              {/* Option 1: UPI */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-orange-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="mt-1 text-orange-500 accent-orange-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      UPI (Google Pay, PhonePe, Paytm)
                    </span>
                    <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      Fastest
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pay instantly via any UPI handle or app
                  </p>

                  {paymentMethod === 'UPI' && (
                    <div className="mt-4 pt-3 border-t border-orange-200/60 animate-in fade-in duration-150">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        {['rahul@oksbi', 'rahul@paytm', '9876543210@ybl'].map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => setUpiId(sug)}
                            className="text-[10px] font-mono font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md hover:border-orange-300"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 2: Credit / Debit Card */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-orange-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value="Card"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="mt-1 text-orange-500 accent-orange-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      Credit / Debit Card
                    </span>
                    <CreditCard className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Visa, Mastercard, RuPay, Amex accepted
                  </p>

                  {paymentMethod === 'Card' && (
                    <div className="mt-4 pt-3 border-t border-orange-200/60 space-y-3 animate-in fade-in duration-150">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                            placeholder="MM/YY"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                            placeholder="•••"
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 3: Cash on Delivery */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-orange-200'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMode"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 text-orange-500 accent-orange-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      Cash on Delivery
                    </span>
                    <Banknote className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pay with cash or QR scan when garments are delivered back
                  </p>
                </div>
              </label>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/30 transition-all flex items-center justify-center gap-2.5 active:scale-98 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Securing & Confirming Order...</span>
                </>
              ) : (
                <>
                  <span>Confirm Order (Pay ₹{grandTotal})</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-md">
            <h3 className="text-lg font-black text-slate-900 font-heading mb-4">
              Booking Details
            </h3>

            {/* Delivery & Pickup Info */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Date:</span>
                <span className="font-bold text-slate-800">{bookingDetails.pickupDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Slot:</span>
                <span className="font-bold text-orange-600">{bookingDetails.pickupTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Date:</span>
                <span className="font-bold text-teal-700">{bookingDetails.deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Slot:</span>
                <span className="font-bold text-slate-800">{bookingDetails.deliveryTime}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block mb-0.5">Address:</span>
                <span className="font-medium text-slate-700 block">
                  {bookingDetails.addressLine}, {bookingDetails.area}
                </span>
              </div>
            </div>

            {/* Items Mini List */}
            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 pr-1 mb-4 text-xs">
              {cartItems.map((it) => (
                <div key={`${it.id}-${it.service}`} className="py-2 flex justify-between">
                  <span className="text-slate-700">
                    {it.quantity} × {it.name} <span className="text-[10px] text-slate-400">({it.service})</span>
                  </span>
                  <span className="font-bold text-slate-900">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>GST (5%)</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Pickup Fee</span>
                <span>{pickupFee === 0 ? 'FREE' : `₹${pickupFee}`}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-3 flex justify-between items-center">
              <span className="font-bold text-slate-900 text-sm">Grand Total</span>
              <span className="font-black text-slate-900 text-xl font-heading">
                ₹{grandTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
