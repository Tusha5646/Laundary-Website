import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send, Sparkles, Navigation, ShieldCheck } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: 'Wash & Fold',
    address: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        contact: '',
        service: 'Wash & Fold',
        address: '',
        message: '',
      });
    }, 4000);
  };

  const coverageAreas = [
    'Model Town',
    'Mahal Road',
    'NRI Colony',
    'Ramnagariya',
    'SKIT Campus area',
    'JECRC area',
    'Malviya Nagar Ext.',
    'Bombay Hospital road',
  ];

  return (
    <div className="py-12 sm:py-16">
      {/* 1. Contact Page Heading */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Support & Pickup Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C1C1E] tracking-tight mb-4">
            Contact FreshFold Laundry
          </h1>

          <p className="text-base sm:text-lg text-[#57575A] leading-relaxed">
            Have questions about dry cleaning delicate fabrics, require customized scheduled laundry for your family, or want to confirm pickup in Jagatpura, Jaipur? We are here to help.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid: Info & Form */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Details Card */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-[#E7E5E0] space-y-6 shadow-2xs">
              <h2 className="text-xl font-bold text-[#1C1C1E] font-heading">
                Facility & Contact Details
              </h2>

              <div className="space-y-5">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/60">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#737373] uppercase tracking-wider">
                      Facility Location
                    </h3>
                    <p className="text-sm font-semibold text-[#1C1C1E] mt-0.5">
                      Near Mahal Road, Jagatpura, Jaipur, Rajasthan 302017
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Direct walk-ins and express doorstep pickup vans
                    </p>
                  </div>
                </div>

                {/* Direct Phone / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/60">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#737373] uppercase tracking-wider">
                      Direct Phone & WhatsApp
                    </h3>
                    <a
                      href="tel:+919829012345"
                      className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors mt-0.5 block"
                    >
                      +91 98290 12345
                    </a>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Available daily for immediate pickup coordination
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/60">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#737373] uppercase tracking-wider">
                      Email Address
                    </h3>
                    <a
                      href="mailto:contact@freshfold.in"
                      className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors mt-0.5 block"
                    >
                      contact@freshfold.in
                    </a>
                    <p className="text-xs text-[#737373] mt-0.5">
                      For corporate accounts and bulk residential quotes
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/60">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#737373] uppercase tracking-wider">
                      Operating Hours
                    </h3>
                    <p className="text-sm font-semibold text-[#1C1C1E] mt-0.5">
                      Monday – Sunday: 8:00 AM – 9:00 PM
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5">
                      Open 7 days a week, including public holidays
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jagatpura Service Coverage Pill Box */}
            <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-[#E7E5E0]">
              <div className="flex items-center gap-2 mb-3">
                <Navigation className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E]">
                  Doorstep Pickup Coverage in Jagatpura
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {coverageAreas.map((area, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-[#1C1C1E] bg-white px-2.5 py-1 rounded-full border border-[#E7E5E0]"
                  >
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E7E5E0] shadow-2xs">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 block mb-1">
                Direct Message
              </span>
              <h2 className="text-2xl font-bold text-[#1C1C1E] font-heading">
                Send Us a Note or Request
              </h2>
              <p className="text-xs sm:text-sm text-[#57575A] mt-1">
                Fill out the form below. Our Jagatpura manager will contact you within 30 minutes during operating hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 px-6 text-center space-y-3 bg-[#FAF9F6] rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#1C1C1E] font-heading">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-[#57575A] max-w-sm mx-auto">
                  Thank you! We have received your note. A member of our Jagatpura operations team will call or message you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-sm focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="+91 98290 12345"
                      className="w-full px-4 py-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-sm focus:outline-none focus:border-orange-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                      Service Interested In
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-sm focus:outline-none focus:border-orange-600 transition-colors"
                    >
                      <option>Wash & Fold</option>
                      <option>Wash & Iron</option>
                      <option>Dry Cleaning</option>
                      <option>Premium Garment Care</option>
                      <option>General Inquiry / Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Society / Street in Jagatpura
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Flat 302, Royal Palms, Mahal Road"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-sm focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Your Message or Special Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the clothes, required pickup time, or any questions..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-sm focus:outline-none focus:border-orange-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
