import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ViewStyle } from 'react-native';
import { theme } from '@/theme';
import { getImageProps } from '@/utils/images';
import { Product } from '@/types/products';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function ProductCard({
  product,
  onPress,
  style,
}: ProductCardProps) {
  const {
    title,
    brand,
    images,
    cheapestVariant,
    reviews,
    inStock,
    marketedSpecialOffer,
  } = product;

  const price = cheapestVariant?.price?.price;
  const rrp = cheapestVariant?.price?.rrp;
  const hasDiscount = price?.amount !== rrp?.amount;
  const imageUrl = images[0]?.largeProduct;

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={[styles.container, style]}
        onPress={onPress}
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.1)',
          borderless: true,
        }}
      >
        <Image
          {...getImageProps(imageUrl, 'product')}
          style={styles.image}
          resizeMode="cover"
        />
        {inStock === false && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.brand}>{brand?.name}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.ratingContainer}>
            {reviews && reviews.total > 0 ? (
              <>
                <MaterialCommunityIcons
                  name="star"
                  size={14}
                  color={theme.colors.text.primary}
                  style={styles.ratingIcon}
                />
                <Text style={styles.rating}>{reviews.averageScore.toFixed(1)}</Text>
                <Text style={styles.ratingCount}>({reviews.total})</Text>
              </>
            ) : (
              <View style={styles.ratingPlaceholder} />
            )}
          </View>
          <View style={styles.priceContainer}>
            {price && (
              <Text style={[styles.price, hasDiscount && styles.discountedPrice]}>
                {price.displayValue}
              </Text>
            )}
            {hasDiscount && rrp && (
              <Text style={styles.rrp}>{rrp.displayValue}</Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.m,
  },
  container: {
    width: 200,
    backgroundColor: theme.colors.background.main,
    borderRadius: 3,
    ...theme.shadows.small,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.background.light,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: theme.spacing.s,
    right: theme.spacing.s,
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
  },
  outOfStockText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.caption,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },
  offerBadge: {
    position: 'absolute',
    top: theme.spacing.s,
    left: theme.spacing.s,
    backgroundColor: theme.colors.brand,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
  },
  offerText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.caption,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },
  content: {
    padding: theme.spacing.m,
  },
  brand: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.sans,
  },
  title: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    minHeight: 20, // Height of caption text + minimal padding
  },
  ratingPlaceholder: {
    height: 20, // Same as minHeight to maintain consistent spacing
  },
  ratingIcon: {
    marginRight: 2,
  },
  rating: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },
  ratingCount: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.sans,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  discountedPrice: {
    color: theme.colors.error,
  },
  rrp: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    textDecorationLine: 'line-through',
    fontFamily: theme.typography.fontFamily.sans,
  },
});
