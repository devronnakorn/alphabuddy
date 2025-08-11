import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Account, AccountWithCalculations, SummaryData } from './types';
import { AccountManager } from './classes/AccountManager';

interface AccountStore {
  accounts: Account[];
  accountManager: AccountManager;
  addAccount: (account: Account) => void;
  removeAccount: (id: string) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  getAccountsWithCalculations: () => AccountWithCalculations[];
  getSummary: () => SummaryData;
  setAccounts: (accounts: Account[]) => void;
  hydrated: boolean;
  setHydrated: () => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      accounts: [],
      accountManager: new AccountManager([]),
      hydrated: false,
      
      setHydrated: () => set({ hydrated: true }),
      
      addAccount: (account: Account) => set((state) => {
        const newAccounts = [...state.accounts, account];
        const newManager = new AccountManager(newAccounts);
        return {
          accounts: newAccounts,
          accountManager: newManager
        };
      }),

      removeAccount: (id: string) => set((state) => {
        const newAccounts = state.accounts.filter(acc => acc.id !== id);
        const newManager = new AccountManager(newAccounts);
        return {
          accounts: newAccounts,
          accountManager: newManager
        };
      }),

      updateAccount: (id: string, updatedAccount: Partial<Account>) => set((state) => {
        const newAccounts = state.accounts.map(acc => 
          acc.id === id ? { ...acc, ...updatedAccount } : acc
        );
        const newManager = new AccountManager(newAccounts);
        return {
          accounts: newAccounts,
          accountManager: newManager
        };
      }),

      getAccountsWithCalculations: () => {
        const { accountManager } = get();
        return accountManager.getAccountsWithCalculations();
      },

      getSummary: () => {
        const { accountManager } = get();
        return accountManager.getSummary();
      },

      setAccounts: (accounts: Account[]) => set(() => {
        const newManager = new AccountManager(accounts);
        return {
          accounts,
          accountManager: newManager
        };
      })
    }),
    {
      name: 'alphabuddy-accounts',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.accountManager = new AccountManager(state.accounts);
          state.setHydrated();
        }
      },
      partialize: (state) => ({ accounts: state.accounts })
    }
  )
);