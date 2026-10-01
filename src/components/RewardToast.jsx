import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const RewardToast = () => {
  const { toast } = useRewards();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#1C1C1E] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-white/10 flex items-center gap-3 text-xs max-w-sm">
        <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <p className="font-medium pr-1 leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
