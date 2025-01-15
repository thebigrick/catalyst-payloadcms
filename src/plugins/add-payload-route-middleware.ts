import { withRoutes } from '@bigcommerce/catalyst-core/middlewares/with-routes';
import { functionPlugin } from '@thebigrick/catalyst-pluginizr';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import getPageIdBySlug from '@thebigrick/catalyst-payloadcms/service/get-page-id-by-slug';

const getSlugFromPathname = (pathname: string, locale: string) => {
  if (pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`) {
    return '/';
  }

  if (pathname.startsWith(`/${locale}/`)) {
    return pathname.replace(`/${locale}/`, '').replace(/^\//, '');
  }

  return pathname.replace(/\/$/, '').replace(/^\//, '');
};

/**
 * Fetch the page by slug and redirect to the payload page if it exists
 * Otherwise, continue to the next middleware
 */
const applyPayloadRouteMiddleware = functionPlugin<typeof withRoutes>({
  name: 'exclude-payload-from-middleware',
  resourceId: '@bigcommerce/catalyst-core/middlewares/with-routes:withRoutes',
  wrap: (source, ...args) => {
    return async (request: NextRequest, event: NextFetchEvent) => {
      const isPreviewRequest = request.nextUrl.search.includes(
        `_payload_preview=${process.env.PAYLOAD_PREVIEW_SECRET}`,
      );

      const { pathname } = request.nextUrl;
      const locale = request.headers.get('x-bc-locale') ?? '';

      if (!process.env.PAYLOAD_PREVIEW_SECRET) {
        throw new Error('Missing PAYLOAD_PREVIEW_SECRET');
      }

      const slug = getSlugFromPathname(pathname, locale);

      const pageId = await getPageIdBySlug(slug, locale);

      if (pageId) {
        const resourceUrl = new URL(`/${locale}/payload-page/${pageId}`, request.url);

        return NextResponse.rewrite(resourceUrl);
      }

      if (isPreviewRequest) {
        request.headers.set('x-payload-preview', 'true');
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const res = (await source(...args)(request, event)) as NextResponse;

      // In case of a rewrite, we need to add the x-payload-preview header
      if (isPreviewRequest) {
        if (res.headers.has('x-middleware-rewrite')) {
          const headers = new Headers(res.headers);

          headers.set('x-payload-preview', 'true');

          return NextResponse.next({ headers });
        }
      }

      return res;
    };
  },
});

export default applyPayloadRouteMiddleware;
