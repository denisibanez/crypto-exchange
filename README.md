# Crypto Exchange (Vue 3 + TypeScript + Tailwind)

A professional-grade responsive SPA that fetches live crypto prices and allows currency exchange simulation with persistent history. Built following SOLID principles and clean code practices with full internationalization support.

## ✨ Features

- **Live crypto prices** from CoinGecko (BTC, ETH, USDT, SOL) with manual refresh
- **Real-time exchange calculator** with instant conversion
- **Persistent history** with localStorage integration
- **Professional UI** with Tailwind CSS and custom design system
- **Loading states** with page loader and visual feedback
- **Toast notifications** for user feedback and error handling
- **Robust error handling** with timeout and graceful fallbacks
- **Full internationalization** with English and Portuguese support
- **Language switcher** with instant UI translation
- **TypeScript** for type safety and better developer experience
- **Clean Architecture** following SOLID principles
- **Storybook** integration with stories for all components
- **Storybook** integration for component development

## 🛠 Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Pinia** for state management
- **Vue Router** for client-side routing
- **Vue i18n** for internationalization
- **Axios** with interceptors for API calls
- **Vite** for build tooling
- **Storybook** for component development
- **ESLint + Prettier** for code quality
- **Husky** for git hooks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1) Clone and install dependencies
npm install

# 2) Set up environment variables (optional)
cp .env.example .env

# 3) Run development server
npm run dev
# Open http://localhost:5173

# 4) Build for production
npm run build

# 5) Preview production build
npm run preview

# 6) Run Storybook for component development
npm run storybook

# 7) Build Storybook
npm run build-storybook
```

### Development Commands

```bash
# Lint and fix code
npm run lint

# Format code
npm run format

# Type checking
npm run build

# Run Storybook
npm run storybook

# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## 🏗 Project Structure

```
crypto-exchange/
├─ .husky/                 # Git hooks
├─ .storybook/            # Storybook configuration
├─ src/
│  ├─ assets/             # Static assets (images, fonts, scss)
│  ├─ components/         # Vue components
│  │  ├─ ui/             # Reusable UI components
│  │  │  ├─ Button/      # Button component + stories
│  │  │  ├─ StatusBadge/ # Status badge component + stories
│  │  │  ├─ Toast/       # Toast notification component
│  │  │  ├─ ToastContainer/ # Toast container
│  │  │  ├─ PageLoader/  # Page loading overlay
Language switcher
│  │  ├─ RateTable/      # Rate table component
│  │  ├─ ExchangeForm/   # Exchange form component
│  │  └─ HistoryList/    # History list component
│  ├─ composables/       # Vue composables
│  │  ├─ useExchange.ts  # Exchange logic
│  │  ├─ useFormatting.ts # Formatting utilities
│  │  ├─ useToast.ts     # Toast notifications
│  │  └─ useI18n.ts      # Internationalization
│  ├─ stores/            # Pinia stores
│  │  ├─ exchange.store.ts # Exchange state
│  │  └─ toast.store.ts  # Toast notifications state
│  ├─ services/          # API services
│  │  ├─ api.ts          # Axios instance + interceptors
│  │  └─ coingecko.service.ts # CoinGecko API service
│  ├─ types/             # TypeScript types
│  │  ├─ global.ts       # Global types
│  │  ├─ api.ts          # API types
│  │  └─ toast.ts        # Toast types
│  ├─ views/             # Page components
│  │  ├─ Home/           # Home page
│  │  └─ NotFound/       # 404 page
│  ├─ router/            # Vue Router configuration
│  ├─ i18n/              # Internationalization
│  │  ├─ index.ts        # i18n setup
│  │  └─ locales/        # Translation files
│  │     ├─ en.json      # English translations
│  │     └─ pt.json      # Portuguese translations
│  ├─ utils/             # Utility functions
│  │  └─ mountParams.utils.ts # URL parameter helpers
│  └─ styles.css         # Global styles
├─ .env.example          # Environment variables template
├─ tailwind.config.js    # Tailwind configuration
└─ package.json
```

## 🎨 Design System

The app uses a custom design system with Tailwind CSS:

