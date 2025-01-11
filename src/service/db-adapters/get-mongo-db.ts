import { mongooseAdapter } from '@payloadcms/db-mongodb';

import { DbAdapterProvider } from '@thebigrick/catalyst-payloadcms/types';

const getMongoDb: DbAdapterProvider = () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required');
  }

  return mongooseAdapter({
    url: process.env.MONGODB_URI,
  });
};

export default getMongoDb;
