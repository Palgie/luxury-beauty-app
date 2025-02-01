export interface Price {
  currency: string;
  amount: number;
  displayValue: string;
}

export interface PriceRange {
  price: Price;
  rrp: Price;
}

export interface ProductVariant {
  sku: string;
  inStock: boolean;
  isDiggecardProduct?: boolean;
  price: PriceRange;
  vipPrice?: Price;
  product?: {
    url: string;
  };
  choices?: {
    optionKey: string;
    key: string;
    colour?: string;
    title: string;
  }[];
}

export interface ProductReviews {
  total: number;
  averageScore: number;
  maxScore: number;
}

export interface ProductImage {
  largeProduct: string;
  zoom: string;
  original: string;
}

export interface ProductContentValue {
  __typename: string;
  stringListValue?: string[];
  value?: string;
}

export interface ProductContent {
  key: string;
  value: ProductContentValue;
}

export interface RichContent {
  type: string;
  content: string;
}

export interface MarketedSpecialOffer {
  freeGiftProduct?: {
    images: {
      largeProduct: string;
      original: string;
    }[];
    title: string;
  };
  title?: {
    content: RichContent[];
  };
  description?: {
    content: RichContent[];
  };
  landingPageLink?: {
    text: string;
    url: string;
  };
}

export interface Brand {
  name: string;
}

export interface Product {
  sku: string;
  url: string;
  title: string;
  brand?: Brand;
  inStock?: boolean;
  eligibleForWishlist?: boolean;
  preorder?: boolean;
  preorderReleaseDate?: string;
  reviews?: ProductReviews;
  cheapestVariant: ProductVariant;
  defaultVariant: ProductVariant;
  variants?: ProductVariant[];
  content: ProductContent[];
  images: ProductImage[];
  marketedSpecialOffer?: MarketedSpecialOffer;
}

export interface ProductList {
  total: number;
  hasMore: boolean;
  products: Product[];
  facets?: any[];
  productList?: {
    total: number;
    hasMore: boolean;
    products: Product[];
    facets?: any[];
  };
}

export interface ProductSearchResult {
  total: number;
  hasMore: boolean;
  products: Product[];
  facets?: any[];
  search?: ProductList;
  productList?: ProductList;
}

export interface ProductSearchResponse {
  productSearch: ProductSearchResult;
}

export type ProductSort = 
  | 'POPULARITY'
  | 'PRICE_HIGH_TO_LOW'
  | 'PRICE_LOW_TO_HIGH'
  | 'NEWEST_TO_OLDEST'
  | 'OLDEST_TO_NEWEST'
  | 'DISCOUNT_PERCENTAGE_HIGH_TO_LOW'
  | 'RELEVANCE';
