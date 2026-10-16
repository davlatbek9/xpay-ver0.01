import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Building2, Banknote, Check } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const TopUpModal: React.FC = () => {
  const { activeModal, setActiveModal, topUpAccount, currentCards } = useFinance();

  const [method, setMethod] = useState<'card' | 'bank' | 'cash'>('card');
  const [selectedCardBrand, setSelectedCardBrand] = useState<'uzcard' | 'humo' | 'visa'>('uzcard');
  const [cardNumber, setCardNumber] = useState('8600 5512 3410 9988');
  const [expiry, setExpiry] = useState('08/27');
  const [cvv, setCvv] = useState('412');
  const [amount, setAmount] = useState('200000');
  const [error, setError] = useState('');

  if (activeModal !== 'topup') return null;

  const quickAmounts = [50000, 100000, 200000, 500000];

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);

    if (!numAmount || numAmount <= 0) {
      setError('To\'ldirish summasini kiriting');
      return;
    }

    const sourceName =
      method === 'card'
        ? `${selectedCardBrand.toUpperCase()} (${cardNumber.slice(-4)})`
        : method === 'bank'
        ? 'Bank hisobi (O\'tkazma)'
        : 'Bankomat / Naqd terminal';

    topUpAccount({
      amount: numAmount,
      source: sourceName,
      targetCardId: currentCards[0]?.id,
    });

    setActiveModal('receipt');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-[#0a101f] border border-blue-900/40 p-6 space-y-5 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white">Hisobni to'ldirish</h2>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs: Karta, Bank, Naqd (Showcase Match) */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setMethod('card')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              method === 'card'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Karta
          </button>
          <button
            type="button"
            onClick={() => setMethod('bank')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              method === 'bank'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bank
          </button>
          <button
            type="button"
            onClick={() => setMethod('cash')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              method === 'cash'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Naqd
          </button>
        </div>

        <form onSubmit={handleTopUp} className="space-y-4">
          {method === 'card' && (
            <>
              {/* Card Brands selection (Uzcard, Humo, Visa) */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCardBrand('uzcard');
                    setCardNumber('8600 5512 3410 9988');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedCardBrand === 'uzcard'
                      ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">UZCARD</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCardBrand('humo');
                    setCardNumber('9860 1204 8871 2234');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedCardBrand === 'humo'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">HUMO</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCardBrand('visa');
                    setCardNumber('4000 1234 5678 9010');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedCardBrand === 'visa'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">VISA / MC</span>
                </button>
              </div>

              {/* Card Number Input */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Karta raqami</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">Muddati</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {method === 'bank' && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-white">Bank rekvizitlari orqali to'ldirish:</p>
              <p>XPAY H/R: 2020 8000 9000 1234 5001</p>
              <p>MFO: 01020 (ATB "Kapitalbank")</p>
              <p className="text-[11px] text-slate-400">To'lov 5 daqiqa ichida avtomatik hisobga o'tadi.</p>
            </div>
          )}

          {method === 'cash' && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-white">Naqd to'lov terminallari:</p>
              <p>Paynet, UZPAYNET, yoki bankomatlarda XPAY hisob raqamingizni kiriting:</p>
              <p className="font-mono text-sm text-blue-400 font-bold">+998 90 123 45 67</p>
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Summa (so'm)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              placeholder="0"
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-lg font-bold text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Quick Amount Chips (Showcase Match) */}
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

          {error && <p className="text-xs text-rose-400 font-medium text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 active:scale-95 transition-all"
          >
            To'ldirish
          </button>

          {/* Security notice (Showcase match) */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ma'lumotlar xavfsiz saqlanadi.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
