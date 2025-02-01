import { Product } from './products';

export type SortOption = 
  | 'POPULARITY' 
  | 'PRICE_ASC' 
  | 'PRICE_DESC' 
  | 'NEWEST' 
  | 'PRICE_LOW_TO_HIGH'
  | 'PRICE_HIGH_TO_LOW'
  | 'NEWEST_TO_OLDEST'
  | 'DISCOUNT_PERCENTAGE_HIGH_TO_LOW';

export type PagePath = string;

export interface FacetInput {
  facetName: string;
  optionName: string;
}

export interface RichContent {
  type: string;
  content: string;
}

export interface ProductListWidget {
  __typename: 'ProductListWidget';
  widgetDescription?: string;
  id: string;
  title?: string;
  descriptionHtml?: {
    content: RichContent[];
  };
  seoDescriptionHtml?: {
    content: RichContent[];
  };
  productList: {
    total: number;
    hasMore: boolean;
    facets: any[];
    products: Product[];
  };
}

interface BaseGlobalPrimaryBanner {
  widgetDescription?: string;
  id: string;
  altImageLarge?: string;
  imageSmall?: string;
  imageMedium?: string;
  imageLarge?: string;
  bannerURL?: string;
  headline?: string;
  useH1?: boolean;
  subtitle?: string;
  ctaOne?: string;
  ctaOneURL?: string;
  ctaOneAriaLabel?: string;
  ctaTwo?: string;
  ctaTwoURL?: string;
  ctaTwoAriaLabel?: string;
  contentTheme?: 'light' | 'dark';
  contentAlign?: 'left' | 'center' | 'right';
  contentBoxPosition?: 'left' | 'center' | 'right';
  logopngWhiteBG?: string;
  logopngImageBG?: string;
  altLogoPng?: string;
}

export interface GlobalPrimaryBannerWidget extends BaseGlobalPrimaryBanner {
  __typename: 'GlobalPrimaryBanner';
}

export interface GlobalPrimaryBannerWithTextOverlayWidget extends BaseGlobalPrimaryBanner {
  __typename: 'GlobalPrimaryBannerWithTextOverlay';
}

export interface ResponsiveSliderSetWidget {
  __typename: 'ResponsiveSliderSet';
  widgetDescription?: string;
  id: string;
  slides: Array<{
    id: string;
    content: RichContent[];
  }>;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
}

export type Widget = 
  | ProductListWidget 
  | GlobalPrimaryBannerWidget 
  | GlobalPrimaryBannerWithTextOverlayWidget 
  | ResponsiveSliderSetWidget;

export interface ProductListResponse {
  page: {
    title: string;
    metaDescription?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    alternateLinks?: Array<{
      locale: string;
      url: string;
    }>;
    metaSearchKeywords?: string[];
    breadcrumbs?: Array<{
      displayName: string;
      pagePath: string;
    }>;
    widgets: Widget[];
  };
}

export interface ProductListVariables {
  handle: PagePath;
  currency: string;
  shippingDestination: string;
  offset: number;
  limit: number;
  sort: SortOption;
  facets: FacetInput[];
  reviewsEnabled: boolean;
  vipPricingEnabled: boolean;
  giftCards: boolean;
  wishlist: boolean;
}

export const asPagePath = (path: string): PagePath => {
  const cleanPath = path
    .replace(/^https?:\/\/[^\/]+/, '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/\.list$/, '');

  return cleanPath.startsWith('c/') ? `/${cleanPath}` : cleanPath;
};
