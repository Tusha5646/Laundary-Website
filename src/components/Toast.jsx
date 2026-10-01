import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-teal-500 shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-white border-emerald-200 text-slate-800 shadow-emerald-500/10',
    error: 'bg-white border-rose-200 text-slate-800 shadow-rose-500/10',
    info: 'bg-white border-teal-200 text-slate-800 shadow-teal-500/10',
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md animate-in slide-in-from-top-4 fade-in duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-xl ${
          bgStyles[toast.type] || bgStyles.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium pr-2">{toast.message}</p>
      </div>
    </div>
  );
};
