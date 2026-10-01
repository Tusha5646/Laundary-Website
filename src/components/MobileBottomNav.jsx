import React from 'react';
import { Home, Sparkles, Layers, QrCode, User, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav = () => {
  const { currentView, navigateTo, totalCartCount, grandTotal, activeOrder } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'my-orders', label: 'Orders', icon: Layers },
    { id: 'track', label: 'Track', icon: QrCode, hasPulse: Boolean(activeOrder?.status === 'Washing') },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Floating Bag Pill on Mobile when items are in cart and not on cart/checkout pages */}
      {totalCartCount > 0 && !['cart', 'schedule', 'payment', 'confirmation'].includes(currentView) && (
        <div className="fixed bottom-20 left-4 right-4 z-40 md:hidden animate-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => navigateTo('cart')}
            className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white rounded-2xl shadow-xl shadow-orange-500/30 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xs">
                {totalCartCount}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">View Laundry Bag</p>
                <p className="text-[10px] text-orange-100">Tap to schedule pickup</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-bold text-sm bg-black/15 px-3 py-1.5 rounded-xl">
              <span>₹{grandTotal}</span>
              <span className="text-xs">→</span>
            </div>
          </button>
        </div>
      )}

      {/* Main Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-orange-500 font-bold'
                    : 'text-slate-500 hover:text-orange-500'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                  {item.hasPulse && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-500 rounded-full animate-ping" />
                  )}
                </div>
                <span className="text-[10px] mt-1 leading-none">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
