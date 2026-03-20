# 🛒 Order Calculator

A professional **monorepo** with React + TypeScript web application and React Native mobile app for calculating order prices with real-time discount management. Built with Vite, Expo, and Turborepo, featuring shared business logic, PWA support, and comprehensive test coverage.

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

### Multi-Platform
- 🌐 **Web App** - React + Vite with PWA support
- 📱 **Mobile App** - React Native with Expo
- 📦 **Shared Logic** - Common business logic package
- 🔄 **Monorepo** - pnpm workspaces + Turborepo

### Analytics & Integration
- 📊 **Analytics Dashboard** - View order history and statistics
- 🔗 **n8n Integration** - Automated order tracking via webhooks
- 📋 **Google Sheets Logging** - Orders automatically logged to spreadsheet
- 🐳 **Docker Support** - One-command n8n setup with auto workflow import

### UI/UX Enhancements
- 🎨 **Professional Design** - Custom color theme (Dark mode with accent colors)
- 🎯 **Visual Hierarchy** - Card hover effects, elevation, and smooth animations
- 📱 **Responsive Layout** - 3:1 grid layout (menu: cart panel)
- ✨ **Real-time Feedback** - Discount badges, price animations, scale effects
- 🔢 **Formatted Currency** - Localized number formatting ($1,234.56)
- 🎪 **Glassmorphism Header** - Blur effect and gradient backgrounds
- 📲 **PWA Support** - Install as app, offline capable

### Color Theme
- **Primary**: `#B35656` (Muted Red)
- **Secondary**: `#87B6BC` (Dusty Blue)
- **Accent**: `#F6F09F` (Cream)
- **Muted**: `#BED4CB` (Sage Green)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (Node 20+ for mobile development)
- pnpm 7.33.7+

### Installation

```bash
# Install pnpm if not installed
npm install -g pnpm@7.33.7

# Install all dependencies
pnpm install
```

### Development

```bash
# Run web app
pnpm dev:web

# Run mobile app (requires Node 20+)
pnpm dev:mobile

# Run mobile via Docker (if using Node 16)
docker-compose up mobile-dev
```

Web opens at `http://localhost:3001` with hot module replacement (HMR).

### Build for Production

```bash
# Build all packages
pnpm build

# Build web only
pnpm build:web
```

### Run Tests

```bash
pnpm test:web            # Run web tests once
pnpm test:web -- --watch # Run tests in watch mode
```

## 📦 Project Structure (Monorepo)

```
orderProduct/
├── apps/
│   ├── web/                     # React + Vite web application
│   │   ├── src/
│   │   │   ├── components/      # React UI components
│   │   │   ├── services/        # Web-specific services
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   └── ...
│   │   ├── tests/               # Jest test suite
│   │   ├── public/              # Static assets & PWA icons
│   │   └── package.json
│   │
│   └── mobile/                  # Expo React Native app
│       ├── App.tsx              # Main mobile component
│       ├── assets/              # Mobile assets & icons
│       ├── app.json             # Expo configuration
│       └── package.json
│
├── packages/
│   └── shared/                  # Shared business logic
│       └── src/
│           ├── models/          # MenuItem enum
│           ├── constants/       # MenuPrices
│           ├── services/        # DiscountService, PriceCalculator
│           └── index.ts         # Public exports
│
├── n8n/                         # n8n workflow definitions
│   ├── order-analytics-workflow.json
│   ├── get-orders-api.json
│   └── order-ai-analysis-gemini-workflow.json
│
├── docker-compose.yml           # Docker services (n8n, mobile-dev)
├── turbo.json                   # Turborepo configuration
├── pnpm-workspace.yaml          # pnpm workspace config
├── vercel.json                  # Vercel deployment config
└── package.json                 # Root package.json
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

### Monorepo & Build
- **pnpm 7.33.7** - Fast, disk-efficient package manager
- **Turborepo 2.x** - High-performance build system
- **pnpm Workspaces** - Monorepo package management

### Web App (apps/web)
- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type safety
- **Vite 4.5.0** - Fast build tool & dev server
- **vite-plugin-pwa 0.17.4** - PWA support with service worker

### Mobile App (apps/mobile)
- **Expo SDK 54** - React Native framework
- **React Native 0.77.1** - Cross-platform mobile
- **React 18.3.1** - UI library

### Shared Package (packages/shared)
- **TypeScript** - Shared types and logic
- **MenuItem enum** - Common data models
- **PriceCalculator** - Core pricing logic
- **DiscountService** - Discount calculations

### Testing
- **Jest 29.7.0** - Test framework
- **ts-jest 29.1.1** - TypeScript support for Jest
- **React Testing Library 14.1.2** - Component testing
- **@testing-library/jest-dom 6.1.5** - Custom Jest matchers

### UI Libraries
- **SweetAlert2 11.26.20** - Beautiful alert modals
- **CSS3** - Animations, gradients, glassmorphism

### Integration & Automation
- **n8n** - Workflow automation platform
- **Docker & Docker Compose** - Container orchestration
- **Google Sheets API** - Order data storage

### Deployment
- **Vercel** - Web app hosting
- **Docker** - Mobile development environment

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

### Web App (Vercel)

The project includes `vercel.json` for monorepo deployment:

```bash
# Build web app
pnpm build:web
```

Vercel configuration automatically:
- Installs pnpm
- Builds from root with `pnpm build:web`
- Outputs from `apps/web/dist`

### Mobile App (Expo)

```bash
# Start Expo with tunnel (via Docker)
docker-compose up mobile-dev

