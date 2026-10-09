# MakeMyTrip Clone - Full-Stack Travel Booking Platform

A high-polish, full-stack clone of **MakeMyTrip** built with **React 19**, **Tailwind CSS v4**, **Lucide Icons**, and an **Express REST API** backend.

---

## 🌟 Key Features & UI/UX Highlights

### 1. MakeMyTrip Signature Design System
- **Deep Indigo & Blue Hero Gradient** with glowing accents and top promotional ribbon.
- **Iconic Category Navigation Bar** floating seamlessly over the hero:
  - ✈️ Flights (Active booking engine)
  - 🏨 Hotels & Luxury Stays (Active booking engine)
  - 🏡 Homestays & Villas
  - 🌴 Holiday Packages
  - 🚆 Trains
  - 🚌 Buses
  - 🚖 Airport Cabs
  - 🛡️ Travel Insurance

### 2. Comprehensive Flight Booking Engine
- **Trip Types**: One Way, Round Trip, Multi City.
- **Special Fare Categories**: Regular, Student Fares (+10kg Baggage), Senior Citizen, Armed Forces.
- **Interactive Airport Selector**: City auto-complete with airport codes (DEL, BOM, BLR, GOI, CCU, HYD, DXB, JAI).
- **Instant Location Swap (`⇄`)** button.
- **Interactive Datepicker & Traveller/Cabin Class Popover** (Adults, Children, Infants, Economy / Business).
- **Sticky Results Filter**:
  - Non-Stop vs 1-Stop filter
  - Airline filter (IndiGo, Air India, Vistara, Akasa Air, SpiceJet)
  - Departure time slots (Morning, Afternoon, Evening)
  - Price Range Slider (₹3,000 to ₹15,000)
- **Sorting Options**: Cheapest First, Earliest Departure, Fastest Duration.
- **Expandable Flight Details**: Route terminals, Baggage allowance, and Instant cancellation policies.

### 3. Luxury Hotels & Stays Engine
- **Destination Chooser**: Goa, Mumbai, New Delhi, Bengaluru, Jaipur, Dubai.
- **Stay Dates & Guest Count**: Rooms, Adults, Children counters.
- **Filter Bar**: 5-Star Luxury, 4-Star Premium, Price slider, Amenities (Infinity Pool, Beach Access, Free WiFi, Spa).
- **High-Res Hotel Cards**: Photo gallery preview, guest review ratings, badges (MMT Luxe Icon), and free cancellation indicators.

### 4. Interactive 3-Step Checkout & Simulated Payment Flow
- **Step 1: Passenger / Guest Details**:
  - Contact information (Govt ID name, Email, Mobile).
  - **Interactive Airplane Seat Grid**: Clickable cabin layout (12A, 12B, 14F, etc.) with Window / Aisle labels.
- **Step 2: Promo Codes & Payment Selection**:
  - Real-time coupon validator API (`HDFCFLY`, `LUXESTAY`, `MMTFREE`, `GLOBAL5000`).
  - Transparent price breakup (Base fare, Taxes, Promo savings, Final amount).
  - Payment simulation: UPI QR Code scan, Credit/Debit card, Netbanking.
- **Step 3: Confirmed Digital E-Ticket / Boarding Pass**:
  - 🎉 Instant Confetti Celebration burst.
  - Realistic E-Ticket Card with PNR number, flight times, passenger name, seat number, gate assignment, and barcode/QR code.
  - Simulated "Download PDF Ticket" action.

### 5. My Bookings Drawer
- Real-time slide-over panel displaying all confirmed flight and hotel reservations.
- Persisted locally with instant retrieval.

---

## 🛠️ Tech Stack

- **Frontend**:
  - React 19 + Vite
  - Tailwind CSS v4 (`@tailwindcss/vite`)
  - Lucide React (feather-style crisp icons)
  - Canvas Confetti (celebratory booking effects)
  - Google Fonts (`Plus Jakarta Sans`)
- **Backend**:
  - Node.js (v24+)
  - Express REST API
  - CORS middleware
  - In-memory mock datasets with filtering and booking persistence

---

## 🚀 Running the Project

### Both servers are currently running:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### To restart manually in the future:
1. **Option A (One-click launcher)**:
   ```bash
   node start-all.js
   ```

2. **Option B (Separate terminals)**:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/flights` | Search flights with filters (`from`, `to`, `airline`, `stops`, `maxPrice`, `sortBy`) |
| `GET` | `/api/hotels` | Search hotels with filters (`city`, `minRating`, `starRating`, `maxPrice`, `sortBy`) |
| `GET` | `/api/offers` | Fetch trending promotional offers and coupon discounts |
| `POST` | `/api/coupons/validate` | Verify coupon validity and calculate discount amount |
| `POST` | `/api/bookings` | Create and store a confirmed booking with PNR and e-ticket generation |
| `GET` | `/api/bookings/:id` | Lookup booking by ID or PNR |
| `GET` | `/api/cities` | Airport and city reference list |
| `GET` | `/api/health` | Service health status check |
