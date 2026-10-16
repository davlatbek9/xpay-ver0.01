import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Globe,
  FileText,
  Lock,
  Headphones,
  ChevronRight,
  CreditCard,
  PiggyBank,
  Target,
  LogOut,
  Sparkles,
  Smartphone,
  Check,
  Zap,
  GraduationCap,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { XPayLogo } from './XPayLogo';

export const ProfileView: React.FC<{ onOpenAuth?: () => void }> = ({ onOpenAuth }) => {
  const {
    mode,
    currency,
    setCurrency,
    savingsGoals,
    currentCards,
    setActiveModal,
    setActiveTab,
  } = useFinance();

  const [activeLang, setActiveLang] = useState<string>("O'zbek");
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [modalInfo, setModalInfo] = useState<string | null>(null);

  const stats = [
    { label: 'Karta', count: currentCards.length + 10, icon: CreditCard },
    { label: "Jamg'arma", count: 5, icon: PiggyBank },
    { label: 'Maqsadlar', count: savingsGoals.length, icon: Target },
  ];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Profile Header (Matches Showcase Screen) */}
      <div className="text-center p-6 rounded-3xl bg-gradient-to-b from-[#0c1836] to-[#080d1a] border border-blue-900/40 shadow-xl space-y-4">
        {/* User Initials Circle with Logo Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-black text-2xl shadow-xl shadow-cyan-500/25 border-2 border-cyan-400/30 flex items-center justify-center">
            DX
          </div>
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-900 border border-slate-700">
            <XPayLogo size={20} />
          </div>
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">Davlatbek Xayrullayev</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">+998 90 123 45 67</p>
          <span className="inline-block mt-2 text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold">
            {mode === 'personal' ? 'XPAY Platinum Foydalanuvchi' : 'XPAY Business Admin'}
          </span>
        </div>

        {/* 3 Stat Counters (Showcase Match) */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
          {stats.map((s, idx) => (
            <div key={idx} className="p-2 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-base font-extrabold text-white font-mono block">
                {s.count}
              </span>
              <span className="text-[11px] text-slate-400">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setModalInfo(
                "Profil ma'lumotlari to'liq tasdiqlangan (Pasport seriya: AA 1234567, JSHSHIR: 3240995000000)."
              )
            }
            className="flex-1 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-semibold text-white border border-slate-700/60 transition-colors"
          >
            Profilni tahrirlash
          </button>
          <button
            onClick={onOpenAuth}
            className="px-4 py-2.5 rounded-2xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Hisob / Kirish</span>
          </button>
        </div>
      </div>

      {/* Auto-Sync & Bank Integration Highlight Banner */}
      <div
        onClick={() => setActiveModal('autoSync')}
        className="p-4 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/40 hover:border-cyan-400 cursor-pointer shadow-lg flex items-center justify-between group transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white">Avtomatik Bank Integratsiyasi (Open Banking)</h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                Inson aralashuvisiz
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              SMS-parsing va bank webhooklari orqali xarajatlarni 100% avto-hisoblash sozlamalari
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Video Academy Shortcut Banner */}
      <div
        onClick={() => setActiveTab('academy')}
        className="p-4 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/40 hover:border-indigo-400 cursor-pointer shadow-lg flex items-center justify-between group transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white">XPAY Video Darslar & Akademiya</h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                8 ta dars
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Pul sirlari, 0 dan biznes boshlash, kripto treyding va kiberxavfsizlik darslari
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Sozlamalar (Settings Group) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sozlamalar</h2>

        <div className="divide-y divide-slate-800/80 rounded-2xl bg-[#0c1322] border border-slate-800 overflow-hidden shadow-lg">
          {/* Shaxsiy ma'lumotlar */}
          <div
            onClick={() =>
              setModalInfo(
                "Shaxsiy ma'lumotlar: Davlatbek Xayrullayev, Toshkent shahri, Mirzo Ulug'bek tumani."
              )
            }
            className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-semibold text-white">Shaxsiy ma'lumotlar</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Xavfsizlik & Biometrika */}
          <div
            onClick={() => setBiometricsEnabled(!biometricsEnabled)}
            className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-xs font-semibold text-white block">Xavfsizlik & PIN-kod</span>
                <span className="text-[10px] text-slate-400">FaceID / TouchID orqali tasdiqlash</span>
              </div>
            </div>
            <span
              className={`text-xs font-bold ${
                biometricsEnabled ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              {biometricsEnabled ? 'Yoqilgan' : "O'chirilgan"}
            </span>
          </div>

          {/* Bildirishnomalar */}
          <div
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold text-white">Bildirishnomalar</span>
            </div>
            <span
              className={`text-xs font-bold ${
                notificationsEnabled ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              {notificationsEnabled ? 'Barchasi' : 'Cheklangan'}
            </span>
          </div>

          {/* Til */}
          <div
            onClick={() => setActiveLang(activeLang === "O'zbek" ? 'English' : "O'zbek")}
            className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-sky-400" />
              <span className="text-xs font-semibold text-white">Til (Language)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
              <span>{activeLang}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Info & Legal (Versiya 1.0.0, Shartlar) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ilova haqida</span>
          <span className="text-[10px] text-slate-500 font-mono">Versiya 1.0.0</span>
        </div>

        <div className="divide-y divide-slate-800/80 rounded-2xl bg-[#0c1322] border border-slate-800 overflow-hidden shadow-lg">
          <div
            onClick={() =>
              setModalInfo(
                "XPAY foydalanish shartlari: Platforma O'zbekiston Respublikasi Markaziy Banki litsenziyalari va xalqaro to'lov xavfsizligi standartlariga (PCI DSS) to'liq mos keladi."
              )
            }
            className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
          >
            <span className="text-xs text-slate-300">Foydalanish shartlari</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          <div
            onClick={() =>
              setModalInfo(
                "Maxfiylik siyosati: Sizning bank ma'lumotlaringiz 256-bitli shifrlash orqali himoyalanadi va uchinchi shaxslarga berilmaydi."
              )
            }
            className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
          >
            <span className="text-xs text-slate-300">Maxfiylik siyosati</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          <div
            onClick={() =>
              setModalInfo(
                "XPAY 24/7 Qo'llab-quvvatlash xizmati:\nTelefon: +998 (71) 200-00-00\nTelegram: @xpay_support\nEmail: support@xpay.uz"
              )
            }
            className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-300">Biz bilan bog'lanish (24/7 Support)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {modalInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white">Ma'lumot</h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{modalInfo}</p>
            <button
              onClick={() => setModalInfo(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-lg"
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
