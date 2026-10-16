import React from 'react';
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  PlusCircle,
  CreditCard,
  Zap,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Smartphone,
  Wifi,
  ShoppingBag,
  Building,
  CheckCircle2,
  Users,
  ChevronRight,
  Briefcase,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Transaction } from '../types/finance';

export const DashboardView: React.FC = () => {
  const {
    mode,
    currentBalance,
    currentIncome,
    currentExpense,
    currentTransactions,
    hideBalance,
    setHideBalance,
    formatAmount,
    setActiveTab,
    setActiveModal,
    setLastReceipt,
    triggerAutoSalary,
    autoSalaryConfig,
  } = useFinance();

  // Helper for transaction category icon
  const getCategoryIcon = (iconName: string, category: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-sky-400" />;
      case 'ShoppingBag':
      case 'ShoppingCart':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'ArrowDownLeft':
        return <ArrowDownLeft className="w-5 h-5 text-emerald-400" />;
      case 'ArrowUpRight':
        return <ArrowUpRight className="w-5 h-5 text-amber-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'Building':
        return <Building className="w-5 h-5 text-rose-400" />;
      default:
        return category.toLowerCase().includes('soliq') ? (
          <Building className="w-5 h-5 text-amber-400" />
        ) : (
          <CreditCard className="w-5 h-5 text-blue-400" />
        );
    }
  };

  const handleTransactionClick = (tx: Transaction) => {
    setLastReceipt(tx);
    setActiveModal('receipt');
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Primary Account Card (Asosiy Hisob) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1836] via-[#091326] to-[#060b17] border border-blue-900/40 p-6 sm:p-7 shadow-2xl shadow-blue-950/40">
        {/* Glow backdrop elements */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                {mode === 'personal' ? 'Asosiy hisob' : 'Kompaniya asosiy hisob raqami'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <button
              onClick={() => setHideBalance((prev) => !prev)}
              className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors"
              title={hideBalance ? "Balansni ko'rsatish" : 'Balansni yashirish'}
            >
              {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Large Balance Display */}
          <div className="mt-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
              {formatAmount(currentBalance)}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'personal'
                ? 'XPAY Virtual Visa & Uzcard birlashtirilgan qoldiq'
                : 'TechPro Solutions MCHJ · Xisob: 2020 8000 9051 4412 0001'}
            </p>
          </div>

          {/* Income & Expense Breakdown Pills */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {/* Kirimlar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Kirimlar</span>
              </div>
              <p className="mt-1.5 text-base sm:text-lg font-bold text-emerald-300 font-mono">
                +{formatAmount(currentIncome)}
              </p>
              <span className="text-[10px] text-slate-400">Joriy oy uchun</span>
            </div>

            {/* Chiqimlar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/25 border border-rose-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold">
                <TrendingDown className="w-4 h-4" />
                <span>Chiqimlar</span>
              </div>
              <p className="mt-1.5 text-base sm:text-lg font-bold text-rose-300 font-mono">
                -{formatAmount(currentExpense)}
              </p>
              <span className="text-[10px] text-slate-400">Joriy oy uchun</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quick Action Buttons */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {/* Yuborish */}
        <button
          onClick={() => setActiveModal('send')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#0e172a]/90 hover:bg-[#131f38] border border-slate-800 hover:border-blue-500/40 transition-all group shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shadow-blue-500/10">
            <Send className="w-5 h-5 -rotate-45" />
          </div>
          <span className="text-xs font-medium text-slate-200 mt-2">Yuborish</span>
        </button>

        {/* To'ldirish */}
        <button
          onClick={() => setActiveModal('topup')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#0e172a]/90 hover:bg-[#131f38] border border-slate-800 hover:border-sky-500/40 transition-all group shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-600/20 text-sky-400 border border-sky-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-md shadow-sky-500/10">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-slate-200 mt-2">To'ldirish</span>
        </button>

        {/* To'lov */}
        <button
          onClick={() => setActiveModal('pay')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#0e172a]/90 hover:bg-[#131f38] border border-slate-800 hover:border-indigo-500/40 transition-all group shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md shadow-indigo-500/10">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-slate-200 mt-2">To'lov</span>
        </button>

        {/* Kartalar */}
        <button
          onClick={() => setActiveTab('card')}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#0e172a]/90 hover:bg-[#131f38] border border-slate-800 hover:border-emerald-500/40 transition-all group shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md shadow-emerald-500/10">
            <CreditCard className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium text-slate-200 mt-2">Kartalar</span>
        </button>
      </div>

      {/* Auto-Salary Smart Allocation Card (Requested by user) */}
      {mode === 'personal' ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Avto-Oylik & Jamg'arma Tizimi</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Faol
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Oylik maosh tushishi bilan <span className="text-blue-300 font-semibold">{autoSalaryConfig.autoSaveToGoalPercent}%</span> mablag'
                  maqsadga, <span className="text-sky-300 font-semibold">{autoSalaryConfig.autoTransferToCardPercent}%</span> mablag' esa avtomatik virtual kartaga yig'iladi.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => triggerAutoSalary()}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap"
              >
                Oylik tushumini sinash
              </button>
              <button
                onClick={() => setActiveModal('autoSalary')}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Sozlamalar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Business Quick Summary Card */
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400">
                <Briefcase className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Biznes Moliyaviy Holati</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                    Sof foyda: 56.7%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Kompaniya hisobidan oylik xarajatlar va soliqlar avtomatik hisoblab borilmoqda.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('savings')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all self-end sm:self-center"
            >
              Faktura va Oyliklar
            </button>
          </div>
        </div>
      )}

      {/* AI Smart Assistant Banner */}
      <div
        onClick={() => setActiveTab('ai')}
        className="cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-blue-500/30 hover:border-blue-400/60 transition-all flex items-center justify-between group shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">XPAY AI Tahlilchisi</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-medium">
                Gemini 3.8
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {mode === 'personal'
                ? "Bu oyda transport xarajatlarini 12% tejash bo'yicha shaxsiy maslahat tayyor."
                : 'Kesh-flou barqaror: Kelgusi oy kutilayotgan tushum +38,000,000 so\'m.'}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Video Darslar (Masterclass) Quick Banner */}
      <div
        onClick={() => setActiveTab('academy')}
        className="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-cyan-950/50 hover:border-cyan-500/40 border border-indigo-500/30 transition-all flex items-center justify-between group shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">XPAY Video Darslar & Masterclass</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
                8 ta video
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pul sirlari, 0 dan biznes, kripto treyding va kiberxavfsizlik darslari.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
          <span>O'rganish</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Recent Transactions (So'nggi tranzaksiyalar) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">So'nggi tranzaksiyalar</h2>
          <button
            onClick={() => setActiveTab('transactions')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Barchasi
          </button>
        </div>

        <div className="divide-y divide-slate-800/70 rounded-2xl bg-[#0c1322] border border-slate-800/90 overflow-hidden shadow-lg">
          {currentTransactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              onClick={() => handleTransactionClick(tx)}
              className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                  {getCategoryIcon(tx.iconName, tx.category)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">{tx.title}</h4>
                  <p className="text-[11px] text-slate-400">
                    {tx.date}, {tx.time} {tx.note && `· ${tx.note}`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-xs sm:text-sm font-bold font-mono ${
                    tx.type === 'income' ? 'text-emerald-400' : 'text-slate-100'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}
                  {formatAmount(tx.amount)}
                </p>
                <span className="text-[10px] text-slate-500">Muvaffaqiyatli</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
