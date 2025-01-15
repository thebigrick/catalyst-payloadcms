import { client } from '@bigcommerce/catalyst-core/client';

import CategoryPathQuery from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/category-path-query';

const getBigcommerceCategoryPath = async (entityId: number): Promise<string> => {
  const response = await client.fetch({
    document: CategoryPathQuery,
    variables: {
      entityId,
    },
    fetchOptions: { cache: 'no-store' },
  });

  // Should fix this
  // eslint-disable-next-line
  return (response.data as any).site.category?.path || '';
};

export default getBigcommerceCategoryPath;
