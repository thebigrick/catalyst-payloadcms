/* eslint-disable no-underscore-dangle */

import {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  Field,
} from 'payload';

import componentSchemas from '@thebigrick/catalyst-payloadcms/collections/component-schemas';
import containerSchemas from '@thebigrick/catalyst-payloadcms/collections/container-schemas';
import getCatalystUrl from '@thebigrick/catalyst-payloadcms/service/get-catalyst-url';
import invalidatePage from '@thebigrick/catalyst-payloadcms/service/invalidate-page';
import isFrontendRequest from '@thebigrick/catalyst-payloadcms/service/is-frontend-request';

import { Page as PageType } from '../generated-types';

export const SEOField: Field = {
  type: 'group',
  name: 'seo',
  fields: [
    {
      name: 'keywords',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
};

export const BlocksField: Field = {
  type: 'blocks',
  name: 'blocks',
  label: 'Content',
  blocks: [...componentSchemas, ...containerSchemas],
};

export const invalidateCacheOnStatusChange: CollectionAfterChangeHook = async (args) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const doc = args.doc as PageType;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const prevDoc = args.previousDoc as PageType;

  if (doc._status !== prevDoc._status) {
    await invalidatePage(doc.slug);
    await invalidatePage(prevDoc.slug);
  }
};

export const invalidateCacheOnDelete: CollectionAfterDeleteHook = async (args) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const doc = args.doc as PageType;

  if (doc._status === 'published') {
    await invalidatePage(doc.slug);
  }
};

const Page: CollectionConfig = {
  slug: 'page',
  access: {
    read: isFrontendRequest,
  },
  hooks: {
    afterChange: [invalidateCacheOnStatusChange],
    afterDelete: [invalidateCacheOnDelete],
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
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, locale }) => {
        const baseUrl = getCatalystUrl();

        if (data.slug) {
          return `${baseUrl}/${locale.code}/payload-preview/${data.id}`;
        }

        return baseUrl;
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    BlocksField,
    SEOField,
  ],
};

export default Page;
