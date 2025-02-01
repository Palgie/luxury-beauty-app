import React from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import MainTabsScreen from '@/screens/MainTabsScreen';
import SearchScreen from '@/screens/SearchScreen';
import CartScreen from '@/screens/CartScreen';
import ProductDetailsScreen from '@/screens/ProductDetailsScreen';
import CategoryScreen from '@/screens/CategoryScreen';
import WishlistScreen from '@/screens/WishlistScreen';
import NewArrivalsScreen from '@/screens/NewArrivalsScreen';
import BestSellersScreen from '@/screens/BestSellersScreen';
import CollectionScreen from '@/screens/CollectionScreen';
import MenuScreen from '@/screens/MenuScreen';
import { AppHeader } from '@/components/AppHeader';
import TabBar from '@/components/TabBar';
import { View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const shouldShowTabBar = (routeName: string) => {
  return ['MainTabs', 'Collection'].includes(routeName);
};

export default function RootNavigator() {
  const [currentRoute, setCurrentRoute] = React.useState('MainTabs');

  const handleStateChange = (state: NavigationState | undefined) => {
    if (state) {
      setCurrentRoute(state.routes[state.index].name);
    }
  };

  return (
    <NavigationContainer
      onStateChange={handleStateChange}
    >
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={({ route }) => ({
            header: ({ navigation, options }) => {
              const showBack = navigation.canGoBack();
              const isProductDetails = route.name === 'ProductDetails';
              const isSearch = route.name === 'Search';
              const isCart = route.name === 'Cart';
              const isMainTabs = route.name === 'MainTabs';
              const isCollection = route.name === 'Collection';
              const isMenu = route.name === 'Menu';

              if (isMainTabs || isCollection) {
                return <AppHeader />;
              }

              if (isMenu) {
                return null;
              }

              return (
                <AppHeader
                  showBack={showBack}
                  showSearch={!isSearch}
                  showCart={!isCart}
                  transparent={isProductDetails}
                  title={options.title}
                  isCartScreen={isCart}
                />
              );
            },
          })}
        >
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabsScreen}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen}
            options={{
              animation: 'slide_from_bottom',
              title: 'Search',
              presentation: 'modal',
            }}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="ProductDetails" 
            component={ProductDetailsScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen 
            name="Category" 
            component={CategoryScreen}
            options={({ route }) => ({
              animation: 'slide_from_right',
              title: route.params.title || 'Category',
            })}
          />
          <Stack.Screen 
            name="Wishlist" 
            component={WishlistScreen}
            options={{
              animation: 'slide_from_right',
              title: 'My Wishlist',
            }}
          />
          <Stack.Screen 
            name="NewArrivals" 
            component={NewArrivalsScreen}
            options={{
              animation: 'slide_from_right',
              title: 'New Arrivals',
            }}
          />
          <Stack.Screen 
            name="BestSellers" 
            component={BestSellersScreen}
            options={{
              animation: 'slide_from_right',
              title: 'Best Sellers',
            }}
          />
          <Stack.Screen 
            name="Collection" 
            component={CollectionScreen}
            options={({ route }) => ({
              animation: 'slide_from_right',
              title: route.params.title,
            })}
          />
          <Stack.Screen 
            name="Menu" 
            component={MenuScreen}
            options={{
              presentation: 'transparentModal',
              animation: 'none',
            }}
          />
        </Stack.Navigator>
        {shouldShowTabBar(currentRoute) && (
          <View style={styles.tabBar}>
            <TabBar />
          </View>
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
