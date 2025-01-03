import type { Block } from 'payload';

export const Image: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'slide-image',
      required: true,
      localized: true,
    },
  ],
};
