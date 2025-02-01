import { gql } from '@apollo/client';

export interface PageContentResponse {
  page: {
    widgets: Array<{
      __typename: string;
      id: string;
      headline?: string;
      subtitle?: string;
      imageDesktop?: string;
      imageLarge?: string;
      buttonOne?: string;
      buttonOneLink?: string;
      ctaOne?: string;
      ctaOneURL?: string;
      contentAlign?: string;
      contentTheme?: string;
    }>;
  };
}

const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    sku
    title
    url
    brand {
      name
    }
    images(limit: 1) {
      largeProduct
    }
    reviews {
      total
      averageScore
      maxScore
    }
    marketedSpecialOffer {
      landingPageLink {
        url
        text
      }
    }
    cheapestVariant(currency: $currency, shippingDestination: $shippingDestination) {
      sku
      price(currency: $currency, shippingDestination: $shippingDestination) {
        price {
          amount
          currency
          displayValue
        }
        rrp {
          amount
          currency
          displayValue
        }
      }
    }
  }
`;

export const GET_PAGE_CONTENT = gql`
  query GetPageContent($path: PagePath!) {
    page(path: $path) {
      widgets {
        __typename
        id
      }
    }
  }
`;

export const GET_HOME_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GetHomeProducts($currency: Currency!, $shippingDestination: Country!, $limit: Int!) {
    newProducts: search(
      query: ""
      options: {
        currency: $currency
        shippingDestination: $shippingDestination
        limit: $limit
        offset: 20
        sort: NEWEST_TO_OLDEST
        facets: []
      }
    ) {
      productList {
        products {
          ...ProductFields
        }
      }
    }
    bestSellers: search(
      query: ""
      options: {
        currency: $currency
        shippingDestination: $shippingDestination
        limit: $limit
        offset: 20
        sort: POPULARITY
        facets: []
      }
    ) {
      productList {
        products {
          ...ProductFields
        }
      }
    }
    trending: search(
      query: ""
      options: {
        currency: $currency
        shippingDestination: $shippingDestination
        limit: $limit
        offset: 20
        sort: DISCOUNT_PERCENTAGE_HIGH_TO_LOW
        facets: []
      }
    ) {
      productList {
        products {
          ...ProductFields
        }
      }
    }
  }
`;
