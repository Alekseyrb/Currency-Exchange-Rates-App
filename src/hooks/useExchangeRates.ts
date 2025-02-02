import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import {FIXER_API_KEY} from '@env';

const API_URL = 'https://data.fixer.io/api/latest';

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
        params: {access_key: FIXER_API_KEY},
      });

      if (response.data.success) {
        setRates(response.data.rates);
      } else {
        throw new Error(
          response.data.error?.info || 'Failed to fetch exchange rates',
        );
      }
    } catch (err) {
      setError('Error fetching exchange rates');
      Alert.alert(
        'Error',
        'Unable to fetch exchange rates. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return {rates, loading, error};
};

export default useExchangeRates;
