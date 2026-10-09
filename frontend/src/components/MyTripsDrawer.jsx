import React from 'react';
import { X, Plane, Building2, Ticket, QrCode, Download, Calendar, MapPin } from 'lucide-react';

export default function MyTripsDrawer({ isOpen, onClose, bookings = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-black">My Bookings</h3>
              <p className="text-[11px] text-slate-400">{bookings.length} Confirmed Trip(s)</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-700">No Bookings Yet</h4>
              <p className="text-xs text-slate-400 mt-1">Book your first flight or luxury hotel to see your e-tickets here.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {booking.status}
                  </span>
                  <span className="font-mono text-slate-500 font-bold">
                    PNR: <strong className="text-slate-900">{booking.pnr}</strong>
                  </span>
                </div>

                {booking.type === 'flight' ? (
                  <div>
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-blue-600" />
                      <span className="font-black text-sm text-slate-900">
                        {booking.item.from.code} → {booking.item.to.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {booking.item.airline} • {booking.item.flightNumber} • Seat {booking.seats?.[0] || '12A'}
                    </p>
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      Time: {booking.item.departureTime} - {booking.item.arrivalTime}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      <span className="font-black text-sm text-slate-900">
                        {booking.item.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {booking.item.city} • {booking.item.roomType}
                    </p>
                  </div>
                )}

                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Paid: <strong className="text-slate-900">₹{booking.totalAmount?.toLocaleString('en-IN')}</strong></span>
                  <button 
                    onClick={() => alert(`Simulated downloading e-ticket for PNR: ${booking.pnr}`)}
                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
}
