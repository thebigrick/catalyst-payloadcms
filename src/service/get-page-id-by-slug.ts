import { Page } from '@thebigrick/catalyst-payloadcms/generated-types';
import SearchPageIdQuery from '@thebigrick/catalyst-payloadcms/gql/query/search-page-id-query';
import getPageCacheTag from '@thebigrick/catalyst-payloadcms/service/get-page-cache-tag';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDocsCollection } from '@thebigrick/catalyst-payloadcms/types';

/**
 * Get the ID of a page by its slug
 * @param {string} slug - The slug of the page
 * @param {string} locale
 * @returns {Promise<string>} The ID of the page
 */
const getPageIdBySlug = async (slug: string, locale: string): Promise<string | null> => {
  const res = await payloadClient<GraphQLDocsCollection<Page, 'Pages'>>({
    document: SearchPageIdQuery,
    variables: { slug, locale },
    fetchOptions: {
      next: {
        tags: ['payloadcms-pages', getPageCacheTag(slug)],
        revalidate: 86400,
      },
    },
  });

  if (!res.Pages.docs.length) {
    return null;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (res.Pages.docs[0]._status !== 'published') {
    return null;
  }

  return res.Pages.docs[0].id;
};

export default getPageIdBySlug;
