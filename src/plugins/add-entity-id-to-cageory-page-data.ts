import { CategoryTreeFragment } from '@bigcommerce/catalyst-core/app/[locale]/(default)/(faceted)/category/[slug]/_components/sub-categories';
import { getCategoryPageData } from '@bigcommerce/catalyst-core/app/[locale]/(default)/(faceted)/category/[slug]/page-data';
import { getSessionCustomerAccessToken } from '@bigcommerce/catalyst-core/auth';
import { client } from '@bigcommerce/catalyst-core/client';
import { graphql, VariablesOf } from '@bigcommerce/catalyst-core/client/graphql';
import { revalidate } from '@bigcommerce/catalyst-core/client/revalidate-target';
import { BreadcrumbsFragment } from '@bigcommerce/catalyst-core/components/breadcrumbs/fragment';
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';
import { cache } from 'react';

const CategoryPageQuery = graphql(
  `
    query CategoryPageQuery($categoryId: Int!) {
      site {
        category(entityId: $categoryId) {
          entityId
          name
          ...BreadcrumbsFragment
          seo {
            pageTitle
            metaDescription
            metaKeywords
          }
        }
        ...CategoryTreeFragment
      }
    }
  `,
  [BreadcrumbsFragment, CategoryTreeFragment],
);

type Variables = VariablesOf<typeof CategoryPageQuery>;

export default valuePlugin<typeof getCategoryPageData>({
  resourceId:
    '@bigcommerce/catalyst-core/app/[locale]/(default)/(faceted)/category/[slug]/page-data:getCategoryPageData',
  name: 'alter-bigcommerce-response',
  wrap: () => {
    return cache(async (variables: Variables) => {
      const customerAccessToken = await getSessionCustomerAccessToken();

      const response = await client.fetch({
        document: CategoryPageQuery,
        variables,
        customerAccessToken,
        fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
      });

      // @ts-expect-error We do not have a type here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data.site;
    });
  },
});
