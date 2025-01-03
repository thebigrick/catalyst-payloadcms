import NextImage from 'next/image';
import React from 'react';

import imageSlots from '@thebigrick/catalyst-payloadcms/components/blocks/image/image-slots';
import { ImageBlock, Image as ImageType } from '@thebigrick/catalyst-payloadcms/generated-types';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface SliderProps extends BlockComponentProps {
  block: ImageBlock;
}

const Image: React.FC<SliderProps> = (props) => {
  const { block } = props;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const image = block.image as ImageType | null;

  const slots = useTvSlots(imageSlots, undefined, block);

  if (!image?.url) {
    return null;
  }

  return (
    <NextImage
      alt={image.alt || ''}
      className={slots.base()}
      height={0}
      sizes="100%"
      src={image.url}
      width={0}
    />
  );
};

export default Image;
