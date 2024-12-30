import { GraphQLError, print } from '@0no-co/graphql.web';
import { TadaDocumentNode } from 'gql.tada';

export interface FetcherRequestInit extends Omit<RequestInit, 'body'> {
  headers?: Record<string, string>;
}

/**
 * Normalize a query to a string
 * @param {string | TadaDocumentNode} query
 * @returns {string}
 */
const normalizeQuery = (query: string | TadaDocumentNode): string => {
  if (typeof query === 'string') {
    return query;
  }

  if (query instanceof String) {
    return query.toString();
  }

  if ('kind' in query) {
    return print(query);
  }

  throw new Error('Invalid query type');
};

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

const payloadClient = async <TResult, TVariables>(config: {
  document: TadaDocumentNode;
  variables?: TVariables;
  fetchOptions?: FetcherRequestInit;
}): Promise<TResult> => {
  const { document, variables, fetchOptions = {} } = config;

  const graphqlUrl = 'http://localhost:3000/payload/api/graphql';

  const query = normalizeQuery(document);

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      query,
      ...(variables && { variables }),
    }),
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json: GraphQLResponse<TResult> = await response.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`);
  }

  if (!json.data) {
    throw new Error(`No 'data' found in the GraphQL response payload`);
  }

  return json.data;
};

export default payloadClient;
