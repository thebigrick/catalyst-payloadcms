import type { Block } from 'payload';

import BoxBlock from '@thebigrick/catalyst-payloadcms/collections/box';

const Schema: Block = {
  slug: 'products-carousel',
  interfaceName: 'ProductsCarouselBlock',
  fields: [
    BoxBlock,
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'productIds',
      type: 'text',
      localized: true,
    },
  ],
};

export default Schema;
