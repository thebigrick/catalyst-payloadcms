import { CollectionConfig } from 'payload';

import componentSchemas from '@thebigrick/catalyst-payloadcms/collections/component-schemas';
import containerSchemas from '@thebigrick/catalyst-payloadcms/collections/container-schemas';
import getCatalystUrl from '@thebigrick/catalyst-payloadcms/service/get-catalyst-url';
import isFrontendRequest from '@thebigrick/catalyst-payloadcms/service/is-frontend-request';

const Product: CollectionConfig = {
  slug: 'product',
  access: {
    read: isFrontendRequest,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
    },
    maxPerDoc: 10,
  },
  admin: {
    livePreview: {
      url: ({ data, locale }) => {
        const baseUrl = getCatalystUrl();
        const previewSecret = process.env.PAYLOAD_PREVIEW_SECRET;

        if (data.entityId) {
          return `${baseUrl}/${locale.code}/payload-product-preview/${data.entityId}?_payload_preview=${previewSecret}`;
        }

        return baseUrl;
      },
    },
  },
  fields: [
    {
      name: 'entityId',
      type: 'text',
      label: 'Product ID',
      required: true,
    },
    {
      name: 'hideOriginalDescription',
      type: 'checkbox',
      label: 'Hide original description',
      defaultValue: true,
    },
    {
      name: 'description',
      type: 'blocks',
      label: 'Description',
      required: true,
      blocks: [...componentSchemas, ...containerSchemas],
    },
  ],
};

export default Product;
