/**
 * Get the cache tag for a page
 * @param {string} key
 * @return {string}
 */
const getPageCacheTag = (key: string | number): string => {
  return `payloadcms-page:${key}`;
};

export default getPageCacheTag;
