import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { theme } from '@/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface BannerCTA {
  text: string;
  url: string;
  ariaLabel?: string;
}

interface GlobalPrimaryBannerProps {
  altImageLarge?: string;
  imageSmall?: string;
  imageMedium?: string;
  imageLarge?: string;
  bannerURL?: string;
  headline?: string;
  useH1?: boolean;
  subtitle?: string;
  ctaOne?: string;
  ctaOneURL?: string;
  ctaOneAriaLabel?: string;
  ctaTwo?: string;
  ctaTwoURL?: string;
  ctaTwoAriaLabel?: string;
  contentTheme?: 'light' | 'dark';
  contentAlign?: 'left' | 'center' | 'right';
  contentBoxPosition?: 'left' | 'center' | 'right';
  logopngWhiteBG?: string;
  logopngImageBG?: string;
  altLogoPng?: string;
  hasTextOverlay?: boolean;
}

export const GlobalPrimaryBanner: React.FC<GlobalPrimaryBannerProps> = ({
  altImageLarge,
  imageSmall,
  imageLarge,
  bannerURL,
  headline,
  useH1,
  subtitle,
  ctaOne,
  ctaOneURL,
  ctaOneAriaLabel,
  ctaTwo,
  ctaTwoURL,
  ctaTwoAriaLabel,
  contentTheme = 'light',
  contentAlign = 'center',
  contentBoxPosition = 'center',
  hasTextOverlay = false,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();

  const handlePress = (url?: string) => {
    if (!url) return;

    // Normalize URL by removing leading slash if present
    const normalizedUrl = url.startsWith('/') ? url.slice(1) : url;

    // Check if it's a product URL by looking for p/ pattern
    if (normalizedUrl.includes('p/')) {
      // Split the URL by '/' and get the last segment which should be the product ID
      const segments = normalizedUrl.split('/');
      const productId = segments[segments.length - 1];
      navigation.navigate('ProductDetails', { productId });
    } else {
      // For collection URLs, add leading slash if not present
      const handle = normalizedUrl.startsWith('/') ? normalizedUrl : `/${normalizedUrl}`;
      navigation.navigate('Collection', {
        handle,
        title: headline || '',
        initialSort: 'POPULARITY',
      });
    }
  };

  const renderCTA = (text?: string, url?: string, ariaLabel?: string) => {
    if (!text || !url) return null;

    return (
      <TouchableOpacity
        style={[
          styles.cta,
          contentTheme === 'dark' ? styles.ctaDark : styles.ctaLight,
        ]}
        onPress={() => handlePress(url)}
        accessibilityLabel={ariaLabel || text}
      >
        <Text
          style={[
            styles.ctaText,
            contentTheme === 'dark' ? styles.ctaTextDark : styles.ctaTextLight,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const HeadlineComponent = useH1 ? Text : Text;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(bannerURL)}
      disabled={!bannerURL}
    >
      <Image
        source={{ uri: imageSmall || imageLarge }}
        style={[styles.image, { width }] as ImageStyle}
        accessibilityLabel={altImageLarge}
      />
      {(headline || subtitle || ctaOne || ctaTwo) && (
        <View
          style={[
            styles.content,
            styles[`content${contentBoxPosition.charAt(0).toUpperCase() + contentBoxPosition.slice(1)}`],
            hasTextOverlay && styles.contentOverlay,
          ]}
        >
          {headline && (
            <HeadlineComponent
              style={[
                styles.headline,
                styles[`text${contentAlign.charAt(0).toUpperCase() + contentAlign.slice(1)}`],
                contentTheme === 'dark' ? styles.textDark : styles.textLight,
              ]}
            >
              {headline}
            </HeadlineComponent>
          )}
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                styles[`text${contentAlign.charAt(0).toUpperCase() + contentAlign.slice(1)}`],
                contentTheme === 'dark' ? styles.textDark : styles.textLight,
              ]}
            >
              {subtitle}
            </Text>
          )}
          <View style={styles.ctaContainer}>
            {renderCTA(ctaOne, ctaOneURL, ctaOneAriaLabel)}
            {renderCTA(ctaTwo, ctaTwoURL, ctaTwoAriaLabel)}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 12/5,
    resizeMode: 'cover'
  },
  content: {
    position: 'absolute',
    padding: theme.spacing.m,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  contentOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentLeft: {
    alignItems: 'flex-start',
  },
  contentCenter: {
    alignItems: 'center',
  },
  contentRight: {
    alignItems: 'flex-end',
  },
  headline: {
    fontSize: theme.typography.fontSize.h1,
    fontFamily: theme.typography.fontFamily.serifBold,
    marginBottom: theme.spacing.s,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sans,
    marginBottom: theme.spacing.m,
  },
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLight: {
    color: theme.colors.text.primary,
  },
  textDark: {
    color: theme.colors.background.main,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: theme.spacing.s,
  },
  cta: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderWidth: 1,
  },
  ctaLight: {
    backgroundColor: theme.colors.background.main,
    borderColor: theme.colors.text.primary,
  },
  ctaDark: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.background.main,
  },
  ctaText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
  },
  ctaTextLight: {
    color: theme.colors.text.primary,
  },
  ctaTextDark: {
    color: theme.colors.background.main,
  },
});
