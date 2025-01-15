import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchEntityIdsByCustomPaths = payloadGraphql(
  `
query SearchEntityIdsByCustomPaths($path: [String], $locale:LocaleInputType!) {
  Categories(where:{seo__categoryPath:{in:$path}}, locale:$locale) {
    docs {
      entityId
      seo {
        categoryPath
      }
    }
  }
  
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

export default SearchEntityIdsByCustomPaths;
