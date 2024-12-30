import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'node:path';
import { dirname } from 'path';
import { Config } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

/*
If you need to extend the configuration, please use:

```typescript
import { registerValuePlugin } from "@thebigrick/catalyst-pluginizr";
import { Config } from "payload";

registerValuePlugin<Config>({
  name: "PayloadCMSConfig",
  resourceId: "@thebigrick/catalyst-payloadcms/payload.raw.config",
  wrap: (config) => {
    return {
      ...config,
      // Add your custom config here
    }
  }
});
```
*/

const selfPath = fileURLToPath(dirname(import.meta.url));

const config: Config = {
  editor: lexicalEditor(),

  collections: [],

  secret: process.env.PAYLOAD_SECRET || '',

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  admin: {
    importMap: {
      autoGenerate: false,
      baseDir: path.resolve(path.join(selfPath, 'app', 'admin', 'importMap.js')),
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
    },
  },

  routes: {
    api: '/payload/api',
    admin: '/payload/admin',
    graphQL: '/graphql',
    graphQLPlayground: '/payload/graphql-playground',
  },

  typescript: {
    outputFile: path.resolve(selfPath, './generated-types.ts'),
  },
};

export default config;
