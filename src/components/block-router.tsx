import React from 'react';

import Columns from '@thebigrick/catalyst-payloadcms/components/blocks/columns/columns';
import Image from '@thebigrick/catalyst-payloadcms/components/blocks/image/image';
import Slider from '@thebigrick/catalyst-payloadcms/components/blocks/slider/slider';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

const BlockRouter: React.FC<BlockComponentProps> = ({ block }) => {
  switch (block.__typename) {
    case 'SliderBlock':
      // @ts-expect-error - This is a dynamic typing issue
      return <Slider block={block} />;

    case 'ImageBlock':
      // @ts-expect-error - This is a dynamic typing issue
      return <Image block={block} />;

    case 'ColumnsBlock':
      // @ts-expect-error - This is a dynamic typing issue
      return <Columns block={block} />;
  }

  return null;
};

export default BlockRouter;
