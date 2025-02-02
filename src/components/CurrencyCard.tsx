import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';
import {COLORS} from '../styles/colors';

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

  return (
    <Card
      style={[styles.card, {borderColor: COLORS.primary}]}
      elevation={5}>
      <Card.Content>
        <Text
          style={[styles.currencyText, {color: COLORS.primary}]}>
          {currency}
        </Text>
        <Text style={styles.rateText}>{rate} USD</Text>
        <Button
          mode={isFavorite ? 'outlined' : 'contained'}
          onPress={onPress}
          style={[
            styles.button,
            {backgroundColor: isFavorite ? '#fff' : COLORS.primary},
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
