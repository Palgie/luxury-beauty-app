import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useAnimation } from '@/hooks/useAnimation';

export default function SearchAnimation() {
  const scaleAnim = useAnimation(0.8);
  const rotateAnim = useAnimation(0);
  const opacityAnim = useAnimation(0);

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          scaleAnim.timing({
            toValue: 1.2,
            duration: 1000,
          }),
          rotateAnim.timing({
            toValue: 1,
            duration: 1000,
          }),
          opacityAnim.timing({
            toValue: 1,
            duration: 200,
          }),
        ]),
        Animated.parallel([
          scaleAnim.timing({
            toValue: 0.8,
            duration: 1000,
          }),
          rotateAnim.timing({
            toValue: 0,
            duration: 1000,
          }),
        ]),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [scaleAnim, rotateAnim, opacityAnim]);

  const rotate = rotateAnim.value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: opacityAnim.value,
            transform: [
              { scale: scaleAnim.value },
              { rotate },
            ],
          },
        ]}
      >
        <Ionicons
          name="search"
          size={32}
          color={theme.colors.primary}
        />
      </Animated.View>
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                opacity: opacityAnim.value.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [{
                  scale: scaleAnim.value.interpolate({
                    inputRange: [0.8, 1.2],
                    outputRange: [0.8, 1],
                  }),
                }],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.background.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.m,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 4,
  },
});
