import React from 'react';

import Columns from '@thebigrick/catalyst-payloadcms/page-components/columns/columns';
import Heading from '@thebigrick/catalyst-payloadcms/page-components/heading/heading';
import Image from '@thebigrick/catalyst-payloadcms/page-components/image/image';
import ProductsCarousel from '@thebigrick/catalyst-payloadcms/page-components/products-carousel/products-carousel';
import RichText from '@thebigrick/catalyst-payloadcms/page-components/rich-text/rich-text';
import Slider from '@thebigrick/catalyst-payloadcms/page-components/slider/slider';

// This is the list of components that are available to be used in the CMS
// This list is intended to be extended with custom components
const FcRegistry: Record<string, React.FC<never>> = {
  SliderBlock: Slider,
  HeadingBlock: Heading,
  ImageBlock: Image,
  ColumnsBlock: Columns,
  ProductsCarouselBlock: ProductsCarousel,
  RichTextBlock: RichText,
};

export default FcRegistry;
