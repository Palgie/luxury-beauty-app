import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useAnimation } from '@/hooks/useAnimation';

interface CartSuccessMessageProps {
  message: string;
  onHide: () => void;
}

export default function CartSuccessMessage({ message, onHide }: CartSuccessMessageProps) {
  const fadeAnim = useAnimation(0);
  const scaleAnim = useAnimation(0.8);

  useEffect(() => {
    fadeAnim.parallel([
      fadeAnim.sequence([
        fadeAnim.fadeIn(300),
        fadeAnim.timing({ toValue: 1, duration: 2000 }), // delay
        fadeAnim.fadeOut(300),
      ]),
      scaleAnim.sequence([
        scaleAnim.spring({ toValue: 1.1, speed: 20, bounciness: 12 }),
        scaleAnim.spring({ toValue: 1, speed: 20, bounciness: 12 }),
      ]),
    ]).start(() => {
      onHide();
    });
  }, [onHide]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim.value,
          transform: [{ scale: scaleAnim.value }],
        },
      ]}
    >
      <Ionicons
        name="checkmark-circle"
        size={24}
        color={theme.colors.secondary}
        style={styles.icon}
      />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    left: theme.spacing.m,
    right: theme.spacing.m,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  icon: {
    marginRight: theme.spacing.s,
  },
  message: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
});
