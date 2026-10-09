import React, { useState } from 'react';
import { 
  X, 
  Plane, 
  Building2, 
  CheckCircle2, 
  Tag, 
  CreditCard, 
  QrCode, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Download,
  Calendar,
  Clock,
  User,
  Luggage,
  Smartphone,
  Printer,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { validateCoupon, createBooking } from '../services/api';

const SAMPLE_SEATS = [
  ['10A', '10B', '10C', '10D', '10E', '10F'],
  ['11A', '11B', '11C', '11D', '11E', '11F'],
  ['12A', '12B', '12C', '12D', '12E', '12F'],
  ['14A', '14B', '14C', '14D', '14E', '14F'],
];

export default function BookingModal({ 
  type = 'flight', 
  item, 
  onClose, 
  onBookingSuccess,
  onShowToast 
}) {
  const [step, setStep] = useState(1); // 1: Travellers, 2: Payment, 3: Boarding Pass
  
  // Passenger Form State
  const [travellerName, setTravellerName] = useState(localStorage.getItem('mmt_username') || 'Ajeet Kumar');
  const [travellerEmail, setTravellerEmail] = useState('ajeet.traveler@example.com');
  const [travellerPhone, setTravellerPhone] = useState('9876543210');
  const [selectedSeat, setSelectedSeat] = useState('12A');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [copiedPnr, setCopiedPnr] = useState(false);

  if (!item) return null;

  const basePrice = type === 'flight' ? item.price : item.pricePerNight * 2;
  const taxes = type === 'flight' ? Math.round(basePrice * 0.12) : (item.taxes || 2500);
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, basePrice + taxes - discountAmount);

  const handleApplyCoupon = async (codeToApply) => {
    const code = codeToApply || couponCode;
    if (!code) return;
    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      const res = await validateCoupon(code, basePrice + taxes);
      if (res.valid) {
        setAppliedCoupon(res);
        setCouponCode(res.code);
        onShowToast?.(`🎉 Coupon ${res.code} applied! Saved ₹${res.discount}`, 'success');
      } else {
        setCouponError(res.message || 'Invalid coupon code');
        onShowToast?.('Invalid coupon code', 'error');
      }
    } catch (e) {
      setCouponError('Could not validate coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!travellerName || !travellerEmail || !travellerPhone) {
      alert('Please fill all passenger details.');
      return;
    }
    setStep(2);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    const bookingPayload = {
      type,
      item: {
        ...item,
        selectedSeats: [selectedSeat]
      },
      travellers: [
        { name: travellerName, age: 28, gender: 'Male' }
      ],
      contact: { email: travellerEmail, phone: travellerPhone },
      totalAmount: finalTotal,
      discount: discountAmount,
      paymentMethod
    };

    try {
      const res = await createBooking(bookingPayload);
      if (res.success && res.booking) {
        setConfirmedBooking(res.booking);
        setStep(3);
        onBookingSuccess?.(res.booking);
        onShowToast?.(`Booking Confirmed! PNR: ${res.booking.pnr}`, 'success');
        
        // Confetti celebration
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.55 }
        });
      }
    } catch (err) {
      alert('Payment processing error, please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const handleCopyPnr = (pnr) => {
    navigator.clipboard?.writeText?.(pnr);
    setCopiedPnr(true);
    setTimeout(() => setCopiedPnr(false), 2000);
    onShowToast?.(`Copied PNR: ${pnr}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/30">
              {type === 'flight' ? <Plane className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                {step === 3 
                  ? 'Official E-Ticket & Boarding Pass' 
                  : type === 'flight' 
                    ? `Review & Book: ${item.airline} ${item.flightNumber}` 
                    : `Reserve Stay: ${item.name}`}
              </h3>
              <p className="text-xs text-blue-200/80 font-medium">
                {step === 1 && 'Step 1 of 2: Passenger Details & Interactive Seat Selection'}
                {step === 2 && 'Step 2 of 2: Promo Discount & Payment Simulation'}
                {step === 3 && 'Booking Confirmed • Ready to Download or Print'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[82vh] overflow-y-auto">
          
          {/* STEP 1: Travellers & Seat Picker */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Summary Itinerary Card */}
              <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200/90 shadow-2xs">
                {type === 'flight' ? (
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{item.from.code} → {item.to.code}</span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">Non-Stop</span>
                      </div>
                      <p className="text-slate-500 font-medium mt-0.5">{item.from.city} to {item.to.city}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900">{item.departureTime} - {item.arrivalTime}</span>
                      <p className="text-slate-500 font-medium mt-0.5">{item.duration} • Terminal 3</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-black text-slate-900 text-sm">{item.name}</span>
                      <p className="text-slate-500 font-medium mt-0.5">{item.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{item.roomType}</span>
                      <p className="text-emerald-700 font-semibold">{item.cancellationPolicy}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Contact & Passenger */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-600" />
                  Primary Passenger / Guest Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Full Name (as per Govt ID)</label>
                    <input 
                      type="text" 
                      value={travellerName} 
                      onChange={(e) => setTravellerName(e.target.value)} 
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-bold text-slate-800"
                      placeholder="e.g. Ajeet Kumar"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email ID (for E-Ticket & SMS)</label>
                    <input 
                      type="email" 
                      value={travellerEmail} 
                      onChange={(e) => setTravellerEmail(e.target.value)} 
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-bold text-slate-800"
                      placeholder="ajeet@example.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Mobile Number (for SMS & WhatsApp boarding pass)</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 font-bold text-xs">
                        +91
                      </span>
                      <input 
                        type="tel" 
                        value={travellerPhone} 
                        onChange={(e) => setTravellerPhone(e.target.value)} 
                        required
                        className="w-full p-2.5 rounded-r-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-bold text-slate-800"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Airplane Seat Selector */}
              {type === 'flight' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-blue-600" />
                      Select Airplane Seat
                    </h4>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Selected Seat: {selectedSeat}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                    <div className="text-[10px] text-slate-400 font-black mb-2 flex justify-between px-3 uppercase tracking-wider">
                      <span>Window</span>
                      <span>Middle</span>
                      <span>Aisle</span>
                      <span className="text-slate-300">|</span>
                      <span>Aisle</span>
                      <span>Middle</span>
                      <span>Window</span>
                    </div>

                    <div className="space-y-2 inline-block">
                      {SAMPLE_SEATS.map((row, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-1.5 justify-center">
                          {row.slice(0, 3).map(seat => (
                            <button
                              key={seat}
                              type="button"
                              onClick={() => { setSelectedSeat(seat); onShowToast?.(`Selected Seat: ${seat}`, 'info'); }}
                              className={`w-9 h-8 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                selectedSeat === seat 
                                  ? 'bg-blue-600 text-white shadow-md shadow-blue-300 scale-105' 
                                  : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50/50'
                              }`}
                            >
                              {seat}
                            </button>
                          ))}
                          <div className="w-4"></div>
                          {row.slice(3, 6).map(seat => (
                            <button
                              key={seat}
                              type="button"
                              onClick={() => { setSelectedSeat(seat); onShowToast?.(`Selected Seat: ${seat}`, 'info'); }}
                              className={`w-9 h-8 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                selectedSeat === seat 
                                  ? 'bg-blue-600 text-white shadow-md shadow-blue-300 scale-105' 
                                  : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50/50'
                              }`}
                            >
                              {seat}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Price & CTA */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-bold">Total Fare</span>
                  <span className="text-2xl font-black text-slate-900">₹{(basePrice + taxes).toLocaleString('en-IN')}</span>
                </div>

                <button 
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Coupons & Simulated Payment */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Promo Code Box */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4.5 border border-amber-200 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-black text-amber-950 uppercase tracking-wider">Apply Promo Code</span>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="ENTER COUPON (e.g. HDFCFLY)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3.5 py-2 text-xs uppercase font-black rounded-xl border border-amber-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  <button 
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    disabled={isApplyingCoupon}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isApplyingCoupon ? 'Verifying...' : 'Apply'}
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="mt-3 flex items-center justify-between text-xs text-emerald-800 font-bold bg-emerald-100 p-2.5 rounded-xl border border-emerald-200">
                    <span>✨ {appliedCoupon.message}</span>
                    <button 
                      onClick={() => setAppliedCoupon(null)} 
                      className="text-rose-600 hover:underline cursor-pointer text-[11px] font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="mt-2 text-xs text-rose-600 font-bold">{couponError}</p>
                )}

                {/* 1-Click Promo Buttons */}
                <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                  {['HDFCFLY', 'LUXESTAY', 'MMTFREE'].map(c => (
                    <button 
                      key={c}
                      type="button"
                      onClick={() => handleApplyCoupon(c)}
                      className="bg-white border border-amber-200 hover:border-amber-400 text-amber-950 px-2.5 py-1 rounded-lg font-black cursor-pointer shadow-2xs"
                    >
                      Use <span className="underline">{c}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">Select Payment Gateway</h4>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {[
                    { id: 'upi', label: 'UPI / Scan QR', icon: Smartphone },
                    { id: 'card', label: 'Card Payment', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', icon: Sparkles }
                  ].map(m => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-black shadow-xs ring-2 ring-blue-100' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[11px] text-center font-bold">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-black text-slate-900">Instant UPI Payment Simulation</p>
                        <p className="text-[10px] text-slate-400">Zero surcharge • Google Pay, PhonePe, Paytm</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-black">
                      VERIFIED
                    </span>
                  </div>
                )}
              </div>

              {/* Fare Summary Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Base Flight Fare (1 Adult)</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Taxes & Airport Development Surcharges</span>
                  <span>₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-black">
                    <span>Discount Applied ({appliedCoupon.code})</span>
                    <span>- ₹{appliedCoupon.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black text-slate-900 text-base">
                  <span>Total Payable</span>
                  <span className="text-2xl text-blue-600 tracking-tight">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>

                <button 
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isProcessing ? 'Authorizing Payment...' : `PAY & CONFIRM ₹${finalTotal.toLocaleString('en-IN')}`}</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Authentic Boarding Pass Voucher */}
          {step === 3 && confirmedBooking && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              
              {/* Confirmed Banner */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Trip Confirmed!</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Confirmation sent to <strong className="text-slate-800">{travellerEmail}</strong>
                </p>
              </div>

              {/* Perforated Boarding Pass Card */}
              <div className="print-ticket-area bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 text-left relative overflow-hidden shadow-2xl border border-slate-700">
                
                {/* Airplane Watermark Background */}
                <Plane className="absolute right-[-25px] bottom-[-25px] w-52 h-52 text-white/5 pointer-events-none" />

                {/* Perforation Notches on sides */}
                <div className="ticket-notch-left"></div>
                <div className="ticket-notch-right"></div>

                {/* Header Strip */}
                <div className="flex justify-between items-start border-b border-dashed border-slate-700 pb-4 mb-4">
                  <div>
                    <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
                      OFFICIAL BOARDING PASS
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-slate-400">PNR:</span>
                      <strong className="text-amber-400 text-sm font-mono tracking-wider">{confirmedBooking.pnr}</strong>
                      <button 
                        onClick={() => handleCopyPnr(confirmedBooking.pnr)}
                        className="text-slate-400 hover:text-white cursor-pointer ml-1"
                        title="Copy PNR"
                      >
                        {copiedPnr ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-white">{type === 'flight' ? confirmedBooking.item.airline : 'MMT LUXE STAYS'}</span>
                    <p className="text-[10px] text-slate-400 font-mono">ID: {confirmedBooking.id}</p>
                  </div>
                </div>

                {type === 'flight' ? (
                  <div className="space-y-4">
                    {/* Airports & Flight Path */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-black tracking-tight">{confirmedBooking.item.from.code}</span>
                        <p className="text-xs text-slate-300 font-medium">{confirmedBooking.item.from.city}</p>
                        <p className="text-xs text-amber-400 font-black mt-1">{confirmedBooking.item.departureTime}</p>
                      </div>

                      <div className="flex flex-col items-center px-4">
                        <span className="text-[10px] text-slate-400 font-bold">{confirmedBooking.item.duration}</span>
                        <div className="w-28 h-0.5 bg-slate-600 relative my-1.5">
                          <Plane className="w-3.5 h-3.5 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <span className="text-[10px] text-emerald-400 font-black uppercase">NON-STOP</span>
                      </div>

                      <div className="text-right">
                        <span className="text-3xl font-black tracking-tight">{confirmedBooking.item.to.code}</span>
                        <p className="text-xs text-slate-300 font-medium">{confirmedBooking.item.to.city}</p>
                        <p className="text-xs text-amber-400 font-black mt-1">{confirmedBooking.item.arrivalTime}</p>
                      </div>
                    </div>

                    {/* Flight Specs Grid */}
                    <div className="grid grid-cols-4 gap-2 bg-white/5 p-3.5 rounded-2xl border border-white/10 text-xs mt-3">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-black block">Passenger</span>
                        <strong className="text-white text-xs truncate block">{travellerName}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-black block">Seat</span>
                        <strong className="text-amber-400 text-xs">{selectedSeat}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-black block">Gate</span>
                        <strong className="text-emerald-400 text-xs">G-42 (T3)</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-black block">Boarding</span>
                        <strong className="text-white text-xs">05:40 AM</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-black text-white">{confirmedBooking.item.name}</h4>
                      <p className="text-xs text-slate-300 font-medium">{confirmedBooking.item.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-black block">Primary Guest</span>
                        <strong className="text-white">{travellerName}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-black block">Room</span>
                        <strong className="text-amber-400">{confirmedBooking.item.roomType}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Barcode & Total */}
                <div className="mt-5 pt-4 border-t border-dashed border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <QrCode className="w-9 h-9 text-white/95" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">SECURE ELECTRONIC PASS</span>
                      <span className="text-[9px] text-slate-500 font-mono">Present barcode at terminal gate</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Amount Paid</span>
                    <strong className="text-emerald-400 text-base font-black">₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handlePrintTicket}
                  className="flex-1 py-3.5 rounded-2xl border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4 text-blue-600" />
                  <span>Print / Save PDF Ticket</span>
                </button>

                <button 
                  onClick={onClose}
                  className="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-300 cursor-pointer transition-all hover:scale-102"
                >
                  Done & Back to Home
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
