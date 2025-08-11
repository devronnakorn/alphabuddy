'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Account } from '@/lib/types';

interface PlannerFormProps {
  onCalculate: (account: Account) => void;
}

export function PlannerForm({ onCalculate }: PlannerFormProps) {
  const [formData, setFormData] = useState<Partial<Account>>({
    name: 'Planner Account',
    balanceUSDT: 0,
    targetDailyPts: 0,
    multiplier: 1,
    volumePerRound: 0,
    feeRateSpot: 0.001,
    useBNBDiscount: false,
    rewardPerPt: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const account: Account = {
      id: 'planner',
      name: formData.name || 'Planner Account',
      balanceUSDT: Number(formData.balanceUSDT) || 0,
      targetDailyPts: Number(formData.targetDailyPts) || 0,
      multiplier: formData.multiplier as 1 | 2 | 4,
      volumePerRound: Number(formData.volumePerRound) || 0,
      feeRateSpot: Number(formData.feeRateSpot) || 0.001,
      useBNBDiscount: formData.useBNBDiscount || false,
      rewardPerPt: Number(formData.rewardPerPt) || 0,
    };

    onCalculate(account);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Account Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Balance in Account (เงินค้างในบัญชี) USDT
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.balanceUSDT}
              onChange={(e) => setFormData({ ...formData, balanceUSDT: Number(e.target.value) })}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Target Daily Points (เป้าแต้มต่อวัน)
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.targetDailyPts}
              onChange={(e) => setFormData({ ...formData, targetDailyPts: Number(e.target.value) })}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Multiplier (ตัวคูณ)
            </label>
            <Select
              value={formData.multiplier?.toString()}
              onValueChange={(value) => setFormData({ ...formData, multiplier: Number(value) as 1 | 2 | 4 })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select multiplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">x1</SelectItem>
                <SelectItem value="2">x2</SelectItem>
                <SelectItem value="4">x4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Volume Per Round (วอลุ่มต่อรอบ)
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.volumePerRound}
              onChange={(e) => setFormData({ ...formData, volumePerRound: Number(e.target.value) })}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Basic Spot Fee Rate (ค่าฟี Spot พื้นฐาน)
            </label>
            <Input
              type="number"
              step="0.0001"
              value={formData.feeRateSpot}
              onChange={(e) => setFormData({ ...formData, feeRateSpot: Number(e.target.value) })}
              placeholder="0.001"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="bnb-discount-planner"
              checked={formData.useBNBDiscount}
              onCheckedChange={(checked) => setFormData({ ...formData, useBNBDiscount: checked as boolean })}
            />
            <label htmlFor="bnb-discount-planner" className="text-sm font-medium">
              Use BNB 25% Discount
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Reward $ Per Point (Reward $ ต่อแต้ม)
            </label>
            <Input
              type="number"
              step="0.0001"
              value={formData.rewardPerPt}
              onChange={(e) => setFormData({ ...formData, rewardPerPt: Number(e.target.value) })}
              placeholder="0.0000"
            />
          </div>

          <Button type="submit" className="w-full">
            Calculate Results
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}