import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ExchangeContextProps {
  favorites: { currency: string; rate: number }[];
  toggleFavorite: (currency: string, rate: number) => void;
}

const ExchangeContext = createContext<ExchangeContextProps | undefined>(undefined);

export const ExchangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<{ currency: string; rate: number }[]>([]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites: { currency: string; rate: number }[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };

  const toggleFavorite = (currency: string, rate: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.some((item) => item.currency === currency)
        ? prev.filter((item) => item.currency !== currency)
        : [...prev, { currency, rate }];

      saveFavorites(updatedFavorites); // Сохраняем новые избранные валюты
      return updatedFavorites;
    });
  };

  return (
    <ExchangeContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchange = () => {
  const context = useContext(ExchangeContext);
  if (!context) throw new Error('useExchange must be used within an ExchangeProvider');
  return context;
};
