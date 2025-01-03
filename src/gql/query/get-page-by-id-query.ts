import { FragmentDefinitionNode } from 'graphql/language';

import pageBlockFragments from '@thebigrick/catalyst-payloadcms/gql/query/fragments/page-block-fragments';
import extractFragments from '@thebigrick/catalyst-payloadcms/service/extract-fragments';
import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const fragments: Record<string, FragmentDefinitionNode> = pageBlockFragments.reduce(
  (acc, fragment) => {
    return {
      ...acc,
      ...extractFragments(fragment),
    };
  },
  {},
);

const GetPageByIdQuery = payloadGraphql(
  `
query PageQuery($id: String!, $locale:LocaleInputType!, $draft:Boolean) {
  Page(id:$id, locale:$locale, fallbackLocale:en, draft:$draft) {
    id
    title
    slug
    seo {
      keywords
      description
    }
    blocks {
      __typename
      ${Object.keys(fragments)
        .map((key) => `...${key}`)
        .join('\n')}
    }
  }
}
`,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  Object.values(fragments) as never[],
);

export default GetPageByIdQuery;
