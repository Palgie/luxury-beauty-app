import React from 'react';
import ProductListScreen from './ProductListScreen';

export default function BestSellersScreen() {
  return (
    <ProductListScreen
      title="Best Sellers"
      initialSort="POPULARITY"
      handle="best-sellers"
    />
  );
}
