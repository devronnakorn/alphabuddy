export interface Account {
  id: string;
  name: string;
  balanceUSDT: number;
  targetDailyPts: number;
  multiplier: 1 | 2 | 4;
  volumePerRound: number;
  feeRateSpot: number;
  useBNBDiscount: boolean;
  rewardPerPt: number;
}

export interface CalculationResult {
  balancePts: number;
  volumePtsPerRound: number;
  roundsNeeded: number;
  feePerDay: number;
  totalPts: number;
  rewardPerDay: number;
  netProfitPerDay: number;
  netProfitPerMonth: number;
  breakEven: boolean;
}

export interface AccountWithCalculations extends Account {
  calculations: CalculationResult;
}

export interface SummaryData {
  totalDailyProfit: number;
  totalMonthlyProfit: number;
  totalPoints: number;
  accountCount: number;
  breakEvenCount: number;
}