import React, { useState } from 'react';
import { 
  Plane, 
  Briefcase, 
  User, 
  ChevronDown, 
  Sparkles, 
  Ticket, 
  PhoneCall, 
  Globe2, 
  Menu, 
  X,
  CreditCard
} from 'lucide-react';

export default function Navbar({ onOpenBookings, bookingsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [showUserModal, setShowUserModal] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('mmt_username') || 'Ajeet');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('mmt_username', userName);
    setShowUserModal(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">
            MMT BLACK
          </span>
          <span className="hidden sm:inline text-slate-300">
            Exclusive Luxury Experiences: Extra 20% OFF with code
          </span>
          <span className="font-bold text-amber-400">LUXESTAY</span>
        </div>
        
        <div className="flex items-center gap-5 text-[11px] font-medium">
          <button 
            onClick={() => onOpenBookings?.()} 
            className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 text-blue-400" />
            <span>My Bookings</span>
            {bookingsCount > 0 && (
              <span className="bg-rose-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {bookingsCount}
              </span>
            )}
          </button>
          
          <div className="hidden md:flex items-center gap-1 hover:text-white cursor-pointer">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <span>IN | ₹ {currency}</span>
          </div>

          <div className="hidden md:flex items-center gap-1 hover:text-white cursor-pointer">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>24x7 Support</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-1 group">
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                make
              </span>
              <span className="bg-rose-600 text-white font-black text-sm px-2 py-0.5 rounded-md shadow-xs shadow-rose-200 tracking-tighter">
                my
              </span>
              <span className="text-2xl font-black tracking-tight text-blue-600">
                trip
              </span>
            </a>

            {/* Quick Badges */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Super Offers</span>
              </div>
              <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Corporate Travel</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onOpenBookings?.()}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-slate-200 cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-blue-600" />
              <span>Trips</span>
              {bookingsCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-rose-600 text-white text-[10px] font-bold">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <div 
              onClick={() => setShowUserModal(true)}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-full cursor-pointer hover:border-blue-300 transition-all shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block pr-1">
                <p className="text-[10px] uppercase font-semibold text-slate-400 leading-none">Welcome</p>
                <p className="text-xs font-bold text-slate-800 leading-tight">{userName}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
            </div>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
            <button 
              onClick={() => { onOpenBookings?.(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 text-sm font-semibold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-blue-600" />
                My Bookings & Tickets
              </span>
              <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">{bookingsCount}</span>
            </button>

            <button 
              onClick={() => { setShowUserModal(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-sm font-semibold text-slate-700"
            >
              <User className="w-4 h-4 text-blue-600" />
              Manage Profile ({userName})
            </button>
          </div>
        )}
      </header>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowUserModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-200">
                {userName.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-bold text-slate-900">Traveller Profile</h3>
              <p className="text-xs text-slate-500">Customize your booking preferences</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs text-blue-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>MMT Elite Member Status</span>
                </div>
                <p className="text-[11px] text-blue-600/90">Enjoy complimentary web check-in & priority support across bookings.</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
