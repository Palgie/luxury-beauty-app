import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($currency: Currency!, $shippingDestination: Country!, $sort: ProductSort!) {
    search(
      query: ""
      options: {
        currency: $currency
        shippingDestination: $shippingDestination
        limit: 10
        offset: 0
        sort: $sort
        facets: []
      }
    ) {
      productList {
        total
        hasMore
        products {
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
          cheapestVariant(
            currency: $currency
            shippingDestination: $shippingDestination
          ) {
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
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sku: SKU!, $currency: Currency!, $shippingDestination: Country!) {
    product(sku: $sku, strict: false) {
      sku
      title
      url
      brand {
        name
      }
      images(limit: 10) {
        largeProduct
        zoom
      }
      reviews {
        total
        averageScore
        maxScore
      }
      cheapestVariant(
        currency: $currency
        shippingDestination: $shippingDestination
      ) {
        price(currency: $currency, shippingDestination: $shippingDestination) {
          price {
            currency
            amount
            displayValue
          }
          rrp {
            currency
            amount
            displayValue
          }
        }
      }
      content(keys: ["synopsis"]) {
        key
        value {
          __typename
          ... on ProductContentRichContentValue {
            richContentValue: value {
              content {
                type
                content
              }
            }
          }
          ... on ProductContentRichContentListValue {
            richContentListValue: value {
              content {
                type
                content
              }
            }
          }
        }
      }
      variants {
        sku
        title
        inStock
        choices {
          optionKey
          key
          title
        }
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
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!, $currency: Currency!, $sort: ProductSort!, $shippingDestination: Country!, $offset: Int!, $limit: Int!) {
    search(
      query: $query
      options: {
        currency: $currency
        shippingDestination: $shippingDestination
        offset: $offset
        limit: $limit
        sort: $sort
        facets: []
      }
    ) {
      productList {
        total
        hasMore
        products {
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
          cheapestVariant(
            currency: $currency
            shippingDestination: $shippingDestination
          ) {
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
      }
    }
  }
`;

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($currency: Currency!, $shippingDestination: Country!, $offset: Int!, $limit: Int!, $facets: [FacetInput!]!) {
    search(
      query: ""
      options: {
        currency: $currency
        shippingDestination: $shippingDestination
        offset: $offset
        limit: $limit
        sort: POPULARITY
        facets: $facets
      }
    ) {
      productList {
        total
        hasMore
        products {
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
          cheapestVariant(
            currency: $currency
            shippingDestination: $shippingDestination
          ) {
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
      }
    }
  }
`;
