import type { Block } from 'payload';

const Schema: Block = {
  slug: 'html',
  interfaceName: 'HtmlBlock',
  fields: [
    {
      name: 'html',
      type: 'code',
      admin: {
        language: 'html',
      },
      localized: true,
    },
  ],
};

export default Schema;
