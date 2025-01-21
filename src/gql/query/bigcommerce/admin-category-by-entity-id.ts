import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const AdminCategoryByEntityId = graphql(`
  query CategoryByEntityId($entityId: Int!) {
    site {
      category(entityId: $entityId) {
        entityId
        name
        path
      }
    }
  }
`);

export default AdminCategoryByEntityId;
