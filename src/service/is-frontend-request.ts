import { AccessArgs } from 'payload';

/**
 * Determine if the request is coming from the frontend
 * @param {AccessArgs} args
 * @returns {boolean}
 */
const isFrontendRequest = (args: AccessArgs): boolean => {
  const { req } = args;

  if (args.req.user) return true;
  if (!process.env.PAYLOAD_CMS_FRONTEND_TOKEN) return false;

  return req.headers.get('X-Payload-CMS-Auth') === process.env.PAYLOAD_CMS_FRONTEND_TOKEN;
};

export default isFrontendRequest;
