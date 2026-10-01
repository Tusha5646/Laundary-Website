import React, { useState } from 'react';
import {
  ShieldAlert,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Tag,
  Plus,
  Edit2,
  Trash2,
  QrCode,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Printer,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRModal } from '../components/QRModal';

export const AdminDashboard = () => {
  const {
    orders,
    updateOrderStatus,
    services,
    addService,
    updateService,
    toggleServiceActive,
    customers,
    coupons,
    addCoupon,
    toggleCouponActive,
    navigateTo,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'services' | 'customers' | 'coupons'
  const [selectedQRModalOrder, setSelectedQRModalOrder] = useState(null);

  // New Service modal state
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceData, setNewServiceData] = useState({
    name: '',
    tagline: '',
    startPrice: 80,
    deliveryTime: '24 Hours',
    icon: 'Waves',
    badge: 'New',
    color: 'from-orange-500 to-amber-500',
  });

  // New Coupon modal state
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newCouponData, setNewCouponData] = useState({
    code: '',
    discountPercent: 15,
    minOrder: 299,
    description: '',
    expiryDate: '2026-12-31',
  });

  // Calculate Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) =>
    ['Confirmed', 'Pickup Scheduled'].includes(o.status)
  ).length;
  const processingOrders = orders.filter((o) =>
    ['Picked Up', 'Washing', 'Quality Check', 'Out for Delivery'].includes(o.status)
  ).length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const statuses = [
    'Confirmed',
    'Pickup Scheduled',
    'Picked Up',
    'Washing',
    'Quality Check',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceData.name) return;
    addService(newServiceData);
    setShowAddServiceModal(false);
    setNewServiceData({
      name: '',
      tagline: '',
      startPrice: 80,
      deliveryTime: '24 Hours',
      icon: 'Waves',
      badge: 'New',
      color: 'from-orange-500 to-amber-500',
    });
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCouponData.code) return;
    addCoupon(newCouponData);
    setShowAddCouponModal(false);
    setNewCouponData({
      code: '',
      discountPercent: 15,
      minOrder: 299,
      description: '',
      expiryDate: '2026-12-31',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-white shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black font-heading tracking-tight">
                  FreshFold Operations Admin
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Laundry Facility Hub • Mumbai Central Operations
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="self-start sm:self-auto py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-orange-400" />
            <span>Return to Customer View</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-2xl font-black text-slate-900 font-heading">{totalOrders}</p>
            <span className="text-[10px] text-teal-600 font-bold">All time orders</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Pending Pickup</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-600 font-heading">{pendingOrders}</p>
            <span className="text-[10px] text-slate-400 font-medium">Awaiting driver</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>In Processing</span>
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-black text-orange-600 font-heading">{processingOrders}</p>
            <span className="text-[10px] text-orange-600 font-bold">Washing / QC</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>Delivered</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-600 font-heading">{deliveredOrders}</p>
            <span className="text-[10px] text-emerald-600 font-bold">Completed</span>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 border border-slate-700 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl font-black font-heading text-orange-400">₹{totalRevenue}</p>
            <span className="text-[10px] text-slate-400">Net order value</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2">
          {[
            { id: 'orders', label: 'Order Management', count: totalOrders },
            { id: 'services', label: 'Services & Pricing', count: services.length },
            { id: 'customers', label: 'Customer CRM', count: customers.length },
            { id: 'coupons', label: 'Promo Coupons', count: coupons.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* TAB 1: ORDER MANAGEMENT TABLE */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Active Orders Queue</h3>
                <p className="text-xs text-slate-500">
                  Changing order status updates the customer's live tracking and sends milestone notifications immediately.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Current Status (Dropdown)</th>
                    <th className="py-3 px-4">Pickup Date</th>
                    <th className="py-3 px-4">Delivery Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => {
                    const totalPieces = (o.items || []).reduce((a, c) => a + c.quantity, 0);

                    return (
                      <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                          #{o.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-800">{o.customer?.name}</p>
                          <p className="text-[11px] text-slate-400">{o.customer?.phone}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-700">
                            {totalPieces} pcs
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate max-w-[120px]">
                            {o.service}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900">
                          ₹{o.total}
                        </td>
                        <td className="py-3.5 px-4">
                          {/* Live Interactive Status Dropdown */}
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            className="bg-white border border-slate-300 font-bold rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
                          >
                            {statuses.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {o.pickupDate}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {o.deliveryDate}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedQRModalOrder(o)}
                              className="p-1.5 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100"
                              title="Print QR Tag"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => navigateTo('track', { orderId: o.id })}
                              className="py-1 px-2.5 rounded-lg bg-slate-900 hover:bg-orange-500 text-white font-bold text-[11px] transition-colors"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & PRICING MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Services Catalog</h3>
                <p className="text-xs text-slate-500">
                  Update starting prices, turnaround duration, or add new laundry treatments
                </p>
              </div>

              <button
                onClick={() => setShowAddServiceModal(true)}
                className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-slate-900 text-base">{svc.name}</span>
                      <button
                        onClick={() => toggleServiceActive(svc.id)}
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          svc.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {svc.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">{svc.tagline}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Base Price:</span>
                      <input
                        type="number"
                        value={svc.startPrice}
                        onChange={(e) =>
                          updateService(svc.id, { startPrice: Number(e.target.value) })
                        }
                        className="w-16 px-2 py-0.5 font-bold text-slate-900 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Delivery:</span>
                      <span className="font-bold text-xs text-teal-600">
                        {svc.deliveryTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER CRM */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Customer Database</h3>
              <p className="text-xs text-slate-500">
                Track customer lifetime value, order frequency, and addresses
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Total Orders</th>
                    <th className="py-3 px-4">Total Spend</th>
                    <th className="py-3 px-4">Tier Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{c.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{c.email}</td>
                      <td className="py-3.5 px-4 text-slate-600">{c.phone}</td>
                      <td className="py-3.5 px-4 text-slate-500 truncate max-w-[150px]">
                        {c.location}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {c.orderCount} orders
                      </td>
                      <td className="py-3.5 px-4 font-black text-emerald-600">
                        ₹{c.totalSpent}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            c.status === 'VIP'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS MANAGEMENT */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Promo Discount Coupons</h3>
                <p className="text-xs text-slate-500">
                  Create marketing vouchers, toggle discounts, and set minimum thresholds
                </p>
              </div>

              <button
                onClick={() => setShowAddCouponModal(true)}
                className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((cp) => (
                <div
                  key={cp.code}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono font-black text-slate-900 text-base bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-lg">
                        {cp.code}
                      </span>
                      <button
                        onClick={() => toggleCouponActive(cp.code)}
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          cp.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {cp.active ? 'Active' : 'Inactive'}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 font-medium mb-1">
                      {cp.discountPercent}% Discount
                    </p>
                    <p className="text-[11px] text-slate-400 mb-4">{cp.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Min Order: ₹{cp.minOrder}</span>
                    <span>Expires: {cp.expiryDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-100">
            <h3 className="font-bold text-slate-900 text-base mb-4">Add Laundry Service</h3>
            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={newServiceData.name}
                  onChange={(e) =>
                    setNewServiceData({ ...newServiceData, name: e.target.value })
                  }
                  placeholder="e.g. Leather Jacket Spa"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={newServiceData.tagline}
                  onChange={(e) =>
                    setNewServiceData({ ...newServiceData, tagline: e.target.value })
                  }
                  placeholder="e.g. Deep nourishment and polish"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={newServiceData.startPrice}
                    onChange={(e) =>
                      setNewServiceData({
                        ...newServiceData,
                        startPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Delivery Time</label>
                  <input
                    type="text"
                    value={newServiceData.deliveryTime}
                    onChange={(e) =>
                      setNewServiceData({
                        ...newServiceData,
                        deliveryTime: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="flex-1 py-2 rounded-xl border text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-orange-500 text-white font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-100">
            <h3 className="font-bold text-slate-900 text-base mb-4">Create Promo Coupon</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCouponData.code}
                  onChange={(e) =>
                    setNewCouponData({
                      ...newCouponData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="e.g. MONSOON25"
                  className="w-full px-3 py-2 border rounded-xl font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCouponData.discountPercent}
                    onChange={(e) =>
                      setNewCouponData({
                        ...newCouponData,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={newCouponData.minOrder}
                    onChange={(e) =>
                      setNewCouponData({
                        ...newCouponData,
                        minOrder: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  value={newCouponData.description}
                  onChange={(e) =>
                    setNewCouponData({
                      ...newCouponData,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g. Special festive 25% off"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="flex-1 py-2 rounded-xl border text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-orange-500 text-white font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {selectedQRModalOrder && (
        <QRModal
          order={selectedQRModalOrder}
          isOpen={Boolean(selectedQRModalOrder)}
          onClose={() => setSelectedQRModalOrder(null)}
        />
      )}
    </div>
  );
};
