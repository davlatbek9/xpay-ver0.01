import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { CardView } from './components/CardView';
import { TransactionsView } from './components/TransactionsView';
import { AnalyticsView } from './components/AnalyticsView';
import { SavingsView } from './components/SavingsView';
import { AiAdvisorView } from './components/AiAdvisorView';
import { ProfileView } from './components/ProfileView';
import { AcademyView } from './components/AcademyView';

// Auth & Onboarding Flow
import { AuthScreen } from './components/auth/AuthScreen';
import { OnboardingWizard } from './components/auth/OnboardingWizard';

// Modals
import { SendMoneyModal } from './components/modals/SendMoneyModal';
import { TopUpModal } from './components/modals/TopUpModal';
import { PayServicesModal } from './components/modals/PayServicesModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { AutoSalaryModal } from './components/modals/AutoSalaryModal';
import { AutoSyncBankModal } from './components/modals/AutoSyncBankModal';

const AppFlowRouter: React.FC = () => {
  const { isAuthenticated, userProfile, activeTab, logout } = useFinance();

  // 1. If not authenticated, show the official Login / Register screen
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // 2. If authenticated, but onboarding questions are not completed, show the wizard
  if (!userProfile.onboardingCompleted) {
    return <OnboardingWizard />;
  }

  // 3. Authenticated and onboarded: Show the full application!
  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col bg-mesh-dark">
      {/* Header with mode switcher and balance info */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5">
        {activeTab === 'home' && <DashboardView />}
        {activeTab === 'transactions' && <TransactionsView />}
        {activeTab === 'card' && <CardView />}
        {activeTab === 'academy' && <AcademyView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'savings' && <SavingsView />}
        {activeTab === 'ai' && <AiAdvisorView />}
        {activeTab === 'profile' && <ProfileView onOpenAuth={logout} />}
      </main>

      {/* Action Modals */}
      <SendMoneyModal />
      <TopUpModal />
      <PayServicesModal />
      <ReceiptModal />
      <AutoSalaryModal />
      <AutoSyncBankModal />

      {/* Floating Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <AppFlowRouter />
    </FinanceProvider>
  );
}
