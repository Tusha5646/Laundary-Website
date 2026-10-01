import React from 'react';
import { Sparkles, Clock, ShieldCheck, CheckCircle } from 'lucide-react';

export const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Premium Care',
      description: 'Every garment is inspected and washed with fabric-appropriate settings and eco-friendly detergents.',
    },
    {
      icon: Clock,
      title: 'Reliable Service',
      description: 'Consistent quality, dependable scheduling, and punctual doorstep pickup and return.',
    },
    {
      icon: ShieldCheck,
      title: 'Hygienic Process',
      description: 'Clean water, sanitized equipment, and completely segregated wash cycles with zero batch-mixing.',
    },
    {
      icon: CheckCircle,
      title: 'Easy Experience',
      description: 'Simple booking, transparent communication, and hassle-free laundry care in Jagatpura.',
    },
  ];

  return (
    <section className="py-20 border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 block mb-2">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] tracking-tight">
            Thoughtful garment care, from pickup to delivery.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-[#E7E5E0] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F4F3F0] text-[#1C1C1E] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#57575A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
