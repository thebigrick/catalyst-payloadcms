import { Description } from '@bigcommerce/catalyst-core/app/[locale]/(default)/product/[slug]/_components/description';
import { PluginComponentWrapper } from '@thebigrick/catalyst-pluginizr';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import ChildrenBlocks from '@thebigrick/catalyst-payloadcms/components/children-blocks';
import { RefreshRouteOnSave } from '@thebigrick/catalyst-payloadcms/components/refresh-route-on-save';
import getProductByEntityId from '@thebigrick/catalyst-payloadcms/service/get-product-by-entity-id';
import isPayloadPreview from '@thebigrick/catalyst-payloadcms/service/is-payload-preview';

const ProductDescriptionWrapper: PluginComponentWrapper<typeof Description> = async ({
  WrappedComponent,
  product,
}) => {
  const t = await getTranslations('Product.Description');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
  const entityId = parseInt(product.entityId, 10);
  const locale = await getLocale();
  const payloadProduct = await getProductByEntityId(entityId, locale, {
    draft: await isPayloadPreview(),
  });

  if (!payloadProduct?.description) {
    return (
      <>
        <RefreshRouteOnSave />
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <WrappedComponent product={product} />
      </>
    );
  }

  return payloadProduct.description.hideOriginalDescription ? (
    <>
      <h2 className="mb-4 text-xl font-bold md:text-2xl">{t('heading')}</h2>
      <RefreshRouteOnSave />
      <ChildrenBlocks blocks={payloadProduct.description.blocks} />
    </>
  ) : (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <WrappedComponent product={product} />
      <RefreshRouteOnSave />
      <ChildrenBlocks blocks={payloadProduct.description.blocks} />
    </>
  );
};

export default ProductDescriptionWrapper;
