import { tv } from 'tailwind-variants';

const sliderSlots = tv({
  slots: {
    slider: 'w-full h-[500px]',
    sliderImage: 'absolute inset-0 w-full h-full object-cover',
    overlayWrapper: 'absolute inset-0 w-full h-full object-cover',
    overlayContainer:
      'flex flex-col items-start justify-center w-full h-full bg-gradient-to-r from-gray-600/80 to-gray-600/0 to-70%',
    overlayBox: 'w-1/2 flex flex-col items-start px-6',
    overlayTitle: 'font-bold text-5xl text-white',
    overlayDescription: 'text-sm mt-3 text-white',
    overlayCtaBox: 'mt-6',
    overlayCta: 'bg-blue-600 text-white px-12 py-3 font-bold text-sm',
  },
  variants: {
    showNavigation: {
      true: {
        overlayBox: 'px-12',
      },
    },
  },
});

export type SliderSlots = keyof ReturnType<typeof sliderSlots>;

export default sliderSlots;
