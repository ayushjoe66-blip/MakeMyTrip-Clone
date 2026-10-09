import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Calendar, 
  Users, 
  PlaneTakeoff, 
  PlaneLanding, 
  Sparkles,
  Search,
  Check,
  TrendingDown,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

const AIRPORTS = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport, Terminal 3', country: 'India', flag: '🇮🇳', flightsCount: '450+ Daily Flights' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport, Terminal 2', country: 'India', flag: '🇮🇳', flightsCount: '380+ Daily Flights' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport, Terminal 1', country: 'India', flag: '🇮🇳', flightsCount: '310+ Daily Flights' },
  { code: 'GOI', city: 'Goa', name: 'Dabolim & MOPA International Airport', country: 'India', flag: '🇮🇳', flightsCount: '190+ Daily Flights' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose Airport', country: 'India', flag: '🇮🇳', flightsCount: '210+ Daily Flights' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport', country: 'India', flag: '🇮🇳', flightsCount: '240+ Daily Flights' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport, Terminal 1', country: 'UAE', flag: '🇦🇪', flightsCount: '120+ Daily Flights' },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur International Airport', country: 'India', flag: '🇮🇳', flightsCount: '85+ Daily Flights' }
];

export default function FlightSearchCard({ onSearch, onShowToast }) {
  const [tripType, setTripType] = useState('oneway');
  const [fareType, setFareType] = useState('regular');
  
  const [fromAirport, setFromAirport] = useState(AIRPORTS[0]);
  const [toAirport, setToAirport] = useState(AIRPORTS[1]);
  
  const [departureDate, setDepartureDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('');
  
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState('Economy');
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwapAirports = (e) => {
    e.stopPropagation();
    setIsSwapping(true);
    setTimeout(() => setIsSwapping(false), 400);

    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
    onShowToast?.(`Route swapped: ${toAirport.code} ⇄ ${fromAirport.code}`, 'info');
  };

  const totalTravellers = travellers.adults + travellers.children + travellers.infants;

  const handleSearchSubmit = () => {
    onSearch({
      from: fromAirport.code,
      to: toAirport.code,
      departureDate,
      returnDate: tripType === 'roundtrip' ? returnDate : null,
      travellersCount: totalTravellers,
      travelClass,
      fareType
    });
  };

  const filteredAirports = AIRPORTS.filter(a => 
    a.city.toLowerCase().includes(searchFilter.toLowerCase()) || 
    a.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200/80 max-w-6xl mx-auto relative z-20 backdrop-blur-md">
      
      {/* Trip Type Selector & Low Fare Prompt */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-extrabold text-slate-900 group">
            <input 
              type="radio" 
              name="tripType" 
              checked={tripType === 'oneway'} 
              onChange={() => setTripType('oneway')}
              className="accent-blue-600 w-4 h-4 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">One Way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-extrabold text-slate-900 group">
            <input 
              type="radio" 
              name="tripType" 
              checked={tripType === 'roundtrip'} 
              onChange={() => setTripType('roundtrip')}
              className="accent-blue-600 w-4 h-4 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">Round Trip</span>
          </label>
          <label className="hidden sm:flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-400 hover:text-slate-600">
            <input 
              type="radio" 
              name="tripType" 
              disabled
              className="accent-blue-600 w-4 h-4"
            />
            <span>Multi City</span>
          </label>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 py-1 px-3 rounded-full border border-slate-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Fare Lock available: Lock ticket price for up to 7 days</span>
        </div>
      </div>

      {/* Main Search Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 py-6 relative">
        
        {/* FROM Selector */}
        <div 
          onClick={() => { setActiveDropdown(activeDropdown === 'from' ? null : 'from'); setSearchFilter(''); }}
          className={`md:col-span-3 border rounded-2xl p-4 cursor-pointer transition-all relative group bg-white ${
            activeDropdown === 'from' ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50/10' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'
          }`}
        >
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <PlaneTakeoff className="w-3.5 h-3.5 text-blue-600" />
            From
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline justify-between">
            <span>{fromAirport.city}</span>
            <span className="text-sm font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg shadow-2xs">
              {fromAirport.code}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate mt-1 font-medium">
            {fromAirport.flag} {fromAirport.name}
          </p>

          {/* Airport Selector Dropdown */}
          {activeDropdown === 'from' && (
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute top-full left-0 mt-2 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in zoom-in-95"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl mb-3">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Type city name or airport code (DEL, BOM...)" 
                  value={searchFilter} 
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-hidden font-medium"
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredAirports.map(airport => (
                  <div 
                    key={airport.code}
                    onClick={() => { setFromAirport(airport); setActiveDropdown(null); }}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-blue-50 transition-colors cursor-pointer ${
                      fromAirport.code === airport.code ? 'bg-blue-50/80 border border-blue-200 text-blue-700 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold flex items-center gap-1.5">
                        <span>{airport.flag}</span>
                        <span>{airport.city}, {airport.country}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{airport.name}</p>
                    </div>
                    <span className="text-xs font-black text-blue-600 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs">
                      {airport.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="absolute left-[24%] top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <button 
            type="button"
            onClick={handleSwapAirports}
            className={`w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg text-blue-600 hover:bg-blue-50 hover:scale-110 flex items-center justify-center transition-all cursor-pointer ${
              isSwapping ? 'rotate-180 duration-300' : ''
            }`}
            title="Swap departure and destination"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* TO Selector */}
        <div 
          onClick={() => { setActiveDropdown(activeDropdown === 'to' ? null : 'to'); setSearchFilter(''); }}
          className={`md:col-span-3 border rounded-2xl p-4 cursor-pointer transition-all relative group bg-white ${
            activeDropdown === 'to' ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50/10' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'
          }`}
        >
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <PlaneLanding className="w-3.5 h-3.5 text-blue-600" />
            To
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline justify-between">
            <span>{toAirport.city}</span>
            <span className="text-sm font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg shadow-2xs">
              {toAirport.code}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate mt-1 font-medium">
            {toAirport.flag} {toAirport.name}
          </p>

          {/* Airport Selector Dropdown */}
          {activeDropdown === 'to' && (
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute top-full left-0 mt-2 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in zoom-in-95"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl mb-3">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Type destination city name" 
                  value={searchFilter} 
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-hidden font-medium"
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredAirports.map(airport => (
                  <div 
                    key={airport.code}
                    onClick={() => { setToAirport(airport); setActiveDropdown(null); }}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-blue-50 transition-colors cursor-pointer ${
                      toAirport.code === airport.code ? 'bg-blue-50/80 border border-blue-200 text-blue-700 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold flex items-center gap-1.5">
                        <span>{airport.flag}</span>
                        <span>{airport.city}, {airport.country}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{airport.name}</p>
                    </div>
                    <span className="text-xs font-black text-blue-600 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs">
                      {airport.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DEPARTURE Selector */}
        <div className="md:col-span-2 border border-slate-200 rounded-2xl p-4 hover:border-blue-500 hover:bg-slate-50/50 transition-all bg-white">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Departure
          </span>
          <input 
            type="date" 
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full text-base font-black text-slate-900 bg-transparent focus:outline-hidden mt-1 cursor-pointer"
          />
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-flex">
            <TrendingDown className="w-3 h-3" />
            <span>Fares from ₹4,980</span>
          </div>
        </div>

        {/* RETURN Selector */}
        <div className="md:col-span-2 border border-slate-200 rounded-2xl p-4 hover:border-blue-500 hover:bg-slate-50/50 transition-all bg-white">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Return
          </span>
          {tripType === 'roundtrip' ? (
            <div>
              <input 
                type="date" 
                value={returnDate || '2026-10-22'}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full text-base font-black text-slate-900 bg-transparent focus:outline-hidden mt-1 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 font-medium">Roundtrip discount applied</span>
            </div>
          ) : (
            <div 
              onClick={() => { setTripType('roundtrip'); setReturnDate('2026-10-22'); }}
              className="mt-1.5 cursor-pointer group"
            >
              <span className="text-xs font-bold text-blue-600 group-hover:underline block">+ Add Return</span>
              <p className="text-[11px] text-slate-400">Save up to ₹1,500 more</p>
            </div>
          )}
        </div>

        {/* TRAVELLERS & CLASS */}
        <div 
          onClick={() => setActiveDropdown(activeDropdown === 'travellers' ? null : 'travellers')}
          className={`md:col-span-2 border rounded-2xl p-4 cursor-pointer transition-all relative bg-white ${
            activeDropdown === 'travellers' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'
          }`}
        >
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            Travellers
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
            <span>{totalTravellers}</span>
            <span className="text-xs font-bold text-slate-500">Passenger(s)</span>
          </div>
          <p className="text-xs text-blue-600 font-bold truncate mt-1">
            {travelClass}
          </p>

          {/* Travellers Popover */}
          {activeDropdown === 'travellers' && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-50 animate-in fade-in zoom-in-95"
            >
              {/* Quick Presets */}
              <div className="mb-4 pb-3 border-b border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">Quick Presets:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setTravellers({ adults: 1, children: 0, infants: 0 }); }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-[11px] font-bold text-slate-700"
                  >
                    Solo (1)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTravellers({ adults: 2, children: 0, infants: 0 }); }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-[11px] font-bold text-slate-700"
                  >
                    Couple (2)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTravellers({ adults: 2, children: 1, infants: 0 }); }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-[11px] font-bold text-slate-700"
                  >
                    Family (2+1)
                  </button>
                </div>
              </div>

              {/* Adults Counter */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div>
                  <span className="font-extrabold text-slate-900">Adults</span>
                  <p className="text-[10px] text-slate-400">12+ years</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setTravellers(t => ({ ...t, adults: Math.max(1, t.adults - 1) }))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center font-black hover:bg-slate-100"
                  >-</button>
                  <span className="font-black w-4 text-center">{travellers.adults}</span>
                  <button 
                    type="button"
                    onClick={() => setTravellers(t => ({ ...t, adults: Math.min(9, t.adults + 1) }))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center font-black hover:bg-slate-100"
                  >+</button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div>
                  <span className="font-extrabold text-slate-900">Children</span>
                  <p className="text-[10px] text-slate-400">2 - 12 years</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => setTravellers(t => ({ ...t, children: Math.max(0, t.children - 1) }))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center font-black hover:bg-slate-100"
                  >-</button>
                  <span className="font-black w-4 text-center">{travellers.children}</span>
                  <button 
                    type="button"
                    onClick={() => setTravellers(t => ({ ...t, children: Math.min(6, t.children + 1) }))}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center font-black hover:bg-slate-100"
                  >+</button>
                </div>
              </div>

              {/* Cabin Class */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-black text-slate-900 mb-2 block">Choose Travel Class</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Economy', 'Premium', 'Business'].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setTravelClass(c)}
                      className={`text-[11px] py-1.5 px-2 rounded-xl font-bold border text-center cursor-pointer transition-all ${
                        travelClass === c ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setActiveDropdown(null)}
                className="mt-5 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md shadow-blue-200 cursor-pointer"
              >
                Apply Travellers & Class
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Special Fare Types */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 pb-5 text-xs">
        <span className="text-slate-400 font-extrabold text-[11px] uppercase tracking-wider mr-1">Special Fares:</span>
        {[
          { id: 'regular', label: 'Regular Fares' },
          { id: 'student', label: 'Student Fares', discount: '+10kg Extra Baggage' },
          { id: 'senior', label: 'Senior Citizen', discount: 'Flat ₹600 OFF' },
          { id: 'forces', label: 'Armed Forces', discount: 'Special Rates' },
        ].map(fare => (
          <button
            key={fare.id}
            type="button"
            onClick={() => { setFareType(fare.id); onShowToast?.(`Applied fare preference: ${fare.label}`, 'success'); }}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              fareType === fare.id 
                ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-2xs' 
                : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {fareType === fare.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
            <span>{fare.label}</span>
            {fare.discount && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {fare.discount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Large Gradient CTA Search Button */}
      <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 z-30">
        <button 
          onClick={handleSearchSubmit}
          className="px-12 py-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-base tracking-wider uppercase shadow-xl shadow-blue-600/40 hover:shadow-blue-600/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <Search className="w-5 h-5 stroke-[2.5]" />
          <span>SEARCH FLIGHTS</span>
        </button>
      </div>
    </div>
  );
}
