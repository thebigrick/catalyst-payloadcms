'use server';

import { client } from '@bigcommerce/catalyst-core/client';

import { CategoryData } from '@thebigrick/catalyst-payloadcms/fields/category-picker/types';
import CategoryByEntityId from '@thebigrick/catalyst-payloadcms/gql/query/bigcommerce/category-by-entity-id';

const getCategory = async (id: number): Promise<CategoryData> => {
  const response = await client.fetch({
    document: CategoryByEntityId,
    variables: {
      entityId: Number(id),
    },
    fetchOptions: { next: { revalidate: 3600 } },
  });

  // eslint-disable-next-line
  return (response.data as any).site.category;
};

export default getCategory;
