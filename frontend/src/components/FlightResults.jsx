import React, { useState } from 'react';
import { 
  Plane, 
  Clock, 
  Luggage, 
  Utensils, 
  ShieldCheck, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Info, 
  Sparkles,
  Zap,
  Flame,
  CheckCircle2
} from 'lucide-react';

const AIRLINE_THEMES = {
  'IndiGo': { 
    bg: 'bg-blue-600', 
    badgeBg: 'bg-blue-50', 
    text: 'text-blue-700', 
    border: 'border-blue-200', 
    gradient: 'from-blue-600 to-indigo-700',
    tagline: 'India’s On-Time Airline'
  },
  'Air India': { 
    bg: 'bg-rose-600', 
    badgeBg: 'bg-rose-50', 
    text: 'text-rose-700', 
    border: 'border-rose-200', 
    gradient: 'from-rose-600 to-red-700',
    tagline: 'Legacy of Royal Hospitality'
  },
  'Vistara': { 
    bg: 'bg-purple-900', 
    badgeBg: 'bg-purple-50', 
    text: 'text-purple-800', 
    border: 'border-purple-200', 
    gradient: 'from-purple-900 to-indigo-900',
    tagline: 'India’s Finest Full-Service Experience'
  },
  'Akasa Air': { 
    bg: 'bg-amber-500', 
    badgeBg: 'bg-amber-50', 
    text: 'text-amber-800', 
    border: 'border-amber-200', 
    gradient: 'from-amber-500 to-orange-600',
    tagline: 'Warm, Efficient & Reliable'
  },
  'SpiceJet': { 
    bg: 'bg-red-500', 
    badgeBg: 'bg-red-50', 
    text: 'text-red-700', 
    border: 'border-red-200', 
    gradient: 'from-red-500 to-rose-600',
    tagline: 'Red. Hot. Spicy.'
  }
};

