import { graphql } from '@bigcommerce/catalyst-core/client/graphql';
import { ProductCardCarouselFragment } from '@bigcommerce/catalyst-core/components/product-card-carousel/fragment';

const ProductsQuery = graphql(
  `
    query ProductsQuery($entityIds: [Int!]) {
      site {
        products(entityIds: $entityIds) {
          edges {
            node {
              ...ProductCardCarouselFragment
            }
          }
        }
      }
    }
  `,
  [ProductCardCarouselFragment],
);

export default ProductsQuery;
