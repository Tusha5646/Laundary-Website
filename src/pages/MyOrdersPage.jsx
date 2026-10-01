import React, { useState } from 'react';
import {
  Layers,
  Clock,
  CheckCircle2,
  XCircle,
  QrCode,
  RotateCcw,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRModal } from '../components/QRModal';

export const MyOrdersPage = () => {
  const { orders, navigateTo, reorder } = useApp();
  const [activeTab, setActiveTab] = useState('Active'); // 'Active' | 'Completed' | 'Cancelled'
  const [selectedQRModalOrder, setSelectedQRModalOrder] = useState(null);

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'Active':
        return orders.filter(
          (o) => !['Delivered', 'Cancelled'].includes(o.status)
        );
      case 'Completed':
        return orders.filter((o) => o.status === 'Delivered');
      case 'Cancelled':
        return orders.filter((o) => o.status === 'Cancelled');
      default:
        return orders;
    }
  };

  const filteredOrders = getFilteredOrders();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Washing':
        return 'bg-orange-100 text-orange-800 border-orange-200 animate-pulse';
      case 'Out for Delivery':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-heading">
            My Laundry Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track status, review previous wash receipts, or reorder with 1 click
          </p>
        </div>

        <button
          onClick={() => navigateTo('services')}
          className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Laundry Pickup</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
        {['Active', 'Completed', 'Cancelled'].map((tab) => {
          const count = orders.filter((o) => {
            if (tab === 'Active') return !['Delivered', 'Cancelled'].includes(o.status);
            if (tab === 'Completed') return o.status === 'Delivered';
            return o.status === 'Cancelled';
          }).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const itemCount = (order.items || []).reduce((a, c) => a + c.quantity, 0);

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 hover:border-orange-200 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-slate-900 text-base">
                        #{order.id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      Booked on {order.createdAt || 'Recent'} • {order.service}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-lg font-black text-slate-900 font-heading block">
                    ₹{order.total}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {itemCount} {itemCount === 1 ? 'garment' : 'garments'}
                  </span>
                </div>
              </div>

              {/* Items preview snippet */}
              <div className="py-3 text-xs text-slate-600 flex flex-wrap gap-2">
                {(order.items || []).map((it, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100/80 px-2.5 py-1 rounded-lg font-medium text-slate-700"
                  >
                    {it.quantity} × {it.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Pickup: {order.pickupDate} ({order.pickupTime})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedQRModalOrder(order)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
                    title="View QR Tag"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  {order.status === 'Delivered' && (
                    <button
                      onClick={() => reorder(order)}
                      className="py-2 px-3.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Items</span>
                    </button>
                  )}

                  <button
                    onClick={() => navigateTo('track', { orderId: order.id })}
                    className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-orange-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Track Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No {activeTab.toLowerCase()} orders found.</p>
            <p className="text-xs text-slate-400 mt-1">Book a laundry pickup anytime to get started.</p>
          </div>
        )}
      </div>

      {/* QR Modal */}
      {selectedQRModalOrder && (
        <QRModal
          order={selectedQRModalOrder}
          isOpen={Boolean(selectedQRModalOrder)}
          onClose={() => setSelectedQRModalOrder(null)}
        />
      )}
    </div>
  );
};
