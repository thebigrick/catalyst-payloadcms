import Product from '@bigcommerce/catalyst-core/app/[locale]/(default)/product/[slug]/page';
import { componentPlugin } from '@thebigrick/catalyst-pluginizr';

import ProductWrapper from '@thebigrick/catalyst-payloadcms/components/description/product-wrapper';

/**
 * Extend the product description component with Payload CMS content.
 */
const addProductRegions = componentPlugin<typeof Product>({
  name: 'add-product-regions',
  resourceId: '@bigcommerce/catalyst-core/app/[locale]/(default)/product/[slug]/page',

  wrap: ProductWrapper,
});

export default addProductRegions;
