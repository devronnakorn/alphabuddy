'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SummaryData } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Target, Users } from 'lucide-react';

interface SummaryCardsProps {
  summary: SummaryData;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Daily Profit',
      value: formatCurrency(summary.totalDailyProfit),
      icon: summary.totalDailyProfit >= 0 ? TrendingUp : TrendingDown,
      color: summary.totalDailyProfit >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: summary.totalDailyProfit >= 0 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Total Monthly Profit',
      value: formatCurrency(summary.totalMonthlyProfit),
      icon: summary.totalMonthlyProfit >= 0 ? TrendingUp : TrendingDown,
      color: summary.totalMonthlyProfit >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: summary.totalMonthlyProfit >= 0 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Total Points',
      value: formatNumber(summary.totalPoints),
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Accounts',
      value: `${summary.accountCount} (${summary.breakEvenCount} profitable)`,
      icon: Users,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}