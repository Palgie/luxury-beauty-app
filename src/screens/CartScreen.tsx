import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { theme } from '@/theme';
import { useCart } from '@/hooks/useCart';
import SwipeableCartItem from '@/components/SwipeableCartItem';
import LoadingButton from '@/components/LoadingButton';
import { haptics } from '@/utils/haptics';

export default function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleContinueShopping = () => {
    haptics.light();
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const handleCheckout = () => {
    haptics.light();
    setIsLoading(true);
    // TODO: Implement checkout
    setTimeout(() => setIsLoading(false), 1000);
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptyText}>
          Add items to your cart to start shopping
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continueButtonPressed,
          ]}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {items.map((item) => (
          <SwipeableCartItem
            key={item.id}
            item={item}
            onRemove={() => removeItem(item.id)}
            onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>£{totalPrice.toFixed(2)}</Text>
        </View>
        <LoadingButton
          title="Checkout"
          onPress={handleCheckout}
          loading={isLoading}
          style={styles.checkoutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  totalLabel: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
  },
  totalAmount: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
  },
  checkoutButton: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.serifBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sans,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.l,
    textAlign: 'center',
  },
  continueButton: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.brand,
    borderRadius: theme.borderRadius.small,
  },
  continueButtonPressed: {
    opacity: 0.7,
  },
  continueButtonText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.background.main,
  },
});
