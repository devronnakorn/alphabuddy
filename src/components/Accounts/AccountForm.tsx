'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Account } from '@/lib/types';

interface AccountFormProps {
  onSubmit: (account: Account) => void;
  initialData?: Partial<Account>;
  mode?: 'create' | 'edit';
}

export function AccountForm({ onSubmit, initialData, mode = 'create' }: AccountFormProps) {
  const [formData, setFormData] = useState<Partial<Account>>({
    name: initialData?.name || '',
    balanceUSDT: initialData?.balanceUSDT || 0,
    targetDailyPts: initialData?.targetDailyPts || 0,
    multiplier: initialData?.multiplier || 1,
    volumePerRound: initialData?.volumePerRound || 0,
    feeRateSpot: initialData?.feeRateSpot || 0.001,
    useBNBDiscount: initialData?.useBNBDiscount || false,
    rewardPerPt: initialData?.rewardPerPt || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.balanceUSDT === undefined || formData.targetDailyPts === undefined) {
      alert('Please fill in all required fields');
      return;
    }

    const account: Account = {
      id: initialData?.id || Date.now().toString(),
      name: formData.name,
      balanceUSDT: Number(formData.balanceUSDT),
      targetDailyPts: Number(formData.targetDailyPts),
      multiplier: formData.multiplier as 1 | 2 | 4,
      volumePerRound: Number(formData.volumePerRound),
      feeRateSpot: Number(formData.feeRateSpot),
      useBNBDiscount: formData.useBNBDiscount || false,
      rewardPerPt: Number(formData.rewardPerPt),
    };

    onSubmit(account);
    
    if (mode === 'create') {
      setFormData({
        name: '',
        balanceUSDT: 0,
        targetDailyPts: 0,
        multiplier: 1,
        volumePerRound: 0,
        feeRateSpot: 0.001,
        useBNBDiscount: false,
        rewardPerPt: 0,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === 'create' ? 'Add New Account' : 'Edit Account'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Account Name (ชื่อบัญชี) *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter account name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Balance in Account (เงินค้างในบัญชี) USDT *
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.balanceUSDT}
              onChange={(e) => setFormData({ ...formData, balanceUSDT: Number(e.target.value) })}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Target Daily Points (เป้าแต้มต่อวัน) *
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.targetDailyPts}
              onChange={(e) => setFormData({ ...formData, targetDailyPts: Number(e.target.value) })}
              placeholder="0.00"
              required
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
              id="bnb-discount"
              checked={formData.useBNBDiscount}
              onCheckedChange={(checked) => setFormData({ ...formData, useBNBDiscount: checked as boolean })}
            />
            <label htmlFor="bnb-discount" className="text-sm font-medium">
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
            {mode === 'create' ? 'Add Account' : 'Update Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}