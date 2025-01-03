import ImageBlockFragment from '@thebigrick/catalyst-payloadcms/gql/query/fragments/image-block';
import SliderBlockFragment from '@thebigrick/catalyst-payloadcms/gql/query/fragments/slider-block';

/**
 * Collection of all page block fragments (can be extended by other plugins)
 */
const pageBlockFragments = [SliderBlockFragment, ImageBlockFragment];

export default pageBlockFragments;
