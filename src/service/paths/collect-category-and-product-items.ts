/* eslint-disable @typescript-eslint/no-unsafe-argument */
interface CategoryTreeItem {
  __typename: 'CategoryTreeItem';
  // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ProductItem {
  __typename: 'Product';
  // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AnyNode {
  __typename: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const collectCategoryAndProductItems = async (
  data: CategoryTreeItem | ProductItem | AnyNode | object | undefined,
): Promise<{
  categories: Record<number, CategoryTreeItem[]>;
  products: Record<number, ProductItem[]>;
}> => {
  // Scalar value
  if (!data || typeof data !== 'object') {
    return { categories: {}, products: {} };
  }

  // Iterate over array
  if (Array.isArray(data)) {
    const resultsArray = await Promise.all(
      data.map((item) => collectCategoryAndProductItems(item)),
    );

    return resultsArray.reduce(
      (acc, { categories: cp, products: pp }) => {
        Object.assign(acc.categories, cp);
        Object.assign(acc.products, pp);

        return acc;
      },
      { categories: {}, products: {} },
    );
  }

  const categoryPointers: Record<number, CategoryTreeItem[]> = {};
  const productPointers: Record<number, ProductItem[]> = {};

  if (data.hasOwnProperty('entityId') && data.hasOwnProperty('__typename')) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const node = data as AnyNode;

    if (node.__typename === 'CategoryTreeItem') {
      const entityId = parseInt(node.entityId, 10);

      if (!categoryPointers.hasOwnProperty(entityId)) {
        categoryPointers[entityId] = [];
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      categoryPointers[entityId].push(node as CategoryTreeItem);
    } else if (node.__typename === 'Product') {
      const entityId = parseInt(node.entityId, 10);

      if (!productPointers.hasOwnProperty(entityId)) {
        productPointers[entityId] = [];
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      productPointers[entityId].push(node as ProductItem);
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const value of Object.values(data)) {
    const {
      categories: nestedCategoryPointers,
      products: nestedProductPointers,
      // eslint-disable-next-line no-await-in-loop
    } = await collectCategoryAndProductItems(value);

    Object.assign(categoryPointers, nestedCategoryPointers);
    Object.assign(productPointers, nestedProductPointers);
  }

  return { categories: categoryPointers, products: productPointers };
};

export default collectCategoryAndProductItems;
