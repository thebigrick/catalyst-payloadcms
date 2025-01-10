// eslint-disable-next-line import/no-unresolved
const { withPayload } = require('@payloadcms/next/withPayload');

const configWrapper = (nextConfig) => {
  console.log('Using Payload CMS integration by TheBigRick <riccardo.tempesta@bigcommerce.com>');

  const publicUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const parsedUrl = new URL(publicUrl);

  const remotePattern = {
    protocol: parsedUrl.protocol.replace(':', ''),
    hostname: parsedUrl.hostname,
  };

  if (parsedUrl.port && parsedUrl.port !== '80' && parsedUrl.port !== '443') {
    remotePattern.port = parsedUrl.port;
  }

  console.log('Using images remote pattern: ', remotePattern);

  return withPayload({
    ...nextConfig,
    experimental: {
      ...nextConfig.experimental,
      reactCompiler: false,
    },
    images: {
      ...nextConfig.images,
      domains: [...(nextConfig.images?.domains || []), parsedUrl.hostname],
      remotePatterns: [...(nextConfig.images?.remotePatterns || []), remotePattern],
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
              value: `frame-ancestors 'self' ${publicUrl};`,
            },
          ],
        },
      ];
    },
  });
};

module.exports = configWrapper;
