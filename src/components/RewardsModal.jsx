import React from 'react';
import { X, Sparkles, Gift, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const RewardsModal = () => {
  const { isRewardsModalOpen, setIsRewardsModalOpen, points, pointsHistory } = useRewards();

  if (!isRewardsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1C1E]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#FCFBF8] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E7E5E0] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsRewardsModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#737373] hover:text-[#1C1C1E] hover:bg-[#F4F3F0] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FreshFold Rewards Club</span>
          </div>
          <h3 className="text-2xl font-bold text-[#1C1C1E] font-heading">
            Your Points Balance
          </h3>
          <p className="text-xs text-[#57575A] mt-1">
            Earn points on every laundry order and verified review in Jagatpura.
          </p>
        </div>

        {/* Current Balance Card */}
        <div className="bg-[#1C1C1E] text-white rounded-2xl p-6 mb-6 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#A3A19B] font-medium block mb-1">Available Points</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-heading text-white">{points}</span>
              <span className="text-xs text-orange-400 font-bold uppercase">Points</span>
            </div>
            <p className="text-xs text-[#A3A19B] mt-1">
              Worth <strong>₹{points}</strong> off your future laundry orders (1 pt = ₹1)
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold">
            <Gift className="w-6 h-6" />
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="space-y-2.5 mb-6">
          <h4 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider">
            How to Earn Points
          </h4>
          <div className="bg-white p-3.5 rounded-xl border border-[#E7E5E0] flex items-center justify-between text-xs">
            <span className="text-[#1C1C1E] font-medium">Book a Doorstep Pickup</span>
            <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">+50 pts</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E7E5E0] flex items-center justify-between text-xs">
            <span className="text-[#1C1C1E] font-medium">Write a Verified Customer Review</span>
            <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">+25 pts</span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E7E5E0] flex items-center justify-between text-xs">
            <span className="text-[#1C1C1E] font-medium">Automatic 1-Click Redemption at Checkout</span>
            <span className="font-semibold text-emerald-600">₹1 / pt</span>
          </div>
        </div>

        {/* Recent Points Activity */}
        <div>
          <h4 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider mb-2.5">
            Recent Activity
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {pointsHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-xl border border-[#E7E5E0] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-medium text-[#1C1C1E]">{item.reason}</p>
                  <span className="text-[10px] text-[#737373]">{item.date}</span>
                </div>
                <span
                  className={`font-bold font-mono ${
                    item.type === 'earned' ? 'text-emerald-600' : 'text-orange-600'
                  }`}
                >
                  {item.type === 'earned' ? `+${item.amount}` : `-${item.amount}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E7E5E0]">
          <button
            onClick={() => setIsRewardsModalOpen(false)}
            className="w-full py-3 rounded-full bg-[#F4F3F0] hover:bg-[#EBEAE5] text-[#1C1C1E] font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
