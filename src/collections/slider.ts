import type {Block} from 'payload';

export const Slider: Block = {
  slug: 'slider',
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'slide-image',
          required: true,
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'cta',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
};
