/* eslint-disable no-underscore-dangle */

import { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload';

import componentSchemas from '@thebigrick/catalyst-payloadcms/collections/component-schemas';
import containerSchemas from '@thebigrick/catalyst-payloadcms/collections/container-schemas';
import { Category as CategoryType } from '@thebigrick/catalyst-payloadcms/generated-types';
import getCatalystUrl from '@thebigrick/catalyst-payloadcms/service/get-catalyst-url';
import invalidatePaths from '@thebigrick/catalyst-payloadcms/service/invalidate-paths';
import isFrontendRequest from '@thebigrick/catalyst-payloadcms/service/is-frontend-request';

export const invalidateCacheOnStatusChange: CollectionAfterChangeHook = async (args) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const doc = args.doc as CategoryType;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const prevDoc = args.previousDoc as CategoryType;

  if (doc._status !== prevDoc._status) {
    const { default: invalidateCategory } = await import(
      '@thebigrick/catalyst-payloadcms/service/invalidate-category'
    );

    if (doc.seo?.path !== prevDoc.seo?.path) {
      await invalidatePaths();
    }

    await invalidateCategory(doc);
    await invalidateCategory(prevDoc);
  }
};

export const invalidateCacheOnDelete: CollectionAfterDeleteHook = async (args) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const doc = args.doc as CategoryType;

  if (doc._status === 'published') {
    const { default: invalidateCategory } = await import(
      '@thebigrick/catalyst-payloadcms/service/invalidate-category'
    );

    await invalidateCategory(doc);
    await invalidatePaths();
  }
};

const Category: CollectionConfig = {
  slug: 'category',
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
          return `${baseUrl}/${locale.code}/payload-category-preview/${data.entityId}?_payload_preview=${previewSecret}`;
        }

        return baseUrl;
      },
    },
  },
  fields: [
    {
      name: 'entityId',
      type: 'text',
      label: 'Category ID',
      admin: {
        components: {
          Field: {
            path: '@thebigrick/catalyst-payloadcms/fields/category-picker',
          },
        },
      },
      required: true,
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          localized: true,
        },
        {
          name: 'path',
          type: 'text',
          label: 'Custom path',
          localized: true,
          unique: true,
        },
        {
          name: 'metaDescription',
          type: 'text',
          label: 'Meta description',
          localized: true,
        },
        {
          name: 'metaKeywords',
          type: 'text',
          label: 'Meta keywords',
          localized: true,
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
          type: 'blocks',
          localized: true,
          label: 'Blocks',
          blocks: [...componentSchemas, ...containerSchemas],
        },
      ],
    },
  ],
};

export default Category;
