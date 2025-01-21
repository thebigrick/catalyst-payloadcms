'use server';

import { client } from '@bigcommerce/catalyst-core/client';
import { cache } from 'react';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';
import AdminProductsSearch from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/admin-products-search';

const searchProducts = cache(async (inputValue: string): Promise<ProductData[]> => {
  const response = await client.fetch({
    document: AdminProductsSearch,
    variables: {
      term: inputValue,
    },
    fetchOptions: { next: { revalidate: 3600 } },
  });

  // eslint-disable-next-line
  return (response.data as any).site.search.searchProducts.products.edges.map((p: any) => p.node);
});

export default searchProducts;
