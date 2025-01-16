/* eslint-disable no-underscore-dangle */

import { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload';

import componentSchemas from '@thebigrick/catalyst-payloadcms/collections/component-schemas';
import containerSchemas from '@thebigrick/catalyst-payloadcms/collections/container-schemas';
import { Product as ProductType } from '@thebigrick/catalyst-payloadcms/generated-types';
import getCatalystUrl from '@thebigrick/catalyst-payloadcms/service/get-catalyst-url';
import invalidatePaths from '@thebigrick/catalyst-payloadcms/service/invalidate-paths';
import isFrontendRequest from '@thebigrick/catalyst-payloadcms/service/is-frontend-request';

export const invalidateCacheOnStatusChange: CollectionAfterChangeHook = async (args) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const doc = args.doc as ProductType;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const prevDoc = args.previousDoc as ProductType;

  if (doc._status !== prevDoc._status) {
    const { default: invalidateProduct } = await import(
      '@thebigrick/catalyst-payloadcms/service/invalidate-product'
    );

    if (doc.seo?.productPath !== prevDoc.seo?.productPath) {
      await invalidatePaths();
    }

    await invalidateProduct(doc);
    await invalidateProduct(prevDoc);
  }
};

export const invalidateCacheOnDelete: CollectionAfterDeleteHook = async (args) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const doc = args.doc as ProductType;

  if (doc._status === 'published') {
    const { default: invalidateProduct } = await import(
      '@thebigrick/catalyst-payloadcms/service/invalidate-product'
    );

    if (doc.seo?.productPath) {
      await invalidatePaths();
    }

    await invalidateProduct(doc);
  }
};

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
  hooks: {
    afterChange: [invalidateCacheOnStatusChange],
    afterDelete: [invalidateCacheOnDelete],
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
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'productPath',
          type: 'text',
          label: 'Custom path',
          localized: true,
          unique: true,
        },
      ],
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'group',
      fields: [
        {
          name: 'blocks',
          localized: true,
          type: 'blocks',
          label: 'Blocks',
          blocks: [...componentSchemas, ...containerSchemas],
        },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'group',
      fields: [
        {
          name: 'hideOriginalDescription',
          type: 'checkbox',
          label: 'Hide original description',
          defaultValue: true,
        },
        {
          name: 'blocks',
          type: 'blocks',
          localized: true,
          label: 'Blocks',
          blocks: [...componentSchemas, ...containerSchemas],
        },
      ],
    },
  ],
};

export default Product;
