import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { haptics } from '@/utils/haptics';

interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
}

export default function SectionHeader({ title, onPress }: SectionHeaderProps) {
  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  return (
    <Pressable 
      style={styles.container}
      onPress={handlePress}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.1)',
        borderless: true,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={theme.colors.text.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
  },
});
