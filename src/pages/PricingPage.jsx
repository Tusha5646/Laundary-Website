import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PricingPage = () => {
  const { navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = useState("Men's");

  const categoryPricing = {
    "Men's": [
      { name: 'T-Shirt', washFold: '₹50', washIron: '₹60', dryClean: '₹120' },
      { name: 'Casual / Formal Shirt', washFold: '₹60', washIron: '₹70', dryClean: '₹130' },
      { name: 'Trouser / Chinos', washFold: '₹65', washIron: '₹75', dryClean: '₹140' },
      { name: 'Jeans / Denim', washFold: '₹80', washIron: '₹95', dryClean: '₹160' },
      { name: 'Blazer / Suit Jacket', washFold: '—', washIron: '₹180', dryClean: '₹220' },
      { name: 'Winter Jacket / Hoodie', washFold: '₹140', washIron: '₹170', dryClean: '₹250' },
      { name: 'Handkerchief / Socks', washFold: '₹20', washIron: '₹25', dryClean: '—' },
    ],
    "Women's": [
      { name: 'Top / Blouse', washFold: '₹55', washIron: '₹65', dryClean: '₹130' },
      { name: 'Daily Kurti', washFold: '₹70', washIron: '₹85', dryClean: '₹150' },
      { name: 'Heavy Embroidered Saree', washFold: '—', washIron: '₹140', dryClean: '₹220' },
      { name: 'Dress / One-Piece', washFold: '₹90', washIron: '₹110', dryClean: '₹180' },
      { name: 'Dupatta / Stole', washFold: '₹35', washIron: '₹45', dryClean: '₹90' },
    ],
    "Bedding": [
      { name: 'Single Bed Sheet', washFold: '₹100', washIron: '₹120', dryClean: '₹180' },
      { name: 'Double / Queen Bed Sheet', washFold: '₹130', washIron: '₹150', dryClean: '₹220' },
      { name: 'King Size Bed Sheet', washFold: '₹150', washIron: '₹180', dryClean: '₹250' },
      { name: 'Pillow Case (Pair)', washFold: '₹35', washIron: '₹45', dryClean: '₹70' },
      { name: 'Single Duvet / Quilt', washFold: '—', washIron: '—', dryClean: '₹240' },
      { name: 'Double Duvet / Comforter', washFold: '—', washIron: '—', dryClean: '₹320' },
    ],
    "Household": [
      { name: 'Hand Towel', washFold: '₹40', washIron: '—', dryClean: '₹70' },
      { name: 'Bath Towel', washFold: '₹70', washIron: '—', dryClean: '₹120' },
      { name: 'Bath Mat', washFold: '₹60', washIron: '—', dryClean: '₹100' },
      { name: 'Tablecloth (Large)', washFold: '₹110', washIron: '₹140', dryClean: '₹190' },
      { name: 'Carpet / Rug (per sq.ft)', washFold: '—', washIron: '—', dryClean: '₹390' },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
          Transparent & Honest Rates
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading mt-3 mb-3">
          Simple, Fair Laundry Pricing
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          No hidden fees. Free doorstep pickup on orders above ₹300 with 100% garment safety guarantee.
        </p>
      </div>

      {/* Package Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Everyday Care</span>
            <h3 className="text-2xl font-black text-slate-900 font-heading mt-1">
              Wash & Fold
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Best for t-shirts, jeans, loungewear, and daily casuals.
            </p>
            <div className="text-3xl font-black text-orange-500 font-heading mb-6">
              ₹49 <span className="text-xs font-normal text-slate-400">/ starting item</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Bio-enzymatic gentle wash</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Hygienic tumble dry</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Neatly folded in eco bags</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>24-Hour Express return</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="w-full mt-6 py-3 rounded-2xl bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-bold text-xs transition-colors"
          >
            Select Wash & Fold
          </button>
        </div>

        {/* Most Popular */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-orange-500 shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-xs">
            MOST POPULAR
          </div>
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase">Office & Formal</span>
            <h3 className="text-2xl font-black text-slate-900 font-heading mt-1">
              Wash & Steam Iron
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Wrinkle-free steam pressed garments ready to wear right out of the bag.
            </p>
            <div className="text-3xl font-black text-orange-600 font-heading mb-6">
              ₹59 <span className="text-xs font-normal text-slate-400">/ starting item</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Deep stain pretreatment</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Industrial steam ironing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Garment hangers or crisp fold</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Fragrant fabric softener</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all"
          >
            Select Wash & Iron
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Luxury Care</span>
            <h3 className="text-2xl font-black text-slate-900 font-heading mt-1">
              Dry Cleaning
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Suits, silks, wedding wear, woollens, and delicate duvets.
            </p>
            <div className="text-3xl font-black text-teal-600 font-heading mb-6">
              ₹129 <span className="text-xs font-normal text-slate-400">/ starting item</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Zero-water eco hydrocarbon</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Color vibrancy protection</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Protective breathable garment bags</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>36-48 Hours turnaround</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="w-full mt-6 py-3 rounded-2xl bg-teal-50 hover:bg-teal-500 text-teal-700 hover:text-white font-bold text-xs transition-colors"
          >
            Select Dry Cleaning
          </button>
        </div>
      </div>

      {/* Item-by-Item Price Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 font-heading">
              Complete Garment Rate Card
            </h2>
            <p className="text-xs text-slate-500">
              Prices per piece in INR inclusive of all eco-detergents
            </p>
          </div>

          {/* Category switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {["Men's", "Women's", "Bedding", "Household"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                <th className="py-3 px-4">Garment Item</th>
                <th className="py-3 px-4">Wash & Fold</th>
                <th className="py-3 px-4">Wash & Iron</th>
                <th className="py-3 px-4">Dry Cleaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(categoryPricing[activeCategory] || []).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-800">{row.name}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{row.washFold}</td>
                  <td className="py-3.5 px-4 font-semibold text-orange-600">{row.washIron}</td>
                  <td className="py-3.5 px-4 font-semibold text-teal-700">{row.dryClean}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Garment Damage and Loss Insurance up to ₹5,000 per cloth</span>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="py-2.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20"
          >
            <span>Book a Pickup Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
