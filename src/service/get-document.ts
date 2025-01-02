import getRestEndpoint from "@thebigrick/catalyst-payloadcms/service/get-rest-endpoint";
import { stringify } from "qs-esm";

const getDocument = async <TDoc = any>(
  collection: string,
  locale: string,
  id: string,
  usePreview = false
): Promise<TDoc | null> => {
  if (!process.env.PAYLOAD_CMS_FRONTEND_TOKEN) {
    throw new Error('Missing PAYLOAD_CMS_FRONTEND_TOKEN environment variable');
  }

  const qs = stringify({
    locale,
    'fallback-locale': 'en',
    draft: usePreview,
  }, { addQueryPrefix: true });

  const response = await fetch(`${getRestEndpoint()}/${collection}/${id}${qs}`, {
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
  return await response.json();
};

export default getDocument;
