/**
 * Get the cache tag for a page
 * @param {string} slug
 * @return {string}
 */
const getPageCacheTag = (slug: string): string => {
  return `payloadcms-page:${slug}`;
};

export default getPageCacheTag;
