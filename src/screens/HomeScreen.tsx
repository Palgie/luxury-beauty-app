import React from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { theme } from '@/theme';
import { useHomeProducts } from '@/hooks/useHomeProducts';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import { haptics } from '@/utils/haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CarouselProps {
  title: string;
  products: any[];
  onSeeAll: () => void;
  onProductPress: (productId: string) => void;
}

const ProductCarousel = ({ title, products, onSeeAll, onProductPress }: CarouselProps) => (
  <View style={styles.carouselContainer}>
    <View style={styles.carouselHeader}>
      <Text style={styles.carouselTitle}>{title}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.seeAllButton,
          pressed && styles.seeAllButtonPressed,
        ]}
        onPress={onSeeAll}
      >
        <Text style={styles.seeAllText}>See All</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={theme.colors.text.primary}
        />
      </Pressable>
    </View>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={products}
      keyExtractor={(item) => item.sku}
      contentContainerStyle={styles.carouselList}
      renderItem={({ item }) => (
        <View style={styles.carouselItem}>
          <ProductCard
            product={item}
            onPress={() => onProductPress(item.sku)}
          />
        </View>
      )}
    />
  </View>
);

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { loading, error, newProducts, bestSellers, trendingProducts, refetchAll } = useHomeProducts();

  const handleProductPress = (productId: string) => {
    haptics.light();
    navigation.navigate('ProductDetails', { productId });
  };

  const handleNewArrivalsPress = () => {
    haptics.light();
    navigation.navigate('Search', {
      title: 'New Arrivals',
      initialSort: 'NEWEST_TO_OLDEST',
      query: '',
      facets: [],
    });
  };

  const handleBestSellersPress = () => {
    haptics.light();
    navigation.navigate('Search', {
      title: 'Best Sellers',
      initialSort: 'POPULARITY',
      query: '',
      facets: [],
    });
  };

  const handleTrendingNowPress = () => {
    haptics.light();
    navigation.navigate('Search', {
      title: 'Trending Now',
      initialSort: 'DISCOUNT_PERCENTAGE_HIGH_TO_LOW',
      query: '',
      facets: [],
    });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message="Error loading home page" onRetry={refetchAll} />;

  return (
    <ScrollView style={styles.container}>
      <HeroBanner
        title="Summer Beauty"
        imageUrl="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80"
        subtitle="Discover our summer essentials"
        ctaText="Shop Now"
        ctaUrl="category/summer-beauty"
        theme="light"
        contentPosition="left"
      />
      <ProductCarousel
        title="New Arrivals"
        products={newProducts}
        onSeeAll={handleNewArrivalsPress}
        onProductPress={handleProductPress}
      />
      <ProductCarousel
        title="Best Sellers"
        products={bestSellers}
        onSeeAll={handleBestSellersPress}
        onProductPress={handleProductPress}
      />
      <ProductCarousel
        title="Trending Now"
        products={trendingProducts}
        onSeeAll={handleTrendingNowPress}
        onProductPress={handleProductPress}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  carouselContainer: {
    marginTop: theme.spacing.l,
  },
  carouselHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  carouselTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.serifBold,
    color: theme.colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllButtonPressed: {
    opacity: 0.7,
  },
  seeAllText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.sansMedium,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  carouselList: {
    paddingHorizontal: theme.spacing.m,
  },
  carouselItem: {
    marginRight: theme.spacing.m,
  },
});
