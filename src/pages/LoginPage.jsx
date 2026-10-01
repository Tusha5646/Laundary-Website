import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const { login, navigateTo } = useApp();

  const [email, setEmail] = useState('rahul.verma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleDemoFill = () => {
    setEmail('rahul.verma@example.com');
    setPassword('FreshFold@2026');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Illustration & Value Highlights (Desktop) */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-orange-50 via-amber-50/50 to-teal-50/30 border-r border-orange-100/70 relative">
          <div className="z-10">
            <BrandLogo size="default" showTagline={true} />
            <h2 className="text-2xl font-black text-slate-900 font-heading mt-8 mb-2">
              Welcome Back to Effortless Laundry!
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              Login to track your active orders, book quick recurring pickups, and enjoy VIP member discounts.
            </p>
          </div>

          {/* Friendly Illustration */}
          <div className="relative my-6 z-10">
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white">
              <img
                src="/images/iron_care.jpg"
                alt="Professional Laundry Care"
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="absolute -bottom-3 right-4 bg-white/95 px-3 py-1.5 rounded-full shadow-md text-[11px] font-bold text-orange-600 border border-orange-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Steam pressed to perfection</span>
            </div>
          </div>

          <div className="space-y-2 z-10 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Live status alerts at every wash step</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Hassle-free UPI & Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <div className="lg:hidden mb-6 text-center flex flex-col items-center">
            <BrandLogo size="default" />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 font-heading">Sign In</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your credentials or click demo fill to test instantly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => alert('Demo notice: For test mode, you can use any password or click Quick Demo Fill below.')}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500 accent-orange-500"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[11px] font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md"
              >
                Quick Demo Fill ⚡
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Login to Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social login visual representation */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-center text-xs text-slate-400 mb-3">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => login('google.user@gmail.com', 'google123')}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => login('apple.user@icloud.com', 'apple123')}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.6-0.73 1.01-1.75.9-2.77-.87.04-1.92.58-2.54 1.31-.55.63-.99 1.66-.86 2.64.98.08 1.9-.45 2.5-1.18z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>

          {/* Switch to Register */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={() => navigateTo('register')}
              className="font-bold text-orange-600 hover:underline"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
