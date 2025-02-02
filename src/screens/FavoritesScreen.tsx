import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CurrencyCard from '../components/CurrencyCard';
import { useExchange } from '../context/ExchangeContext';
import { Text } from 'react-native-paper';

const FavoritesScreen: React.FC = () => {
  const { favorites, toggleFavorite } = useExchange();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite currencies</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.currency}
          renderItem={({ item }) => (
            <CurrencyCard
              currency={item.currency}
              rate={item.rate}
              isFavorite
              onPress={() => toggleFavorite(item.currency, item.rate)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f9' },
  emptyText: { textAlign: 'center', fontSize: 18, color: '#888', marginTop: 30 },
});

export default FavoritesScreen;
