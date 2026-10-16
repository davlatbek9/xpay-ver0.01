import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  AccountMode,
  Currency,
  Transaction,
  VirtualCard,
  SavingsGoal,
  AutoSalaryConfig,
  Invoice,
  Employee,
  UserProfile,
} from '../types/finance';
import {
  initialPersonalCards,
  initialBusinessCards,
  initialPersonalTransactions,
  initialBusinessTransactions,
  initialSavingsGoals,
  initialAutoSalaryConfig,
  initialInvoices,
  initialEmployees,
} from '../data/initialData';

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: 'success' | 'alert' | 'info';
}

const defaultUserProfile: UserProfile = {
  name: 'Davlatbek Xayrullayev',
  email: 'davlatbek@xpay.uz',
  phone: '+998 90 123 45 67',
  accountGoal: 'personal',
  hasBusiness: false,
  businessName: 'TechPro Solutions MCHJ',
  businessType: 'IT & Dasturlash xizmatlari',
  monthlyIncome: 7500000,
  salaryDayOfMonth: 10,
  linkedCardNumber: '8600 •••• •••• 4678',
  linkedCardBrand: 'uzcard',
  autoAccountingEnabled: true,
  onboardingCompleted: false,
};

interface FinanceContextType {
  // Auth & Onboarding
  isAuthenticated: boolean;
  userProfile: UserProfile;
  loginWithGoogle: () => void;
  loginWithCredentials: (ident: string, pass: string) => void;
  registerAccount: (name: string, ident: string, email: string) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  logout: () => void;

