import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#FCFBF8] border-t border-[#E7E5E0] py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#E7E5E0]">
          {/* Brand Logo */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link to="/" className="font-heading text-2xl font-bold tracking-tight text-[#1C1C1E]">
              Fresh<span className="text-orange-600">Fold</span>
            </Link>
            <span className="text-xs text-[#737373]">
              Premium Laundry & Dry Cleaning Services
            </span>
          </div>

          {/* Real React Router Links: Home, Reviews, Services, Contact */}
          <nav className="flex items-center gap-8 text-sm font-medium text-[#57575A]">
            <Link to="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link to="/reviews" className="hover:text-orange-600 transition-colors">
              Reviews
            </Link>
            <Link to="/services" className="hover:text-orange-600 transition-colors">
              Services
            </Link>
            <Link to="/contact" className="hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1E]">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>Jagatpura, Jaipur</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center md:text-left text-xs text-[#737373] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FreshFold Laundry & Dry Cleaners. All rights reserved.</p>
          <p>Model Town / Mahal Road, Jagatpura, Jaipur, Rajasthan</p>
        </div>
      </div>
    </footer>
  );
};
