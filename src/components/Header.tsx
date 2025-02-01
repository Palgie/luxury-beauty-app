import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { haptics } from '@/utils/haptics';

interface HeaderProps {
  showBack?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  transparent?: boolean;
  title?: string;
  isCartScreen?: boolean;
}

export function Header({
  showBack = false,
  showSearch = true,
  showCart = true,
  transparent = false,
  title,
  isCartScreen = false,
}: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    haptics.light();
    navigation.goBack();
  };

  const handleSearchPress = () => {
    haptics.light();
    navigation.navigate('Search', {
      title: 'Search',
      initialSort: 'POPULARITY',
      query: '',
      facets: [],
    });
  };

  const handleCartPress = () => {
    haptics.light();
    navigation.navigate('Cart');
  };

  const handleMenuPress = () => {
    haptics.light();
    navigation.navigate('Menu');
  };

  return (
    <View
      style={[
        styles.container,
        transparent && styles.transparentContainer,
      ]}
    >
      <View style={styles.leftSection}>
        {showBack ? (
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            onPress={handleBackPress}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={theme.colors.text.primary}
            />
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            onPress={handleMenuPress}
          >
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color={theme.colors.text.primary}
            />
          </Pressable>
        )}
      </View>

      {title ? (
        <Text
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      ) : (
        <Text style={styles.logo}>LOOKFANTASTIC</Text>
      )}

      <View style={styles.rightSection}>
        {showSearch && (
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            onPress={handleSearchPress}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={theme.colors.text.primary}
            />
          </Pressable>
        )}
        {showCart && !isCartScreen && (
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            onPress={handleCartPress}
          >
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  transparentContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: theme.spacing.xs,
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  logo: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.sansMedium,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  title: {
    flex: 1,
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginHorizontal: theme.spacing.m,
  },
});
