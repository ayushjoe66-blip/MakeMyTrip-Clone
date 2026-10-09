import React from 'react';
import { Smartphone, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs">
      {/* Top Banner App Promo */}
      <div className="border-b border-slate-800 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Download the MakeMyTrip Mobile App</h3>
              <p className="text-xs text-slate-400 mt-0.5">Use code WELCOME2026 to get Flat 15% OFF on your very first booking!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors">
              iOS App Store
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors">
              Google Play Store
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">Popular Flight Routes</h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li><a href="#" className="hover:text-white">Delhi to Mumbai Flights</a></li>
            <li><a href="#" className="hover:text-white">Delhi to Bengaluru Flights</a></li>
            <li><a href="#" className="hover:text-white">Mumbai to Goa Flights</a></li>
            <li><a href="#" className="hover:text-white">Delhi to Dubai Flights</a></li>
            <li><a href="#" className="hover:text-white">Bengaluru to Kolkata Flights</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">Top Hotel Destinations</h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li><a href="#" className="hover:text-white">Luxury Hotels in Goa</a></li>
            <li><a href="#" className="hover:text-white">5 Star Hotels in Mumbai</a></li>
            <li><a href="#" className="hover:text-white">Heritage Hotels in Jaipur</a></li>
            <li><a href="#" className="hover:text-white">Boutique Resorts in Kashmir</a></li>
            <li><a href="#" className="hover:text-white">Top Stays in New Delhi</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">About MakeMyTrip</h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Investor Relations</a></li>
            <li><a href="#" className="hover:text-white">Careers at MMT</a></li>
            <li><a href="#" className="hover:text-white">MMT Foundation</a></li>
            <li><a href="#" className="hover:text-white">Corporate Travel Desk</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">Support & Policies</h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li><a href="#" className="hover:text-white">Customer Support 24x7</a></li>
            <li><a href="#" className="hover:text-white">User Agreement & Terms</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Security & Fraud Advisory</a></li>
            <li><a href="#" className="hover:text-white">Flight Cancellation Guidelines</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 MAKEMYTRIP INDIA PVT. LTD. Country: India, USA, UAE</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for seamless Indian & Global travel experiences.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
