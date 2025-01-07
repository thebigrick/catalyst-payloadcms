import { Page } from '@thebigrick/catalyst-payloadcms/generated-types';
import GetPageByIdQuery from '@thebigrick/catalyst-payloadcms/gql/query/get-page-by-id-query';
import payloadClient from '@thebigrick/catalyst-payloadcms/service/payload-client';
import { GraphQLDoc } from '@thebigrick/catalyst-payloadcms/types';

export interface GetPageOptions {
  draft?: boolean;
}

/**
 * Get the ID of a page by its slug
 * @param {string} id
 * @param {string} locale
 * @param {GetPageOptions} options
 * @returns {Promise<string>} The ID of the page
 */
const getPageById = async (
  id: string,
  locale: string,
  options: GetPageOptions = {},
): Promise<Page> => {
  const res = await payloadClient<GraphQLDoc<Page, 'Page'>>({
    document: GetPageByIdQuery,
    variables: { id, locale, draft: !!options.draft },
  });

  return res.Page;
};

export default getPageById;
