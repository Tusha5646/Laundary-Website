import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  Navigation,
  Home,
  Briefcase,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SchedulePickupPage = () => {
  const { bookingDetails, setBookingDetails, grandTotal, totalCartCount, navigateTo, showToast } = useApp();

  const [activeStep, setActiveStep] = useState(1); // 1: Location, 2: Date & Time

  const pickupSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
  ];

  const deliverySlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
  ];

  const dateOptions = [
    { label: 'Today', date: 'Thursday, Oct 1' },
    { label: 'Tomorrow', date: 'Friday, Oct 2' },
    { label: 'Sat, Oct 3', date: 'Saturday, Oct 3' },
    { label: 'Sun, Oct 4', date: 'Sunday, Oct 4' },
    { label: 'Mon, Oct 5', date: 'Monday, Oct 5' },
  ];

  const deliveryDateOptions = [
    { label: 'Tomorrow', date: 'Friday, Oct 2' },
    { label: 'Sat, Oct 3', date: 'Saturday, Oct 3' },
    { label: 'Sun, Oct 4', date: 'Sunday, Oct 4' },
    { label: 'Mon, Oct 5', date: 'Monday, Oct 5' },
    { label: 'Tue, Oct 6', date: 'Tuesday, Oct 6' },
  ];

  const handleDetectGPS = () => {
    showToast('GPS detected: Sunshine Heights, Bandra West (Accuracy: 5m)');
    setBookingDetails({
      ...bookingDetails,
      area: 'Bandra West, Mumbai',
      addressLine: 'Flat 402, Sunshine Heights, Hill Road',
      landmark: 'Near Mehboob Studio',
      pincode: '400050',
    });
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (!bookingDetails.addressLine || !bookingDetails.area) {
      showToast('Please provide your complete pickup address', 'error');
      return;
    }
    navigateTo('payment');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigateTo('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Bag</span>
        </button>
      </div>

      {/* Step Indicator Header (1. Location -> 2. Date & Time -> 3. Payment -> 4. Confirmation) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs mb-8">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-orange-100 shadow-xs">
              1
            </div>
            <span className="text-xs font-bold text-orange-600 mt-1.5">Location</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-orange-100 shadow-xs">
              2
            </div>
            <span className="text-xs font-bold text-orange-600 mt-1.5">Date & Time</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="text-xs font-semibold text-slate-400 mt-1.5">Payment</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <span className="text-xs font-semibold text-slate-400 mt-1.5">Confirm</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleContinueToPayment} className="space-y-8">
        {/* STEP 1: LOCATION DETAILS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  1. Pickup & Delivery Location
                </h2>
                <p className="text-xs text-slate-400">Where should our laundry valet arrive?</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDetectGPS}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs font-bold transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>Current GPS Location</span>
            </button>
          </div>

          {/* Address Type Tag */}
          <div className="mb-4">
            <label className="text-xs font-bold text-slate-600 block mb-2">Address Type</label>
            <div className="flex items-center gap-3">
              {[
                { tag: 'Home', icon: Home },
                { tag: 'Office', icon: Briefcase },
                { tag: 'Other', icon: MapPin },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = bookingDetails.addressType === item.tag;
                return (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() =>
                      setBookingDetails({ ...bookingDetails, addressType: item.tag })
                    }
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                House / Flat / Apartment & Building Name *
              </label>
              <input
                type="text"
                required
                value={bookingDetails.addressLine}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, addressLine: e.target.value })
                }
                placeholder="e.g. Flat 402, Sunshine Heights, Hill Road"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Area / Locality *
              </label>
              <input
                type="text"
                required
                value={bookingDetails.area}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, area: e.target.value })
                }
                placeholder="e.g. Bandra West, Mumbai"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={bookingDetails.landmark}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, landmark: e.target.value })
                }
                placeholder="e.g. Near Mehboob Studio"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="saveAddress"
              defaultChecked
              className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500 accent-orange-500"
            />
            <label htmlFor="saveAddress" className="text-xs text-slate-600 font-medium cursor-pointer">
              Save this address for fast 1-click future laundry pickups
            </label>
          </div>
        </div>

        {/* STEP 2: DATE & TIME SLOTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-heading">
                2. Schedule Date & Time Slots
              </h2>
              <p className="text-xs text-slate-400">
                Choose convenient pickup and return windows
              </p>
            </div>
          </div>

          {/* Pickup Date & Slot */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Select Pickup Date
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
              {dateOptions.map((opt) => (
                <button
                  key={opt.date}
                  type="button"
                  onClick={() =>
                    setBookingDetails({ ...bookingDetails, pickupDate: opt.date })
                  }
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    bookingDetails.pickupDate === opt.date
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <span className="block text-xs font-bold">{opt.label}</span>
                  <span className="block text-[10px] opacity-80 mt-0.5">{opt.date.split(',')[1]}</span>
                </button>
              ))}
            </div>

            <label className="text-xs font-bold text-slate-700 block mb-2">
              Pickup Time Window (2-Hour Slot)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {pickupSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() =>
                    setBookingDetails({ ...bookingDetails, pickupTime: slot })
                  }
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    bookingDetails.pickupTime === slot
                      ? 'bg-orange-50 text-orange-600 border-orange-500 ring-2 ring-orange-500/20'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Date & Slot */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Select Delivery Return Date
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
              {deliveryDateOptions.map((opt) => (
                <button
                  key={opt.date}
                  type="button"
                  onClick={() =>
                    setBookingDetails({ ...bookingDetails, deliveryDate: opt.date })
                  }
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    bookingDetails.deliveryDate === opt.date
                      ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <span className="block text-xs font-bold">{opt.label}</span>
                  <span className="block text-[10px] opacity-80 mt-0.5">{opt.date.split(',')[1]}</span>
                </button>
              ))}
            </div>

            <label className="text-xs font-bold text-slate-700 block mb-2">
              Delivery Return Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {deliverySlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() =>
                    setBookingDetails({ ...bookingDetails, deliveryTime: slot })
                  }
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    bookingDetails.deliveryTime === slot
                      ? 'bg-teal-50 text-teal-700 border-teal-500 ring-2 ring-teal-500/20'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Valet Special Notes */}
          <div className="pt-6 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Special Laundry or Entry Instructions (Optional)</span>
            </label>
            <input
              type="text"
              value={bookingDetails.notes}
              onChange={(e) =>
                setBookingDetails({ ...bookingDetails, notes: e.target.value })
              }
              placeholder="e.g. Ring flat bell twice, please hang blazer on wood hanger..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-slate-200/90 shadow-md">
          <div>
            <span className="text-xs text-slate-400 font-medium">Order Total Payable:</span>
            <p className="text-2xl font-black text-slate-900 font-heading">
              ₹{grandTotal}{' '}
              <span className="text-xs font-bold text-slate-400 font-sans">
                ({totalCartCount} items)
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Continue to Payment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
