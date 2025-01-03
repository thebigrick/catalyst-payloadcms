import { GraphQLError, print } from '@0no-co/graphql.web';
import { TadaDocumentNode } from 'gql.tada';

import getGqlEndpoint from '@thebigrick/catalyst-payloadcms/service/get-gql-endpoint';

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

/**
 * A client for making GraphQL requests to the Payload CMS API
 * @template TResult - The type of the result
 * @param {object} config
 * @param {TadaDocumentNode} config.document - The GraphQL document
 * @param {object} [config.variables] - The variables for the query
 * @param {FetcherRequestInit} [config.fetchOptions] - The fetch options
 * @returns {Promise<TResult>}
 */
const payloadClient = async <TResult>(config: {
  document: TadaDocumentNode;
  variables?: Record<string, unknown>;
  fetchOptions?: FetcherRequestInit;
}): Promise<TResult> => {
  if (!process.env.PAYLOAD_CMS_FRONTEND_TOKEN) {
    throw new Error('Missing PAYLOAD_CMS_FRONTEND_TOKEN environment variable');
  }

  const { document, variables, fetchOptions = {} } = config;

  const query = normalizeQuery(document);

  const response = await fetch(getGqlEndpoint(), {
    method: 'POST',
    headers: {
      'X-Payload-CMS-Auth': process.env.PAYLOAD_CMS_FRONTEND_TOKEN,
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
