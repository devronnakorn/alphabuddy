import { Account, AccountWithCalculations, SummaryData } from '../types';
import { Planner } from './Planner';

export class AccountManager {
  private accounts: Account[] = [];

  constructor(accounts: Account[] = []) {
    this.accounts = accounts;
  }

  addAccount(account: Account): void {
    this.accounts.push(account);
  }

  removeAccount(id: string): void {
    this.accounts = this.accounts.filter(account => account.id !== id);
  }

  updateAccount(id: string, updatedAccount: Partial<Account>): void {
    const index = this.accounts.findIndex(account => account.id === id);
    if (index !== -1) {
      this.accounts[index] = { ...this.accounts[index], ...updatedAccount };
    }
  }

  getAccount(id: string): Account | undefined {
    return this.accounts.find(account => account.id === id);
  }

  getAllAccounts(): Account[] {
    return [...this.accounts];
  }

  getAccountsWithCalculations(): AccountWithCalculations[] {
    return this.accounts.map(account => ({
      ...account,
      calculations: Planner.calculateResults(account)
    }));
  }

  getSummary(): SummaryData {
    const accountsWithCalculations = this.getAccountsWithCalculations();
    
    const totalDailyProfit = accountsWithCalculations.reduce(
      (sum, account) => sum + account.calculations.netProfitPerDay, 0
    );

    const totalMonthlyProfit = accountsWithCalculations.reduce(
      (sum, account) => sum + account.calculations.netProfitPerMonth, 0
    );

    const totalPoints = accountsWithCalculations.reduce(
      (sum, account) => sum + account.calculations.totalPts, 0
    );

    const breakEvenCount = accountsWithCalculations.filter(
      account => account.calculations.breakEven
    ).length;

    return {
      totalDailyProfit,
      totalMonthlyProfit,
      totalPoints,
      accountCount: this.accounts.length,
      breakEvenCount
    };
  }

  setAccounts(accounts: Account[]): void {
    this.accounts = accounts;
  }
}