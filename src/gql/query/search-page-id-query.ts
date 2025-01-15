import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchPageIdQuery = payloadGraphql(`
    query SearchPageIdQuery($slug: String!, $locale:LocaleInputType!) {
      Pages(where:{slug:{equals:$slug}}, locale:$locale) {
        docs {
          id
          _status
        }
      }
    }
`);

export default SearchPageIdQuery;
