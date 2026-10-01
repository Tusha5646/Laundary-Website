import React from 'react';
import { X, CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const OrderTrackerModal = () => {
  const { isTrackerModalOpen, setIsTrackerModalOpen, activeTrackingOrder } = useRewards();

  if (!isTrackerModalOpen || !activeTrackingOrder) return null;

  const order = activeTrackingOrder;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1C1E]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#FCFBF8] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E7E5E0] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsTrackerModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#737373] hover:text-[#1C1C1E] hover:bg-[#F4F3F0] transition-colors"
          aria-label="Close tracker"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
              #{order.id}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {order.status}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1C1C1E] font-heading">
            Live Order Status
          </h3>
          <p className="text-xs text-[#57575A] mt-0.5">
            Real-time tracking for pickup and return in Jagatpura, Jaipur
          </p>
        </div>

        {/* Live Milestone Progress Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E0] mb-6">
          <h4 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider mb-4">
            Progress Milestones
          </h4>
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7E5E0]">
            {(order.timeline || []).map((step, idx) => {
              const isDone = step.done;
              const isActive = step.active || step.label === order.status;

              return (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-orange-600 text-white ring-4 ring-orange-100 scale-110'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border-2 border-[#D8D6D0] text-transparent'
                    }`}
                  >
                    {isDone ? '✓' : isActive ? '●' : ''}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-xs font-semibold ${
                        isActive
                          ? 'text-orange-600 font-bold'
                          : isDone
                          ? 'text-[#1C1C1E]'
                          : 'text-[#737373]'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-[11px] text-[#737373]">{step.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="bg-[#F4F3F0] p-4 rounded-2xl space-y-2 text-xs text-[#57575A] mb-6">
          <div className="flex justify-between">
            <span className="text-[#737373]">Customer Name:</span>
            <span className="font-semibold text-[#1C1C1E]">{order.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#737373]">Service Treatment:</span>
            <span className="font-semibold text-[#1C1C1E]">{order.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#737373]">Pickup Window:</span>
            <span className="font-semibold text-[#1C1C1E]">{order.date} ({order.timeSlot})</span>
          </div>
          <div className="pt-2 border-t border-[#E7E5E0]">
            <span className="text-[#737373] block mb-0.5">Address:</span>
            <span className="font-medium text-[#1C1C1E] block">{order.address}</span>
          </div>
        </div>

        <button
          onClick={() => setIsTrackerModalOpen(false)}
          className="w-full py-3 rounded-full bg-[#1C1C1E] hover:bg-black text-white font-semibold text-xs transition-colors"
        >
          Close Tracking
        </button>
      </div>
    </div>
  );
};
