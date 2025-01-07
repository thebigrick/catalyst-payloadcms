import type { Block } from 'payload';

import BoxBlock from '@thebigrick/catalyst-payloadcms/collections/box';

const Schema: Block = {
  slug: 'heading',
  interfaceName: 'HeadingBlock',
  fields: [
    BoxBlock,
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'level',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 1,
      max: 6,
    },
  ],
};

export default Schema;
