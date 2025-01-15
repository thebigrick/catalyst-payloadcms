import Category from '@bigcommerce/catalyst-core/app/[locale]/(default)/(faceted)/category/[slug]/page';
import { PluginComponentWrapper } from '@thebigrick/catalyst-pluginizr';
import React from 'react';

import ChildrenBlocks from '@thebigrick/catalyst-payloadcms/components/children-blocks';
import { RefreshRouteOnSave } from '@thebigrick/catalyst-payloadcms/components/refresh-route-on-save';
import getCategoryByEntityId from '@thebigrick/catalyst-payloadcms/service/get-category-by-entity-id';
import isPayloadPreview from '@thebigrick/catalyst-payloadcms/service/is-payload-preview';

const CategoryWrapper: PluginComponentWrapper<typeof Category> = async ({
  WrappedComponent,
  // @ts-expect-error No need to type this
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const { locale, slug } = await props.params;
  const categoryId = Number(slug);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const payloadCategory = await getCategoryByEntityId(categoryId, locale, {
    draft: await isPayloadPreview(),
  });

  return (
    <>
      <RefreshRouteOnSave />
      {payloadCategory?.heading && <ChildrenBlocks blocks={payloadCategory.heading.blocks} />}
      {/* @ts-expect-error No need to type this */}
      <WrappedComponent {...props} />
    </>
  );
};

export default CategoryWrapper;
