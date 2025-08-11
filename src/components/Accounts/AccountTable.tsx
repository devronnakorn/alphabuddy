'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AccountWithCalculations } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface AccountTableProps {
  accounts: AccountWithCalculations[];
  onDelete: (id: string) => void;
}

export function AccountTable({ accounts, onDelete }: AccountTableProps) {
  if (accounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No accounts found. Add your first account above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
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
                <TableHead>Balance Pts</TableHead>
                <TableHead>Volume Pts/Round</TableHead>
                <TableHead>Rounds Needed</TableHead>
                <TableHead>Fee/Day</TableHead>
                <TableHead>Total Pts</TableHead>
                <TableHead>Reward/Day</TableHead>
                <TableHead>Net Profit/Day</TableHead>
                <TableHead>Net Profit/Month</TableHead>
                <TableHead>Break-even</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{formatCurrency(account.balanceUSDT)}</TableCell>
                  <TableCell>{formatNumber(account.targetDailyPts)}</TableCell>
                  <TableCell>x{account.multiplier}</TableCell>
                  <TableCell>{formatNumber(account.calculations.balancePts)}</TableCell>
                  <TableCell>{formatNumber(account.calculations.volumePtsPerRound)}</TableCell>
                  <TableCell>{account.calculations.roundsNeeded}</TableCell>
                  <TableCell>{formatCurrency(account.calculations.feePerDay)}</TableCell>
                  <TableCell>{formatNumber(account.calculations.totalPts)}</TableCell>
                  <TableCell>{formatCurrency(account.calculations.rewardPerDay)}</TableCell>
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
                      {account.calculations.breakEven ? '✅' : '❌'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(account.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}