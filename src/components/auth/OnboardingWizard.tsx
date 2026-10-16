import React, { useState } from 'react';
import {
  User,
  Building2,
  Layers,
  DollarSign,
  Calendar,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Sparkles,
  Bot,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { XPayLogo } from '../XPayLogo';
import { useFinance } from '../../context/FinanceContext';
import { UserProfile } from '../../types/finance';

export const OnboardingWizard: React.FC = () => {
  const { userProfile, completeOnboarding } = useFinance();

  const [step, setStep] = useState(1);

  // Form states
  const [accountGoal, setAccountGoal] = useState<'personal' | 'business' | 'both'>('personal');
  const [hasBusiness, setHasBusiness] = useState(false);
  const [businessName, setBusinessName] = useState('TechPro Solutions MCHJ');
  const [businessType, setBusinessType] = useState('IT & Dasturlash xizmatlari');
  const [monthlyIncome, setMonthlyIncome] = useState(7500000);
  const [salaryDay, setSalaryDay] = useState(10);
  const [cardNumber, setCardNumber] = useState('8600 4512 8920 4678');
  const [cardBrand, setCardBrand] = useState<'uzcard' | 'humo' | 'visa'>('uzcard');
  const [autoSync, setAutoSync] = useState(true);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Finish onboarding
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0066FF', '#00D2FF', '#22C55E', '#84CC16'],
        });
      } catch {}

      completeOnboarding({
        accountGoal,
        hasBusiness: accountGoal === 'business' || accountGoal === 'both',
        businessName: accountGoal !== 'personal' ? businessName : undefined,
        businessType: accountGoal !== 'personal' ? businessType : undefined,
        monthlyIncome,
        salaryDayOfMonth: salaryDay,
        linkedCardNumber: cardNumber,
        linkedCardBrand: cardBrand,
        autoAccountingEnabled: autoSync,
        onboardingCompleted: true,
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 bg-mesh-dark">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg rounded-3xl bg-[#091122]/95 border border-blue-900/50 p-6 sm:p-8 space-y-6 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Top: Logo and Steps Indicator */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <XPayLogo size={36} />
            <span className="font-extrabold tracking-wider text-white text-base font-mono">
              XPAY
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'w-6 bg-gradient-to-r from-blue-500 to-cyan-400'
                    : s < step
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
            <span className="text-xs text-slate-400 font-mono ml-1">{step}/4</span>
          </div>
        </div>

        {/* STEP 1: Maqsad va Rejim tanlash */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                1-Bosqich: Rejimni belgilash
              </span>
              <h2 className="text-xl font-bold text-white">
                Sizning asosiy maqsadingiz nima?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                XPAY sizning ehtiyojingizga mos tarzda shaxsiy kundalik xarajatlarni yoki biznes kassasini avtomatik yuritib beradi.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {/* Option A: Shaxsiy */}
              <button
                type="button"
                onClick={() => {
                  setAccountGoal('personal');
                  setHasBusiness(false);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  accountGoal === 'personal'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    accountGoal === 'personal' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white">Shaxsiy Moliya & Kundalik Xarajatlar</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Oylik maosh, do'kon xaridlari, kommunal to'lovlar, avto-jamg'arma va virtual karta.
                  </p>
                </div>
              </button>

              {/* Option B: Biznes */}
              <button
                type="button"
                onClick={() => {
                  setAccountGoal('business');
                  setHasBusiness(true);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  accountGoal === 'business'
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    accountGoal === 'business'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white">Biznes Boshqaruv & Tadbirkorlik</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Kompaniya hisobi, tushumlar, 4% aylanma soliq, fakturalar va xodimlar oyligi.
                  </p>
                </div>
              </button>

              {/* Option C: Ikkalasi ham */}
              <button
                type="button"
                onClick={() => {
                  setAccountGoal('both');
                  setHasBusiness(true);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  accountGoal === 'both'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    accountGoal === 'both' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white">Ikkalasi ham (Shaxsiy + Biznes)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ikkala rejim ham alohida ishlaydi va hisoblari mutlaqo aralashib ketmaydi.
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Faoliyat / Biznes turi */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                2-Bosqich: Faoliyat tafsilotlari
              </span>
              <h2 className="text-xl font-bold text-white">
                {accountGoal !== 'personal'
                  ? 'Biznesingiz haqida ma\'lumot'
                  : 'Sizning kasbingiz yoki bandligingiz'}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bu ma'lumotlar orqali XPAY AI siz uchun soliq va xarajatlar toifalarini avtomatlashtiradi.
              </p>
            </div>

            {accountGoal !== 'personal' ? (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Kompaniya yoki brendingiz nomi
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Masalan: TechPro Solutions MCHJ"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Faoliyat sohasi</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="IT & Dasturlash xizmatlari">IT & Dasturiy ta'minot</option>
                    <option value="Chakana va ulgurji savdo">Savdo & Do'kon (E-commerce)</option>
                    <option value="Umumiy ovqatlanish & Kafe">Kafe & Restoran</option>
                    <option value="Xizmat ko'rsatish">Xizmat ko'rsatish & Konsalting</option>
                    <option value="Ishlab chiqarish">Ishlab chiqarish</option>
                    <option value="Logistika va kuryerlik">Transport & Logistika</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                  ✓ O'zbekiston soliq tizimi bo'yicha <strong>4% aylanma soliq</strong> avtomatik kassa hisob-kitobiga ulanadi.
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Sizning asosiy mashg'ulotingiz:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Kompaniya xodimi',
                      'IT / Dasturchi',
                      'Frilanser',
                      'Davlat xizmatchisi',
                      'Tadbirkor',
                      'Talaba',
                    ].map((occ) => (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setBusinessType(occ)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                          businessType === occ
                            ? 'bg-blue-600/20 border-blue-500 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Oylik daromad va Avto-Hisob sanasi (CORE USER REQUIREMENT) */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                3-Bosqich: Oylik daromad va Avto-Hisob
              </span>
              <h2 className="text-xl font-bold text-white">
                Oylik o'rtacha daromadingiz qancha?
              </h2>
            </div>

            {/* Smart notice box explaining why user never needs to enter manually */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
              <Zap className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <p>
                <strong>Avto-Hisob Qoidasi:</strong> Siz oyligingizni bir marta kiritasiz. Har oy ilovaga kirib <em>"oyligim tushdi"</em> deb qo'lda yozishingiz shart emas — XPAY uni o'sha kuni <strong>inson aralashuvisiz avtomatik hisobga qo'shadi</strong> va jamg'armaga ajratadi!
              </p>
            </div>

            <div className="space-y-4 pt-1">
              {/* Income input */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Kutilayotgan oylik maosh / tushum (so'mda)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xl font-black text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Quick amount chips */}
              <div className="grid grid-cols-4 gap-2">
                {[5000000, 7500000, 10000000, 15000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setMonthlyIncome(amt)}
                    className="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono font-semibold text-slate-300 transition-colors"
                  >
                    {amt >= 1000000 ? `${amt / 1000000} mln` : amt}
                  </button>
                ))}
              </div>

              {/* Day of month */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Oylik qaysi sanada tushadi?
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={salaryDay}
                    onChange={(e) => setSalaryDay(Number(e.target.value))}
                    className="w-24 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-white font-mono text-center focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs text-slate-300">
                    -sanasida avtomatik hisobga qo'shiladi
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Karta ulash va 100% Avtomatik rejim */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                4-Bosqich: Bank kartasi va Sinxronizatsiya
              </span>
              <h2 className="text-xl font-bold text-white">
                Bank kartangizni ulang
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kartangizdan xarid qilganda XPAY AI inson aralashuvisiz to'lovlarni o'qiydi va hisoblaydi.
              </p>
            </div>

            {/* Card selector */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setCardBrand('uzcard');
                  setCardNumber('8600 4512 8920 4678');
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  cardBrand === 'uzcard'
                    ? 'bg-blue-600/20 border-blue-500 text-cyan-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                UZCARD
              </button>
              <button
                type="button"
                onClick={() => {
                  setCardBrand('humo');
                  setCardNumber('9860 1204 8871 3321');
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  cardBrand === 'humo'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                HUMO
              </button>
              <button
                type="button"
                onClick={() => {
                  setCardBrand('visa');
                  setCardNumber('4000 8921 5472 4678');
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  cardBrand === 'visa'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                VISA
              </button>
            </div>

            {/* Card number input */}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Karta raqami</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="8600 •••• •••• ••••"
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Auto Accounting Active Toggle */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-bold text-white">
                    Inson aralashuvisiz 100% Avto-Hisob
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoSync(!autoSync)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    autoSync ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      autoSync ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Bank xabarnomalari kelishi bilan ilova barcha operatsiyalarni o'zi toifalarga ajratadi va hisobotni yangilaydi.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 active:scale-95 transition-all ml-auto"
          >
            <span>{step === 4 ? 'XPAY Ilovasini Boshlash 🚀' : 'Keyingisi'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
