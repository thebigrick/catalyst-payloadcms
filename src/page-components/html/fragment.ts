import { payloadGraphql } from '@thebigrick/catalyst-payloadcms/service/payload-graphql';

const Fragment = payloadGraphql(
  `
  fragment HtmlBlock on HtmlBlock {
      html
  }
`,
);

export default Fragment;
