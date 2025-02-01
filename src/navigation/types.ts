export type RootStackParamList = {
  MainTabs: { screen?: keyof MainTabParamList };
  Search: { title: string; initialSort: string; query: string; facets: any[] };
  Cart: undefined;
  ProductDetails: { productId: string };
  Category: { title: string; category: string };
  Wishlist: undefined;
  NewArrivals: undefined;
  BestSellers: undefined;
  Collection: { title: string; initialSort: string; handle: string };
  Menu: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Brands: undefined;
  Categories: undefined;
  Offers: undefined;
  Account: undefined;
};
