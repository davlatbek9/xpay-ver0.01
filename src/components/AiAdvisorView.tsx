import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Building2,
  User,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { ChatMessage, FinancialHealthAudit } from '../types/finance';

export const AiAdvisorView: React.FC = () => {
  const {
    mode,
    currentBalance,
    currentIncome,
    currentExpense,
    currentTransactions,
    savingsGoals,
    formatAmount,
    currency,
  } = useFinance();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Salom! Men — XPAY AI. Moliyaviy savollaringizga javob beraman, byudjetni avtomatik hisob-kitob qilishda va jamg'armalaringizni ko'paytirishda yordam ko'rsataman. Siz hozirda ${
        mode === 'personal' ? 'Shaxsiy hisob' : 'Biznes hisob'
      } rejimidasiz.`,
      timestamp: 'Bugun, 09:40',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Financial health audit state
  const [auditData, setAuditData] = useState<FinancialHealthAudit | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Suggested prompts matching the showcase screen
  const personalPrompts = [
    'Bu oy qanday tejash mumkin?',
    'Eng ko\'p xarajatlar qaysi?',
    'Jamg\'arma qanday boshlanadi?',
    'Kredit va oylik taqsimoti qoidasi',
  ];

  const businessPrompts = [
    'Biznes foydasini qanday oshirish mumkin?',
    'Aylanma soliq (4%) hisob-kitobi',
    'Kesh-flou optimallashtirish sirlari',
    'Xodimlar oyligini rejalashtirish',
  ];

  const suggestedPrompts = mode === 'personal' ? personalPrompts : businessPrompts;

  // Send message to Express /api/chat
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          context: {
            mode,
            balance: currentBalance,
            income: currentIncome,
            expense: currentExpense,
            currency: currency === 'USD' ? '$' : "so'm",
            goals: savingsGoals.map((g) => ({ title: g.title, progress: `${g.currentAmount}/${g.targetAmount}` })),
            recentTransactions: currentTransactions.slice(0, 5).map((t) => ({
              title: t.title,
              amount: t.amount,
              type: t.type,
              category: t.category,
            })),
          },
        }),
      });

      const data = await response.json();
      const botReply = data.reply || "Xabarni qayta ishlashda xatolik yuz berdi.";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: "Tarmoq bilan ulanishda xatolik yuz berdi. Iltimos qayta urinib ko'ring.",
          timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Run 1-click automatic financial health audit
  const runAutoAudit = async () => {
    setAuditLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          balance: currentBalance,
          income: currentIncome,
          expense: currentExpense,
          categories: currentTransactions.map((t) => t.category),
          transactions: currentTransactions,
        }),
      });

      const data = await response.json();
      setAuditData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAuditLoading(false);
    }
  };

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Robot Hero Avatar Card (Matches Showcase Screen) */}
      <div className="text-center p-6 rounded-3xl bg-gradient-to-b from-[#0c1836] via-[#091326] to-[#070c18] border border-blue-900/40 shadow-xl">
        <div className="relative inline-flex items-center justify-center">
          {/* Glowing Rings */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse pointer-events-none" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-1 shadow-lg shadow-blue-500/30">
            <div className="w-full h-full rounded-full bg-[#080d1a] flex items-center justify-center">
              <Bot className="w-10 h-10 text-sky-400 animate-bounce" />
            </div>
          </div>
        </div>

        <h1 className="text-xl font-black text-white mt-4">Salom! Men — XPAY AI</h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
          Moliyaviy savollaringizga javob beraman, maslahatlar beraman va sizga yordam ko'rsataman.
        </p>

        {/* 1-Click Auto Financial Audit Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={runAutoAudit}
            disabled={auditLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
          >
            {auditLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>Avtomatik Moliya Auditini Ishga Tushirish</span>
          </button>
        </div>
      </div>

      {/* Auto Audit Result Card if computed */}
      {auditData && (
        <div className="p-5 rounded-3xl bg-[#0c1322] border border-blue-500/30 shadow-2xl space-y-4 animate-in zoom-in-95">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">XPAY Moliyaviy Salomatlik Tahlili</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-blue-400 font-mono">{auditData.score}/100</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                {auditData.rating}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{auditData.summary}</p>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Asosiy maslahatlar va hisob-kitob:
            </h4>
            {auditData.keyInsights?.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-blue-300">
            <strong>Prognoz:</strong> {auditData.forecast}
          </div>
        </div>
      )}

      {/* Suggested Prompt Chips (Matches Showcase Screen) */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Tavsiya etilgan savollar:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-left p-3 rounded-2xl bg-[#0c1322] hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 text-xs text-slate-200 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">?</span>
                <span>{prompt}</span>
              </div>
              <Send className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="space-y-3 pt-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-lg shadow-blue-600/20'
                  : 'bg-[#0c1322] text-slate-200 border border-slate-800 rounded-tl-sm shadow-md'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-slate-400">
                <span>{msg.timestamp}</span>
                {msg.sender === 'bot' && (
                  <button
                    onClick={() => copyMessage(msg.text, msg.id)}
                    className="hover:text-white transition-colors"
                    title="Nusxalash"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-2 text-xs text-slate-400">
            <div className="p-2 rounded-xl bg-slate-800">
              <Bot className="w-4 h-4 text-blue-400 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-200" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="sticky bottom-16 left-0 right-0 z-30 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            placeholder="Savol yozing (masalan: Oylik maoshni qanday taqsimlay?)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-2xl transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="absolute right-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white disabled:text-slate-500 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
