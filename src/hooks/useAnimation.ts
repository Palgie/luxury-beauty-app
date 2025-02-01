import { useRef, useCallback } from 'react';
import { Animated, EasingFunction, Easing } from 'react-native';

interface TimingConfig {
  toValue: number;
  duration?: number;
  easing?: EasingFunction;
  delay?: number;
  useNativeDriver?: boolean;
}

interface SpringConfig {
  toValue: number;
  speed?: number;
  bounciness?: number;
  useNativeDriver?: boolean;
}

export function useAnimation(initialValue = 0) {
  const animation = useRef(new Animated.Value(initialValue)).current;

  const timing = useCallback((config: TimingConfig) => {
    return Animated.timing(animation, {
      toValue: config.toValue,
      duration: config.duration || 300,
      easing: config.easing || Easing.ease,
      delay: config.delay || 0,
      useNativeDriver: config.useNativeDriver ?? true,
    });
  }, [animation]);

  const spring = useCallback((config: SpringConfig) => {
    return Animated.spring(animation, {
      toValue: config.toValue,
      speed: config.speed || 12,
      bounciness: config.bounciness || 8,
      useNativeDriver: config.useNativeDriver ?? true,
    });
  }, [animation]);

  const sequence = useCallback((animations: Animated.CompositeAnimation[]) => {
    return Animated.sequence(animations);
  }, []);

  const parallel = useCallback((animations: Animated.CompositeAnimation[]) => {
    return Animated.parallel(animations);
  }, []);

  const loop = useCallback((animation: Animated.CompositeAnimation, iterations = -1) => {
    return Animated.loop(animation, { iterations });
  }, []);

  const shake = useCallback((intensity = 10, duration = 100) => {
    return sequence([
      timing({ toValue: intensity, duration }),
      timing({ toValue: -intensity, duration }),
      timing({ toValue: intensity, duration }),
      timing({ toValue: 0, duration }),
    ]);
  }, [sequence, timing]);

  const pulse = useCallback((scale = 1.1, duration = 300) => {
    return sequence([
      spring({ toValue: scale }),
      spring({ toValue: 1 }),
    ]);
  }, [sequence, spring]);

  const fadeIn = useCallback((duration = 300) => {
    return timing({ toValue: 1, duration });
  }, [timing]);

  const fadeOut = useCallback((duration = 300) => {
    return timing({ toValue: 0, duration });
  }, [timing]);

  return {
    value: animation,
    timing,
    spring,
    sequence,
    parallel,
    loop,
    shake,
    pulse,
    fadeIn,
    fadeOut,
  };
}
