import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const ProductPathQuery = graphql(`
  query ProductPathQuery($entityId: Int!) {
    site {
      product(entityId: $entityId) {
        path
      }
      categories {
        edges {
          node {
            path
          }
        }
      }
    }
  }
`);

export default ProductPathQuery;
