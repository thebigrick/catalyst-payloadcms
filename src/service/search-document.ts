import getRestEndpoint from "@thebigrick/catalyst-payloadcms/service/get-rest-endpoint";
import { Where } from "payload";
import { stringify } from 'qs-esm';

const searchDocument = async <TDoc = any>(
  collection: string,
  locale: string,
  where?: Where,
): Promise<TDoc | null> => {
  if (!process.env.PAYLOAD_CMS_FRONTEND_TOKEN) {
    throw new Error('Missing PAYLOAD_CMS_FRONTEND_TOKEN environment variable');
  }

  const qs = where ? stringify({ where, locale, 'fallback-locale': 'en' }, { addQueryPrefix: true }) : '';

  const response = await fetch(`${getRestEndpoint()}/${collection}${qs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Payload-CMS-Auth': process.env.PAYLOAD_CMS_FRONTEND_TOKEN,
    },
  });

  if (response.status !== 200) {
    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json: { docs?: TDoc[] } = await response.json();

  if (!json.docs) {
    throw new Error(`No 'docs' found in the GraphQL response payload`);
  }

  if (json.docs.length === 0) {
    return null;
  }

  return json.docs[0];
};

export default searchDocument;
