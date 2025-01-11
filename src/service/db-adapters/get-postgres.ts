import { postgresAdapter } from '@payloadcms/db-postgres';

import { DbAdapterProvider } from '@thebigrick/catalyst-payloadcms/types';

const getMongoDb: DbAdapterProvider = () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is required');
  }

  return postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  });
};

export default getMongoDb;
