export const PAGE_LAYOUT_DATA = `#graphql
  query getPageLayoutData($handle: String!, $country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    page(handle: $handle) {
      id
      title
      
      # Separate metafields as individual fields
      heroTitle: metafield(namespace: "custom", key: "hero_title") {
        value
        type
      }
      
      heroImage: metafield(namespace: "custom", key: "hero_image") {
       reference {
        ... on MediaImage {
          image {
            originalSrc
          }
        }
      }
        value
        type
      }
      
      stats: metafield(namespace: "custom", key: "stats") {
        value
        type
      }
      
      seo {
        title
        description
      }
    }
  }
`;
