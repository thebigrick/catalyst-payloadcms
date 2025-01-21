'use server';

import { client } from '@bigcommerce/catalyst-core/client';

import { CategoryData } from '@thebigrick/catalyst-payloadcms/fields/category-picker/types';
import AdminCategoryTree from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/admin-category-tree';

const flatten = (
  categories: Array<CategoryData & { children?: CategoryData[] }>,
): CategoryData[] => {
  return categories.reduce<CategoryData[]>((acc, category) => {
    acc.push({ entityId: category.entityId, name: category.name, path: category.path });

    if (category.children) {
      return acc.concat(flatten(category.children));
    }

    return acc;
  }, []);
};

const getCategories = async (): Promise<CategoryData[]> => {
  const response = await client.fetch({
    document: AdminCategoryTree,
    fetchOptions: { next: { revalidate: 3600 } },
  });

  // eslint-disable-next-line
  const flatCategories = flatten((response.data as any).site.categoryTree);

  return flatCategories.sort((a, b) => a.name.localeCompare(b.name));
};

export default getCategories;
