import { revalidatePath, revalidateTag } from 'next/cache';

import config from '@payload-config';
import getPageCacheTag from '@thebigrick/catalyst-payloadcms/service/get-page-cache-tag';

/**
 * Invalidate a page in all its locales
 * @param {string} slug
 * @returns {Promise<void>}
 */
const invalidatePage = async (slug: string): Promise<void> => {
  if (!slug) {
    return;
  }

  const payloadConfig = await config;

  const locales = payloadConfig.localization ? payloadConfig.localization.localeCodes : ['en'];
  const defaultPath = slug.startsWith('/') ? slug : `/${slug}`;

  revalidatePath(defaultPath);
  revalidatePath(`${defaultPath}/`);
  revalidateTag(getPageCacheTag(slug));

  // eslint-disable-next-line no-restricted-syntax
  for (const locale of locales) {
    const pagePath = `/${locale}${defaultPath}`;

    revalidatePath(pagePath);
    revalidatePath(`${pagePath}/`);
  }
};

export default invalidatePage;
