import Category from '@bigcommerce/catalyst-core/app/[locale]/(default)/(faceted)/category/[slug]/page';
import { componentPlugin } from '@thebigrick/catalyst-pluginizr';

import CategoryWrapper from '@thebigrick/catalyst-payloadcms/components/description/category-wrapper';

/**
 * Extend the product description component with Payload CMS content.
 */
const addCategoryRegions = componentPlugin<typeof Category>({
  name: 'add-category-regions',
  resourceId: '@bigcommerce/catalyst-core/app/[locale]/(default)/(faceted)/category/[slug]/page',

  wrap: CategoryWrapper,
});

export default addCategoryRegions;
