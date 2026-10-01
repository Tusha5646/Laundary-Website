import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Tag,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Edit2,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage = () => {
  const { user, login, logout, navigateTo, coupons, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const [activeSection, setActiveSection] = useState('menu'); // 'menu' | 'addresses' | 'coupons' | 'settings'

  const handleSaveProfile = (e) => {
    e.preventDefault();
    login(formData.email, 'password');
    setIsEditing(false);
    showToast('Profile details updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-orange-500/20 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900 font-heading">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-100 text-orange-700">
                  Gold Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.email}</span>
              </p>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.phone}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="py-2.5 px-4 rounded-xl border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>

      {/* Profile Menu Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            icon: Sparkles,
            title: 'My Orders',
            desc: 'View active wash orders & receipts',
            action: () => navigateTo('my-orders'),
            badge: null,
          },
          {
            icon: MapPin,
            title: 'Saved Addresses',
            desc: 'Flat 402, Sunshine Heights, Hill Road, Bandra',
            action: () => {
              showToast('Default pickup address selected.');
            },
            badge: '1 Saved',
          },
          {
            icon: Tag,
            title: 'Offers & Coupons',
            desc: `${coupons.filter((c) => c.active).length} promo coupons ready to use`,
            action: () => {
              showToast('Active coupon WELCOME10 available for your next order');
            },
            badge: '10% OFF',
          },
          {
            icon: Bell,
            title: 'Notifications & Alerts',
            desc: 'Live SMS & app laundry milestones',
            action: () => navigateTo('notifications'),
            badge: null,
          },
          {
            icon: CreditCard,
            title: 'Payment Methods',
            desc: 'UPI & saved payment preference',
            action: () => {
              showToast('UPI rahul@oksbi configured as primary payment');
            },
            badge: 'Verified',
          },
          {
            icon: HelpCircle,
            title: 'Help & Customer Care',
            desc: 'FAQs, chat support, and laundry guarantee',
            action: () => {
              showToast('Support hotline: +91 98200 12345');
            },
            badge: null,
          },
          {
            icon: Settings,
            title: 'Washing Preferences',
            desc: 'Organic detergent, Lavender mist fragrance',
            action: () => {
              showToast('Wash preference: Soft bio-wash with hypoallergenic rinse');
            },
            badge: 'Eco Care',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-orange-200 shadow-xs hover:shadow-md transition-all flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 max-w-[200px] truncate">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-[10px] font-extrabold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}

        {/* Logout Option */}
        <button
          onClick={logout}
          className="bg-rose-50/60 rounded-3xl p-5 border border-rose-200/80 hover:bg-rose-100/60 transition-all flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-rose-700 text-sm">Logout</h4>
              <p className="text-xs text-rose-500 mt-0.5">
                Sign out of this session
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
