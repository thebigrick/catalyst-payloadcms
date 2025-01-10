'use client';

import React from 'react';
import { Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@thebigrick/catalyst-payloadcms/components/box';
import { Image, SliderBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';
import Slide from '@thebigrick/catalyst-payloadcms/page-components/slider/slide';
import sliderSlots from '@thebigrick/catalyst-payloadcms/page-components/slider/slider-slots';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface Props extends BlockComponentProps {
  block: SliderBlock;
}

const Slider: React.FC<Props> = (props) => {
  const { block } = props;
  const slots = useTvSlots(sliderSlots, undefined, props.block);

  return (
    <Box block={block}>
      <Swiper
        autoHeight={false}
        autoplay={
          block.autoplay
            ? {
                delay: block.autoplayDelay,
                disableOnInteraction: true,
              }
            : false
        }
        className={slots.base()}
        modules={[Parallax, Autoplay, Navigation, Pagination]}
        navigation={block.showNavigation}
        pagination={block.showPagination}
        parallax={true}
        slidesPerView={block.slidesPerView}
        spaceBetween={block.spaceBetween}
      >
        {block.slides.map((slide, index) => {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const image = slide.image as Image | null;

          if (!image?.url) {
            return null;
          }

          return (
            <SwiperSlide key={index}>
              <Slide slide={slide} slider={block} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Slider;
