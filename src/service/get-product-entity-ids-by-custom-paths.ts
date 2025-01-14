import { Product } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchProductEntityIdsByCustomPaths from '@thebigrick/catalyst-payloadcms/gql/query/search-product-entity-ids-by-custom-paths';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

export type CustomPathsResponse = Record<string, number>;

/**
 * Get the entity id of a products by its path
 * @param {string} paths
 * @param {string} locale
 * @returns {Promise<string>} The ID of the page
 */
const getProductEntityIdsByCustomPaths = async (
  paths: string[],
  locale: string,
): Promise<CustomPathsResponse> => {
  const res = await payloadClient<GraphQLDocsCollection<Product, 'Products'>>({
    document: SearchProductEntityIdsByCustomPaths,
    variables: { paths, locale },
    fetchOptions: {
      next: {
        tags: ['payloadcms-product-paths'],
        revalidate: 86400,
      },
    },
  });

  if (!res.Products.docs.length) {
    return {};
  }

  return res.Products.docs.reduce<CustomPathsResponse>((acc, product) => {
    if (product.seo?.productPath) {
      const entityId = parseInt(product.entityId, 10);

      if (entityId) {
        acc[product.seo.productPath] = entityId;
      }
    }

    return acc;
  }, {});
};

export default getProductEntityIdsByCustomPaths;
