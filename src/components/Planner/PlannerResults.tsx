'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculationResult } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface PlannerResultsProps {
  results: CalculationResult | null;
}

export function PlannerResults({ results }: PlannerResultsProps) {
  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Calculation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Enter your account details and click &quot;Calculate Results&quot; to see the analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  const resultItems = [
    {
      label: 'Balance Points',
      value: formatNumber(results.balancePts),
      description: 'Points earned from account balance'
    },
    {
      label: 'Volume Points Per Round',
      value: formatNumber(results.volumePtsPerRound),
      description: 'Points earned per trading round'
    },
    {
      label: 'Rounds Needed',
      value: results.roundsNeeded.toString(),
      description: 'Number of trading rounds required'
    },
    {
      label: 'Fee Per Day',
      value: formatCurrency(results.feePerDay),
      description: 'Total trading fees per day',
      negative: true
    },
    {
      label: 'Total Points',
      value: formatNumber(results.totalPts),
      description: 'Total points earned daily'
    },
    {
      label: 'Reward Per Day',
      value: formatCurrency(results.rewardPerDay),
      description: 'Total rewards earned daily',
      positive: true
    },
    {
      label: 'Net Profit Per Day',
      value: formatCurrency(results.netProfitPerDay),
      description: 'Daily profit after fees',
      isProfit: true
    },
    {
      label: 'Net Profit Per Month',
      value: formatCurrency(results.netProfitPerMonth),
      description: 'Monthly profit projection',
      isProfit: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Calculation Results
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            results.breakEven 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {results.breakEven ? '✅ Profitable' : '❌ Loss'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resultItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className={`text-right ${
                  item.isProfit 
                    ? (results.netProfitPerDay >= 0 ? 'text-green-600' : 'text-red-600')
                    : item.positive 
                      ? 'text-green-600' 
                      : item.negative 
                        ? 'text-red-600' 
                        : 'text-gray-900'
                }`}>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Calculation Formulas</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Balance Pts:</strong> floor(balanceUSDT / 1000) × 2</p>
            <p><strong>Volume Pts/Round:</strong> (volumePerRound / 550) × 2.25 × multiplier</p>
            <p><strong>Rounds Needed:</strong> ceil((targetDailyPts - Balance Pts) / Volume Pts/Round)</p>
            <p><strong>Fee Rate:</strong> feeRateSpot × (useBNBDiscount ? 0.75 : 1)</p>
            <p><strong>Fee/Day:</strong> Fee Rate × volumePerRound × 2 × Rounds Needed</p>
            <p><strong>Total Pts:</strong> Balance Pts + (Volume Pts/Round × Rounds Needed)</p>
            <p><strong>Reward/Day:</strong> Total Pts × rewardPerPt</p>
            <p><strong>Net Profit/Day:</strong> Reward/Day - Fee/Day</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}