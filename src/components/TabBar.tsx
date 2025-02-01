import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { theme } from '@/theme';
import TabIcon from './TabIcon';
import { haptics } from '@/utils/haptics';
import { RootStackParamList } from '@/navigation/types';
import { MainTabParamList } from '@/navigation/types';

type TabBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type IconName = 'home' | 'home-outline' | 'diamond' | 'diamond-outline' | 'view-grid' | 'view-grid-outline' | 'gift' | 'gift-outline' | 'account' | 'account-outline';

type TabInfo = {
  name: keyof MainTabParamList;
  icon: {
    focused: IconName;
    unfocused: IconName;
  };
};

const tabs: TabInfo[] = [
  {
    name: 'Home',
    icon: {
      focused: 'home',
      unfocused: 'home-outline',
    },
  },
  {
    name: 'Brands',
    icon: {
      focused: 'diamond',
      unfocused: 'diamond-outline',
    },
  },
  {
    name: 'Categories',
    icon: {
      focused: 'view-grid',
      unfocused: 'view-grid-outline',
    },
  },
  {
    name: 'Offers',
    icon: {
      focused: 'gift',
      unfocused: 'gift-outline',
    },
  },
  {
    name: 'Account',
    icon: {
      focused: 'account',
      unfocused: 'account-outline',
    },
  },
];

export default function TabBar() {
  const navigation = useNavigation<TabBarNavigationProp>();
  const [activeTab, setActiveTab] = React.useState<keyof MainTabParamList>('Home');

  const handlePress = (tabName: keyof MainTabParamList) => {
    haptics.light();
    setActiveTab(tabName);
    // @ts-ignore - Navigation typing is complex with nested navigators
    navigation.navigate('MainTabs', { screen: tabName });
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          style={styles.tab}
          onPress={() => handlePress(tab.name)}
        >
          <TabIcon focused={activeTab === tab.name}>
            <MaterialCommunityIcons
              name={activeTab === tab.name ? tab.icon.focused : tab.icon.unfocused}
              size={24}
              color={
                activeTab === tab.name
                  ? theme.colors.brand
                  : theme.colors.text.secondary
              }
            />
          </TabIcon>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.main,
    borderTopColor: 'rgba(0,0,0,0.08)',
    borderTopWidth: 1,
    height: 50,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
