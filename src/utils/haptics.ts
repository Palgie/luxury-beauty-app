import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const haptics = {
  light: async () => {
    if (!isWeb) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        // Silently fail on web or if haptics are not available
      }
    }
  },
  medium: async () => {
    if (!isWeb) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        // Silently fail on web or if haptics are not available
      }
    }
  },
  heavy: async () => {
    if (!isWeb) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } catch (error) {
        // Silently fail on web or if haptics are not available
      }
    }
  },
  success: async () => {
    if (!isWeb) {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (error) {
        // Silently fail on web or if haptics are not available
      }
    }
  },
  error: async () => {
    if (!isWeb) {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch (error) {
        // Silently fail on web or if haptics are not available
      }
    }
  },
  warning: async () => {
    if (!isWeb) {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch (error) {
        // Silently fail on web or if haptics are not available
      }
    }
  },
};
