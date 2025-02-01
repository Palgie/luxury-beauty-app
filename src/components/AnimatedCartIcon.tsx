import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useAnimation } from '@/hooks/useAnimation';

interface AnimatedCartIconProps {
  size?: number;
  color?: string;
  itemCount?: number;
  animate?: boolean;
}

export default function AnimatedCartIcon({
  size = 24,
  color = theme.colors.text.primary,
  itemCount = 0,
  animate = false,
}: AnimatedCartIconProps) {
  const scaleAnim = useAnimation(1);

  useEffect(() => {
    if (animate) {
      scaleAnim.sequence([
        scaleAnim.timing({ toValue: 1.3, duration: 150 }),
        scaleAnim.timing({ toValue: 1, duration: 150 }),
      ]).start();
    }
  }, [itemCount]);

  return (
    <View>
      <Animated.View style={{ transform: [{ scale: scaleAnim.value }] }}>
        <Ionicons name="cart-outline" size={size} color={color} />
      </Animated.View>
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: theme.colors.secondary,
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
