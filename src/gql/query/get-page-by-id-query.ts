import componentFragments from '@thebigrick/catalyst-payloadcms/gql/query/fragments/component-fragments';
import containerFragments from '@thebigrick/catalyst-payloadcms/gql/query/fragments/container-fragments';
import getFragmentsQuery from '@thebigrick/catalyst-payloadcms/service/get-fragments-query';
import hasNumericId from '@thebigrick/catalyst-payloadcms/service/has-numeric-id';
import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const fragmentData = getFragmentsQuery([...componentFragments, ...containerFragments]);

const IdType = hasNumericId() ? 'Int' : 'String';

const GetPageByIdQuery = payloadGraphql(
  `
query PageQuery($id: ${IdType}!, $locale:LocaleInputType!, $draft:Boolean) {
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
      ${fragmentData.request}
    }
  }
}
`,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  fragmentData.fragments as never[],
);

export default GetPageByIdQuery;
