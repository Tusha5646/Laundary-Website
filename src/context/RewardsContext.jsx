import React, { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext(null);

const STORAGE_KEYS = {
  POINTS: 'freshfold_points',
  HISTORY: 'freshfold_points_history',
  REVIEWS: 'freshfold_reviews',
  BOOKINGS: 'freshfold_bookings',
};

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    quote: 'Excellent service and very neat finishing. The whole experience was smooth, and the clothes were crisp and fresh.',
    author: 'Ananya Sharma',
    location: 'Mahal Road, Jagatpura',
    rating: 5,
    date: '2 days ago',
    verified: true,
  },
  {
    id: 'rev-2',
    quote: 'Very professional and reliable laundry service. My formal office shirts are pressed to perfection every single week.',
    author: 'Vikramaditya Rathore',
    location: 'Model Town, Jagatpura',
    rating: 5,
    date: '1 week ago',
    verified: true,
  },
  {
    id: 'rev-3',
    quote: 'My clothes were handled carefully and delivered on time. By far the most dependable and hygienic laundry service in Jaipur.',
    author: 'Dr. Meenakshi Joshi',
    location: 'Jagatpura, Jaipur',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: 'rev-4',
    quote: 'Their dry cleaning for blazers and silks is unmatched. Prompt doorstep pickup right on Mahal Road.',
    author: 'Harsh Vardhan Singh',
    location: 'Near Akshaya Patra, Jagatpura',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
  },
];

const DEFAULT_HISTORY = [
  {
    id: 'h-1',
    amount: 100,
    type: 'earned',
    reason: 'Welcome Bonus for joining FreshFold Jagatpura',
    date: 'Initial Balance',
  },
  {
    id: 'h-2',
    amount: 50,
    type: 'earned',
    reason: 'Completed pickup order #LAU-1082',
    date: 'Yesterday',
  },
];

const DEFAULT_BOOKINGS = [
  {
    id: 'LAU-1082',
    name: 'Vikramaditya Rathore',
    phone: '+91 98290 88219',
    service: 'Wash & Iron',
    date: 'Today',
    timeSlot: 'Morning (08:00 AM – 11:00 AM)',
    address: 'Flat 302, Royal Palms, Mahal Road, Jagatpura, Jaipur',
    notes: 'Please hang formal shirts on wooden hangers.',
    discount: 0,
    status: 'In Wash', // 'Scheduled' | 'Picked Up' | 'In Wash' | 'Steam Pressing' | 'Delivered'
    createdAt: 'Today, 08:30 AM',
    timeline: [
      { label: 'Booking Confirmed', time: '08:30 AM', done: true },
      { label: 'Valet Picked Up', time: '09:45 AM', done: true },
      { label: 'In Wash & Sanitize', time: 'In Progress', active: true, done: false },
      { label: 'Steam Pressing', time: 'Estimated 02:00 PM', done: false },
      { label: 'Delivered to Doorstep', time: 'Estimated 05:00 PM', done: false },
    ],
  },
];

export const RewardsProvider = ({ children }) => {
  // Points Balance
  const [points, setPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POINTS);
      return saved !== null ? Number(saved) : 150;
    } catch {
      return 150;
    }
  });

  // Points Transaction History
  const [pointsHistory, setPointsHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : DEFAULT_HISTORY;
    } catch {
      return DEFAULT_HISTORY;
    }
  });

  // Dynamic Reviews List
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  // Bookings List
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  });

  // Modals & Panels
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isOrdersDrawerOpen, setIsOrdersDrawerOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(() => DEFAULT_BOOKINGS[0]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POINTS, String(points));
    } catch (e) {
      console.error(e);
    }
  }, [points]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(pointsHistory));
    } catch (e) {
      console.error(e);
    }
  }, [pointsHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Add Points
  const addPoints = (amount, reason) => {
    setPoints((prev) => prev + amount);
    const newEntry = {
      id: `h-${Date.now()}`,
      amount,
      type: 'earned',
      reason,
      date: 'Just now',
    };
    setPointsHistory((prev) => [newEntry, ...prev]);
    showToast(`+${amount} FreshPoints earned! ${reason}`);
  };

  // Redeem Points
  const redeemPoints = (amount, reason) => {
    if (points < amount) return false;
    setPoints((prev) => prev - amount);
    const newEntry = {
      id: `h-${Date.now()}`,
      amount,
      type: 'redeemed',
      reason: reason || `Redeemed for ₹${amount} discount on booking`,
      date: 'Just now',
    };
    setPointsHistory((prev) => [newEntry, ...prev]);
    showToast(`Redeemed ${amount} FreshPoints! Saved ₹${amount}`);
    return true;
  };

  // Add User Review
  const addReview = (reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      quote: reviewData.quote.trim(),
      author: reviewData.author.trim() || 'Jagatpura Resident',
      location: reviewData.location.trim() || 'Jagatpura, Jaipur',
      rating: Number(reviewData.rating) || 5,
      date: 'Just now',
      verified: true,
    };

    setReviews((prev) => [newReview, ...prev]);
    // Reward customer with 25 points for submitting a verified review!
    addPoints(25, 'Reward for publishing a verified customer review');
    return newReview;
  };

  // Create Booking
  const createBooking = (bookingData, pointsToRedeem = 0) => {
    let finalDiscount = 0;
    if (pointsToRedeem > 0 && points >= pointsToRedeem) {
      redeemPoints(pointsToRedeem, `Redeemed ₹${pointsToRedeem} discount on booking`);
      finalDiscount = pointsToRedeem;
    }

    const bookingId = `LAU-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: bookingId,
      ...bookingData,
      discount: finalDiscount,
      status: 'Scheduled',
      createdAt: 'Just now',
      timeline: [
        { label: 'Booking Confirmed', time: 'Just now', done: true, active: true },
        { label: 'Valet Pickup', time: `${bookingData.date} (${bookingData.timeSlot.split(' ')[0]})`, done: false },
        { label: 'In Wash & Sanitize', time: 'Pending', done: false },
        { label: 'Steam Pressing', time: 'Pending', done: false },
        { label: 'Delivered to Doorstep', time: 'Next Day', done: false },
      ],
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveTrackingOrder(newBooking);
    // Award 50 loyalty points per laundry booking
    addPoints(50, `Completed booking #${bookingId}`);
    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    showToast(`Order #${bookingId} has been cancelled.`);
  };

  // Order Tracking Lookup
  const trackOrder = (query) => {
    const clean = query.trim().toUpperCase().replace('#', '');
    const found = bookings.find(
      (b) => b.id.toUpperCase() === clean || (b.phone && b.phone.includes(clean))
    );
    if (found) {
      setActiveTrackingOrder(found);
      setIsTrackerModalOpen(true);
      return true;
    }
    return false;
  };

  return (
    <RewardsContext.Provider
      value={{
        points,
        pointsHistory,
        addPoints,
        redeemPoints,
        reviews,
        addReview,
        bookings,
        createBooking,
        cancelBooking,
        isRewardsModalOpen,
        setIsRewardsModalOpen,
        isOrdersDrawerOpen,
        setIsOrdersDrawerOpen,
        isTrackerModalOpen,
        setIsTrackerModalOpen,
        activeTrackingOrder,
        setActiveTrackingOrder,
        trackOrder,
        toast,
        showToast,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};
