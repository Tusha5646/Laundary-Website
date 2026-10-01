import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Process } from '../components/Process';
import { FinalCTA } from '../components/FinalCTA';

export const HomePage = ({ onOpenBooking }) => {
  const previewServices = [
    {
      title: 'Wash & Fold',
      desc: 'Casual wear, towels, and bedsheets bio-washed, dried, and neatly stacked.',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80',
      price: 'From ₹49 / kg',
    },
    {
      title: 'Wash & Iron',
      desc: 'Hygienic wash followed by industrial steam pressing on wooden hangers.',
      image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=600&q=80',
      price: 'From ₹59 / pc',
    },
    {
      title: 'Dry Cleaning',
      desc: 'Expert solvent care for suits, silks, sarees, and delicate formal garments.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
      price: 'From ₹129 / pc',
    },
    {
      title: 'Premium Garment Care',
      desc: 'Deep sanitizing treatment for duvets, blankets, woollens, and curtains.',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
      price: 'From ₹149 / pc',
    },
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero onOpenBooking={() => onOpenBooking('Wash & Fold')} />

      {/* 2. Why Choose Us */}
      <WhyChooseUs />

      {/* 3. Services Preview (Short preview only) */}
      <section className="py-20 sm:py-24 border-b border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 block mb-2">
                Services Preview
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] tracking-tight">
                Our Signature Laundry Care
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>Explore All Services & Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewServices.map((svc, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-[#E7E5E0] hover:border-orange-300 transition-colors flex flex-col justify-between"
              >
                <div className="aspect-16/10 overflow-hidden bg-[#F6F5F2]">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-orange-600 uppercase block mb-1">
                      {svc.price}
                    </span>
                    <h3 className="font-bold text-base text-[#1C1C1E] mb-1 font-heading">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-[#57575A] leading-relaxed mb-4">
                      {svc.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenBooking(svc.title)}
                    className="w-full py-2 px-3 rounded-full bg-[#F4F3F0] hover:bg-orange-50 text-[#1C1C1E] hover:text-orange-600 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Book Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 3-Step Process */}
      <Process />

      {/* 5. Final CTA */}
      <FinalCTA onOpenBooking={() => onOpenBooking('Wash & Fold')} />
    </div>
  );
};
