import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  PieChart,
  BarChart,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Percent,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export const AnalyticsView: React.FC = () => {
  const { mode, currentIncome, currentExpense, currentBalance, formatAmount, setActiveTab } =
    useFinance();

  const [activeTab, setActiveTabState] = useState<'expense' | 'income' | 'general'>('expense');

  // Days and heights for realistic monthly spending bar chart
  const monthlyData = [
    { day: '1', value: 45, label: '1-may', amount: 180000 },
    { day: '5', value: 75, label: '5-may', amount: 350000 },
    { day: '10', value: 30, label: '10-may', amount: 120000 },
    { day: '15', value: 90, label: '15-may', amount: 480000, isPeak: true },
    { day: '20', value: 60, label: '20-may', amount: 260000 },
    { day: '25', value: 80, label: '25-may', amount: 390000 },
    { day: '30', value: 50, label: '30-may', amount: 210000 },
  ];

  // Categories breakdown
  const personalCategories = [
    { name: 'Oziq-ovqat', percent: 38, color: 'bg-blue-500', hex: '#3B82F6', amount: 889200 },
    { name: 'Transport', percent: 22, color: 'bg-indigo-500', hex: '#6366F1', amount: 514800 },
    { name: 'Xizmatlar', percent: 15, color: 'bg-sky-400', hex: '#38BDF8', amount: 351000 },
    { name: 'Boshqalar', percent: 25, color: 'bg-purple-500', hex: '#A855F7', amount: 585000 },
  ];

  const businessCategories = [
    { name: 'Ish haqi & Xodimlar', percent: 45, color: 'bg-emerald-500', hex: '#10B981', amount: 9200000 },
    { name: 'Bino & Ijara', percent: 24, color: 'bg-blue-500', hex: '#3B82F6', amount: 3500000 },
    { name: 'Soliqlar (4% & Ijtimoiy)', percent: 18, color: 'bg-amber-500', hex: '#F59E0B', amount: 2250000 },
    { name: 'Server & IT Xarajatlar', percent: 13, color: 'bg-indigo-500', hex: '#6366F1', amount: 1100000 },
  ];

  const currentCategories = mode === 'personal' ? personalCategories : businessCategories;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl font-bold text-white">Analitika</h1>
        <p className="text-xs text-slate-400">
          {mode === 'personal'
            ? 'Xarajatlar va daromadlar dinamikasi'
            : 'Biznes kassa, marja va soliq tahlili'}
        </p>
      </div>

      {/* Tabs: Xarajatlar, Kirimlar, Umumiy (Showcase Match) */}
      <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveTabState('expense')}
          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'expense'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Xarajatlar
        </button>
        <button
          onClick={() => setActiveTabState('income')}
          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'income'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Kirimlar
        </button>
        <button
          onClick={() => setActiveTabState('general')}
          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'general'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Umumiy
        </button>
      </div>

      {/* Summary Stat Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1836] to-[#080d1a] border border-blue-900/40 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {activeTab === 'expense'
              ? 'Jami xarajatlar'
              : activeTab === 'income'
              ? 'Jami daromad'
              : 'Sof balans o\'sishi'}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-12%</span>
          </div>
        </div>

        <div className="mt-2">
          <h2 className="text-3xl font-extrabold text-white font-mono">
            {activeTab === 'expense'
              ? formatAmount(currentExpense)
              : activeTab === 'income'
              ? formatAmount(currentIncome)
              : formatAmount(currentIncome - currentExpense)}
          </h2>
          <span className="text-[11px] text-slate-400 mt-1 block">
            O'tgan oy bilan solishtirganda tejash ko'rsatkichi yaxshilangan
          </span>
        </div>

        {/* Dynamic Glowing Bar Chart (Exact showcase visual match) */}
        <div className="mt-8 pt-4 border-t border-slate-800/80">
          <div className="h-44 flex items-end justify-between gap-2 px-2">
            {monthlyData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                {/* Tooltip on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap -mb-1">
                  {item.amount.toLocaleString()}
                </span>

                {/* Vertical Bar */}
                <div
                  className="w-full max-w-[28px] rounded-t-xl transition-all duration-300 relative group-hover:scale-105"
                  style={{
                    height: `${item.value * 1.5}px`,
                    background: item.isPeak
                      ? 'linear-gradient(180deg, #38BDF8 0%, #2563EB 100%)'
                      : 'linear-gradient(180deg, #2563EB 0%, #1E3A8A 100%)',
                    boxShadow: item.isPeak
                      ? '0 0 18px rgba(56, 189, 248, 0.5)'
                      : '0 0 10px rgba(37, 99, 235, 0.2)',
                  }}
                />

                {/* Day label */}
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-blue-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown (Kategoriya bo'yicha donut & legend) */}
      <div className="p-6 rounded-3xl bg-[#0c1322] border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-sm font-bold text-white">Kategoriya bo'yicha</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Circular Donut Diagram SVG */}
          <div className="flex justify-center relative">
            <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#1e293b"
                strokeWidth="12"
              />
              {/* Arc 1: 38% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset={238.7 * (1 - 0.38)}
                strokeLinecap="round"
              />
              {/* Arc 2: 22% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#6366F1"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset={238.7 * (1 - 0.22)}
                transform="rotate(136.8 50 50)"
                strokeLinecap="round"
              />
              {/* Arc 3: 15% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#38BDF8"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset={238.7 * (1 - 0.15)}
                transform="rotate(216 50 50)"
                strokeLinecap="round"
              />
              {/* Arc 4: 25% */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="transparent"
                stroke="#A855F7"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset={238.7 * (1 - 0.25)}
                transform="rotate(270 50 50)"
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Asosiy</span>
              <span className="text-sm font-bold text-white font-mono">
                {currentCategories[0].name}
              </span>
              <span className="text-xs font-semibold text-blue-400">
                {currentCategories[0].percent}%
              </span>
            </div>
          </div>

          {/* Legend and Percentages (Matches showcase screen) */}
          <div className="space-y-3">
            {currentCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-slate-300 font-medium">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {formatAmount(cat.amount)}
                  </span>
                  <span className="font-bold text-white font-mono w-9 text-right">
                    {cat.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight trigger button */}
        <div className="pt-2">
          <button
            onClick={() => setActiveTab('ai')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 hover:from-blue-900/60 hover:to-indigo-900/60 border border-blue-500/30 text-xs font-semibold text-blue-300 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>AI orqali ushbu xarajatlarni batafsil tahlil qilish</span>
          </button>
        </div>
      </div>
    </div>
  );
};
