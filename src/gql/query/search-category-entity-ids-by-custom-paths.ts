import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchCategoryEntityIdsByCustomPaths = payloadGraphql(
  `
query SearchCategoryEntityIdsByCustomPaths($path: [String], $locale:LocaleInputType!) {
  Categories(where:{seo__categoryPath:{in:$path}}, locale:$locale) {
    docs {
      entityId
      seo {
        categoryPath
      }
    }
  }
}`,
);

export default SearchCategoryEntityIdsByCustomPaths;
