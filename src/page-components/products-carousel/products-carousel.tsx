'use server';

import { getSessionCustomerAccessToken } from '@bigcommerce/catalyst-core/auth';
import { client } from '@bigcommerce/catalyst-core/client';
import { ResultOf } from '@bigcommerce/catalyst-core/client/graphql';
import { revalidate } from '@bigcommerce/catalyst-core/client/revalidate-target';
import { ProductCardCarousel } from '@bigcommerce/catalyst-core/components/product-card-carousel';
import { ProductCardCarouselFragment } from '@bigcommerce/catalyst-core/components/product-card-carousel/fragment';
import React, { cache } from 'react';

import Box from '@thebigrick/catalyst-payloadcms/components/box';
import { ProductsCarouselBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import ProductsQuery from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/products-query';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface Props extends BlockComponentProps {
  block: ProductsCarouselBlock;
}

type Product = ResultOf<typeof ProductCardCarouselFragment>;

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-return
  return products.sort((a, b) => entityIds.indexOf(a.entityId) - entityIds.indexOf(b.entityId));
});

const ProductsCarousel = async ({ block }: Props) => {
  const { products, title } = block;

  const productIdsArray = products?.map((product) => Number(product.entityId)) || [];

  if (!productIdsArray.length) {
    return null;
  }

  const productItems = await getProductsList(productIdsArray);

  return (
    <Box block={block}>
      <ProductCardCarousel products={productItems} title={title || ''} />
    </Box>
  );
};

export default ProductsCarousel;
