import React, { useState } from 'react';
import {
  QrCode,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Waves,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRModal } from '../components/QRModal';

export const QRTrackerPage = () => {
  const { orders, navigateTo, showToast } = useApp();
  const [searchId, setSearchId] = useState('LAU10245');
  const [foundOrder, setFoundOrder] = useState(() => orders[0]);
  const [showTagModal, setShowTagModal] = useState(false);

  const handleLookup = (e) => {
    e.preventDefault();
    const clean = searchId.trim().toUpperCase().replace('#', '');
    const match = orders.find(
      (o) => o.id.toUpperCase() === clean || (o.qrCode && o.qrCode.toUpperCase().includes(clean))
    );
    if (match) {
      setFoundOrder(match);
      showToast(`Found Order #${match.id} (${match.status})`);
    } else {
      showToast(`No order found matching "${searchId}". Try LAU10245`, 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Banner */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-3">
          <QrCode className="w-3.5 h-3.5 text-teal-600" />
          <span>Unique Feature: QR Bag Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
          Scan & Track Your Laundry Bag
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Every FreshFold bag is equipped with a digital tamper-proof QR code to ensure zero misplaced garments.
        </p>
      </div>

      {/* Search / Scan Input Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-md mb-8">
        <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID or Bag Code (e.g. LAU10245)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase"
            />
          </div>

          <button
            type="submit"
            className="py-3 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Lookup Bag</span>
          </button>
        </form>

        <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
          <span className="font-bold">Try Sample Orders:</span>
          {orders.slice(0, 3).map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => {
                setSearchId(o.id);
                setFoundOrder(o);
              }}
              className="font-mono font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-2 py-0.5 rounded-md transition-colors"
            >
              #{o.id}
            </button>
          ))}
        </div>
      </div>

      {/* Result Order Card */}
      {foundOrder && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: SVG QR Code Display */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50/60 to-amber-50/60 rounded-3xl border border-orange-200 text-center">
            <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 mb-3">
              <svg
                className="w-48 h-48 text-slate-900"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="10" width="24" height="24" rx="4" fill="currentColor" />
                <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
                <rect x="18" y="18" width="8" height="8" rx="1" fill="#FF6B00" />

                <rect x="66" y="10" width="24" height="24" rx="4" fill="currentColor" />
                <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
                <rect x="74" y="18" width="8" height="8" rx="1" fill="#FF6B00" />

                <rect x="10" y="66" width="24" height="24" rx="4" fill="currentColor" />
                <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
                <rect x="18" y="74" width="8" height="8" rx="1" fill="#FF6B00" />

                <circle cx="50" cy="50" r="12" fill="#FF6B00" />
                <circle cx="50" cy="50" r="9" fill="white" />
                <path
                  d="M48 45 L54 50 L48 55"
                  stroke="#FF6B00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <rect x="38" y="14" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="48" y="14" width="6" height="6" rx="1" fill="#00C9B7" />
                <rect x="38" y="74" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="48" y="80" width="6" height="6" rx="1" fill="#00C9B7" />
                <rect x="74" y="44" width="6" height="6" rx="1" fill="#FF6B00" />
              </svg>
            </div>

            <p className="font-mono text-xs font-bold text-slate-800">
              {foundOrder.qrCode || `FRESHFOLD-${foundOrder.id}`}
            </p>
            <span className="text-[11px] text-slate-400 mt-0.5">Scan to view order status</span>

            <button
              onClick={() => setShowTagModal(true)}
              className="mt-4 py-2 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Bag Tag</span>
            </button>
          </div>

          {/* Right: Order Status & Details */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Order Code</span>
                <h3 className="text-2xl font-black text-slate-900 font-heading">
                  #{foundOrder.id}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-700">
                {foundOrder.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Service:</span>
                <span className="font-bold text-slate-800">{foundOrder.service}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Garments Count:</span>
                <span className="font-bold text-slate-800">
                  {foundOrder.items?.reduce((a, c) => a + c.quantity, 0)} pieces
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Customer:</span>
                <span className="font-bold text-slate-800">{foundOrder.customer?.name}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <span className="text-slate-400 block mb-0.5">Estimated Return:</span>
                <span className="font-bold text-teal-700">{foundOrder.deliveryDate}</span>
              </div>
            </div>

            <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-xs text-teal-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Digital seal intact. Garment loss insurance active.</span>
            </div>

            <button
              onClick={() => navigateTo('track', { orderId: foundOrder.id })}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Open Live Tracking Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QR Tag Modal */}
      {foundOrder && (
        <QRModal
          order={foundOrder}
          isOpen={showTagModal}
          onClose={() => setShowTagModal(false)}
        />
      )}
    </div>
  );
};
