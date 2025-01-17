'use server';

import { client } from '@bigcommerce/catalyst-core/client';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';
import ProductByEntityId from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/product-by-entity-id';

const getProduct = async (id: number): Promise<ProductData> => {
  const response = await client.fetch({
    document: ProductByEntityId,
    variables: {
      entityId: Number(id),
    },
  });

  // eslint-disable-next-line
  return (response.data as any).site.product;
};

export default getProduct;
