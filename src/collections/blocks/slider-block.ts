import type { Block } from 'payload';

export const SliderBlock: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  fields: [
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      defaultValue: 5000,
      required: true,
      min: 0,
    },
    {
      name: 'slidesPerView',
      type: 'number',
      defaultValue: 1,
      required: true,
      min: 1,
    },
    {
      name: 'spaceBetween',
      type: 'number',
      defaultValue: 50,
      required: true,
      min: 0,
    },
    {
      name: 'showNavigation',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
    {
      name: 'showPagination',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'image',
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
