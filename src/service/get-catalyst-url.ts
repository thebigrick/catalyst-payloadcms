/**
 * Get the Catalyst URL from the environment variables or default to localhost
 * @returns {string}
 */
const getCatalystUrl = (): string => {
  return process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
};

export default getCatalystUrl;
