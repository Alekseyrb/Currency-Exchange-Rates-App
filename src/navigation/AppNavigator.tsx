import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../screens/FavoritesScreen';
import ExchangeRatesScreen from '../screens/ExchangeRatesScreen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Exchange Rates" component={ExchangeRatesScreen} />
        <Tab.Screen name="Favirite" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
