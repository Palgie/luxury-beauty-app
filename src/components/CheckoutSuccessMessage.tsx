import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useAnimation } from '@/hooks/useAnimation';

interface CheckoutSuccessMessageProps {
  onHide: () => void;
}

export default function CheckoutSuccessMessage({ onHide }: CheckoutSuccessMessageProps) {
  const scaleAnim = useAnimation(0.5);
  const opacityAnim = useAnimation(0);

  React.useEffect(() => {
    const showAnimation = Animated.parallel([
      scaleAnim.spring({
        toValue: 1,
        speed: 12,
        bounciness: 6,
      }),
      opacityAnim.timing({
        toValue: 1,
        duration: 300,
      }),
    ]);

    const hideAnimation = Animated.parallel([
      scaleAnim.timing({
        toValue: 1.1,
        duration: 200,
      }),
      opacityAnim.timing({
        toValue: 0,
        duration: 200,
      }),
    ]);

    showAnimation.start();

    const timer = setTimeout(() => {
      hideAnimation.start(() => {
        onHide();
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      showAnimation.stop();
      hideAnimation.stop();
    };
  }, [scaleAnim, opacityAnim, onHide]);

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityAnim.value,
            transform: [{ scale: scaleAnim.value }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark"
            size={48}
            color={theme.colors.secondary}
          />
        </View>
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.message}>
          Thank you for your purchase. Your order has been successfully placed.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    alignItems: 'center',
    maxWidth: 320,
    ...theme.shadows.medium,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  title: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  message: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.body,
    textAlign: 'center',
    opacity: 0.9,
  },
});
