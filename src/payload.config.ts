import { buildConfig } from 'payload';

import config from './payload.raw.config';

/*
If you need to extend the configuration, please pluginize it like this:
Check https://github.com/thebigrick/catalyst-pluginizr for more information

```typescript
import { valuePlugin } from '@thebigrick/catalyst-pluginizr';
import { Config } from "payload";

export default valuePlugin<Config>({
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
