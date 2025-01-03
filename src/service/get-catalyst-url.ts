/**
 * Get the Catalyst URL from the environment variables or default to localhost
 * @returns {string}
 */
const getCatalystUrl = (): string => {
  return process.env.CATALYST_URL || 'http://localhost:3000';
};

export default getCatalystUrl;
