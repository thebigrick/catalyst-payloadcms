import type { Block } from 'payload';

import BlocksList from '@thebigrick/catalyst-payloadcms/collections/blocks/blocks-list';

export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  fields: [
    {
      name: 'items',
      type: 'blocks',
      maxRows: 12,
      blocks: BlocksList,
    },
  ],
};
