import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';

import { DbAdapterProvider } from '@thebigrick/catalyst-payloadcms/types';

const getVercelPostgres: DbAdapterProvider = () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is required');
  }

  return vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  });
};

export default getVercelPostgres;
