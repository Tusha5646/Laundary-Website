import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export const FinalCTA = ({ onOpenBooking }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#1C1C1E] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>Serving Jagatpura, Jaipur</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight">
            Ready for cleaner, fresher clothes?
          </h2>

          <p className="text-base text-[#A3A19B] max-w-lg mx-auto leading-relaxed">
            Experience reliable doorstep laundry and dry cleaning tailored to your personal garments. Book your pickup in under a minute.
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenBooking}
              className="py-4 px-9 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-base transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
