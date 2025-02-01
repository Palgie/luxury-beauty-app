import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { theme } from '@/theme';
import { haptics } from '@/utils/haptics';

export default function WishlistScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleContinueShopping = () => {
    haptics.light();
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  // TODO: Implement wishlist functionality
  const items: any[] = [];

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
        <Text style={styles.emptyText}>
          Add items to your wishlist while you shop
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            {/* TODO: Implement wishlist item UI */}
          </View>
        ))}
      </ScrollView>
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
  itemContainer: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
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
