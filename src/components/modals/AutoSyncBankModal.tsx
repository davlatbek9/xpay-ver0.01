import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building,
  Zap,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowDownLeft,
  ShieldCheck,
  Bot,
  AlertCircle,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Transaction } from '../../types/finance';

export const AutoSyncBankModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    formatAmount,
    currentBalance,
    topUpAccount,
    payService,
  } = useFinance();

  const [smsParsingEnabled, setSmsParsingEnabled] = useState(true);
  const [openBankingEnabled, setOpenBankingEnabled] = useState(true);
  const [autoCategoryEnabled, setAutoCategoryEnabled] = useState(true);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  if (activeModal !== 'autoSync') return null;

  // Simulate an incoming real-world bank push/SMS that is automatically parsed by AI
  const handleSimulateBankPush = (scenario: 'expense' | 'income') => {
    if (scenario === 'expense') {
      const rawBankSms = "UZCARD: 16.10.2026 14:15 -85,000 UZS. Joy: YANDEX GO TAXI. Qoldiq: 12,395,000 UZS.";
      setSimulationLog(
        `📡 Bank SMS qabul qilindi:\n"${rawBankSms}"\n\n🤖 XPAY AI tahlili:\n• Xarajat: 85,000 so'm\n• Toifa: Transport (Avtomatik belgilandi)\n• Inson aralashuvi: 0% (To'liq avtomatlashtirilgan)`
      );
      payService({
        serviceName: 'Yandex Go Taxi',
        accountOrPhone: 'Avto-Sinxronizatsiya (UZCARD)',
        amount: 85000,
        category: 'Transport',
      });
    } else {
      const rawBankSms = "HUMO: 16.10.2026 10:00 +4,500,000 UZS. Oylik maosh: TECH SOLUTIONS. Qoldiq: 16,980,000 UZS.";
      setSimulationLog(
        `📡 Bank SMS qabul qilindi:\n"${rawBankSms}"\n\n🤖 XPAY AI tahlili:\n• Kirim: +4,500,000 so'm (Oylik maosh)\n• Avto-taqsimot: 20% jamg'armaga, 50% virtual kartaga yo'naltirildi!\n• Inson aralashuvi: 0%`
      );
      topUpAccount({
        amount: 4500000,
        source: 'Avto-Oylik (Bank API)',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#091122] border border-blue-900/40 p-6 space-y-5 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Avto-Hisob-Kitob Qanday Ishlaydi?</h2>
              <p className="text-[11px] text-slate-400">
                Inson aralashuvisiz 100% avtomatik buxgalteriya va monitoring
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explanatory Box (Answering user's direct question) */}
        <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-2 text-xs leading-relaxed text-slate-300">
          <div className="flex items-start gap-2 text-blue-300 font-bold">
            <Bot className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Savolingizga javob: Ha, karta yoki bank ulanishi lozim!</span>
          </div>
          <p>
            Hisob-kitob <strong>inson aralashuvisiz (avtomat)</strong> bo'lishi uchun quyidagi 2 ta usuldan biri ulanadi:
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-slate-300">
            <li>
              <strong className="text-white">Bank SMS / Push xabarnomalari:</strong> Kartadan qayerda to'lov qilsangiz (Korzinka, zapravka, taxi), bank yuborgan xabarni XPAY AI o'qiydi va bir soniyada toifaga ajratadi.
            </li>
            <li>
              <strong className="text-white">Open Banking API (Bank integratsiyasi):</strong> Bank hisobingizga bevosita ulanadi. Barcha kirim va chiqimlar to'g'ridan-to'g'ri ilovaga tushadi.
            </li>
            <li>
              <strong className="text-white">Biznes uchun (1C & Soliq.uz API):</strong> Har bir tushum bo'lganda darhol 4% soliq hisoblanadi va sof foyda ajratiladi.
            </li>
          </ul>
        </div>

        {/* Interactive Toggles */}
        <div className="divide-y divide-slate-800/80 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden text-xs">
          {/* Toggle 1: SMS Parsing */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Bank SMS-parsing tizimi</span>
              <span className="text-[11px] text-slate-400">
                Uzcard / Humo xabarnomalarini avtomatik ushlash
              </span>
            </div>
            <button
              onClick={() => setSmsParsingEnabled(!smsParsingEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                smsParsingEnabled ? 'bg-cyan-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  smsParsingEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: AI Auto-Categorization */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">AI Avto-Kategoriyalash</span>
              <span className="text-[11px] text-slate-400">
                "Korzinka" -&gt; Oziq-ovqat, "Yandex" -&gt; Transport
              </span>
            </div>
            <button
              onClick={() => setAutoCategoryEnabled(!autoCategoryEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                autoCategoryEnabled ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  autoCategoryEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Open Banking */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <span className="font-semibold text-white block">Open Banking API (To'g'ridan-to'g'ri)</span>
              <span className="text-[11px] text-slate-400">
                Kapitalbank, TBC, Ipak Yo'li, Anorbank integratsiyasi
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
              Ulangan
            </span>
          </div>
        </div>

        {/* Live Simulation Box */}
        <div className="p-4 rounded-2xl bg-[#060b17] border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300">
              ⚡ Avto-hisob-kitobni hozir sinab ko'rish:
            </span>
            <span className="text-[10px] text-slate-400">Jonli test</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSimulateBankPush('expense')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold text-slate-200 transition-colors text-left"
            >
              🚗 Taxi to'lovi (-85K so'm)
            </button>
            <button
              onClick={() => handleSimulateBankPush('income')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-semibold text-emerald-400 transition-colors text-left"
            >
              💰 Oylik maosh (+4.5M so'm)
            </button>
          </div>

          {simulationLog && (
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed animate-in fade-in">
              {simulationLog}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          Tushunarli, saqlash
        </button>
      </div>
    </div>
  );
};
