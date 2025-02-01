import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@/theme';
import { RootStackParamList } from '@/navigation/types';
import { GET_PRODUCT_LIST } from '@/services/queries/productList';
import { 
  ProductListResponse, 
  ProductListVariables, 
  SortOption, 
  FacetInput, 
  ProductListWidget,
  GlobalPrimaryBannerWidget,
  GlobalPrimaryBannerWithTextOverlayWidget,
  ResponsiveSliderSetWidget,
  Widget,
  asPagePath,
  RichContent,
} from '@/types/productList';
import { Product } from '@/types/products';
import { useProductListState } from '@/hooks/useProductListState';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ProductCard from '@/components/ProductCard';
import SortHeader from '@/components/SortHeader';
import { GlobalPrimaryBanner } from '@/components/GlobalPrimaryBanner';
import { ResponsiveSliderSet } from '@/components/ResponsiveSliderSet';
import { haptics } from '@/utils/haptics';

const GRID_SPACING = theme.spacing.m;
const NUM_COLUMNS = 2;

interface ProductListScreenProps {
  title: string;
  initialSort?: SortOption;
  initialFacets?: FacetInput[];
  handle: string;
}

function ProductListContent({
  title,
  initialSort = 'POPULARITY',
  initialFacets = [],
  handle,
}: ProductListScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  const cardWidth = (width - (GRID_SPACING * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

  const {
    variables,
    sort,
    facets,
    updateSort,
    updateFacet,
    clearFacets,
  } = useProductListState({
    initialSort,
    initialFacets,
  });

  const { loading, error, data, fetchMore, refetch } = useQuery<
    ProductListResponse,
    ProductListVariables
  >(GET_PRODUCT_LIST, {
    variables: {
      ...variables,
      handle: asPagePath(handle),
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data) return <LoadingState />;

  if (error) {
    return (
      <ErrorState 
        message={error.message || "Error loading products"} 
        onRetry={refetch}
      />
    );
  }

  if (!data?.page) {
    return (
      <ErrorState 
        message="No data available" 
        onRetry={refetch}
      />
    );
  }

  const renderWidget = (widget: Widget) => {
    switch (widget.__typename) {
      case 'ProductListWidget':
        return null; // Handled separately in the main list
      case 'GlobalPrimaryBanner':
        return (
          <GlobalPrimaryBanner
            key={widget.id}
            {...widget}
          />
        );
      case 'GlobalPrimaryBannerWithTextOverlay':
        return (
          <GlobalPrimaryBanner
            key={widget.id}
            {...widget}
            hasTextOverlay
          />
        );
      case 'ResponsiveSliderSet':
        return (
          <ResponsiveSliderSet
            key={widget.id}
            slides={widget.slides.map(slide => ({
              id: slide.id,
              content: (
                <View style={styles.sliderContent}>
                  {slide.content.map((item, index) => (
                    <Text key={index} style={styles.sliderText}>
                      {item.content}
                    </Text>
                  ))}
                </View>
              ),
            }))}
            autoPlay={widget.autoPlay}
            interval={widget.interval}
            showDots={widget.showDots}
          />
        );
      default:
        return null;
    }
  };

  const productListWidget = data.page.widgets.find(
    (widget): widget is ProductListWidget => widget.__typename === 'ProductListWidget'
  );

  if (!productListWidget) {
    return (
      <ErrorState 
        message="Product list not available" 
        onRetry={refetch}
      />
    );
  }

  const handleLoadMore = () => {
    if (!productListWidget.productList.hasMore || loading) return;

    fetchMore({
      variables: {
        ...variables,
        handle: asPagePath(handle),
        offset: productListWidget.productList.products.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.page?.widgets) return prev;

        const prevWidget = prev.page?.widgets?.find(
          (widget): widget is ProductListWidget => widget.__typename === 'ProductListWidget'
        );
        const nextWidget = fetchMoreResult.page.widgets.find(
          (widget): widget is ProductListWidget => widget.__typename === 'ProductListWidget'
        );

        if (!prevWidget || !nextWidget) return prev;

        return {
          page: {
            ...prev.page,
            widgets: prev.page.widgets.map(widget => {
              if (widget.__typename !== 'ProductListWidget') return widget;
              return {
                ...widget,
                productList: {
                  ...nextWidget.productList,
                  products: [
                    ...prevWidget.productList.products,
                    ...nextWidget.productList.products,
                  ],
                },
              };
            }),
          },
        };
      },
    });
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.error('Error refreshing products:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleProductPress = (sku: string) => {
    haptics.light();
    navigation.navigate('ProductDetails', { productId: sku });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item.sku)}
        style={{ width: cardWidth }}
      />
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.header}>
      {data.page.widgets.map(widget => 
        widget.__typename !== 'ProductListWidget' && renderWidget(widget)
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <SortHeader
        currentSort={sort}
        onSortChange={updateSort}
        total={productListWidget.productList.total || 0}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={productListWidget.productList.products}
        renderItem={renderItem}
        keyExtractor={(item) => item.sku}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.container}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.brand}
          />
        }
      />
    </View>
  );
}

export default function ProductListScreen(props: ProductListScreenProps) {
  return (
    <ErrorBoundary>
      <ProductListContent {...props} />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  container: {
    paddingHorizontal: GRID_SPACING,
    paddingBottom: GRID_SPACING,
  },
  header: {
    backgroundColor: theme.colors.background.main,
    paddingBottom: theme.spacing.m,
  },
  titleContainer: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.serifBold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  productContainer: {
    flex: 1,
    marginBottom: GRID_SPACING,
    marginHorizontal: GRID_SPACING / 2,
  },
  sliderContent: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background.main,
  },
  sliderText: {
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
});
