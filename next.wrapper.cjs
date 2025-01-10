// eslint-disable-next-line import/no-unresolved
const { withPayload } = require('@payloadcms/next/withPayload');

const configWrapper = (nextConfig) => {
  console.log('Using Payload CMS integration by TheBigRick <riccardo.tempesta@bigcommerce.com>');

  const parsedUrl = new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000');

  return withPayload({
    ...nextConfig,
    experimental: {
      ...nextConfig.experimental,
      reactCompiler: false,
    },
    images: {
      ...nextConfig.images,
      remotePatterns: [
        ...(nextConfig.images?.remotePatterns || []),
        {
          protocol: parsedUrl.protocol.replace(':', ''),
          hostname: parsedUrl.hostname,
          port: parsedUrl.port,
        },
      ],
    },
    async headers() {
      const headers = await nextConfig.headers();

      return [
        ...(headers || {}),
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'Content-Security-Policy',
              value: "frame-ancestors 'self' http://localhost:3000;", // TODO: Update this to read from env
            },
          ],
        },
      ];
    },
  });
};

module.exports = configWrapper;
