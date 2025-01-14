import componentFragments from '@thebigrick/catalyst-payloadcms/gql/query/fragments/component-fragments';
import containerFragments from '@thebigrick/catalyst-payloadcms/gql/query/fragments/container-fragments';
import getFragmentsQuery from '@thebigrick/catalyst-payloadcms/service/get-fragments-query';
import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const fragmentData = getFragmentsQuery([...componentFragments, ...containerFragments]);

const SearchCategoryByEntityIdQuery = payloadGraphql(
  `
query SearchProductByEntityIdQuery($entityId: String!, $locale:LocaleInputType!, $draft:Boolean!) {
  Categories(where:{entityId:{equals:$entityId}}, locale:$locale, draft:$draft) {
    docs {
      entityId
      heading {
        blocks {
          __typename
          ${fragmentData.request}
        }
      }
      _status
    }
  }
}`,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  fragmentData.fragments as never[],
);

export default SearchCategoryByEntityIdQuery;
