import React, { useState } from 'react';
import {
  Shield,
  Sliders,
  Lock,
  Unlock,
  Copy,
  Check,
  Eye,
  EyeOff,
  Wifi,
  Sparkles,
  Zap,
  ShoppingBag,
  Fuel,
  Globe,
  Settings,
  CreditCard as CreditCardIcon,
  PlusCircle,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Transaction } from '../types/finance';
import { XPayLogo } from './XPayLogo';

export const CardView: React.FC = () => {
  const {
    currentCards,
    toggleCardFreeze,
    updateCardLimit,
    formatAmount,
    currentTransactions,
    setActiveModal,
    setLastReceipt,
    autoSalaryConfig,
    updateAutoSalaryConfig,
    triggerAutoSalary,
  } = useFinance();

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const card = currentCards[activeCardIndex] || currentCards[0];
  const [copied, setCopied] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [editingLimit, setEditingLimit] = useState(false);
  const [tempLimit, setTempLimit] = useState(card?.dailyLimit || 5000000);

  if (!card) return null;

  const handleCopyCard = () => {
    navigator.clipboard.writeText(card.cardNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveLimit = () => {
    updateCardLimit(card.id, Number(tempLimit));
    setEditingLimit(false);
  };

  const handleTransactionClick = (tx: Transaction) => {
    setLastReceipt(tx);
    setActiveModal('receipt');
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Virtual Karta</h1>
          <p className="text-xs text-slate-400">Xavfsiz onlayn to'lovlar va jamg'arma kartasi</p>
        </div>

        {/* Multi-card selector if more than 1 */}
        {currentCards.length > 1 && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {currentCards.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveCardIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCardIndex === idx
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.type.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Futuristic Glowing Virtual Card (Showcase Match) */}
      <div className="relative mx-auto max-w-md">
        <div
          className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white shadow-2xl transition-all duration-300 border ${
            card.status === 'frozen'
              ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 opacity-75 grayscale'
              : 'bg-gradient-to-br from-[#122858] via-[#103b8e] to-[#1c64d8] border-blue-400/30 glow-card'
          }`}
          style={{ minHeight: '230px' }}
        >
          {/* Hologram / wave mesh styling */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-blue-400/20 via-sky-500/10 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-radial from-indigo-500/30 to-transparent blur-2xl pointer-events-none" />

          {/* Top Row: Official XPAY Brand, Virtual Card Label, Contactless Icon */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <XPayLogo size={34} />
              <div>
                <span className="font-extrabold tracking-wider font-mono text-sm block text-white">
                  XPAY
                </span>
                <span className="text-[9px] text-cyan-200 tracking-wider uppercase block font-semibold">
                  Virtual Card
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-blue-200 rotate-90" />
              <div className="w-9 h-7 rounded-md bg-amber-400/30 border border-amber-300/60 flex items-center justify-center p-1">
                <div className="w-full h-full border border-amber-300/80 rounded-sm grid grid-cols-2 gap-0.5">
                  <div className="border-r border-b border-amber-300/80" />
                  <div className="border-b border-amber-300/80" />
                  <div className="border-r border-amber-300/80" />
                  <div />
                </div>
              </div>
            </div>
          </div>

          {/* Card Number */}
          <div className="mt-8 relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-slate-100">
                {showFullNumber ? card.cardNumber : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowFullNumber(!showFullNumber)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
                  title={showFullNumber ? 'Yashirish' : "Ko'rsatish"}
                >
                  {showFullNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleCopyCard}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
                  title="Nusxalash"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Holder, Expiry, CVV, Card Brand */}
          <div className="mt-6 flex items-end justify-between relative z-10 text-xs">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-blue-200/80 block">
                Karta egasi
              </span>
              <span className="font-semibold uppercase tracking-wider text-white">
                {card.cardHolder}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-blue-200/80 block">
                  Muddat
                </span>
                <span className="font-mono font-semibold text-white">{card.expiryDate}</span>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-blue-200/80 block">
                  CVV
                </span>
                <span
                  onClick={() => setShowCvv(!showCvv)}
                  className="font-mono font-semibold text-white cursor-pointer hover:underline"
                >
                  {showCvv ? card.cvv : '•••'}
                </span>
              </div>

              {/* VISA / Uzcard badge */}
              <div className="font-bold text-lg italic tracking-wider font-sans text-white/95">
                {card.type === 'visa' && 'VISA'}
                {card.type === 'uzcard' && 'UZCARD'}
                {card.type === 'humo' && 'HUMO'}
              </div>
            </div>
          </div>
        </div>

        {/* Card Frozen Notice */}
        {card.status === 'frozen' && (
          <div className="mt-2 text-center text-xs text-amber-400 font-medium">
            ⚠️ Karta vaqtinchalik muzlatilgan. To'lovlar amalga oshirilmaydi.
          </div>
        )}
      </div>

      {/* Card Status & Limits Panel (Showcase match) */}
      <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-4 shadow-lg">
        {/* Toggle Karta Holati */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-white">Karta holati</h3>
            <p className="text-xs text-slate-400">Onlayn va kontaktsiz operatsiyalar</p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold ${
                card.status === 'active' ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {card.status === 'active' ? 'Aktiv' : 'Muzlatilgan'}
            </span>
            <button
              onClick={() => toggleCardFreeze(card.id)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                card.status === 'active' ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  card.status === 'active' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Kunlik Limit */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-white">Kunlik limit</h3>
            <p className="text-xs text-slate-400">
              Bugun sarflandi: {formatAmount(card.currentDailySpent)}
            </p>
          </div>

          <div className="text-right">
            {editingLimit ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={tempLimit}
                  onChange={(e) => setTempLimit(Number(e.target.value))}
                  className="w-28 px-2 py-1 rounded bg-slate-900 border border-blue-500 text-xs font-mono text-white text-right"
                />
                <button
                  onClick={handleSaveLimit}
                  className="px-2 py-1 rounded bg-blue-600 text-xs text-white"
                >
                  OK
                </button>
              </div>
            ) : (
              <div
                onClick={() => setEditingLimit(true)}
                className="cursor-pointer group flex items-center gap-1.5"
              >
                <span className="text-sm font-bold text-white font-mono group-hover:text-blue-400">
                  {formatAmount(card.dailyLimit)}
                </span>
                <Sliders className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
              </div>
            )}
          </div>
        </div>

        {/* 3 Quick Action Controls */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          {/* Bloklash */}
          <button
            onClick={() => toggleCardFreeze(card.id)}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            {card.status === 'active' ? (
              <Lock className="w-5 h-5 text-rose-400" />
            ) : (
              <Unlock className="w-5 h-5 text-emerald-400" />
            )}
            <span className="text-xs font-medium text-slate-300 mt-1.5">
              {card.status === 'active' ? 'Bloklash' : 'Ochish'}
            </span>
          </button>

          {/* Sozlamalar */}
          <button
            onClick={() => setActiveModal('autoSalary')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <Settings className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-medium text-slate-300 mt-1.5">Sozlamalar</span>
          </button>

          {/* Limit o'rnatish */}
          <button
            onClick={() => setEditingLimit(!editingLimit)}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <Sliders className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-medium text-slate-300 mt-1.5">Limit</span>
          </button>
        </div>
      </div>

      {/* Auto-Salary to Virtual Card Section (User Requirement: "avto oylik tushishi bilay tashlash ham mumkin") */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Avtomatik Pul Yig'ish (Avto-Oylik)</h3>
              <p className="text-xs text-slate-400">
                Oylik maosh kelgan zahoti belgilangan foiz ushbu virtual kartada yig'iladi
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Kartaga avto-tashlash ulushi:</span>
            <span className="text-blue-400 font-bold font-mono text-sm">
              {autoSalaryConfig.autoTransferToCardPercent}% (~
              {formatAmount((autoSalaryConfig.expectedSalary * autoSalaryConfig.autoTransferToCardPercent) / 100)})
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="90"
            step="5"
            value={autoSalaryConfig.autoTransferToCardPercent}
            onChange={(e) => updateAutoSalaryConfig({ autoTransferToCardPercent: Number(e.target.value) })}
            className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              Rejali oylik sanasi: har oyning {autoSalaryConfig.salaryDayOfMonth}-sanasi
            </span>
            <button
              onClick={() => triggerAutoSalary()}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
            >
              Hozir oylik tushirish
            </button>
          </div>
        </div>
      </div>

      {/* Karta tranzaksiyalari (Transactions tied to card) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Karta tranzaksiyalari</h2>
          <span className="text-xs text-slate-400">Oxirgi harakatlar</span>
        </div>

        <div className="divide-y divide-slate-800/70 rounded-2xl bg-[#0c1322] border border-slate-800 overflow-hidden shadow-lg">
          {currentTransactions.slice(0, 4).map((tx) => (
            <div
              key={tx.id}
              onClick={() => handleTransactionClick(tx)}
              className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                  {tx.category === 'Transport' ? (
                    <Fuel className="w-5 h-5 text-amber-400" />
                  ) : tx.category === 'Ta\'lim' ? (
                    <Globe className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white">{tx.title}</h4>
                  <p className="text-[11px] text-slate-400">
                    {tx.date}, {tx.time}
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
                <span className="text-[10px] text-slate-500">{card.cardNumber.slice(-8)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
