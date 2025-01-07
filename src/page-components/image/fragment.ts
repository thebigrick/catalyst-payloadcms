import BoxBlockInclude from '@thebigrick/catalyst-payloadcms/gql/query/box-block-include';
import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const Fragment = payloadGraphql(`
  fragment ImageBlock on ImageBlock {
      ${BoxBlockInclude}
      image {
        url
        alt
      }
  }
`);

export default Fragment;
