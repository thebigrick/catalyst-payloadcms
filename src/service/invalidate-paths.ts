import { revalidateTag } from 'next/cache';

/**
 * Invalidate alter-data
 * @returns {Promise<void>}
 */
const invalidatePaths = async (): Promise<void> => {
  try {
    revalidateTag('payloadcms-alter-data');
  } catch (error) {
    console.error('Error invalidating alter-data', error);
  }

  return Promise.resolve();
};

export default invalidatePaths;
