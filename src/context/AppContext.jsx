import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SERVICES,
  INITIAL_CLOTHES,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CUSTOMERS,
} from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  USER: 'freshfold_user',
  ORDERS: 'freshfold_orders',
  SERVICES: 'freshfold_services',
  CLOTHES: 'freshfold_clothes',
  COUPONS: 'freshfold_coupons',
  NOTIFICATIONS: 'freshfold_notifications',
  CUSTOMERS: 'freshfold_customers',
  CART: 'freshfold_cart',
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Error reading localStorage for key:', key, e);
    return fallback;
  }
};

const saveStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing localStorage for key:', key, e);
  }
};

export const AppProvider = ({ children }) => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState(() => {
    // Start on 'home' by default, or 'splash' if first visit
    const hasVisited = localStorage.getItem('freshfold_has_visited');
    return hasVisited ? 'home' : 'splash';
  });
  
  const [deviceMode, setDeviceMode] = useState('responsive'); // 'responsive' | 'mobile-frame'

  // User State
  const [user, setUser] = useState(() =>
    getStored(STORAGE_KEYS.USER, {
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 98765 43210',
      address: 'Flat 402, Sunshine Heights, Hill Road, Bandra West, Mumbai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isLoggedIn: true,
    })
  );

  // Core Data States
  const [orders, setOrders] = useState(() => getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
  const [activeOrderId, setActiveOrderId] = useState(() => {
    const stored = getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    return stored[0]?.id || 'LAU10245';
  });

  const [services, setServices] = useState(() => getStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES));
  const [clothes, setClothes] = useState(() => getStored(STORAGE_KEYS.CLOTHES, INITIAL_CLOTHES));
  const [coupons, setCoupons] = useState(() => getStored(STORAGE_KEYS.COUPONS, INITIAL_COUPONS));
  const [notifications, setNotifications] = useState(() => getStored(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS));
  const [customers, setCustomers] = useState(() => getStored(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS));

  // Cart & Booking
  const [cartItems, setCartItems] = useState(() =>
    getStored(STORAGE_KEYS.CART, [
      { id: 'm-1', name: 'T-Shirt', category: "Men's", price: 50, quantity: 2, service: 'Wash & Fold' },
      { id: 'm-2', name: 'Shirt', category: "Men's", price: 60, quantity: 1, service: 'Wash & Iron' },
      { id: 'w-2', name: 'Kurti', category: "Women's", price: 80, quantity: 1, service: 'Wash & Iron' },
    ])
  );

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    pickupDate: 'Tomorrow, Oct 2',
    pickupTime: '10:00 AM - 12:00 PM',
    deliveryDate: 'Saturday, Oct 3',
    deliveryTime: '04:00 PM - 06:00 PM',
    addressType: 'Home',
    addressLine: 'Flat 402, Sunshine Heights, Hill Road',
    landmark: 'Near Mehboob Studio',
    area: 'Bandra West, Mumbai',
    pincode: '400050',
    notes: 'Please buzz flat 402 or call before arrival.',
    paymentMethod: 'UPI',
    upiId: 'rahul@oksbi',
  });

  // Toast System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync to local storage
  useEffect(() => saveStored(STORAGE_KEYS.USER, user), [user]);
  useEffect(() => saveStored(STORAGE_KEYS.ORDERS, orders), [orders]);
  useEffect(() => saveStored(STORAGE_KEYS.SERVICES, services), [services]);
  useEffect(() => saveStored(STORAGE_KEYS.CLOTHES, clothes), [clothes]);
  useEffect(() => saveStored(STORAGE_KEYS.COUPONS, coupons), [coupons]);
  useEffect(() => saveStored(STORAGE_KEYS.NOTIFICATIONS, notifications), [notifications]);
  useEffect(() => saveStored(STORAGE_KEYS.CUSTOMERS, customers), [customers]);
  useEffect(() => saveStored(STORAGE_KEYS.CART, cartItems), [cartItems]);

  const navigateTo = (view, extra = {}) => {
    if (view === 'track' && extra.orderId) {
      setActiveOrderId(extra.orderId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Authentication Handlers
  const login = (email, password) => {
    const updated = {
      ...user,
      email: email || 'rahul.verma@example.com',
      isLoggedIn: true,
    };
    setUser(updated);
    showToast(`Welcome back, ${updated.name}!`);
    navigateTo('home');
  };

  const register = (userData) => {
    const updated = {
      name: userData.fullName || 'New Member',
      email: userData.email,
      phone: userData.phone || '+91 98765 00000',
      address: userData.address || 'Bandra West, Mumbai',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      isLoggedIn: true,
    };
    setUser(updated);
    // Also record in admin customers
    const newCust = {
      id: `c-${Date.now()}`,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      location: updated.address,
      orderCount: 0,
      totalSpent: 0,
      joinedDate: 'Just now',
      status: 'Active',
    };
    setCustomers([newCust, ...customers]);
    showToast('Account created successfully! Welcome to FreshFold.');
    navigateTo('home');
  };

  const logout = () => {
    setUser({ ...user, isLoggedIn: false });
    showToast('Logged out successfully.', 'info');
    navigateTo('login');
  };

  // Cart Operations
  const addItemToCart = (item, serviceName = null) => {
    const targetService = serviceName || item.service || 'Wash & Fold';
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.id === item.id && ci.service === targetService
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          quantity: 1,
          service: targetService,
          icon: item.icon,
        },
      ];
    });
    showToast(`Added ${item.name} (${targetService}) to bag`);
  };

  const removeItemFromCart = (itemId, serviceName) => {
    setCartItems((prev) => prev.filter((ci) => !(ci.id === itemId && ci.service === serviceName)));
  };

  const updateCartQty = (itemId, serviceName, delta) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.id === itemId && ci.service === serviceName) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => setCartItems([]);

  // Calculations
  const cartSubtotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= (appliedCoupon.minOrder || 0)) {
    discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
      discountAmount = appliedCoupon.maxDiscount;
    }
  }

  const taxAmount = Math.round((cartSubtotal - discountAmount) * 0.05); // 5% GST
  const pickupFee = cartSubtotal >= 300 || cartSubtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + taxAmount + (cartSubtotal > 0 ? pickupFee : 0));

  // Coupon handling
  const applyCoupon = (code) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
    if (!found) {
      showToast('Invalid or expired coupon code', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Minimum order of ₹${found.minOrder} required for ${found.code}`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! You save ₹${Math.round((cartSubtotal * found.discountPercent) / 100)}`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Order Placement
  const placeOrder = (paymentDetails) => {
    const orderNumber = `LAU${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderNumber,
      customer: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      items: [...cartItems],
      service: cartItems[0]?.service || 'Mixed Laundry',
      subtotal: cartSubtotal,
      discount: discountAmount,
      tax: taxAmount,
      pickupFee: pickupFee,
      total: grandTotal,
      status: 'Confirmed',
      pickupDate: bookingDetails.pickupDate,
      pickupTime: bookingDetails.pickupTime,
      deliveryDate: bookingDetails.deliveryDate,
      deliveryTime: bookingDetails.deliveryTime,
      address: {
        tag: bookingDetails.addressType,
        line: bookingDetails.addressLine,
        area: bookingDetails.area,
        landmark: bookingDetails.landmark,
        pincode: bookingDetails.pincode,
      },
      paymentMethod: paymentDetails?.method || bookingDetails.paymentMethod,
      paymentStatus: paymentDetails?.method === 'Cash on Delivery' ? 'Pending on Delivery' : 'Paid Online',
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      driver: {
        name: 'Aakash Verma',
        phone: '+91 98205 11982',
        rating: 4.95,
        vehicle: 'FreshFold Eco Van #MH-02-EV-4091',
      },
      qrCode: `FRESHFOLD-${orderNumber}-BAG-${Math.floor(100 + Math.random() * 900)}`,
      timeline: [
        { status: 'Confirmed', label: 'Order Confirmed', time: 'Just now', done: true, active: true, desc: 'Your laundry request has been verified and valet assigned.' },
        { status: 'Pickup Scheduled', label: 'Pickup Scheduled', time: `${bookingDetails.pickupDate} (${bookingDetails.pickupTime})`, done: false, desc: 'Our valet will arrive with sanitized eco laundry bags.' },
        { status: 'Picked Up', label: 'Clothes Picked Up', time: 'Pending pickup', done: false, desc: 'Clothes tagged with QR seals and weighed.' },
        { status: 'Washing', label: 'Washing & Care', time: 'Pending', done: false, desc: 'Eco bio-wash, softness conditioning, and drying.' },
        { status: 'Quality Check', label: 'Quality Check', time: 'Pending', done: false, desc: 'Double inspection for crisp collars and clean cuffs.' },
        { status: 'Out for Delivery', label: 'Out for Delivery', time: 'Pending', done: false, desc: 'En route in weather-proof garment bags.' },
        { status: 'Delivered', label: 'Delivered', time: `${bookingDetails.deliveryDate}`, done: false, desc: 'Delivered to your doorstep ready to wear.' },
      ],
    };

    setOrders([newOrder, ...orders]);
    setActiveOrderId(orderNumber);

    // Add notification
    const newNotif = {
      id: `n-${Date.now()}`,
      title: `Order #${orderNumber} Confirmed!`,
      desc: `Pickup scheduled for ${bookingDetails.pickupDate} (${bookingDetails.pickupTime}).`,
      time: 'Just now',
      type: 'confirmed',
      read: false,
      orderId: orderNumber,
    };
    setNotifications([newNotif, ...notifications]);

    // Update customer spend in admin
    setCustomers((prev) =>
      prev.map((c) =>
        c.email === user.email
          ? { ...c, orderCount: c.orderCount + 1, totalSpent: c.totalSpent + grandTotal }
          : c
      )
    );

    // Clear cart and applied coupon
    clearCart();
    setAppliedCoupon(null);

    navigateTo('confirmation');
    return newOrder;
  };

  // Reorder past order
  const reorder = (order) => {
    if (!order || !order.items) return;
    setCartItems([...order.items]);
    showToast(`Loaded ${order.items.length} items from Order #${order.id} into bag!`);
    navigateTo('cart');
  };

  // Update order status (Admin / simulation)
  const updateOrderStatus = (orderId, newStatus) => {
    const statusOrder = [
      'Confirmed',
      'Pickup Scheduled',
      'Picked Up',
      'Washing',
      'Quality Check',
      'Out for Delivery',
      'Delivered',
    ];

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;

        const targetIndex = statusOrder.indexOf(newStatus);

        const updatedTimeline = o.timeline.map((step) => {
          const stepIndex = statusOrder.indexOf(step.status);
          if (newStatus === 'Cancelled') {
            return { ...step, done: false, active: false };
          }
          if (stepIndex !== -1 && targetIndex !== -1) {
            return {
              ...step,
              done: stepIndex <= targetIndex,
              active: stepIndex === targetIndex,
              time: stepIndex <= targetIndex && step.time.includes('Pending') ? 'Completed' : step.time,
            };
          }
          return step;
        });

        // Add cancelled step if cancelling
        if (newStatus === 'Cancelled') {
          return {
            ...o,
            status: 'Cancelled',
            timeline: [
              ...updatedTimeline,
              { status: 'Cancelled', label: 'Order Cancelled', time: 'Just now', done: true, active: true, desc: 'Order was cancelled by support or user.' },
            ],
          };
        }

        return {
          ...o,
          status: newStatus,
          timeline: updatedTimeline,
        };
      })
    );

    // Also push a live notification to user!
    const notifMessages = {
      'Picked Up': 'Your laundry has been picked up.',
      'Washing': 'Your clothes are currently being washed.',
      'Quality Check': 'Your garments are undergoing final quality check.',
      'Out for Delivery': 'Your laundry will arrive today. Out for delivery!',
      'Delivered': 'Your order has been safely delivered. Thank you!',
      'Cancelled': 'Your order has been cancelled.',
    };

    if (notifMessages[newStatus]) {
      const liveNotif = {
        id: `n-${Date.now()}`,
        title: notifMessages[newStatus],
        desc: `Order #${orderId} status changed to ${newStatus}.`,
        time: 'Just now',
        type: newStatus.toLowerCase().replace(/\s+/g, '-'),
        read: false,
        orderId: orderId,
      };
      setNotifications((prev) => [liveNotif, ...prev]);
    }

    showToast(`Order #${orderId} status updated to: ${newStatus}`);
  };

  // Active Order
  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared', 'info');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Admin Services & Coupons Management
  const addService = (newService) => {
    setServices((prev) => [...prev, { ...newService, id: `srv-${Date.now()}`, active: true }]);
    showToast(`Service "${newService.name}" added successfully`);
  };

  const updateService = (id, fields) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...fields } : s)));
    showToast('Service updated');
  };

  const toggleServiceActive = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const addCoupon = (newCoupon) => {
    setCoupons((prev) => [
      { ...newCoupon, code: newCoupon.code.toUpperCase(), active: true },
      ...prev,
    ]);
    showToast(`Coupon ${newCoupon.code.toUpperCase()} created!`);
  };

  const toggleCouponActive = (code) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        deviceMode,
        setDeviceMode,
        user,
        login,
        register,
        logout,
        // Cart
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateCartQty,
        clearCart,
        cartSubtotal,
        totalCartCount,
        discountAmount,
        taxAmount,
        pickupFee,
        grandTotal,
        // Coupons
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        coupons,
        addCoupon,
        toggleCouponActive,
        // Booking
        bookingDetails,
        setBookingDetails,
        placeOrder,
        // Orders
        orders,
        activeOrderId,
        setActiveOrderId,
        activeOrder,
        updateOrderStatus,
        reorder,
        // Catalog
        services,
        clothes,
        addService,
        updateService,
        toggleServiceActive,
        // Notifications
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        // Customers
        customers,
        // Toast
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
