'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AccountWithCalculations } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface SummaryTableProps {
  accounts: AccountWithCalculations[];
}

export function SummaryTable({ accounts }: SummaryTableProps) {
  if (accounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No accounts found. Add accounts to see summary data.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate totals
  const totals = accounts.reduce(
    (acc, account) => ({
      totalPts: acc.totalPts + account.calculations.totalPts,
      rewardPerDay: acc.rewardPerDay + account.calculations.rewardPerDay,
      feePerDay: acc.feePerDay + account.calculations.feePerDay,
      netProfitPerDay: acc.netProfitPerDay + account.calculations.netProfitPerDay,
      netProfitPerMonth: acc.netProfitPerMonth + account.calculations.netProfitPerMonth,
    }),
    {
      totalPts: 0,
      rewardPerDay: 0,
      feePerDay: 0,
      netProfitPerDay: 0,
      netProfitPerMonth: 0,
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Balance USDT</TableHead>
                <TableHead>Target Pts</TableHead>
                <TableHead>Multiplier</TableHead>
                <TableHead>Total Pts</TableHead>
                <TableHead>Reward/Day</TableHead>
                <TableHead>Fee/Day</TableHead>
                <TableHead>Net Profit/Day</TableHead>
                <TableHead>Net Profit/Month</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{formatCurrency(account.balanceUSDT)}</TableCell>
                  <TableCell>{formatNumber(account.targetDailyPts)}</TableCell>
                  <TableCell>x{account.multiplier}</TableCell>
                  <TableCell>{formatNumber(account.calculations.totalPts)}</TableCell>
                  <TableCell className="text-green-600">
                    {formatCurrency(account.calculations.rewardPerDay)}
                  </TableCell>
                  <TableCell className="text-red-600">
                    {formatCurrency(account.calculations.feePerDay)}
                  </TableCell>
                  <TableCell className={account.calculations.netProfitPerDay >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(account.calculations.netProfitPerDay)}
                  </TableCell>
                  <TableCell className={account.calculations.netProfitPerMonth >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(account.calculations.netProfitPerMonth)}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      account.calculations.breakEven 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {account.calculations.breakEven ? 'Profitable' : 'Loss'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="border-t-2 border-gray-300 font-bold bg-gray-50">
                <TableCell colSpan={4} className="text-right">TOTALS:</TableCell>
                <TableCell>{formatNumber(totals.totalPts)}</TableCell>
                <TableCell className="text-green-600">
                  {formatCurrency(totals.rewardPerDay)}
                </TableCell>
                <TableCell className="text-red-600">
                  {formatCurrency(totals.feePerDay)}
                </TableCell>
                <TableCell className={totals.netProfitPerDay >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(totals.netProfitPerDay)}
                </TableCell>
                <TableCell className={totals.netProfitPerMonth >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(totals.netProfitPerMonth)}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    totals.netProfitPerDay >= 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {totals.netProfitPerDay >= 0 ? 'Profitable' : 'Loss'}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}