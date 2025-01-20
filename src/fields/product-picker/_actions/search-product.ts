'use server';

import { client } from '@bigcommerce/catalyst-core/client';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';
import ProductsSearch from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/products-search';

const searchProducts = async (inputValue: string): Promise<ProductData[]> => {
  const response = await client.fetch({
    document: ProductsSearch,
    variables: {
      term: inputValue,
    },
    fetchOptions: { next: { revalidate: 3600 } },
  });

  // eslint-disable-next-line
  return (response.data as any).site.search.searchProducts.products.edges.map((p: any) => p.node);
};

export default searchProducts;
