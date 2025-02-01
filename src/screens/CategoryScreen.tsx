import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_PRODUCTS } from '@/services/queries/products';
import { ProductSearchResult, Product, ProductSort } from '@/types/products';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import ProductCard from '@/components/ProductCard';
import { haptics } from '@/utils/haptics';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

export default function CategoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { category } = route.params;

  const { loading, error, data, refetch } = useQuery<ProductSearchResult>(GET_CATEGORY_PRODUCTS, {
    variables: { 
      currency: 'GBP',
      shippingDestination: 'GB',
      limit: 20,
      offset: 0,
      sort: ProductSort.POPULARITY,
      facets: [{
        facetName: 'category',
        selections: [{ optionName: category }]
      }]
    },
  });

  const handleProductPress = (sku: string) => {
    haptics.light();
    navigation.navigate('ProductDetails', { productId: sku });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item.sku)}
      style={styles.productCard}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <Text style={styles.resultCount}>
        {data?.search?.productList?.total || 0} Products
      </Text>
    </View>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message="Error loading products" onRetry={() => refetch?.()} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.search?.productList?.products || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.sku}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No products found in this category</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  headerContent: {
    padding: theme.spacing.m,
  },
  resultCount: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
  },
  list: {
    padding: theme.spacing.m,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: theme.spacing.m,
  },
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
