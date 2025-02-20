import dbAdapters from '@thebigrick/catalyst-payloadcms/service/db-adapters';

const getDbConnection = () => {
  const dbAdapter = process.env.PAYLOADCMS_DB_ADAPTER || '';

  if (!dbAdapter) {
    throw new Error('PAYLOADCMS_DB_ADAPTER environment variable is required');
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (dbAdapters.hasOwnProperty(dbAdapter) && dbAdapters[dbAdapter]) {
    return dbAdapters[dbAdapter][0]();
  }

  throw new Error(`Unsupported PAYLOADCMS_DB_ADAPTER: ${dbAdapter}`);
};

export default getDbConnection;
