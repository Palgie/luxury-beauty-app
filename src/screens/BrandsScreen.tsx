import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { haptics } from '@/utils/haptics';

interface Brand {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  featured: boolean;
}

const brands: Brand[] = [
  {
    id: 'chanel',
    name: 'CHANEL',
    logo: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200',
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
    description: 'Timeless luxury beauty and fragrance',
    featured: true,
  },
  {
    id: 'dior',
    name: 'Dior',
    logo: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=200',
    coverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    description: 'Haute couture beauty essentials',
    featured: true,
  },
  {
    id: 'lancome',
    name: 'Lancôme',
    logo: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200',
    coverImage: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800',
    description: 'French luxury skincare and cosmetics',
    featured: true,
  },
  {
    id: 'ysl',
    name: 'Yves Saint Laurent',
    logo: 'https://images.unsplash.com/photo-1573575155376-b5010099301b?w=200',
    coverImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800',
    description: 'Parisian luxury beauty',
    featured: false,
  },
  {
    id: 'guerlain',
    name: 'Guerlain',
    logo: 'https://images.unsplash.com/photo-1614859324967-bdf471b40aa4?w=200',
    coverImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800',
    description: 'Heritage luxury perfumes and skincare',
    featured: false,
  },
  {
    id: 'sisley',
    name: 'Sisley Paris',
    logo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200',
    coverImage: 'https://images.unsplash.com/photo-1573575154488-f88a60e170df?w=800',
    description: 'High-end phyto-cosmetology',
    featured: false,
  },
];

export default function BrandsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBrandPress = (brandId: string) => {
    haptics.light();
    navigation.navigate('Category', {
      category: `brand-${brandId}`,
      title: brands.find(b => b.id === brandId)?.name || '',
    });
  };

  const renderFeaturedBrand = ({ item }: { item: Brand }) => (
    <Pressable
      style={styles.featuredBrand}
      onPress={() => handleBrandPress(item.id)}
    >
      <Image
        source={{ uri: item.coverImage }}
        style={styles.featuredCover}
        resizeMode="cover"
      />
      <View style={styles.featuredOverlay}>
        <Image
          source={{ uri: item.logo }}
          style={styles.featuredLogo}
          resizeMode="contain"
        />
        <Text style={styles.featuredDescription}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );

  const renderBrandItem = ({ item }: { item: Brand }) => (
    <Pressable
      style={styles.brandItem}
      onPress={() => handleBrandPress(item.id)}
    >
      <Image
        source={{ uri: item.logo }}
        style={styles.brandLogo}
        resizeMode="contain"
      />
      <Text style={styles.brandName}>{item.name}</Text>
      <Text style={styles.brandDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </Pressable>
  );

  const featuredBrands = brands.filter(brand => brand.featured);
  const otherBrands = brands.filter(brand => !brand.featured);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luxury Brands</Text>
      <FlatList
        data={otherBrands}
        renderItem={renderBrandItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Featured</Text>
            <FlatList
              data={featuredBrands}
              renderItem={renderFeaturedBrand}
              keyExtractor={(item) => `featured-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
            <Text style={styles.sectionTitle}>All Brands</Text>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  title: {
    fontSize: theme.typography.fontSize.h1,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    padding: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    padding: theme.spacing.m,
  },
  list: {
    padding: theme.spacing.m,
  },
  row: {
    justifyContent: 'space-between',
  },
  featuredList: {
    paddingHorizontal: theme.spacing.m,
  },
  featuredBrand: {
    width: 300,
    height: 200,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  featuredCover: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.m,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
  },
  featuredLogo: {
    width: 120,
    height: 40,
    marginBottom: theme.spacing.s,
    tintColor: theme.colors.secondary,
  },
  featuredDescription: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.caption,
    textAlign: 'center',
  },
  brandItem: {
    width: '48%',
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  brandLogo: {
    width: 120,
    height: 40,
    marginBottom: theme.spacing.s,
  },
  brandName: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  brandDescription: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
