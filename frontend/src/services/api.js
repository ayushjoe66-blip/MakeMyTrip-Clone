// API service with automatic fallback for smooth UX

const API_BASE = '/api';

export async function fetchFlights(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/flights?${query}`);
    if (!res.ok) throw new Error('Failed to fetch flights');
    return await res.json();
  } catch (err) {
    console.warn('API error, using client-side fallback data:', err);
    return {
      flights: [
        {
          id: "FL-101",
          airline: "IndiGo",
          flightNumber: "6E-2041",
          airlineCode: "6E",
          from: { code: "DEL", city: "New Delhi", airport: "Indira Gandhi International Airport, Terminal 3" },
          to: { code: "BOM", city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International Airport, Terminal 2" },
          departureTime: "06:15",
          arrivalTime: "08:30",
          duration: "2h 15m",
          stops: 0,
          stopDetails: "Non-stop",
          price: 4980,
          originalPrice: 5850,
          discount: "15% OFF",
          seatsAvailable: 7,
          refundable: true,
          baggage: { cabin: "7 Kgs", checkIn: "15 Kgs" },
          mealIncluded: false,
          rating: 4.6
        },
        {
          id: "FL-102",
          airline: "Air India",
          flightNumber: "AI-805",
          airlineCode: "AI",
          from: { code: "DEL", city: "New Delhi", airport: "Indira Gandhi International Airport, Terminal 3" },
          to: { code: "BOM", city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International Airport, Terminal 2" },
          departureTime: "08:00",
          arrivalTime: "10:20",
          duration: "2h 20m",
          stops: 0,
          stopDetails: "Non-stop",
          price: 5420,
          originalPrice: 6200,
          discount: "12% OFF",
          seatsAvailable: 12,
          refundable: true,
          baggage: { cabin: "7 Kgs", checkIn: "20 Kgs" },
          mealIncluded: true,
          rating: 4.4
        },
        {
          id: "FL-103",
          airline: "Vistara",
          flightNumber: "UK-993",
          airlineCode: "UK",
          from: { code: "DEL", city: "New Delhi", airport: "Indira Gandhi International Airport, Terminal 3" },
          to: { code: "BOM", city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International Airport, Terminal 2" },
          departureTime: "11:30",
          arrivalTime: "13:45",
          duration: "2h 15m",
          stops: 0,
          stopDetails: "Non-stop",
          price: 6150,
          originalPrice: 7100,
          discount: "13% OFF",
          seatsAvailable: 5,
          refundable: true,
          baggage: { cabin: "7 Kgs", checkIn: "20 Kgs" },
          mealIncluded: true,
          rating: 4.8
        },
        {
          id: "FL-104",
          airline: "Akasa Air",
          flightNumber: "QP-1302",
          airlineCode: "QP",
          from: { code: "DEL", city: "New Delhi", airport: "Indira Gandhi International Airport, Terminal 2" },
          to: { code: "BOM", city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International Airport, Terminal 1" },
          departureTime: "14:15",
          arrivalTime: "16:35",
          duration: "2h 20m",
          stops: 0,
          stopDetails: "Non-stop",
          price: 4350,
          originalPrice: 5100,
          discount: "15% OFF",
          seatsAvailable: 4,
          refundable: false,
          baggage: { cabin: "7 Kgs", checkIn: "15 Kgs" },
          mealIncluded: false,
          rating: 4.5
        }
      ]
    };
  }
}

export async function fetchHotels(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/hotels?${query}`);
    if (!res.ok) throw new Error('Failed to fetch hotels');
    return await res.json();
  } catch (err) {
    console.warn('API error, using fallback hotels:', err);
    return {
      hotels: [
        {
          id: "HT-201",
          name: "The Taj Mahal Palace",
          city: "Mumbai",
          location: "Apollo Bunder, Colaba, Mumbai",
          starRating: 5,
          userRating: 4.9,
          reviewsCount: 3840,
          badge: "MMT Luxe Icon",
          pricePerNight: 18500,
          originalPrice: 22000,
          discount: "16% OFF",
          taxes: 3330,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
          amenities: ["Sea View", "Infinity Pool", "Free WiFi", "Spa & Wellness", "Fine Dining"],
          roomType: "Luxury Grand Room City View",
          cancellationPolicy: "Free Cancellation till 24 hrs before check-in"
        },
        {
          id: "HT-204",
          name: "W Goa Beachfront Resort",
          city: "Goa",
          location: "Vagator Beach, North Goa",
          starRating: 5,
          userRating: 4.8,
          reviewsCount: 4120,
          badge: "Beachfront Party & Relax",
          pricePerNight: 14900,
          originalPrice: 18000,
          discount: "17% OFF",
          taxes: 2682,
          image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
          amenities: ["Direct Beach Access", "Rock Pool", "Spa by Clarins", "Sunset DJ Deck"],
          roomType: "Wonderful Ocean Oasis Chalet",
          cancellationPolicy: "Free Cancellation till 3 days before check-in"
        }
      ]
    };
  }
}

export async function fetchOffers() {
  try {
    const res = await fetch(`${API_BASE}/offers`);
    if (!res.ok) throw new Error('Failed to fetch offers');
    return await res.json();
  } catch (err) {
    return [
      {
        id: "OFF-1",
        category: "Flights",
        title: "FLAT 15% OFF on Domestic Flights",
        description: "Book flights with HDFC Bank Credit Cards & get up to ₹1,500 instant discount.",
        code: "HDFCFLY",
        discountPercent: 15,
        maxDiscount: 1500,
        bgGradient: "from-blue-600 to-indigo-800",
        tag: "DOMESTIC FLIGHTS"
      },
      {
        id: "OFF-2",
        category: "Hotels",
        title: "Grab Up to 25% OFF on Luxury Stays",
        description: "Exclusive savings on Taj, Marriott, Hyatt & premium boutique villas.",
        code: "LUXESTAY",
        discountPercent: 20,
        maxDiscount: 3500,
        bgGradient: "from-amber-600 to-rose-700",
        tag: "HOTELS & RESORTS"
      }
    ];
  }
}

export async function validateCoupon(code, amount) {
  try {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, amount })
    });
    return await res.json();
  } catch (err) {
    const uppercase = code.toUpperCase();
    if (uppercase === 'HDFCFLY' || uppercase === 'MMTSUPER') {
      const discount = Math.min(Math.round(amount * 0.15), 1500);
      return { valid: true, code: uppercase, discount, finalAmount: amount - discount, message: `Promo ${uppercase} applied!` };
    }
    return { valid: false, message: 'Invalid promo code' };
  }
}

export async function createBooking(bookingPayload) {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload)
    });
    return await res.json();
  } catch (err) {
    // Generate fallback offline booking
    const pnr = 'MMT' + Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      booking: {
        id: 'BK-' + Date.now().toString().slice(-6),
        pnr,
        ...bookingPayload,
        status: 'CONFIRMED',
        bookingDate: new Date().toISOString()
      }
    };
  }
}

export async function fetchCities() {
  try {
    const res = await fetch(`${API_BASE}/cities`);
    if (!res.ok) throw new Error('Failed to fetch cities');
    return await res.json();
  } catch (err) {
    return [
      { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', country: 'India' },
      { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport', country: 'India' },
      { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', country: 'India' },
      { code: 'GOI', city: 'Goa', name: 'Dabolim & MOPA Airports', country: 'India' },
      { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose Airport', country: 'India' },
      { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport', country: 'India' },
      { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'UAE' }
    ];
  }
}
