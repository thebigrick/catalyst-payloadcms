import React from 'react';

import Slider from '@thebigrick/catalyst-payloadcms/components/blocks/slider/slider';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

const BlockRouter: React.FC<BlockComponentProps> = ({ block }) => {
  switch (block.__typename) {
    case 'SliderBlock':
      // @ts-expect-error - This is a dynamic typing issue
      return <Slider block={block} />;
  }

  return null;
};

export default BlockRouter;
