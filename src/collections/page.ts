import type { CollectionConfig, Field } from 'payload';

import { Image } from '@thebigrick/catalyst-payloadcms/collections/image';
import { Slider } from '@thebigrick/catalyst-payloadcms/collections/slider';
import getCatalystUrl from '@thebigrick/catalyst-payloadcms/service/get-catalyst-url';
import isFrontendRequest from '@thebigrick/catalyst-payloadcms/service/is-frontend-request';

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
  blocks: [Slider, Image],
};

const Page: CollectionConfig = {
  slug: 'page',
  access: {
    read: isFrontendRequest,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1500,
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
