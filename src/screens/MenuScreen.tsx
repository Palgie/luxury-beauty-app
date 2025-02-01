import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { 
  NavigationItem, 
  CollectionNavigationItem,
  isCollectionItem,
  isApiItem,
  collectionConfigs,
} from '@/types/navigation';
import { useHeaderNavigation } from '@/services/queries/navigation';
import { haptics } from '@/utils/haptics';
import ErrorState from '@/components/ErrorState';
import { asPagePath } from '@/services/queries/productList';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.8;

interface MenuItemProps {
  item: NavigationItem;
  onPress: () => void;
}

const MenuItem = ({ item, onPress }: MenuItemProps) => (
  <Pressable
    style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
    onPress={onPress}
  >
    <View style={styles.menuItemContent}>
      <Text style={styles.menuItemText}>{item.displayName}</Text>
      {item.subNavigation && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={theme.colors.text.primary}
        />
      )}
    </View>
    {item.image && (
      <Image
        source={{ uri: item.image.url }}
        style={styles.menuItemImage}
        resizeMode="cover"
      />
    )}
  </Pressable>
);

export default function MenuScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { loading, error, navigation: headerNavigation } = useHeaderNavigation();
  const [currentLevel, setCurrentLevel] = useState<NavigationItem[]>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (headerNavigation?.topLevel) {
      const collectionItems: CollectionNavigationItem[] = collectionConfigs.map(config => ({
        ...config,
        type: 'collection',
      }));
      
      const topLevel = [
        ...collectionItems,
        ...headerNavigation.topLevel,
      ];
      setCurrentLevel(topLevel);
    }

    return () => {
      slideAnim.setValue(0);
      opacityAnim.setValue(1);
    };
  }, [headerNavigation]);

  const handleClose = (onComplete?: () => void) => {
    haptics.light();
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
      if (onComplete) {
        onComplete();
      }
    });
  };

  const extractProductId = (url: string): string | null => {
    const pIndex = url.indexOf('p/');
    if (pIndex === -1) return null;
    
    const afterP = url.slice(pIndex + 2);
    const segments = afterP.split('/');
    return segments[segments.length - 1].replace(/\/$/, '');
  };

  const handleItemPress = (item: NavigationItem) => {
    haptics.light();
    if (item.subNavigation) {
      setCurrentLevel(item.subNavigation || []);
    } else if (isCollectionItem(item)) {
      const navigateToCollection = () => {
        navigation.navigate(item.screen, {
          title: item.displayName,
          initialSort: item.sort,
          handle: asPagePath(item.handle),
        });
      };
      handleClose(navigateToCollection);
    } else if (isApiItem(item)) {
      const url = item.link.url;
      const navigateToScreen = () => {
        if (url.includes('p/')) {
          const productId = extractProductId(url);
          if (productId) {
            navigation.navigate('ProductDetails', { productId });
          }
        } else {
          navigation.navigate('Collection', {
            title: item.displayName,
            initialSort: 'POPULARITY',
            handle: asPagePath(url),
          });
        }
      };
      handleClose(navigateToScreen);
    }
  };

  const handleBack = () => {
    haptics.light();
    if (headerNavigation?.topLevel && currentLevel !== headerNavigation.topLevel) {
      const collectionItems: CollectionNavigationItem[] = collectionConfigs.map(config => ({
        ...config,
        type: 'collection',
      }));
      
      const topLevel = [
        ...collectionItems,
        ...headerNavigation.topLevel,
      ];
      setCurrentLevel(topLevel);
    }
  };

  if (error) return <ErrorState message="Error loading menu" />;

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: opacityAnim,
          }
        ]}
      >
        <Pressable 
          style={styles.overlayButton} 
          onPress={() => handleClose()} 
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [
              { translateX: slideAnim },
            ],
          },
        ]}
      >
        <View style={styles.header}>
          {currentLevel !== headerNavigation?.topLevel && (
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
              onPress={handleBack}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={28}
                color={theme.colors.text.primary}
              />
            </Pressable>
          )}
          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closeButtonPressed,
            ]}
            onPress={() => handleClose()}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={theme.colors.text.primary}
            />
          </Pressable>
        </View>
        <ScrollView style={styles.content}>
          {loading ? (
            <ActivityIndicator 
              size="large" 
              color={theme.colors.brand}
              style={styles.loadingIndicator}
            />
          ) : (
            currentLevel.map((item) => (
              <MenuItem
                key={item.displayName}
                item={item}
                onPress={() => handleItemPress(item)}
              />
            ))
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: theme.spacing.m,
  },
  backButton: {
    marginRight: 'auto',
    padding: theme.spacing.xs,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  closeButtonPressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  loadingIndicator: {
    marginTop: theme.spacing.xl,
  },
  menuItem: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  menuItemPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
  },
  menuItemImage: {
    width: '100%',
    height: 120,
    marginTop: theme.spacing.s,
    backgroundColor: theme.colors.background.light,
  },
});
