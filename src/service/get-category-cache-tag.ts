/**
 * Get the cache tag for a category
 * @param {string} key
 * @return {string}
 */
const getCategoryCacheTag = (key: string): string => {
  return `payloadcms-category:${key}`;
};

export default getCategoryCacheTag;
