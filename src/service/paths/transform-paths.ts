import collectCategoryAndProductItems from '@thebigrick/catalyst-payloadcms/service/paths/collect-category-and-product-items';
import getCustomPathsByEntityIds from '@thebigrick/catalyst-payloadcms/service/paths/get-custom-paths-by-entity-ids';

const transformPaths = async <TData extends object = object>(
  data: TData,
  locale: string,
): Promise<TData> => {
  // Do not run in production build, since there is no active endpoint to query
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return data;
  }

  const { products, categories } = await collectCategoryAndProductItems(data);

  const productIds = Object.keys(products);
  const categoryIds = Object.keys(categories);

  if (!productIds.length && !categoryIds.length) {
    return data;
  }

  const { products: productCustomPaths, categories: categoryCustomPaths } =
    await getCustomPathsByEntityIds(productIds, categoryIds, locale);

  // eslint-disable-next-line no-restricted-syntax
  for (const [entityId, items] of Object.entries(products)) {
    if (productCustomPaths.hasOwnProperty(entityId)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        item.path = productCustomPaths[Number(entityId)];
      }
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [entityId, items] of Object.entries(categories)) {
    if (categoryCustomPaths.hasOwnProperty(entityId)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        item.path = categoryCustomPaths[Number(entityId)];
      }
    }
  }

  return data;
};

export default transformPaths;
