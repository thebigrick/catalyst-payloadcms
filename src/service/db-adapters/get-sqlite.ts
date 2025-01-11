import { sqliteAdapter } from '@payloadcms/db-sqlite';

import { DbAdapterProvider } from '@thebigrick/catalyst-payloadcms/types';

const getSqlite: DbAdapterProvider = () => {
  if (!process.env.SQLITE_URL) {
    throw new Error('SQLITE_URL environment variable is required');
  }

  if (!process.env.SQLITE_AUTH_TOKEN) {
    throw new Error('SQLITE_AUTH_TOKEN environment variable is required');
  }

  return sqliteAdapter({
    client: {
      url: process.env.SQLITE_URL,
      authToken: process.env.SQLITE_AUTH_TOKEN,
    },
  });
};

export default getSqlite;
