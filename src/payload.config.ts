import { buildConfig } from 'payload';

import config from './payload.raw.config';

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

export default buildConfig(config);
