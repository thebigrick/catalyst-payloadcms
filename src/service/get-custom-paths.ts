import getCategoryEntityIdsByCustomPaths from '@thebigrick/catalyst-payloadcms/service/get-category-entity-ids-by-custom-paths';
import getProductEntityIdsByCustomPaths from '@thebigrick/catalyst-payloadcms/service/get-product-entity-ids-by-custom-paths';

export type CustomPathResponse = Record<string, string>;

/**
 * Map custom paths to their respective entities urls
 * @param {string[]} paths
 * @param {string} locale
 * @returns {Promise<CustomPathResponse>} The custom paths mapped to their respective entity urls
 */
const getCustomPaths = async (paths: string[], locale: string): Promise<CustomPathResponse> => {
  const fromProducts = await getProductEntityIdsByCustomPaths(paths, locale);
  const fromCategories = await getCategoryEntityIdsByCustomPaths(paths, locale);

  const productsUrl = Object.keys(fromProducts).reduce<CustomPathResponse>((acc, path) => {
    acc[path] = `/product/${fromProducts[path]}`;

    return acc;
  }, {});

  const categoriesUrl = Object.keys(fromCategories).reduce<CustomPathResponse>((acc, path) => {
    acc[path] = `/category/${fromCategories[path]}`;

    return acc;
  }, {});

  return {
    ...productsUrl,
    ...categoriesUrl,
  };
};

export default getCustomPaths;
