import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400" />,
    info: <Info className="w-4 h-4 text-blue-400" />
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-emerald-200',
    error: 'border-rose-500/40 bg-slate-900/95 text-rose-200',
    info: 'border-blue-500/40 bg-slate-900/95 text-blue-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md ${borderColors[type] || borderColors.info}`}>
        {icons[type]}
        <span className="text-xs font-semibold text-white tracking-wide pr-2">
          {message}
        </span>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
