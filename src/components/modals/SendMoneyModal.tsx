import React, { useState } from 'react';
import { X, ShieldCheck, User, CreditCard, Building2, Check } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const SendMoneyModal: React.FC = () => {
  const { activeModal, setActiveModal, sendMoney, currentBalance, formatAmount } = useFinance();

  const [activeTab, setActiveTab] = useState<'phone' | 'card' | 'bank'>('phone');
  const [recipient, setRecipient] = useState('+998 90 123 45 67');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (activeModal !== 'send') return null;

  const quickAmounts = [50000, 100000, 200000, 500000];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);

    if (!recipient.trim()) {
      setError('Qabul qiluvchi ma\'lumotini kiriting');
      return;
    }
    if (!numAmount || numAmount <= 0) {
      setError('To\'lov summasini kiriting');
      return;
    }
    if (numAmount > currentBalance) {
      setError(`Balansda yetarli mablag' yo'q (Mavjud: ${formatAmount(currentBalance)})`);
      return;
    }

    sendMoney({
      recipient,
      method: activeTab,
      amount: numAmount,
      note: note || undefined,
      category: "O'tkazmalar",
    });

    setActiveModal('receipt');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-[#0a101f] border border-blue-900/40 p-6 space-y-5 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">Pul yuborish</h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs: Telefon raqam, Karta, Bank hisob (Showcase Match) */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('phone');
              setRecipient('+998 90 123 45 67');
            }}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'phone'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Telefon raqam
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('card');
              setRecipient('8600 1234 5678 9012');
            }}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'card'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Karta
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('bank');
              setRecipient('2020 8000 9012 3456 7001');
            }}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'bank'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bank hisob
          </button>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          {/* Recipient Input */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">
              {activeTab === 'phone'
                ? 'Telefon raqam'
                : activeTab === 'card'
                ? 'Karta raqami (Uzcard, Humo, Visa)'
                : 'Hisob raqam (IBAN)'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                placeholder={
                  activeTab === 'phone'
                    ? '+998 90 123 45 67'
                    : activeTab === 'card'
                    ? '8600 •••• •••• ••••'
                    : '2020 •••• •••• ••••'
                }
              />
              <div className="absolute right-3.5 top-3.5 text-slate-400">
                {activeTab === 'phone' && <User className="w-4 h-4" />}
                {activeTab === 'card' && <CreditCard className="w-4 h-4" />}
                {activeTab === 'bank' && <Building2 className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-400">Miqdor</label>
              <span className="text-[11px] text-slate-400">
                Mavjud: <span className="text-white font-mono">{formatAmount(currentBalance)}</span>
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                placeholder="0"
                className="w-full pl-4 pr-16 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-lg font-bold text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
              />
              <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-semibold">
                so'm
              </span>
            </div>
          </div>

          {/* Quick Amount Chips (Showcase Match: 50K, 100K, 200K, 500K) */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setAmount(String(q))}
                className="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 text-xs font-mono font-semibold text-slate-300 transition-colors"
              >
                {q / 1000}K
              </button>
            ))}
          </div>

          {/* Note (Izoh) */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Izoh (ixtiyoriy)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Masalan: to'lov, qarz, sovg'a"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && <p className="text-xs text-rose-400 font-medium text-center">{error}</p>}

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 active:scale-95 transition-all"
          >
            Yuborish
          </button>

          {/* Security Badge (Showcase Match) */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ushbu amal xavfsiz va shifrlangan.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
