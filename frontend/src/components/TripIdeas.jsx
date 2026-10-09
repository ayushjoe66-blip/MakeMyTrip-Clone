import React from 'react';
import { Palmtree, ArrowRight, ShieldCheck, HeartHandshake, Award, Clock } from 'lucide-react';

const DESTINATIONS = [
  {
    city: 'Goa',
    tag: 'Beach Paradise',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    flightsFrom: '₹3,150',
    hotelsFrom: '₹1,899/night'
  },
  {
    city: 'Dubai',
    tag: 'Luxury Skyline & Desert',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80',
    flightsFrom: '₹14,200',
    hotelsFrom: '₹8,500/night'
  },
  {
    city: 'Kashmir',
    tag: 'Paradise on Earth',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
    flightsFrom: '₹6,400',
    hotelsFrom: '₹3,200/night'
  },
  {
    city: 'Jaipur',
    tag: 'Royal Heritage & Forts',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80',
    flightsFrom: '₹3,899',
    hotelsFrom: '₹2,499/night'
  }
];

export default function TripIdeas({ onSelectDestination }) {
  return (
    <section className="bg-slate-50 border-y border-slate-200/70 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-blue-600 font-extrabold text-xs uppercase tracking-wider block mb-1">
              Top Trending Getaways
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Handpicked Destinations For Your Next Escape
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Curated vacation packages with verified stays, flexible cancellations, and unbeatable flight combos.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => (
            <div 
              key={dest.city}
              onClick={() => onSelectDestination?.(dest.city)}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {dest.tag}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {dest.city}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Flights starting:</span>
                    <strong className="text-slate-800 font-black">{dest.flightsFrom}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Top resorts starting:</span>
                    <strong className="text-slate-800 font-black">{dest.hotelsFrom}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why MakeMyTrip Badges */}
        <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: '100% Secure Payments', desc: 'Encrypted multi-layer UPI & Card gateway protection' },
            { icon: Award, title: 'Best Fare Guarantee', desc: 'Transparent fares with zero hidden charges or surprises' },
            { icon: Clock, title: '24x7 Customer Helpline', desc: 'Real-time booking support & airport desk assistance' },
            { icon: HeartHandshake, title: 'Instant Refunds', desc: 'Cancellations processed directly to original source within minutes' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
