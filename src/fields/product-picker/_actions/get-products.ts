'use server';

import { client } from '@bigcommerce/catalyst-core/client';
import { cache } from 'react';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';
import AdminProductByEntityId from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/admin-product-by-entity-id';

/**
 * Fetches products by their entity IDs
 * Used for admin product picker
 * @param {number[]} ids
 * @returns {Promise<ProductData[]>}
 */
const getProducts = cache(async (ids: number[]): Promise<ProductData[]> => {
  const response = await client.fetch({
    document: AdminProductByEntityId,
    variables: {
      entityIds: ids,
    },
    fetchOptions: { next: { revalidate: 3600 } },
  });

  // eslint-disable-next-line
  const products = (response.data as any).site.products.edges.map((edge: any) => edge.node) as ProductData[];

  // Sort products by the order of the entity IDs and allow duplicates
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return ids
    .map((id) => products.find((product: ProductData) => product.entityId === id))
    .filter(Boolean) as ProductData[];
});

export default getProducts;
