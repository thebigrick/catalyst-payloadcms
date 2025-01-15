import { headers } from 'next/headers';

const isPayloadPreview = async (): Promise<boolean> => {
  const heads = await headers();

  return heads.get('x-payload-preview') === 'true';
};

export default isPayloadPreview;
