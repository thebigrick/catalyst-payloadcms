# Catalyst integration for PayloadCMS (@thebigrick/catalyst-payloadcms)

A plugin to integrate PayloadCMS with BigCommerce Catalyst framework using the Pluginizr system.

> **BETA Notice**: This package is currently in beta. While stable and functional, it may undergo changes before the
> final release.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Extending Registries](#extending-registries)
- [Contributing](#contributing)
  - [Development Guidelines](#development-guidelines)
- [License](#license)
- [Support](#support)

## Prerequisites

This plugin requires:
- A working [Catalyst](https://www.catalyst.dev/) (https://www.catalyst.dev/) project
- [Pluginizr](https://github.com/thebigrick/catalyst-pluginizr) (https://github.com/thebigrick/catalyst-pluginizr) to be installed in your Catalyst project
- A Postgres database for storing PayloadCMS data
- (Optional) A Vercel Blob storage for storing media files on Vercel

## Installation

Clone as submodule this repository into your Catalyst project's `plugins` directory:

```bash
cd /path-to-catalyst
git submodule add https://github.com/thebigrick/catalyst-payloadcms.git plugins/catalyst-payloadcms
```

## Usage

### Environment Variables

Modify your `.env.local` file and add the following required environment variables:

```bash
POSTGRES_URL=... # Configure accordingly
PAYLOAD_SECRET=my-super-complex-secret # Please modify
PAYLOAD_CMS_FRONTEND_TOKEN=mystrongsecret # Please modify
```

### Extending Registries

The plugin can be extended with additional components using Catalyst Pluginizr (https://github.com/thebigrick/catalyst-pluginizr) through three main registry files:

- `src/registry/components-registry.ts`: Used for simple components
- `src/registry/containers-registry.ts`: Used for layout components or components that can contain simple components
- `src/registry/fc-registry.ts`: Maps PayloadCMS components to React components based on their "interfaceName"

Example of extending a registry:

```typescript
//...

export default valuePlugin<typeof componentsRegistry>({
  name: 'add-my-component',
  resourceId: '@thebigrick/catalyst-payloadcms/registry/components-registry',

  wrap: (source) => ({
    ...source,
    myAdditionalPlugin
  }),
});
```

For more details on creating plugins, refer to the [Pluginizr documentation](https://github.com/thebigrick/catalyst-pluginizr).

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
