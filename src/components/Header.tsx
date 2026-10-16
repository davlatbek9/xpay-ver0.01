import React, { useState } from 'react';
import {
  Bell,
  CheckCircle,
  Building2,
  User,
  Sparkles,
  Zap,
  LogIn,
  GraduationCap,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { XPayLogo } from './XPayLogo';

export const Header: React.FC = () => {
  const {
    mode,
    setMode,
    currency,
    setCurrency,
    notifications,
    markNotificationsRead,
    setActiveModal,
    setActiveTab,
  } = useFinance();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="relative z-30 bg-[#080d1a]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Official XPAY Logo & Greeting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* New Official Vector Logo */}
            <div
              onClick={() => setActiveTab('home')}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <XPayLogo size={42} showWordmark={true} />
            </div>

            <div className="hidden sm:block pl-2 border-l border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {mode === 'personal' ? 'Shaxsiy hisob' : 'Biznes kassa'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === 'personal' ? (
                  <>
                    Salom, <span className="text-slate-200 font-medium">Davlatbek</span> 👋
                  </>
                ) : (
                  <>
                    <span className="text-emerald-400 font-medium">TechPro Solutions MCHJ</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setActiveModal('autoSync')}
              className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400"
              title="Avto hisob-kitob (Bank ulash)"
            >
              <Zap className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsRead();
              }}
              className="relative p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white"
              title="Bildirishnomalar"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#080d1a]" />
              )}
            </button>
          </div>
        </div>

        {/* Right: Controls & Mode Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-2.5 flex-wrap">
          {/* Dual Mode Switcher (Personal vs Business) */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
            <button
              onClick={() => setMode('personal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'personal'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Shaxsiy</span>
            </button>
            <button
              onClick={() => setMode('business')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'business'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Biznes</span>
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setCurrency('UZS')}
              className={`px-2 py-1 rounded-lg font-bold transition-all ${
                currency === 'UZS'
                  ? 'bg-slate-800 text-cyan-400 shadow'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              UZS
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2 py-1 rounded-lg font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-slate-800 text-cyan-400 shadow'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              USD
            </button>
          </div>

          {/* Auto-Sync Bank Integration Button (Answers user requirement) */}
          <button
            onClick={() => setActiveModal('autoSync')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:border-cyan-400 shadow-md transition-all active:scale-95"
            title="Avtomatik hisob-kitob (Bank & Karta ulash)"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">Avto-Hisob (Bank Ulash)</span>
            <span className="lg:hidden">Avto-Bank</span>
          </button>

          {/* Desktop Notifications */}
          <div className="relative hidden md:block">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsRead();
              }}
              className="relative p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Bildirishnomalar"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#080d1a]" />
              )}
            </button>

            {/* Notifications Popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl p-4 backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-white">Bildirishnomalar</h4>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {notifications.length} ta xabar
                  </span>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-semibold text-slate-200">{item.title}</h5>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowNotifications(false)}
                  className="mt-3 w-full py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  Yopish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
