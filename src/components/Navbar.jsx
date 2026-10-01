import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MapPin, Menu, X, Sparkles, Package } from 'lucide-react';
import { useRewards } from '../context/RewardsContext';

export const Navbar = () => {
  const { points, bookings, setIsRewardsModalOpen, setIsOrdersDrawerOpen } = useRewards();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-sm transition-colors py-1 ${
      isActive
        ? 'text-orange-600 font-semibold border-b-2 border-orange-600'
        : 'text-[#57575A] hover:text-orange-600 font-medium'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `text-base transition-colors py-1 ${
      isActive
        ? 'text-orange-600 font-semibold'
        : 'text-[#57575A] hover:text-orange-600 font-medium'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'nav-blur shadow-xs border-b border-[#E7E5E0]'
          : 'bg-[#FCFBF8] border-b border-[#E7E5E0]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            className="flex items-baseline gap-1 text-[#1C1C1E] group"
          >
            <span className="font-heading text-2xl font-bold tracking-tight">
              Fresh<span className="text-orange-600">Fold</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide text-[#737373] ml-1 uppercase">
              Laundry & Dry Cleaning
            </span>
          </Link>

          {/* Desktop Real React Router NavLinks */}
          <nav className="hidden md:flex items-center gap-9">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/reviews" className={navLinkClass}>
              Reviews
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Side: Orders + Points + Location */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* My Orders Button */}
            {bookings.length > 0 && (
              <button
                onClick={() => setIsOrdersDrawerOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1E] hover:text-orange-600 bg-white hover:bg-[#F4F3F0] px-3 py-1.5 rounded-full border border-[#E7E5E0] transition-colors shadow-2xs group cursor-pointer"
                title="View your laundry orders"
              >
                <Package className="w-3.5 h-3.5 text-[#737373] group-hover:text-orange-600 transition-colors" />
                <span>Orders ({bookings.length})</span>
              </button>
            )}

            {/* FreshPoints Rewards Pill */}
            <button
              onClick={() => setIsRewardsModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1E] hover:text-orange-600 bg-white hover:bg-[#F4F3F0] px-3 py-1.5 rounded-full border border-[#E7E5E0] transition-colors shadow-2xs group cursor-pointer"
              title="Click to view FreshPoints Rewards Club"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600 group-hover:scale-110 transition-transform" />
              <span>{points} pts</span>
            </button>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1E] bg-[#F4F3F0] px-3.5 py-1.5 rounded-full border border-[#E7E5E0]">
              <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>Jagatpura, Jaipur</span>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {bookings.length > 0 && (
              <button
                onClick={() => setIsOrdersDrawerOpen(true)}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#1C1C1E] bg-white px-2 py-1 rounded-full border border-[#E7E5E0]"
              >
                <Package className="w-3 h-3 text-[#737373]" />
                <span>{bookings.length}</span>
              </button>
            )}

            <button
              onClick={() => setIsRewardsModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#1C1C1E] bg-white px-2.5 py-1 rounded-full border border-[#E7E5E0]"
            >
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>{points} pts</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1C1E] hover:text-orange-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCFBF8] border-b border-[#E7E5E0] px-6 py-6 space-y-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#1C1C1E] bg-[#F4F3F0] px-3 py-1.5 rounded-full border border-[#E7E5E0] w-fit mb-2">
            <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>Jagatpura, Jaipur</span>
          </div>

          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Reviews
            </NavLink>
            <NavLink
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};
