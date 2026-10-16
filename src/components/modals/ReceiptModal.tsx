import React, { useState } from 'react';
import { Check, CheckCircle2, Share2, Copy, Download, X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export const ReceiptModal: React.FC = () => {
  const { activeModal, setActiveModal, lastReceipt, formatAmount } = useFinance();
  const [copied, setCopied] = useState(false);

  if (activeModal !== 'receipt' || !lastReceipt) return null;

  const handleCopyCheck = () => {
    const text = `XPAY TO'LOV CHEKI\nSarlavha: ${lastReceipt.title}\nSumma: ${lastReceipt.amount} so'm\nSana: ${lastReceipt.date}, ${lastReceipt.time}\nHolat: Muvaffaqiyatli\nTranzaksiya ID: ${lastReceipt.id}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      {/* Exact Visual Showcase Match: Screen "To'lov muvaffaqiyatli!" */}
      <div className="w-full max-w-sm rounded-3xl bg-[#091122] border border-blue-900/40 p-7 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Large Glowing Green Circle with Checkmark (Exact Match) */}
        <div className="relative inline-flex items-center justify-center mt-2">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center glow-green">
            <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <Check className="w-8 h-8 text-white stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Success Title */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            To'lov muvaffaqiyatli!
          </h2>
          <p className="text-2xl font-black text-white font-mono mt-3">
            {formatAmount(lastReceipt.amount)}
          </p>
          <p className="text-xs text-slate-300 font-semibold mt-1">{lastReceipt.title}</p>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            {lastReceipt.date}, {lastReceipt.time}
          </p>
        </div>

        {/* Details Pill Table */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2 text-left">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Komissiya:</span>
            <span className="text-emerald-400 font-semibold">0 so'm (0%)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">To'lov usuli:</span>
            <span className="text-white font-mono">{lastReceipt.cardNumber || 'XPAY Virtual Card'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Chek raqami:</span>
            <span className="text-slate-300 font-mono text-[10px]">{lastReceipt.id}</span>
          </div>
          {lastReceipt.note && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Izoh:</span>
              <span className="text-slate-200">{lastReceipt.note}</span>
            </div>
          )}
        </div>

        {/* Buttons (Showcase match: Big blue "Tushunarli" button) */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setActiveModal(null)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 active:scale-95 transition-all"
          >
            Tushunarli
          </button>

          <button
            onClick={handleCopyCheck}
            className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nusxalandi!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Chekni ulashish</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
