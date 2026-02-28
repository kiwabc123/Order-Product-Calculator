# 🛒 Order Calculator

A professional React + TypeScript web application for calculating order prices with real-time discount management. Built with Vite, featuring a clean UI with advanced discount logic and comprehensive test coverage.

## 🚀 Live Demo

**[https://order-product-calculator.vercel.app/](https://order-product-calculator.vercel.app/)**

Try the calculator live! Add items to cart, toggle member status, and see real-time discount calculations.

---

## 📋 Features

### Core Functionality
- ✅ **Dynamic Price Calculation** - Real-time total updates as items are added/removed
- ✅ **Item Discounts** - 5% discount for Orange, Pink, and Green sets when quantity is even
- ✅ **Member Discount** - 10% discount for members on total order value
- ✅ **Cart Management** - Add, update, and remove items with live calculation
- ✅ **Order Confirmation** - SweetAlert2 modals with detailed breakdown
- ✅ **Clear Cart Confirmation** - Prevent accidental cart clearing

### UI/UX Enhancements
- 🎨 **Professional Design** - Custom color theme (Dark mode with accent colors)
- 🎯 **Visual Hierarchy** - Card hover effects, elevation, and smooth animations
- 📱 **Responsive Layout** - 3:1 grid layout (menu: cart panel)
- ✨ **Real-time Feedback** - Discount badges, price animations, scale effects
- 🔢 **Formatted Currency** - Localized number formatting ($1,234.56)
- 🎪 **Glassmorphism Header** - Blur effect and gradient backgrounds

### Color Theme
- **Primary**: `#B35656` (Muted Red)
- **Secondary**: `#87B6BC` (Dusty Blue)
- **Accent**: `#F6F09F` (Cream)
- **Muted**: `#BED4CB` (Sage Green)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (tested on v16.20.2)
- npm 8+

### Installation

```bash
cd orderProduct
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3001` with hot module replacement (HMR).

### Build for Production

```bash
npm run build
```

Outputs optimized bundle to `dist/` folder.

### Run Tests

```bash
npm test                 # Run all tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

## 📦 Project Structure

```
orderProduct/
├── src/
│   ├── components/              # React UI components
│   │   ├── MenuItemSelector.tsx # Item selection cards
│   │   ├── OrderSummary.tsx     # Cart items display
│   │   ├── PriceDisplay.tsx     # Total price breakdown
│   │   ├── MemberToggle.tsx     # Member discount toggle
│   │   └── OrderCalculator.tsx  # Main container component
│   ├── services/                # Business logic
│   │   ├── PriceCalculator.ts   # Price calculation engine
│   │   └── DiscountService.ts   # Discount logic
│   ├── hooks/                   # Custom React hooks
│   │   ├── usePriceCalculation.ts # Price state & calculations
│   │   └── useOrderManagement.ts  # Order state & operations
│   ├── models/                  # TypeScript types & enums
│   │   └── MenuItem.ts          # Menu item enum (Red, Green, Blue, etc.)
│   ├── constants/               # Static values
│   │   └── MenuPrices.ts        # Price mapping by item
│   ├── utils/                   # Utility functions
│   │   └── formatters.ts        # Currency formatting
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry point
├── tests/                       # Jest test suite
│   ├── services/
│   │   ├── PriceCalculator.test.ts (24 tests)
│   │   └── DiscountService.test.ts
│   └── ...
├── index.html                   # HTML template
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── jest.config.cjs              # Jest configuration
└── package.json                 # Project dependencies
```

## 🧪 Test Coverage

**Total: 24 tests (100% passing)**

### PriceCalculator Tests (15 tests)
- Basic price calculation
- Item discount application (5%)
- Member discount application (10%)
- Combined discounts
- Multiple items handling
- Detailed breakdown calculations

### Problem Statement Test Cases
1. **Desk#1 - Red + Green Order ($90)**
   - ✅ Calculate Red ($50) + Green ($40) = $90
   - ✅ Apply 10% member discount = $81

2. **Item Discount (5%)**
   - ✅ Orange sets with quantity 2 or more (2, 3, 4, 5...)
   - ✅ Pink sets with quantity 2 or more
   - ✅ Green sets with quantity 2 or more

3. **Member Discount (10%)**
   - ✅ Applied to total after item discounts
   - ✅ Can be combined with item discounts

### DiscountService Tests (9 tests)
- Item discount eligibility
- Member discount application
- Discount percentage calculation

```bash
Test Suites: 2 passed, 2 total
Tests:       24 passed, 24 total
```

## 💡 Usage Example

### Selecting Items
1. Browse menu cards on the left (7 items: Red, Green, Blue, Yellow, Pink, Purple, Orange)
2. Adjust quantity with +/- buttons
3. Click "Add to Cart"

### Applying Discounts
- **Toggle Member Status**: Click the member toggle to enable 10% discount
- **Automatic Item Discount**: Orange, Pink, Green sets get 5% off when quantity is even
- **View Breakdown**: PriceDisplay shows all applied discounts

### Checkout
1. Click "💳 Checkout" button
2. Review order details and discounts in SweetAlert modal
3. Click "Complete Order" to finalize
4. Cart auto-clears after successful order

## 📐 Pricing & Discounts

### Menu Prices
| Item    | Price |
|---------|-------|
| Red     | $50   |
| Green   | $40   |
| Blue    | $30   |
| Yellow  | $50   |
| Pink    | $80   |
| Purple  | $90   |
| Orange  | $120  |

### Discount Rules
1. **Item Discount**: 5% off for Orange, Pink, Green when quantity is **2 or more items**
2. **Member Discount**: 10% off total (applies after item discounts)
3. **Combined**: Both discounts can apply to same order

### Example Calculations
```
Scenario 1: Red (qty 1) + Green (qty 1), No Member
- Subtotal: 50 + 40 = 90
- Total: $90

Scenario 2: Same order with Member discount
- Subtotal: 90
- Member discount (10%): -9
- Total: $81

Scenario 3: Orange (qty 2)
- Subtotal: 120 * 2 = 240
- Item discount (5%): -12
- Total: $228

Scenario 4: Orange (qty 2) + Member
- Subtotal: 240
- Item discount (5%): -12 = 228
- Member discount (10%): -22.8
- Total: $205.20
```

## 🛠️ Technologies

### Frontend
- **React 18.2.0** - UI library
- **TypeScript 5.3** - Type safety
- **Vite 4.5** - Fast build tool & dev server

### Testing
- **Jest 29.7** - Test framework
- **ts-jest 29.1** - TypeScript support for Jest
- **React Testing Library 14.1** - Component testing

### UI Libraries
- **SweetAlert2** - Beautiful alert modals
- **CSS3** - Animations, gradients, glassmorphism

### Build & Quality
- **ESLint** - Code linting
- **TypeScript Compiler** - Static type checking

## 🎨 Design System

### Visual Hierarchy
- Cards lift on hover with graduated shadows
- Price emphasis - Item name - Details
- Discount badges with visual indicators
- Total price with real-time updates

### Interactions
- Button hover effects with smooth feedback
- Smooth transitions for all state changes
- Glow shadows on interactive elements
- Real-time live calculations on input changes

## 🚢 Deployment

### Build
```bash
npm run build
```

### Serve Locally
```bash
npm run preview
```

### Deploy to Static Host
The `dist/` folder is production-ready and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any CDN

## 📚 Learn More

### Key Concepts
1. **Service Layer Pattern** - Business logic separate from UI
2. **Custom Hooks** - Encapsulate state management logic
3. **SOLID Principles** - Single responsibility, open/closed
4. **Real-time Calculation** - useEffect triggers recalculation on dependency changes
5. **Component Composition** - Reusable, single-purpose components

### Files to Explore
- `src/services/PriceCalculator.ts` - Core discount & pricing logic
- `src/hooks/usePriceCalculation.ts` - Price state management
- `src/components/OrderCalculator.tsx` - Main component orchestration
- `tests/services/PriceCalculator.test.ts` - Test examples

