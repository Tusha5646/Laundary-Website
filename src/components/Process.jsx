import React from 'react';
import { Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Schedule',
      description: 'Choose your desired service and select a convenient pickup time for your doorstep in Jagatpura.',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'We Care',
      description: 'Your garments are individually sorted, eco-cleaned, sanitized, and steam-pressed with attention.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Delivered',
      description: 'Fresh, immaculate, and neatly packed garments are delivered back to your home ready to wear.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-[#E7E5E0] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 block mb-2">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] tracking-tight">
            How it works
          </h2>
          <p className="text-sm text-[#57575A] mt-2">
            A seamless three-step routine designed around your daily schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl border border-[#E7E5E0] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-3xl font-extrabold text-[#A3A19B]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#F4F3F0] text-orange-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#1C1C1E] mb-2 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#57575A] leading-relaxed">
                    {step.description}
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