export default function FlightResults({ 
  flights = [], 
  searchParams = {}, 
  onBookFlight,
  onShowToast,
  isLoading = false 
}) {
  const [selectedAirline, setSelectedAirline] = useState('All');
  const [selectedStops, setSelectedStops] = useState('all');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState('cheapest');
  const [expandedFlightId, setExpandedFlightId] = useState(null);

  // Filter
  let filteredFlights = flights.filter(flight => {
    if (selectedAirline !== 'All' && flight.airline !== selectedAirline) return false;
    if (selectedStops !== 'all' && flight.stops !== parseInt(selectedStops, 10)) return false;
    if (flight.price > maxPrice) return false;
    return true;
  });

  // Sort
  filteredFlights.sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'earliest') return a.departureTime.localeCompare(b.departureTime);
    if (sortBy === 'fastest') return a.duration.localeCompare(b.duration);
    return 0;
  });

  const airlinesList = ['All', ...new Set(flights.map(f => f.airline))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Route Header Banner */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-200">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">{searchParams.from || 'DEL'}</span>
              <div className="flex items-center text-slate-400">
                <span className="h-0.5 w-4 bg-slate-300 inline-block"></span>
                <ArrowRight className="w-4 h-4 text-blue-600 mx-0.5" />
                <span className="h-0.5 w-4 bg-slate-300 inline-block"></span>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">{searchParams.to || 'BOM'}</span>
              <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full ml-2">
                {searchParams.travelClass || 'Economy'} Class
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Departure: <strong className="text-slate-800">{searchParams.departureDate || '15 Oct 2026'}</strong> • {searchParams.travellersCount || 1} Passenger(s) • Fares include all taxes & fees
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Instant Web Check-in Free</span>
          </div>
          <span className="font-black text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl text-xs border border-slate-200">
            {filteredFlights.length} Flights Found
          </span>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Flight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sticky Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" />
                Smart Filters
              </span>
              <button 
                onClick={() => { 
                  setSelectedAirline('All'); 
                  setSelectedStops('all'); 
                  setMaxPrice(15000); 
                  onShowToast?.('Filters reset', 'info');
                }}
                className="text-xs text-blue-600 hover:underline font-bold cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Stops */}
            <div>
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider block mb-2.5">
                Stops From {searchParams.from || 'DEL'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Flights', count: flights.length },
                  { id: '0', label: 'Non-Stop Only', count: flights.filter(f => f.stops === 0).length },
                  { id: '1', label: '1 Stop Flights', count: flights.filter(f => f.stops === 1).length }
                ].map(opt => (
                  <label key={opt.id} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer font-bold hover:text-blue-600 group">
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="stopsFilter"
                        checked={selectedStops === opt.id}
                        onChange={() => setSelectedStops(opt.id)}
                        className="accent-blue-600 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{opt.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-blue-600">({opt.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Airlines */}
            <div className="pt-3 border-t border-slate-100">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider block mb-2.5">
                Airlines
              </label>
              <div className="space-y-2">
                {airlinesList.map(airline => {
                  const count = airline === 'All' ? flights.length : flights.filter(f => f.airline === airline).length;
                  return (
                    <label key={airline} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer font-bold hover:text-blue-600 group">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="airlineFilter"
                          checked={selectedAirline === airline}
                          onChange={() => setSelectedAirline(airline)}
                          className="accent-blue-600 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>{airline}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-blue-600">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  One-Way Budget
                </label>
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input 
                type="range" 
                min={3000} 
                max={15000} 
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                <span>₹3,000</span>
                <span>₹15,000</span>
              </div>
            </div>

            {/* Price Lock Banner */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-2xl border border-indigo-100 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-900 font-extrabold mb-1">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Zero Cancellation Pass</span>
              </div>
              <p className="text-[11px] text-indigo-800/80 leading-relaxed">
                Add Zero Cancellation during checkout to get full instant refund if your travel plans change.
              </p>
            </div>
          </div>
        </div>

        {/* Results Stream */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Quick Sort Tabs */}
          <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-200 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400 pl-3 hidden sm:inline">Sort Results By:</span>
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {[
                { id: 'cheapest', label: 'Cheapest First' },
                { id: 'earliest', label: 'Earliest Takeoff' },
                { id: 'fastest', label: 'Shortest Duration' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    sortBy === s.id 
                      ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-300' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flights list */}
          {filteredFlights.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
              <Plane className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-black text-slate-900">No flights matched your filter</h3>
              <p className="text-xs text-slate-500 mt-1">Try increasing your price slider limit or clearing the airline filter.</p>
              <button 
                onClick={() => { setSelectedAirline('All'); setSelectedStops('all'); setMaxPrice(15000); }}
                className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFlights.map((flight) => {
              const theme = AIRLINE_THEMES[flight.airline] || { 
                bg: 'bg-blue-600', 
                badgeBg: 'bg-blue-50', 
                text: 'text-blue-700', 
                border: 'border-blue-200', 
                gradient: 'from-blue-600 to-indigo-700',
                tagline: 'Reliable Airline'
              };
              const isExpanded = expandedFlightId === flight.id;

              return (
                <div 
                  key={flight.id} 
                  className="bg-white rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-5 sm:p-6">
                    
                    {/* Top Airline Ribbon */}
                    <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${theme.gradient} text-white flex items-center justify-center font-black text-xs shadow-xs`}>
                          {flight.airlineCode || flight.airline.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900">{flight.airline}</span>
                            <span className="text-[11px] font-mono font-bold text-slate-400">{flight.flightNumber}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">{theme.tagline}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {flight.seatsAvailable <= 5 && (
                          <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Flame className="w-3 h-3 text-rose-600" />
                            Only {flight.seatsAvailable} seats left!
                          </span>
                        )}
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ⭐ {flight.rating || 4.6}
                        </span>
                      </div>
                    </div>

                    {/* Flight Timings, Duration & Pricing */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      
                      {/* Timings & Duration Line */}
                      <div className="sm:col-span-8 flex items-center justify-between px-1">
                        
                        {/* Departure */}
                        <div className="text-left">
                          <p className="text-2xl font-black text-slate-900 tracking-tight">{flight.departureTime}</p>
                          <p className="text-sm font-black text-blue-600">{flight.from.code}</p>
                          <p className="text-xs text-slate-400 font-medium truncate max-w-[110px]">{flight.from.city}</p>
                        </div>

                        {/* Animated Flight Path Line */}
                        <div className="flex-1 px-4 flex flex-col items-center">
                          <span className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {flight.duration}
                          </span>
                          <div className="w-full relative flex items-center justify-center my-1">
                            <div className="w-full h-0.5 bg-slate-200"></div>
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-wider ${
                            flight.stops === 0 ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {flight.stopDetails || (flight.stops === 0 ? 'Non-Stop' : '1 Stop')}
                          </span>
                        </div>

                        {/* Arrival */}
                        <div className="text-right">
                          <p className="text-2xl font-black text-slate-900 tracking-tight">{flight.arrivalTime}</p>
                          <p className="text-sm font-black text-blue-600">{flight.to.code}</p>
                          <p className="text-xs text-slate-400 font-medium truncate max-w-[110px]">{flight.to.city}</p>
                        </div>

                      </div>

                      {/* Price & Book CTA */}
                      <div className="sm:col-span-4 flex flex-col sm:items-end justify-center pt-3 sm:pt-0 sm:border-l sm:border-slate-100 sm:pl-5">
                        <div className="text-left sm:text-right mb-2">
                          {flight.originalPrice && (
                            <div className="flex items-center sm:justify-end gap-1.5">
                              <span className="text-xs text-slate-400 line-through font-medium">
                                ₹{flight.originalPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                                {flight.discount || '15% OFF'}
                              </span>
                            </div>
                          )}
                          <div className="flex items-baseline sm:justify-end gap-1">
                            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                              ₹{flight.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium">per adult, all taxes included</p>
                        </div>

                        <button 
                          onClick={() => onBookFlight(flight)}
                          className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>BOOK NOW</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                    {/* Bottom Amenities & Expand Details Trigger */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                      <div className="flex items-center gap-3 flex-wrap text-[11px]">
                        <span className="flex items-center gap-1 font-semibold text-slate-600">
                          <Luggage className="w-3.5 h-3.5 text-slate-400" />
                          Cabin {flight.baggage?.cabin || '7 Kgs'} • Check-in {flight.baggage?.checkIn || '15 Kgs'}
                        </span>

                        {flight.mealIncluded && (
                          <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            <Utensils className="w-3 h-3 text-emerald-600" />
                            Complimentary Meal
                          </span>
                        )}

                        {flight.refundable && (
                          <span className="flex items-center gap-1 text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                            <ShieldCheck className="w-3 h-3 text-blue-600" />
                            Refundable
                          </span>
                        )}
                      </div>

                      <button 
                        onClick={() => setExpandedFlightId(isExpanded ? null : flight.id)}
                        className="text-blue-600 hover:text-blue-800 font-black text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Flight Details' : 'View Flight Details'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Expandable Flight Details Drawer */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200 bg-slate-50/80 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-5 sm:p-6 rounded-b-3xl animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                            <h5 className="font-black text-slate-900 mb-2 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-blue-600" />
                              Airport Terminals & Aircraft
                            </h5>
                            <p className="text-slate-700 font-bold">Departure: {flight.from.airport}</p>
                            <p className="text-slate-700 font-bold mt-1">Arrival: {flight.to.airport}</p>
                            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                              <span>Aircraft: Airbus A320neo</span>
                              <span>Wifi: Available</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                            <h5 className="font-black text-slate-900 mb-2 flex items-center gap-1.5">
                              <Luggage className="w-3.5 h-3.5 text-blue-600" />
                              Baggage & Allowance Rules
                            </h5>
                            <p className="text-slate-700">Cabin Baggage: {flight.baggage?.cabin} (1 piece up to 7kg)</p>
                            <p className="text-slate-700 mt-1">Check-in Baggage: {flight.baggage?.checkIn} (1 piece up to 15kg)</p>
                            <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-emerald-700 font-bold">
                              Student fares get +10kg extra baggage free!
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                            <h5 className="font-black text-slate-900 mb-2 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                              Cancellation & Date Change
                            </h5>
                            <p className="text-slate-700">Cancellation Fee: ₹2,500 up to 2 hrs before flight</p>
                            <p className="text-slate-700 mt-1">Date Reschedule: ₹1,500 + difference</p>
                            <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-blue-700 font-bold">
                              Zero convenience fee on UPI bookings
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })
          )}

        </div>
      </div>
    </div>
  );
}
