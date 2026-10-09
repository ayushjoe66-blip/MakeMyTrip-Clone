import React from 'react';
import { 
  Plane, 
  Building2, 
  Home, 
  Palmtree, 
  Train, 
  Bus, 
  Car, 
  ShieldCheck,
  Flame
} from 'lucide-react';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const categories = [
    { id: 'flights', label: 'Flights', icon: Plane, badge: null },
    { id: 'hotels', label: 'Hotels', icon: Building2, badge: 'UP TO 40% OFF' },
    { id: 'homestays', label: 'Homestays & Villas', icon: Home, badge: null },
    { id: 'holidays', label: 'Holiday Packages', icon: Palmtree, badge: 'SUMMER DEAL' },
    { id: 'trains', label: 'Trains', icon: Train, badge: null },
    { id: 'buses', label: 'Buses', icon: Bus, badge: null },
    { id: 'cabs', label: 'Airport Cabs', icon: Car, badge: null },
    { id: 'insurance', label: 'Travel Insurance', icon: ShieldCheck, badge: null },
  ];

  return (
    <div className="relative z-20 -mb-10 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 sm:p-3 overflow-x-auto scrollbar-none flex items-center justify-between gap-1 sm:gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex flex-col items-center justify-center min-w-[80px] sm:min-w-[96px] py-2 px-1.5 rounded-xl transition-all duration-200 cursor-pointer group ${
                isActive 
                  ? 'text-blue-600 font-bold bg-blue-50/80 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat.badge && (
                <span className="absolute -top-2 scale-90 sm:scale-100 bg-rose-600 text-[9px] font-black tracking-wider text-white px-1.5 py-0.2 rounded-full uppercase shadow-xs whitespace-nowrap">
                  {cat.badge}
                </span>
              )}
              <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${
                isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-300' : 'text-slate-500'
              }`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] sm:text-xs mt-1.5 whitespace-nowrap text-center">
                {cat.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-2 w-8 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
