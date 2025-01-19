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
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'entityId',
          type: 'text',
          label: 'Product',
          admin: {
            components: {
              Field: {
                path: '@thebigrick/catalyst-payloadcms/fields/product-picker',
              },
            },
          },
          required: true,
        },
      ],
      localized: true,
    },
  ],
};

export default Schema;
