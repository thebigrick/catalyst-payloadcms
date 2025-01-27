import { Category, Page, Product } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchEntityIdsByCustomPaths from '@thebigrick/catalyst-payloadcms/gql/query/search-entity-ids-by-custom-paths';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

export interface CustomPathsResponse {
  categories: Record<string, number>;
  products: Record<string, number>;
  pages: Record<string, string>;
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
    GraphQLDocsCollection<Category | Product | Page, 'Categories' | 'Products' | 'Pages'>
  >({
    document: SearchEntityIdsByCustomPaths,
    variables: { paths, locale },
    fetchOptions: {
      next: {
        tags: ['payloadcms-alter-data'],
        revalidate: 86400,
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const categories = (res.Categories.docs as Category[]).reduce<CustomPathsResponse['categories']>(
    (acc, category) => {
      if (category.seo?.path) {
        const entityId = parseInt(category.entityId, 10);

        if (entityId) {
          acc[category.seo.path] = entityId;
        }
      }

      return acc;
    },
    {},
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const products = (res.Products.docs as Product[]).reduce<CustomPathsResponse['products']>(
    (acc, product) => {
      if (product.seo?.path) {
        const entityId = parseInt(product.entityId, 10);

        if (entityId) {
          acc[product.seo.path] = entityId;
        }
      }

      return acc;
    },
    {},
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const pages = (res.Pages.docs as Page[]).reduce<CustomPathsResponse['pages']>((acc, page) => {
    if (page.slug) {
      const entityId = page.id;

      if (entityId) {
        acc[page.slug] = entityId;
      }
    }

    return acc;
  }, {});

  return {
    categories,
    products,
    pages,
  };
};

export default getEntityIdsByCustomPaths;
