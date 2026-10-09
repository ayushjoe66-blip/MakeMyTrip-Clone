import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

export default function OffersCarousel({ offers = [], onSelectCoupon }) {
  const [activeTab, setActiveTab] = useState('All');
  const [copiedCode, setCopiedCode] = useState(null);

  const categories = ['All', 'Flights', 'Hotels', 'Holidays'];

  const filteredOffers = activeTab === 'All' 
    ? offers 
    : offers.filter(o => o.category.toLowerCase() === activeTab.toLowerCase());

  const handleCopy = (code) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Exclusive Deals & Discounts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Offers Picked Just For You
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl text-xs font-bold">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === cat 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredOffers.map((offer) => (
          <div 
            key={offer.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${offer.bgGradient || 'from-blue-600 to-indigo-600'}`} />

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {offer.tag || offer.category}
              </span>

              <h3 className="text-base font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors leading-snug">
                {offer.title}
              </h3>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Coupon Code</span>
                <span className="text-xs font-black font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {offer.code}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(offer.code)}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
