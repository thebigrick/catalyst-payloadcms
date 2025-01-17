import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const ProductByEntityId = graphql(`
  query ProductByEntityId($entityId: Int!) {
    site {
      product(entityId: $entityId) {
        entityId
        name
        sku
        defaultImage {
          url(width: 40, height: 40)
        }
      }
    }
  }
`);

export default ProductByEntityId;
