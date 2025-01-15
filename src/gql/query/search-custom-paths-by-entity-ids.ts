import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchCustomPathsByEntityIds = payloadGraphql(
  `
query SearchCustomPathsByEntityIds($productEntityIds: [String], $categoryEntityIds: [String], $locale:LocaleInputType!) {
  Categories(where:{entityId:{in:$categoryEntityIds}}, locale:$locale) {
    docs {
      entityId
      seo {
        categoryPath
      }
    }
  }
  
  Products(where:{entityId:{in:$productEntityIds}}, locale:$locale) {
    docs {
      entityId
      seo {
        productPath
      }
    }
  }
}`,
);

export default SearchCustomPathsByEntityIds;
