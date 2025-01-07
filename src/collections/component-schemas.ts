import componentsRegistry from '@thebigrick/catalyst-payloadcms/registry/components-registry';

const componentSchemas = componentsRegistry.map((c) => c.schema);

export default componentSchemas;
