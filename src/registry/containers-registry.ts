import columns from '@thebigrick/catalyst-payloadcms/page-components/columns';
import { PageComponentDefinition } from '@thebigrick/catalyst-payloadcms/types';

// This is the registry of all the components that may contain other components
// This list is intended to be extended with custom components
const containersRegistry: PageComponentDefinition[] = [columns];

export default containersRegistry;
