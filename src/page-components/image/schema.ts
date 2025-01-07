import type { Block } from 'payload';

import BoxBlock from '@thebigrick/catalyst-payloadcms/collections/box';

const Schema: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    BoxBlock,
    {
      name: 'image',
      type: 'upload',
      relationTo: 'image',
      required: true,
      localized: true,
    },
  ],
};

export default Schema;
