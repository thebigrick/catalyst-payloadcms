import BoxBlockInclude from '@thebigrick/catalyst-payloadcms/gql/query/box-block-include';
import componentFragments from '@thebigrick/catalyst-payloadcms/gql/query/fragments/component-fragments';
import getFragmentsQuery from '@thebigrick/catalyst-payloadcms/service/get-fragments-query';
import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const fragmentData = getFragmentsQuery(componentFragments);

const Fragment = payloadGraphql(
  `
  fragment ColumnsBlock on ColumnsBlock {
      ${BoxBlockInclude}
      columnsCount
      items {
        __typename
        ${fragmentData.request}
      }
  }
`,
);

export default Fragment;
