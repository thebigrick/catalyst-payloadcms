import { revalidatePath, revalidateTag } from 'next/cache';

import config from '@payload-config';
import { Page } from '@thebigrick/catalyst-payloadcms/generated-types';
import getPageCacheTag from '@thebigrick/catalyst-payloadcms/service/get-page-cache-tag';

/**
 * Invalidate a page in all its locales
 * @param {Page} page
 * @returns {Promise<void>}
 */
const invalidatePage = async (page?: Page): Promise<void> => {
  try {
    if (page?.slug) {
      const payloadConfig = await config;
      const locales = payloadConfig.localization ? payloadConfig.localization.localeCodes : ['en'];
      const defaultPath = page.slug.startsWith('/') ? page.slug : `/${page.slug}`;

      revalidatePath(defaultPath);
      revalidatePath(`${defaultPath}/`);
      revalidateTag(getPageCacheTag(page.slug));

      // eslint-disable-next-line no-restricted-syntax
      for (const locale of locales) {
        const pagePath = `/${locale}${defaultPath}`;

        revalidatePath(pagePath);
        revalidatePath(`${pagePath}/`);
      }
    }

    if (page?.id) {
      revalidateTag(getPageCacheTag(page.id));
    }
  } catch (error) {
    console.error('Error invalidating page', error);
  }
};

export default invalidatePage;
