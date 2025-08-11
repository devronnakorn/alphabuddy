# AlphaBuddy Pro - Trading Account Manager

A comprehensive trading account management webapp built with Next.js 15, TypeScript, Tailwind CSS, and ShadCN UI.

## Features

### 🏦 Account Management (`/accounts`)
- Add multiple trading accounts with detailed configurations
- Real-time calculation display in a comprehensive table
- Account fields include:
  - Account Name (ชื่อบัญชี)
  - Balance in Account (เงินค้างในบัญชี) - USDT
  - Target Daily Points (เป้าแต้มต่อวัน)
  - Multiplier (ตัวคูณ) - x1, x2, x4
  - Volume Per Round (วอลุ่มต่อรอบ)
  - Basic Spot Fee Rate (ค่าฟี Spot พื้นฐาน)
  - Use BNB 25% Discount Checkbox
  - Reward $ Per Point (Reward $ ต่อแต้ม)

### 📊 Trading Planner (`/planner`)
- Single account detailed calculator
- Interactive form with real-time calculations
- Detailed results breakdown with explanations
- Visual calculation formulas display

### 📈 Portfolio Summary (`/summary`)
- Multi-account aggregate results
- Summary cards showing key metrics
- Comprehensive table with totals row
- Performance tracking across all accounts

## Calculation Formulas

```typescript
BalancePts = floor(balanceUSDT / 1000) * 2
VolumePtsPerRound = (volumePerRound / 550) * 2.25 * multiplier
RoundsNeeded = ceil((targetDailyPts - BalancePts) / VolumePtsPerRound)
FeeRate = feeRateSpot * (useBNBDiscount ? 0.75 : 1)
FeePerRound = FeeRate * volumePerRound * 2
FeePerDay = FeePerRound * RoundsNeeded
TotalPts = BalancePts + (VolumePtsPerRound * RoundsNeeded)
RewardPerDay = TotalPts * rewardPerPt
NetProfitPerDay = RewardPerDay - FeePerDay
NetProfitPerMonth = NetProfitPerDay * 30
BreakEven = NetProfitPerDay >= 0
```

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **State Management:** Zustand with localStorage persistence
- **Icons:** Lucide React

## Project Structure

```
alphabuddy/
├── src/
│   ├── app/
│   │   ├── accounts/page.tsx
│   │   ├── planner/page.tsx
│   │   ├── summary/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/ (ShadCN components)
│   │   ├── Layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── Accounts/
│   │   │   ├── AccountForm.tsx
│   │   │   └── AccountTable.tsx
│   │   ├── Planner/
│   │   │   ├── PlannerForm.tsx
│   │   │   └── PlannerResults.tsx
│   │   └── Summary/
│   │       ├── SummaryCards.tsx
│   │       └── SummaryTable.tsx
│   ├── lib/
│   │   ├── classes/
│   │   │   ├── Planner.ts
│   │   │   └── AccountManager.ts
│   │   ├── types.ts
│   │   ├── store.ts (Zustand)
│   │   └── utils.ts
│   └── hooks/
│       └── useLocalStorage.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alphabuddy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

### 🎯 Object-Oriented Architecture
- Separate `Planner` and `AccountManager` classes for business logic
- Clean separation of concerns
- Modular component structure

### 💾 Data Persistence
- Zustand store with localStorage integration
- Automatic data persistence across browser sessions
- Hydration handling for SSR compatibility

### 📱 Responsive Design
- Mobile-first approach
- Responsive tables and layouts
- Clean, professional UI design

### 🧮 Accurate Calculations
- Precise mathematical formulas
- Support for different multipliers (x1, x2, x4)
- Real-time calculation updates
- Break-even analysis

### 🔧 Type Safety
- Comprehensive TypeScript interfaces
- Strict type checking
- Runtime type validation

## Usage

1. **Add Accounts**: Use the form on the Accounts page to add trading accounts
2. **View Calculations**: Real-time calculations are displayed in the accounts table
3. **Plan Strategies**: Use the Planner for detailed single-account analysis
4. **Monitor Portfolio**: Check the Summary page for overall performance metrics

## License

This project is licensed under the MIT License.