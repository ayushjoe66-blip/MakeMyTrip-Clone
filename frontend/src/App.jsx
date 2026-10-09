import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ShowcaseBanner from './components/ShowcaseBanner';
import CategoryNav from './components/CategoryNav';
import FlightSearchCard from './components/FlightSearchCard';
import HotelSearchCard from './components/HotelSearchCard';
import FlightResults from './components/FlightResults';
import HotelResults from './components/HotelResults';
import OffersCarousel from './components/OffersCarousel';
import TripIdeas from './components/TripIdeas';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MyTripsDrawer from './components/MyTripsDrawer';
import Toast from './components/Toast';
import { fetchFlights, fetchHotels, fetchOffers } from './services/api';
import { Sparkles, ArrowDown, TrendingUp } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('flights');
  
  // Data state
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'info' });
    }, 3500);
  };

  // Search parameters
  const [flightSearchParams, setFlightSearchParams] = useState({
    from: 'DEL',
    to: 'BOM',
    departureDate: '2026-10-15',
    travellersCount: 1,
    travelClass: 'Economy',
    fareType: 'regular'
  });

  const [hotelSearchParams, setHotelSearchParams] = useState({
    city: 'Goa',
    checkIn: '2026-10-16',
    checkOut: '2026-10-18',
    guests: { rooms: 1, adults: 2, children: 0 },
    priceTier: 'All'
  });

  // Modal & Drawer State
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [bookingType, setBookingType] = useState('flight');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  
  // Bookings persisted in localStorage
  const [myBookings, setMyBookings] = useState(() => {
    try {
      const stored = localStorage.getItem('mmt_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const resultsRef = useRef(null);

  // Initial Data Fetch
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        const [flightsData, hotelsData, offersData] = await Promise.all([
          fetchFlights({ from: 'DEL', to: 'BOM' }),
          fetchHotels({ city: 'Goa' }),
          fetchOffers()
        ]);
        setFlights(flightsData.flights || []);
        setHotels(hotelsData.hotels || []);
        setOffers(offersData || []);
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem('mmt_bookings', JSON.stringify(myBookings));
  }, [myBookings]);

  // Handle Flight Search
  const handleFlightSearch = async (params) => {
    setIsLoading(true);
    setFlightSearchParams(params);
    showToast(`Searching flights for ${params.from} → ${params.to}...`, 'info');
    try {
      const data = await fetchFlights(params);
      setFlights(data.flights || []);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Hotel Search
  const handleHotelSearch = async (params) => {
    setIsLoading(true);
    setHotelSearchParams(params);
    showToast(`Searching curated stays in ${params.city}...`, 'info');
    try {
      const data = await fetchHotels(params);
      setHotels(data.hotels || []);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger Booking Modal for Flight
  const handleStartFlightBooking = (flight) => {
    setSelectedBookingItem(flight);
    setBookingType('flight');
    setIsBookingModalOpen(true);
  };

  // Trigger Booking Modal for Hotel
  const handleStartHotelBooking = (hotel) => {
    setSelectedBookingItem(hotel);
    setBookingType('hotel');
    setIsBookingModalOpen(true);
  };

  // Handle successful booking confirmation
  const handleBookingSuccess = (newBooking) => {
    setMyBookings(prev => [newBooking, ...prev]);
  };

  // Quick Destination Click from TripIdeas
  const handleDestinationSelect = (destination) => {
    if (activeCategory === 'hotels') {
      handleHotelSearch({ ...hotelSearchParams, city: destination });
    } else {
      const airportCode = destination === 'Goa' ? 'GOI' : destination === 'Dubai' ? 'DXB' : destination === 'Jaipur' ? 'JAI' : 'BOM';
      handleFlightSearch({ ...flightSearchParams, to: airportCode });
    }
  };

  // Quick Demo Scenarios for Companies & Reviewers
  const handleQuickFlightDemo = () => {
    setActiveCategory('flights');
    handleFlightSearch({
      from: 'DEL',
      to: 'BOM',
      departureDate: '2026-10-15',
      travellersCount: 1,
      travelClass: 'Economy',
      fareType: 'regular'
    });
  };

  const handleQuickHotelDemo = () => {
    setActiveCategory('hotels');
    handleHotelSearch({
      city: 'Goa',
      checkIn: '2026-10-16',
      checkOut: '2026-10-18',
      guests: { rooms: 1, adults: 2, children: 0 },
      priceTier: 'All'
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Company Presentation & Showcase Header */}
      <ShowcaseBanner 
        onQuickFlightDemo={handleQuickFlightDemo}
        onQuickHotelDemo={handleQuickHotelDemo}
        onOpenBookings={() => setIsMyTripsOpen(true)}
      />

      {/* Top Navbar */}
      <Navbar 
        onOpenBookings={() => setIsMyTripsOpen(true)}
        bookingsCount={myBookings.length}
      />

      {/* Hero Section with Signature MakeMyTrip Gradient */}
      <div className="mmt-gradient-hero pt-8 pb-24 sm:pb-32 px-4 relative overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Live Booking Ticker */}
        <div className="max-w-5xl mx-auto text-center mb-7 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 border border-white/15 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>🔥 2,480+ travelers booked domestic flights in the last hour</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Flights, Luxury Hotels & Holiday Bookings
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium max-w-2xl mx-auto">
            Experience seamless travel booking with instant electronic confirmation, flexible fares, and 24x7 priority support.
          </p>
        </div>

        {/* Floating Category Navigation Bar */}
        <CategoryNav 
          activeCategory={activeCategory} 
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            showToast(`Switched service: ${cat.toUpperCase()}`, 'info');
          }} 
        />
      </div>

      {/* Floating Main Search Card */}
      <div className="-mt-16 sm:-mt-20 px-4 relative z-30 mb-12">
        {activeCategory === 'flights' ? (
          <FlightSearchCard 
            onSearch={handleFlightSearch} 
            onShowToast={showToast}
          />
        ) : activeCategory === 'hotels' ? (
          <HotelSearchCard onSearch={handleHotelSearch} />
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto text-center border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 capitalize">{activeCategory} Booking</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Explore best available deals for {activeCategory}. Switch to Flights or Hotels for full interactive booking!
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setActiveCategory('flights')}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Switch to Flights
              </button>
              <button 
                onClick={() => setActiveCategory('hotels')}
                className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Switch to Hotels
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Offers Section */}
      <OffersCarousel 
        offers={offers}
        onSelectCoupon={(code) => showToast(`Copied coupon ${code}`, 'success')}
      />

      {/* Search Results Anchor */}
      <div ref={resultsRef} className="scroll-mt-24">
        {activeCategory === 'flights' ? (
          <FlightResults 
            flights={flights}
            searchParams={flightSearchParams}
            onBookFlight={handleStartFlightBooking}
            onShowToast={showToast}
            isLoading={isLoading}
          />
        ) : activeCategory === 'hotels' ? (
          <HotelResults 
            hotels={hotels}
            searchParams={hotelSearchParams}
            onBookHotel={handleStartHotelBooking}
          />
        ) : null}
      </div>

      {/* Trending Destinations Inspiration */}
      <TripIdeas onSelectDestination={handleDestinationSelect} />

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal 
          type={bookingType}
          item={selectedBookingItem}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
          onShowToast={showToast}
        />
      )}

      {/* My Trips Sliding Drawer */}
      <MyTripsDrawer 
        isOpen={isMyTripsOpen}
        onClose={() => setIsMyTripsOpen(false)}
        bookings={myBookings}
      />

      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'info' })} 
      />

    </div>
  );
}
