import React, { useState } from 'react';
import {
  PiggyBank,
  Plus,
  Laptop,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  DollarSign,
  Send,
  Building,
  Zap,
  Check,
  Calculator,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { SavingsGoal, Invoice, Employee } from '../types/finance';

export const SavingsView: React.FC = () => {
  const {
    mode,
    savingsGoals,
    depositToGoal,
    addSavingsGoal,
    formatAmount,
    invoices,
    markInvoiceAsPaid,
    createInvoice,
    employees,
    payEmployeeSalary,
    payAllSalaries,
    businessBalance,
    personalBalance,
    autoSalaryConfig,
    setActiveModal,
  } = useFinance();

  // Modals inside SavingsView
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  // New goal state
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Texnika');

  // Business: New Invoice modal
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [newInvClient, setNewInvClient] = useState('');
  const [newInvAmount, setNewInvAmount] = useState('');
  const [newInvDesc, setNewInvDesc] = useState('');

  // Tax calculator state
  const [taxTurnover, setTaxTurnover] = useState(34200000);
  const taxRate = 4; // 4% turnover tax in Uzbekistan
  const calculatedTax = Math.round((taxTurnover * taxRate) / 100);

  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-blue-400" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-sky-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    }
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle || !newGoalAmount) return;

    addSavingsGoal({
      title: newGoalTitle,
      targetAmount: Number(newGoalAmount),
      category: newGoalCategory,
      icon: newGoalCategory === 'Dam olish' ? 'Plane' : newGoalCategory === 'Texnika' ? 'Laptop' : 'ShieldCheck',
      color: 'from-blue-600 to-indigo-700',
    });

    setNewGoalTitle('');
    setNewGoalAmount('');
    setShowAddGoalModal(false);
  };

  const handleDepositToGoal = (goalId: string) => {
    const amt = Number(depositAmount);
    if (amt > 0 && personalBalance >= amt) {
      depositToGoal(goalId, amt);
      setDepositAmount('');
      setShowDepositModal(null);
    }
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvClient || !newInvAmount) return;

    createInvoice({
      clientName: newInvClient,
      amount: Number(newInvAmount),
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      status: 'pending',
      description: newInvDesc || 'Dasturiy ta\'minot va xizmatlar',
      taxAmount: Math.round(Number(newInvAmount) * 0.04),
    });

    setNewInvClient('');
    setNewInvAmount('');
    setNewInvDesc('');
    setShowAddInvoiceModal(false);
  };

  const pendingSalariesCount = employees.filter((e) => e.paymentStatus === 'pending').length;
  const totalSalariesNeeded = employees
    .filter((e) => e.paymentStatus === 'pending')
    .reduce((sum, e) => sum + e.salary, 0);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {mode === 'personal' ? (
        /* Personal: Jamg'arma & Maqsadlar (Matches Showcase Screen) */
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Jamg'arma</h1>
              <p className="text-xs text-slate-400">Maqsadlaringiz va avtomatik yig'ilgan mablag'lar</p>
            </div>

            <button
              onClick={() => setShowAddGoalModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi maqsad</span>
            </button>
          </div>

          {/* Auto-Salary Link Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Avto-Oylik Jamg'arish</h4>
                <p className="text-[11px] text-slate-400">
                  Har oy oylik tushishi bilan {autoSalaryConfig.autoSaveToGoalPercent}% maqsadga yo'naltiriladi
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveModal('autoSalary')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-blue-400 font-semibold"
            >
              Sozlash
            </button>
          </div>

          {/* Maqsadlar List (Showcase visual match) */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-300">Maqsadlaringiz</h2>

            {savingsGoals.map((goal) => {
              const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

              return (
                <div
                  key={goal.id}
                  className="p-5 rounded-3xl bg-[#0c1322] border border-slate-800 shadow-xl space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                        {getGoalIcon(goal.icon)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{goal.title}</h3>
                        <span className="text-[11px] text-slate-400">
                          {formatAmount(goal.currentAmount)} / {formatAmount(goal.targetAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-blue-400 font-mono">
                        {percent}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 h-2.5 rounded-full transition-all duration-500 shadow-sm shadow-blue-500/40"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Deposit Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      Qolgan summa: {formatAmount(Math.max(0, goal.targetAmount - goal.currentAmount))}
                    </span>
                    <button
                      onClick={() => setShowDepositModal(goal.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all active:scale-95"
                    >
                      + Pul qo'shish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Business Mode: Hisob-fakturalar & Payroll */
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Biznes Boshqaruvi</h1>
              <p className="text-xs text-slate-400">
                Fakturalar, xodimlar oyligi va 4% aylanma soliq hisobi
              </p>
            </div>

            <button
              onClick={() => setShowAddInvoiceModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi faktura</span>
            </button>
          </div>

          {/* Quick Payroll Payout Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Xodimlar Oylik Maoshi (Payroll)</h3>
                  <p className="text-xs text-slate-400">
                    Kutilayotgan to'lovlar: {pendingSalariesCount} ta xodim (
                    {formatAmount(totalSalariesNeeded)})
                  </p>
                </div>
              </div>

              {pendingSalariesCount > 0 && (
                <button
                  onClick={payAllSalaries}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                >
                  Barchaga to'lash
                </button>
              )}
            </div>

            {/* Employee List */}
            <div className="divide-y divide-slate-800/80 rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              {employees.map((emp) => (
                <div key={emp.id} className="p-3.5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">{emp.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {emp.role} · {emp.cardNumber}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-white">
                      {formatAmount(emp.salary)}
                    </span>
                    {emp.paymentStatus === 'paid' ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> To'langan
                      </span>
                    ) : (
                      <button
                        onClick={() => payEmployeeSalary(emp.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold"
                      >
                        To'lash
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices (Schyot-fakturalar) */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-300">Schyot-fakturalar (Invoices)</h2>

            <div className="divide-y divide-slate-800/80 rounded-2xl bg-[#0c1322] border border-slate-800 overflow-hidden shadow-lg">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-mono">{inv.invoiceNumber}</span>
                      <span className="text-xs text-slate-300 font-semibold">{inv.clientName}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{inv.description}</p>
                    <span className="text-[10px] text-slate-500">
                      Muddati: {inv.dueDate} · Soliq (4%): {formatAmount(inv.taxAmount)}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-bold text-white font-mono">
                      {formatAmount(inv.amount)}
                    </p>
                    {inv.status === 'paid' ? (
                      <span className="text-[10px] text-emerald-400 font-semibold">To'langan</span>
                    ) : (
                      <button
                        onClick={() => markInvoiceAsPaid(inv.id)}
                        className="mt-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-semibold"
                      >
                        To'lovni qabul qilish
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Tax Estimator (4% Aylanma soliq) */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Avtomatik Soliq Kalkulyatori (4%)</h3>
            </div>
            <p className="text-xs text-slate-400">
              O'zbekiston soliq qonunchiligi bo'yicha aylanmadan olinadigan soliq (4%) hisob-kitobi:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Joriy oylik tushum (aylanma):
                </label>
                <input
                  type="number"
                  value={taxTurnover}
                  onChange={(e) => setTaxTurnover(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-center">
                <span className="text-[11px] text-slate-400">To'lanishi lozim bo'lgan soliq:</span>
                <span className="text-base font-bold text-amber-400 font-mono">
                  {formatAmount(calculatedTax)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal: New Savings Goal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Yangi Maqsad Qo'shish</h3>

            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Maqsad nomi</label>
                <input
                  type="text"
                  placeholder="Masalan: iPhone 16 Pro, Mashina..."
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Kerakli summa (so'm)</label>
                <input
                  type="number"
                  placeholder="5000000"
                  value={newGoalAmount}
                  onChange={(e) => setNewGoalAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Toifa</label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Texnika">Texnika & Gadjet</option>
                  <option value="Dam olish">Dam olish & Sayohat</option>
                  <option value="Zaxira">Favqulodda zaxira</option>
                  <option value="Avto">Avtomobil</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-lg"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Deposit to Goal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Jamg'armaga pul qo'shish</h3>
            <p className="text-xs text-slate-400">
              Mavjud balans: <span className="text-white font-mono">{formatAmount(personalBalance)}</span>
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Summa (so'm)</label>
                <input
                  type="number"
                  placeholder="100000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Quick Pills */}
              <div className="flex gap-2">
                {[100000, 200000, 500000, 1000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(String(amt))}
                    className="flex-1 py-1.5 rounded-lg bg-slate-800 text-[11px] font-mono text-slate-300 hover:bg-slate-700"
                  >
                    {amt >= 1000000 ? `${amt / 1000000}M` : `${amt / 1000}K`}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={() => handleDepositToGoal(showDepositModal)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-lg"
                >
                  Qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Invoice (Business) */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Yangi Schyot-Faktura</h3>

            <form onSubmit={handleCreateInvoice} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Mijoz / Kompaniya nomi</label>
                <input
                  type="text"
                  placeholder="Masalan: Orient Silk MCHJ"
                  value={newInvClient}
                  onChange={(e) => setNewInvClient(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Summa (so'm)</label>
                <input
                  type="number"
                  placeholder="10000000"
                  value={newInvAmount}
                  onChange={(e) => setNewInvAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Xizmat yoki tovar tavsifi</label>
                <input
                  type="text"
                  placeholder="Veb-sayt yaratish xizmati..."
                  value={newInvDesc}
                  onChange={(e) => setNewInvDesc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-lg"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
