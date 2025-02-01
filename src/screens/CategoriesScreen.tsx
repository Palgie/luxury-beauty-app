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

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
}

const categories: Category[] = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Premium skincare for radiant, healthy skin',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    featured: true,
  },
  {
    id: 'makeup',
    name: 'Makeup',
    description: 'Luxury cosmetics for every occasion',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
    featured: true,
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    description: 'Exclusive perfumes and fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    featured: true,
  },
  {
    id: 'haircare',
    name: 'Hair Care',
    description: 'Professional hair care products',
    image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800',
    featured: false,
  },
  {
    id: 'tools',
    name: 'Tools & Accessories',
    description: 'Professional beauty tools and accessories',
    image: 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=800',
    featured: false,
  },
  {
    id: 'bath-body',
    name: 'Bath & Body',
    description: 'Luxurious bath and body care',
    image: 'https://images.unsplash.com/photo-1573575154488-f88a60e170df?w=800',
    featured: false,
  },
  {
    id: 'mens',
    name: 'Men\'s Grooming',
    description: 'Premium grooming essentials for men',
    image: 'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?w=800',
    featured: false,
  },
  {
    id: 'sets',
    name: 'Gift Sets',
    description: 'Curated luxury beauty sets',
    image: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=800',
    featured: false,
  },
];

export default function CategoriesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCategoryPress = (category: Category) => {
    haptics.light();
    navigation.navigate('Category', {
      category: category.id,
      title: category.name,
    });
  };

  const renderFeaturedItem = ({ item }: { item: Category }) => (
    <Pressable
      style={styles.featuredItem}
      onPress={() => handleCategoryPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.featuredImage}
        resizeMode="cover"
      />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredTitle}>{item.name}</Text>
        <Text style={styles.featuredDescription}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <Pressable
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.categoryImage}
        resizeMode="cover"
      />
      <View style={styles.categoryContent}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );

  const featuredCategories = categories.filter(category => category.featured);
  const otherCategories = categories.filter(category => !category.featured);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={otherCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Featured</Text>
            <FlatList
              data={featuredCategories}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => `featured-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              snapToInterval={320 + theme.spacing.m}
              decelerationRate="fast"
              pagingEnabled
            />
            <Text style={styles.sectionTitle}>All Categories</Text>
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
  featuredItem: {
    width: 320,
    height: 200,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  featuredImage: {
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
  },
  featuredTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  featuredDescription: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.secondary,
    opacity: 0.8,
  },
  categoryItem: {
    width: '48%',
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  categoryImage: {
    width: '100%',
    height: 120,
  },
  categoryContent: {
    padding: theme.spacing.m,
  },
  categoryName: {
    fontSize: theme.typography.fontSize.body,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  categoryDescription: {
    fontSize: theme.typography.fontSize.caption,
    color: theme.colors.text.secondary,
  },
});
