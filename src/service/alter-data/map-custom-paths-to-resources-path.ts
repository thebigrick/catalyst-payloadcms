import getEntityIdsByCustomPaths from '@thebigrick/catalyst-payloadcms/service/alter-data/get-entity-ids-by-custom-paths';

export type CustomPathResponse = Record<string, string>;

/**
 * Map custom alter-data to their respective entities urls
 * @param {string[]} paths
 * @param {string} locale
 * @returns {Promise<CustomPathResponse>} The custom alter-data mapped to their respective entity urls
 */
const mapCustomPathsToResourcesPath = async (
  paths: string[],
  locale: string,
): Promise<CustomPathResponse> => {
  const { categories, products, pages } = await getEntityIdsByCustomPaths(paths, locale);

  const productsUrl = Object.keys(products).reduce<CustomPathResponse>((acc, path) => {
    acc[path] = `/product/${products[path]}`;

    return acc;
  }, {});

  const categoriesUrl = Object.keys(categories).reduce<CustomPathResponse>((acc, path) => {
    acc[path] = `/category/${categories[path]}`;

    return acc;
  }, {});

  const pagesUrl = Object.keys(pages).reduce<CustomPathResponse>((acc, path) => {
    acc[path] = `/payload-page/${pages[path]}`;

    return acc;
  }, {});

  return {
    ...productsUrl,
    ...categoriesUrl,
    ...pagesUrl,
  };
};

export default mapCustomPathsToResourcesPath;
