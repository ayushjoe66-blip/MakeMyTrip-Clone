import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load in-memory datasets
const loadData = (fileName) => {
  const filePath = path.join(__dirname, 'data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

let flights = loadData('flights.json');
let hotels = loadData('hotels.json');
let offers = loadData('offers.json');
let bookings = [];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), message: 'MakeMyTrip API is running smoothly' });
});

// GET /api/flights with filters
app.get('/api/flights', (req, res) => {
  const { from, to, maxPrice, airline, stops, sortBy } = req.query;

  let results = [...flights];

  if (from) {
    const fromUpper = from.toUpperCase().trim();
    results = results.filter(f => f.from.code.toUpperCase().includes(fromUpper) || f.from.city.toUpperCase().includes(fromUpper));
  }

  if (to) {
    const toUpper = to.toUpperCase().trim();
    results = results.filter(f => f.to.code.toUpperCase().includes(toUpper) || f.to.city.toUpperCase().includes(toUpper));
  }

  if (airline && airline !== 'All') {
    results = results.filter(f => f.airline.toLowerCase() === airline.toLowerCase());
  }

  if (stops !== undefined && stops !== 'all' && stops !== '') {
    results = results.filter(f => f.stops === parseInt(stops, 10));
  }

  if (maxPrice) {
    results = results.filter(f => f.price <= parseInt(maxPrice, 10));
  }

  // Sort
  if (sortBy === 'price_asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'duration') {
    results.sort((a, b) => a.duration.localeCompare(b.duration));
  } else if (sortBy === 'departure') {
    results.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  }

  // If no flights found for a very specific combo, return top popular flights as suggestions
  const fallback = results.length === 0;
  res.json({
    count: results.length,
    flights: fallback ? flights.slice(0, 5) : results,
    isFallback: fallback
  });
});

// GET /api/hotels with filters
app.get('/api/hotels', (req, res) => {
  const { city, minRating, maxPrice, starRating, sortBy } = req.query;

  let results = [...hotels];

  if (city) {
    const cityUpper = city.toUpperCase().trim();
    results = results.filter(h => h.city.toUpperCase().includes(cityUpper) || h.location.toUpperCase().includes(cityUpper));
  }

  if (minRating) {
    results = results.filter(h => h.userRating >= parseFloat(minRating));
  }

  if (starRating && starRating !== 'All') {
    results = results.filter(h => h.starRating === parseInt(starRating, 10));
  }

  if (maxPrice) {
    results = results.filter(h => h.pricePerNight <= parseInt(maxPrice, 10));
  }

  if (sortBy === 'price_asc') {
    results.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sortBy === 'price_desc') {
    results.sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.userRating - a.userRating);
  }

  const fallback = results.length === 0;
  res.json({
    count: results.length,
    hotels: fallback ? hotels : results,
    isFallback: fallback
  });
});

// GET /api/offers
app.get('/api/offers', (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(offers.filter(o => o.category.toLowerCase() === category.toLowerCase()));
  }
  res.json(offers);
});

// POST /api/coupons/validate
app.post('/api/coupons/validate', (req, res) => {
  const { code, amount } = req.body;
  if (!code) {
    return res.status(400).json({ valid: false, message: 'Coupon code is required' });
  }

  const foundOffer = offers.find(o => o.code.toUpperCase() === code.toUpperCase().trim());
  if (!foundOffer) {
    return res.status(404).json({ valid: false, message: 'Invalid or expired coupon code' });
  }

  const discount = Math.min(Math.round((amount * foundOffer.discountPercent) / 100), foundOffer.maxDiscount);
  return res.json({
    valid: true,
    code: foundOffer.code,
    discount,
    finalAmount: Math.max(0, amount - discount),
    message: `Promo ${foundOffer.code} applied! Saved ₹${discount}`
  });
});

// POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const { type, item, travellers, contact, totalAmount, discount = 0, paymentMethod = 'UPI' } = req.body;

  if (!type || !item || !travellers || travellers.length === 0) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  const pnr = 'MMT' + Math.floor(100000 + Math.random() * 900000);
  const bookingId = 'BK-' + Date.now().toString().slice(-6);

  const newBooking = {
    id: bookingId,
    pnr,
    type, // 'flight' | 'hotel'
    item,
    travellers,
    contact,
    totalAmount,
    discount,
    paymentMethod,
    status: 'CONFIRMED',
    bookingDate: new Date().toISOString(),
    seats: item.selectedSeats || ['12A', '12B'].slice(0, travellers.length)
  };

  bookings.push(newBooking);

  res.status(201).json({
    success: true,
    message: 'Booking successfully confirmed!',
    booking: newBooking
  });
});

// GET /api/bookings/:id
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id || b.pnr === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
});

// City airport search helper
app.get('/api/cities', (req, res) => {
  const cities = [
    { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', country: 'India' },
    { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport', country: 'India' },
    { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', country: 'India' },
    { code: 'GOI', city: 'Goa', name: 'Dabolim & MOPA Airports', country: 'India' },
    { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose Airport', country: 'India' },
    { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport', country: 'India' },
    { code: 'MAA', city: 'Chennai', name: 'Chennai International Airport', country: 'India' },
    { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'UAE' },
    { code: 'JAI', city: 'Jaipur', name: 'Jaipur International Airport', country: 'India' },
    { code: 'BBI', city: 'Bhubaneswar', name: 'Biju Patnaik Airport', country: 'India' }
  ];
  res.json(cities);
});

app.listen(PORT, () => {
  console.log(`MakeMyTrip Backend Server running on http://localhost:${PORT}`);
});
