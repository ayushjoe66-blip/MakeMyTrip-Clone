import React, { useState } from 'react';
import { 
  Building2, 
  Star, 
  MapPin, 
  CheckCircle, 
  Filter, 
  Wifi, 
  Coffee, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HotelResults({ 
  hotels = [], 
  searchParams = {}, 
  onBookHotel 
}) {
  const [selectedStar, setSelectedStar] = useState('All');
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price_asc' | 'price_desc'
  const [selectedAmenity, setSelectedAmenity] = useState('All');

  let filteredHotels = hotels.filter(hotel => {
    if (selectedStar !== 'All' && hotel.starRating !== parseInt(selectedStar, 10)) return false;
    if (hotel.pricePerNight > maxPrice) return false;
    if (selectedAmenity !== 'All' && !hotel.amenities.some(a => a.toLowerCase().includes(selectedAmenity.toLowerCase()))) return false;
    return true;
  });

  filteredHotels.sort((a, b) => {
    if (sortBy === 'rating') return b.userRating - a.userRating;
    if (sortBy === 'price_asc') return a.pricePerNight - b.pricePerNight;
    if (sortBy === 'price_desc') return b.pricePerNight - a.pricePerNight;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* City Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-slate-900">Stays in {searchParams.city || 'Goa'}</span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full ml-1">
                Verified Luxury
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Dates: {searchParams.checkIn || '16 Oct'} - {searchParams.checkOut || '18 Oct'} • {searchParams.guests?.adults || 2} Guests
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Properties:</span>
          <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
            {filteredHotels.length} Stays Found
          </span>
        </div>
      </div>

      {/* Main Grid: Filters + Hotel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" />
                Hotel Filters
              </span>
              <button 
                onClick={() => { setSelectedStar('All'); setMaxPrice(25000); setSelectedAmenity('All'); }}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Star Rating */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                Star Rating
              </label>
              <div className="space-y-2">
                {[
                  { id: 'All', label: 'All Categories' },
                  { id: '5', label: '5 Star Luxury' },
                  { id: '4', label: '4 Star Premium' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium hover:text-blue-600">
                    <input 
                      type="radio" 
                      name="starFilter"
                      checked={selectedStar === opt.id}
                      onChange={() => setSelectedStar(opt.id)}
                      className="accent-blue-600 w-3.5 h-3.5"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Popular Amenities */}
            <div className="pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                Amenities
              </label>
              <div className="space-y-2">
                {[
                  { id: 'All', label: 'Any Amenity' },
                  { id: 'Pool', label: 'Swimming Pool' },
                  { id: 'WiFi', label: 'Free High-Speed WiFi' },
                  { id: 'Spa', label: 'Spa & Wellness' },
                  { id: 'Beach', label: 'Beach Access' }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium hover:text-blue-600">
                    <input 
                      type="radio" 
                      name="amenityFilter"
                      checked={selectedAmenity === opt.id}
                      onChange={() => setSelectedAmenity(opt.id)}
                      className="accent-blue-600 w-3.5 h-3.5"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Per Night Slider */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-xs font-black text-blue-600">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min={4000} 
                max={25000} 
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                <span>₹4,000</span>
                <span>₹25,000</span>
              </div>
            </div>

          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Sorting Bar */}
          <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-200/80 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400 pl-3 hidden sm:inline">Sort By:</span>
            <div className="flex items-center gap-1 w-full sm:w-auto">
              {[
                { id: 'rating', label: 'User Rating (High to Low)' },
                { id: 'price_asc', label: 'Price (Low to High)' },
                { id: 'price_desc', label: 'Price (High to Low)' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    sortBy === s.id 
                      ? 'bg-blue-600 text-white font-bold shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No properties matched this filter</h3>
              <p className="text-xs text-slate-500 mt-1">Try raising the maximum price or selecting all star categories.</p>
            </div>
          ) : (
            filteredHotels.map((hotel) => (
              <div 
                key={hotel.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col md:flex-row group"
              >
                {/* Photo Preview */}
                <div className="md:w-72 h-56 md:h-auto relative overflow-hidden shrink-0">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {hotel.badge && (
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                      {hotel.badge}
                    </span>
                  )}
                </div>

                {/* Hotel Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Stars & Rating */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1">
                        {[...Array(hotel.starRating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[11px] font-bold text-slate-500 ml-1">
                          {hotel.starRating} Star Hotel
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-lg border border-emerald-100">
                        <span className="text-xs font-black">{hotel.userRating}</span>
                        <span className="text-[10px] font-bold">/ 5</span>
                        <span className="text-[10px] text-emerald-600 hidden sm:inline">({hotel.reviewsCount || 1200}+ reviews)</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {hotel.location}
                    </p>

                    {/* Room Type & Cancellation */}
                    <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-800">{hotel.roomType}</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        {hotel.cancellationPolicy}
                      </span>
                    </div>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      {hotel.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 line-through">₹{hotel.originalPrice}</span>
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                            {hotel.discount || '20% OFF'}
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ night</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">+ ₹{hotel.taxes || 1500} taxes & service fees</p>
                    </div>

                    <button 
                      onClick={() => onBookHotel(hotel)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      BOOK THIS STAY
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}
