import { revalidateTag } from 'next/cache';

/**
 * Invalidate paths
 * @returns {Promise<void>}
 */
const invalidatePaths = async (): Promise<void> => {
  try {
    revalidateTag('payloadcms-paths');
  } catch (error) {
    console.error('Error invalidating paths', error);
  }

  return Promise.resolve();
};

export default invalidatePaths;
