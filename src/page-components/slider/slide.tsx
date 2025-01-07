import NextImage from 'next/image';
import React from 'react';

import { Image, SliderBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';
import SlideOverlay from '@thebigrick/catalyst-payloadcms/page-components/slider/slide-overlay';
import { Props } from '@thebigrick/catalyst-payloadcms/page-components/slider/slider';
import sliderSlots from '@thebigrick/catalyst-payloadcms/page-components/slider/slider-slots';

export interface SlideProps {
  slide: Props['block']['slides'][0];
  slider: SliderBlock;
}

const Slide: React.FC<SlideProps> = (props) => {
  const { slide, slider } = props;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const image = slide.image as Image;

  const slots = useTvSlots(sliderSlots, undefined, {
    ...props.slider,
    ...props.slide,
  });

  return (
    <>
      <NextImage
        alt={image.alt || ''}
        className={slots.sliderImage()}
        height={0}
        sizes="100%"
        // @ts-expect-error - `url` is always a string here
        src={image.url}
        width={0}
      />
      <SlideOverlay slide={slide} slider={slider} />
    </>
  );
};

export default Slide;
