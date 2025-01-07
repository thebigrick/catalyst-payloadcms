import type { Block } from 'payload';

import BoxBlock from '@thebigrick/catalyst-payloadcms/collections/box';
import componentSchemas from '@thebigrick/catalyst-payloadcms/collections/component-schemas';

const Schema: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  fields: [
    BoxBlock,
    {
      name: 'columnsCount',
      type: 'number',
      defaultValue: 2,
      required: true,
      min: 1,
      max: 12,
    },
    {
      name: 'items',
      type: 'blocks',
      blocks: componentSchemas,
    },
  ],
};

export default Schema;
