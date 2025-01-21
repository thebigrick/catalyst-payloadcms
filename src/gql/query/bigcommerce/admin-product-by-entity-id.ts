import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const AdminProductByEntityId = graphql(`
  query AdminProductByEntityIds($entityIds: [Int!]) {
    site {
      products(entityIds: $entityIds) {
        edges {
          node {
            entityId
            name
            sku
            defaultImage {
              url(width: 40, height: 40)
            }
          }
        }
      }
    }
  }
`);

export default AdminProductByEntityId;
