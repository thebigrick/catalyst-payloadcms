import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchEntityIdsByCustomPaths = payloadGraphql(
  `
query SearchEntityIdsByCustomPaths($paths: [String], $locale:LocaleInputType!) {
  Categories(where:{seo__categoryPath:{in:$paths}}, locale:$locale) {
    docs {
      entityId
      seo {
        categoryPath
      }
    }
  }
  
  Products(where:{seo__productPath:{in:$paths}}, locale:$locale) {
    docs {
      entityId
      seo {
        productPath
      }
    }
  }
  
  Pages(where:{slug:{in:$paths}}, locale:$locale) {
    docs {
      id
      slug
      _status
    }
  }
}`,
);

export default SearchEntityIdsByCustomPaths;
