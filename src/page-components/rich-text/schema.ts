import type { Block } from 'payload';

import BoxBlock from '@thebigrick/catalyst-payloadcms/collections/box';

const Schema: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  fields: [
    BoxBlock,
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
  ],
};

export default Schema;
