import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const CategoryByEntityId = graphql(`
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

export default CategoryByEntityId;
