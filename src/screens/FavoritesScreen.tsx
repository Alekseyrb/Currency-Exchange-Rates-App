import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import CurrencyCard from '../components/CurrencyCard';
import { useExchange } from '../context/ExchangeContext';

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
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 30,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default FavoritesScreen;
