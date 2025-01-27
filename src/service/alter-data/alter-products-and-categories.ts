import getCustomDataByEntityIds from '@thebigrick/catalyst-payloadcms/service/alter-data/get-custom-data-by-entity-ids';
import collectCategoryAndProductItems from '@thebigrick/catalyst-payloadcms/service/collect-category-and-product-items';

const alterProductsAndCategories = async <TData extends object = object>(
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

  const { products: productCustomData, categories: categoryCustomData } =
    await getCustomDataByEntityIds(productIds, categoryIds, locale);

  // eslint-disable-next-line no-restricted-syntax
  for (const [entityId, items] of Object.entries(products)) {
    if (productCustomData.hasOwnProperty(entityId)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        const { title, path, metaDescription, metaKeywords } = productCustomData[Number(entityId)];

        if (path) {
          item.path = path;
        }

        if (title) {
          item.name = title;
        }

        if (item.seo) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (title) item.seo.pageTitle = title;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (metaDescription) item.seo.metaDescription = metaDescription;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (metaKeywords) item.seo.metaKeywords = metaKeywords;
        }
      }
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [entityId, items] of Object.entries(categories)) {
    if (categoryCustomData.hasOwnProperty(entityId)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        const { title, path, metaDescription, metaKeywords } = categoryCustomData[Number(entityId)];

        if (path) {
          item.path = path;
        }

        if (title) {
          item.name = title;
        }

        if (item.seo) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (title) item.seo.pageTitle = title;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (metaDescription) item.seo.metaDescription = metaDescription;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (metaKeywords) item.seo.metaKeywords = metaKeywords;
        }
      }
    }
  }

  return data;
};

export default alterProductsAndCategories;
