// Default fallback image for when product images fail to load
export const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1614859324967-bdf471b40aa4?w=500';

// Default fallback image for when brand images fail to load
export const DEFAULT_BRAND_IMAGE = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500';

// Default fallback image for when category images fail to load
export const DEFAULT_CATEGORY_IMAGE = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500';

/**
 * Get image URL with fallback
 * @param url Primary image URL to use
 * @param type Type of image (product, brand, or category)
 * @returns URL string with fallback
 */
export const getImageWithFallback = (
  url?: string,
  type: 'product' | 'brand' | 'category' = 'product'
): string => {
  if (!url) {
    switch (type) {
      case 'brand':
        return DEFAULT_BRAND_IMAGE;
      case 'category':
        return DEFAULT_CATEGORY_IMAGE;
      default:
        return DEFAULT_PRODUCT_IMAGE;
    }
  }
  return url;
};

/**
 * Image props with onError handler for fallback
 * @param url Primary image URL to use
 * @param type Type of image (product, brand, or category)
 * @returns Object with source and onError props for Image component
 */
export const getImageProps = (
  url?: string,
  type: 'product' | 'brand' | 'category' = 'product'
) => ({
  source: { uri: getImageWithFallback(url, type) },
  onError: ({ nativeEvent: { error } }: any) => {
    console.warn(`Image failed to load: ${error}. Using fallback image.`);
  },
});
