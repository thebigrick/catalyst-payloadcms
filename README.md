# Catalyst integration for PayloadCMS (@thebigrick/catalyst-payloadcms)

A plugin to integrate PayloadCMS with BigCommerce Catalyst framework using the Pluginizr system.

> **BETA Notice**: This package is currently in beta. While stable and functional, it may undergo changes before the
> final release.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
    - [Environment Variables](#environment-variables)
    - [Extending PayloadCMS Configuration](#extending-payloadcms-configuration)
- [Contributing](#contributing)
    - [Development Guidelines](#development-guidelines)
- [License](#license)
- [Support](#support)

## Prerequisites

This plugin requires:
- A working [Catalyst](https://www.catalyst.dev/) (https://www.catalyst.dev/) project
- [Pluginizr](https://github.com/thebigrick/catalyst-pluginizr) (https://github.com/thebigrick/catalyst-pluginizr) to be installed in your Catalyst project
- A MongoDB database (for your convenience, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) or a local MongoDB instance using the docker-compose file provided in the devops directory

## Installation

Clone or copy this repository into your Catalyst project's `plugins` directory:

```bash
cd plugins
git clone https://github.com/thebigrick/catalyst-payloadcms.git
```

## Usage

### Environment Variables

Modify your `.env.local` file and add the following required environment variables:

```bash
DATABASE_URI=mongodb://127.0.0.1/payload-playground # Configure accordingly
PAYLOAD_SECRET=mystrongsecret # Please modify
```

### Start the Catalyst server and access the PayloadCMS admin panel

Start the Catalyst server:

```bash
pnpm run dev
```

Access the PayloadCMS admin panel by navigating to `http://localhost:3000/payload/admin`.

### Extending PayloadCMS Configuration

The plugin provides a base PayloadCMS configuration that can be extended through the Pluginizr system.

To add collections or modify the PayloadCMS configuration, create a local plugin using [Pluginizr](https://github.com/thebigrick/catalyst-pluginizr) and register your modifications as shown below:

```typescript
// plugins/my-plugin/src/register-plugins.ts

import { registerValuePlugin } from "@thebigrick/catalyst-pluginizr";
import { Config } from "payload";
import { Media } from "./collections/Media";

registerValuePlugin<Config>({
    name: "PayloadCMSConfig",
    resourceId: "@thebigrick/catalyst-payloadcms/payload.raw.config",
    wrap: (config) => ({
        ...config,
        collections: [
            ...config.collections,
            Media
        ]
    })
});
```

Example collection configuration:

```typescript
// plugins/my-plugin/src/collections/Media.ts

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
```

## Contributing

We welcome contributions to improve this plugin! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Include appropriate tests for new features
- Update documentation as needed
- Ensure your code passes all existing tests

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue if your problem hasn't been reported
3. Provide as much detail as possible about your setup and the problem you're encountering
