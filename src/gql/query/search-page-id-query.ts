import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const SearchPageIdQuery = payloadGraphql(`
    query PageSearch($slug: String!, $locale:LocaleInputType!) {
      Pages(where:{slug:{equals:$slug}}, locale:$locale, fallbackLocale:en) {
        docs {
          id
          _status
        }
      }
    }
`);

export default SearchPageIdQuery;
