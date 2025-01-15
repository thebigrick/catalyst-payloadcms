import { revalidatePath, revalidateTag } from 'next/cache';

import config from '@payload-config';
import { Category } from '@thebigrick/catalyst-payloadcms/generated-types';
import getBigcommerceCategoryPath from '@thebigrick/catalyst-payloadcms/service/get-bigcommerce-category-path';
import getProductCacheTag from '@thebigrick/catalyst-payloadcms/service/get-product-cache-tag';

/**
 * Invalidate a page in all its locales
 * @param {Product} category
 * @returns {Promise<void>}
 */
const invalidateCategory = async (category: Category): Promise<void> => {
  try {
    if (category.entityId) {
      const payloadConfig = await config;
      const locales = payloadConfig.localization ? payloadConfig.localization.localeCodes : ['en'];
      const categoryPath = await getBigcommerceCategoryPath(parseInt(category.entityId, 10));

      if (!categoryPath) {
        return;
      }

      const baseCategoryPath = categoryPath.replace(/^\//, '').replace(/\/$/, '');

      revalidatePath(`/${baseCategoryPath}`);
      revalidatePath(`/${baseCategoryPath}/`);

      // eslint-disable-next-line no-restricted-syntax
      for (const locale of locales) {
        revalidatePath(`/${locale}/${categoryPath}`);
        revalidatePath(`/${locale}/${categoryPath}/`);
      }
    }

    if (category.entityId) {
      revalidateTag(getProductCacheTag(category.entityId));
    }
  } catch (error) {
    console.error('Error invalidating page', error);
  }
};

export default invalidateCategory;
