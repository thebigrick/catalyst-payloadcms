'use server';

import { getSessionCustomerAccessToken } from '@bigcommerce/catalyst-core/auth';
import { client } from '@bigcommerce/catalyst-core/client';
import { revalidate } from '@bigcommerce/catalyst-core/client/revalidate-target';
import { ProductCardCarousel } from '@bigcommerce/catalyst-core/components/product-card-carousel';
import React, { cache } from 'react';

import Box from '@thebigrick/catalyst-payloadcms/components/box';
import { ProductsCarouselBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import ProductsQuery from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/products-query';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface Props extends BlockComponentProps {
  block: ProductsCarouselBlock;
}

interface Product {
  entityId: number;
}

/**
 * Fetches a list of products by their entity IDs
 * @param {number[]} entityIds
 */
const getProductsList = cache(async (entityIds: number[]) => {
  const customerAccessToken = await getSessionCustomerAccessToken();

  const response = await client.fetch({
    document: ProductsQuery,
    variables: {
      entityIds,
    },
    customerAccessToken,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  // Should fix this
  // eslint-disable-next-line
  const products = (response.data as any).site.products.edges.map((edge: any) => edge.node) as Product[];

  return products.sort((a, b) => entityIds.indexOf(a.entityId) - entityIds.indexOf(b.entityId));
});

const ProductsCarousel = async ({ block }: Props) => {
  const { productIds, title } = block;

  const productIdsArray = productIds?.split(/[\s,]+/).map((id) => parseInt(id, 10)) || [];

  if (!productIdsArray.length) {
    return null;
  }

  const products = await getProductsList(productIdsArray);

  return (
    <Box block={block}>
      <ProductCardCarousel products={products} title={title || ''} />
    </Box>
  );
};

export default ProductsCarousel;
