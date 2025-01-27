import { getSessionCustomerAccessToken } from '@bigcommerce/catalyst-core/auth';
import { withRoutes } from '@bigcommerce/catalyst-core/middlewares/with-routes';
import { functionPlugin } from '@thebigrick/catalyst-pluginizr';
import { NextResponse } from 'next/server';

import mapCustomPathsToResourcesPath from '@thebigrick/catalyst-payloadcms/service/alter-data/map-custom-paths-to-resources-path';
import clearLocaleFromPath from '@thebigrick/catalyst-payloadcms/service/clear-locale-from-path';

const addCustomRoutes = functionPlugin<typeof withRoutes>({
  name: 'add-custom-routes',
  resourceId: '@bigcommerce/catalyst-core/middlewares/with-routes:withRoutes',
  wrap: (source, ...args) => {
    return async (request, event) => {
      if (
        request.nextUrl.search.includes('_payload_preview') &&
        !process.env.PAYLOAD_PREVIEW_SECRET
      ) {
        throw new Error('Missing PAYLOAD_PREVIEW_SECRET');
      }

      const isPreviewRequest = request.nextUrl.search.includes(
        `_payload_preview=${process.env.PAYLOAD_PREVIEW_SECRET}`,
      );

      if (isPreviewRequest) {
        request.headers.set('x-payload-preview', 'true');
      }

      const locale = request.headers.get('x-bc-locale') ?? '';
      const pathname =
        clearLocaleFromPath(request.nextUrl.pathname, locale)
          .replace(/\/$/, '')
          .replace(/^\//, '') || '/';

      const res = await mapCustomPathsToResourcesPath([pathname], locale);

      if (res.hasOwnProperty(pathname)) {
        const newUrl = res[pathname];

        const customerAccessToken = await getSessionCustomerAccessToken();
        const postfix =
          !request.nextUrl.search &&
          !customerAccessToken &&
          request.method === 'GET' &&
          !newUrl.startsWith('/payload-page/')
            ? '/static'
            : '';

        const url = `/${locale}${newUrl}${postfix}`;

        const rewriteUrl = new URL(url, request.url);

        rewriteUrl.search = request.nextUrl.search;

        return NextResponse.rewrite(rewriteUrl);
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const originalRes = (await source(...args)(request, event)) as NextResponse;

      // In case of a rewrite, we need to add the x-payload-preview header
      if (isPreviewRequest) {
        if (originalRes.headers.has('x-middleware-rewrite')) {
          const headers = new Headers(originalRes.headers);

          headers.set('x-payload-preview', 'true');

          return NextResponse.next({ headers });
        }
      }

      return originalRes;
    };
  },
});

export default addCustomRoutes;
