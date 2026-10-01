import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Sparkles, Copy, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QRModal = ({ order, isOpen, onClose }) => {
  const { showToast, navigateTo } = useApp();

  if (!isOpen || !order) return null;

  const handleCopyTag = () => {
    navigator.clipboard?.writeText(order.qrCode || `FRESHFOLD-${order.id}`);
    showToast('Bag QR Code identifier copied!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-orange-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Laundry Bag Tag</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 font-heading">
            Order #{order.id}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Scan to view live tracking & garment inventory</p>
        </div>

        {/* QR Code Container */}
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50 p-6 rounded-2xl border-2 border-dashed border-orange-200 flex flex-col items-center justify-center relative mb-4 group">
          {/* Simulated High-Res SVG QR Code */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
            <svg
              className="w-44 h-44 text-slate-900"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner squares (Position markers) */}
              <rect x="10" y="10" width="24" height="24" rx="4" fill="currentColor" />
              <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="18" width="8" height="8" rx="1" fill="#FF6B00" />

              <rect x="66" y="10" width="24" height="24" rx="4" fill="currentColor" />
              <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="74" y="18" width="8" height="8" rx="1" fill="#FF6B00" />

              <rect x="10" y="66" width="24" height="24" rx="4" fill="currentColor" />
              <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="74" width="8" height="8" rx="1" fill="#FF6B00" />

              {/* Data modules pattern */}
              <rect x="38" y="12" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="48" y="12" width="6" height="6" rx="1" fill="#00C9B7" />
              <rect x="42" y="22" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="52" y="22" width="6" height="6" rx="1" fill="currentColor" />

              <rect x="12" y="38" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="22" y="44" width="6" height="6" rx="1" fill="#00C9B7" />
              <rect x="12" y="52" width="6" height="6" rx="1" fill="currentColor" />

              {/* Center FreshFold icon indicator */}
              <circle cx="50" cy="50" r="13" fill="#FF6B00" />
              <circle cx="50" cy="50" r="10" fill="white" />
              <path
                d="M48 45 L54 50 L48 55"
                stroke="#FF6B00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <rect x="68" y="42" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="78" y="48" width="6" height="6" rx="1" fill="#FF6B00" />
              <rect x="68" y="54" width="6" height="6" rx="1" fill="currentColor" />

              <rect x="38" y="68" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="48" y="74" width="6" height="6" rx="1" fill="#00C9B7" />
              <rect x="58" y="68" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="68" y="74" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="78" y="80" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="42" y="82" width="6" height="6" rx="1" fill="currentColor" />
            </svg>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-white/80 px-2.5 py-1 rounded-lg">
            <span>{order.qrCode || `FRESHFOLD-${order.id}`}</span>
            <button
              onClick={handleCopyTag}
              className="text-orange-600 hover:text-orange-700"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Order Quick Spec */}
        <div className="bg-slate-50 p-3.5 rounded-xl space-y-1.5 text-xs mb-4">
          <div className="flex justify-between">
            <span className="text-slate-500">Customer:</span>
            <span className="font-bold text-slate-800">{order.customer?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-bold text-orange-600">{order.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Items Count:</span>
            <span className="font-bold text-slate-800">
              {order.items?.reduce((a, c) => a + c.quantity, 0)} pieces
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Current Status:</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {order.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onClose();
              navigateTo('track', { orderId: order.id });
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Tracking</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Bag Tag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
