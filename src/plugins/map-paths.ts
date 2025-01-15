import { client } from '@bigcommerce/catalyst-core/client';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';
import { headers } from 'next/headers';
import { getLocale as getServerLocale } from 'next-intl/server';

import addTypenameToQuery from '@thebigrick/catalyst-payloadcms/service/add-typename-to-query';
import transformPaths from '@thebigrick/catalyst-payloadcms/service/paths/transform-paths';

const getLocale = async () => {
  try {
    return await getServerLocale();
  } catch {
    /**
     * Next-intl `getLocale` only works on the server, and when middleware has run.
     *
     * Instances when `getLocale` will not work:
     * - Requests in middlewares
     * - Requests in `generateStaticParams`
     * - Request in api routes
     * - Requests in static sites without `setRequestLocale`
     */
  }
};

const hasLocale = async (): Promise<boolean> => {
  const headersList = await headers();

  return headersList.has('x-bc-locale');
};

export default valuePlugin<typeof client>({
  resourceId: '@bigcommerce/catalyst-core/client:client',
  name: 'map-paths',
  wrap: (c) => {
    const originalFetch = c.fetch.bind(c);

    c.fetch = async (...config: Parameters<typeof c.fetch>) => {
      // @ts-expect-error We have no types for this
      config[0].document = addTypenameToQuery(config[0].document);

      const res = await originalFetch.call(this, ...config);

      try {
        if (await hasLocale()) {
          // @ts-expect-error Too generic
          await transformPaths(res.data, await getLocale());
        }
      } catch {
        /* This may not work at build time */
      }

      return res;
    };

    return c;
  },
});
