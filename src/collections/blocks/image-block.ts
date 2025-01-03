import type { Block } from 'payload';

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'image',
      required: true,
      localized: true,
    },
  ],
};
