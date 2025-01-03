import pageBlockFragments from '@thebigrick/catalyst-payloadcms/gql/query/fragments/page-block-fragments';
import getFragmentsQuery from '@thebigrick/catalyst-payloadcms/service/get-fragments-query';
import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const fragmentData = getFragmentsQuery(pageBlockFragments);

const ColumnsBlockFragment = payloadGraphql(`
  fragment ColumnsBlock on ColumnsBlock {
      items {
        __typename
        ${fragmentData.request}
      }
  }
`);

export default ColumnsBlockFragment;
