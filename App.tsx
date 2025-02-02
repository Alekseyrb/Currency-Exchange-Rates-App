import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ExchangeProvider } from './src/context/ExchangeContext';

const App = () => {
  return (
    <ExchangeProvider>
      <AppNavigator />
    </ExchangeProvider>
  );
};

export default App;
