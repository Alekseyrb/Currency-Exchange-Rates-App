import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, Button} from 'react-native-paper';

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
    <Card style={styles.card} elevation={5}>
      <Card.Content>
        <Text style={styles.currencyText}>{currency}</Text>
        <Text style={styles.rateText}>{rate} USD</Text>
        <Button
          mode={isFavorite ? 'outlined' : 'contained'}
          onPress={onPress}
          style={styles.button}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {marginBottom: 15, borderRadius: 10},
  currencyText: {fontSize: 18, fontWeight: 'bold'},
  rateText: {fontSize: 16, marginVertical: 10, color: '#6200ee'},
  button: {marginTop: 10, backgroundColor: '#6200ee'},
});

export default CurrencyCard;
