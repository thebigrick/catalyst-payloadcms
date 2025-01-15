import { getSessionCustomerAccessToken } from '@bigcommerce/catalyst-core/auth';
import { withRoutes } from '@bigcommerce/catalyst-core/middlewares/with-routes';
import { functionPlugin } from '@thebigrick/catalyst-pluginizr';
import { NextResponse } from 'next/server';

import clearLocaleFromPath from '@thebigrick/catalyst-payloadcms/service/clear-locale-from-path';
import mapCustomPathsToResourcesPath from '@thebigrick/catalyst-payloadcms/service/paths/map-custom-paths-to-resources-path';

const addCustomRoutes = functionPlugin<typeof withRoutes>({
  name: 'add-custom-routes',
  resourceId: '@bigcommerce/catalyst-core/middlewares/with-routes:withRoutes',
  wrap: (source) => {
    return async (request, event) => {
      // @ts-expect-error There is no first argument
      const originalRes = await source()(request, event);

      // Get the redirect URL from original response
      const originalUrl = new URL(originalRes?.headers.get('x-next-url') ?? '', request.url);

      // If the original URL is the same as the next URL, Catalyst was unable to find a route
      if (request.nextUrl.pathname === originalUrl.pathname) {
        const locale = request.headers.get('x-bc-locale') ?? '';
        const pathname = clearLocaleFromPath(request.nextUrl.pathname, locale)
          .replace(/\/$/, '')
          .replace(/^\//, '');

        const res = await mapCustomPathsToResourcesPath([pathname], locale);

        if (res.hasOwnProperty(pathname)) {
          const newUrl = res[pathname];

          const customerAccessToken = await getSessionCustomerAccessToken();
          const postfix =
            !request.nextUrl.search && !customerAccessToken && request.method === 'GET'
              ? '/static'
              : '';

          const url = `/${locale}${newUrl}${postfix}`;

          const rewriteUrl = new URL(url, request.url);

          rewriteUrl.search = request.nextUrl.search;

          return NextResponse.rewrite(rewriteUrl);
        }
      }

      return originalRes;
    };
  },
});

export default addCustomRoutes;
