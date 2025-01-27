import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchEntityIdsByCustomPaths = payloadGraphql(
  `
query SearchEntityIdsByCustomPaths($paths: [String], $locale:LocaleInputType!) {
  Categories(where:{seo__path:{in:$paths}}, locale:$locale) {
    docs {
      entityId
      seo {
        path
      }
    }
  }
  
  Products(where:{seo__path:{in:$paths}}, locale:$locale) {
    docs {
      entityId
      seo {
        path
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
