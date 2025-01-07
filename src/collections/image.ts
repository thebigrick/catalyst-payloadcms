import type { CollectionConfig } from 'payload';

import isFrontendRequest from '@thebigrick/catalyst-payloadcms/service/is-frontend-request';

export const Image: CollectionConfig = {
  slug: 'image',
  access: {
    read: isFrontendRequest,
  },
  upload: {
    staticDir: 'payloadcms/images',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 921,
        height: 300,
        position: 'centre',
        fit: 'cover',
      },
      {
        name: 'full',
        width: 1536,
        height: 500,
        position: 'centre',
        fit: 'cover',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
};
