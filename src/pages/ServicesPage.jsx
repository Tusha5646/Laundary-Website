import React, { useState } from 'react';
import { ArrowUpRight, Calculator, Sparkles, Plus, Minus, Clock, ShieldCheck, Check, Sparkle } from 'lucide-react';
import { FinalCTA } from '../components/FinalCTA';

export const ServicesPage = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'estimator'

  // Estimator state
  const [selectedTreatment, setSelectedTreatment] = useState('Wash & Iron');
  const [garments, setGarments] = useState({
    shirts: 4,
    trousers: 2,
    bedsheets: 1,
    suits: 0,
  });

  const priceRates = {
    'Wash & Fold': { shirts: 45, trousers: 50, bedsheets: 90, suits: 0, baseDelivery: '24 Hours' },
    'Wash & Iron': { shirts: 59, trousers: 65, bedsheets: 120, suits: 160, baseDelivery: '24 Hours' },
    'Dry Cleaning': { shirts: 110, trousers: 120, bedsheets: 220, suits: 250, baseDelivery: '48 Hours' },
    'Premium Garment Care': { shirts: 90, trousers: 95, bedsheets: 240, suits: 280, baseDelivery: '36 Hours' },
  };

  const currentRates = priceRates[selectedTreatment];
  const estimatedTotal =
    garments.shirts * currentRates.shirts +
    garments.trousers * currentRates.trousers +
    garments.bedsheets * currentRates.bedsheets +
    garments.suits * currentRates.suits;

  const totalGarments = garments.shirts + garments.trousers + garments.bedsheets + garments.suits;

  const updateGarmentQty = (key, delta) => {
    setGarments((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const services = [
    {
      id: 'wash-fold',
      title: 'Wash & Fold',
      price: 'From ₹49 / kg',
      tagline: 'Ideal for everyday casuals, towels, and gym wear',
      turnaround: '24 Hours Turnaround',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
      description:
        'Everyday casual wear, linens, and towels washed with bio-enzymatic care, tumble-dried at safe temperatures, and neatly folded into crisp bundles.',
      benefits: [
        'Bio-enzymatic, skin-safe German detergents',
        'Separation of whites, darks, and delicate fabrics',
        'Tumble dried and ready to wear without wrinkles',
        'Recyclable dust-free protective packaging',
      ],
    },
    {
      id: 'wash-iron',
      title: 'Wash & Iron',
      price: 'From ₹59 / pc',
      tagline: 'Best for office formals, shirts, trousers & ethnic wear',
      turnaround: '24 Hours Turnaround',
      image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80',
      description:
        'Thorough hygienic washing followed by temperature-controlled industrial steam pressing on premium wooden hangers with protective suit covers.',
      benefits: [
        'High-pressure steam pressing with zero shine or fabric burn',
        'Collar & cuff stain pre-treatment for crisp finish',
        'Delivered on shaped wooden hangers or precision folds',
        'Starch options available on request (Light / Medium / Stiff)',
      ],
    },
    {
      id: 'dry-cleaning',
      title: 'Dry Cleaning',
      price: 'From ₹129 / pc',
      tagline: 'Specially crafted for suits, silk sarees, lehengas & blazers',
      turnaround: '48 Hours Turnaround',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      description:
        'Hydrocarbon solvent technology designed to remove oily stains, preserve delicate embroidery, prevent color bleeding, and restore garments to pristine elegance.',
      benefits: [
        'Zero-odor, eco-friendly hydrocarbon cleaning agents',
        'Hand inspection of zips, buttons, and intricate beadwork',
        'Individual breathable garment covers for long preservation',
        'Expert care for bridal wear and designer luxury fabrics',
      ],
    },
    {
      id: 'premium-garment-care',
      title: 'Premium Garment Care',
      price: 'From ₹149 / pc',
      tagline: 'Deep sanitization for duvets, woollens, curtains & blankets',
      turnaround: '36 Hours Turnaround',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
      description:
        'Heavy-duty sanitizing cycles targeting dust mites, allergens, and deep-seated odors in winter duvets, mink blankets, carpets, and luxury home furnishings.',
      benefits: [
        'Anti-microbial and dust-mite allergen elimination',
        'Gentle woollen treatment preventing fiber shrinking',
        'UV sanitation chambers before final sealing',
        'Hermetically sealed breathable storage packaging',
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      {/* 1. Services Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200/60 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Laundry & Garment Care Catalog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C1C1E] tracking-tight mb-4">
              Our Laundry & Dry Cleaning Services
            </h1>
            <p className="text-base sm:text-lg text-[#57575A] leading-relaxed">
              Serving residential societies, university students, and busy families across Jagatpura, Jaipur. Choose from our four specialized services.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F4F3F0] p-1.5 rounded-full border border-[#E7E5E0] self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-[#1C1C1E] shadow-2xs'
                  : 'text-[#737373] hover:text-[#1C1C1E]'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('estimator')}
              className={`py-2 px-5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'estimator'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-[#737373] hover:text-[#1C1C1E]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Price Calculator</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Four Dedicated Service Cards */}
      {activeTab === 'all' && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 space-y-12">
          {services.map((svc, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={svc.id}
                className="bg-white rounded-3xl border border-[#E7E5E0] overflow-hidden hover:border-orange-300 transition-colors shadow-2xs"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Service Image */}
                  <div
                    className={`lg:col-span-5 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-[#F6F5F2] ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover min-h-[300px] lg:min-h-[380px]"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#1C1C1E] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#E7E5E0] shadow-2xs">
                      {svc.price}
                    </div>
                  </div>

                  {/* Service Details */}
                  <div
                    className={`lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                          {svc.tagline}
                        </span>
                        <span className="text-[#D8D6D0]">•</span>
                        <span className="text-xs text-[#737373] flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-orange-600" />
                          {svc.turnaround}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] font-heading mb-3">
                        {svc.title}
                      </h2>

                      <p className="text-sm sm:text-base text-[#57575A] leading-relaxed mb-6">
                        {svc.description}
                      </p>

                      {/* Benefits Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {svc.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#1C1C1E]">
                            <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span className="leading-snug">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-6 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <div className="text-xs text-[#737373]">
                        Free doorstep pickup & delivery in <span className="font-semibold text-[#1C1C1E]">Jagatpura</span>
                      </div>

                      <button
                        onClick={() => onOpenBooking(svc.title)}
                        className="py-3 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
                      >
                        <span>Book {svc.title}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* 3. Interactive Price & Turnaround Estimator */}
      {activeTab === 'estimator' && (
        <section className="max-w-4xl mx-auto px-6 sm:px-8 mb-20 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E5E0] shadow-xs">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider block mb-1">
                Transparent Jagatpura Rates
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E] font-heading">
                Live Laundry Price Estimator
              </h2>
              <p className="text-xs sm:text-sm text-[#57575A] mt-1.5 max-w-lg mx-auto">
                Select your desired service, adjust garment quantities, and get an immediate estimate with delivery schedule.
              </p>
            </div>

            {/* Treatment Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {['Wash & Fold', 'Wash & Iron', 'Dry Cleaning', 'Premium Garment Care'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTreatment(t)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                    selectedTreatment === t
                      ? 'bg-[#1C1C1E] text-white shadow-xs'
                      : 'bg-[#F4F3F0] text-[#57575A] hover:bg-[#EBEAE5]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Garment Counters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { key: 'shirts', label: 'Shirts / Tops', rate: currentRates.shirts },
                { key: 'trousers', label: 'Trousers / Jeans', rate: currentRates.trousers },
                { key: 'bedsheets', label: 'Bed Sheets / Linen', rate: currentRates.bedsheets },
                { key: 'suits', label: 'Suits / Blazers', rate: currentRates.suits },
              ].map((item) => (
                <div
                  key={item.key}
                  className="p-4 bg-[#FCFBF8] rounded-2xl border border-[#E7E5E0] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-[#1C1C1E] block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#737373]">
                      ₹{item.rate} / pc
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E7E5E0]">
                    <button
                      onClick={() => updateGarmentQty(item.key, -1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E7E5E0] text-[#1C1C1E] hover:bg-[#F4F3F0] flex items-center justify-center font-bold text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-heading font-bold text-base text-[#1C1C1E]">
                      {garments[item.key]}
                    </span>
                    <button
                      onClick={() => updateGarmentQty(item.key, 1)}
                      className="w-8 h-8 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center font-bold text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Computed Calculation Box */}
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold text-[#737373] block mb-0.5">
                  Calculated Total ({totalGarments} items in {selectedTreatment})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#1C1C1E] font-heading">
                    ₹{estimatedTotal}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Pickup Included
                  </span>
                </div>
                <p className="text-xs text-[#57575A] mt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Estimated Delivery: <strong>{currentRates.baseDelivery}</strong></span>
                </p>
              </div>

              <button
                onClick={() => onOpenBooking(`${selectedTreatment} (~${totalGarments} garments)`)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Book with this Estimate (+50 pts)</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Small Final CTA */}
      <FinalCTA onOpenBooking={() => onOpenBooking('Wash & Fold')} />
    </div>
  );
};
