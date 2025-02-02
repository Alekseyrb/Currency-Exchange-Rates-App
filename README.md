# Currency Exchange Rates App

This is a **React Native** application that displays currency exchange rates. Users can view exchange rates, add favorite currencies, and access them offline.

## Features

✅ Display a list of currency exchange rates.
✅ Add or remove specific rates to/from the favorites list.
✅ Cache previously viewed exchange rates for offline access.
✅ Handle API errors and ensure a smooth user experience.
✅ Modular and maintainable codebase following best practices.
✅ Secure storage of API keys.
✅ Basic unit testing for core functionality.

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Install Dependencies

```sh
npm install
# OR
yarn install
```

### Step 2: Start Metro

Metro is the JavaScript build tool for React Native.

```sh
npm start
# OR
yarn start
```

### Step 3: Build and Run Your App

#### Android

```sh
npm run android
# OR
yarn android
```

#### iOS

First, install CocoaPods dependencies:

```sh
bundle install
bundle exec pod install
```

Then run:

```sh
npm run ios
# OR
yarn ios
```

## Project Structure

```
├── components/     # Reusable UI components
├── context/        # Context API for global state management
├── hooks/          # Custom hooks
├── navigation/     # Navigation setup
├── screens/        # Screens (ExchangeRatesScreen, FavoritesScreen)
├── services/       # API services and business logic
├── styles/         # Global styles and theme
├── App.tsx         # Main app component
```

## Main Dependencies:

```
- @react-native-async-storage/async-storage – for caching data locally to support offline mode.
- @react-navigation/native & @react-navigation/bottom-tabs – for managing app navigation.
- axios – for making HTTP requests to the API.
- react-native-dotenv – for secure storage of sensitive data like API keys.
- react-native-paper – for building modern UI components.
- react-native-safe-area-context – to handle safe areas, especially on devices with notches.
```

## API Integration

The app fetches exchange rates using the **Fixer.io API**.

- API Key is stored securely using environment variables (`@env`).
- API response is cached in `AsyncStorage` for offline access.
- On startup, the app loads the last cached rates if no internet is available.

## Offline Mode

- Exchange rates are saved locally using `AsyncStorage`.
- If the device is offline, the app loads the last available exchange rates.
- API requests are only made when necessary, reducing unnecessary network calls.

## Testing

The project includes basic unit tests for core functionality.

### Running Tests

```sh
npm test
# OR
yarn test
```
