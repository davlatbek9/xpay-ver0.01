export type AccountMode = 'personal' | 'business';

export type Currency = 'UZS' | 'USD';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  accountGoal: 'personal' | 'business' | 'both';
  hasBusiness: boolean;
  businessName?: string;
  businessType?: string;
  monthlyIncome: number;
  salaryDayOfMonth: number;
  linkedCardNumber: string;
  linkedCardBrand: 'uzcard' | 'humo' | 'visa';
  autoAccountingEnabled: boolean;
  onboardingCompleted: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  time: string;
  iconName: string;
  recipientOrSender?: string;
  cardNumber?: string;
  status: 'completed' | 'pending' | 'failed';
  fee: number;
  note?: string;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  currency: Currency;
  type: 'visa' | 'uzcard' | 'humo' | 'mastercard';
  status: 'active' | 'frozen';
  dailyLimit: number;
  currentDailySpent: number;
  theme: 'blue-glow' | 'cyber-dark' | 'emerald-wave' | 'purple-neon';
  isDefault: boolean;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline?: string;
  icon: string;
  color: string;
  autoSavePercent?: number; // e.g. 10% from salary
}

export interface AutoSalaryConfig {
  enabled: boolean;
  expectedSalary: number;
  salaryDayOfMonth: number; // e.g. 5th of each month
  autoSaveToGoalPercent: number; // e.g. 20%
  autoTransferToCardPercent: number; // e.g. 50%
  targetGoalId?: string;
  targetCardId?: string;
  lastSimulatedDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail?: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  taxAmount: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
  paymentStatus: 'paid' | 'pending';
  lastPaidDate?: string;
  cardNumber: string;
}

export interface FinancialHealthAudit {
  score: number;
  rating: string;
  summary: string;
  keyInsights: string[];
  forecast: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
