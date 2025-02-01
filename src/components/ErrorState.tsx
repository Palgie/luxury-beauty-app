import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { haptics } from '@/utils/haptics';
import { useAnimation } from '@/hooks/useAnimation';

interface ErrorStateProps {
  message?: string;
  fullScreen?: boolean;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Something went wrong',
  fullScreen = true,
  onRetry,
}: ErrorStateProps) {
  const fadeAnim = useAnimation(0);
  const slideAnim = useAnimation(20);
  const shakeAnim = useAnimation(0);

  useEffect(() => {
    fadeAnim.parallel([
      fadeAnim.fadeIn(500),
      slideAnim.timing({ toValue: 0, duration: 500 }),
    ]).start();
  }, []);

  const handleRetry = async () => {
    haptics.warning();
    shakeAnim.shake().start(async () => {
      haptics.light();
      onRetry?.();
    });
  };

  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen,
  ];

  return (
    <View style={containerStyle}>
      <Animated.View
        style={{
          opacity: fadeAnim.value,
          transform: [
            { translateY: slideAnim.value },
            { translateX: shakeAnim.value },
          ],
          alignItems: 'center',
        }}
      >
      <Ionicons
        name="alert-circle-outline"
        size={48}
        color={theme.colors.text.secondary}
      />
      <Text style={styles.message}>{message}</Text>
        {onRetry && (
          <Pressable
            style={styles.retryButton}
            onPress={handleRetry}
            android_ripple={{
              color: 'rgba(255, 255, 255, 0.2)',
              borderless: false,
            }}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  message: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.m,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.medium,
  },
  retryText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
