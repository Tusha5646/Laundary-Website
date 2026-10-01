import React, { useState } from 'react';
import { Star, Plus, CheckCircle2, X } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const Reviews = () => {
  const { reviews, addReview } = useRewards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quote.trim()) return;

    addReview({
      rating,
      author: author.trim() || 'Jagatpura Resident',
      location: location.trim() || 'Jagatpura, Jaipur',
      quote: quote.trim(),
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setAuthor('');
      setLocation('');
      setQuote('');
      setRating(5);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 block mb-2">
              Reviews & Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-sm text-[#57575A] mt-2">
              Genuine experiences from residents and working professionals across Jagatpura, Jaipur.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="py-3 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-all flex items-center gap-2 self-start sm:self-auto shadow-xs active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review (+25 pts)</span>
          </button>
        </div>

        {/* Dynamic Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl border border-[#E7E5E0] flex flex-col justify-between hover:border-orange-300 transition-colors duration-200"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-orange-500 mb-6">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-orange-500" />
                  ))}
                </div>

                <p className="text-[#1C1C1E] text-base leading-relaxed font-normal mb-8">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[#1C1C1E] font-heading">
                    — {review.author}
                  </p>
                  <p className="text-xs text-[#737373] mt-0.5">
                    {review.location}
                  </p>
                </div>
                {review.verified && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                    Verified Customer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1C1C1E]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#FCFBF8] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E7E5E0] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#737373] hover:text-[#1C1C1E] hover:bg-[#F4F3F0] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-orange-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#1C1C1E] font-heading">
                  Thank You for Your Review!
                </h3>
                <p className="text-sm text-[#57575A]">
                  Your review has been published, and <strong>+25 FreshPoints</strong> have been credited to your rewards account.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider block mb-1">
                    Customer Experience
                  </span>
                  <h3 className="text-2xl font-bold text-[#1C1C1E] font-heading">
                    Share Your Feedback
                  </h3>
                  <p className="text-xs text-[#737373] mt-1">
                    Help fellow Jagatpura residents and earn <strong>+25 FreshPoints</strong>.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  {/* Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1E] mb-2 uppercase tracking-wide">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              (hoverRating || rating) >= star
                                ? 'text-orange-500 fill-current'
                                : 'text-[#D8D6D0]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#1C1C1E] ml-2">
                        {rating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Priya Agarwal"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                      Area / Society in Jagatpura
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Model Town, Jagatpura"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1C1E] mb-1.5 uppercase tracking-wide">
                      Your Review *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="How was the washing quality, steam pressing, and delivery punctuality?"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E7E5E0] bg-white text-sm focus:outline-none focus:border-orange-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-xs active:scale-98"
                  >
                    Submit Review (+25 Points)
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
