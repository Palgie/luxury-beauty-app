import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import BrandsScreen from './BrandsScreen';
import CategoriesScreen from './CategoriesScreen';
import OffersScreen from './OffersScreen';
import AccountScreen from './AccountScreen';

export default function MainTabsScreen() {
  const route = useRoute();
  const params = route.params as { screen?: string };
  const currentTab = params?.screen || 'Home';

  const renderScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Brands':
        return <BrandsScreen />;
      case 'Categories':
        return <CategoriesScreen />;
      case 'Offers':
        return <OffersScreen />;
      case 'Account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
