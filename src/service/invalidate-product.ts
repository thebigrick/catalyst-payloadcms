import { revalidatePath, revalidateTag } from 'next/cache';

import config from '@payload-config';
import { Product } from '@thebigrick/catalyst-payloadcms/generated-types';
import getBigcommerceProductPath from '@thebigrick/catalyst-payloadcms/service/get-bigcommerce-product-path';
import getProductCacheTag from '@thebigrick/catalyst-payloadcms/service/get-product-cache-tag';

/**
 * Invalidate a page in all its locales
 * @param {Product} product
 * @returns {Promise<void>}
 */
const invalidateProduct = async (product: Product): Promise<void> => {
  try {
    if (product.entityId) {
      const payloadConfig = await config;
      const locales = payloadConfig.localization ? payloadConfig.localization.localeCodes : ['en'];
      const productPath = await getBigcommerceProductPath(parseInt(product.entityId, 10));

      if (!productPath) {
        return;
      }

      const baseProductPath = productPath.replace(/^\//, '').replace(/\/$/, '');

      revalidatePath(`/${baseProductPath}`);
      revalidatePath(`/${baseProductPath}/`);

      // eslint-disable-next-line no-restricted-syntax
      for (const locale of locales) {
        revalidatePath(`/${locale}/${productPath}`);
        revalidatePath(`/${locale}/${productPath}/`);
      }
    }

    if (product.entityId) {
      revalidateTag(getProductCacheTag(product.entityId));
    }
  } catch (error) {
    console.error('Error invalidating page', error);
  }
};

export default invalidateProduct;
