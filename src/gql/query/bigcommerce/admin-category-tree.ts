import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const CategoryFragment = graphql(`
  fragment CategoryFragment on CategoryTreeItem {
    entityId
    name
    path
  }
`);

const AdminCategoryTree = graphql(
  `
    query CategoryTree {
      site {
        categoryTree {
          ...CategoryFragment
          children {
            ...CategoryFragment
            children {
              ...CategoryFragment
            }
          }
        }
      }
    }
  `,
  [CategoryFragment],
);

export default AdminCategoryTree;
