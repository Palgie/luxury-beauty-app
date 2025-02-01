import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { CartItem } from '@/hooks/useCart';
import { haptics } from '@/utils/haptics';
import { useAnimation } from '@/hooks/useAnimation';
import { getImageProps } from '@/utils/images';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const MAX_QUANTITY = 10;

interface SwipeableCartItemProps {
  item: CartItem;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

interface QuantityButtonProps {
  onPress: () => void;
  icon: 'add' | 'remove';
  disabled?: boolean;
}

const QuantityButton = React.memo(({ onPress, icon, disabled = false }: QuantityButtonProps) => {
  const scaleAnim = useAnimation(1);

  const handlePress = () => {
    if (disabled) {
      haptics.warning();
      scaleAnim.sequence([
        scaleAnim.timing({ toValue: 0.9, duration: 50 }),
        scaleAnim.timing({ toValue: 1, duration: 50 }),
      ]).start();
    } else {
      haptics.light();
      scaleAnim.sequence([
        scaleAnim.timing({ toValue: 0.8, duration: 100 }),
        scaleAnim.timing({ toValue: 1, duration: 100 }),
      ]).start();
      onPress();
    }
  };

  return (
    <Pressable
      style={[styles.quantityButton, disabled && styles.quantityButtonDisabled]}
      disabled={disabled}
      onPress={handlePress}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.1)',
        borderless: true,
        radius: 16,
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim.value }] }}>
        <Ionicons 
          name={icon} 
          size={20} 
          color={disabled ? theme.colors.text.secondary : theme.colors.text.primary} 
        />
      </Animated.View>
    </Pressable>
  );
});

QuantityButton.displayName = 'QuantityButton';

function SwipeableCartItem({
  item,
  onRemove,
  onQuantityChange,
}: SwipeableCartItemProps) {
  const slideAnim = useAnimation(0);
  const opacity = slideAnim.value.interpolate({
    inputRange: [-SCREEN_WIDTH, -SWIPE_THRESHOLD, 0],
    outputRange: [0, 0.5, 1],
  });

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx }) => {
          if (dx < 0) {
            slideAnim.value.setValue(dx);
          }
        },
        onPanResponderRelease: (_, { dx, vx }) => {
          if (dx < -SWIPE_THRESHOLD || vx < -0.5) {
            haptics.heavy();
            slideAnim.timing({
              toValue: -SCREEN_WIDTH,
              duration: 250,
            }).start(() => {
              onRemove();
            });
          } else {
            slideAnim.spring({
              toValue: 0,
            }).start();
          }
        },
      }),
    [onRemove, slideAnim]
  );

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const isMaxQuantity = item.quantity >= MAX_QUANTITY;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim.value }],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.background}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>
      <View style={styles.content}>
        <Image
          {...getImageProps(item.imageUrl, 'product')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <Text style={styles.brand}>{item.brandName}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>
            {formatPrice(item.price.now, item.price.currency)}
          </Text>
          <View style={styles.quantityContainer}>
            <QuantityButton
              icon="remove"
              onPress={() => onQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            />
            <Text style={[
              styles.quantityText,
              isMaxQuantity && styles.quantityTextMax
            ]}>
              {item.quantity}
              {isMaxQuantity && ' (max)'}
            </Text>
            <QuantityButton
              icon="add"
              onPress={() => onQuantityChange(item.quantity + 1)}
              disabled={isMaxQuantity}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

SwipeableCartItem.displayName = 'SwipeableCartItem';

export default SwipeableCartItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.main,
    marginBottom: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.small,
  },
  quantityButtonDisabled: {
    backgroundColor: theme.colors.background.main,
    opacity: 0.5,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: SCREEN_WIDTH,
    backgroundColor: '#E31B23',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: theme.spacing.xl,
  },
  deleteText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
  },
  content: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.borderRadius.medium,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.background.light,
  },
  details: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  brand: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginHorizontal: theme.spacing.m,
    minWidth: 24,
    textAlign: 'center',
  },
  quantityTextMax: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.caption,
  },
});
