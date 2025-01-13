import { Description } from '@bigcommerce/catalyst-core/app/[locale]/(default)/product/[slug]/_components/description';
import { componentPlugin } from '@thebigrick/catalyst-pluginizr';

import ProductDescriptionWrapper from '@thebigrick/catalyst-payloadcms/components/description/product-description-wrapper';

/**
 * Extend the product description component with Payload CMS content.
 */
const addProductDescription = componentPlugin<typeof Description>({
  name: 'add-product-description',
  resourceId:
    '@bigcommerce/catalyst-core/app/[locale]/(default)/product/[slug]/_components/description:Description',

  wrap: ProductDescriptionWrapper,
});

export default addProductDescription;
