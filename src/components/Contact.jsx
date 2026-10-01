import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: 'Wash & Fold',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', contact: '', service: 'Wash & Fold', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 block mb-2">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] tracking-tight">
                Contact FreshFold
              </h2>
              <p className="text-sm text-[#57575A] mt-2 leading-relaxed">
                Have questions or need a custom pickup arrangement in Jagatpura? Reach out directly or send us a note.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F3F0] text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1C1E]">Facility Location</h4>
                  <p className="text-sm text-[#57575A] mt-0.5">
                    Near Mahal Road, Jagatpura, Jaipur, Rajasthan 302017
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F3F0] text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1C1E]">Direct Phone / WhatsApp</h4>
                  <a
                    href="tel:+919829012345"
                    className="text-sm text-[#57575A] hover:text-orange-600 transition-colors mt-0.5 block"
                  >
                    +91 98290 12345
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F3F0] text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1C1E]">Email Address</h4>
                  <a
                    href="mailto:contact@freshfold.in"
                    className="text-sm text-[#57575A] hover:text-orange-600 transition-colors mt-0.5 block"
                  >
                    contact@freshfold.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F3F0] text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1C1E]">Business Hours</h4>
                  <p className="text-sm text-[#57575A] mt-0.5">
                    Monday – Sunday: 8:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Clean Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E7E5E0]">
            <h3 className="text-xl font-bold text-[#1C1C1E] mb-6 font-heading">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-[#F4F3F0] rounded-2xl p-6">
                <CheckCircle2 className="w-10 h-10 text-orange-600 mx-auto" />
                <h4 className="text-base font-bold text-[#1C1C1E]">
                  Message Received
                </h4>
                <p className="text-sm text-[#57575A]">
                  Thank you! Our Jagatpura service team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-sm focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                      Phone Number or Email
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="+91 or email"
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
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Message or Pickup Address
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide your inquiry or address details in Jagatpura..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E7E5E0] bg-[#FCFBF8] text-sm focus:outline-none focus:border-orange-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all duration-200 active:scale-98"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
