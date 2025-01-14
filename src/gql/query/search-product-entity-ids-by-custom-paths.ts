import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchProductEntityIdsByCustomPaths = payloadGraphql(
  `
query SearchProductEntityIdsByCustomPaths($path: [String], $locale:LocaleInputType!) {
  Products(where:{seo__productPath:{in:$path}}, locale:$locale) {
    docs {
      entityId
      seo {
        productPath
      }
    }
  }
}`,
);

export default SearchProductEntityIdsByCustomPaths;
