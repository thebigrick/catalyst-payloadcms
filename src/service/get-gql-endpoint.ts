import getCatalystUrl from '@thebigrick/catalyst-payloadcms/service/get-catalyst-url';

/**
 * Get the GraphQL endpoint for the Payload CMS API
 * @returns {string} The REST endpoint
 */
const getGqlEndpoint = (): string => {
  return `${getCatalystUrl()}/payload/api/graphql`;
};

export default getGqlEndpoint;
