/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call */
import { client } from '@bigcommerce/catalyst-core/client';

import ProductPathQuery from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/product-path-query';

const getBigcommerceProductPaths = async (entityId: number): Promise<string[]> => {
  const response = await client.fetch({
    document: ProductPathQuery,
    variables: {
      entityId,
    },
    fetchOptions: { cache: 'no-store' },
  });

  // eslint-disable-next-line
  const data = (response.data as any).site;

  const paths: string[] = [];

  if (data.product?.path) {
    paths.push(data.product.path);
  }

  if (data.product?.categories?.edges) {
    // eslint-disable-next-line
    data.product?.categories.edges.forEach((category: any) => {
      if (category.node.path) {
        paths.push(category.node.path);
      }
    });
  }

  return paths;
};

export default getBigcommerceProductPaths;
