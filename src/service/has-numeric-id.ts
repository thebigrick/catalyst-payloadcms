import dbAdapters from '@thebigrick/catalyst-payloadcms/service/db-adapters';

function hasNumericId(): boolean {
  const dbAdapter = process.env.PAYLOADCMS_DB_ADAPTER || '';

  if (dbAdapters.hasOwnProperty(dbAdapter)) {
    return dbAdapters[dbAdapter][1].hasNumericId;
  }

  return false;
}

export default hasNumericId;
