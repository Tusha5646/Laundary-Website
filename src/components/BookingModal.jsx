import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Calendar, Clock, Gift, Sparkles } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const BookingModal = ({ isOpen, onClose, initialService = 'Wash & Fold' }) => {
  const { points, createBooking } = useRewards();

  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    service: initialService,
    date: 'Tomorrow',
    timeSlot: 'Morning (08:00 AM – 11:00 AM)',
    address: '',
    notes: '',
  });

  const [redeemCheck, setRedeemCheck] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState(points >= 100 ? 100 : points);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const toRedeem = redeemCheck ? pointsToRedeem : 0;
    const newBooking = createBooking(booking, toRedeem);
    setConfirmedBooking(newBooking);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setRedeemCheck(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1C1E]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#FCFBF8] rounded-3xl max-w-lg w-full p-7 sm:p-9 shadow-2xl border border-[#E7E5E0] relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#737373] hover:text-[#1C1C1E] hover:bg-[#F4F3F0] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto border border-orange-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#1C1C1E] font-heading">
              Pickup Scheduled!
            </h3>

            <p className="text-sm text-[#57575A] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{confirmedBooking.name}</strong>. Order <strong>#{confirmedBooking.id}</strong> has been logged. Our valet will arrive at your address in Jagatpura on <strong>{confirmedBooking.date}</strong> during <strong>{confirmedBooking.timeSlot}</strong>.
            </p>

            {/* Points Reward Callout */}
            <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-200 text-xs text-orange-800 flex items-center justify-center gap-2 font-semibold">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>+50 FreshPoints added to your rewards wallet for this booking!</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E7E5E0] text-left text-xs space-y-1.5 text-[#57575A] my-4">
              <p><strong>Service:</strong> {confirmedBooking.service}</p>
              <p><strong>Phone:</strong> {confirmedBooking.phone}</p>
              <p><strong>Address:</strong> {confirmedBooking.address}</p>
              {confirmedBooking.discount > 0 && (
                <p className="text-emerald-600 font-semibold">
                  <strong>Points Discount Applied:</strong> -₹{confirmedBooking.discount}
                </p>
              )}
              <p><strong>Location:</strong> Jagatpura, Jaipur</p>
            </div>

            <button
              onClick={handleReset}
              className="py-3 px-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider block mb-1">
                  Doorstep Pickup
                </span>
                {points > 0 && (
                  <span className="text-[11px] font-bold text-slate-700 bg-[#F4F3F0] px-2.5 py-0.5 rounded-full border border-[#E7E5E0] flex items-center gap-1">
                    <Gift className="w-3 h-3 text-orange-600" />
                    <span>{points} FreshPoints Available</span>
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#1C1C1E] font-heading">
                Book a Laundry Service
              </h3>
              <p className="text-xs text-[#737373] mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Serving all residences & offices in Jagatpura, Jaipur</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={booking.name}
                  onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    placeholder="+91 98290..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Service *
                  </label>
                  <select
                    value={booking.service}
                    onChange={(e) => setBooking({ ...booking, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                  >
                    <option>Wash & Fold</option>
                    <option>Wash & Iron</option>
                    <option>Dry Cleaning</option>
                    <option>Premium Garment Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Pickup Day
                  </label>
                  <select
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                  >
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>Day After Tomorrow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                    Preferred Time Slot
                  </label>
                  <select
                    value={booking.timeSlot}
                    onChange={(e) => setBooking({ ...booking, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                  >
                    <option>Morning (08:00 AM – 11:00 AM)</option>
                    <option>Afternoon (01:00 PM – 04:00 PM)</option>
                    <option>Evening (05:00 PM – 08:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                  Pickup Address in Jagatpura *
                </label>
                <textarea
                  rows={2}
                  required
                  value={booking.address}
                  onChange={(e) => setBooking({ ...booking, address: e.target.value })}
                  placeholder="Flat/House, Society / Colony, Mahal Road, Jagatpura, Jaipur"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600 resize-none"
                />
              </div>

              {/* Point System Redemption Feature */}
              {points > 0 && (
                <div className="p-3.5 bg-white rounded-2xl border border-orange-200/80 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-2 text-xs font-semibold text-[#1C1C1E]">
                      <Gift className="w-4 h-4 text-orange-600" />
                      <span>Redeem FreshPoints for discount</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={redeemCheck}
                      onChange={(e) => setRedeemCheck(e.target.checked)}
                      className="w-4 h-4 text-orange-600 rounded border-[#E7E5E0] accent-orange-600"
                    />
                  </label>

                  {redeemCheck && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#57575A]">
                      <span>Points to redeem:</span>
                      <span className="font-bold text-emerald-600">
                        {pointsToRedeem} pts = ₹{pointsToRedeem} Instant Off
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                  Special Care Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={booking.notes}
                  onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                  placeholder="e.g. Please hang formal shirts on wooden hangers..."
                  className="w-full px-4 py-2 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-xs"
                >
                  Confirm Pickup Request (+50 pts)
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
