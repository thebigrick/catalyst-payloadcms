// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import Link from 'next/link';
import React from 'react';

import { SlideProps } from '@thebigrick/catalyst-payloadcms/components/blocks/slider/slide';
import sliderSlots from '@thebigrick/catalyst-payloadcms/components/blocks/slider/slider-slots';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';

const SlideOverlay: React.FC<SlideProps> = (props) => {
  const { slide } = props;
  const hasLink = Boolean(slide.link);
  const hasOverlay = Boolean(slide.title || slide.description || hasLink);

  const slots = useTvSlots(sliderSlots, undefined, {
    ...props.slider,
    ...props.slide,
  });

  if (!hasOverlay) {
    return null;
  }

  return (
    <div className={slots.overlayWrapper()}>
      <div className={slots.overlayContainer()}>
        <div className={slots.overlayBox()}>
          <div className={slots.overlayTitle()} data-swiper-parallax="-750">
            {slide.title}
          </div>
          <div className={slots.overlayDescription()} data-swiper-parallax="-1000">
            {slide.description}
          </div>
          {hasLink && (
            <div className={slots.overlayCtaBox()} data-swiper-parallax="-1200">
              <Link className={slots.overlayCta()} href={slide.link || '#'}>
                {slide.cta}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideOverlay;
