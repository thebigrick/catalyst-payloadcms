import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchCustomDataByEntityIds = payloadGraphql(
  `
query SearchCustomPathsByEntityIds($productEntityIds: [String], $categoryEntityIds: [String], $locale:LocaleInputType!) {
  Categories(where:{entityId:{in:$categoryEntityIds}}, locale:$locale) {
    docs {
      entityId
      seo {
        title
        path
        metaDescription
        metaKeywords
      }
    }
  }
  
  Products(where:{entityId:{in:$productEntityIds}}, locale:$locale) {
    docs {
      entityId
      seo {
        title
        path
        metaDescription
        metaKeywords
      }
    }
  }
}`,
);

export default SearchCustomDataByEntityIds;
