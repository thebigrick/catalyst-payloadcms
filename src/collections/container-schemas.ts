import containersRegistry from '@thebigrick/catalyst-payloadcms/registry/containers-registry';

const containerSchemas = containersRegistry.map((c) => c.schema);

export default containerSchemas;
