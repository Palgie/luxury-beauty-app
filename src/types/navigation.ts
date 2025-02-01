import { RootStackParamList } from '@/navigation/types';
import { SortOption } from '@/types/productList';

export interface NavigationLink {
  text?: string;
  url: string;
  openExternally?: boolean;
  noFollow?: boolean;
}

export interface NavigationImage {
  url: string;
  alt?: string;
}

export type CollectionScreen = keyof Pick<RootStackParamList, 'Collection'>;

interface BaseNavigationItem {
  displayName: string;
  image?: NavigationImage;
  subNavigation?: NavigationItem[];
}

export interface ApiNavigationItem extends BaseNavigationItem {
  type: string;
  screen: string;
  link: NavigationLink;
}

export interface CollectionNavigationItem extends BaseNavigationItem {
  type: 'collection';
  screen: CollectionScreen;
  sort: SortOption;
  handle: string;
}

export type NavigationItem = ApiNavigationItem | CollectionNavigationItem;

export interface HeaderNavigation {
  topLevel: NavigationItem[];
}

export interface FooterNavigation {
  topLevel: NavigationItem[];
}

export interface HeaderResponse {
  header: {
    widgets: Array<{
      __typename: string;
      id: string;
      stripBannerText?: string;
      stripBannerURL?: string;
    }>;
    navigation: HeaderNavigation;
  };
  footer: {
    navigation: FooterNavigation;
  };
  brands?: Array<{
    name: string;
    page: {
      path: string;
    };
  }>;
}

export const isCollectionItem = (item: NavigationItem): item is CollectionNavigationItem => {
  return item.type === 'collection';
};

export const isApiItem = (item: NavigationItem): item is ApiNavigationItem => {
  return !isCollectionItem(item);
};

export interface CollectionConfig {
  displayName: string;
  screen: CollectionScreen;
  sort: SortOption;
  handle: string;
}

export const collectionConfigs: CollectionConfig[] = [
  {
    displayName: 'New Arrivals',
    screen: 'Collection',
    sort: 'NEWEST_TO_OLDEST',
    handle: 'new-arrivals',
  },
  {
    displayName: 'Best Sellers',
    screen: 'Collection',
    sort: 'POPULARITY',
    handle: 'best-sellers',
  },
  {
    displayName: 'Best Deals',
    screen: 'Collection',
    sort: 'DISCOUNT_PERCENTAGE_HIGH_TO_LOW',
    handle: 'trending-now',
  },
];
