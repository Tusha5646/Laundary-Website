import React from 'react';
import {
  Bell,
  Waves,
  Truck,
  CheckCircle2,
  Tag,
  Clock,
  Trash2,
  CheckCheck,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    navigateTo,
  } = useApp();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'washing':
        return <Waves className="w-5 h-5 text-orange-500" />;
      case 'pickup':
      case 'picked-up':
        return <Truck className="w-5 h-5 text-teal-500" />;
      case 'ready':
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'offer':
        return <Tag className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-orange-500" />;
    }
  };

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.orderId) {
      navigateTo('track', { orderId: notif.orderId });
    } else if (notif.type === 'offer') {
      navigateTo('services');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          {notifications.length > 0 && (
            <>
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
              <button
                onClick={clearNotifications}
                className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 font-heading">
          Notifications & Updates
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time updates regarding your active laundry and special promotions
        </p>
      </div>

      {/* Notifications Cards List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              notif.read
                ? 'bg-white border-slate-200/80 hover:border-orange-200'
                : 'bg-orange-50/40 border-orange-200 shadow-xs hover:bg-orange-50/70'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
              {getNotificationIcon(notif.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4
                  className={`text-sm font-bold ${
                    notif.read ? 'text-slate-800' : 'text-slate-900 font-extrabold'
                  }`}
                >
                  {notif.title}
                </h4>
                <span className="text-[11px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {notif.time}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {notif.desc}
              </p>

              {notif.orderId && (
                <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:underline">
                  <span>Track Order #{notif.orderId}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>

            {!notif.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No notifications right now.</p>
            <p className="text-xs text-slate-400 mt-1">We'll alert you as soon as your order status changes.</p>
          </div>
        )}
      </div>
    </div>
  );
};
