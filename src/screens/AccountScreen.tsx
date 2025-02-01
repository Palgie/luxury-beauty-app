import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { haptics } from '@/utils/haptics';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  description?: string;
  badge?: string;
  action: () => void;
}

const MENU_SECTIONS = [
  {
    title: 'Orders & Shopping',
    items: [
      {
        id: 'orders',
        title: 'My Orders',
        icon: 'bag-handle-outline',
        description: 'View and track your orders',
        badge: '2',
        action: () => console.log('Orders pressed'),
      },
      {
        id: 'wishlist',
        title: 'Wishlist',
        icon: 'heart-outline',
        description: 'Products you\'ve saved',
        badge: '12',
        action: () => console.log('Wishlist pressed'),
      },
      {
        id: 'addresses',
        title: 'Delivery Addresses',
        icon: 'location-outline',
        description: 'Manage your addresses',
        action: () => console.log('Addresses pressed'),
      },
    ],
  },
  {
    title: 'Profile & Preferences',
    items: [
      {
        id: 'profile',
        title: 'Personal Details',
        icon: 'person-outline',
        description: 'Update your information',
        action: () => console.log('Profile pressed'),
      },
      {
        id: 'preferences',
        title: 'Beauty Profile',
        icon: 'color-palette-outline',
        description: 'Customize your preferences',
        action: () => console.log('Preferences pressed'),
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: 'notifications-outline',
        description: 'Manage your notifications',
        action: () => console.log('Notifications pressed'),
      },
    ],
  },
  {
    title: 'Support & About',
    items: [
      {
        id: 'help',
        title: 'Help Center',
        icon: 'help-circle-outline',
        description: 'FAQs and support',
        action: () => console.log('Help pressed'),
      },
      {
        id: 'about',
        title: 'About Us',
        icon: 'information-circle-outline',
        description: 'Learn more about our brand',
        action: () => console.log('About pressed'),
      },
      {
        id: 'terms',
        title: 'Terms & Privacy',
        icon: 'document-text-outline',
        description: 'Legal information',
        action: () => console.log('Terms pressed'),
      },
    ],
  },
];

const MenuItem = ({ item }: { item: MenuItem }) => {
  const handlePress = () => {
    haptics.light();
    item.action();
  };

  return (
    <Pressable
      style={styles.menuItem}
      onPress={handlePress}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.1)',
        borderless: false,
      }}
    >
      <View style={styles.menuIcon}>
        <Ionicons
          name={item.icon as any}
          size={24}
          color={theme.colors.primary}
        />
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
        {item.description && (
          <Text style={styles.menuDescription}>{item.description}</Text>
        )}
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={theme.colors.text.secondary}
      />
    </Pressable>
  );
};

export default function AccountScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jane Doe</Text>
            <Text style={styles.userEmail}>jane.doe@example.com</Text>
          </View>
        </View>
        <Pressable
          style={styles.editButton}
          onPress={() => {
            haptics.light();
            console.log('Edit profile pressed');
          }}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>

      {MENU_SECTIONS.map((section, index) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>
      ))}

      <Pressable
        style={styles.signOutButton}
        onPress={() => {
          haptics.light();
          console.log('Sign out pressed');
        }}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  header: {
    backgroundColor: theme.colors.background.main,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  avatarText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
  },
  editButton: {
    backgroundColor: theme.colors.background.light,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.medium,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
  },
  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    padding: theme.spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.main,
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  menuContent: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  menuTitle: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    flex: 1,
  },
  menuDescription: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: theme.spacing.s,
  },
  badgeText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.caption,
    fontWeight: theme.typography.fontWeight.bold,
  },
  signOutButton: {
    margin: theme.spacing.m,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  signOutText: {
    color: '#E31B23',
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
