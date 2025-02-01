import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { theme } from '@/theme';
import { haptics } from '@/utils/haptics';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaUrl?: string;
  contentPosition?: 'left' | 'right' | 'center';
  theme?: 'light' | 'dark';
}

export default function HeroBanner({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaUrl,
  contentPosition = 'left',
  theme: bannerTheme = 'light',
}: HeroBannerProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (!ctaUrl) return;
    haptics.light();
    
    if (ctaUrl.startsWith('category/')) {
      const categoryId = ctaUrl.replace('category/', '');
      navigation.navigate('Category', { categoryId, title });
    }
  };

  const getContentPosition = () => {
    switch (contentPosition) {
      case 'right':
        return { alignItems: 'flex-end' as const };
      case 'center':
        return { alignItems: 'center' as const };
      default:
        return { alignItems: 'flex-start' as const };
    }
  };

  const getTextColor = () => {
    return bannerTheme === 'dark' ? theme.colors.text.inverse : theme.colors.text.primary;
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={[styles.content, getContentPosition()]}>
          <Text style={[styles.title, { color: getTextColor() }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: getTextColor() }]}>{subtitle}</Text>
          )}
          {ctaText && (
            <Pressable
              onPress={handlePress}
              style={({ pressed }) => [
                styles.button,
                { opacity: pressed ? 0.8 : 1 },
                bannerTheme === 'dark' ? styles.buttonDark : styles.buttonLight,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  bannerTheme === 'dark' ? styles.buttonTextDark : styles.buttonTextLight,
                ]}
              >
                {ctaText}
              </Text>
            </Pressable>
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%',
    marginBottom: theme.spacing.l,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.l,
  },
  imageStyle: {
  },
  content: {
    maxWidth: '70%',
  },
  title: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.s,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  subtitle: {
    fontSize: theme.typography.fontSize.body,
    marginBottom: theme.spacing.m,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  button: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.pill,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonLight: {
    backgroundColor: theme.colors.background.main,
  },
  buttonDark: {
    backgroundColor: theme.colors.text.inverse,
  },
  buttonText: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.bold,
  },
  buttonTextLight: {
    color: theme.colors.text.primary,
  },
  buttonTextDark: {
    color: theme.colors.text.inverse,
  },
});
