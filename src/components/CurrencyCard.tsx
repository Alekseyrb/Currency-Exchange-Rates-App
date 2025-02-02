import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import {COLORS} from '../styles/colors'; // Импортируем константы цветов

interface CurrencyCardProps {
  currency: string;
  rate: number;
  isFavorite?: boolean;
  onPress: () => void;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  currency,
  rate,
  isFavorite,
  onPress,
}) => {
  const getCurrencyColor = (currency: string) => {
    switch (currency) {
      case 'USD':
        return COLORS.usd;
      case 'EUR':
        return COLORS.eur;
      case 'GBP':
        return COLORS.gbp;
      default:
        return COLORS.primary;
    }
  };

  return (
    <Card
      style={[styles.card, {borderColor: getCurrencyColor(currency)}]}
      elevation={5}>
      <Card.Content>
        <Text
          style={[styles.currencyText, {color: getCurrencyColor(currency)}]}>
          {currency}
        </Text>
        <Text style={styles.rateText}>{rate} USD</Text>
        <Button
          mode={isFavorite ? 'outlined' : 'contained'}
          onPress={onPress}
          style={[
            styles.button,
            {backgroundColor: isFavorite ? '#fff' : getCurrencyColor(currency)},
          ]}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 2,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rateText: {
    fontSize: 16,
    marginVertical: 10,
    color: COLORS.rateText,
  },
  button: {
    marginTop: 10,
  },
});

export default CurrencyCard;
