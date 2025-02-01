import React from 'react';
import { View, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import { theme } from '@/theme';
import { useAnimation } from '@/hooks/useAnimation';

interface LoadingStateProps {
  fullScreen?: boolean;
}

export default function LoadingState({ fullScreen = true }: LoadingStateProps) {
  const scaleAnim = useAnimation(0.8);

  React.useEffect(() => {
    const animation = scaleAnim.loop(
      scaleAnim.sequence([
        scaleAnim.timing({ toValue: 1.1, duration: 1000 }),
        scaleAnim.timing({ toValue: 0.8, duration: 1000 }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen,
  ];

  const content = (
    <Animated.View style={{ transform: [{ scale: scaleAnim.value }] }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Animated.View>
  );

  if (!fullScreen) {
    return <View style={containerStyle}>{content}</View>;
  }

  return <View style={containerStyle}>{content}</View>;
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
});
