// eslint-disable-next-line import/no-unresolved
const { withPayload } = require('@payloadcms/next/withPayload');

const configWrapper = (nextConfig) => {
  console.log('Using Payload CMS integration by TheBigRick <riccardo.tempesta@bigcommerce.com>');

  return withPayload({
    ...nextConfig,
    experimental: {
      ...nextConfig.experimental,
      reactCompiler: false,
    },
  });
};

module.exports = configWrapper;
