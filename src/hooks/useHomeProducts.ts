import { useQuery } from '@apollo/client';
import { GET_HOME_PRODUCTS } from '@/services/queries/homepage';
import { ProductSearchResult } from '@/types/products';

interface UseHomeProductsResult {
  loading: boolean;
  error: boolean;
  newProducts: ProductSearchResult['search']['productList']['products'];
  bestSellers: ProductSearchResult['search']['productList']['products'];
  trendingProducts: ProductSearchResult['search']['productList']['products'];
  refetchAll: () => Promise<any>;
}

interface HomeProductsData {
  newProducts: ProductSearchResult['search'];
  bestSellers: ProductSearchResult['search'];
  trending: ProductSearchResult['search'];
}

export const useHomeProducts = (): UseHomeProductsResult => {
  const { 
    loading,
    error,
    data,
    refetch
  } = useQuery<HomeProductsData>(GET_HOME_PRODUCTS, {
    variables: {
      currency: 'GBP',
      shippingDestination: 'GB',
      limit: 5
    }
  });

  return {
    loading,
    error: Boolean(error),
    newProducts: data?.newProducts?.productList?.products || [],
    bestSellers: data?.bestSellers?.productList?.products || [],
    trendingProducts: data?.trending?.productList?.products || [],
    refetchAll: () => refetch()
  };
};
