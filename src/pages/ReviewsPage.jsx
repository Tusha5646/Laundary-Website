import React, { useState } from 'react';
import { Star, Plus, CheckCircle2, X, MapPin, Sparkles, Filter } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';
import { FinalCTA } from '../components/FinalCTA';

export const ReviewsPage = ({ onOpenBooking }) => {
  const { reviews, addReview } = useRewards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === Number(filterRating);
  });

  const averageRating = (
    reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / (reviews.length || 1)
  ).toFixed(1);

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
    <div className="py-12 sm:py-16">
      {/* 1. Reviews Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Feedback</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C1C1E] tracking-tight mb-4">
            Customer Reviews & Experiences
          </h1>

          <p className="text-base sm:text-lg text-[#57575A] leading-relaxed">
            Read authentic feedback from families, busy executives, and professionals living across Jagatpura, Jaipur.
          </p>

          {/* Rating Summary Bar */}
          <div className="mt-8 p-5 bg-white rounded-2xl border border-[#E7E5E0] flex flex-wrap items-center justify-between gap-6 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-extrabold text-[#1C1C1E] font-heading">
                {averageRating}
              </div>
              <div>
                <div className="flex items-center gap-1 text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-orange-500" />
                  ))}
                </div>
                <p className="text-xs text-[#737373] mt-0.5">
                  Based on {reviews.length} verified Jagatpura reviews
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="py-3 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-xs active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review (+25 FreshPoints)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Reviews Filter & List Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E7E5E0]">
          <h2 className="text-xl font-bold text-[#1C1C1E] font-heading">
            All Reviews ({filteredReviews.length})
          </h2>

          {/* Rating Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#737373] font-medium hidden sm:inline">Filter:</span>
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                filterRating === 'all'
                  ? 'bg-[#1C1C1E] text-white'
                  : 'bg-[#F4F3F0] text-[#57575A] hover:bg-[#EBEAE5]'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setFilterRating('5')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1 ${
                filterRating === '5'
                  ? 'bg-orange-600 text-white'
                  : 'bg-[#F4F3F0] text-[#57575A] hover:bg-[#EBEAE5]'
              }`}
            >
              <span>5 Stars</span>
              <Star className="w-3 h-3 fill-current" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl border border-[#E7E5E0] flex flex-col justify-between hover:border-orange-300 transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-orange-500">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-orange-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#737373]">{review.date || 'Recent'}</span>
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
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                    Verified Customer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Small Final CTA */}
      <FinalCTA onOpenBooking={() => onOpenBooking('Wash & Fold')} />

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
                  Your review has been published, and <strong>+25 FreshPoints</strong> have been credited to your rewards balance.
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
    </div>
  );
};
