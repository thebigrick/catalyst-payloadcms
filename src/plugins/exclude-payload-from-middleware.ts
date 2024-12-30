import { middleware } from '@bigcommerce/catalyst-core/middleware';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const plugin = valuePlugin<typeof middleware>({
  name: 'exclude-payload-from-middleware',
  resourceId: '@bigcommerce/catalyst-core/middleware:middleware',

  wrap: (source) => {
    return (request: NextRequest, event: NextFetchEvent) => {
      if (request.nextUrl.pathname.startsWith('/payload/')) {
        return NextResponse.next();
      }

      return source(request, event);
    };
  },
});

export default plugin;
