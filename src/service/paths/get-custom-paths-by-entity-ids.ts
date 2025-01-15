import { Category, Product } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchCustomPathsByEntityIds from '@thebigrick/catalyst-payloadcms/gql/query/search-custom-paths-by-entity-ids';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

export interface CustomPathsResponse {
  categories: Record<number, string>;
  products: Record<number, string>;
}

/**
 * Get the entity id of a categories by its path
 * @param {string[]} productEntityIds
 * @param {string[]} categoryEntityIds
 * @param {string} locale
 * @returns {Promise<string>} The ID of the page
 */
const getCustomPathsByEntityIds = async (
  productEntityIds: string[],
  categoryEntityIds: string[],
  locale: string,
): Promise<CustomPathsResponse> => {
  const res = await payloadClient<
    GraphQLDocsCollection<Category | Product, 'Categories' | 'Products'>
  >({
    document: SearchCustomPathsByEntityIds,
    variables: { productEntityIds, categoryEntityIds, locale },
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

        acc[entityId] = category.seo.categoryPath;
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

        acc[entityId] = product.seo.productPath;
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

export default getCustomPathsByEntityIds;