# Or with Node 20+ locally
pnpm dev:mobile
```

Scan QR code with Expo Go app on your device.

### Deploy to Static Host
The `apps/web/dist/` folder is production-ready and can be deployed to:
- Vercel (recommended - configured)
- Netlify
- GitHub Pages
- AWS S3
- Any CDN

## 📚 Learn More

### Key Concepts
1. **Monorepo Architecture** - Shared code between web and mobile apps
2. **Service Layer Pattern** - Business logic separate from UI
3. **Custom Hooks** - Encapsulate state management logic
4. **SOLID Principles** - Single responsibility, open/closed
5. **Real-time Calculation** - useEffect triggers recalculation on dependency changes
6. **Component Composition** - Reusable, single-purpose components
7. **PWA Support** - Installable web app with offline capabilities

### Files to Explore
- `packages/shared/src/services/PriceCalculator.ts` - Core discount & pricing logic
- `packages/shared/src/services/DiscountService.ts` - Discount rules
- `apps/web/src/hooks/usePriceCalculation.ts` - Price state management
- `apps/web/src/components/OrderCalculator.tsx` - Main component orchestration
- `apps/web/tests/services/PriceCalculator.test.ts` - Test examples
- `apps/mobile/App.tsx` - Mobile app entry point

## 🔗 N8n Integration

### Prerequisites
- Docker Desktop installed and running

### Quick Start

```bash
# Start n8n container
docker-compose up n8n -d

# Import and activate workflows (Windows)
.\scripts\init-n8n-workflow.bat

# Import and activate workflows (Linux/Mac)
./scripts/init-n8n-workflow.sh
```

### Workflows

| Workflow | Endpoint | Description |
|----------|----------|-------------|
| Order Analytics | `POST /webhook/order-analytics` | Receives order data, logs to Google Sheets |
| Get Orders API | `GET /webhook/orders` | Returns order history from Google Sheets |

### Get Orders API - Error Handling

The Get Orders API workflow includes comprehensive error handling:

#### Response Formats

**Success Response (200)**
```json
{
  "success": true,
  "data": [...],
  "timestamp": "2026-03-12T10:30:00.000Z",
  "count": 5
}
```

**Empty Response (200)**
```json
{
  "success": true,
  "data": [],
  "message": "No orders found",
  "timestamp": "2026-03-12T10:30:00.000Z",
  "count": 0
}
```

**Error Response (500)**
```json
{
  "success": false,
  "error": "Failed to read data from Google Sheets",
  "message": "Error details here",
  "timestamp": "2026-03-12T10:30:00.000Z"
}
```

#### Workflow Nodes
- **Webhook** - GET /orders endpoint
- **Read Sheet** - Fetches data from Google Sheets (with error output routing)
- **Has Data?** - Conditional check for empty results
- **Respond to Webhook** - Success response with data
- **Empty Response** - Handles no data scenarios
- **Error Response** - Returns 500 status with error details
- **Error Trigger** - Catches workflow-level errors
- **Set Error Details** - Formats error information for logging

### Environment Variables

Create a `.env` file:
```env
REACT_APP_N8N_URL=http://localhost:5678
```

### Manual Workflow Setup

If auto-import fails:
1. Open [http://localhost:5678](http://localhost:5678)
2. Import workflows from `n8n/` folder
3. Configure Google Sheets credentials
4. Activate both workflows

## 📱 Mobile Development

### Using Docker (Recommended for Node 16 users)

The mobile app requires Node 20+. If you're using Node 16, use Docker:

```bash
# Start mobile dev server with tunnel
docker-compose up mobile-dev

# Follow logs
docker-compose logs -f mobile-dev
```

This will:
1. Start a Node 20 container
2. Install dependencies with pnpm
3. Start Expo with tunnel mode
4. Display QR code for Expo Go app

### Using Local Node 20+

```bash
# Install dependencies
pnpm install

# Start mobile app
pnpm dev:mobile
```

### Mobile App Features

The mobile app shares business logic from `@order-calculator/shared`:
- Same pricing calculations as web
- Same discount rules
- Consistent user experience

### Expo Configuration

- **SDK**: 54.0.0
- **Platform**: iOS, Android, Web
- **Icons**: Custom box design icons
- **Splash**: Branded splash screen
