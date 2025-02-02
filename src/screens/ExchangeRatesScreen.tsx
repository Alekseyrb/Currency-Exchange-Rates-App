import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import CurrencyCard from '../components/CurrencyCard';
import { useExchange } from '../context/ExchangeContext';
import useExchangeRates from '../hooks/useExchangeRates';

const ExchangeRatesScreen: React.FC = () => {
  const { rates, loading, error } = useExchangeRates();
  const { favorites, toggleFavorite } = useExchange();

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const currencies = Object.keys(rates || {}).map((currency) => ({
    currency,
    rate: rates ? rates[currency] : 0,
  }));

  const isFavorite = (currency: string) => {
    return favorites.some((item) => item.currency === currency);
  };

  const renderCurrencyCard = ({ item }: { item: { currency: string; rate: number } }) => {
    const isFav = isFavorite(item.currency);
    return (
      <CurrencyCard
        currency={item.currency}
        rate={item.rate}
        isFavorite={isFav}
        onPress={() => toggleFavorite(item.currency, item.rate)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.currency}
        renderItem={renderCurrencyCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default ExchangeRatesScreen;