  mode: AccountMode;
  setMode: (mode: AccountMode) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  hideBalance: boolean;
  setHideBalance: (hide: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  lastReceipt: Transaction | null;
  setLastReceipt: (tx: Transaction | null) => void;
  
  // Current values based on active mode
  currentBalance: number;
  currentIncome: number;
  currentExpense: number;
  currentTransactions: Transaction[];
  currentCards: VirtualCard[];
  
  // Specific Personal State
  personalBalance: number;
  personalIncome: number;
  personalExpense: number;
  personalCards: VirtualCard[];
  personalTransactions: Transaction[];
  savingsGoals: SavingsGoal[];
  autoSalaryConfig: AutoSalaryConfig;
  
  // Specific Business State
  businessBalance: number;
  businessIncome: number;
  businessExpense: number;
  businessCards: VirtualCard[];
  businessTransactions: Transaction[];
  invoices: Invoice[];
  employees: Employee[];
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationsRead: () => void;
  
  // Actions
  formatAmount: (amount: number) => string;
  sendMoney: (data: {
    recipient: string;
    method: 'phone' | 'card' | 'bank';
    amount: number;
    note?: string;
    category?: string;
  }) => Transaction;
  topUpAccount: (data: {
    amount: number;
    source: string;
    targetCardId?: string;
  }) => Transaction;
  payService: (data: {
    serviceName: string;
    accountOrPhone: string;
    amount: number;
    category: string;
  }) => Transaction;
  toggleCardFreeze: (cardId: string) => void;
  updateCardLimit: (cardId: string, newLimit: number) => void;
  
  // Personal actions
  updateAutoSalaryConfig: (config: Partial<AutoSalaryConfig>) => void;
  triggerAutoSalary: (customAmount?: number) => { total: number; toCard: number; toGoal: number; remaining: number };
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  depositToGoal: (goalId: string, amount: number) => void;
  
  // Business actions
  createInvoice: (inv: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  markInvoiceAsPaid: (invoiceId: string) => void;
  payEmployeeSalary: (employeeId: string) => void;
  payAllSalaries: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication & Onboarding
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('xpay_authenticated') === 'true';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('xpay_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return defaultUserProfile;
  });

  const [mode, setMode] = useState<AccountMode>('personal');
  const [currency, setCurrency] = useState<Currency>('UZS');
  const [hideBalance, setHideBalance] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [lastReceipt, setLastReceipt] = useState<Transaction | null>(null);

  // Personal state
  const [personalBalance, setPersonalBalance] = useState<number>(12480000);
  const [personalIncome, setPersonalIncome] = useState<number>(5200000);
  const [personalExpense, setPersonalExpense] = useState<number>(2340000);
  const [personalCards, setPersonalCards] = useState<VirtualCard[]>(initialPersonalCards);
  const [personalTransactions, setPersonalTransactions] = useState<Transaction[]>(initialPersonalTransactions);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(initialSavingsGoals);
  const [autoSalaryConfig, setAutoSalaryConfig] = useState<AutoSalaryConfig>(initialAutoSalaryConfig);

  // Business state
  const [businessBalance, setBusinessBalance] = useState<number>(84500000);
  const [businessIncome, setBusinessIncome] = useState<number>(34200000);
  const [businessExpense, setBusinessExpense] = useState<number>(14800000);
  const [businessCards, setBusinessCards] = useState<VirtualCard[]>(initialBusinessCards);
  const [businessTransactions, setBusinessTransactions] = useState<Transaction[]>(initialBusinessTransactions);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'XPAY Virtual Karta faol',
      body: 'Virtual Visa kartangiz muvaffaqiyatli ulangan va xalqaro to\'lovlar uchun ochiq.',
      time: '1 soat oldin',
      read: false,
      type: 'success',
    },
    {
      id: 'notif-2',
      title: 'Avto-Hisob Tizimi Faol',
      body: 'Karta va oylik tushumi inson aralashuvisiz 100% avtomatik hisoblab boriladi.',
      time: '3 soat oldin',
      read: false,
      type: 'info',
    },
    {
      id: 'notif-3',
      title: 'Keshbek hisoblandi',
      body: 'Ucell aloqa to\'lovidan +2,500 so\'m keshbek hisobingizga tushdi.',
      time: 'Bugun, 12:45',
      read: true,
      type: 'success',
    },
  ]);

  // Save profile & auth state to localStorage
  useEffect(() => {
    localStorage.setItem('xpay_authenticated', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('xpay_user_profile', JSON.stringify(userProfile));
  }, [isAuthenticated, userProfile]);

  // Auth Methods
  const loginWithGoogle = () => {
    setUserProfile((prev) => ({
      ...prev,
      name: 'Davlatbek Xayrullayev (Google)',
      email: 'davlatbek.google@xpay.uz',
    }));
    setIsAuthenticated(true);
    triggerConfetti();
  };

  const loginWithCredentials = (ident: string, _pass: string) => {
    setUserProfile((prev) => ({
      ...prev,
      phone: ident.startsWith('+') ? ident : prev.phone,
      email: ident.includes('@') ? ident : prev.email,
    }));
    setIsAuthenticated(true);
    triggerConfetti();
  };

  const registerAccount = (name: string, ident: string, email: string) => {
    setUserProfile((prev) => ({
      ...prev,
      name: name || 'Davlatbek Xayrullayev',
      phone: ident,
      email: email,
      onboardingCompleted: false, // force onboarding questions
    }));
    setIsAuthenticated(true);
    triggerConfetti();
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    const updated = {
      ...userProfile,
      ...data,
      onboardingCompleted: true,
      autoAccountingEnabled: true,
    };
    setUserProfile(updated);

    // Apply monthly salary to AutoSalaryConfig
    if (data.monthlyIncome) {
      setAutoSalaryConfig((prev) => ({
        ...prev,
        expectedSalary: data.monthlyIncome || prev.expectedSalary,
        salaryDayOfMonth: data.salaryDayOfMonth || prev.salaryDayOfMonth,
        enabled: true,
      }));
    }

    if (data.accountGoal === 'business') {
      setMode('business');
    }

    // Add welcoming notification
    setNotifications((prev) => [
      {
        id: `notif-welcome-${Date.now()}`,
        title: 'Avto-Hisob tizimi ishga tushdi! 🎉',
        body: `Oylik daromad (${(data.monthlyIncome || 7500000).toLocaleString()} so'm) va karta (${data.linkedCardNumber || '8600 •••• 4678'}) muvaffaqiyatli ulandi. Endi dasturga kirib "oyligim tushdi" deb kiritishingiz shart emas, barchasi avtomat tarzda hisoblanadi.`,
        time: 'Hozirgina',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);

    triggerConfetti();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile((prev) => ({ ...prev, onboardingCompleted: false }));
    localStorage.removeItem('xpay_authenticated');
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Currency conversion & formatting
  const UZS_PER_USD = 12800;

  const formatAmount = (amountInUZS: number): string => {
    if (hideBalance) return '••••••';
    if (currency === 'USD') {
      const usd = amountInUZS / UZS_PER_USD;
      return `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${amountInUZS.toLocaleString('uz-UZ')} so'm`;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#2563EB', '#38BDF8', '#10B981', '#6366F1'],
      });
    } catch {
      // ignore
    }
  };

  // Send Money
  const sendMoney = (data: {
    recipient: string;
    method: 'phone' | 'card' | 'bank';
    amount: number;
    note?: string;
    category?: string;
  }): Transaction => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `O'tkazma (${data.recipient})`,
      amount: data.amount,
      type: 'expense',
      category: data.category || "O'tkazmalar",
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: 'ArrowUpRight',
      recipientOrSender: data.recipient,
      cardNumber: mode === 'personal' ? '**** 4678' : '**** 9821',
      status: 'completed',
      fee: 0,
      note: data.note || "XPAY tezkor o'tkazmasi",
    };

    if (mode === 'personal') {
      setPersonalBalance((prev) => Math.max(0, prev - data.amount));
      setPersonalExpense((prev) => prev + data.amount);
      setPersonalTransactions((prev) => [newTx, ...prev]);
    } else {
      setBusinessBalance((prev) => Math.max(0, prev - data.amount));
      setBusinessExpense((prev) => prev + data.amount);
      setBusinessTransactions((prev) => [newTx, ...prev]);
    }

    setLastReceipt(newTx);
    triggerConfetti();
    return newTx;
  };

  // Top Up Account
  const topUpAccount = (data: {
    amount: number;
    source: string;
    targetCardId?: string;
  }): Transaction => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `Hisob to'ldirildi (${data.source})`,
      amount: data.amount,
      type: 'income',
      category: "Hisob to'ldirish",
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: 'ArrowDownLeft',
      recipientOrSender: data.source,
      cardNumber: mode === 'personal' ? '**** 4678' : '**** 9821',
      status: 'completed',
      fee: 0,
      note: "Balans to'ldirish (Avtomatik)",
    };

    if (mode === 'personal') {
      setPersonalBalance((prev) => prev + data.amount);
      setPersonalIncome((prev) => prev + data.amount);
      setPersonalTransactions((prev) => [newTx, ...prev]);
      if (data.targetCardId) {
        setPersonalCards((prev) =>
          prev.map((c) => (c.id === data.targetCardId ? { ...c, balance: c.balance + data.amount } : c))
        );
      }
    } else {
      setBusinessBalance((prev) => prev + data.amount);
      setBusinessIncome((prev) => prev + data.amount);
      setBusinessTransactions((prev) => [newTx, ...prev]);
      if (data.targetCardId) {
        setBusinessCards((prev) =>
          prev.map((c) => (c.id === data.targetCardId ? { ...c, balance: c.balance + data.amount } : c))
        );
      }
    }

    setLastReceipt(newTx);
    triggerConfetti();
    return newTx;
  };

  // Pay Service (Internet, Mobile, Utilities, etc.)
  const payService = (data: {
    serviceName: string;
    accountOrPhone: string;
    amount: number;
    category: string;
  }): Transaction => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `${data.serviceName} to'lovi`,
      amount: data.amount,
      type: 'expense',
      category: data.category,
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: data.category === 'Aloqa & Internet' ? 'Wifi' : 'Zap',
      recipientOrSender: data.accountOrPhone,
      cardNumber: mode === 'personal' ? '**** 4678' : '**** 9821',
      status: 'completed',
      fee: 0,
      note: `Hisob: ${data.accountOrPhone}`,
    };

    if (mode === 'personal') {
      setPersonalBalance((prev) => Math.max(0, prev - data.amount));
      setPersonalExpense((prev) => prev + data.amount);
      setPersonalTransactions((prev) => [newTx, ...prev]);
    } else {
      setBusinessBalance((prev) => Math.max(0, prev - data.amount));
      setBusinessExpense((prev) => prev + data.amount);
      setBusinessTransactions((prev) => [newTx, ...prev]);
    }

    setLastReceipt(newTx);
    triggerConfetti();
    return newTx;
  };

  // Toggle Card Freeze / Unfreeze
  const toggleCardFreeze = (cardId: string) => {
    if (mode === 'personal') {
      setPersonalCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, status: c.status === 'active' ? 'frozen' : 'active' } : c))
      );
    } else {
      setBusinessCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, status: c.status === 'active' ? 'frozen' : 'active' } : c))
      );
    }
  };

  // Update Card Daily Limit
  const updateCardLimit = (cardId: string, newLimit: number) => {
    if (mode === 'personal') {
      setPersonalCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, dailyLimit: newLimit } : c))
      );
    } else {
      setBusinessCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, dailyLimit: newLimit } : c))
      );
    }
  };

  // Auto-Salary Trigger & Automation
  const updateAutoSalaryConfig = (config: Partial<AutoSalaryConfig>) => {
    setAutoSalaryConfig((prev) => ({ ...prev, ...config }));
  };

  const triggerAutoSalary = (customAmount?: number) => {
    const totalSalary = customAmount || autoSalaryConfig.expectedSalary;
    const goalPercent = autoSalaryConfig.autoSaveToGoalPercent / 100;
    const cardPercent = autoSalaryConfig.autoTransferToCardPercent / 100;

    const toGoal = Math.round(totalSalary * goalPercent);
    const toCard = Math.round(totalSalary * cardPercent);
    const remaining = totalSalary - toGoal - toCard;

    // Add total to income & balance
    setPersonalBalance((prev) => prev + totalSalary);
    setPersonalIncome((prev) => prev + totalSalary);

    // Deposit to target goal if configured
    if (toGoal > 0 && autoSalaryConfig.targetGoalId) {
      setSavingsGoals((prev) =>
        prev.map((g) =>
          g.id === autoSalaryConfig.targetGoalId
            ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + toGoal) }
            : g
        )
      );
    }

    // Allocate to virtual card
    if (toCard > 0 && autoSalaryConfig.targetCardId) {
      setPersonalCards((prev) =>
        prev.map((c) =>
          c.id === autoSalaryConfig.targetCardId
            ? { ...c, balance: c.balance + toCard }
            : c
        )
      );
    }

    // Create a transaction record
    const salaryTx: Transaction = {
      id: `salary-${Date.now()}`,
      title: 'Oylik maosh (Avto-hisoblandi)',
      amount: totalSalary,
      type: 'income',
      category: 'Oylik maosh',
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: 'Banknote',
      recipientOrSender: 'Bank API (Avto-Oylik)',
      cardNumber: '**** 4678',
      status: 'completed',
      fee: 0,
      note: `Inson aralashuvisiz: ${toGoal.toLocaleString()} so'm jamg'armaga, ${toCard.toLocaleString()} so'm virtual kartaga yo'naltirildi.`,
    };

    setPersonalTransactions((prev) => [salaryTx, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-sal-${Date.now()}`,
        title: 'Oylik maosh avtomatik tushdi va taqsimlandi! 💰',
        body: `Jami: ${totalSalary.toLocaleString()} so'm. Jamg'armaga: ${toGoal.toLocaleString()} so'm, Kartaga: ${toCard.toLocaleString()} so'm ajratildi.`,
        time: 'Hozirgina',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);

    triggerConfetti();

    return { total: totalSalary, toCard, toGoal, remaining };
  };

  // Add Savings Goal
  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      currentAmount: 0,
    };
    setSavingsGoals((prev) => [...prev, newGoal]);
    triggerConfetti();
  };

  // Deposit money to specific Savings Goal
  const depositToGoal = (goalId: string, amount: number) => {
    if (personalBalance < amount) return;

    setPersonalBalance((prev) => prev - amount);
    setSavingsGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) } : g
      )
    );

    const goal = savingsGoals.find((g) => g.id === goalId);

    const tx: Transaction = {
      id: `tx-goal-${Date.now()}`,
      title: `Jamg'arma to'ldirildi (${goal?.title || 'Maqsad'})`,
      amount: amount,
      type: 'expense',
      category: "Jamg'arma",
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: 'PiggyBank',
      recipientOrSender: goal?.title,
      cardNumber: '**** 4678',
      status: 'completed',
      fee: 0,
      note: `${goal?.title} uchun jamg'arildi`,
    };

    setPersonalTransactions((prev) => [tx, ...prev]);
    triggerConfetti();
  };

  // Business Actions
  const createInvoice = (inv: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const count = invoices.length + 1045;
    const newInv: Invoice = {
      ...inv,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${count}`,
    };
    setInvoices((prev) => [newInv, ...prev]);
  };

  const markInvoiceAsPaid = (invoiceId: string) => {
    const target = invoices.find((i) => i.id === invoiceId);
    if (!target || target.status === 'paid') return;

    setInvoices((prev) =>
      prev.map((i) => (i.id === invoiceId ? { ...i, status: 'paid' } : i))
    );

    setBusinessBalance((prev) => prev + target.amount);
    setBusinessIncome((prev) => prev + target.amount);

    const tx: Transaction = {
      id: `tx-inv-${Date.now()}`,
      title: `Schyot to'landi (${target.clientName})`,
      amount: target.amount,
      type: 'income',
      category: 'Sotuvlar & Xizmatlar',
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: 'CheckCircle2',
      recipientOrSender: target.clientName,
      cardNumber: '**** 9821',
      status: 'completed',
      fee: 0,
      note: `${target.invoiceNumber} bo'yicha to'liq to'lov`,
    };

    setBusinessTransactions((prev) => [tx, ...prev]);
    triggerConfetti();
  };

  const payEmployeeSalary = (employeeId: string) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp || emp.paymentStatus === 'paid') return;

    if (businessBalance < emp.salary) return;

    setBusinessBalance((prev) => prev - emp.salary);
    setBusinessExpense((prev) => prev + emp.salary);

    setEmployees((prev) =>
      prev.map((e) => (e.id === employeeId ? { ...e, paymentStatus: 'paid', lastPaidDate: 'Bugun' } : e))
    );

    const tx: Transaction = {
      id: `tx-emp-${Date.now()}`,
      title: `Oylik to'landi: ${emp.name}`,
      amount: emp.salary,
      type: 'expense',
      category: 'Ish haqi',
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: 'Users',
      recipientOrSender: emp.name,
      cardNumber: '**** 9821',
      status: 'completed',
      fee: 0,
      note: `${emp.role} uchun oylik to'lovi`,
    };

    setBusinessTransactions((prev) => [tx, ...prev]);
    triggerConfetti();
  };

  const payAllSalaries = () => {
    const pendingEmployees = employees.filter((e) => e.paymentStatus === 'pending');
    if (pendingEmployees.length === 0) return;

    const totalSalaryNeeded = pendingEmployees.reduce((sum, e) => sum + e.salary, 0);
    if (businessBalance < totalSalaryNeeded) return;

    setBusinessBalance((prev) => prev - totalSalaryNeeded);
    setBusinessExpense((prev) => prev - totalSalaryNeeded);

    setEmployees((prev) =>
      prev.map((e) => ({ ...e, paymentStatus: 'paid', lastPaidDate: 'Bugun' }))
    );

    const tx: Transaction = {
      id: `tx-all-emp-${Date.now()}`,
      title: `Barcha xodimlar oyligi to'landi (${pendingEmployees.length} kishi)`,
      amount: totalSalaryNeeded,
      type: 'expense',
      category: 'Ish haqi',
      date: 'Bugun',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      iconName: 'Users',
      recipientOrSender: 'XPAY Corporate Payroll',
      cardNumber: '**** 9821',
      status: 'completed',
      fee: 0,
      note: 'Oylik to\'liq yopildi',
    };

    setBusinessTransactions((prev) => [tx, ...prev]);
    triggerConfetti();
  };

  // Derive current values
  const currentBalance = mode === 'personal' ? personalBalance : businessBalance;
  const currentIncome = mode === 'personal' ? personalIncome : businessIncome;
  const currentExpense = mode === 'personal' ? personalExpense : businessExpense;
  const currentTransactions = mode === 'personal' ? personalTransactions : businessTransactions;
  const currentCards = mode === 'personal' ? personalCards : businessCards;

  return (
    <FinanceContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        loginWithGoogle,
        loginWithCredentials,
        registerAccount,
        completeOnboarding,
        logout,
        mode,
        setMode,
        currency,
        setCurrency,
        hideBalance,
        setHideBalance,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        lastReceipt,
        setLastReceipt,
        currentBalance,
        currentIncome,
        currentExpense,
        currentTransactions,
        currentCards,
        personalBalance,
        personalIncome,
        personalExpense,
        personalCards,
        personalTransactions,
        savingsGoals,
        autoSalaryConfig,
        businessBalance,
        businessIncome,
        businessExpense,
        businessCards,
        businessTransactions,
        invoices,
        employees,
        notifications,
        markNotificationsRead,
        formatAmount,
        sendMoney,
        topUpAccount,
        payService,
        toggleCardFreeze,
        updateCardLimit,
        updateAutoSalaryConfig,
        triggerAutoSalary,
        addSavingsGoal,
        depositToGoal,
        createInvoice,
        markInvoiceAsPaid,
        payEmployeeSalary,
        payAllSalaries,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
