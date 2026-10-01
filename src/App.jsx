import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RewardsProvider } from './context/RewardsContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Independent React Pages
import { HomePage } from './pages/HomePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';

// Shared Interactive Modals & Drawers
import { BookingModal } from './components/BookingModal';
import { RewardsModal } from './components/RewardsModal';
import { RewardToast } from './components/RewardToast';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { OrdersDrawer } from './components/OrdersDrawer';

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Wash & Fold');

  const handleOpenBooking = (serviceName = 'Wash & Fold') => {
    if (typeof serviceName === 'string') {
      setSelectedService(serviceName);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#1C1C1E] flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* Scroll restoration on route navigation */}
      <ScrollToTop />

      {/* Shared Navigation Header */}
      <Navbar />

      {/* Independent Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/reviews"
            element={<ReviewsPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/services"
            element={<ServicesPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Shared Minimal Footer */}
      <Footer />

      {/* Dynamic Booking Modal with FreshPoints Redemption & Rewards */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
      />

      {/* FreshPoints Rewards Modal */}
      <RewardsModal />

      {/* Customer Orders / Bookings Drawer */}
      <OrdersDrawer />

      {/* Live Order Milestone Tracker Modal */}
      <OrderTrackerModal />

      {/* Dynamic Notification Toast */}
      <RewardToast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RewardsProvider>
        <AppContent />
      </RewardsProvider>
    </BrowserRouter>
  );
}
