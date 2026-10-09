import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Users, 
  MapPin, 
  Search, 
  Sparkles,
  Star
} from 'lucide-react';

const CITIES = [
  { name: 'Goa', state: 'India', stays: '1,420+ Properties', icon: '🏖️' },
  { name: 'Mumbai', state: 'Maharashtra, India', stays: '950+ Properties', icon: '🏙️' },
  { name: 'New Delhi', state: 'Delhi NCR, India', stays: '1,200+ Properties', icon: '🏛️' },
  { name: 'Bengaluru', state: 'Karnataka, India', stays: '840+ Properties', icon: '🌲' },
  { name: 'Jaipur', state: 'Rajasthan, India', stays: '620+ Properties', icon: '🏰' },
  { name: 'Dubai', state: 'United Arab Emirates', stays: '530+ Properties', icon: '✨' },
];

export default function HotelSearchCard({ onSearch }) {
  const [city, setCity] = useState(CITIES[0].name);
  const [checkIn, setCheckIn] = useState('2026-10-16');
  const [checkOut, setCheckOut] = useState('2026-10-18');
  const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });
  const [priceTier, setPriceTier] = useState('All');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const handleSearchSubmit = () => {
    onSearch({
      city,
      checkIn,
      checkOut,
      guests,
      priceTier
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 max-w-6xl mx-auto relative z-10">
      
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-3">
          <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            MMT LUXE SELECTION
          </span>
          <span className="text-slate-500 hidden sm:inline">Handpicked 5-Star Villas, Heritage Palaces & Luxury Beach Resorts</span>
        </div>
        <div className="text-blue-600 hover:underline cursor-pointer">
          View Hotel Booking Policies & Free Cancellation
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 py-6 relative">
        
        {/* Destination / City Picker */}
        <div 
          onClick={() => setShowCityPicker(!showCityPicker)}
          className="md:col-span-4 border border-slate-200 rounded-2xl p-3.5 hover:border-blue-500 hover:bg-blue-50/20 cursor-pointer transition-all relative"
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            City, Destination or Property
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {city}
          </div>
          <p className="text-xs text-slate-500 truncate mt-1">
            India & International Top Stays
          </p>

          {/* City Selection Dropdown */}
          {showCityPicker && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95"
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase px-2 mb-2">Popular Destinations</p>
              <div className="space-y-1">
                {CITIES.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => { setCity(c.name); setShowCityPicker(false); }}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-blue-50 transition-colors cursor-pointer ${
                      city === c.name ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{c.icon}</span>
                      <div>
                        <p className="text-xs font-bold">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.state}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{c.stays}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Check-In */}
        <div className="md:col-span-3 border border-slate-200 rounded-2xl p-3.5 hover:border-blue-500 hover:bg-blue-50/20 transition-all">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Check-In
          </span>
          <input 
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm font-bold text-slate-800 bg-transparent focus:outline-hidden mt-2 cursor-pointer"
          />
          <p className="text-xs text-slate-500 mt-1 font-medium">Standard Check-in: 2:00 PM</p>
        </div>

        {/* Check-Out */}
        <div className="md:col-span-3 border border-slate-200 rounded-2xl p-3.5 hover:border-blue-500 hover:bg-blue-50/20 transition-all">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Check-Out
          </span>
          <input 
            type="date" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm font-bold text-slate-800 bg-transparent focus:outline-hidden mt-2 cursor-pointer"
          />
          <p className="text-xs text-slate-500 mt-1 font-medium">Standard Check-out: 11:00 AM</p>
        </div>

        {/* Rooms & Guests */}
        <div 
          onClick={() => setShowGuestPicker(!showGuestPicker)}
          className="md:col-span-2 border border-slate-200 rounded-2xl p-3.5 hover:border-blue-500 hover:bg-blue-50/20 cursor-pointer transition-all relative"
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            Rooms & Guests
          </span>
          <div className="text-base font-black text-slate-900 mt-1">
            {guests.rooms} Room, {guests.adults + guests.children} Guests
          </div>
          <p className="text-xs text-slate-500 truncate mt-1">
            {guests.adults} Adults
          </p>

          {/* Guest Selector Popover */}
          {showGuestPicker && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95"
            >
              <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Rooms & Guests</h4>
              
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-800">Rooms</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setGuests(g => ({ ...g, rooms: Math.max(1, g.rooms - 1) }))}
                    className="w-7 h-7 rounded-lg border border-slate-200 font-bold hover:bg-slate-100"
                  >-</button>
                  <span className="font-bold w-4 text-center">{guests.rooms}</span>
                  <button 
                    type="button"
                    onClick={() => setGuests(g => ({ ...g, rooms: Math.min(5, g.rooms + 1) }))}
                    className="w-7 h-7 rounded-lg border border-slate-200 font-bold hover:bg-slate-100"
                  >+</button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-800">Adults</span>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setGuests(g => ({ ...g, adults: Math.max(1, g.adults - 1) }))}
                    className="w-7 h-7 rounded-lg border border-slate-200 font-bold hover:bg-slate-100"
                  >-</button>
                  <span className="font-bold w-4 text-center">{guests.adults}</span>
                  <button 
                    type="button"
                    onClick={() => setGuests(g => ({ ...g, adults: Math.min(10, g.adults + 1) }))}
                    className="w-7 h-7 rounded-lg border border-slate-200 font-bold hover:bg-slate-100"
                  >+</button>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setShowGuestPicker(false)}
                className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Price Pill Filters */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-4 text-xs">
        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Price per Night:</span>
        {['All', '₹0 - ₹4,000', '₹4,000 - ₹8,000', '₹8,000 - ₹15,000', '₹15,000+'].map(tier => (
          <button
            key={tier}
            type="button"
            onClick={() => setPriceTier(tier)}
            className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
              priceTier === tier
                ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* CTA Search Button */}
      <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 z-20">
        <button 
          onClick={handleSearchSubmit}
          className="px-10 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base tracking-wide uppercase shadow-xl shadow-blue-500/35 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span>SEARCH HOTELS</span>
        </button>
      </div>
    </div>
  );
}
