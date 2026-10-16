import React, { useState } from 'react';
import { X, Smartphone, Wifi, Zap, Building, Check } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const PayServicesModal: React.FC = () => {
  const { activeModal, setActiveModal, payService, currentBalance, formatAmount } = useFinance();

  const [category, setCategory] = useState<'mobile' | 'internet' | 'utility'>('mobile');
  const [provider, setProvider] = useState('Ucell');
  const [account, setAccount] = useState('+998 90 123 45 67');
  const [amount, setAmount] = useState('50000');
  const [error, setError] = useState('');

  if (activeModal !== 'pay') return null;

  const providers = {
    mobile: ['Ucell', 'Beeline', 'Mobiuz', 'UZTELECOM'],
    internet: ['Turon Telecom', 'Uzonline', 'Sarkor Telecom', 'Comnet'],
    utility: ['Hududiy Elektr Tarmoqlari', 'Hududgazta\'minot', 'Suv ta\'minoti'],
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);

    if (!account.trim()) {
      setError('Hisob yoki telefon raqamini kiriting');
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

    payService({
      serviceName: provider,
      accountOrPhone: account,
      amount: numAmount,
      category: category === 'mobile' || category === 'internet' ? 'Aloqa & Internet' : 'Xizmatlar',
    });

    setActiveModal('receipt');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-[#0a101f] border border-blue-900/40 p-6 space-y-5 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white">Xizmatlar to'lovi</h2>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setCategory('mobile');
              setProvider('Ucell');
              setAccount('+998 90 123 45 67');
            }}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              category === 'mobile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobil aloqa</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCategory('internet');
              setProvider('Turon Telecom');
              setAccount('turon_88412');
            }}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              category === 'internet'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Internet</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCategory('utility');
              setProvider('Hududiy Elektr Tarmoqlari');
              setAccount('140299881');
            }}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              category === 'utility'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Kommunal</span>
          </button>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          {/* Provider chips */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Xizmat ko'rsatuvchi</label>
            <div className="grid grid-cols-2 gap-2">
              {providers[category].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProvider(p)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                    provider === p
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Account / Phone */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">
              {category === 'mobile' ? 'Telefon raqam' : 'Shaxsiy hisob raqami (Login)'}
            </label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">To'lov summasi (so'm)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-base font-bold text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && <p className="text-xs text-rose-400 font-medium text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 active:scale-95 transition-all"
          >
            To'lash
          </button>
        </form>
      </div>
    </div>
  );
};
