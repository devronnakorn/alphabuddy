'use client';

import { useState } from 'react';
import { PlannerForm } from '@/components/Planner/PlannerForm';
import { PlannerResults } from '@/components/Planner/PlannerResults';
import { Account, CalculationResult } from '@/lib/types';
import { Planner } from '@/lib/classes/Planner';

export default function PlannerPage() {
  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleCalculate = (account: Account) => {
    const calculationResults = Planner.calculateResults(account);
    setResults(calculationResults);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Trading Planner</h1>
        <p className="text-gray-600 mt-2">
          Calculate detailed trading metrics for a single account
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PlannerForm onCalculate={handleCalculate} />
        </div>
        <div>
          <PlannerResults results={results} />
        </div>
      </div>
    </div>
  );
}