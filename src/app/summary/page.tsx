'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/lib/store';
import { SummaryCards } from '@/components/Summary/SummaryCards';
import { SummaryTable } from '@/components/Summary/SummaryTable';

export default function SummaryPage() {
  const { getAccountsWithCalculations, getSummary, hydrated, setHydrated } = useAccountStore();

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  const accountsWithCalculations = hydrated ? getAccountsWithCalculations() : [];
  const summary = hydrated ? getSummary() : {
    totalDailyProfit: 0,
    totalMonthlyProfit: 0,
    totalPoints: 0,
    accountCount: 0,
    breakEvenCount: 0
  };

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Summary</h1>
          <p className="text-gray-600 mt-2">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Summary</h1>
        <p className="text-gray-600 mt-2">
          Overview of all your trading accounts and performance metrics
        </p>
      </div>

      <SummaryCards summary={summary} />
      
      <SummaryTable accounts={accountsWithCalculations} />
    </div>
  );
}