import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { useQuery } from '@apollo/client';
import { SEARCH_PRODUCTS } from '@/services/queries/products';
import { ProductSearchResult, ProductSort, Product } from '@/types/products';
import ProductCard from '@/components/ProductCard';
import { useApiState } from '@/hooks/useApiState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import SearchAnimation from '@/components/SearchAnimation';
import { haptics } from '@/utils/haptics';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '@/components/TabBar';

const NUM_COLUMNS = 2;
const GRID_SPACING = theme.spacing.s;
const CONTAINER_PADDING = theme.spacing.m;

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { width } = useWindowDimensions();

  // Calculate card width based on screen width, padding, and grid spacing
  const cardWidth = (width - (2 * CONTAINER_PADDING) - (GRID_SPACING * (NUM_COLUMNS - 1))) / NUM_COLUMNS;

  const { loading, error, data, refetch } = useQuery<ProductSearchResult>(SEARCH_PRODUCTS, {
    variables: { 
      query: searchQuery,
      currency: 'GBP',
      shippingDestination: 'GB',
      limit: 20,
      offset: 0,
      sort: 'RELEVANCE'
    }
  });

  const { renderLoading, renderError, renderContent } = useApiState({
    loading,
    error,
    data,
  });

  const handleProductPress = useCallback((sku: string) => {
    haptics.light();
    navigation.navigate('ProductDetails', { productId: sku });
  }, [navigation]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsSearching(true);
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    const isLastInRow = (index + 1) % NUM_COLUMNS === 0;
    const cardStyle: ViewStyle = {
      ...baseStyles.productCard,
      width: cardWidth,
      marginRight: isLastInRow ? 0 : GRID_SPACING,
    };

    return (
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item.sku)}
        style={cardStyle}
      />
    );
  };

  const renderEmptyState = () => {
    if (!isSearching) {
      return null;
    }

    return (
      <View style={baseStyles.emptyContainer}>
        <Text style={baseStyles.emptyTitle}>No Results Found</Text>
        <Text style={baseStyles.emptyText}>
          Try searching with different keywords
        </Text>
      </View>
    );
  };

  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.searchContainer}>
        <View style={baseStyles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.text.secondary}
            style={baseStyles.searchIcon}
          />
          <TextInput
            style={baseStyles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={theme.colors.text.secondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          {searchQuery.length > 0 && (
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.colors.text.secondary}
              style={baseStyles.clearIcon}
              onPress={() => handleSearch('')}
            />
          )}
        </View>
      </View>
      <View style={baseStyles.content}>
        {renderLoading(<LoadingState />)}
        {renderError(
          <ErrorState
            message="Error loading search results"
            onRetry={() => refetch?.()}
          />
        )}
        {renderContent(
          <View style={baseStyles.listContainer}>
            <FlatList
              data={data?.search?.productList?.products || []}
              renderItem={renderItem}
              keyExtractor={(item) => item.sku}
              ListEmptyComponent={renderEmptyState}
              numColumns={NUM_COLUMNS}
              columnWrapperStyle={baseStyles.row}
            />
          </View>
        )}
      </View>
      <View style={baseStyles.tabBar}>
        <TabBar />
      </View>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: theme.colors.background.main,
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.m
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.light,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.m
  },
  searchIcon: {
    marginRight: theme.spacing.s,
  },
  clearIcon: {
    marginLeft: theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.primary,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: CONTAINER_PADDING,
  },
  row: {
    marginBottom: GRID_SPACING,
  },
  productCard: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.h2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
