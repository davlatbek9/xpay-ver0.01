import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Smartphone,
  Wifi,
  ShoppingBag,
  Fuel,
  ArrowDownLeft,
  ArrowUpRight,
  Briefcase,
  Users,
  Building,
  CreditCard,
  FileSpreadsheet,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Transaction } from '../types/finance';

export const TransactionsView: React.FC = () => {
  const { currentTransactions, formatAmount, setLastReceipt, setActiveModal } = useFinance();

  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(currentTransactions.map((t) => t.category)));

  // Filtered transactions
  const filtered = currentTransactions.filter((tx) => {
    if (activeFilter === 'income' && tx.type !== 'income') return false;
    if (activeFilter === 'expense' && tx.type !== 'expense') return false;
    if (selectedCategory !== 'all' && tx.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = tx.title.toLowerCase().includes(q);
      const matchCat = tx.category.toLowerCase().includes(q);
      const matchNote = tx.note?.toLowerCase().includes(q);
      const matchRecipient = tx.recipientOrSender?.toLowerCase().includes(q);
      return matchTitle || matchCat || matchNote || matchRecipient;
    }
    return true;
  });

  const getCategoryIcon = (iconName: string, category: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-sky-400" />;
      case 'ShoppingBag':
      case 'ShoppingCart':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'Fuel':
        return <Fuel className="w-5 h-5 text-amber-400" />;
      case 'ArrowDownLeft':
        return <ArrowDownLeft className="w-5 h-5 text-emerald-400" />;
      case 'ArrowUpRight':
        return <ArrowUpRight className="w-5 h-5 text-amber-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400" />;
      default:
        return category.toLowerCase().includes('soliq') ? (
          <Building className="w-5 h-5 text-amber-400" />
        ) : (
          <CreditCard className="w-5 h-5 text-blue-400" />
        );
    }
  };

  const handleTransactionClick = (tx: Transaction) => {
    setLastReceipt(tx);
    setActiveModal('receipt');
  };

  const handleExportCSV = () => {
    const headers = ['ID,Sarlavha,Summa,Tur,Toifa,Sana,Vaqt,Holat\n'];
    const rows = filtered.map(
      (t) =>
        `"${t.id}","${t.title}","${t.amount}","${t.type}","${t.category}","${t.date}","${t.time}","${t.status}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `xpay-tranzaksiyalar-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Tranzaksiyalar</h1>
          <p className="text-xs text-slate-400">Barcha kirim va chiqim operatsiyalari tarixi</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors"
          title="Hisobotni CSV yuklab olish"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">CSV yuklab olish</span>
        </button>
      </div>

      {/* Tabs: Barchasi, Kirim, Chiqim (Matches showcase screen) */}
      <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveFilter('all')}
          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Barchasi ({currentTransactions.length})
        </button>
        <button
          onClick={() => setActiveFilter('income')}
          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'income'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Kirim (+{currentTransactions.filter((t) => t.type === 'income').length})
        </button>
        <button
          onClick={() => setActiveFilter('expense')}
          className={`py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === 'expense'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Chiqim (-{currentTransactions.filter((t) => t.type === 'expense').length})
        </button>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Izlash (do'kon, xizmat, kimga)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
        >
          <option value="all">Barcha toifalar</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions List */}
      <div className="divide-y divide-slate-800/70 rounded-2xl bg-[#0c1322] border border-slate-800 overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            Mos keluvchi tranzaksiyalar topilmadi.
          </div>
        ) : (
          filtered.map((tx) => (
            <div
              key={tx.id}
              onClick={() => handleTransactionClick(tx)}
              className="p-4 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getCategoryIcon(tx.iconName, tx.category)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {tx.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                    <span>
                      {tx.date}, {tx.time}
                    </span>
                    <span>•</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {tx.category}
                    </span>
                  </div>
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
                <span className="text-[10px] text-slate-500 block">{tx.cardNumber || 'Asosiy hisob'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
