import { Account, CalculationResult } from '../types';

export class Planner {
  static calculateResults(account: Account): CalculationResult {
    // BalancePts = floor(balanceUSDT / 1000) * 2
    const balancePts = Math.floor(account.balanceUSDT / 1000) * 2;

    // VolumePtsPerRound = (volumePerRound / 550) * 2.25 * multiplier
    const volumePtsPerRound = (account.volumePerRound / 550) * 2.25 * account.multiplier;

    // RoundsNeeded = ceil((targetDailyPts - BalancePts) / VolumePtsPerRound)
    const roundsNeeded = Math.max(0, Math.ceil((account.targetDailyPts - balancePts) / volumePtsPerRound));

    // FeeRate = feeRateSpot * (useBNBDiscount ? 0.75 : 1)
    const feeRate = account.feeRateSpot * (account.useBNBDiscount ? 0.75 : 1);

    // FeePerRound = FeeRate * volumePerRound * 2
    const feePerRound = feeRate * account.volumePerRound * 2;

    // FeePerDay = FeePerRound * RoundsNeeded
    const feePerDay = feePerRound * roundsNeeded;

    // TotalPts = BalancePts + (VolumePtsPerRound * RoundsNeeded)
    const totalPts = balancePts + (volumePtsPerRound * roundsNeeded);

    // RewardPerDay = TotalPts * rewardPerPt
    const rewardPerDay = totalPts * account.rewardPerPt;

    // NetProfitPerDay = RewardPerDay - FeePerDay
    const netProfitPerDay = rewardPerDay - feePerDay;

    // NetProfitPerMonth = NetProfitPerDay * 30
    const netProfitPerMonth = netProfitPerDay * 30;

    // BreakEven = NetProfitPerDay >= 0
    const breakEven = netProfitPerDay >= 0;

    return {
      balancePts,
      volumePtsPerRound,
      roundsNeeded,
      feePerDay,
      totalPts,
      rewardPerDay,
      netProfitPerDay,
      netProfitPerMonth,
      breakEven
    };
  }
}