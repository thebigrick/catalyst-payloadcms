import { graphql } from '@bigcommerce/catalyst-core/client/graphql';

const AdminProductsSearch = graphql(`
  query AdminProductsSearch($term: String!) {
    site {
      search {
        searchProducts(filters: { searchTerm: $term }) {
          products {
            edges {
              node {
                entityId
                sku
                name
                defaultImage {
                  url(width: 40, height: 40)
                }
              }
            }
          }
        }
      }
    }
  }
`);

export default AdminProductsSearch;
