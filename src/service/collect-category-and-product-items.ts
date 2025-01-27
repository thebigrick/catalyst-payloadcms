/* eslint-disable @typescript-eslint/no-unsafe-argument */
interface CategoryTreeItem {
  __typename: 'CategoryTreeItem' | 'Category';
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
        for (const [key, value] of Object.entries(cp)) {
          if (!acc.categories[key]) acc.categories[key] = [];
          acc.categories[key].push(...value);
        }

        for (const [key, value] of Object.entries(pp)) {
          if (!acc.products[key]) acc.products[key] = [];
          acc.products[key].push(...value);
        }

        return acc;
      },
      { categories: {}, products: {} },
    );
  }

  const categoryPointers: Record<number, CategoryTreeItem[]> = {};
  const productPointers: Record<number, ProductItem[]> = {};

  if (data.hasOwnProperty('entityId') && data.hasOwnProperty('__typename')) {
    const node = data as AnyNode;

    if (node.__typename === 'CategoryTreeItem' || node.__typename === 'Category') {
      const entityId = parseInt(node.entityId, 10);

      if (!categoryPointers[entityId]) {
        categoryPointers[entityId] = [];
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      categoryPointers[entityId].push(node as CategoryTreeItem);
    } else if (node.__typename === 'Product') {
      const entityId = parseInt(node.entityId, 10);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!productPointers[entityId]) {
        productPointers[entityId] = [];
      }

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      productPointers[entityId].push(node as ProductItem);
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const value of Object.values(data)) {
    const { categories: nestedCategoryPointers, products: nestedProductPointers } =
      // eslint-disable-next-line no-await-in-loop
      await collectCategoryAndProductItems(value);

    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(nestedCategoryPointers)) {
      if (!categoryPointers[k]) categoryPointers[k] = [];
      categoryPointers[k].push(...v);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(nestedProductPointers)) {
      if (!productPointers[k]) productPointers[k] = [];
      productPointers[k].push(...v);
    }
  }

  return { categories: categoryPointers, products: productPointers };
};

export default collectCategoryAndProductItems;
