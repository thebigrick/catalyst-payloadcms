import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Config } from 'payload';
import sharp from 'sharp';
import {mongooseAdapter} from "@payloadcms/db-mongodb";

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

const config: Config = {
  editor: lexicalEditor(),

  collections: [],

  secret: process.env.PAYLOAD_SECRET || '',

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  routes: {
    api: '/payload/api',
    admin: '/payload/admin',
    graphQL: '/graphql',
    graphQLPlayground: '/payload/graphql-playground',
  },
};

export default config;
