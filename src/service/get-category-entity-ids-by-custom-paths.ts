import { Category } from '@thebigrick/catalyst-payloadcms/generated-types';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';
import SearchCategoryEntityIdsByCustomPaths
  from "@thebigrick/catalyst-payloadcms/gql/query/search-category-entity-ids-by-custom-paths";

export type CustomPathsResponse = Record<string, number>;

/**
 * Get the entity id of a categories by its path
 * @param {string} paths
 * @param {string} locale
 * @returns {Promise<string>} The ID of the page
 */
const getCategoryEntityIdsByCustomPaths = async (
  paths: string[],
  locale: string,
): Promise<CustomPathsResponse> => {
  const res = await payloadClient<GraphQLDocsCollection<Category, 'Categories'>>({
    document: SearchCategoryEntityIdsByCustomPaths,
    variables: { paths, locale },
    fetchOptions: {
      next: {
        tags: ['payloadcms-category-paths'],
        revalidate: 86400,
      },
    },
  });

  if (!res.Categories.docs.length) {
    return {};
  }

  return res.Categories.docs.reduce<CustomPathsResponse>((acc, category) => {
    if (category.seo?.categoryPath) {
      const entityId = parseInt(category.entityId, 10);

      if (entityId) {
        acc[category.seo.categoryPath] = entityId;
      }
    }

    return acc;
  }, {});
};

export default getCategoryEntityIdsByCustomPaths;
