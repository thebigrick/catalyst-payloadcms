import { client } from '@bigcommerce/catalyst-core/client';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';
import { getLocale } from 'next-intl/server';

import addTypenameToQuery from '@thebigrick/catalyst-payloadcms/service/add-typename-to-query';
import transformPaths from '@thebigrick/catalyst-payloadcms/service/paths/transform-paths';

export default valuePlugin<typeof client>({
  resourceId: '@bigcommerce/catalyst-core/client:client',
  name: 'map-paths',
  wrap: (c) => {
    const originalFetch = c.fetch.bind(c);

    c.fetch = async (...config: Parameters<typeof c.fetch>) => {
      // @ts-expect-error We have no types for this
      config[0].document = addTypenameToQuery(config[0].document);

      const res = await originalFetch.call(this, ...config);

      // @ts-expect-error Query is generic
      await transformPaths(res.data, await getLocale());

      return res;
    };

    return c;
  },
});
