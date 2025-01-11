import getMongoDb from '@thebigrick/catalyst-payloadcms/service/db-adapters/get-mongo-db';
import getPostgres from '@thebigrick/catalyst-payloadcms/service/db-adapters/get-postgres';
import getSqlite from '@thebigrick/catalyst-payloadcms/service/db-adapters/get-sqlite';
import { DbAdapterProviderCollection } from '@thebigrick/catalyst-payloadcms/types';

const dbAdapters: DbAdapterProviderCollection = {
  mongodb: [getMongoDb, { hasNumericId: false }],
  postgres: [getPostgres, { hasNumericId: true }],
  sqlite: [getSqlite, { hasNumericId: true }],
};

export default dbAdapters;
