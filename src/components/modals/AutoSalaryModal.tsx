import React, { useState } from 'react';
import { X, Zap, PiggyBank, CreditCard, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const AutoSalaryModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    autoSalaryConfig,
    updateAutoSalaryConfig,
    triggerAutoSalary,
    savingsGoals,
    formatAmount,
  } = useFinance();

  const [salary, setSalary] = useState(autoSalaryConfig.expectedSalary);
  const [goalPercent, setGoalPercent] = useState(autoSalaryConfig.autoSaveToGoalPercent);
  const [cardPercent, setCardPercent] = useState(autoSalaryConfig.autoTransferToCardPercent);
  const [selectedGoalId, setSelectedGoalId] = useState(
    autoSalaryConfig.targetGoalId || savingsGoals[0]?.id || ''
  );
  const [dayOfMonth, setDayOfMonth] = useState(autoSalaryConfig.salaryDayOfMonth);
  const [simulatedResult, setSimulatedResult] = useState<{
    total: number;
    toCard: number;
    toGoal: number;
    remaining: number;
  } | null>(null);

  if (activeModal !== 'autoSalary') return null;

  const freePercent = Math.max(0, 100 - goalPercent - cardPercent);
  const toGoalSum = Math.round((salary * goalPercent) / 100);
  const toCardSum = Math.round((salary * cardPercent) / 100);
  const freeSum = Math.round((salary * freePercent) / 100);

  const handleSave = () => {
    updateAutoSalaryConfig({
      expectedSalary: Number(salary),
      autoSaveToGoalPercent: goalPercent,
      autoTransferToCardPercent: cardPercent,
      targetGoalId: selectedGoalId,
      salaryDayOfMonth: dayOfMonth,
      enabled: true,
    });
    setActiveModal(null);
  };

  const handleSimulate = () => {
    const res = triggerAutoSalary(Number(salary));
    setSimulatedResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#0a101f] border border-blue-900/40 p-6 space-y-5 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Avto-Oylik & Taqsimot Tizimi</h2>
              <p className="text-[11px] text-slate-400">
                Oylik tushishi bilan avtomatik tarzda kartaga va maqsadlarga pul yig'ish
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

        {simulatedResult ? (
          /* Simulation Result Screen */
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Oylik muvaffaqiyatli tushdi va avto-taqsimlandi!</span>
            </div>

            <div className="divide-y divide-slate-800 text-xs space-y-2 pt-1 font-mono">
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400">Jami oylik tushumi:</span>
                <span className="text-white font-bold">{formatAmount(simulatedResult.total)}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400">Virtual kartaga o'tkazildi:</span>
                <span className="text-sky-400 font-bold">+{formatAmount(simulatedResult.toCard)}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400">Jamg'armaga qo'shildi:</span>
                <span className="text-emerald-400 font-bold">+{formatAmount(simulatedResult.toGoal)}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400">Erkin hisobdagi qoldiq:</span>
                <span className="text-indigo-400 font-bold">{formatAmount(simulatedResult.remaining)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSimulatedResult(null);
                setActiveModal(null);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Tushunarli
            </button>
          </div>
        ) : (
          /* Configuration Form */
          <div className="space-y-4">
            {/* Expected Salary Input */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Kutilayotgan oylik maosh summasi (so'm)
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-base font-bold text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Salary arrival day */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                Oylik tushadigan sana (oyning har...)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(Number(e.target.value))}
                  className="w-24 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                />
                <span className="text-xs text-slate-400">-sanasida avtomatik ajratiladi</span>
              </div>
            </div>

            {/* Slider 1: Virtual Card Allocation */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-sky-400" />
                  <span className="text-slate-200 font-semibold">XPAY Virtual Kartaga:</span>
                </div>
                <span className="text-sky-400 font-bold font-mono">
                  {cardPercent}% ({formatAmount(toCardSum)})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={100 - goalPercent}
                step="5"
                value={cardPercent}
                onChange={(e) => setCardPercent(Number(e.target.value))}
                className="w-full accent-sky-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Savings Goal Allocation */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200 font-semibold">Maqsad Jamg'armasiga:</span>
                </div>
                <span className="text-emerald-400 font-bold font-mono">
                  {goalPercent}% ({formatAmount(toGoalSum)})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={100 - cardPercent}
                step="5"
                value={goalPercent}
                onChange={(e) => setGoalPercent(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />

              {/* Target Goal Picker */}
              <div className="pt-2">
                <label className="text-[11px] text-slate-400 block mb-1">
                  Qaysi maqsadga yig'ilsin?
                </label>
                <select
                  value={selectedGoalId}
                  onChange={(e) => setSelectedGoalId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  {savingsGoals.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title} ({formatAmount(g.currentAmount)} / {formatAmount(g.targetAmount)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary Breakdown */}
            <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span>Erkin kundalik xarajat qoldig'i ({freePercent}%):</span>
                <span className="text-white font-mono font-bold">{formatAmount(freeSum)}</span>
              </div>
              <p className="text-[11px] text-blue-300">
                💡 50/30/20 aqlli byudjetlash qoidasiga to'liq mos keladi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={handleSimulate}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-all"
              >
                Oylik tushumini hozir sinab ko'rish
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-all"
              >
                Sozlamalarni saqlash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
