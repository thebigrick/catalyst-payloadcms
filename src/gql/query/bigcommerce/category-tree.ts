import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const CategoryFragment = graphql(`
  fragment CategoryFragment on CategoryTreeItem {
    entityId
    name
    path
  }
`);

const CategoryTree = graphql(
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

export default CategoryTree;
