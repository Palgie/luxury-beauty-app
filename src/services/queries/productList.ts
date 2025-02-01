import { gql } from '@apollo/client';
import { ProductListResponse, ProductListVariables, PagePath } from '@/types/productList';

const PRODUCT_LIST_FRAGMENT = gql`
  fragment ProductListFragment on ProductListWidget {
    productList(
      input: {
        currency: $currency
        shippingDestination: $shippingDestination
        limit: $limit
        offset: $offset
        sort: $sort
        facets: $facets
      }
    ) {
      total
      hasMore
      facets {
        __typename
        ... on RangedFacet {
          facetName
          facetHeader
          options {
            displayName
            from
            to
            matchedProductCount
          }
        }
        ... on SimpleFacet {
          facetName
          facetHeader
          options {
            optionName
            displayName
            matchedProductCount
          }
        }
        ... on SliderFacet {
          facetName
          facetHeader
          minValue
          maxValue
        }
      }
      products {
        sku
        url
        title
        eligibleForWishlist @include(if: $wishlist)
        preorder
        preorderReleaseDate
        reviews @include(if: $reviewsEnabled) {
          total
          averageScore
          maxScore
        }
        cheapestVariant(
          currency: $currency
          shippingDestination: $shippingDestination
        ) {
          vipPrice(
            currency: $currency
            shippingDestination: $shippingDestination
          ) @include(if: $vipPricingEnabled) {
            currency
            amount
            displayValue
          }
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
          inStock
        }
        defaultVariant(
          options: {
            currency: $currency
            shippingDestination: $shippingDestination
          }
        ) {
          isDiggecardProduct @include(if: $giftCards)
          vipPrice(
            currency: $currency
            shippingDestination: $shippingDestination
          ) @include(if: $vipPricingEnabled) {
            currency
            amount
            displayValue
          }
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
          inStock
        }
        content(keys: ["brand"]) {
          key
          value {
            __typename
            ... on ProductContentStringListValue {
              stringListValue: value
            }
          }
        }
        variants {
          vipPrice(
            currency: $currency
            shippingDestination: $shippingDestination
          ) @include(if: $vipPricingEnabled) {
            currency
            amount
            displayValue
          }
          inStock
          sku
          product {
            url
          }
          choices {
            optionKey
            key
            colour
            title
          }
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
          inStock
          isDiggecardProduct @include(if: $giftCards)
        }
        images(limit: 2) {
          largeProduct
          zoom
          original
        }
        marketedSpecialOffer {
          freeGiftProduct {
            images(limit: 1) {
              largeProduct
              original
            }
            title
          }
          title {
            content {
              type
              content
            }
          }
          description {
            content {
              type
              content
            }
          }
          landingPageLink {
            text
            url
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_LIST = gql`
  ${PRODUCT_LIST_FRAGMENT}
  query CollectionPage(
    $handle: PagePath!
    $currency: Currency!
    $shippingDestination: Country!
    $offset: Int = 0
    $limit: Int = 30
    $sort: ProductSort!
    $facets: [FacetInput!]! = []
    $reviewsEnabled: Boolean! = false
    $vipPricingEnabled: Boolean! = false
    $giftCards: Boolean! = false
    $wishlist: Boolean = true
  ) {
    page(path: $handle) {
      title
      metaDescription
      canonicalUrl
      noIndex
      noFollow
      alternateLinks {
        locale
        url
      }
      metaSearchKeywords
      breadcrumbs {
        displayName
        pagePath
      }
      widgets {
        __typename
        ... on ProductListWidget {
          widgetDescription
          id
          title
          descriptionHtml {
            content {
              type
              content
            }
          }
          seoDescriptionHtml {
            content {
              type
              content
            }
          }
          ...ProductListFragment
        }
        ... on GlobalPrimaryBanner {
          widgetDescription
          id
          altImageLarge
          imageSmall
          imageMedium
          imageLarge
          bannerURL
          headline
          useH1
          subtitle
          ctaOne
          ctaOneURL
          ctaOneAriaLabel
          ctaTwo
          ctaTwoURL
          ctaTwoAriaLabel
          contentTheme
          contentAlign
          contentBoxPosition
          logopngWhiteBG
          logopngImageBG
          altLogoPng
        }
      }
    }
  }
`;

export const useProductList = () => {
  const defaultVariables: Partial<ProductListVariables> = {
    currency: 'GBP',
    shippingDestination: 'GB',
    limit: 20,
    offset: 0,
    sort: 'POPULARITY',
    facets: [],
    wishlist: false,
    reviewsEnabled: true,
    giftCards: false,
    vipPricingEnabled: false,
  };

  return {
    defaultVariables,
  };
};

export const asPagePath = (path: string): PagePath => {
  // Remove domain and clean up path
  const cleanPath = path
    .replace(/^https?:\/\/[^\/]+/, '') // Remove domain
    .replace(/^\/+/, '') // Remove leading slashes
    .replace(/\/+$/, '') // Remove trailing slashes
    .replace(/\.list$/, ''); // Remove .list extension

  // Handle collection paths
  if (cleanPath.includes('c/')) {
    const pathAfterC = cleanPath.split('c/')[1];
    return ('/' + 'c/' + pathAfterC) as PagePath;
  }

  // Handle product paths
  if (cleanPath.includes('p/')) {
    return cleanPath as PagePath;
  }

  // Handle other paths
  return ('/' + cleanPath) as PagePath;
};
