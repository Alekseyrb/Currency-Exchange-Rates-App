import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CurrencyCard from '../components/CurrencyCard';
import { useExchange } from '../context/ExchangeContext';

const exchangeRates = [
  { currency: 'USD', rate: 1 },
  { currency: 'EUR', rate: 0.85 },
  { currency: 'GBP', rate: 0.75 },
  { currency: 'JPY', rate: 110.25 },
  { currency: 'AUD', rate: 1.35 },
];

const ExchangeRatesScreen: React.FC = () => {
  const { toggleFavorite } = useExchange();

  return (
    <View style={styles.container}>
      <FlatList
        data={exchangeRates}
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => (
          <CurrencyCard
            currency={item.currency}
            rate={item.rate}
            onPress={() => toggleFavorite(item.currency, item.rate)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f9' },
});

export default ExchangeRatesScreen;
