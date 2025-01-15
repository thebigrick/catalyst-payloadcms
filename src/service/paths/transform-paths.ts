import collectCategoryAndProductItems from '@thebigrick/catalyst-payloadcms/service/paths/collect-category-and-product-items';
import getCustomPathsByEntityIds from '@thebigrick/catalyst-payloadcms/service/paths/get-custom-paths-by-entity-ids';

const transformPaths = async <TData extends object = object>(
  data: TData,
  locale: string,
): Promise<TData> => {
  const { products, categories } = await collectCategoryAndProductItems(data);

  const productIds = Object.keys(products);
  const categoryIds = Object.keys(categories);

  const { products: productCustomPaths, categories: categoryCustomPaths } =
    await getCustomPathsByEntityIds(productIds, categoryIds, locale);

  // eslint-disable-next-line no-restricted-syntax
  for (const [entityId, items] of Object.entries(products)) {
    if (productCustomPaths.hasOwnProperty(entityId)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        item.path = productCustomPaths[entityId];
      }
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [entityId, items] of Object.entries(categories)) {
    if (categoryCustomPaths.hasOwnProperty(entityId)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        item.path = categoryCustomPaths[entityId];
      }
    }
  }

  return data;
};

export default transformPaths;
