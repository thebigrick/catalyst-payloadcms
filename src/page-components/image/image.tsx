import clsx from 'clsx';
import NextImage from 'next/image';
import React from 'react';

import { ImageBlock, Image as ImageType } from '@thebigrick/catalyst-payloadcms/generated-types';
import useBoxStyle from '@thebigrick/catalyst-payloadcms/hooks/use-box-style';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';
import imageSlots from '@thebigrick/catalyst-payloadcms/page-components/image/image-slots';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface Props extends BlockComponentProps {
  block: ImageBlock;
}

const Image: React.FC<Props> = (props) => {
  const { block } = props;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const image = block.image as ImageType | null;

  const slots = useTvSlots(imageSlots, undefined, block);
  const boxStyle = useBoxStyle(block.box);

  if (!image?.url) {
    return null;
  }

  return (
    <NextImage
      alt={image.alt || ''}
      className={clsx(boxStyle.className, slots.base())}
      height={0}
      sizes="100%"
      src={image.url}
      style={boxStyle.styles}
      width={0}
    />
  );
};

export default Image;
