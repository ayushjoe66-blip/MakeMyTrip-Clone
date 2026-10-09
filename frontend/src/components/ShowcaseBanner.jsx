import React, { useState } from 'react';
import { 
  Sparkles, 
  Share2, 
  Check, 
  ChevronUp, 
  ChevronDown, 
  Layers, 
  Zap, 
  ExternalLink,
  Code2
} from 'lucide-react';

export default function ShowcaseBanner({ onQuickFlightDemo, onQuickHotelDemo, onOpenBookings }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside aria-label="Company Presentation Bar" className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/60 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Bar */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left: Badge & Description */}
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Company Demo Mode
            </span>
            <span className="text-slate-300 hidden md:inline font-medium">
              Enterprise Full-Stack Travel Booking Engine
            </span>
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 border-l border-slate-800 pl-3">
              <span className="bg-slate-800 text-cyan-400 px-1.5 py-0.2 rounded font-mono font-bold">React 19</span>
              <span className="bg-slate-800 text-indigo-300 px-1.5 py-0.2 rounded font-mono font-bold">Tailwind v4</span>
              <span className="bg-slate-800 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-bold">Express API</span>
            </div>
          </div>

          {/* Right: Quick actions for recruiters/reviewers */}
          <div className="flex items-center gap-2">
            {!isMinimized && (
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={onQuickFlightDemo}
                  className="bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white px-2.5 py-1 rounded-lg border border-blue-500/40 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                  title="Load Delhi to Mumbai Flights"
                >
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Test Flight Flow</span>
                </button>

                <button
                  onClick={onQuickHotelDemo}
                  className="bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-white px-2.5 py-1 rounded-lg border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                  title="Load Luxury Goa Stays"
                >
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Test Hotel Flow</span>
                </button>
              </div>
            )}

            <button
              onClick={handleCopyLink}
              className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer border border-white/10"
              title="Copy link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Share Demo'}</span>
            </button>

            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              title={isMinimized ? 'Expand bar' : 'Minimize bar'}
            >
              {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
}
