import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
// @ts-ignore
import { API_URL, FIXER_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ExchangeRate {
  [currency: string]: number;
}

const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: { access_key: FIXER_API_KEY },
      });

      if (response.data.success) {
        setRates(response.data.rates);
        await AsyncStorage.setItem('exchangeRates', JSON.stringify(response.data.rates));
      } else {
        throw new Error(
          response.data.error?.info || 'Failed to fetch exchange rates'
        );
      }
    } catch (err) {
      setError('Error fetching exchange rates');
      Alert.alert(
        'Error',
        'Unable to fetch exchange rates. Please try again later.'
      );

      const storedRates = await AsyncStorage.getItem('exchangeRates');
      if (storedRates) {
        setRates(JSON.parse(storedRates));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return { rates, loading, error };
};

export default useExchangeRates;
