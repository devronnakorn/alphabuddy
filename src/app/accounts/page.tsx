'use client';

import { useEffect } from 'react';
import { useAccountStore } from '@/lib/store';
import { AccountForm } from '@/components/Accounts/AccountForm';
import { AccountTable } from '@/components/Accounts/AccountTable';
import { Account } from '@/lib/types';

export default function AccountsPage() {
  const { accounts, addAccount, removeAccount, getAccountsWithCalculations, hydrated, setHydrated } = useAccountStore();

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  const accountsWithCalculations = hydrated ? getAccountsWithCalculations() : [];

  const handleAddAccount = (account: Account) => {
    addAccount(account);
  };

  const handleDeleteAccount = (id: string) => {
    if (confirm('Are you sure you want to delete this account?')) {
      removeAccount(id);
    }
  };

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your trading accounts and view real-time calculations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AccountForm onSubmit={handleAddAccount} />
        </div>
        <div className="lg:col-span-2">
          <AccountTable 
            accounts={accountsWithCalculations} 
            onDelete={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
}