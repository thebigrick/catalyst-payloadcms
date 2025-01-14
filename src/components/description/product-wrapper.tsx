import Product from '@bigcommerce/catalyst-core/app/[locale]/(default)/product/[slug]/page';
import { PluginComponentWrapper } from '@thebigrick/catalyst-pluginizr';
import React from 'react';

import ChildrenBlocks from '@thebigrick/catalyst-payloadcms/components/children-blocks';
import { RefreshRouteOnSave } from '@thebigrick/catalyst-payloadcms/components/refresh-route-on-save';
import getProductByEntityId from '@thebigrick/catalyst-payloadcms/service/get-product-by-entity-id';
import isPayloadPreview from '@thebigrick/catalyst-payloadcms/service/is-payload-preview';

const ProductWrapper: PluginComponentWrapper<typeof Product> = async ({
  WrappedComponent,
  // @ts-expect-error No need to type this
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const { locale, slug } = props.params;
  const productId = Number(slug);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const payloadProduct = await getProductByEntityId(productId, locale, {
    draft: await isPayloadPreview(),
  });

  return (
    <>
      <RefreshRouteOnSave />
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */}
      {payloadProduct?.heading && <ChildrenBlocks blocks={payloadProduct.heading.blocks} />}
      {/* @ts-expect-error No need to type this */}
      <WrappedComponent {...props} />
    </>
  );
};

export default ProductWrapper;
