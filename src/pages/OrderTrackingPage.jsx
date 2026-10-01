import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  HelpCircle,
  X,
  Truck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRModal } from '../components/QRModal';

export const OrderTrackingPage = () => {
  const { activeOrder, orders, setActiveOrderId, navigateTo, showToast } = useApp();
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  const order = activeOrder || orders[0];

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (supportMessage.trim()) {
      showToast('Support ticket dispatched! An agent will call you in 5 mins.');
      setSupportMessage('');
      setShowSupportModal(false);
    }
  };

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-800">No Orders to Track</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          Schedule a laundry pickup first to view live bag status.
        </p>
        <button
          onClick={() => navigateTo('services')}
          className="py-3 px-6 rounded-xl bg-orange-500 text-white font-bold text-xs"
        >
          Book a Pickup
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Top back & Order selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigateTo('my-orders')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>All Orders</span>
        </button>

        {/* Quick order switcher if multiple exist */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Switch Order:</span>
            <select
              value={order.id}
              onChange={(e) => setActiveOrderId(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  #{o.id} ({o.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Order Status Header Card */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/20 mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Current Status: {order.status}</span>
            </div>
            <h1 className="text-3xl font-black font-heading">
              Tracking Order #{order.id}
            </h1>
            <p className="text-orange-100 text-xs sm:text-sm mt-1">
              {order.service} • Estimated Delivery: <strong>{order.deliveryDate}</strong>
            </p>
          </div>

          <button
            onClick={() => setShowQRModal(true)}
            className="self-start md:self-auto py-2.5 px-4 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Bag QR Tag</span>
          </button>
        </div>

        {/* Decorative blur */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vertical Timeline */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900 font-heading">
              Order Timeline
            </h2>
            <span className="text-xs text-slate-400 font-medium">Live Status</span>
          </div>

          {/* Vertical Timeline Structure */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {(order.timeline || []).map((step, index) => {
              const isDone = step.done;
              const isActive = step.active || step.status === order.status;

              return (
                <div key={index} className="relative group">
                  {/* Indicator Dot */}
                  <div
                    className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white ring-4 ring-orange-100 scale-125 shadow-md shadow-orange-500/30'
                        : isDone
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-white border-2 border-slate-300 text-transparent'
                    }`}
                  >
                    {isDone ? (
                      <span className="text-[10px] font-bold">✓</span>
                    ) : isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    ) : null}
                  </div>

                  {/* Step Content */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-black ${
                          isActive
                            ? 'text-orange-600 font-heading text-base'
                            : isDone
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <span
                        className={`text-[11px] font-semibold ${
                          isActive ? 'text-orange-600 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>

                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isActive
                          ? 'text-slate-700 font-medium'
                          : isDone
                          ? 'text-slate-500'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Driver Valet, Order Items & Address */}
        <div className="lg:col-span-5 space-y-6">
          {/* Driver / Valet Card */}
          {order.driver && (
            <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                  Assigned Eco Valet
                </span>
                <span className="text-xs font-bold text-amber-500">
                  ★ {order.driver.rating}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {order.driver.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{order.driver.name}</h4>
                  <p className="text-xs text-slate-500">{order.driver.vehicle}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${order.driver.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Valet</span>
                </a>
                <button
                  onClick={() => setShowSupportModal(true)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          )}

          {/* Address & Items Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 font-heading">
              Order Information
            </h3>

            <div className="text-xs space-y-2 text-slate-600 bg-slate-50 p-4 rounded-2xl">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Delivery Address:</p>
                  <p>{order.address?.line}, {order.address?.area}</p>
                </div>
              </div>
            </div>

            {/* Garments List */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Garments Breakdown:</p>
              <div className="divide-y divide-slate-100 max-h-40 overflow-y-auto pr-1 text-xs">
                {(order.items || []).map((it, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span className="text-slate-700">
                      {it.quantity} × {it.name}
                    </span>
                    <span className="font-bold text-slate-900">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">Total Paid:</span>
              <span className="text-lg font-black text-slate-900 font-heading">
                ₹{order.total}
              </span>
            </div>

            {/* Contact Support Button */}
            <button
              onClick={() => setShowSupportModal(true)}
              className="w-full py-3 rounded-xl border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Contact Laundry Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Tag Modal */}
      <QRModal
        order={order}
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
      />

      {/* Contact Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-100 relative">
            <button
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Contact Support</h3>
                <p className="text-xs text-slate-500">Regarding Order #{order.id}</p>
              </div>
            </div>

            <form onSubmit={handleSupportSend} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  How can we help you?
                </label>
                <textarea
                  required
                  rows={3}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="e.g. Please ask the valet to bring extra hanger bags, or delay pickup by 15 mins..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium resize-none"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">Instant Hotline Helpline:</p>
                <p>📞 +91 98200 12345 (Available 7 AM - 10 PM)</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSupportModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