- **Dark theme** with carefully chosen colors
- **Responsive design** that works on all devices
- **Consistent spacing** and typography
- **Accessible components** with proper ARIA labels
- **Smooth animations** and transitions
- **Custom color palette** maintaining original visual identity
- **Component-specific styling** with no global CSS pollution

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3/simple/price
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Crypto Exchange
VITE_HISTORY_STORAGE_KEY=crypto-exchange-history-v1
VITE_MAX_HISTORY_RECORDS=100
VITE_DEFAULT_LOCALE=en
VITE_FALLBACK_LOCALE=en
```

### API Integration

The app uses the CoinGecko Simple Price API:
```
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,solana&vs_currencies=usd
```

## 🏛 Architecture

### SOLID Principles Applied

- **Single Responsibility**: Each component/service has one clear purpose
- **Open/Closed**: Components are open for extension, closed for modification
- **Liskov Substitution**: Components can be substituted without breaking functionality
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: High-level modules don't depend on low-level modules

### Clean Code Practices

- **Meaningful names** for variables, functions, and components
- **Small functions** that do one thing well
- **Consistent formatting** with Prettier
- **Type safety** with TypeScript
- **Error handling** with proper user feedback
- **Separation of concerns** between UI, business logic, and data

## 📱 Features in Detail

### Live Price Updates
- Manual refresh capability with loading states
- Real-time data fetching with visual feedback
- Toast notifications for success/error states
- Graceful error handling with fallback to cached data

### Exchange Calculator
- Real-time conversion as you type
- Support for all supported cryptocurrencies
- Swap functionality for quick currency switching
- Input validation and sanitization
- Toast notifications for successful exchanges

### History Management
- Persistent storage in localStorage
- Automatic cleanup (max 100 records)
- Detailed transaction information
- Clear history functionality with confirmation toast

### Internationalization
- **Full i18n support** with Vue i18n
- **English and Portuguese** translations
- **Language switcher** in the header
- **Dynamic translations** with parameter interpolation
- **Toast notifications** in user's selected language
- **Persistent language** preference

## 🧪 Code Quality & Testing

- **ESLint** configuration for Vue 3 + TypeScript
- **Prettier** for consistent code formatting
- **Husky** pre-commit hooks for quality gates
- **TypeScript** strict mode enabled
- **Path aliases** for clean imports
- **Storybook** for isolated component development
- **Lint-staged** for pre-commit code quality checks
- **Vitest** for unit testing with Vue Test Utils
- **Testing Library** for component testing
- **JSDOM** for DOM simulation in tests
- **69 unit tests** covering all components, stores, composables, and services
- **Test coverage** for business logic, UI components, and API integration

## 🌍 Internationalization

The app supports multiple languages with Vue i18n:

### Supported Languages
- **🇺🇸 English** (default)
- **🇧🇷 Portuguese** (complete translation)

### Features
- **Language switcher** in the header
- **Instant UI translation** when switching languages
- **Toast notifications** in selected language
- **Parameter interpolation** for dynamic content
- **Persistent language** preference

### Translation Structure
```json
{
  "app": { "title": "Crypto Exchange" },
  "navigation": { "refresh": "Refresh" },
  "status": { "ready": "Ready", "loading": "Fetching rates…" },
  "prices": { "title": "Live Prices (USD)", "currency": "Currency" },
  "exchange": { "title": "Exchange", "from": "From", "to": "To" },
  "history": { "title": "Exchange History", "clear": "Clear" },
  "toast": { "pricesUpdated": "Prices Updated", "exchangeExecuted": "Exchange Executed" }
}
```

## 📚 Storybook Integration

The project includes comprehensive Storybook integration with stories for all components:

### Component Stories
- **UI Components**: Button, StatusBadge, Toast, ToastContainer, PageLoader, 
- **Main Components**: RateTable, ExchangeForm, HistoryList
- **Views**: Home, NotFound

### Story Features
- **Isolated component** development and testing
- **Interactive documentation** for all components
- **Visual regression** testing capabilities
- **Mock data** for different states (loading, error, success)
- **Multiple variants** for each component
- **Hot reload** during development

### Story Categories
- **UI/**: Reusable UI components with multiple variants
- **Components/**: Main application components with mock data
- **Views/**: Full page components with different states

### Storybook Commands
```bash
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build static Storybook
```

## 🧪 Unit Testing

The project includes comprehensive unit testing with Vitest:

### Test Coverage
- **69 unit tests** covering all major functionality
- **Components**: UI components, main components, and views
- **Stores**: Pinia stores with mocked dependencies
- **Composables**: Business logic and utility functions
- **Services**: API integration with mocked HTTP calls
- **Utils**: Helper functions and utilities

### Test Structure
```
src/
├─ components/
│  ├─ ui/Button/__tests__/Button.test.ts
│  ├─ ui/StatusBadge/__tests__/StatusBadge.test.ts
│  ├─ RateTable/__tests__/RateTable.test.ts
│  ├─ ExchangeForm/__tests__/ExchangeForm.test.ts
│  └─ HistoryList/__tests__/HistoryList.test.ts
├─ stores/__tests__/
│  ├─ exchange.store.test.ts
│  └─ toast.store.test.ts
├─ composables/__tests__/
│  ├─ useExchange.test.ts
│  └─ useFormatting.test.ts
├─ services/__tests__/
│  └─ coingecko.service.test.ts
└─ utils/__tests__/
   └─ mountParams.utils.test.ts
```

### Test Features
- **Mocked dependencies** for isolated testing
- **Vue Test Utils** for component testing
- **Testing Library** for user-centric testing
- **JSDOM** for DOM simulation
- **Coverage reporting** with detailed metrics
- **Fast execution** with Vitest's optimized runner

### Test Commands
```bash
npm run test           # Run tests in watch mode
npm run test:ui        # Run tests with UI interface
npm run test:run       # Run tests once
npm run test:coverage  # Run tests with coverage report
```

## 📄 License

This project is for educational purposes. CoinGecko API usage is subject to their terms of service.
