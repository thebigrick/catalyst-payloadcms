import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const ImageBlockFragment = payloadGraphql(`
  fragment ImageBlock on ImageBlock {
      image {
        url
        alt
      }
  }
`);

export default ImageBlockFragment;
