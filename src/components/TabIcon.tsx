import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme';

interface TabIconProps {
  focused: boolean;
  children: React.ReactNode;
}

export default function TabIcon({ focused, children }: TabIconProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
});
