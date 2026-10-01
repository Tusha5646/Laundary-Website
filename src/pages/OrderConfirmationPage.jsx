import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  ArrowRight,
  Home,
  Printer,
  Sparkles,
  Share2,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRModal } from '../components/QRModal';

export const OrderConfirmationPage = () => {
  const { activeOrder, navigateTo, showToast } = useApp();
  const [showQRModal, setShowQRModal] = useState(false);

  const order = activeOrder || {
    id: 'LAU10245',
    pickupDate: 'Tomorrow, Oct 2',
    pickupTime: '10:00 AM - 12:00 PM',
    deliveryDate: 'Saturday, Oct 3',
    total: 359,
    qrCode: 'FRESHFOLD-LAU10245-BAG-402',
    address: {
      line: 'Flat 402, Sunshine Heights, Hill Road',
      area: 'Bandra West, Mumbai',
    },
    items: [{ name: 'Clothes', quantity: 6, price: 50 }],
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `FreshFold Order #${order.id}`,
        text: `My FreshFold laundry pickup is scheduled for ${order.pickupDate}! Track live with QR: ${order.qrCode}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard?.writeText(`Order #${order.id} | Track at FreshFold`);
      showToast('Order details copied to clipboard!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 text-center">
      {/* Celebration Header */}
      <div className="relative mb-6">
        <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
          <img
            src="/images/order_success.jpg"
            alt="Order Booked Successfully"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mt-4 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Booking Confirmed</span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading mb-2">
        Your Laundry is Booked!
      </h1>
      <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-8">
        We've assigned an eco-valet who will arrive with sanitized bags at your scheduled time.
      </p>

      {/* Main Order Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-xl text-left mb-8">
        {/* Top order bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Order Identifier</span>
            <span className="text-2xl font-black text-orange-600 font-heading">
              #{order.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQRModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>View Bag QR Tag</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              title="Share Order"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Schedule & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100/80">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-700 mb-1">
              <Clock className="w-4 h-4" />
              <span>Doorstep Pickup</span>
            </div>
            <p className="text-sm font-black text-slate-900">{order.pickupDate}</p>
            <p className="text-xs text-slate-600 font-medium">{order.pickupTime}</p>
          </div>

          <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-100/80">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Estimated Delivery</span>
            </div>
            <p className="text-sm font-black text-slate-900">{order.deliveryDate}</p>
            <p className="text-xs text-slate-600 font-medium">{order.deliveryTime || '04:00 PM - 06:00 PM'}</p>
          </div>
        </div>

        {/* Address & Total */}
        <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs text-slate-600 mb-6">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Pickup Address:</strong> {order.address?.line}, {order.address?.area}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-medium">
            <span>Payment ({order.paymentMethod || 'Online'}):</span>
            <span className="text-sm font-black text-slate-900">₹{order.total}</span>
          </div>
        </div>

        {/* Digital QR Preview Box */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setShowQRModal(true)}
              className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs border border-orange-200 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            >
              <QrCode className="w-10 h-10 text-slate-800" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Scan to View Order Status</p>
              <p className="text-[11px] text-slate-500 font-mono">
                {order.qrCode || `FRESHFOLD-${order.id}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowQRModal(true)}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
          >
            Enlarge Tag
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <button
          onClick={() => navigateTo('track', { orderId: order.id })}
          className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Track Order Now</span>
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 font-bold text-sm border border-slate-200 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* QR Modal instance */}
      <QRModal
        order={order}
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
      />
    </div>
  );
};
