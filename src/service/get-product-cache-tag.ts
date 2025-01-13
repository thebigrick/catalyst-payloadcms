/**
 * Get the cache tag for a product
 * @param {string} key
 * @return {string}
 */
const getProductCacheTag = (key: string): string => {
  return `payloadcms-product:${key}`;
};

export default getProductCacheTag;
