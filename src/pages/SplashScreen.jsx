import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { useApp } from '../context/AppContext';

export const SplashScreen = () => {
  const { navigateTo } = useApp();

  const handleGetStarted = () => {
    localStorage.setItem('freshfold_has_visited', 'true');
    navigateTo('onboarding');
  };

  const handleLogin = () => {
    localStorage.setItem('freshfold_has_visited', 'true');
    navigateTo('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-orange-50/40 to-[#FFF7ED] flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden">
      {/* Decorative background bubbles and accents */}
      <div className="absolute top-12 left-10 w-32 h-32 rounded-full bg-orange-200/30 blur-2xl pointer-events-none animate-bubble-slow" />
      <div className="absolute bottom-20 right-8 w-44 h-44 rounded-full bg-teal-200/25 blur-3xl pointer-events-none animate-bubble-fast" />
      <div className="absolute top-1/3 right-12 w-6 h-6 rounded-full bg-amber-400/40 border border-white/60 pointer-events-none" />
      <div className="absolute bottom-1/3 left-8 w-4 h-4 rounded-full bg-pink-400/40 border border-white/60 pointer-events-none" />

      {/* Top Header Logo */}
      <div className="pt-4 z-10 animate-in fade-in duration-500">
        <BrandLogo size="large" showTagline={false} />
      </div>

      {/* Central Hero Art & Tagline */}
      <div className="max-w-md w-full flex flex-col items-center text-center my-auto py-4 z-10">
        {/* Laundry Illustration */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 via-teal-400/20 to-amber-400/20 rounded-3xl blur-xl transition-all group-hover:scale-105" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white w-72 h-64 sm:w-80 sm:h-72">
            <img
              src="/images/hero_laundry.jpg"
              alt="FreshFold Laundry Service"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Floating Pill Badges */}
          <div className="absolute -bottom-3 -left-3 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-orange-100 flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>24h Doorstep Pickup</span>
          </div>
          <div className="absolute -top-3 -right-3 bg-white px-3 py-1.5 rounded-full shadow-lg border border-teal-100 flex items-center gap-1.5 text-xs font-bold text-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>100% Eco-Wash</span>
          </div>
        </div>

        {/* Tagline & Description */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight mb-3">
          Fresh Clothes.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500">
            Easy Life.
          </span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
          Smart on-demand laundry, steam pressing, and dry cleaning delivered right to your doorstep with live QR tracking.
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-3 max-w-xs">
          <button
            onClick={handleGetStarted}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/45 transition-all transform active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogin}
            className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-orange-50/60 text-slate-700 hover:text-orange-600 font-bold text-sm sm:text-base border border-slate-200/80 shadow-xs transition-all active:scale-98"
          >
            I Already Have an Account
          </button>
        </div>
      </div>

      {/* Footer reassurance */}
      <div className="z-10 text-xs text-slate-400 flex items-center gap-2 pt-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        <span>Trusted by 10,000+ happy households in Mumbai</span>
      </div>
    </div>
  );
};
