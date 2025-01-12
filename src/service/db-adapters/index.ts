import getMongoDb from '@thebigrick/catalyst-payloadcms/service/db-adapters/get-mongo-db';
import getPostgres from '@thebigrick/catalyst-payloadcms/service/db-adapters/get-postgres';
import getVercelPostgres from '@thebigrick/catalyst-payloadcms/service/db-adapters/get-vercel-postgres';
import { DbAdapterProviderCollection } from '@thebigrick/catalyst-payloadcms/types';

const dbAdapters: DbAdapterProviderCollection = {
  mongodb: [getMongoDb, { hasNumericId: false }],
  postgres: [getPostgres, { hasNumericId: true }],
  'vercel-postgres': [getVercelPostgres, { hasNumericId: true }]
};

export default dbAdapters;
