/**
 * Get the REST endpoint for the Payload CMS API
 * @returns {string} The REST endpoint
 */
const getRestEndpoint = (): string => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    return `${baseUrl}/payload/api`;
}

export default getRestEndpoint;
