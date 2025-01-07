import heading from '@thebigrick/catalyst-payloadcms/page-components/heading';
import image from '@thebigrick/catalyst-payloadcms/page-components/image';
import productsCarousel from '@thebigrick/catalyst-payloadcms/page-components/products-carousel';
import richText from '@thebigrick/catalyst-payloadcms/page-components/rich-text';
import slider from '@thebigrick/catalyst-payloadcms/page-components/slider';
import { PageComponentDefinition } from '@thebigrick/catalyst-payloadcms/types';

// This is the list of components that are available to be used in the CMS
// This list is intended to be extended with custom components
// If the component may contain children, it should be added to the `containersRegistry` array
const componentsRegistry: PageComponentDefinition[] = [
  slider,
  image,
  productsCarousel,
  heading,
  richText,
];

export default componentsRegistry;
