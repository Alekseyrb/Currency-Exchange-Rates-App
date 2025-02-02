import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import CurrencyCard from '../components/CurrencyCard';
import { useExchange } from '../context/ExchangeContext';
import useExchangeRates from '../hooks/useExchangeRates';

const ExchangeRatesScreen: React.FC = () => {
  const { rates, loading, error } = useExchangeRates();
  const { toggleFavorite } = useExchange();

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const currencies = Object.keys(rates || {}).map((currency) => ({
    currency,
    rate: rates ? rates[currency] : 0,
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={currencies}
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
  container: { flex: 1, padding: 20},
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { textAlign: 'center', fontSize: 18, color: 'red', marginTop: 20 },
});

export default ExchangeRatesScreen;
