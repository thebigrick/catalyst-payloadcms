import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const CategoryPathQuery = graphql(`
  query CategoryPathQuery($entityId: Int!) {
    site {
      category(entityId: $entityId) {
        path
      }
    }
  }
`);

export default CategoryPathQuery;
