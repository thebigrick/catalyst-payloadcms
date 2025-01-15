import dbAdapters from '@thebigrick/catalyst-payloadcms/service/db-adapters';

function hasNumericId(): boolean {
  const dbAdapter = process.env.PAYLOADCMS_DB_ADAPTER || '';

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (dbAdapters[dbAdapter]) {
    return dbAdapters[dbAdapter][1].hasNumericId;
  }

  return false;
}

export default hasNumericId;
