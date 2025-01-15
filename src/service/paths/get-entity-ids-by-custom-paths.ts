import { Category, Product } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchEntityIdsByCustomPaths from '@thebigrick/catalyst-payloadcms/gql/query/search-entity-ids-by-custom-paths';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

export interface CustomPathsResponse {
  categories: Record<string, number>;
  products: Record<string, number>;
}

/**
 * Get the entity id of a categories by its path
 * @param {string} paths
 * @param {string} locale
 * @returns {Promise<string>} The ID of the page
 */
const getEntityIdsByCustomPaths = async (
  paths: string[],
  locale: string,
): Promise<CustomPathsResponse> => {
  const res = await payloadClient<
    GraphQLDocsCollection<Category | Product, 'Categories' | 'Products'>
  >({
    document: SearchEntityIdsByCustomPaths,
    variables: { paths, locale },
    fetchOptions: {
      next: {
        tags: ['payloadcms-paths'],
        revalidate: 86400,
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const categories = (res.Categories.docs as Category[]).reduce<CustomPathsResponse['categories']>(
    (acc, category) => {
      if (category.seo?.categoryPath) {
        const entityId = parseInt(category.entityId, 10);

        if (entityId) {
          acc[category.seo.categoryPath] = entityId;
        }
      }

      return acc;
    },
    {},
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const products = (res.Products.docs as Product[]).reduce<CustomPathsResponse['products']>(
    (acc, product) => {
      if (product.seo?.productPath) {
        const entityId = parseInt(product.entityId, 10);

        if (entityId) {
          acc[product.seo.productPath] = entityId;
        }
      }

      return acc;
    },
    {},
  );

  return {
    categories,
    products,
  };
};

export default getEntityIdsByCustomPaths;
