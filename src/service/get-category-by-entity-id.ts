import { Category } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchCategoryByEntityIdQuery from '@thebigrick/catalyst-payloadcms/gql/query/search-category-by-entity-id-query';
import getCategoryCacheTag from '@thebigrick/catalyst-payloadcms/service/get-category-cache-tag';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

export interface GetCategoryOptions {
  draft?: boolean;
}

/**
 * Get the ID of a page by its slug
 * @param {number} entityId
 * @param {string} locale
 * @param {GetCategoryOptions} options
 * @returns {Promise<string>} The ID of the page
 */
const getCategoryByEntityId = async (
  entityId: number,
  locale: string,
  options: GetCategoryOptions = {},
): Promise<Category | null> => {
  const res = await payloadClient<GraphQLDocsCollection<Category, 'Categories'>>({
    document: SearchCategoryByEntityIdQuery,
    variables: { entityId: entityId.toString(), locale, draft: !!options.draft },
    fetchOptions: {
      next: {
        tags: ['payloadcms-products', getCategoryCacheTag(entityId.toString())],
        revalidate: 86400,
      },
    },
  });

  if (!res.Categories.docs.length) {
    return null;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (!options.draft && res.Categories.docs[0]._status === 'draft') {
    return null;
  }

  return res.Categories.docs[0];
};

export default getCategoryByEntityId;
