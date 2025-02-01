import { gql, useQuery } from '@apollo/client';
import { HeaderResponse } from '@/types/navigation';

export const GET_HEADER_NAVIGATION = gql`
  query HeaderFooter($includeBrands: Boolean = false) {
    header {
      widgets {
        __typename
        ... on GlobalStripBanner {
          id
          stripBannerText
          stripBannerURL
        }
      }
      navigation {
        topLevel {
          type
          displayName
          link {
            url
            openExternally
            noFollow
          }
          image {
            url
            alt
          }
          subNavigation {
            type
            displayName
            link {
              text
              url
              openExternally
              noFollow
            }
            image {
              url
              alt
            }
            subNavigation {
              type
              displayName
              link {
                text
                url
                openExternally
                noFollow
              }
              image {
                url
                alt
              }
            }
          }
        }
      }
    }
    footer {
      navigation {
        topLevel {
          displayName
          link {
            url
            openExternally
            noFollow
          }
          image {
            url
          }
          subNavigation {
            displayName
            link {
              url
              openExternally
              noFollow
            }
            image {
              url
            }
          }
        }
      }
    }
    brands @include(if: $includeBrands) {
      name
      page {
        path
      }
    }
  }
`;

export const useHeaderNavigation = () => {
  const { loading, error, data } = useQuery<HeaderResponse>(GET_HEADER_NAVIGATION, {
    variables: {
      includeBrands: false,
    },
  });

  return {
    loading,
    error,
    navigation: data?.header.navigation,
    widgets: data?.header.widgets,
  };
};
