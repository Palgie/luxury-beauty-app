import React from 'react';
import ProductListScreen from './ProductListScreen';

export default function NewArrivalsScreen() {
  return (
    <ProductListScreen
      title="New In"
      initialSort="NEWEST_TO_OLDEST"
      handle="new-in"
    />
  );
}
