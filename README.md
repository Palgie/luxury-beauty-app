# Luxury Beauty App

A React Native e-commerce application for luxury beauty products, featuring a modern UI, smooth animations, and a seamless shopping experience.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart management
- 💫 Smooth animations and transitions
- 🎨 Consistent design system
- 📱 Cross-platform (iOS & Android)
- 🔍 Advanced search and filtering
- ⭐ Wishlist functionality
- 🏷️ Category and brand browsing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn
- Caddy (for local development proxy)
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd luxury-beauty-app
```

2. Install dependencies:
```bash
npm install
```

3. Install Caddy:
- macOS (using Homebrew):
```bash
brew install caddy
```
- Other platforms: Visit [Caddy's official download page](https://caddyserver.com/download)

4. Add the following entries to your hosts file (/etc/hosts):
```
127.0.0.1 local.lookfantastic.com
127.0.0.1 api.local.lookfantastic.com
```

5. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Update the variables as needed:
     - `API_URL`: GraphQL API endpoint
     - `API_VERSION`: API version to use
     - `ENABLE_ANALYTICS`: Toggle analytics tracking
     - `ENABLE_MOCK_DATA`: Use mock data for development
     - `DEFAULT_CURRENCY`: Set default currency (e.g., GBP)
     - `DEFAULT_LOCALE`: Set default locale (e.g., en-GB)
     - `DEFAULT_SHIPPING_DESTINATION`: Default shipping country
     - `GRAPHQL_TIMEOUT`: GraphQL request timeout in ms
     - `ENABLE_GRAPHQL_CACHE`: Toggle Apollo cache
     - `ENABLE_DEBUG_LOGGING`: Toggle debug logs
     - `ENABLE_ERROR_REPORTING`: Toggle error reporting

6. Start the development proxy:
```bash
caddy run
```

7. Start the development server:
```bash
npm start
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppHeader/      # App header with navigation
│   ├── ProductCard/    # Product display card
│   └── ...
├── screens/            # Screen components
│   ├── HomeScreen/     # Main landing screen
│   ├── ProductDetails/ # Product details view
│   └── ...
├── navigation/         # Navigation configuration
│   ├── RootNavigator  # Main navigation setup
│   └── types         # Navigation type definitions
├── services/          # API and external services
│   ├── apollo/       # GraphQL client setup
│   └── queries/      # GraphQL queries
├── hooks/            # Custom React hooks
├── context/          # React Context providers
├── theme/            # Design system and styling
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Key Technologies

- React Native
- TypeScript
- Apollo Client (GraphQL)
- React Navigation
- Expo
- Caddy (Development Proxy)

## Development Setup

### Proxy Configuration

The app uses Caddy as a development proxy to handle API requests. The Caddyfile configuration is included in the repository:

```
local.lookfantastic.com {
    reverse_proxy localhost:3000
}

api.local.lookfantastic.com {
    reverse_proxy localhost:4000
}
```

### Environment Configuration

The app uses environment variables for configuration. A `.env.example` file is provided with all available options:

```env
# API Configuration
API_URL=http://api.local.lookfantastic.com
API_VERSION=v1

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_MOCK_DATA=false

# App Configuration
APP_NAME=Luxury Beauty
DEFAULT_CURRENCY=GBP
DEFAULT_LOCALE=en-GB
DEFAULT_SHIPPING_DESTINATION=GB

# GraphQL Settings
GRAPHQL_TIMEOUT=30000
ENABLE_GRAPHQL_CACHE=true

# Development Settings
ENABLE_DEBUG_LOGGING=false
ENABLE_ERROR_REPORTING=true
```

### Running the App

1. Start the proxy server:
```bash
caddy run
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## Architecture

### Navigation

The app uses React Navigation with a combination of stack and tab navigators:
- RootNavigator: Handles main navigation stack
- MainTabsScreen: Manages bottom tab navigation
- Custom transitions and animations

### State Management

- Apollo Client for remote data
- React Context for local state
- Custom hooks for reusable logic

### UI Components

- Reusable components with TypeScript
- Consistent styling through theme system
- Responsive layouts
- Custom animations

### API Integration

- GraphQL queries and mutations
- Optimistic updates
- Error handling
- Loading states

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
