import { useState, useCallback } from 'react';
import { SortOption, FacetInput } from '@/types/productList';

interface UseProductListStateProps {
  initialSort?: SortOption;
  initialFacets?: FacetInput[];
}

export const useProductListState = ({
  initialSort = 'POPULARITY',
  initialFacets = [],
}: UseProductListStateProps = {}) => {
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [facets, setFacets] = useState<FacetInput[]>(initialFacets);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const updateSort = useCallback((newSort: SortOption) => {
    setSort(newSort);
    setOffset(0);
  }, []);

  const updateFacet = useCallback((facetName: string, optionName: string) => {
    setFacets(prev => {
      const existingFacet = prev.find(f => f.facetName === facetName);
      if (existingFacet) {
        return prev.filter(f => f.facetName !== facetName);
      }
      return [...prev, { facetName, optionName }];
    });
    setOffset(0);
  }, []);

  const clearFacets = useCallback(() => {
    setFacets([]);
    setOffset(0);
  }, []);

  const variables = {
    currency: 'GBP',
    shippingDestination: 'GB',
    limit,
    offset,
    sort,
    facets,
    wishlist: false,
    reviewsEnabled: true,
    giftCards: false,
    vipPricingEnabled: false,
  };

  return {
    variables,
    sort,
    facets,
    updateSort,
    updateFacet,
    clearFacets,
  };
};
