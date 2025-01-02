import {functionPlugin} from '@thebigrick/catalyst-pluginizr';
import {NextFetchEvent, NextRequest, NextResponse} from 'next/server';
import {withRoutes} from "@bigcommerce/catalyst-core/middlewares/with-routes";
import searchDocument from "@thebigrick/catalyst-payloadcms/service/search-document";
import {Page} from "@thebigrick/catalyst-payloadcms/generated-types";

const applyPayloadRouteMiddleware = functionPlugin<typeof withRoutes>({
  name: 'exclude-payload-from-middleware',
  resourceId: '@bigcommerce/catalyst-core/middlewares/with-routes:withRoutes',

  wrap: (source, ...args) => {
    return async (request: NextRequest, event: NextFetchEvent) => {
      const { pathname } = request.nextUrl;
      const locale = request.headers.get('x-bc-locale') ?? '';

      const pathNameWithoutLocale =
          pathname.startsWith(`/${locale}/`) ? pathname.replace(`/${locale}/`, '/') : pathname;

      const page = await searchDocument<Page>('page', locale, { slug: { equals: pathNameWithoutLocale } });
      if (page?.id) {
        const resourceUrl = new URL(`/${locale}/payload-page/${page?.id}`, request.url);
        return NextResponse.rewrite(resourceUrl);
      }

      return source(...args)(request, event);
    };
  },
});

export default applyPayloadRouteMiddleware;
