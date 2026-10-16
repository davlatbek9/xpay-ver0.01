import React from 'react';
import {
  Home,
  Receipt,
  CreditCard,
  BarChart3,
  Bot,
  UserCircle,
  PiggyBank,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, mode } = useFinance();

  const navItems = [
    { id: 'home', label: 'Bosh sahifa', icon: Home },
    { id: 'transactions', label: 'Tranzaksiyalar', icon: Receipt },
    { id: 'card', label: 'Karta', icon: CreditCard },
    { id: 'academy', label: 'Darslar', icon: GraduationCap },
    { id: 'analytics', label: 'Analitika', icon: BarChart3 },
    {
      id: 'savings',
      label: mode === 'personal' ? "Jamg'arma" : 'Biznes kassa',
      icon: mode === 'personal' ? PiggyBank : Briefcase,
    },
    { id: 'ai', label: 'XPAY AI', icon: Bot, isHighlight: true },
    { id: 'profile', label: 'Profil', icon: UserCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070b16]/95 backdrop-blur-xl border-t border-slate-800/90 py-1.5 px-1 sm:px-4 shadow-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 sm:px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.isHighlight ? (
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800/80 text-cyan-400 border border-cyan-500/30'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </div>
              ) : (
                <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-500/10' : ''}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}

              <span
                className={`text-[9px] sm:text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>

              {isActive && !item.isHighlight && (
                <span className="absolute bottom-0 w-3 h-0.5 rounded-full bg-cyan-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
