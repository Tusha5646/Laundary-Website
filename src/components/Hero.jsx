import React, { useState } from 'react';
import { ArrowRight, Search, Clock, CheckCircle2 } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const Hero = ({ onOpenBooking }) => {
  const { trackOrder, showToast } = useRewards();
  const [orderQuery, setOrderQuery] = useState('');

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    const ok = trackOrder(orderQuery);
    if (!ok) {
      showToast(`No order found for "${orderQuery}". Try LAU-1082`, 'error');
    }
  };

  return (
    <section className="pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200/60">
              Professional Laundry & Dry Cleaning
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1C1E] tracking-tight leading-[1.12]">
              Fresh Clothes.{' '}
              <br className="hidden sm:inline" />
              Effortless Living.
            </h1>

            <p className="text-base sm:text-lg text-[#57575A] leading-relaxed max-w-lg">
              Premium laundry and dry-cleaning services, carefully handled and delivered with care across Jagatpura, Jaipur.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="py-3.5 px-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group shadow-xs active:scale-98"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#services"
                className="py-3.5 px-7 rounded-full bg-[#F4F3F0] hover:bg-[#EBEAE5] text-[#1C1C1E] font-medium text-sm transition-all duration-200 border border-[#E7E5E0] text-center"
              >
                Explore Services
              </a>
            </div>

            {/* Dynamic Quick Order Status Lookup Bar */}
            <div className="pt-4">
              <form
                onSubmit={handleTrackSubmit}
                className="flex items-center bg-[#F4F3F0] p-1.5 rounded-2xl border border-[#E7E5E0] max-w-md shadow-2xs"
              >
                <div className="flex items-center gap-2 px-3 flex-1">
                  <Search className="w-4 h-4 text-[#737373] shrink-0" />
                  <input
                    type="text"
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                    placeholder="Track Order ID (e.g. LAU-1082)..."
                    className="w-full bg-transparent text-xs font-mono font-semibold text-[#1C1C1E] focus:outline-none placeholder:text-[#737373]"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-white hover:bg-orange-50 text-[#1C1C1E] hover:text-orange-600 border border-[#E7E5E0] text-xs font-semibold transition-colors shrink-0 shadow-2xs"
                >
                  Track Status
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-[#E7E5E0]/70 flex items-center gap-6 text-xs text-[#737373]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                Doorstep Pickup & Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                24–48h Turnaround
              </span>
            </div>
          </div>

          {/* Right Single Strong Hero Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xs border border-[#E7E5E0] bg-[#F6F5F2] aspect-4/3 sm:aspect-16/11">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=85"
                alt="Fresh, crisp white laundry carefully folded"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
