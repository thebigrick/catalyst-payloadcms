import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { Image } from '@thebigrick/catalyst-payloadcms/collections/image';

export const vercelBlobStorageCollections = {
  [Image.slug]: true,
};

const getPayloadcmsPlugins = () => {
  const adapter = process.env.PAYLOADCMS_STORAGE_ADAPTER;

  if (adapter === 'vercel-blob') {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is required');
    }

    return [
      vercelBlobStorage({
        collections: vercelBlobStorageCollections,
        token: process.env.BLOB_READ_WRITE_TOKEN || '',
      }),
    ];
  }
};

export default getPayloadcmsPlugins;
