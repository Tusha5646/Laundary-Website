import React from 'react';
import { X, Package, Clock, MapPin, CheckCircle2, ChevronRight, Ban } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const OrdersDrawer = () => {
  const {
    isOrdersDrawerOpen,
    setIsOrdersDrawerOpen,
    bookings,
    cancelBooking,
    setActiveTrackingOrder,
    setIsTrackerModalOpen,
  } = useRewards();

  if (!isOrdersDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1C1E]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="bg-[#FCFBF8] w-full max-w-md h-full p-6 sm:p-8 shadow-2xl border-l border-[#E7E5E0] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E7E5E0]">
            <div>
              <h3 className="text-xl font-bold text-[#1C1C1E] font-heading">
                My Laundry Bookings
              </h3>
              <p className="text-xs text-[#737373] mt-0.5">
                Active & past doorstep pickups in Jagatpura
              </p>
            </div>
            <button
              onClick={() => setIsOrdersDrawerOpen(false)}
              className="p-2 rounded-full text-[#737373] hover:text-[#1C1C1E] hover:bg-[#F4F3F0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white p-5 rounded-2xl border border-[#E7E5E0] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    #{b.id}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      b.status === 'Cancelled'
                        ? 'text-rose-700 bg-rose-50 border-rose-200'
                        : b.status === 'Delivered'
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                        : 'text-orange-700 bg-orange-50 border-orange-200'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#1C1C1E]">{b.service}</h4>
                  <p className="text-xs text-[#57575A] mt-0.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{b.date} • {b.timeSlot}</span>
                  </p>
                  <p className="text-xs text-[#737373] mt-0.5 truncate">
                    📍 {b.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E7E5E0] flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setActiveTrackingOrder(b);
                      setIsTrackerModalOpen(true);
                      setIsOrdersDrawerOpen(false);
                    }}
                    className="font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>Track Status</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {b.status !== 'Cancelled' && b.status !== 'Delivered' && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="text-[#737373] hover:text-rose-600 font-medium transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}

            {bookings.length === 0 && (
              <div className="py-16 text-center text-xs text-[#737373]">
                <Package className="w-10 h-10 text-[#D8D6D0] mx-auto mb-2" />
                <p>No active laundry bookings yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-[#E7E5E0]">
          <button
            onClick={() => setIsOrdersDrawerOpen(false)}
            className="w-full py-3 rounded-full bg-[#F4F3F0] hover:bg-[#EBEAE5] text-[#1C1C1E] font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
