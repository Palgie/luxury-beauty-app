import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import HomeScreen from '@/screens/HomeScreen';
import BrandsScreen from '@/screens/BrandsScreen';
import CategoriesScreen from '@/screens/CategoriesScreen';
import OffersScreen from '@/screens/OffersScreen';
import AccountScreen from '@/screens/AccountScreen';
import TabIcon from '@/components/TabIcon';
import { theme } from '@/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brand,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.main,
          borderTopColor: 'rgba(0,0,0,0.08)',
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <MaterialCommunityIcons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={color} 
              />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Brands"
        component={BrandsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <MaterialCommunityIcons 
                name={focused ? 'diamond' : 'diamond-outline'} 
                size={24} 
                color={color} 
              />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <MaterialCommunityIcons 
                name={focused ? 'view-grid' : 'view-grid-outline'} 
                size={24} 
                color={color} 
              />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <MaterialCommunityIcons 
                name={focused ? 'gift' : 'gift-outline'} 
                size={24} 
                color={color} 
              />
            </TabIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused}>
              <MaterialCommunityIcons 
                name={focused ? 'account' : 'account-outline'} 
                size={24} 
                color={color} 
              />
            </TabIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
