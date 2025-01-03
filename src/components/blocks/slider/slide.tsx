import Image from 'next/image';
import React from 'react';

import SlideOverlay from '@thebigrick/catalyst-payloadcms/components/blocks/slider/slide-overlay';
import { SliderProps } from '@thebigrick/catalyst-payloadcms/components/blocks/slider/slider';
import sliderSlots from '@thebigrick/catalyst-payloadcms/components/blocks/slider/slider-slots';
import { SlideImage, SliderBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';

export interface SlideProps {
  slide: SliderProps['block']['slides'][0];
  slider: SliderBlock;
}

const Slide: React.FC<SlideProps> = (props) => {
  const { slide, slider } = props;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const image = slide.image as SlideImage;

  const slots = useTvSlots(sliderSlots, undefined, {
    ...props.slider,
    ...props.slide,
  });

  return (
    <>
      <Image
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
