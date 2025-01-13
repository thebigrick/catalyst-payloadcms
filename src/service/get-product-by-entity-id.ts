import { Product } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchProductByEntityIdQuery from '@thebigrick/catalyst-payloadcms/gql/query/search-product-by-entity-id-query';
import getProductCacheTag from '@thebigrick/catalyst-payloadcms/service/get-product-cache-tag';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

export interface GetProductOptions {
  draft?: boolean;
}

/**
 * Get the ID of a page by its slug
 * @param {number} entityId
 * @param {string} locale
 * @param {GetProductOptions} options
 * @returns {Promise<string>} The ID of the page
 */
const getProductByEntityId = async (
  entityId: number,
  locale: string,
  options: GetProductOptions = {},
): Promise<Product | null> => {
  const res = await payloadClient<GraphQLDocsCollection<Product, 'Products'>>({
    document: SearchProductByEntityIdQuery,
    variables: { entityId: entityId.toString(), locale, draft: !!options.draft },
    fetchOptions: {
      next: {
        tags: ['payloadcms-products', getProductCacheTag(entityId.toString())],
        revalidate: 86400,
      },
    },
  });

  if (!res.Products.docs.length) {
    return null;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (!options.draft && res.Products.docs[0]._status === 'draft') {
    return null;
  }

  return res.Products.docs[0];
};

export default getProductByEntityId;
