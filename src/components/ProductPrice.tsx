import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';

interface Price {
  amount: string;
  currency: string;
  displayValue: string;
}

interface ProductPriceProps {
  price: Price;
  rrp?: Price;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ price, rrp }) => {
  const hasDiscount = rrp && Number(rrp.amount) > Number(price.amount);

  return (
    <View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price.displayValue}</Text>
        {hasDiscount && (
          <Text style={styles.rrp}>{rrp.displayValue}</Text>
        )}
      </View>
      {hasDiscount && (
        <Text style={styles.savings}>
          Save {(Number(rrp.amount) - Number(price.amount)).toFixed(2)} {price.currency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.serifBold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.s,
  },
  rrp: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sans,
    color: theme.colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  savings: {
    fontSize: theme.typography.fontSize.caption,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.brand,
    marginTop: theme.spacing.xs,
  },
});
