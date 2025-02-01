import React, { useState } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  PressableProps,
  ViewStyle,
  TextStyle,
  Platform,
  View,
} from 'react-native';
import { theme } from '@/theme';
import { haptics } from '@/utils/haptics';

interface LoadingButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function LoadingButton({
  title,
  loading = false,
  style,
  textStyle,
  ...props
}: LoadingButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = (event: any) => {
    if (!loading) {
      haptics.light();
      props.onPress?.(event);
    }
  };

  return (
    <Pressable
      style={[
        styles.button,
        style,
        loading && styles.buttonDisabled,
        Platform.OS === 'ios' && isPressed && styles.buttonPressed,
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={loading}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.2)',
        borderless: false,
        foreground: true,
      }}
      {...props}
      onPress={handlePress}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={theme.colors.secondary} />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.brand,
    overflow: 'hidden',
    borderRadius: 0,
    minHeight: 52,
  },
  content: {
    padding: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  text: {
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.caption,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
