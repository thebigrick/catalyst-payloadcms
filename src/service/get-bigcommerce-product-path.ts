import { client } from '@bigcommerce/catalyst-core/client';

import ProductPathQuery from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/product-path-query';

const getBigcommerceProductPath = async (entityId: number): Promise<string> => {
  const response = await client.fetch({
    document: ProductPathQuery,
    variables: {
      entityId,
    },
    fetchOptions: { cache: 'no-store' },
  });

  // Should fix this
  // eslint-disable-next-line
  return (response.data as any).site.product?.path || '';
};

export default getBigcommerceProductPath;
