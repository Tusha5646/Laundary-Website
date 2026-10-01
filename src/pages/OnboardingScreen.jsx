import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Check, Sparkles } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { ONBOARDING_SLIDES } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const OnboardingScreen = () => {
  const { navigateTo } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const images = [
    '/images/hero_laundry.jpg',
    '/images/delivery_pickup.jpg',
    '/images/iron_care.jpg',
    '/images/order_success.jpg',
  ];

  const slide = ONBOARDING_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('freshfold_has_visited', 'true');
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-between items-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background soft blurs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-orange-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />

      {/* Top Header with Skip option */}
      <div className="w-full max-w-xl flex items-center justify-between z-10">
        <BrandLogo size="small" />
        <button
          onClick={handleComplete}
          className="text-xs font-bold text-slate-500 hover:text-orange-600 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs transition-colors"
        >
          Skip Tour
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="w-full max-w-md my-auto py-4 z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-100 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-5">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span>{slide.badge}</span>
          </div>

          {/* Large Custom Illustration */}
          <div className="relative w-full max-w-[280px] h-60 mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-slate-50">
            <img
              src={images[currentSlideIndex]}
              alt={slide.title}
              className="w-full h-full object-cover transition-all duration-300 transform hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {slide.tag}
            </div>
          </div>

          {/* Title & Description */}
          <h2 className="text-2xl font-black text-slate-900 font-heading mb-2">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {slide.subtitle}
          </p>

          {/* Progress Dots */}
          <div className="flex items-center gap-2 mb-8">
            {ONBOARDING_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all rounded-full ${
                  currentSlideIndex === idx
                    ? 'w-8 h-2.5 bg-orange-500 shadow-xs'
                    : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Finish Button */}
          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>
              {currentSlideIndex === ONBOARDING_SLIDES.length - 1 ? 'Start Washing with Us' : 'Next Step'}
            </span>
            {currentSlideIndex === ONBOARDING_SLIDES.length - 1 ? (
              <Check className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Reassurance text */}
      <div className="z-10 text-[11px] text-slate-400">
        Over 50,000+ clothes cleaned with 99.8% customer satisfaction rate
      </div>
    </div>
  );
};
