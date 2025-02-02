import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../styles/colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import ExchangeRatesScreen from '../screens/ExchangeRatesScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: COLORS.secondary,
  tabBarStyle: {
    backgroundColor: COLORS.background,
  },
};

const screens = [
  {name: 'Exchange Rates', component: ExchangeRatesScreen},
  {name: 'Favorites', component: FavoritesScreen}
];

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        {screens.map(screen => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
