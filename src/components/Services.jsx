import React, { useState } from 'react';
import { ArrowUpRight, Calculator, Sparkles, Plus, Minus, Clock, ShieldCheck, Check } from 'lucide-react';

export const Services = ({ onSelectService }) => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'estimator'

  // Estimator State
  const [selectedTreatment, setSelectedTreatment] = useState('Wash & Iron');
  const [items, setItems] = useState({
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
    items.shirts * currentRates.shirts +
    items.trousers * currentRates.trousers +
    items.bedsheets * currentRates.bedsheets +
    items.suits * currentRates.suits;

  const totalGarments = items.shirts + items.trousers + items.bedsheets + items.suits;

  const updateItemQty = (key, delta) => {
    setItems((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const servicesList = [
    {
      id: 'wash-fold',
      title: 'Wash & Fold',
      description: 'Everyday casual wear, linens, and towels washed with bio-enzymatic care, tumble-dried, and neatly folded.',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
      price: 'From ₹49 / kg',
      time: '24h Delivery',
    },
    {
      id: 'wash-iron',
      title: 'Wash & Iron',
      description: 'Thorough hygienic wash followed by precision temperature steam pressing on hangers, ready for the day.',
      image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80',
      price: 'From ₹59 / pc',
      time: '24h Delivery',
    },
    {
      id: 'dry-cleaning',
      title: 'Dry Cleaning',
      description: 'Gentle solvent care specialized for tailored suits, blazers, silks, sarees, and delicate formal wear.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      price: 'From ₹129 / pc',
      time: '48h Delivery',
    },
    {
      id: 'garment-care',
      title: 'Premium Garment Care',
      description: 'Specialized deep treatment for heavy duvets, woollen outerwear, fine curtains, and designer fabrics.',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
      price: 'From ₹149 / pc',
      time: '36h Delivery',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 block mb-2">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] tracking-tight">
              Carefully tailored cleaning services.
            </h2>
            <p className="text-sm text-[#57575A] mt-2">
              From daily essentials to intricate wedding wear, we provide dependable laundry solutions in Jagatpura.
            </p>
          </div>

          {/* Dynamic Switcher: Cards vs Live Estimator */}
          <div className="flex items-center bg-[#F4F3F0] p-1 rounded-full border border-[#E7E5E0] self-start md:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`py-2 px-5 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-[#1C1C1E] shadow-2xs'
                  : 'text-[#737373] hover:text-[#1C1C1E]'
              }`}
            >
              Services Overview
            </button>
            <button
              onClick={() => setViewMode('estimator')}
              className={`py-2 px-5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'estimator'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-[#737373] hover:text-[#1C1C1E]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Price Estimator</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: 4 Large, Elegant Image Cards */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 animate-in fade-in duration-200">
            {servicesList.map((svc) => (
              <div
                key={svc.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E7E5E0] flex flex-col justify-between hover:border-orange-300 transition-colors duration-200"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#F6F5F2]">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#1C1C1E] text-xs font-bold px-3 py-1 rounded-full border border-white/40">
                    {svc.price}
                  </div>
                </div>

                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] mb-2 font-heading">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-[#57575A] leading-relaxed mb-6">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
                    <button
                      onClick={() => onSelectService(svc.title)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <span>Book Service</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#737373] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      {svc.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode 2: Interactive Dynamic Price & Turnaround Estimator */}
        {viewMode === 'estimator' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E5E0] shadow-xs animate-in fade-in duration-200">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider block mb-1">
                  Live Cost & Time Calculator
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E] font-heading">
                  Estimate Your Laundry Order
                </h3>
                <p className="text-xs text-[#57575A] mt-1">
                  Adjust quantities below to see transparent pricing and delivery turnaround for Jagatpura.
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
                  { key: 'shirts', label: 'Shirts / T-Shirts', rate: currentRates.shirts },
                  { key: 'trousers', label: 'Trousers / Jeans', rate: currentRates.trousers },
                  { key: 'bedsheets', label: 'Bed Sheets / Linens', rate: currentRates.bedsheets },
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
                        onClick={() => updateItemQty(item.key, -1)}
                        className="w-8 h-8 rounded-lg bg-white border border-[#E7E5E0] text-[#1C1C1E] hover:bg-[#F4F3F0] flex items-center justify-center font-bold text-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-heading font-bold text-base text-[#1C1C1E]">
                        {items[item.key]}
                      </span>
                      <button
                        onClick={() => updateItemQty(item.key, 1)}
                        className="w-8 h-8 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center font-bold text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Computed Summary Card */}
              <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold text-[#737373] block mb-0.5">
                    Estimated Total ({totalGarments} items in {selectedTreatment})
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#1C1C1E] font-heading">
                      ₹{estimatedTotal}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Doorstep Pickup Included
                    </span>
                  </div>
                  <p className="text-xs text-[#57575A] mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>Estimated Turnaround: <strong>{currentRates.baseDelivery}</strong></span>
                  </p>
                </div>

                <button
                  onClick={() => onSelectService(`${selectedTreatment} (~${totalGarments} items)`)}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Book with this Estimate (+50 pts)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
