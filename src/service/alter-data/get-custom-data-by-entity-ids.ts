import { cache } from 'react';

import { Category, Product } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchCustomDataByEntityIds from '@thebigrick/catalyst-payloadcms/gql/query/search-custom-data-by-entity-ids';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

export interface CustomProductData {
  path?: string | null;
  title?: string | null;
  metaKeywords?: string | null;
  metaDescription?: string | null;
}

export interface CustomCategoryData {
  path?: string | null;
  title?: string | null;
  metaKeywords?: string | null;
  metaDescription?: string | null;
}

export interface CustomDataResponse {
  categories: Record<number, CustomProductData>;
  products: Record<number, CustomCategoryData>;
}

/**
 * Get the entity id of a categories by its path
 * @param {string[]} productEntityIds
 * @param {string[]} categoryEntityIds
 * @param {string} locale
 * @returns {Promise<string>} The ID of the page
 */
const getCustomDataByEntityIds = cache(
  async (
    productEntityIds: string[],
    categoryEntityIds: string[],
    locale: string,
  ): Promise<CustomDataResponse> => {
    const res = await payloadClient<
      GraphQLDocsCollection<Category | Product, 'Categories' | 'Products'>
    >({
      document: SearchCustomDataByEntityIds,
      variables: { productEntityIds, categoryEntityIds, locale },
      fetchOptions: {
        next: {
          tags: ['payloadcms-custom-data'],
          revalidate: 86400,
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const categories = (res.Categories.docs as Category[]).reduce<CustomDataResponse['categories']>(
      (acc, category) => {
        if (category.seo) {
          const { path, title, metaKeywords, metaDescription } = category.seo;

          if (path || title || metaKeywords || metaDescription) {
            const entityId = parseInt(category.entityId, 10);

            acc[entityId] = {
              path,
              title,
              metaKeywords,
              metaDescription,
            };
          }
        }

        return acc;
      },
      {},
    );

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const products = (res.Products.docs as Product[]).reduce<CustomDataResponse['products']>(
      (acc, product) => {
        if (product.seo) {
          const { path, title, metaKeywords, metaDescription } = product.seo;

          if (path || title || metaKeywords || metaDescription) {
            const entityId = parseInt(product.entityId, 10);

            acc[entityId] = {
              path,
              title,
              metaKeywords,
              metaDescription,
            };
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
  },
);

export default getCustomDataByEntityIds;
